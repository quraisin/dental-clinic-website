/**
 * CLAUDIA DENTAL SANCTUARY - INTERACTIVE CONTROLLER
 * Reference: The JWCC (www.thejwcc.com)
 * Domain: Luxury Boutique Dental Clinic (Klinik Dokter Gigi)
 * View-Only Interactive Simulation
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileDrawer();
  initTestimonialsCarousel();
  initSearchModal();
  initExternalAppointmentRedirect();
  initDoctorFilters();
  initDoctorProfileModal();
  initScheduleBoard();
  initFacilityLightbox();
  initHeroAudioSimulator();
});

/* ==========================================================================
   1. Sticky Header Animation
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   2. Mobile Drawer Navigation
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.btn-mobile-toggle');
  const drawer = document.getElementById('mobileDrawer');
  const closeBtn = document.querySelector('.mobile-drawer-close');
  const bottomMenuBtn = document.getElementById('bottomMenuTrigger');

  if (!drawer) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (bottomMenuBtn) bottomMenuBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) closeDrawer();
  });
}

/* ==========================================================================
   3. Testimonials Carousel
   ========================================================================== */
function initTestimonialsCarousel() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('testiPrev');
  const nextBtn = document.getElementById('testiNext');

  if (!slides.length) return;

  let currentIndex = 0;
  let autoplayTimer;

  const showSlide = (index) => {
    slides.forEach((s, idx) => {
      s.classList.toggle('active', idx === index);
    });
  };

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  };

  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  };

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });
  }

  const startAutoplay = () => {
    autoplayTimer = setInterval(nextSlide, 7000);
  };

  const resetAutoplay = () => {
    clearInterval(autoplayTimer);
    startAutoplay();
  };

  startAutoplay();
}

/* ==========================================================================
   4. Search Modal with Dental Search Preview
   ========================================================================== */
function initSearchModal() {
  const modal = document.getElementById('searchModal');
  const triggers = document.querySelectorAll('.trigger-search');
  const closeBtn = document.getElementById('closeSearchModal');
  const searchInput = document.getElementById('siteSearchInput');
  const resultsContainer = document.getElementById('searchResultsPreview');

  if (!modal) return;

  const openModal = () => {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (searchInput) {
      setTimeout(() => searchInput.focus(), 150);
    }
  };

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  triggers.forEach(t => t.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Dental Database
  const searchDataset = [
    { title: 'Drg. Claudia Samantha, Sp.Ort', type: 'Dental Specialist', meta: 'Orthodontist & Diamond Invisalign Provider', link: 'medical-professionals.html' },
    { title: 'Drg. Darrell Fernando, Sp.Pros', type: 'Dental Specialist', meta: 'Prosthodontist & Porcelain Veneer Master', link: 'medical-professionals.html' },
    { title: 'Drg. Agnes, Sp.KGA', type: 'Dental Specialist', meta: 'Pediatric Dentist (Dokter Gigi Anak Ramah & Bebas Trauma)', link: 'medical-professionals.html' },
    { title: 'Drg. Benny Johan, Sp.BM', type: 'Dental Specialist', meta: 'Oral & Maxillofacial Surgeon (Painless Implants)', link: 'medical-professionals.html' },
    { title: 'Drg. Budi Marjono, Sp.KG', type: 'Dental Specialist', meta: 'Endodontics & Microscopic Root Canal Care', link: 'medical-professionals.html' },
    { title: 'Invisalign & Clear Aligners', type: 'Clinical Service', meta: 'Perataan Gigi Tanpa Kawat Gigi dengan Teknologi 3D iTero', link: 'our-services.html#ortho' },
    { title: 'Porcelain Veneers & Smile Design', type: 'Clinical Service', meta: 'Desain Senyum Harmonis & Estetika Gigi Natural', link: 'our-services.html#aesthetic' },
    { title: 'Painless Dental Implants', type: 'Clinical Service', meta: 'Implan Gigi Terpandu Digital dengan Pemulihan Cepat', link: 'our-services.html#implant' },
    { title: 'Private VIP Operatory Suites', type: 'Sanctuary Facility', meta: 'Kamar Perawatan Gigi Privat dengan Pijat Kursi & Aromaterapi', link: 'our-facilities.html' },
    { title: 'Schedule Board (Jadwal Dokter Gigi)', type: 'Timetable', meta: 'Lihat Jadwal Praktek Dokter Gigi Spesialis Mingguan', link: 'schedule-board.html' }
  ];

  if (searchInput && resultsContainer) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        resultsContainer.innerHTML = '<p class="text-muted" style="font-size:0.85rem; padding:1rem 0;">Ketik nama dokter gigi, perawatan (e.g. Veneer, Invisalign, Implan), atau fasilitas...</p>';
        return;
      }

      const matches = searchDataset.filter(item => 
        item.title.toLowerCase().includes(q) || 
        item.meta.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q)
      );

      if (matches.length === 0) {
        resultsContainer.innerHTML = `<p class="text-muted" style="padding:1rem 0; font-size:0.85rem;">Tidak ditemukan hasil untuk "${q}". Coba kata kunci "Invisalign", "Veneer", "Agnes", "Implan", atau "Jadwal".</p>`;
        return;
      }

      resultsContainer.innerHTML = matches.map(item => `
        <a href="${item.link}" class="search-result-item" style="display:block; padding:0.85rem; border-radius:12px; background:var(--bg-sand); margin-bottom:0.5rem; transition:all 0.2s;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.2rem;">
            <strong style="color:var(--color-primary); font-size:0.92rem;">${item.title}</strong>
            <span style="font-size:0.65rem; background:var(--color-pastel-pill); color:var(--color-primary); padding:0.2rem 0.5rem; border-radius:99px; text-transform:uppercase; font-weight:700;">${item.type}</span>
          </div>
          <p style="font-size:0.8rem; color:var(--text-body); margin:0;">${item.meta}</p>
        </a>
      `).join('');
    });
  }
}

