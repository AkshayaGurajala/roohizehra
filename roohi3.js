document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const pages = document.querySelectorAll('.page');
    const viewGalleryBtn = document.getElementById('view-gallery');
    const nextSurprise1Btn = document.getElementById('next-surprise-1');
    const nextSurprise2Btn = document.getElementById('next-surprise-2');
    const restartBtn = document.getElementById('restart');
    const countdownElement = document.getElementById('countdown');
    const birthdayWish = document.getElementById('birthday-wish');
    const balloonContainer = document.getElementById('balloon-container');
    const backgroundMusic = document.getElementById('background-music');
    const candleSound = document.getElementById('candle-sound');
    const popSound = document.getElementById('pop-sound');
    const poppersContainer = document.querySelector('.poppers-container');

    // Balloon colors
    const balloonColors = [
        '#FF6B8B', '#FFB8C6', '#FFD166', '#06D6A0', 
        '#118AB2', '#073B4C', '#EF476F', '#FFD166'
    ];

    // Initialize
    createBalloons(15);
    setupGalleryHover();

    // Event Listeners
    viewGalleryBtn.addEventListener('click', function() {
        navigateTo('gallery');
        backgroundMusic.play().catch(e => console.log("Audio play failed:", e));
    });

    nextSurprise1Btn.addEventListener('click', function() {
        navigateTo('countdown-section');
        startCountdown();
    });

    nextSurprise2Btn.addEventListener('click', function() {
        navigateTo('final-message');
        createConfetti();
    });

    restartBtn.addEventListener('click', function() {
        navigateTo('homepage');
        resetCandles();
    });

    // Create floating balloons
    function createBalloons(count) {
        balloonContainer.innerHTML = '';
        
        for (let i = 0; i < count; i++) {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            
            // Random properties
            const size = Math.random() * 40 + 80;
            const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 10 + 10;
            const delay = Math.random() * 15;
            const rotation = Math.random() * 30 - 15;
            
            balloon.style.width = `${size}px`;
            balloon.style.height = `${size * 1.2}px`;
            balloon.style.background = color;
            balloon.style.left = `${left}%`;
            balloon.style.animationDuration = `${animationDuration}s`;
            balloon.style.animationDelay = `${delay}s`;
            balloon.style.transform = `rotate(${rotation}deg)`;
            
            balloonContainer.appendChild(balloon);
        }
    }

    // Setup gallery image hover effects
    function setupGalleryHover() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.querySelector('.quote-overlay').style.transform = 'translateY(0)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.querySelector('.quote-overlay').style.transform = 'translateY(100%)';
            });
        });
    }

    // Navigate between pages
    function navigateTo(pageId) {
        pages.forEach(page => {
            page.classList.remove('active');
            if (page.id === pageId) {
                page.classList.add('active');
            }
        });
    }

    // Countdown function
    function startCountdown() {
        let count = 5;
        countdownElement.textContent = count;
        
        const timer = setInterval(() => {
            count--;
            countdownElement.textContent = count;
            
            if (count <= 0) {
                clearInterval(timer);
                blowOutCandles();
                showBirthdayWish();
                triggerPoppers();
            }
        }, 1000);
    }

    // Blow out candles animation
    function blowOutCandles() {
        const flames = document.querySelectorAll('.flame');
        candleSound.play();
        
        flames.forEach((flame, index) => {
            setTimeout(() => {
                flame.style.animation = 'none';
                flame.style.opacity = '0';
            }, index * 200);
        });
    }

    // Reset candles (for restart)
    function resetCandles() {
        const flames = document.querySelectorAll('.flame');
        
        flames.forEach(flame => {
            flame.style.animation = 'flicker 1.5s infinite alternate';
            flame.style.opacity = '1';
        });
        
        countdownElement.textContent = '5';
        birthdayWish.classList.remove('visible');
    }

    // Show birthday wish popup
    function showBirthdayWish() {
        setTimeout(() => {
            birthdayWish.classList.add('visible');
        }, 1500);
    }

    // Trigger poppers animation
    function triggerPoppers() {
        popSound.play();
        const poppers = document.querySelectorAll('.popper');
        
        poppers.forEach((popper, index) => {
            // Random properties
            const left = Math.random() * 100;
            const size = Math.random() * 20 + 10;
            const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
            
            popper.style.left = `${left}%`;
            popper.style.width = `${size}px`;
            popper.style.height = `${size}px`;
            popper.style.background = color;
            popper.style.opacity = '1';
            
            // Animate
            setTimeout(() => {
                popper.style.transform = `translateY(-${Math.random() * 100 + 50}px) rotate(${Math.random() * 360}deg)`;
                popper.style.opacity = '0';
                popper.style.transition = 'all 1s ease-out';
            }, index * 200);
            
            // Reset for next time
            setTimeout(() => {
                popper.style.transform = 'translateY(0) rotate(0deg)';
                popper.style.opacity = '0';
                popper.style.transition = 'none';
            }, 1500);
        });
    }

    // Create confetti effect
    function createConfetti() {
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'balloon';
                confetti.style.width = `${Math.random() * 10 + 5}px`;
                confetti.style.height = `${Math.random() * 10 + 5}px`;
                confetti.style.background = balloonColors[Math.floor(Math.random() * balloonColors.length)];
                confetti.style.left = `${Math.random() * 100}%`;
                confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
                confetti.style.animationDelay = '0s';
                confetti.style.top = '-10px';
                balloonContainer.appendChild(confetti);
                
                // Remove after animation
                setTimeout(() => {
                    confetti.remove();
                }, 5000);
            }, i * 50);
        }
    }

    // Animate cake flame continuously
    setInterval(() => {
        const flames = document.querySelectorAll('.flame');
        flames.forEach(flame => {
            if (flame.style.opacity !== '0') {
                flame.style.animation = 'none';
                void flame.offsetWidth; // Trigger reflow
                flame.style.animation = 'flicker 1.5s infinite alternate';
            }
        });
    }, 1500);
});