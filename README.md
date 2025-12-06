# 🎭 Mood Detector Program

Program Python untuk mendeteksi mood/suasana hati berdasarkan analisis teks yang diinput pengguna.

## 📋 Fitur

- **Deteksi Mood Otomatis**: Menganalisis teks dan mendeteksi 10+ jenis mood berbeda
- **Analisis Kata Kunci**: Menggunakan database kata kunci dalam bahasa Indonesia dan Inggris
- **Sistem Scoring**: Memberikan tingkat keyakinan untuk setiap deteksi mood
- **Riwayat Mood**: Menyimpan dan menampilkan riwayat mood dengan timestamp
- **Saran Personalised**: Memberikan saran berdasarkan mood yang terdeteksi
- **Interface User-Friendly**: Antarmuka command line yang mudah digunakan

## 🎯 Jenis Mood yang Dapat Dideteksi

1. **Bahagia** - senang, gembira, riang, ceria
2. **Sedih** - murung, galau, kecewa
3. **Marah** - kesal, jengkel, dongkol
4. **Cemas** - khawatir, gugup, stress
5. **Tenang** - damai, rileks, santai
6. **Bersemangat** - antusias, excited, energetic
7. **Bosan** - jenuh, monoton
8. **Takut** - ngeri, paranoid
9. **Bingung** - pusing, confused
10. **Lelah** - capek, tired, exhausted

## 🛠️ Instalasi dan Penggunaan

### Persyaratan Sistem
- Python 3.6 atau lebih tinggi
- Tidak memerlukan library eksternal (menggunakan built-in Python)

### Cara Menjalankan
1. **Download/Clone** file program:
   ```bash
   # Jika Anda memiliki git
   git clone [repository-url]
   
   # Atau download langsung file mood_detector.py
   ```

2. **Jalankan program**:
   ```bash
   python3 mood_detector.py
   ```
   
   Atau di Windows:
   ```bash
   python mood_detector.py
   ```

3. **Mulai menggunakan**:
   - Ketik perasaan atau kondisi Anda saat ini
   - Program akan menganalisis dan memberikan hasil deteksi mood
   - Gunakan perintah khusus untuk fitur tambahan

## 💻 Perintah yang Tersedia

| Perintah | Fungsi |
|----------|--------|
| `history` | Menampilkan 5 riwayat mood terakhir |
| `quit` atau `exit` | Keluar dari program |
| Teks bebas | Analisis mood dari teks yang diinput |

## 📊 Contoh Penggunaan

```
Bagaimana perasaan Anda hari ini? Hari ini saya merasa sangat bahagia dan bersemangat

🎭 HASIL DETEKSI MOOD:
Mood Utama: BAHAGIA
Tingkat Keyakinan: 80.0%

Detail Analisis:
  - bahagia: 1 kata kunci ditemukan
    Kata: bahagia
  - bersemangat: 1 kata kunci ditemukan
    Kata: bersemangat

💡 Saran: Bagus! Pertahankan mood positif ini. Berbagi kebahagiaan dengan orang lain bisa membuatnya bertahan lebih lama.
```

## 🗂️ Struktur File

```
mood-detector/
├── mood_detector.py      # Program utama
├── requirements.txt      # Dependencies (kosong - menggunakan built-in)
├── README.md            # Dokumentasi ini
└── mood_history.json    # File riwayat (dibuat otomatis)
```

## 🔧 Cara Kerja Program

1. **Input Processing**: Mengonversi input pengguna ke huruf kecil untuk analisis
2. **Keyword Matching**: Mencocokkan kata-kata dalam input dengan database kata kunci mood
3. **Scoring**: Menghitung skor berbobot untuk setiap mood berdasarkan frekuensi dan nilai mood
4. **Primary Mood Detection**: Menentukan mood utama dengan skor tertinggi
5. **Confidence Calculation**: Menghitung tingkat keyakinan berdasarkan skor
6. **History Logging**: Menyimpan hasil deteksi ke file JSON dengan timestamp
7. **Advice Generation**: Memberikan saran sesuai dengan mood yang terdeteksi

## 📈 Sistem Scoring

Setiap mood memiliki skor dasar:
- Bahagia: 8
- Bersemangat: 7  
- Tenang: 6
- Bingung: 4
- Bosan, Lelah: 3
- Cemas, Takut: 2
- Sedih, Marah: 1

**Formula**: `Skor Akhir = Jumlah Kata Kunci × Skor Mood`

## 📝 Format Data Riwayat

```json
{
  "timestamp": "2024-01-01T12:00:00",
  "text": "input pengguna",
  "detected_mood": "bahagia",
  "confidence": 85.5,
  "mood_details": {
    "bahagia": {
      "count": 2,
      "words": ["senang", "gembira"],
      "score": 8
    }
  }
}
```

## 🎨 Kustomisasi

### Menambah Kata Kunci Baru
Edit dictionary `mood_keywords` di dalam class `MoodDetector`:

```python
self.mood_keywords = {
    'bahagia': ['senang', 'gembira', 'kata_baru_anda'],
    # ... mood lainnya
}
```

### Menambah Mood Baru
1. Tambahkan kata kunci di `mood_keywords`
2. Tambahkan skor di `mood_scores`  
3. Tambahkan saran di method `get_mood_advice()`

### Mengubah Jumlah Riwayat
Ubah parameter `limit` di method `show_mood_history()` atau saat memanggil:

```python
detector.show_mood_history(limit=10)  # Tampilkan 10 riwayat terakhir
```

## 🤝 Kontribusi

Silakan berkontribusi untuk meningkatkan program ini:
- Tambahkan kata kunci mood baru
- Perbaiki algoritma deteksi
- Tambahkan fitur baru
- Perbaiki bug

## 📄 Lisensi

Program ini bersifat open source dan dapat digunakan untuk tujuan edukasi dan pengembangan.

## ⚠️ Catatan Penting

- Program ini untuk tujuan **edukasi dan hiburan**
- **Tidak menggantikan konsultasi profesional** untuk masalah kesehatan mental
- Akurasi deteksi tergantung pada kata-kata yang digunakan dalam input
- Untuk masalah serius, konsultasikan dengan ahli kesehatan mental

## 📞 Support

Jika mengalami masalah atau memiliki saran, silakan:
1. Periksa dokumentasi ini
2. Cek contoh penggunaan
3. Buat issue di repository (jika menggunakan git)

---

**Dibuat dengan ❤️ untuk membantu memahami dan memantau suasana hati Anda**
# GAME
