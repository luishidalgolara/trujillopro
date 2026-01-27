#!/bin/bash
# Script para levantar servidor HTTP local para Trujillo CAD

echo "🚀 Iniciando servidor HTTP local..."
echo "📁 Directorio: $(pwd)"
echo "🌐 URL: http://localhost:8000"
echo ""
echo "Presiona Ctrl+C para detener el servidor"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

python3 -m http.server 8000
