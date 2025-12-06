# Game Edukatif Anak-Anak - Design Style Guide

## Design Philosophy

### Visual Language
- **Playful & Educational**: Kombinasi desain yang menyenangkan namun tetap fokus pada pembelajaran
- **Child-Friendly Interface**: Tombol besar, ikon yang jelas, dan navigasi sederhana
- **Bright & Cheerful Colors**: Warna-warna cerah yang menarik perhatian anak-anak
- **Cute Characters**: Karakter mascot yang menggemaskan dan menjadi teman bermain

### Color Palette
- **Primary Colors**: 
  - Sunny Yellow (#FFD93D) - untuk elemen utama dan highlight
  - Sky Blue (#6BCF7F) - untuk background dan area bermain
  - Coral Pink (#FF6B9D) - untuk tombol dan aksen
  - Lavender Purple (#C7CEEA) - untuk area informasi
- **Secondary Colors**:
  - Mint Green (#95E1D3) - untuk area khusus
  - Peach Orange (#FFA07A) - untuk warning dan notifikasi
  - Soft Gray (#F5F5F5) - untuk background netral

### Typography
- **Display Font**: "Fredoka One" - font playful untuk judul dan heading
- **Body Font**: "Open Sans" - font yang mudah dibaca untuk konten
- **Size Guidelines**: 
  - Heading: 2.5rem - 3rem
  - Subheading: 1.5rem - 2rem
  - Body: 1rem - 1.25rem
  - Button: 1.25rem - 1.5rem

## Visual Effects & Animations

### Core Libraries Used
1. **Anime.js**: Untuk animasi smooth pada karakter dan UI elements
2. **p5.js**: Untuk efek partikel dan interaktivitas visual
3. **ECharts.js**: Untuk visualisasi progress dan skor
4. **Splide.js**: Untuk carousel gambar dan karakter
5. **Matter.js**: Untuk fisika sederhana pada game puzzle
6. **PIXI.js**: Untuk efek visual yang lebih kompleks
7. **Shader-park**: Untuk background efek yang dinamis

### Animation Effects
- **Character Bounce**: Karakter mascot dengan animasi bounce yang menggemaskan
- **Button Hover**: Scale dan color transition yang smooth
- **Success Celebration**: Partikel burst dan confetti saat jawaban benar
- **Loading Animation**: Animasi karakter yang bermain sambil loading
- **Transition Effects**: Smooth page transition dengan slide dan fade

### Background Effects
- **Gradient Flow**: Background dengan gradien bergerak lembut
- **Floating Shapes**: Bentuk-bentuk geometris yang melayang
- **Particle System**: Partikel berwarna-warni yang bergerak

### Interactive Elements
- **Drag & Drop**: Visual feedback saat drag (shadow, scale)
- **Click Feedback**: Ripple effect dan scale animation
- **Hover States**: Color shift dan subtle glow
- **Progress Indicators**: Animated progress bars dan star ratings

## Layout & Structure

### Grid System
- **Container**: Max-width 1200px, centered
- **Breakpoints**: Mobile-first approach
- **Spacing**: 8px base unit system
- **Cards**: Rounded corners (16px), soft shadows

### Component Design
- **Buttons**: Rounded, besar, dengan icon dan warna yang kontras
- **Cards**: Background putih dengan shadow halus
- **Modals**: Overlay dengan backdrop blur
- **Navigation**: Bottom navigation untuk mobile, sidebar untuk desktop

### Icon System
- **Style**: Outline icons yang friendly
- **Size**: 24px - 48px untuk tombol
- **Color**: Mengikuti color palette utama

## Character Design

### Main Mascot
- **Character**: Binatang lucu (kucing, kelinci, atau beruang)
- **Style**: Kartun sederhana dengan warna-warni
- **Expression**: Berbagai ekspresi (senang, bingung, bangga)
- **Animation**: Idle animation, celebration dance, guiding gestures

### Supporting Characters
- **Reward Characters**: Koleksi binatang kecil sebagai hadiah
- **Game Elements**: Karakter huruf dan angka yang berbicara
- **Background Elements**: Elemen dekoratif yang bergerak

## Audio-Visual Harmony

### Sound Design
- **Background Music**: Musik ceria dan upbeat
- **Sound Effects**: 
  - Klik/Select: Soft chime
  - Success: Celebration sound
  - Error: Gentle buzz
  - Completion: Victory fanfare

### Visual Feedback
- **Color Response**: Warna berubah sesuai dengan suara
- **Sync Animation**: Animasi yang seirama dengan beat musik
- **Interactive Audio**: Setiap interaksi menghasilkan suara

## Accessibility

### Child-Safe Design
- **Large Touch Targets**: Minimal 44px untuk semua tombol
- **High Contrast**: Rasio kontras minimal 4.5:1
- **Clear Navigation**: Breadcrumb dan back button yang jelas
- **No Small Text**: Semua teks cukup besar untuk dibaca anak

### Responsive Design
- **Mobile First**: Optimized untuk tablet dan smartphone
- **Touch Friendly**: Semua interaksi support sentuhan
- **Landscape Support**: Mode landscape untuk pengalaman lebih baik

This design approach ensures the game is both educational and entertaining, with a focus on creating a safe, engaging, and visually appealing environment for children to learn and play.