/* ==========================================================================
   5. External Appointment Redirect Handler
   Seluruh tombol Appointment di-redirect ke website / portal reservasi eksternal
   ========================================================================== */
const EXTERNAL_APPOINTMENT_URL = 'https://wa.me/628111399119?text=Halo%20CLAUDIA%20Dental%20Sanctuary,%20saya%20ingin%20membuat%20janji%20temu%20dokter%20gigi';

function initExternalAppointmentRedirect() {
  const triggers = document.querySelectorAll('.trigger-appointment');
  triggers.forEach(trigger => {
    // If it's already an <a> tag with an href, ensure target and rel are set
    if (trigger.tagName === 'A' && trigger.getAttribute('href') && trigger.getAttribute('href') !== '#') {
      if (!trigger.getAttribute('target')) trigger.setAttribute('target', '_blank');
      if (!trigger.getAttribute('rel')) trigger.setAttribute('rel', 'noopener noreferrer');
      return;
    }

    // For button or interactive elements, redirect on click
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetUrl = trigger.getAttribute('data-appointment-url') || EXTERNAL_APPOINTMENT_URL;
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    });
  });
}

/* ==========================================================================
   6. Dental Specialist Directory Filter Logic
   ========================================================================== */
function initDoctorFilters() {
  const searchInput = document.getElementById('doctorSearchInput');
  const deptSelect = document.getElementById('doctorDeptSelect');
  const langSelect = document.getElementById('doctorLangSelect');
  const genderSelect = document.getElementById('doctorGenderSelect');
  const clearBtn = document.getElementById('clearDoctorFilters');
  const cards = document.querySelectorAll('.doctor-card');
  const countEl = document.getElementById('filteredDoctorCount');

  if (!cards.length) return;

  function filterDoctors() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const dept = deptSelect ? deptSelect.value.toLowerCase() : '';
    const lang = langSelect ? langSelect.value.toLowerCase() : '';
    const gender = genderSelect ? genderSelect.value.toLowerCase() : '';

    let matchCount = 0;

    cards.forEach(card => {
      const name = (card.getAttribute('data-name') || '').toLowerCase();
      const cardDept = (card.getAttribute('data-dept') || '').toLowerCase();
      const cardLang = (card.getAttribute('data-lang') || '').toLowerCase();
      const cardGender = (card.getAttribute('data-gender') || '').toLowerCase();

      const matchQuery = !query || name.includes(query) || cardDept.includes(query);
      const matchDept = !dept || cardDept.includes(dept);
      const matchLang = !lang || cardLang.includes(lang);
      const matchGender = !gender || cardGender === gender;

      if (matchQuery && matchDept && matchLang && matchGender) {
        card.style.display = 'flex';
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (countEl) {
      countEl.textContent = `${matchCount} Dokter Gigi Spesialis Tersedia`;
    }
  }

  if (searchInput) searchInput.addEventListener('input', filterDoctors);
  if (deptSelect) deptSelect.addEventListener('change', filterDoctors);
  if (langSelect) langSelect.addEventListener('change', filterDoctors);
  if (genderSelect) genderSelect.addEventListener('change', filterDoctors);

  if (clearBtn) {
    clearBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (searchInput) searchInput.value = '';
      if (deptSelect) deptSelect.value = '';
      if (langSelect) langSelect.value = '';
      if (genderSelect) genderSelect.value = '';
      filterDoctors();
    });
  }
}

