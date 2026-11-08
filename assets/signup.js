// Sign-up goes to the Kit form in the background, so readers stay on the page.
(function () {
  const SIGNUP = { form: '10075748', liveHost: 'inkofsinai.com', guide: '/guide/Read-Biblical-Hebrew-in-22-Days.pdf' };
  const form = document.getElementById('signup'); if (!form) return;
  const email = document.getElementById('email'), status = document.getElementById('signup-status');
  const host = location.hostname, live = host === SIGNUP.liveHost || host.endsWith('.' + SIGNUP.liveHost);
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!email.value || !email.checkValidity()) { status.textContent = 'Enter an email address like name@example.com.'; email.focus(); return; }
    if (!live) { status.textContent = 'Sign-up works once the site is live at inkofsinai.com.'; return; }
    const button = form.querySelector('button'); button.disabled = true; status.textContent = 'Subscribing…';
    try {
      await fetch('https://app.kit.com/forms/' + SIGNUP.form + '/subscriptions', { method: 'POST', mode: 'no-cors', body: new URLSearchParams({ email_address: email.value.trim() }) });
      form.querySelector('.form').style.display = 'none';
      status.innerHTML = '<a class="dl" href="' + SIGNUP.guide + '" download>Download your guide (PDF)</a><br>You\'re in. The next email arrives Thursday.';
    } catch { button.disabled = false; status.textContent = 'Something went wrong. Please try again in a moment.'; }
  });
})();
