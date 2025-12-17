// Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        body.style.overflow = '';
    });
});

// Smooth scroll for in-page hash links (only when a real target id is provided)
document.querySelectorAll('a[href^="#"]:not([download])').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href') || '';

        // Ignore empty/hash-only links like href="#"
        if (href === '#' || href.length < 2) return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Skills section fade in animation on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillTags = entry.target.querySelectorAll('.skill-tag');
            skillTags.forEach((tag, index) => {
                tag.style.opacity = '0';
                tag.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    tag.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    tag.style.opacity = '1';
                    tag.style.transform = 'translateY(0)';
                }, index * 100);
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}


// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Fade in animation on scroll
const fadeElements = document.querySelectorAll('.timeline-item, .certificate-item');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Download resume button - allow normal download behavior

// Gallery Slider
// ============================================
// Add your image filenames here (they should be in assets/gallery/ folder)
// Example: ['image1.jpg', 'image2.png', 'photo1.jpg']
const galleryImages = [
    // Add your image filenames here
    // Example: 'image1.jpg', 'image2.png', 'photo1.jpg'
];

// Auto-detect images by trying common names (optional)
// This will try image1.jpg, image2.jpg, etc. up to 20 images
const autoDetectImages = true;
const maxAutoDetect = 20;

// Gallery Slider Functionality
let currentSlideIndex = 0;
let images = [];
let imageData = []; // Store title and description for each image
let autoSlideInterval = null;
const autoSlideDelay = 5000; // 5 seconds

// Function to check if image exists
function checkImageExists(src) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = src;
    });
}

// Function to load text file content
async function loadTextFile(path) {
    try {
        const response = await fetch(path);
        if (response.ok) {
            const text = await response.text();
            return text.trim();
        }
    } catch (error) {
        // File doesn't exist or can't be read
    }
    return null;
}

// Function to parse image data from txt file
function parseImageData(text) {
    if (!text) return { title: '', description: '' };
    
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    const title = lines[0] || '';
    const description = lines.slice(1).join(' ') || '';
    
    return { title, description };
}

// Function to get image name without extension
function getImageNameWithoutExt(imagePath) {
    const fileName = imagePath.split('/').pop();
    return fileName.replace(/\.[^/.]+$/, '');
}

// Function to load gallery images
async function loadGalleryImages() {
    const galleryPath = 'assets/gallery/';
    images = [];
    imageData = [];

    // If manual list is provided, use it
    if (galleryImages.length > 0) {
        for (const imageName of galleryImages) {
            const imagePath = galleryPath + imageName;
            const exists = await checkImageExists(imagePath);
            if (exists) {
                images.push(imagePath);
                
                // Try to load corresponding txt file
                const imageNameWithoutExt = getImageNameWithoutExt(imagePath);
                const txtPath = `${galleryPath}${imageNameWithoutExt}.txt`;
                const txtContent = await loadTextFile(txtPath);
                const data = parseImageData(txtContent);
                imageData.push(data);
            }
        }
    } else if (autoDetectImages) {
        // Auto-detect images
        const extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        for (let i = 1; i <= maxAutoDetect; i++) {
            for (const ext of extensions) {
                const imagePath = `${galleryPath}image${i}.${ext}`;
                const exists = await checkImageExists(imagePath);
                if (exists) {
                    images.push(imagePath);
                    
                    // Try to load corresponding txt file
                    const txtPath = `${galleryPath}image${i}.txt`;
                    const txtContent = await loadTextFile(txtPath);
                    const data = parseImageData(txtContent);
                    imageData.push(data);
                    
                    break; // Found one, move to next number
                }
            }
        }
    }

    if (images.length === 0) {
        // Show empty message
        const slider = document.getElementById('gallerySlider');
        if (slider) {
            slider.innerHTML = '<div class="gallery-empty-message"><p>No images found. Please add images to the <code>assets/gallery/</code> folder.</p></div>';
        }
        return;
    }

    // Create slides
    createGallerySlides();
    // Create thumbnails
    createGalleryThumbnails();
    // Update counter
    updateGalleryCounter();
    // Show first slide
    showSlide(0);
    // Start auto slide
    startAutoSlide();
}

// Function to create gallery slides
function createGallerySlides() {
    const slider = document.getElementById('gallerySlider');
    if (!slider) return;

    slider.innerHTML = '';
    images.forEach((imagePath, index) => {
        const slide = document.createElement('div');
        slide.className = 'gallery-slide';
        if (index === 0) slide.classList.add('active');
        
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = `Gallery image ${index + 1}`;
        img.loading = 'lazy';
        
        slide.appendChild(img);
        
        // Add overlay only if txt file exists (has title or description)
        const data = imageData[index] || { title: '', description: '' };
        
        if (data.title || data.description) {
            const overlay = document.createElement('div');
            overlay.className = 'gallery-slide-overlay';
            
            if (data.title) {
                const titleEl = document.createElement('h3');
                titleEl.textContent = data.title;
                overlay.appendChild(titleEl);
            }
            if (data.description) {
                const descEl = document.createElement('p');
                descEl.textContent = data.description;
                overlay.appendChild(descEl);
            }
            
            slide.appendChild(overlay);
        }
        
        slider.appendChild(slide);
    });
}

