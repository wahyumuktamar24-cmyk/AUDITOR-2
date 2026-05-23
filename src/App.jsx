import { useState, useEffect } from "react";
import "./App.css";

const NAV_LINKS = [
  { label: "Beranda", id: "beranda" },
  { label: "Tentang", id: "tentang" },
  { label: "Layanan", id: "layanan" },
  { label: "Tim", id: "tim" },
  { label: "Blog", id: "blog" },
  { label: "Kontak", id: "kontak" },
];

const STATS = [
  { num: "25+", label: "Klien Terpercaya" },
  { num: "3+", label: "Tahun Pengalaman" },
  { num: "40+", label: "Proyek Selesai" },
  { num: "8", label: "Profesional" },
];

const KEUNGGULAN = [
  { icon: "🏅", title: "Profesional & Berpengalaman", desc: "Didukung oleh tim auditor yang kompeten dan berpengalaman dalam menangani berbagai jenis audit perusahaan." },
  { icon: "⏱️", title: "Tepat Waktu", desc: "Kami berkomitmen menyelesaikan proses audit sesuai jadwal yang telah disepakati bersama klien." },
  { icon: "🔒", title: "Menjaga Kerahasiaan Data", desc: "Seluruh data dan informasi perusahaan klien dijaga dengan standar kerahasiaan yang tinggi." },
  { icon: "📞", title: "Pelayanan Responsif", desc: "Tim kami siap memberikan komunikasi dan pendampingan yang cepat serta profesional selama proses audit berlangsung." },
  { icon: "📋", title: "Mengikuti Standar Audit", desc: "Proses audit dilakukan sesuai prosedur dan standar audit yang berlaku untuk memastikan hasil yang akurat dan terpercaya." },
  { icon: "💡", title: "Solusi & Rekomendasi", desc: "Tidak hanya menemukan masalah, kami juga memberikan rekomendasi perbaikan yang membantu perkembangan perusahaan." },
];

const LAYANAN_HOME = [
  {
    icon: "🖥️",
    title: "IT Audit & Information System Assurance",
    items: [
      "Audit keamanan jaringan, server, dan infrastruktur TI",
      "Audit aplikasi & database",
      "Penilaian tata kelola TI (IT Governance Review)",
      "Audit kepatuhan standar (ISO 27001, COBIT, NIST, dll)",
      "Evaluasi kontrol internal TI",
    ],
    values: [
      "Mengurangi risiko kebocoran data",
      "Meningkatkan keandalan sistem",
      "Memastikan kepatuhan regulasi dan standar industri",
    ],
  },
  {
    icon: "📊",
    title: "Internal Audit & Risk Management",
    items: [
      "Audit operasional & audit kepatuhan",
      "Enterprise Risk Management (ERM)",
      "Fraud risk assessment & prevention",
      "Evaluasi efektivitas kontrol internal",
      "Penyusunan kerangka manajemen risiko",
    ],
    values: [
      "Meminimalkan risiko kecurangan dan kerugian",
      "Meningkatkan efisiensi operasional",
      "Mendukung penerapan Good Corporate Governance (GCG)",
    ],
  },
];

const SERVICES = [
  {
    icon: "💼",
    title: "Audit Keuangan",
    subtitle: "Laporan Keuangan yang Akurat & Transparan",
    desc: "Kami membantu perusahaan memastikan laporan keuangan disusun secara wajar, akurat, dan sesuai standar akuntansi yang berlaku.",
    benefits: ["Transparansi laporan keuangan", "Meningkatkan kepercayaan investor", "Meminimalkan risiko kesalahan data", "Mendukung kepatuhan regulasi"],
    method: ["Perencanaan Audit", "Pemeriksaan Dokumen", "Analisis Data", "Evaluasi Risiko", "Laporan Audit"],
  },
  {
    icon: "🖥️",
    title: "IT Audit",
    subtitle: "Keamanan & Efektivitas Sistem Informasi",
    desc: "Layanan audit teknologi informasi untuk memastikan sistem IT perusahaan aman, efisien, dan mendukung operasional bisnis.",
    benefits: ["Perlindungan data perusahaan", "Mengurangi risiko cyber attack", "Optimalisasi sistem IT", "Kepatuhan standar keamanan informasi"],
    method: ["Assessment Sistem", "Pengujian Keamanan", "Evaluasi Kontrol Akses", "Analisis Risiko", "Rekomendasi Perbaikan"],
  },
  {
    icon: "🔍",
    title: "Audit Internal",
    subtitle: "Meningkatkan Efisiensi Operasional Perusahaan",
    desc: "Kami membantu perusahaan mengevaluasi proses internal dan pengendalian untuk mendukung tata kelola yang lebih baik.",
    benefits: ["Pengawasan operasional lebih efektif", "Identifikasi risiko lebih cepat", "Peningkatan kualitas pengendalian internal", "Mendukung keputusan manajemen"],
    method: ["Observasi Proses", "Pengumpulan Data", "Evaluasi SOP", "Analisis Risiko", "Laporan & Rekomendasi"],
  },
];

