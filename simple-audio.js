// Simple Audio System untuk Game Edukatif
// Menggunakan base64 audio untuk kompatibilitas maksimal

class SimpleAudio {
    constructor() {
        this.audioContext = null;
        this.isInitialized = false;
        this.sounds = {};
        this.backgroundMusic = null;
        this.musicVolume = 0.7;
        this.sfxVolume = 0.8;
        
        // Pre-defined audio data (very short audio clips)
        this.audioData = {
            click: this.generateClickSound(),
            success: this.generateSuccessSound(),
            error: this.generateErrorSound(),
            celebration: this.generateCelebrationSound(),
            complete: this.generateCompleteSound(),
            piano: this.generatePianoNotes()
        };
    }

    // Initialize audio system
    init() {
        if (this.isInitialized) return;
        
        try {
            // Try Web Audio API first
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.isInitialized = true;
            console.log('Audio system initialized with Web Audio API');
        } catch (e) {
            // Fallback to HTML5 Audio
            console.warn('Web Audio API not supported, using fallback');
            this.isInitialized = true;
        }
    }

    // Generate simple click sound
    generateClickSound() {
        // Simple beep sound
        return { frequency: 800, duration: 0.1, type: 'square' };
    }

    // Generate success sound (major chord)
    generateSuccessSound() {
        return [
            { frequency: 523.25, duration: 0.2, delay: 0 },     // C5
            { frequency: 659.25, duration: 0.2, delay: 0.05 },  // E5
            { frequency: 783.99, duration: 0.3, delay: 0.1 }    // G5
        ];
    }

    // Generate error sound (dissonant)
    generateErrorSound() {
        return [
            { frequency: 220, duration: 0.2, type: 'sawtooth' },
            { frequency: 200, duration: 0.2, type: 'sawtooth', delay: 0.1 }
        ];
    }

    // Generate celebration sound (upward arpeggio)
    generateCelebrationSound() {
        return [
            { frequency: 523.25, duration: 0.2, delay: 0 },      // C5
            { frequency: 659.25, duration: 0.2, delay: 0.1 },    // E5
            { frequency: 783.99, duration: 0.2, delay: 0.2 },    // G5
            { frequency: 1046.50, duration: 0.4, delay: 0.3 }    // C6
        ];
    }

    // Generate completion sound (fanfare)
    generateCompleteSound() {
        return [
            { frequency: 523.25, duration: 0.2, delay: 0 },
            { frequency: 659.25, duration: 0.2, delay: 0.2 },
            { frequency: 783.99, duration: 0.3, delay: 0.4 },
            { frequency: 1046.50, duration: 0.5, delay: 0.6 }
        ];
    }

    // Generate piano note frequencies
    generatePianoNotes() {
        return {
            'C': 261.63, 'D': 293.66, 'E': 329.63, 'F': 349.23,
            'G': 392.00, 'A': 440.00, 'B': 493.88, 'C2': 523.25
        };
    }

    // Play a single tone using Web Audio API
    playTone(frequency, duration = 0.5, type = 'sine', volume = 0.3) {
        if (!this.isInitialized) {
            this.init();
        }
        
        if (!this.audioContext) return;
        
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
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

    // Play multiple tones (for chords or sequences)
    playTones(tones) {
        tones.forEach(tone => {
            const delay = tone.delay || 0;
            setTimeout(() => {
                this.playTone(tone.frequency, tone.duration, tone.type, tone.volume);
            }, delay * 1000);
        });
    }

    // Play predefined sound
    playSound(soundName) {
        const sound = this.audioData[soundName];
        if (!sound) return;
        
        if (Array.isArray(sound)) {
            // Multiple tones (chord or sequence)
            this.playTones(sound);
        } else if (typeof sound === 'object' && sound.frequency) {
            // Single tone
            this.playTone(sound.frequency, sound.duration, sound.type, sound.volume);
        }
    }

    // Play piano note
    playPianoNote(note) {
        const frequencies = this.audioData.piano;
        if (frequencies[note]) {
            return this.playTone(frequencies[note], 0.8, 'sine', 0.25);
        }
    }

    // Play metronome tick
    playMetronomeTick() {
        this.playTone(1000, 0.05, 'square', 0.1);
    }

    // Play timer sounds
    playTimerTick() {
        this.playTone(440, 0.05, 'square', 0.05);
    }

    playTimerWarning() {
        this.playTone(880, 0.1, 'sawtooth', 0.1);
    }

    // Play puzzle sounds
    playPiecePlace() {
        this.playTone(600, 0.15, 'sine', 0.15);
    }

    playPuzzleComplete() {
        const notes = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50];
        notes.forEach((freq, index) => {
            setTimeout(() => this.playTone(freq, 0.2, 'sine', 0.1), index * 100);
        });
    }

    // Background music
    startBackgroundMusic() {
        if (!this.isInitialized || this.backgroundMusic) return;
        
        try {
            // Create a simple background drone
            this.bgOscillator = this.audioContext.createOscillator();
            this.bgGain = this.audioContext.createGain();
            
            this.bgOscillator.connect(this.bgGain);
            this.bgGain.connect(this.musicGain || this.masterGain);
            
            this.bgOscillator.frequency.setValueAtTime(261.63, this.audioContext.currentTime); // C4
            this.bgOscillator.type = 'sine';
            
            this.bgGain.gain.setValueAtTime(0.05 * this.musicVolume, this.audioContext.currentTime);
            
            this.bgOscillator.start();
            console.log('Background music started');
        } catch (e) {
            console.warn('Error starting background music:', e);
        }
    }

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

    // Volume control
    setMusicVolume(volume) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
        if (this.musicGain) {
            this.musicGain.gain.setValueAtTime(this.musicVolume, this.audioContext.currentTime);
        }
    }

    setSFXVolume(volume) {
        this.sfxVolume = Math.max(0, Math.min(1, volume));
    }
}

// Global audio instance
window.simpleAudio = new SimpleAudio();

// Auto-initialize on first user interaction
function initAudioOnInteraction() {
    if (!window.simpleAudio.isInitialized) {
        window.simpleAudio.init();
        window.simpleAudio.startBackgroundMusic();
    }
}

// Add event listeners for audio initialization
document.addEventListener('click', initAudioOnInteraction, { once: true });
document.addEventListener('touchstart', initAudioOnInteraction, { once: true });
document.addEventListener('keydown', initAudioOnInteraction, { once: true });

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SimpleAudio;
}