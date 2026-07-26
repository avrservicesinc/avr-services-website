document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  // Navigation uses native HTML <details> for reliable mobile behavior.


  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .08 });
    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }

  const form = document.querySelector('#service-form');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = `Mobile Service Request${data.get('company') ? ` - ${data.get('company')}` : ''}`;
    const body = [
      `Name: ${data.get('name') || ''}`,
      `Company: ${data.get('company') || ''}`,
      `Phone: ${data.get('phone') || ''}`,
      `Unit number: ${data.get('unit') || ''}`,
      `Service type: ${data.get('service') || ''}`,
      `Service location: ${data.get('location') || ''}`,
      '',
      'Issue:',
      data.get('issue') || ''
    ].join('\n');
    window.location.href = `mailto:office@avrservicesinc.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length) {
    const lightbox = document.createElement('div');
    lightbox.className = 'photo-lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.innerHTML = '<button type="button" aria-label="Close photo">×</button><img alt=""><p></p>';
    document.body.appendChild(lightbox);
    const lightboxImage = lightbox.querySelector('img');
    const lightboxCaption = lightbox.querySelector('p');
    const closeLightbox = () => { lightbox.classList.remove('open'); document.body.style.overflow = ''; };
    galleryItems.forEach(item => item.addEventListener('click', () => {
      const image = item.querySelector('img');
      if (!image) return;
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightboxCaption.textContent = item.querySelector('figcaption')?.textContent || '';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }));
    lightbox.querySelector('button').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeLightbox(); });
  }
});
