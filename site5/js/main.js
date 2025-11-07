// Simple multi-language loader + UI interactions
const languages = ['en','ru','ka'];
let currentLang = localStorage.getItem('site_lang') || 'en';
const translations = {};

async function loadLang(lang){
  if(translations[lang]) return translations[lang];
  try{
    const res = await fetch(`assets/i18n/${lang}.json`);
    const data = await res.json();
    translations[lang]=data;
    return data;
  }catch(e){console.warn('i18n load failed',e);return{}}
}

function applyTranslations(data){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if(data[key]) el.textContent = data[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    const key = el.getAttribute('data-i18n-placeholder');
    if(data[key]) el.placeholder = data[key];
  });
}

async function setLang(lang){
  currentLang = lang;
  localStorage.setItem('site_lang',lang);
  const data = await loadLang(lang);
  applyTranslations(data);
}

document.addEventListener('DOMContentLoaded', async ()=>{
  // wire language buttons
  document.querySelectorAll('.lang-btn').forEach(btn=>{
    btn.addEventListener('click', ()=> setLang(btn.getAttribute('data-lang')));
  });
  await setLang(currentLang);

  // Smooth scroll
  document.querySelectorAll('[data-scroll]').forEach(a=>{
    a.addEventListener('click', e=>{
      e.preventDefault();
      const href = a.getAttribute('href');
      if(href && href.startsWith('#')) document.querySelector(href).scrollIntoView({behavior:'smooth'});
    });
  });

  // contact form faux submit
  document.getElementById('submitBtn').addEventListener('click', ()=>{
    const btn = document.getElementById('submitBtn');
    btn.textContent = 'Sending...';
    setTimeout(()=>{btn.textContent = (translations[currentLang] && translations[currentLang]['contact.form.sent']) || 'Sent';},1200);
  });

  // simple reveal animation
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('inview'); });
  },{threshold:0.12});
  document.querySelectorAll('.card, .feature, .hero').forEach(el=>io.observe(el));
});

// menu toggle for small screens
document.addEventListener('click', (e)=>{
  if(e.target.matches('.menu-toggle')){
    document.querySelector('.nav').classList.toggle('open');
  }
});