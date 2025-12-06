// Audio Generator untuk Game Edukatif
// Menghasilkan audio programmatically menggunakan Web Audio API

class AudioGenerator {
    constructor() {
        this.audioContext = null;
        this.masterGain = null;
        this.isInitialized = false;
        this.backgroundMusic = null;
        this.musicGain = null;
        
        // Audio settings
        this.musicVolume = 0.7;
        this.sfxVolume = 0.8;
        
        // Background music oscillator
        this.bgOscillator = null;
        this.bgGain = null;
    }

    // Initialize audio context (must be called after user interaction)
    init() {
        if (this.isInitialized) return;
        
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.audioContext.createGain();
            this.masterGain.connect(this.audioContext.destination);
            this.masterGain.gain.value = 1.0;
            
            // Create music gain node
            this.musicGain = this.audioContext.createGain();
            this.musicGain.connect(this.masterGain);
            this.musicGain.gain.value = this.musicVolume;
            
            this.isInitialized = true;
            console.log('Audio system initialized successfully');
        } catch (e) {
            console.warn('Web Audio API not supported:', e);
        }
    }

    // Play a tone with specific frequency and duration
    playTone(frequency, duration = 0.5, type = 'sine', volume = 0.3) {
        if (!this.isInitialized) {
            console.warn('Audio not initialized');
            return;
        }
        
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.masterGain);
            
            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
            oscillator.type = type;
            
            // Volume envelope
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(volume * this.sfxVolume, this.audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
            
            return oscillator;
        } catch (e) {
            console.warn('Error playing tone:', e);
        }
    }

    // Play success sound
    playSuccess() {
        // Major chord (C-E-G)
        this.playTone(523.25, 0.3, 'sine', 0.2); // C5
        setTimeout(() => this.playTone(659.25, 0.3, 'sine', 0.15), 50); // E5
        setTimeout(() => this.playTone(783.99, 0.4, 'sine', 0.1), 100); // G5
    }

    // Play error sound
    playError() {
        // Dissonant sound
        this.playTone(220, 0.2, 'sawtooth', 0.1); // A3
        setTimeout(() => this.playTone(200, 0.2, 'sawtooth', 0.1), 50);
    }

    // Play click sound
    playClick() {
        this.playTone(800, 0.1, 'square', 0.1);
    }

    // Play celebration sound
    playCelebration() {
        // Upward arpeggio
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, index) => {
            setTimeout(() => this.playTone(freq, 0.4, 'sine', 0.15), index * 100);
        });
    }

    // Play completion sound
    playComplete() {
        // Fanfare
        this.playTone(523.25, 0.2, 'sine', 0.2);
        setTimeout(() => this.playTone(659.25, 0.2, 'sine', 0.2), 200);
        setTimeout(() => this.playTone(783.99, 0.3, 'sine', 0.2), 400);
        setTimeout(() => this.playTone(1046.50, 0.5, 'sine', 0.2), 600);
    }

    // Start background music
    startBackgroundMusic() {
        if (!this.isInitialized || this.bgOscillator) return;
        
        try {
            // Create a pleasant background tone (C major drone)
            this.bgOscillator = this.audioContext.createOscillator();
            this.bgGain = this.audioContext.createGain();
            
            this.bgOscillator.connect(this.bgGain);
            this.bgGain.connect(this.musicGain);
            
            // Create a soft, pleasant drone
            this.bgOscillator.frequency.setValueAtTime(261.63, this.audioContext.currentTime); // C4
            this.bgOscillator.type = 'sine';
            
            // Very soft volume
            this.bgGain.gain.setValueAtTime(0.05 * this.musicVolume, this.audioContext.currentTime);
            
            this.bgOscillator.start();
            console.log('Background music started');
        } catch (e) {
            console.warn('Error starting background music:', e);
        }
    }

    // Stop background music
    stopBackgroundMusic() {
        if (this.bgOscillator) {
            try {
                this.bgOscillator.stop();
                this.bgOscillator = null;
                this.bgGain = null;
                console.log('Background music stopped');
            } catch (e) {
                console.warn('Error stopping background music:', e);
            }
        }
    }

    // Set music volume (0-1)
    setMusicVolume(volume) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
        if (this.musicGain) {
            this.musicGain.gain.setValueAtTime(this.musicVolume, this.audioContext.currentTime);
        }
    }

    // Set SFX volume (0-1)
    setSFXVolume(volume) {
        this.sfxVolume = Math.max(0, Math.min(1, volume));
    }

    // Play metronome tick
    playMetronomeTick() {
        this.playTone(1000, 0.05, 'square', 0.1);
    }

    // Play piano note
    playPianoNote(note) {
        const frequencies = {
            'C': 261.63,
            'D': 293.66,
            'E': 329.63,
            'F': 349.23,
            'G': 392.00,
            'A': 440.00,
            'B': 493.88,
            'C2': 523.25
        };
        
        if (frequencies[note]) {
            return this.playTone(frequencies[note], 0.8, 'sine', 0.25);
        }
    }

    // Play timer tick sound
    playTimerTick() {
        this.playTone(440, 0.05, 'square', 0.05);
    }

    // Play timer warning sound (when time is low)
    playTimerWarning() {
        this.playTone(880, 0.1, 'sawtooth', 0.1);
    }

    // Play puzzle piece placement sound
    playPiecePlace() {
        this.playTone(600, 0.15, 'sine', 0.15);
    }

    // Play puzzle completion sound
    playPuzzleComplete() {
        // Ascending scale
        const notes = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50];
        notes.forEach((freq, index) => {
            setTimeout(() => this.playTone(freq, 0.2, 'sine', 0.1), index * 100);
        });
    }
}

// Global audio instance
window.audioGenerator = new AudioGenerator();

// Auto-initialize on first user interaction
function initAudioOnInteraction() {
    if (!window.audioGenerator.isInitialized) {
        window.audioGenerator.init();
        window.audioGenerator.startBackgroundMusic();
    }
}

// Add event listeners for audio initialization
document.addEventListener('click', initAudioOnInteraction, { once: true });
document.addEventListener('touchstart', initAudioOnInteraction, { once: true });
document.addEventListener('keydown', initAudioOnInteraction, { once: true });

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AudioGenerator;
}