const METODOLOGI = [
  { n: "01", title: "Perencanaan Audit", desc: "Memahami bisnis, ruang lingkup pekerjaan, tujuan audit, dan kebutuhan klien. Mencakup penyusunan jadwal, penentuan tim, dan identifikasi area prioritas." },
  { n: "02", title: "Risk Assessment", desc: "Identifikasi dan analisis risiko proses bisnis, keuangan, maupun sistem informasi untuk menentukan area yang berpotensi kelemahan pengendalian." },
  { n: "03", title: "Pengumpulan Bukti", desc: "Mengumpulkan data dan bukti audit melalui wawancara, observasi, pemeriksaan dokumen, serta analisis sistem dan transaksi secara objektif." },
  { n: "04", title: "Pengujian Kontrol", desc: "Pengujian efektivitas pengendalian internal perusahaan, baik secara manual maupun berbasis sistem untuk meminimalkan risiko operasional." },
  { n: "05", title: "Pelaporan Audit", desc: "Menyusun laporan audit berisi temuan, analisis, rekomendasi, dan kesimpulan audit secara jelas, akurat, dan mudah dipahami manajemen." },
  { n: "06", title: "Tindak Lanjut (Follow Up)", desc: "Pemantauan implementasi rekomendasi audit untuk memastikan setiap temuan telah diperbaiki dan sistem pengendalian berjalan lebih optimal." },
];

const TEAM = [
  { name: "Wahyu Muktamar", role: "Manajer", certs: ["CPA", "CISA", "CIA", "CFE"], initial: "WM" },
  { name: "Fajar", role: "Auditor Senior", certs: ["CPA", "CISA", "CIA", "CFE"], initial: "FJ" },
  { name: "Maisarah Kasim", role: "Auditor Senior", certs: ["CPA", "CISA", "CIA", "CFE"], initial: "MK" },
  { name: "Sarah", role: "Staf", certs: ["CPA", "CISA", "CIA", "CFE"], initial: "SR" },
  { name: "Nurul Auliah Fitri", role: "Staf", certs: ["CPA", "CISA", "CIA", "CFE"], initial: "NA" },
  { name: "Aryal", role: "Staf", certs: ["CPA", "CISA", "CIA", "CFE"], initial: "AR" },
];

const MISI = [
  { judul: "Ketelitian & Penyelidikan Mendalam", desc: "Melaksanakan proses audit secara menyeluruh, cermat, dan berbasis fakta untuk menghasilkan temuan yang akurat dan dapat dipertanggungjawabkan." },
  { judul: "Validasi & Kepercayaan", desc: "Memberikan opini audit yang jujur, independen, dan dapat dipercaya sebagai dasar pengambilan keputusan manajemen dan pemangku kepentingan." },
  { judul: "Keterbukaan & Integritas", desc: "Menjalankan setiap penugasan dengan menjunjung tinggi etika profesi, transparansi proses, dan komitmen penuh terhadap standar audit internasional (ISA/SPAP)." },
  { judul: "Pertumbuhan & Keseimbangan", desc: "Mendukung perkembangan klien melalui rekomendasi perbaikan yang konstruktif, serta mendorong keseimbangan antara kepatuhan regulasi dan efisiensi operasional." },
  { judul: "Kejujuran & Optimisme", desc: "Membangun hubungan jangka panjang dengan klien berdasarkan nilai kejujuran, keterbukaan, dan semangat untuk terus berkembang bersama." },
];

