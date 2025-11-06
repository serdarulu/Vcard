(async function(){
  const defaultLang = 'en';
  const langButtons = document.querySelectorAll('.lang-switcher [data-lang]');
  const yearEl = document.getElementById('year');
  yearEl.textContent = new Date().getFullYear();

  function setLangOnButtons(active){
    langButtons.forEach(b => {
      b.style.opacity = b.dataset.lang === active ? '1' : '0.6';
    });
  }

  async function loadLang(lang){
    try{
      const res = await fetch(`i18n/${lang}.json`);
      if(!res.ok) throw new Error('Lang file not found');
      const data = await res.json();
      document.querySelectorAll('[data-i18n]').forEach(el=>{
        const key = el.getAttribute('data-i18n');
        const val = key.split('.').reduce((o,k)=> (o && o[k] !== undefined) ? o[k] : null, data);
        if(val !== null){
          if(el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea'){
            el.placeholder = val;
          } else {
            el.textContent = val;
          }
        }
      });
      setLangOnButtons(lang);
      localStorage.setItem('site_lang', lang);
    } catch(e){
      console.error('Could not load language', e);
    }
  }

  langButtons.forEach(b=>{
    b.addEventListener('click', ()=> loadLang(b.dataset.lang));
  });

  const stored = localStorage.getItem('site_lang') || defaultLang;
  await loadLang(stored);
})();