/* ==========================================================================
   7. Dental Specialist Profile Quick-View Modal
   ========================================================================== */
function initDoctorProfileModal() {
  const modal = document.getElementById('doctorProfileModal');
  const cards = document.querySelectorAll('.doctor-card');
  const closeBtn = document.getElementById('closeDoctorModal');

  if (!modal || !cards.length) return;

  const doctorData = {
    'drg-claudia': {
      name: 'Drg. Claudia Samantha, Sp.Ort',
      role: 'Spesialis Ortodonti & Diamond Invisalign Provider',
      dept: 'Orthodontics & Dento-Facial Orthopedics',
      bio: 'Drg. Claudia menyelesaikan pendidikan spesialis Ortodonti di Universitas Indonesia dengan sertifikasi internasional Invisalign Diamond Provider. Berpengalaman menangani kasus perataan gigi kompleks dan desain senyum simetris non-bedah dengan pendekatan tanpa rasa sakit.',
      creds: ['Sp.Ort (Universitas Indonesia)', 'Diamond Level Invisalign Certified Provider', 'Member of World Federation of Orthodontists (WFO)', 'Ikatan Ortodontis Indonesia (IKORTI)'],
      schedule: 'Senin, Rabu, Jumat (10:00 - 18:00) | Sabtu (09:00 - 15:00)',
      lang: 'Bahasa Indonesia, English'
    },
    'drg-darrell': {
      name: 'Drg. Darrell Fernando, Sp.Pros',
      role: 'Spesialis Prostodonsia & Smile Makeover Veneer',
      dept: 'Prosthodontics & Aesthetic Dentistry',
      bio: 'Dikenal dengan keahliannya dalam pembuatan Porcelain Veneer ultra-tipis, Dental Crown berbahan Zirconia, dan rehabilitasi senyum menyeluruh yang menyatu alami dengan harmoni wajah pasien.',
      creds: ['Sp.Pros (Universitas Airlangga)', 'Certified Aesthetic Dentist (Goethe Univ, Germany)', 'Member of Indonesian Prosthodontic Association (IPROSI)'],
      schedule: 'Selasa, Kamis (11:00 - 19:00) | Sabtu (13:00 - 18:00)',
      lang: 'Bahasa Indonesia, English'
    },
    'drg-agnes': {
      name: 'Drg. Agnes, Sp.KGA',
      role: 'Spesialis Kedokteran Gigi Anak (Pediatric Dentist)',
      dept: 'Pediatric Dentistry',
      bio: 'Drg. Agnes sangat dicintai oleh pasien anak dan keluarga karena pendekatannya yang lembut, penuh kesabaran, dan tanpa trauma (behavior management). Beliau berfokus pada pencegahan gigi berlubang sejak dini, perawatan ramah anak, dan ortodonti preventif.',
      creds: ['Sp.KGA (Universitas Padjadjaran)', 'Pediatric Gentle Dental Anxiety Management Fellow', 'Ikatan Dokter Gigi Anak Indonesia (IDGAI)'],
      schedule: 'Senin, Selasa, Kamis, Jumat (09:00 - 14:00)',
      lang: 'Bahasa Indonesia, English'
    },
    'drg-benny': {
      name: 'Drg. Benny Johan, Sp.BM, Subsp.TMTL',
      role: 'Spesialis Bedah Mulut & Maksilofasial (Implan Gigi Terpandu)',
      dept: 'Oral & Maxillofacial Surgery',
      bio: 'Memiliki reputasi unggul dalam pemasangan implan gigi modern dengan panduan bedah 3D CBCT (computer-guided implantology) serta operasi pencabutan gigi bungsu impaksi yang minim trauma dan cepat pulih.',
      creds: ['Sp.BM (Universitas Indonesia)', 'Fellow of International Team for Implantology (ITI)', 'PABMI (Persatuan Ahli Bedah Mulut Indonesia)'],
      schedule: 'Rabu, Jumat (14:00 - 20:00) | Minggu (10:00 - 14:00)',
      lang: 'Bahasa Indonesia, English'
    },
    'drg-budi': {
      name: 'Drg. Budi Marjono, Sp.KG',
      role: 'Spesialis Konservasi Gigi & Perawatan Saluran Akar Mikroskopis',
      dept: 'Conservative Dentistry & Endodontics',
      bio: 'Fokus pada penyelamatan gigi asli dengan perawatan saluran akar berpemandu mikroskop digital Zeiss dental, penambalan estetik sewarna gigi, serta pemutihan gigi (in-office laser whitening).',
      creds: ['Sp.KG (Universitas Indonesia)', 'Micro-Endodontic Advanced Fellowship', 'IKORGI (Ikatan Konservasi Gigi Indonesia)'],
      schedule: 'Senin s/d Jumat (13:00 - 18:00)',
      lang: 'Bahasa Indonesia, English'
    },
    'drg-arnesya': {
      name: 'Drg. Arnesya Ayu, Sp.Perio',
      role: 'Spesialis Periodonsia & Estetika Gusi (Gum Health)',
      dept: 'Periodontology & Laser Dentistry',
      bio: 'Pakar dalam perawatan kesehatan gusi, pembersihan karang gigi mendalam (deep scaling piezoelektrik), gingivoplasty (perataan gusi gummy smile), dan perawatan nafas segar.',
      creds: ['Sp.Perio (Universitas Gadjah Mada)', 'Laser Periodontal Therapy Certification', 'IPERI (Ikatan Periodontologi Indonesia)'],
      schedule: 'Selasa, Kamis, Sabtu (10:00 - 16:00)',
      lang: 'Bahasa Indonesia, English'
    },
    'drg-faisal': {
      name: 'Drg. Faisal Aditya, Sp.Ort',
      role: 'Spesialis Ortodonti & Clear Aligner Specialist',
      dept: 'Orthodontics & Facial Aesthetics',
      bio: 'Fokus pada perawatan ortodonti modern dengan teknologi clear aligner 3D digital terencana, koreksi gigitan simetris, dan percepatan pergerakan gigi tanpa rasa sakit.',
      creds: ['Sp.Ort (Universitas Indonesia)', 'Certified Clear Aligner Provider', 'Ikatan Ortodontis Indonesia (IKORTI)'],
      schedule: 'Senin, Kamis (10:00 - 18:00) | Sabtu (09:00 - 15:00)',
      lang: 'Bahasa Indonesia, English'
    },
    'drg-nadine': {
      name: 'Drg. Nadine Aurelia, Sp.Pros',
      role: 'Spesialis Prostodonsia & Smile Rehabilitation',
      dept: 'Prosthodontics & Aesthetic Dentistry',
      bio: 'Pakar restorasi estetika senyum, porcelain veneer ultra-presisi, dan rehabilitasi oklusi menyeluruh dengan pendekatan digital smile design (DSD).',
      creds: ['Sp.Pros (Universitas Indonesia)', 'Digital Smile Design (DSD) Certified Master', 'IPROSI'],
      schedule: 'Rabu, Jumat (11:00 - 19:00) | Minggu (10:00 - 15:00)',
      lang: 'Bahasa Indonesia, English'
    }
  };

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id') || 'drg-claudia';
      const doc = doctorData[id] || doctorData['drg-claudia'];

      document.getElementById('docModalName').textContent = doc.name;
      document.getElementById('docModalRole').textContent = doc.role;
      document.getElementById('docModalDept').textContent = doc.dept;
      document.getElementById('docModalBio').textContent = doc.bio;
      document.getElementById('docModalSchedule').textContent = doc.schedule;
      document.getElementById('docModalLang').textContent = doc.lang;

      const credsList = document.getElementById('docModalCreds');
      if (credsList) {
        credsList.innerHTML = doc.creds.map(c => `<li style="margin-bottom:0.4rem;">${c}</li>`).join('');
      }

      const bookingBtn = document.getElementById('docModalBookingBtn');
      if (bookingBtn) {
        bookingBtn.href = `https://wa.me/628111399119?text=${encodeURIComponent(`Halo CLAUDIA Dental Sanctuary, saya ingin membuat janji konsultasi dengan ${doc.name}`)}`;
      }

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* ==========================================================================
   8. Schedule Board Filter & Interactive Control Panel Logic
   ========================================================================== */
function initScheduleBoard() {
  const deptFilter = document.getElementById('scheduleDeptFilter');
  const searchInput = document.getElementById('scheduleSearchInput');
  const resetBtn = document.getElementById('btnScheduleReset');
  const rows = document.querySelectorAll('.schedule-row');
  const doctorCountEl = document.getElementById('scheduleDoctorCount');
  const slotCountEl = document.getElementById('scheduleSlotCount');

  if (!rows.length) return;

  function filterSchedule() {
    const dept = deptFilter ? deptFilter.value.toLowerCase() : '';
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    let matchedDoctors = 0;
    let matchedSlots = 0;

    rows.forEach(row => {
      const rowDept = (row.getAttribute('data-dept') || '').toLowerCase();
      const rowName = (row.getAttribute('data-name') || '').toLowerCase();

      const matchDept = !dept || rowDept.includes(dept);
      const matchQuery = !query || rowName.includes(query) || rowDept.includes(query);

      if (matchDept && matchQuery) {
        row.style.display = 'grid';
        matchedDoctors++;
        const slotsInRow = row.querySelectorAll('.time-slot-badge');
        matchedSlots += slotsInRow.length;
      } else {
        row.style.display = 'none';
      }
    });

    if (doctorCountEl) doctorCountEl.textContent = matchedDoctors;
    if (slotCountEl) slotCountEl.textContent = matchedSlots;
  }

  if (deptFilter) deptFilter.addEventListener('change', filterSchedule);
  if (searchInput) searchInput.addEventListener('input', filterSchedule);

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (deptFilter) deptFilter.value = '';
      filterSchedule();
    });
  }

  filterSchedule();
}

