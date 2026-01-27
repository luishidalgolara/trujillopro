// ========================================
// TRUJILLO - Gallery & Lightbox Module
// ========================================

// ========================================
// GALLERY TABS
// ========================================
function initGalleryTabs() {
    const tabs = document.querySelectorAll('.gallery-tab');
    const galleryGrid = document.getElementById('galleryGrid');
    
    // Cargar contenido inicial (Eléctrico por defecto)
    if (galleryGrid) {
        updateGalleryContent(galleryGrid, galleryContent.electric);
    }
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Get module type
            const module = tab.getAttribute('data-tab');
            
            // Update gallery content with animation
            galleryGrid.style.opacity = '0';
            galleryGrid.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                updateGalleryContent(galleryGrid, galleryContent[module]);
                
                setTimeout(() => {
                    galleryGrid.style.opacity = '1';
                    galleryGrid.style.transform = 'translateY(0)';
                }, ANIMATION_TIMING.fadeDelay);
            }, ANIMATION_TIMING.galleryTransition);
        });
    });
    
    // Transition styles for gallery
    galleryGrid.style.transition = 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
}

function updateGalleryContent(container, items) {
    container.innerHTML = '';
    
    // Get current module from active tab
    const activeTab = document.querySelector('.gallery-tab.active');
    const currentModule = activeTab ? activeTab.getAttribute('data-tab') : 'electric';
    
    // Check if current module is videos
    if (currentModule === 'videos') {
        items.forEach((item, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.style.animationDelay = `${index * 0.1}s`;
            
            galleryItem.innerHTML = `
                <div class="video-thumbnail" onclick="openVideoModal(${index})">
                    <video preload="metadata" muted>
                        <source src="${item.video}#t=0.1" type="video/mp4">
                    </video>
                    <div class="video-thumbnail-overlay">
                        <div class="video-play-button">▶</div>
                    </div>
                    <div class="video-duration">${item.duration}</div>
                    <div class="video-thumbnail-info">
                        <h4>${item.title}</h4>
                        <p>${item.description}</p>
                    </div>
                </div>
            `;
            
            container.appendChild(galleryItem);
        });
    } else {
        // Original image gallery
        items.forEach((item, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.style.animationDelay = `${index * 0.1}s`;
            
            galleryItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="gallery-image" onclick="openLightbox(${index}, '${currentModule}')">
            `;
            
            container.appendChild(galleryItem);
        });
    }
}

// ========================================
// LIGHTBOX FUNCTIONALITY WITH NAVIGATION
// ========================================
function openLightbox(index, module) {
    currentImageIndex = index;
    currentModule = module;
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.querySelector('.lightbox-caption');
    const counter = document.querySelector('.lightbox-counter');
    
    const images = galleryContent[module];
    const currentImage = images[currentImageIndex];
    
    lightbox.style.display = 'block';
    lightboxImg.src = currentImage.image;
    caption.textContent = currentImage.title;
    counter.textContent = `${currentImageIndex + 1} / ${images.length}`;
    
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function changeImage(direction) {
    const images = galleryContent[currentModule];
    currentImageIndex += direction;
    
    // Loop around
    if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    }
    
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.querySelector('.lightbox-caption');
    const counter = document.querySelector('.lightbox-counter');
    const currentImage = images[currentImageIndex];
    
    // Fade effect
    lightboxImg.style.opacity = 0;
    setTimeout(() => {
        lightboxImg.src = currentImage.image;
        caption.textContent = currentImage.title;
        counter.textContent = `${currentImageIndex + 1} / ${images.length}`;
        lightboxImg.style.opacity = 1;
    }, 150);
}

// ========================================
// LIGHTBOX EVENT LISTENERS
// ========================================
function initLightboxEvents() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    const lightboxImg = document.getElementById('lightbox-img');
    
    // Add transition to image
    if (lightboxImg) {
        lightboxImg.style.transition = 'opacity 0.3s ease';
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => changeImage(-1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => changeImage(1));
    }
    
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const lightbox = document.getElementById('lightbox');
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                changeImage(-1);
            } else if (e.key === 'ArrowRight') {
                changeImage(1);
            }
        }
    });
}

// ========================================
// LAZY LOADING IMAGES
// ========================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// VIDEO MODAL FUNCTIONALITY
// ========================================
function openVideoModal(index) {
    currentVideoIndex = index;
    
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoTitle = document.querySelector('.video-modal-header h3');
    const videoInfoTitle = document.querySelector('.video-details h4');
    const videoInfoDesc = document.querySelector('.video-details p');
    const videoCounter = document.querySelector('.video-counter');
    
    const videos = galleryContent.videos;
    const currentVideo = videos[currentVideoIndex];
    
    videoModal.style.display = 'block';
    videoPlayer.src = currentVideo.video;
    videoTitle.textContent = currentVideo.title;
    videoInfoTitle.textContent = currentVideo.title;
    videoInfoDesc.textContent = currentVideo.description;
    videoCounter.textContent = `${currentVideoIndex + 1} / ${videos.length}`;
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Auto play video
    videoPlayer.play();
}

function closeVideoModal() {
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    
    videoModal.style.display = 'none';
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    videoPlayer.src = '';
    document.body.style.overflow = 'auto';
}

function changeVideo(direction) {
    const videos = galleryContent.videos;
    currentVideoIndex += direction;
    
    // Loop around
    if (currentVideoIndex >= videos.length) {
        currentVideoIndex = 0;
    } else if (currentVideoIndex < 0) {
        currentVideoIndex = videos.length - 1;
    }
    
    const videoPlayer = document.getElementById('videoPlayer');
    const videoTitle = document.querySelector('.video-modal-header h3');
    const videoInfoTitle = document.querySelector('.video-details h4');
    const videoInfoDesc = document.querySelector('.video-details p');
    const videoCounter = document.querySelector('.video-counter');
    const currentVideo = videos[currentVideoIndex];
    
    // Fade effect
    videoPlayer.style.opacity = 0;
    setTimeout(() => {
        videoPlayer.src = currentVideo.video;
        videoTitle.textContent = currentVideo.title;
        videoInfoTitle.textContent = currentVideo.title;
        videoInfoDesc.textContent = currentVideo.description;
        videoCounter.textContent = `${currentVideoIndex + 1} / ${videos.length}`;
        videoPlayer.play();
        videoPlayer.style.opacity = 1;
    }, 150);
}

function toggleVideoPlayPause() {
    const videoPlayer = document.getElementById('videoPlayer');
    if (videoPlayer.paused) {
        videoPlayer.play();
    } else {
        videoPlayer.pause();
    }
}

function toggleVideoFullscreen() {
    const videoPlayer = document.getElementById('videoPlayer');
    if (videoPlayer.requestFullscreen) {
        videoPlayer.requestFullscreen();
    } else if (videoPlayer.webkitRequestFullscreen) {
        videoPlayer.webkitRequestFullscreen();
    } else if (videoPlayer.msRequestFullscreen) {
        videoPlayer.msRequestFullscreen();
    }
}

// ========================================
// VIDEO MODAL EVENT LISTENERS
// ========================================
function initVideoModalEvents() {
    const videoModal = document.getElementById('videoModal');
    const videoCloseBtn = document.querySelector('.video-modal-close');
    const videoPrevBtn = document.querySelector('.video-nav-prev');
    const videoNextBtn = document.querySelector('.video-nav-next');
    const videoPlayer = document.getElementById('videoPlayer');
    
    // Add transition to video
    if (videoPlayer) {
        videoPlayer.style.transition = 'opacity 0.3s ease';
    }
    
    if (videoCloseBtn) {
        videoCloseBtn.addEventListener('click', closeVideoModal);
    }
    
    if (videoPrevBtn) {
        videoPrevBtn.addEventListener('click', () => changeVideo(-1));
    }
    
    if (videoNextBtn) {
        videoNextBtn.addEventListener('click', () => changeVideo(1));
    }
    
    if (videoModal) {
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (videoModal && videoModal.style.display === 'block') {
            if (e.key === 'Escape') {
                closeVideoModal();
            } else if (e.key === 'ArrowLeft') {
                changeVideo(-1);
            } else if (e.key === 'ArrowRight') {
                changeVideo(1);
            } else if (e.key === ' ') {
                e.preventDefault();
                toggleVideoPlayPause();
            } else if (e.key === 'f' || e.key === 'F') {
                toggleVideoFullscreen();
            }
        }
    });
}