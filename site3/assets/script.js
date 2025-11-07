// Simple i18n loader and UI interactions
const I18N_PATH = '/site3/i18n/';
let locale = 'en';
let translations = {};

async function loadLocale(l){
  try{
    const res = await fetch(I18N_PATH + l + '.json');
    if(!res.ok) throw new Error('no locale');
    translations = await res.json();
    locale = l;
    applyTranslations();
    document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active', b.dataset.lang===l));
  }catch(e){console.warn('i18n load failed',e)}
}

function applyTranslations(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    const txt = getKey(translations, key) || el.textContent;
    if(el.tagName.toLowerCase()==='input' || el.tagName.toLowerCase()==='textarea') el.placeholder = txt;
    else el.textContent = txt;
  });
}

function getKey(obj, path){
  const parts = path.split('.');
  let cur = obj;
  for(const p of parts){ if(!cur) return null; cur = cur[p]; }
  return cur;
}

document.addEventListener('click', e=>{
  const b = e.target.closest('.lang-btn');
  if(b) loadLocale(b.dataset.lang);
});

// contact form mailto fallback
function sendMail(e){
  e.preventDefault();
  const name = encodeURIComponent(document.getElementById('cf-name').value || '');
  const email = encodeURIComponent(document.getElementById('cf-email').value || '');
  const message = encodeURIComponent(document.getElementById('cf-message').value || '');
  const subject = encodeURIComponent('BePay Contact');
  const body = 'Name: '+name+'%0AEmail: '+email+'%0A%0A'+message;
  window.location.href = `mailto:info@bepay.ge?subject=${subject}&body=${body}`;
}

// small helpers
document.getElementById('year').textContent = new Date().getFullYear();

// init
loadLocale('en');