/* ==========================================================================
   9. Facility Lightbox Preview Modal
   ========================================================================== */
function initFacilityLightbox() {
  const modal = document.getElementById('facilityLightboxModal');
  const cards = document.querySelectorAll('.facility-card');
  const closeBtn = document.getElementById('closeFacilityLightbox');
  const imgEl = document.getElementById('facilityLightboxImg');
  const titleEl = document.getElementById('facilityLightboxTitle');
  const descEl = document.getElementById('facilityLightboxDesc');

  if (!modal || !cards.length) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const title = card.querySelector('.facility-title');
      const subtitle = card.querySelector('.facility-subtitle');

      if (imgEl && img) imgEl.src = img.src;
      if (titleEl && title) titleEl.textContent = title.textContent;
      if (descEl && subtitle) descEl.textContent = subtitle.textContent;

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* ==========================================================================
   10. Hero Audio / Ambiance Simulator
   ========================================================================== */
function initHeroAudioSimulator() {
  const btn = document.getElementById('heroSoundToggle');
  if (!btn) return;

  let isPlaying = false;
  btn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    const textSpan = btn.querySelector('.sound-label');

    if (isPlaying) {
      if (textSpan) textSpan.textContent = 'Dental Spa Relaxation On';
      btn.style.backgroundColor = 'var(--color-primary)';
      btn.style.color = '#fff';
    } else {
      if (textSpan) textSpan.textContent = 'Mute Ambiance';
      btn.style.backgroundColor = 'rgba(255, 255, 255, 0.88)';
      btn.style.color = 'var(--color-primary)';
    }
  });
}
