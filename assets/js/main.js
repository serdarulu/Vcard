
document.addEventListener('DOMContentLoaded', function(){
  // language switcher
  document.querySelectorAll('[data-lang]').forEach(function(btn){
    btn.addEventListener('click', function(e){
      e.preventDefault();
      var lang = this.getAttribute('data-lang');
      fetch('/assets/js/lang/' + lang + '.json').then(r=>r.json()).then(data=>{
        // small mapping of keys to elements
        document.querySelectorAll('[data-key]').forEach(function(el){
          var key = el.getAttribute('data-key');
          if(data[key]) el.innerHTML = data[key];
        });
      });
    });
  });
});
