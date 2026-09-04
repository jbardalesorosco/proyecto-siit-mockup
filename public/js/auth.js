(function(){
  var timerInterval = null;

  function startMfaTimer(){
    clearInterval(timerInterval);
    var timerEl = document.getElementById('mfa-timer');
    if(!timerEl) return;
    var totalSeconds = 298; // 04:58
    function update(){
      var m = Math.floor(totalSeconds / 60);
      var s = totalSeconds % 60;
      timerEl.textContent = (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s) + ' min';
      if(totalSeconds <= 0){
        clearInterval(timerInterval);
        timerEl.textContent = '00:00 (Expirado)';
        timerEl.style.color = 'var(--red)';
      }
      totalSeconds--;
    }
    update();
    timerInterval = setInterval(update, 1000);
  }

  window.__onShow = window.__onShow || {};
  window.__onShow['login-mfa'] = function(){
    startMfaTimer();
  };

  document.addEventListener('click', function(e){
    if(e.target.id === 'btn-mfa-resend'){
      startMfaTimer();
      alert('Nuevo código OTP de 6 dígitos enviado a tu correo registrado (a***o@sunafil.gob.pe).');
    }
  });
})();
