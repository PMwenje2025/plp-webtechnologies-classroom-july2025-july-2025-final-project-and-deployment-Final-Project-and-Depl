
(function(){
  // Active nav highlight
  const page = document.body.dataset.page;
  const active = document.querySelector(`[data-nav="${page}"]`);
  if(active) active.setAttribute('aria-current', 'page');

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if(navToggle && navMenu){
    navToggle.addEventListener('click', ()=>{
      const open = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', (e)=>{
      if(!navMenu.contains(e.target) && !navToggle.contains(e.target)){
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded','false');
      }
    });
  }

  // Dark mode
  const modeToggle = document.getElementById('modeToggle');
  const applyTheme = (t)=> document.documentElement.setAttribute('data-theme', t);
  const saved = localStorage.getItem('theme');
  if(saved) applyTheme(saved);
  if(modeToggle){
    modeToggle.addEventListener('click', ()=>{
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  }

  // Scroll reveal
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, {threshold:.15});
  document.querySelectorAll('.reveal').forEach(el=> io.observe(el));

  // Back-to-top
  const toTop = document.getElementById('toTop');
  if(toTop){
    window.addEventListener('scroll', ()=>{
      if(window.scrollY > 550) toTop.classList.add('show'); else toTop.classList.remove('show');
    });
    toTop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
  }

  // Newsletter validation
  const newsletterForm = document.getElementById('newsletterForm');
  if(newsletterForm){
    newsletterForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const email = /** @type {HTMLInputElement} */(document.getElementById('newsletterEmail'));
      const msg = newsletterForm.querySelector('.form-msg');
      if(!email.checkValidity()){ msg.textContent = 'Please enter a valid email.'; email.focus(); return; }
      msg.textContent = 'Thanks — subscribed!';
      email.value='';
    });
  }

  // Modal for consultation
  const consultModal = document.getElementById('consultModal');
  const openButtons = document.querySelectorAll('[data-open-modal="consult"]');
  const closeEls = consultModal ? consultModal.querySelectorAll('[data-close-modal]') : [];
  function openModal(){
    if(!consultModal) return;
    consultModal.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
  }
  function closeModal(){
    if(!consultModal) return;
    consultModal.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
  }
  openButtons.forEach(b=> b.addEventListener('click', openModal));
  closeEls.forEach(b=> b.addEventListener('click', closeModal));
  if(consultModal){
    consultModal.addEventListener('click', (e)=>{ if(e.target === consultModal) closeModal(); });
    document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal(); });
  }

  // Consult form & contact form validation
  function wireForm(formId){
    const form = document.getElementById(formId);
    if(!form) return;
    const msg = form.querySelector('.form-msg');
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      let ok = true;
      form.querySelectorAll('.error').forEach(e=> e.textContent='');
      form.querySelectorAll('input[required], textarea[required], select[required]').forEach(el=>{
        const container = el.closest('.field');
        const err = container ? container.querySelector('.error') : null;
        const valid = el.type === 'email' ? el.checkValidity() : (el.value && el.value.trim().length >= (el.getAttribute('minlength') || 1));
        if(!valid && err){ err.textContent = 'Please complete this field.'; ok = false; }
      });
      if(!ok) return;
      msg.textContent = 'Thanks! We will get back to you shortly.';
      form.reset();
    });
  }
  wireForm('contactForm');
  wireForm('consultForm');

  // Case filters
  const chips = document.querySelectorAll('.chip');
  const cases = document.querySelectorAll('.case');
  chips.forEach(c=>{
    c.addEventListener('click', ()=>{
      chips.forEach(x=> x.classList.remove('active'));
      c.classList.add('active');
      const f = c.getAttribute('data-filter');
      cases.forEach(cs=>{
        const show = f === 'all' || cs.getAttribute('data-category') === f;
        cs.style.display = show ? '' : 'none';
      });
    });
  });
})();
