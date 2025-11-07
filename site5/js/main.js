// Simple multi-language loader + UI interactions
const languages = ['en','ru','ka'];
let currentLang = localStorage.getItem('site_lang') || 'en';
const translations = {};
const WHATSAPP_NUMBER = '995558238041'; // provided number

async function loadLang(lang){
  if(translations[lang]) return translations[lang];
  try{
    const res = await fetch(`assets/i18n/${lang}.json`);
    const data = await res.json();
    translations[lang]=data;
    return data;
  }catch(e){console.warn('i18n load failed',e);return{};}
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

  // Chat widget wiring
  const chatToggle = document.getElementById('chatToggle');
  const chatPanel = document.getElementById('chatPanel');
  const chatClose = document.getElementById('chatClose');
  const chatSend = document.getElementById('chatSend');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');
  const chatWhatsapp = document.getElementById('chatWhatsapp');

  function appendMessage(text, who='agent'){
    const el = document.createElement('div');
    el.className = 'msg ' + (who==='user' ? 'user' : 'agent');
    el.textContent = text;
    chatMessages.appendChild(el);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function openChat(){
    chatPanel.classList.add('open');
    document.getElementById('chatWidget').setAttribute('aria-hidden','false');
    // greet
    const greet = (translations[currentLang] && translations[currentLang]['chat.greet']) || 'Hello! How can we help you today?';
    setTimeout(()=>appendMessage(greet,'agent'),300);
  }
  function closeChat(){
    chatPanel.classList.remove('open');
    document.getElementById('chatWidget').setAttribute('aria-hidden','true');
  }

  chatToggle.addEventListener('click', ()=> openChat());
  chatClose.addEventListener('click', ()=> closeChat());

  chatSend.addEventListener('click', ()=>{
    const txt = chatInput.value.trim();
    if(!txt) return;
    appendMessage(txt,'user');
    chatInput.value = '';
    // simulate reply
    setTimeout(()=>{
      appendMessage((translations[currentLang] && translations[currentLang]['chat.reply']) || 'Thanks! A support agent will respond shortly.','agent');
    },900);
  });

  chatInput.addEventListener('keydown',(e)=>{ if(e.key==='Enter'){ e.preventDefault(); chatSend.click(); } });

  // Open in WhatsApp
  chatWhatsapp.addEventListener('click', ()=>{
    const text = encodeURIComponent((translations[currentLang] && translations[currentLang]['chat.whatsapp_message']) || 'Hello, I need live support.');
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url,'_blank');
  });

});

// menu toggle for small screens
document.addEventListener('click', (e)=>{
  if(e.target.matches('.menu-toggle')){
    document.querySelector('.nav').classList.toggle('open');
  }
});