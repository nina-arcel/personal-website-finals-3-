// Initialize slide index
let slideIndex = 1;

// Initialize slideshow when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if slides exist on the page
    if (document.getElementsByClassName('mySlides').length > 0) {
        showSlides(slideIndex);
    }
});

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Main slideshow function
function showSlides(n) {
    let i;
    
    // Get all slides and thumbnails
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("demo");
    let captionText = document.getElementById("caption");
    
    // Check if slides exist
    if (!slides || slides.length === 0) return;
    
    // Loop back to beginning or end
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    // Remove active class from all thumbnails
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    // Show current slide
    slides[slideIndex - 1].style.display = "block";
    
    // Highlight current thumbnail and update caption
    if (dots.length > 0) {
        dots[slideIndex - 1].className += " active";
        
        // Update caption if caption element exists
        if (captionText) {
            captionText.innerHTML = dots[slideIndex - 1].alt;
        }
    }
}

// Auto-advance slides every 5 seconds (optional)
let slideInterval;

function startSlideshow() {
    // Clear any existing interval
    if (slideInterval) {
        clearInterval(slideInterval);
    }
    // Start new interval
    slideInterval = setInterval(function() {
        plusSlides(1);
    }, 5000);
}

function stopSlideshow() {
    clearInterval(slideInterval);
}

// Start slideshow automatically when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementsByClassName('mySlides').length > 0) {
        // Small delay to ensure everything is loaded
        setTimeout(startSlideshow, 1000);
        
        // Stop slideshow when user interacts with navigation
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        const thumbnails = document.querySelectorAll('.demo');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                stopSlideshow();
                startSlideshow(); // Restart after interaction
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                stopSlideshow();
                startSlideshow(); // Restart after interaction
            });
        }
        
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                stopSlideshow();
                startSlideshow(); // Restart after interaction
            });
        });
    }
});

// Pause slideshow when mouse hovers over gallery (optional)
document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery-container');
    if (gallery) {
        gallery.addEventListener('mouseenter', function() {
            stopSlideshow();
        });
        
        gallery.addEventListener('mouseleave', function() {
            startSlideshow();
        });
    }
});

// Keyboard navigation (left/right arrows)
document.addEventListener('keydown', function(e) {
    // Only if gallery is visible
    const activeTab = document.querySelector('.tab-content.active-tab');
    if (activeTab && activeTab.id === 'about') {
        if (e.key === 'ArrowLeft') {
            plusSlides(-1);
        } else if (e.key === 'ArrowRight') {
            plusSlides(1);
        }
    }
});

// Touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery-container');
    if (gallery) {
        gallery.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        gallery.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }
});

function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance for swipe
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - next slide
        plusSlides(1);
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - previous slide
        plusSlides(-1);
    }
}