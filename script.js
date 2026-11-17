(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const closeMenu = () => {
    if (!menuToggle || !menu) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    menu.hidden = true;
  };
  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
      menu.hidden = isOpen;
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMenu(); });
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.reveal');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .08, rootMargin: '0px 0px -20px 0px' });
    revealItems.forEach(el => observer.observe(el));
  } else revealItems.forEach(el => el.classList.add('visible'));

  const tabs = Array.from(document.querySelectorAll('.layer-tab'));
  const tabTitle = document.getElementById('layer-content-title');
  const tabText = document.getElementById('layer-content-text');
  const tabIcon = document.getElementById('layer-content-icon');
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active'); tab.setAttribute('aria-selected', 'true');
      tabTitle.textContent = tab.dataset.title;
      tabText.textContent = tab.dataset.text;
      tabIcon.textContent = tab.dataset.icon;
    });
    tab.addEventListener('keydown', e => {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key)) return;
      e.preventDefault();
      const nextIndex = e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : (index + (['ArrowRight', 'ArrowDown'].includes(e.key) ? 1 : -1) + tabs.length) % tabs.length;
      tabs[nextIndex].focus(); tabs[nextIndex].click();
    });
  });

  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  const dialog = document.getElementById('photo-dialog');
  const dialogImage = document.getElementById('dialog-image');
  const dialogCaption = document.getElementById('dialog-caption');
  const dialogIndex = document.getElementById('dialog-index');
  const close = dialog.querySelector('.dialog-close');
  let currentIndex = 0;
  let returnFocus = null;
  const showImage = index => {
    currentIndex = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[currentIndex];
    dialogImage.src = item.dataset.image;
    dialogImage.alt = item.querySelector('img').alt;
    dialogCaption.textContent = item.dataset.caption;
    dialogIndex.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(galleryItems.length).padStart(2, '0')}`;
  };
  galleryItems.forEach((item, index) => item.addEventListener('click', () => {
    returnFocus = item;
    showImage(index);
    dialog.showModal();
    document.body.classList.add('dialog-open');
  }));
  close.addEventListener('click', () => dialog.close());
  dialog.querySelector('#dialog-prev').addEventListener('click', () => showImage(currentIndex - 1));
  dialog.querySelector('#dialog-next').addEventListener('click', () => showImage(currentIndex + 1));
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); showImage(currentIndex - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showImage(currentIndex + 1); }
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    dialogImage.removeAttribute('src');
    if (returnFocus) returnFocus.focus();
  });

  // November 29 in Nigeria (WAT, UTC+1). Keep this date annually recurring.
  const birthdayCountdown = document.getElementById('birthday-countdown');
  const birthdayArrived = document.getElementById('birthday-arrived');
  const pad = n => String(n).padStart(2,'0');
  const updateBirthday = () => {
    const now = new Date();
    const year = Number(new Intl.DateTimeFormat('en-GB',{timeZone:'Africa/Lagos',year:'numeric'}).format(now));
    const birthday = new Date(Date.UTC(year,10,28,23,0,0));
    const end = new Date(Date.UTC(year,10,29,23,0,0));
    const onBirthday = now >= birthday && now < end;
    birthdayCountdown.hidden = onBirthday;
    birthdayArrived.hidden = !onBirthday;
    if(onBirthday) return;
    const next = now >= end ? new Date(Date.UTC(year+1,10,28,23,0,0)) : birthday;
    const remaining = Math.max(0,Math.floor((next-now)/1000));
    [['days',Math.floor(remaining/86400)],['hours',Math.floor(remaining%86400/3600)],['minutes',Math.floor(remaining%3600/60)],['seconds',remaining%60]].forEach(([id,v])=>document.getElementById(id).textContent=pad(v));
  };
  updateBirthday();setInterval(updateBirthday,1000);
  const confettiButton=document.getElementById('birthday-confetti');
  confettiButton.addEventListener('click',()=>{
    const field=document.getElementById('confetti-container');
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const colors=['#c66d90','#edb963','#9c88b7','#e9a3ac','#7eac9c'];
    for(let i=0;i<75;i++){
      const piece=document.createElement('span');piece.className='confetti-piece';
      piece.style.left=(Math.random()*100)+'%';piece.style.background=colors[i%colors.length];
      piece.style.animationDelay=(Math.random()*.9)+'s';
      piece.style.animationDuration=(2.5+Math.random()*2)+'s';
      field.appendChild(piece);setTimeout(()=>piece.remove(),5500);
    }
  });

  document.getElementById('year').textContent = String(new Date().getFullYear());
})();
