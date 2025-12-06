// Game Edukatif Anak-Anak - Main JavaScript File
// Petualangan Belajar - Main Controller

class GameManager {
    constructor() {
        this.totalStars = parseInt(localStorage.getItem('totalStars') || '0');
        this.totalScore = parseInt(localStorage.getItem('totalScore') || '0');
        this.gameProgress = JSON.parse(localStorage.getItem('gameProgress') || '{}');
        this.settings = JSON.parse(localStorage.getItem('settings') || '{"musicVolume": 70, "sfxVolume": 80, "simpleMode": false}');
        
        this.init();
    }

    init() {
        this.updateStats();
        this.initParticleBackground();
        this.initAnimations();
        this.loadSettings();
        
        // Add welcome message
        setTimeout(() => {
            this.showWelcomeMessage();
        }, 1000);
    }

    updateStats() {
        const starsElement = document.getElementById('total-stars');
        const scoreElement = document.getElementById('total-score');
        
        if (starsElement) {
            starsElement.textContent = this.totalStars;
            this.animateNumber(starsElement, this.totalStars);
        }
        if (scoreElement) {
            scoreElement.textContent = this.totalScore;
            this.animateNumber(scoreElement, this.totalScore);
        }
    }

    animateNumber(element, targetNumber) {
        anime({
            targets: { value: 0 },
            value: targetNumber,
            duration: 1500,
            easing: 'easeOutExpo',
            update: function(anim) {
                element.textContent = Math.round(anim.animatables[0].target.value);
            }
        });
    }

    initParticleBackground() {
        // P5.js Particle System
        new p5((p) => {
            let particles = [];
            const numParticles = 50;

            p.setup = () => {
                const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
                canvas.parent('particle-bg');
                canvas.style('position', 'fixed');
                canvas.style('top', '0');
                canvas.style('left', '0');
                canvas.style('z-index', '-1');

                // Create particles
                for (let i = 0; i < numParticles; i++) {
                    particles.push(new Particle(p));
                }
            };

            p.draw = () => {
                p.clear();
                
                // Update and draw particles
                particles.forEach(particle => {
                    particle.update();
                    particle.draw();
                });
            };

            p.windowResized = () => {
                p.resizeCanvas(p.windowWidth, p.windowHeight);
            };

            class Particle {
                constructor(p) {
                    this.p = p;
                    this.x = p.random(p.width);
                    this.y = p.random(p.height);
                    this.vx = p.random(-0.5, 0.5);
                    this.vy = p.random(-0.5, 0.5);
                    this.size = p.random(3, 8);
                    this.color = p.random(['#FFD93D', '#FF6B9D', '#6BCF7F', '#C7CEEA', '#95E1D3']);
                    this.alpha = p.random(0.3, 0.8);
                }

                update() {
                    this.x += this.vx;
                    this.y += this.vy;

                    // Wrap around screen
                    if (this.x < 0) this.x = this.p.width;
                    if (this.x > this.p.width) this.x = 0;
                    if (this.y < 0) this.y = this.p.height;
                    if (this.y > this.p.height) this.y = 0;
                }

                draw() {
                    this.p.push();
                    this.p.translate(this.x, this.y);
                    this.p.noStroke();
                    this.p.fill(this.color + Math.floor(this.alpha * 255).toString(16).padStart(2, '0'));
                    this.p.ellipse(0, 0, this.size);
                    this.p.pop();
                }
            }
        });
    }

