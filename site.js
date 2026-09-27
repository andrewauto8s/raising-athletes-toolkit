
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
// Sliding highlight behind the current page tab, and a stronger shadow once scrolled
(function(){
  var nav=document.querySelector('.sitenav'); if(!nav) return;
  var ul=nav.querySelector('ul'), slider=nav.querySelector('.slider'), cur=nav.querySelector('ul a[aria-current="page"]');
  function place(a){ if(!slider||!a) return; nav.querySelectorAll('ul a').forEach(function(x){x.classList.toggle('on',x===a);}); slider.style.width=a.offsetWidth+'px'; slider.style.transform='translateX('+a.parentNode.offsetLeft+'px)'; }
  if(slider && cur){
    place(cur);
    requestAnimationFrame(function(){ nav.classList.add('ready'); });
    nav.querySelectorAll('ul a').forEach(function(a){
      a.addEventListener('mouseenter',function(){ place(a); });
      a.addEventListener('focus',function(){ place(a); });
    });
    ul.addEventListener('mouseleave',function(){ place(cur); });
    window.addEventListener('resize',function(){ place(cur); });
    if(ul.scrollWidth>ul.clientWidth) ul.scrollLeft=cur.parentNode.offsetLeft-12;
  } else { document.documentElement.classList.add('no-slider'); }
  function onScroll(){ nav.classList.toggle('scrolled', window.scrollY>8); }
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();
})();
// Back-to-top button for long pages
(function(){
  var b=document.createElement('button');b.type='button';b.className='to-top';b.setAttribute('aria-label','Back to top');
  b.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  b.addEventListener('click',function(){window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});});
  document.body.appendChild(b);
  function t(){b.classList.toggle('show',window.scrollY>900);}
  window.addEventListener('scroll',t,{passive:true});t();
})();
