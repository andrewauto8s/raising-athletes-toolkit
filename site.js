
(function(){
  var links = Array.prototype.slice.call(document.querySelectorAll('.toc a'));
  var select = document.getElementById('jump');
  var groups = document.querySelectorAll('.toc h4');
  // Build mobile select from the sidebar so there is one source of truth
  var toc = document.querySelector('.toc');
  if (!toc) { toc = null; }
  var current = null;
  if (toc && select) Array.prototype.forEach.call(toc.children, function(el){
    if (el.tagName === 'H4') { current = document.createElement('optgroup'); current.label = el.textContent; select.appendChild(current); }
    else if (el.tagName === 'A') { var o = document.createElement('option'); o.value = el.getAttribute('href'); o.textContent = el.textContent; (current || select).appendChild(o); }
  });
  if (select) select.addEventListener('change', function(){
    var t = document.querySelector(select.value);
    if (t) t.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  });

  // Scrollspy
  var sections = links.map(function(a){ return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  function spy(){
    var y = window.scrollY + 120, active = sections[0];
    sections.forEach(function(s){ if (s.offsetTop <= y) active = s; });
    links.forEach(function(a){ a.classList.toggle('active', a.getAttribute('href') === '#' + active.id); });
    if (select && select.value !== '#' + active.id) select.value = '#' + active.id;
  }
  if (sections.length) { window.addEventListener('scroll', spy, {passive:true}); spy(); }

  // Copy buttons
  document.querySelectorAll('[data-copy]').forEach(function(btn){
    btn.addEventListener('click', function(){
      var el = document.getElementById(btn.getAttribute('data-copy'));
      var text = el.textContent.trim();
      var done = function(){ var t = btn.textContent; btn.textContent = 'Copied'; setTimeout(function(){ btn.textContent = t; }, 1600); };
      var fallback = function(){ var r = document.createRange(); r.selectNodeContents(el); var s = getSelection(); s.removeAllRanges(); s.addRange(r); btn.textContent = 'Selected, press Ctrl/⌘+C'; };
      try { navigator.clipboard.writeText(text).then(done, fallback); } catch(e){ fallback(); }
    });
  });
})();
// Keep the current page's tab visible in the phone menu
(function(){var a=document.querySelector('.sitenav ul a[aria-current="page"]');if(a&&a.parentNode&&a.closest('ul').scrollWidth>a.closest('ul').clientWidth){var ul=a.closest('ul');ul.scrollLeft=a.offsetLeft-ul.offsetLeft-12;}})();
