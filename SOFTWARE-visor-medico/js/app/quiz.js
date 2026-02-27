// ===== QUIZ.JS — Quiz Interactivo =====

let quizScore = { correct: 0, total: 0 };
let quizQuestions = [];
let currentQuestionIndex = 0;

function initQuiz() {
  if (!catalog || catalog.collections.length === 0) return;
}

function startQuiz() {
  if (!catalog) return;
  quizQuestions = [];
  catalog.collections.forEach(col => {
    col.structures.forEach((struct, idx) => {
      quizQuestions.push({
        collection: col,
        structureIndex: idx,
        correct: struct.name,
        description: struct.description
      });
    });
  });
  quizQuestions = quizQuestions.sort(() => Math.random() - 0.5).slice(0, 15);
  currentQuestionIndex = 0;
  quizScore = { correct: 0, total: 0 };
  updateScoreDisplay();
  document.querySelector('.quiz-layout > .btn-primary').style.display = 'none';
  showQuestion();
}

function showQuestion() {
  if (currentQuestionIndex >= quizQuestions.length) { endQuiz(); return; }
  const q = quizQuestions[currentQuestionIndex];
  const col = q.collection;
  const canvas = document.getElementById('quiz-canvas');
  canvas.width = 300; canvas.height = 300;
  const ctx = canvas.getContext('2d');
  if (col.organ.includes('Pulmón')) drawLungCT(ctx, 300, 300, 0.5);
  else if (col.organ.includes('Páncreas')) drawAbdomenCT(ctx, 300, 300, 0.5, 'pancreas');
  else if (col.organ.includes('Riñón')) drawAbdomenCT(ctx, 300, 300, 0.5, 'kidney');
  else drawGenericCT(ctx, 300, 300, 0.5);
  const positions = getAnnotationPositions(col, 300, 300);
  const pointer = document.getElementById('quiz-pointer');
  if (positions[q.structureIndex]) {
    const [px, py] = positions[q.structureIndex];
    pointer.style.left = px + 'px';
    pointer.style.top = py + 'px';
    pointer.style.display = 'block';
  }
  document.getElementById('quiz-question').textContent = '¿Qué estructura señala el punto rojo?';
  const allNames = catalog.collections.flatMap(c => c.structures.map(s => s.name));
  const wrongOptions = allNames.filter(n => n !== q.correct).sort(() => Math.random() - 0.5).slice(0, 3);
  const options = [q.correct, ...wrongOptions].sort(() => Math.random() - 0.5);
  document.getElementById('quiz-options').innerHTML = options.map(opt => `
    <button class="quiz-option" onclick="answerQuestion('${opt}', '${q.correct}', this)">${opt}</button>
  `).join('');
  document.getElementById('quiz-feedback').className = 'quiz-feedback';
  document.getElementById('quiz-feedback').textContent = '';
  document.getElementById('quiz-next').style.display = 'none';
}

function answerQuestion(selected, correct, btn) {
  document.querySelectorAll('.quiz-option').forEach(b => b.onclick = null);
  quizScore.total++;
  if (selected === correct) {
    quizScore.correct++;
    btn.classList.add('correct');
    const fb = document.getElementById('quiz-feedback');
    fb.className = 'quiz-feedback correct';
    fb.textContent = '✅ ¡Correcto! ' + quizQuestions[currentQuestionIndex].description.substring(0, 100) + '...';
  } else {
    btn.classList.add('wrong');
    document.querySelectorAll('.quiz-option').forEach(b => {
      if (b.textContent === correct) b.classList.add('correct');
    });
    const fb = document.getElementById('quiz-feedback');
    fb.className = 'quiz-feedback wrong';
    fb.textContent = `❌ Incorrecto. Era: ${correct}`;
  }
  updateScoreDisplay();
  document.getElementById('quiz-next').style.display = 'block';
}

function nextQuestion() {
  currentQuestionIndex++;
  showQuestion();
}

function endQuiz() {
  const pct = Math.round((quizScore.correct / quizScore.total) * 100);
  document.getElementById('quiz-card').innerHTML = `
    <div style="grid-column:1/-1;text-align:center;padding:40px">
      <div style="font-size:72px;margin-bottom:16px">${pct >= 70 ? '🏆' : pct >= 50 ? '📚' : '💪'}</div>
      <h3 style="font-family:var(--font-display);font-size:28px;font-weight:800;margin-bottom:8px">Quiz completado</h3>
      <p style="color:var(--text2);margin-bottom:24px">${quizScore.correct} de ${quizScore.total} correctas · ${pct}%</p>
      <p style="color:var(--text3);font-size:14px;max-width:400px;margin:0 auto">${
        pct >= 70 ? 'Excelente desempeño. Dominas la anatomía radiológica.' :
        pct >= 50 ? 'Buen intento. Repasa las estructuras en el Atlas de Anatomía.' :
        'Sigue practicando. Revisa el Atlas de Anatomía para reforzar conceptos.'
      }</p>
    </div>
  `;
  document.querySelector('.quiz-layout > .btn-primary').style.display = 'inline-flex';
  document.querySelector('.quiz-layout > .btn-primary').textContent = 'Intentar de nuevo';
}

function updateScoreDisplay() {
  document.getElementById('score-correct').textContent = quizScore.correct;
  document.getElementById('score-total').textContent = quizScore.total;
  document.getElementById('score-pct').textContent =
    quizScore.total > 0 ? Math.round((quizScore.correct/quizScore.total)*100) + '%' : '—';
}
