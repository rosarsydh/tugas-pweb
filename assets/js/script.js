/**
 * ==============================================================================
 * TUGAS PEMROGRAMAN BERBASIS WEB (PWEB)
 * Script : Vanilla JavaScript & DOM Manipulation Sederhana
 * Nama   : Eka Lailatur Rosyidah (Rosa) - Teknologi Informasi UNEJ
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Tahun Otomatis di Footer
  const elemenTahun = document.getElementById('tahun-footer');
  if (elemenTahun) {
    elemenTahun.textContent = new Date().getFullYear();
  }

  // 2. Toggle Menu Navigasi di Mobile (HP)
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const daftarLink = document.querySelectorAll('.nav-item');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('buka');
    });

    // Menutup menu setelah salah satu link diklik
    daftarLink.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('buka');
      });
    });
  }

  // 3. Mode Gelap & Mode Cerah (Dark / Light Theme Navy)
  const themeBtn = document.getElementById('theme-btn');
  const themeIcon = document.getElementById('theme-icon');

  // Cek apakah user pernah menyimpan preferensi tema sebelumnya
  const temaTersimpan = localStorage.getItem('tema-rosa');
  if (temaTersimpan === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeIcon) themeIcon.textContent = '☀️';
  } else {
    document.body.classList.remove('dark-mode');
    if (themeIcon) themeIcon.textContent = '🌙';
  }

  // Event klik tombol tema
  if (themeBtn && themeIcon) {
    themeBtn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');

      if (isDark) {
        themeIcon.textContent = '☀️';
        localStorage.setItem('tema-rosa', 'dark');
      } else {
        themeIcon.textContent = '🌙';
        localStorage.setItem('tema-rosa', 'light');
      }
    });
  }

  // 4. Form Kritik & Saran (Bisa Anonim) - Manipulasi DOM
  const formKritik = document.getElementById('form-kritik');
  const inputNama = document.getElementById('input-nama');
  const inputPesan = document.getElementById('input-pesan');
  const errorPesan = document.getElementById('error-pesan');
  const pesanSukses = document.getElementById('pesan-sukses');
  const wadahPesan = document.getElementById('wadah-pesan');

  if (formKritik) {
    formKritik.addEventListener('submit', (e) => {
      e.preventDefault(); // Mencegah reload halaman

      // Reset pesan error
      if (errorPesan) errorPesan.textContent = '';

      const teksPesan = inputPesan.value.trim();

      // Validasi: Pesan tidak boleh kosong
      if (!teksPesan) {
        if (errorPesan) {
          errorPesan.textContent = 'Pesan kritik & saran wajib diisi ya!';
        }
        inputPesan.focus();
        return;
      }

      // Tentukan Nama Pengirim: Jika kosong, otomatis jadi "Anonim"
      const namaPengirim = inputNama.value.trim() ? inputNama.value.trim() : 'Anonim';

      // Format waktu pengiriman sederhana
      const waktuSekarang = new Date();
      const jam = String(waktuSekarang.getHours()).padStart(2, '0');
      const menit = String(waktuSekarang.getMinutes()).padStart(2, '0');
      const stringWaktu = `${jam}:${menit} WIB`;

      // 1. Tampilkan Alert Sukses
      if (pesanSukses) {
        pesanSukses.style.display = 'block';
        pesanSukses.innerHTML = `✅ <strong>Terima kasih, ${escapeHtml(namaPengirim)}!</strong> Kritik &amp; saran kamu sudah berhasil dikirim.`;

        // Hilang otomatis setelah 5 detik
        setTimeout(() => {
          pesanSukses.style.display = 'none';
        }, 5000);
      }

      // 2. Tambahkan pesan baru ke daftar masukan (DOM append)
      if (wadahPesan) {
        // Hapus teks "belum ada pesan" jika ada
        const placeholder = wadahPesan.querySelector('.belum-ada-pesan');
        if (placeholder) {
          placeholder.remove();
        }

        const kartuPesanBaru = document.createElement('div');
        kartuPesanBaru.className = 'pesan-item';
        kartuPesanBaru.innerHTML = `
          <div class="pesan-header">
            <span class="pesan-nama">👤 ${escapeHtml(namaPengirim)}</span>
            <span class="pesan-waktu">${stringWaktu}</span>
          </div>
          <p class="pesan-isi">${escapeHtml(teksPesan)}</p>
        `;

        // Letakkan di paling atas
        wadahPesan.prepend(kartuPesanBaru);
      }

      // 3. Reset formulir
      formKritik.reset();
    });
  }

  // Fungsi pembantu sederhana untuk mencegah XSS pada input
  function escapeHtml(teks) {
    const p = document.createElement('p');
    p.textContent = teks;
    return p.innerHTML;
  }

});