const CORE_VALUES = [
  { huruf: "T", nilai: "Transparansi", makna: "Terbuka dalam setiap proses dan hasil audit" },
  { huruf: "R", nilai: "Reliabilitas", makna: "Dapat diandalkan dalam setiap penugasan" },
  { huruf: "U", nilai: "Unggul", makna: "Berkomitmen pada kualitas dan standar tertinggi" },
  { huruf: "E", nilai: "Etika", makna: "Menjunjung tinggi integritas dan independensi" },
];

const SERTIFIKASI = [
  "Certified Public Accountant (CPA)",
  "Certified Information Systems Auditor (CISA)",
  "Certified Internal Auditor (CIA)",
  "Standar Manajemen Mutu ISO 9001",
  "Standar Keamanan Informasi ISO/IEC 27001",
];

const BLOG = [
  { num: "01", tag: "Audit Internal", title: "Pentingnya Audit Internal bagi Perusahaan Modern", excerpt: "Audit internal merupakan proses evaluasi untuk memastikan seluruh aktivitas perusahaan berjalan sesuai prosedur, efektif, dan mematuhi regulasi yang berlaku di era digital saat ini." },
  { num: "02", tag: "IT Audit", title: "Risiko Keamanan Data di Era Digital", excerpt: "Transformasi digital meningkatkan risiko keamanan informasi. Kebocoran data, serangan malware, phishing, hingga ransomware menjadi ancaman serius bagi organisasi modern." },
  { num: "03", tag: "Tips", title: "Tips Menghadapi Audit Perusahaan dengan Efektif", excerpt: "Audit dapat berjalan lancar apabila perusahaan melakukan persiapan yang baik, memiliki dokumentasi lengkap, dan membangun komunikasi terbuka dengan auditor." },
  { num: "04", tag: "Regulasi", title: "Regulasi Terbaru yang Perlu Diperhatikan Perusahaan", excerpt: "Perubahan regulasi dapat memengaruhi operasional, pelaporan keuangan, hingga sistem keamanan informasi. Ketidakpatuhan bisa berujung sanksi dan kerugian reputasi." },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="app">

      {/* ── NAV ── */}
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav__inner">
          <div className="nav__logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img src="/LOGO.jpeg" alt="Auditrue" className="logo-img"
              onError={(e) => { e.target.style.display = "none"; }} />
            <span className="logo-text"><strong>AUDITRUE</strong><em></em></span>
          </div>
          <ul className="nav__links">
            {NAV_LINKS.map((l) => (
              <li key={l.id}><button onClick={() => scrollTo(l.id)}>{l.label}</button></li>
            ))}
          </ul>
          <button className="nav__cta" onClick={() => scrollTo("kontak")}>Konsultasi Gratis</button>
          <button className="nav__burger" onClick={() => setMenuOpen(!menuOpen)}>
            <span className={menuOpen ? "open" : ""}></span>
          </button>
        </div>
        <div className={`nav__mobile ${menuOpen ? "nav__mobile--open" : ""}`}>
          {NAV_LINKS.map((l) => (
            <button key={l.id} onClick={() => scrollTo(l.id)}>{l.label}</button>
          ))}
          <button className="mobile-cta" onClick={() => scrollTo("kontak")}>Konsultasi Gratis</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="beranda">
        <div className="hero__bg">
          <div className="hero__grid"></div>
          <div className="hero__glow"></div>
        </div>
        <div className="hero__content">
          <div className="hero__badge reveal"><span>◈</span> Berdiri sejak 15 Januari 2022</div>
          <h1 className="hero__title reveal">
            Audit yang<br /><span className="gold">Jujur. Tepat.</span><br />Terpercaya.
          </h1>
          <p className="hero__sub reveal">
            "Perusahaan audit yang menjunjung tinggi kebenaran dan kejujuran dalam setiap pemeriksaan."
          </p>
          <div className="hero__actions reveal">
            <button className="btn btn--primary" onClick={() => scrollTo("layanan")}>Lihat Layanan</button>
            <button className="btn btn--outline" onClick={() => scrollTo("kontak")}>Hubungi Kami</button>
            <button className="btn btn--ghost" onClick={() => scrollTo("kontak")}>Minta Penawaran</button>
          </div>
          <div className="hero__stats reveal">
            {STATS.map((s) => (
              <div key={s.label} className="hero__stat">
                <strong>{s.num}</strong><span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero__scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* ── LAYANAN UTAMA (home preview) ── */}
      <section className="home-services section">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-label">Layanan Utama Kami</div>
            <h2 className="section-title">Solusi Profesional<br /><span className="gold">Berbasis Standar Internasional</span></h2>
            <p className="section-sub">Kami menyediakan layanan audit dan konsultasi profesional untuk membantu organisasi meningkatkan keamanan, kepatuhan, serta efektivitas pengelolaan teknologi dan proses bisnis.</p>
          </div>
          <div className="hs-grid">
            {LAYANAN_HOME.map((s, i) => (
              <div key={i} className="hs-card reveal" style={{ "--delay": `${i * 0.15}s` }}>
                <div className="hs-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <ul className="hs-list">
                  {s.items.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
                <div className="hs-values">
                  {s.values.map((v, j) => <div key={j} className="hs-val"><span>✔</span>{v}</div>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KEUNGGULAN ── */}
      <section className="keunggulan section" id="keunggulan">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-label">Keunggulan Kami</div>
            <h2 className="section-title">Mengapa Memilih<br /><span className="gold">AUDITRUE?</span></h2>
          </div>
          <div className="ku-grid">
            {KEUNGGULAN.map((k, i) => (
              <div key={i} className="ku-card reveal" style={{ "--delay": `${i * 0.07}s` }}>
                <span className="ku-icon">{k.icon}</span>
                <h3>{k.title}</h3>
                <p>{k.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TENTANG ── */}
      <section className="about section" id="tentang">
        <div className="container">

          {/* Profil */}
          <div className="about__layout">
            <div className="about__left reveal">
              <div className="section-label">Tentang Kami</div>
              <h2 className="section-title">Profil<br /><span className="gold">Perusahaan</span></h2>
              <p>Kami adalah perusahaan yang bergerak di bidang layanan audit dan konsultasi profesional yang berkomitmen membantu perusahaan meningkatkan transparansi, efektivitas, dan kepatuhan terhadap standar yang berlaku.</p>
              <p>Dengan didukung oleh tim auditor dan konsultan yang kompeten, kami menyediakan berbagai layanan seperti audit internal, audit sistem informasi, audit operasional, serta konsultasi manajemen risiko. Kami mengutamakan profesionalisme, integritas, dan kerahasiaan dalam setiap proses kerja.</p>
              <p>Perusahaan kami didirikan pada <strong style={{ color: "var(--gold)" }}>15 Januari 2022</strong>. Berawal dari tim kecil yang berpengalaman di bidang audit dan sistem informasi, kami terus berkembang dan membangun kepercayaan berbagai perusahaan dan organisasi.</p>
              <div className="about-certs">
                {["CPA", "CISA", "CIA", "ISO 9001", "ISO/IEC 27001"].map((c) => (
                  <div key={c} className="cert">{c}</div>
                ))}
              </div>
            </div>
            <div className="about__right reveal">
              <div className="visi-box">
                <div className="vm-label">VISI</div>
                <p>"Menjadi mitra audit terpercaya yang mendorong transparansi, integritas, dan pertumbuhan berkelanjutan bagi setiap organisasi di Indonesia."</p>
              </div>
              <div className="misi-label">MISI</div>
              <div className="misi-list">
                {MISI.map((m, i) => (
                  <div key={i} className="misi-item">
                    <div className="misi-num">{String(i + 1).padStart(2, "0")}</div>
                    <div>
                      <strong>{m.judul}</strong>
                      <p>{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="cv-section reveal">
            <div className="section-label" style={{ justifyContent: "center", marginBottom: 36 }}>Nilai Perusahaan — TRUE</div>
            <div className="cv-grid">
              {CORE_VALUES.map((v) => (
                <div key={v.huruf} className="cv-card">
                  <div className="cv-huruf">{v.huruf}</div>
                  <strong>{v.nilai}</strong>
                  <p>{v.makna}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sertifikasi */}
          <div className="sert-section reveal">
            <div className="section-label" style={{ marginBottom: 24 }}>Sertifikasi & Lisensi</div>
            <div className="sert-grid">
              {SERTIFIKASI.map((s, i) => (
                <div key={i} className="sert-item"><span className="sert-check">✔</span>{s}</div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── LAYANAN DETAIL ── */}
      <section className="layanan section" id="layanan">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-label">Layanan</div>
            <h2 className="section-title">Solusi Audit<br /><span className="gold">Komprehensif</span></h2>
          </div>
          <div className="layanan-tabs reveal">
            {SERVICES.map((s, i) => (
              <button key={i} className={`tab-btn ${activeService === i ? "active" : ""}`}
                onClick={() => setActiveService(i)}>
                {s.icon} {s.title}
              </button>
            ))}
          </div>
          <div className="layanan-detail reveal">
            <div className="ld-left">
              <h3>{SERVICES[activeService].subtitle}</h3>
              <p>{SERVICES[activeService].desc}</p>
              <div className="ld-label">Manfaat</div>
              <ul className="ld-list">
                {SERVICES[activeService].benefits.map((b, i) => (
                  <li key={i}><span>✔</span>{b}</li>
                ))}
              </ul>
            </div>
            <div className="ld-right">
              <div className="ld-label">Metodologi</div>
              <div className="ld-method">
                {SERVICES[activeService].method.map((m, i) => (
                  <div key={i} className="method-step">
                    <div className="method-num">{String(i + 1).padStart(2, "0")}</div>
                    <div className="method-name">{m}</div>
                    {i < SERVICES[activeService].method.length - 1 && <div className="method-arr">→</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── METODOLOGI AUDIT ── */}
      <section className="metodologi section">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-label">Metodologi Audit</div>
            <h2 className="section-title">Audit Approach<br /><span className="gold">Terstruktur</span></h2>
          </div>
          <div className="metod-grid">
            {METODOLOGI.map((m, i) => (
              <div key={i} className="metod-card reveal" style={{ "--delay": `${i * 0.08}s` }}>
                <div className="metod-num">{m.n}</div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIM ── */}
      <section className="team section" id="tim">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-label">Tim Profesional</div>
            <h2 className="section-title">Dipimpin oleh<br /><span className="gold">Para Ahli</span></h2>
          </div>
          <div className="team__grid">
            {TEAM.map((m, i) => (
              <div key={i} className="team-card reveal" style={{ "--delay": `${i * 0.08}s` }}>
                <div className="team-avatar">
                  <span>{m.initial}</span>
                  <div className="avatar-ring"></div>
                </div>
                <strong>{m.name}</strong>
                <span className="team-role">{m.role}</span>
                <div className="team-certs">
                  {m.certs.map((c) => <span key={c} className="cert-badge">{c}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG ── */}
      <section className="blog section" id="blog">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-label">Insight & Artikel</div>
            <h2 className="section-title">Wawasan<br /><span className="gold">Terkini</span></h2>
          </div>
          <div className="blog-grid">
            {BLOG.map((b, i) => (
              <div key={i} className="blog-card reveal" style={{ "--delay": `${i * 0.08}s` }}>
                <span className="blog-tag">{b.tag}</span>
                <div className="blog-num">{b.num}</div>
                <h3>{b.title}</h3>
                <p>{b.excerpt}</p>
                <span className="blog-read">Baca Selengkapnya →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KONTAK ── */}
      <section className="kontak section" id="kontak">
        <div className="container">
          <div className="kontak-inner reveal">
            <div className="kontak-text">
              <div className="section-label">Hubungi Kami</div>
              <h2 className="section-title">Siap untuk Audit<br /><span className="gold">yang Bermakna?</span></h2>
              <p>Hubungi tim AUDITRUE untuk konsultasi awal gratis. Kami siap membantu Anda meningkatkan transparansi dan tata kelola perusahaan.</p>
              <div className="contact-list">
                <a href="mailto:auditrue6@gmail.com" className="contact-item">
                  <span className="ci">✉</span> auditrue6@gmail.com
                </a>
                <a href="https://wa.me/6281342745230" className="contact-item">
                  <span className="ci">📱</span> 081342745230 (WhatsApp)
                </a>
                <div className="contact-item">
                  <span className="ci">📍</span> Kantor AUDITRUE, Jalan Adiyaksa Baru
                </div>
                <a href="https://maps.app.goo.gl/DnKwQgZLwDzq64Zr7" target="_blank" rel="noopener noreferrer" className="contact-item">
                  <span className="ci">🗺️</span> Lihat di Google Maps
                </a>
                <div className="contact-item">
                  <span className="ci">🕐</span> Jam Operasional: 08.00 – 17.00 WIB
                </div>
              </div>
            </div>
            <div className="kontak-form">
              <h3>Form Konsultasi</h3>
              <div className="form-group">
                <label>Nama Perusahaan</label>
                <input type="text" placeholder="PT Contoh Indonesia" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="email@perusahaan.co.id" />
              </div>
              <div className="form-group">
                <label>No. WhatsApp</label>
                <input type="tel" placeholder="08xxxxxxxxxx" />
              </div>
              <div className="form-group">
                <label>Jenis Layanan</label>
                <select>
                  <option>Pilih layanan yang dibutuhkan</option>
                  <option>Audit Keuangan</option>
                  <option>IT Audit</option>
                  <option>Audit Internal</option>
                  <option>Konsultasi Risiko</option>
                </select>
              </div>
              <div className="form-group">
                <label>Pesan</label>
                <textarea placeholder="Ceritakan kebutuhan audit Anda..." rows="4"></textarea>
              </div>
              <button className="btn btn--primary btn--full">Kirim Permintaan Konsultasi</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="nav__logo" style={{ cursor: "default" }}>
                <img src="/LOGO.jpeg" alt="Auditrue" className="logo-img"
                  onError={(e) => { e.target.style.display = "none"; }} />
                <span className="logo-text"><strong>AUDITRUE</strong><em></em></span>
              </div>
              <p>"Perusahaan audit yang menjunjung tinggi kebenaran dan kejujuran dalam setiap pemeriksaan."</p>
              <div className="footer-socials">
                <a href="mailto:auditrue6@gmail.com" title="Email">✉</a>
                <a href="https://wa.me/6281342745230" title="WhatsApp">📱</a>
                <a href="https://maps.app.goo.gl/DnKwQgZLwDzq64Zr7" target="_blank" rel="noopener noreferrer" title="Maps">🗺️</a>
              </div>
            </div>
            <div className="footer-links">
              <div>
                <h4>Layanan</h4>
                <ul>
                  <li><button onClick={() => scrollTo("layanan")}>Audit Keuangan</button></li>
                  <li><button onClick={() => scrollTo("layanan")}>IT Audit</button></li>
                  <li><button onClick={() => scrollTo("layanan")}>Audit Internal</button></li>
                </ul>
              </div>
              <div>
                <h4>Perusahaan</h4>
                <ul>
                  <li><button onClick={() => scrollTo("tentang")}>Tentang Kami</button></li>
                  <li><button onClick={() => scrollTo("tim")}>Tim</button></li>
                  <li><button onClick={() => scrollTo("blog")}>Blog</button></li>
                </ul>
              </div>
              <div>
                <h4>Kontak</h4>
                <ul>
                  <li><a href="mailto:auditrue6@gmail.com">auditrue6@gmail.com</a></li>
                  <li><a href="https://wa.me/6281342745230">081342745230</a></li>
                  <li><span>08.00 – 17.00 WIB</span></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2024 AUDITRUE. Seluruh hak cipta dilindungi.</span>
            <span>Jl. Adiyaksa Baru — auditrue6@gmail.com</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