    initAnimations() {
        // Animate title text
        if (document.querySelector('[data-splitting]')) {
            Splitting();
            
            anime({
                targets: '[data-splitting] .char',
                translateY: [-100, 0],
                opacity: [0, 1],
                easing: 'easeOutExpo',
                duration: 1400,
                delay: (el, i) => 30 * i
            });
        }

        // Animate game cards
        anime({
            targets: '.game-card',
            translateY: [50, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 1000,
            delay: (el, i) => 200 * i,
            complete: () => {
                this.addHoverEffects();
            }
        });

        // Mascot bounce animation
        anime({
            targets: '.mascot-container',
            scale: [0.8, 1],
            opacity: [0, 1],
            easing: 'easeOutBounce',
            duration: 1500,
            delay: 500
        });
    }

    addHoverEffects() {
        const cards = document.querySelectorAll('.game-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                anime({
                    targets: card,
                    scale: 1.05,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });

            card.addEventListener('mouseleave', () => {
                anime({
                    targets: card,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
        });
    }

    showWelcomeMessage() {
        // Create welcome popup
        const welcomeDiv = document.createElement('div');
        welcomeDiv.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl p-8 shadow-2xl z-50 max-w-sm mx-4';
        welcomeDiv.innerHTML = `
            <div class="text-center">
                <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <span class="text-3xl">👋</span>
                </div>
                <h3 class="title-font text-2xl text-gray-800 mb-3">Halo! Selamat Datang!</h3>
                <p class="text-gray-600 mb-6">
                    Siap untuk belajar sambil bermain? Pilih salah satu game di bawah ini dan mulai petualanganmu!
                </p>
                <button onclick="this.parentElement.parentElement.remove()" class="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                    Ayo Mulai!
                </button>
            </div>
        `;
        
        document.body.appendChild(welcomeDiv);

        // Animate welcome popup
        anime({
            targets: welcomeDiv,
            scale: [0, 1],
            opacity: [0, 1],
            easing: 'easeOutBack',
            duration: 800
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (welcomeDiv.parentElement) {
                anime({
                    targets: welcomeDiv,
                    scale: 0,
                    opacity: 0,
                    easing: 'easeInBack',
                    duration: 500,
                    complete: () => welcomeDiv.remove()
                });
            }
        }, 5000);
    }

    navigateToGame(gameUrl) {
        // Add loading animation
        this.showLoadingAnimation();
        
        setTimeout(() => {
            window.location.href = gameUrl;
        }, 1000);
    }

    showLoadingAnimation() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center';
        loadingDiv.innerHTML = `
            <div class="bg-white rounded-3xl p-8 text-center">
                <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <span class="text-2xl animate-spin">⏳</span>
                </div>
                <p class="text-gray-700 font-semibold">Memuat game...</p>
            </div>
        `;
        
        document.body.appendChild(loadingDiv);

        anime({
            targets: loadingDiv,
            opacity: [0, 1],
            duration: 300
        });
    }

    showProgress() {
        const modal = document.getElementById('progress-modal');
        modal.classList.remove('hidden');
        
        // Initialize progress chart
        this.initProgressChart();
        
        anime({
            targets: modal.querySelector('.bg-white'),
            scale: [0.8, 1],
            opacity: [0, 1],
            easing: 'easeOutBack',
            duration: 500
        });
    }

    initProgressChart() {
        const chartDom = document.getElementById('progress-chart');
        const myChart = echarts.init(chartDom);
        
        const option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [
                {
                    name: 'Progress Game',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 20,
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: this.gameProgress.matching || 0, name: 'Mencocokkan', itemStyle: { color: '#FFD93D' } },
                        { value: this.gameProgress.quiz || 0, name: 'Kuis', itemStyle: { color: '#FF6B9D' } },
                        { value: this.gameProgress.puzzle || 0, name: 'Puzzle', itemStyle: { color: '#6BCF7F' } },
                        { value: this.gameProgress.music || 0, name: 'Musik', itemStyle: { color: '#C7CEEA' } }
                    ]
                }
            ]
        };
        
        myChart.setOption(option);
    }

    showSettings() {
        const modal = document.getElementById('settings-modal');
        modal.classList.remove('hidden');
        
        anime({
            targets: modal.querySelector('.bg-white'),
            scale: [0.8, 1],
            opacity: [0, 1],
            easing: 'easeOutBack',
            duration: 500
        });
    }

    loadSettings() {
        const musicVolume = document.getElementById('music-volume');
        const sfxVolume = document.getElementById('sfx-volume');
        const simpleMode = document.getElementById('simple-mode');
        
        if (musicVolume) musicVolume.value = this.settings.musicVolume;
        if (sfxVolume) sfxVolume.value = this.settings.sfxVolume;
        if (simpleMode) simpleMode.checked = this.settings.simpleMode;
    }

    saveSettings() {
        const musicVolume = document.getElementById('music-volume');
        const sfxVolume = document.getElementById('sfx-volume');
        const simpleMode = document.getElementById('simple-mode');
        
        this.settings = {
            musicVolume: parseInt(musicVolume.value),
            sfxVolume: parseInt(sfxVolume.value),
            simpleMode: simpleMode.checked
        };
        
        localStorage.setItem('settings', JSON.stringify(this.settings));
        this.closeModal();
        
        // Show success message
        this.showNotification('Pengaturan berhasil disimpan!', 'success');
    }

    closeModal() {
        const modals = document.querySelectorAll('[id$="-modal"]');
        modals.forEach(modal => {
            anime({
                targets: modal.querySelector('.bg-white'),
                scale: 0.8,
                opacity: 0,
                easing: 'easeInBack',
                duration: 300,
                complete: () => {
                    modal.classList.add('hidden');
                }
            });
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 bg-${type === 'success' ? 'green' : 'blue'}-500 text-white px-6 py-3 rounded-xl shadow-lg z-50`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        anime({
            targets: notification,
            translateX: [300, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 500
        });
        
        setTimeout(() => {
            anime({
                targets: notification,
                translateX: 300,
                opacity: 0,
                easing: 'easeInExpo',
                duration: 500,
                complete: () => notification.remove()
            });
        }, 3000);
    }

    // Update game progress
    updateGameProgress(gameType, stars = 0, score = 0) {
        if (!this.gameProgress[gameType]) {
            this.gameProgress[gameType] = 0;
        }
        
        this.gameProgress[gameType] += stars;
        this.totalStars += stars;
        this.totalScore += score;
        
        localStorage.setItem('gameProgress', JSON.stringify(this.gameProgress));
        localStorage.setItem('totalStars', this.totalStars.toString());
        localStorage.setItem('totalScore', this.totalScore.toString());
        
        this.updateStats();
    }

    // Initialize audio context
    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.audioContext.createGain();
            this.masterGain.connect(this.audioContext.destination);
            this.masterGain.gain.value = this.settings.musicVolume / 100;
        } catch (e) {
            console.warn('Web Audio API not supported');
        }
    }

    // Play sound effect
    playSound(soundType) {
        if (!this.audioContext || this.settings.sfxVolume === 0) return;
        
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.masterGain);
            
            // Different frequencies for different sound types
            const frequencies = {
                click: 800,
                success: 523.25, // C5
                error: 220,      // A3
                complete: 659.25, // E5
                celebration: 783.99 // G5
            };
            
            oscillator.frequency.setValueAtTime(frequencies[soundType] || 440, this.audioContext.currentTime);
            oscillator.type = soundType === 'error' ? 'sawtooth' : 'sine';
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.3 * (this.settings.sfxVolume / 100), this.audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.3);
        } catch (e) {
            console.warn('Error playing sound:', e);
        }
    }

    // Background music control
    toggleBackgroundMusic() {
        if (!this.audioContext) {
            this.initAudio();
        }
        
        if (this.settings.musicVolume > 0) {
            this.masterGain.gain.setValueAtTime(this.settings.musicVolume / 100, this.audioContext.currentTime);
        } else {
            this.masterGain.gain.setValueAtTime(0, this.audioContext.currentTime);
        }
    }
}

// Global functions
function navigateToGame(gameUrl) {
    gameManager.navigateToGame(gameUrl);
}

function showProgress() {
    gameManager.showProgress();
}

function showSettings() {
    gameManager.showSettings();
}

function closeModal() {
    gameManager.closeModal();
}

function saveSettings() {
    gameManager.saveSettings();
}

// Initialize game manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.gameManager = new GameManager();
});

// Add some fun interactions
document.addEventListener('click', (e) => {
    // Play click sound for all interactive elements
    if (window.simpleAudio) {
        window.simpleAudio.playSound('click');
    }
    
    // Create ripple effect on click
    if (e.target.classList.contains('game-card')) {
        createRippleEffect(e);
    }
});

function createRippleEffect(e) {
    const ripple = document.createElement('div');
    const rect = e.target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        pointer-events: none;
        z-index: 1;
    `;
    
    e.target.style.position = 'relative';
    e.target.appendChild(ripple);
    
    anime({
        targets: ripple,
        scale: [0, 1],
        opacity: [1, 0],
        duration: 600,
        easing: 'easeOutExpo',
        complete: () => ripple.remove()
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case '1':
            navigateToGame('matching-game.html');
            break;
        case '2':
            navigateToGame('quiz-game.html');
            break;
        case '3':
            navigateToGame('puzzle-game.html');
            break;
        case '4':
            navigateToGame('music-game.html');
            break;
        case 'p':
        case 'P':
            showProgress();
            break;
        case 's':
        case 'S':
            showSettings();
            break;
        case 'Escape':
            closeModal();
            break;
    }
});

// Initialize audio on first user interaction
document.addEventListener('click', () => {
    if (window.gameManager && !gameManager.audioContext) {
        gameManager.initAudio();
        gameManager.toggleBackgroundMusic();
    }
}, { once: true });