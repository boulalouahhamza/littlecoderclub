
/* وظائف بسيطة للموقع */
document.addEventListener('DOMContentLoaded', () => {
  // سنة الحقوق تلقائياً
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // إرسال نموذج (بدون خادم): عرض رسالة نجاح فقط
  document.querySelectorAll('form[data-demo=true]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type=submit]');
      if (btn) {
        const old = btn.textContent;
        btn.disabled = true;
        btn.textContent = '✓ تم الإرسال (تجريبي)';
        setTimeout(()=>{
          btn.disabled = false;
          btn.textContent = old;
          form.reset();
          alert('تم إرسال البيانات (تجريبي). يمكنك ربطه لاحقًا بـ Google Forms أو Formspree.');
        }, 800);
      }
    });
  });
});