// Function to create gallery thumbnails
function createGalleryThumbnails() {
    const thumbnailsContainer = document.getElementById('galleryThumbnails');
    if (!thumbnailsContainer) return;

    thumbnailsContainer.innerHTML = '';
    images.forEach((imagePath, index) => {
        const thumbnailWrapper = document.createElement('div');
        thumbnailWrapper.className = 'gallery-thumbnail-wrapper';
        
        const thumbnail = document.createElement('div');
        thumbnail.className = 'gallery-thumbnail';
        if (index === 0) thumbnail.classList.add('active');
        
        thumbnail.addEventListener('click', () => {
            showSlide(index);
            resetAutoSlide(); // Reset timer when user clicks thumbnail
        });
        
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = `Thumbnail ${index + 1}`;
        
        thumbnail.appendChild(img);
        
        // Add overlay with title and description
        const overlay = document.createElement('div');
        overlay.className = 'gallery-thumbnail-overlay';
        const data = imageData[index] || { title: '', description: '' };
        
        if (data.title || data.description) {
            if (data.title) {
                const titleEl = document.createElement('h4');
                titleEl.textContent = data.title;
                overlay.appendChild(titleEl);
            }
            if (data.description) {
                const descEl = document.createElement('p');
                descEl.textContent = data.description;
                overlay.appendChild(descEl);
            }
        }
        
        thumbnail.appendChild(overlay);
        thumbnailWrapper.appendChild(thumbnail);
        thumbnailsContainer.appendChild(thumbnailWrapper);
    });
}

// Function to show specific slide
function showSlide(index) {
    if (images.length === 0) return;
    
    currentSlideIndex = index;
    if (currentSlideIndex < 0) currentSlideIndex = images.length - 1;
    if (currentSlideIndex >= images.length) currentSlideIndex = 0;

    // Update slides
    const slides = document.querySelectorAll('.gallery-slide');
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === currentSlideIndex) {
            slide.classList.add('active');
        }
    });

    // Update thumbnails
    const thumbnails = document.querySelectorAll('.gallery-thumbnail');
    const thumbnailsContainer = document.getElementById('galleryThumbnails');
    
    thumbnails.forEach((thumbnail, i) => {
        thumbnail.classList.remove('active');
        if (i === currentSlideIndex) {
            thumbnail.classList.add('active');
            // Scroll thumbnail into view only within the thumbnails container (horizontal scroll only)
            const wrapper = thumbnail.closest('.gallery-thumbnail-wrapper');
            if (wrapper && thumbnailsContainer) {
                // Only scroll horizontally within the container, don't scroll the page
                const containerRect = thumbnailsContainer.getBoundingClientRect();
                const wrapperRect = wrapper.getBoundingClientRect();
                const scrollLeft = thumbnailsContainer.scrollLeft;
                const wrapperLeft = wrapperRect.left - containerRect.left + scrollLeft;
                const wrapperWidth = wrapperRect.width;
                const containerWidth = containerRect.width;
                
                // Calculate the position to center the thumbnail
                const targetScroll = wrapperLeft - (containerWidth / 2) + (wrapperWidth / 2);
                
                // Smooth scroll only the container, not the page
                thumbnailsContainer.scrollTo({
                    left: targetScroll,
                    behavior: 'smooth'
                });
            }
        }
    });

    // Update counter
    updateGalleryCounter();
}

// Function to update gallery counter
function updateGalleryCounter() {
    const currentImageSpan = document.getElementById('currentImage');
    const totalImagesSpan = document.getElementById('totalImages');
    
    if (currentImageSpan) {
        currentImageSpan.textContent = currentSlideIndex + 1;
    }
    if (totalImagesSpan) {
        totalImagesSpan.textContent = images.length;
    }
}

// Function to start auto slide
function startAutoSlide() {
    stopAutoSlide(); // Clear any existing interval
    if (images.length > 1) {
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, autoSlideDelay);
    }
}

// Function to stop auto slide
function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

// Function to reset auto slide (stop and restart)
function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

// Function to show next slide
function nextSlide() {
    showSlide(currentSlideIndex + 1);
    resetAutoSlide(); // Reset timer when user manually navigates
}

// Function to show previous slide
function prevSlide() {
    showSlide(currentSlideIndex - 1);
    resetAutoSlide(); // Reset timer when user manually navigates
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadGalleryImages();

    // Add event listeners to navigation buttons
    const prevBtn = document.querySelector('.slider-btn-prev');
    const nextBtn = document.querySelector('.slider-btn-next');

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const gallerySection = document.getElementById('gallery');
        if (!gallerySection) return;
        
        const rect = gallerySection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        }
    });

    // Pause auto slide on hover, resume on mouse leave
    const galleryContainer = document.querySelector('.gallery-slider-container');
    if (galleryContainer) {
        galleryContainer.addEventListener('mouseenter', stopAutoSlide);
        galleryContainer.addEventListener('mouseleave', startAutoSlide);
    }

    // Auto-play slider (optional - uncomment to enable)
    // let autoPlayInterval;
    // function startAutoPlay() {
    //     autoPlayInterval = setInterval(() => {
    //         nextSlide();
    //     }, 5000); // Change slide every 5 seconds
    // }
    // function stopAutoPlay() {
    //     if (autoPlayInterval) {
    //         clearInterval(autoPlayInterval);
    //     }
    // }
    // startAutoPlay();
    // // Pause on hover
    // const sliderWrapper = document.querySelector('.gallery-slider-wrapper');
    // if (sliderWrapper) {
    //     sliderWrapper.addEventListener('mouseenter', stopAutoPlay);
    //     sliderWrapper.addEventListener('mouseleave', startAutoPlay);
    // }
});

