(function(){
  var CHROMELESS = {
    landing: 1,
    login: 1,
    'login-mfa': 1,
    'login-recuperar': 1,
    'login-restablecer-clave': 1,
    'login-restablecer-expirado': 1,
    'login-cambio-clave': 1,
    'ext-registro': 1
  };

  function toggleSidebar(){
    var sidebar = document.getElementById('sidebar');
    if(sidebar){
      var currentState = sidebar.getAttribute('data-state') || 'Collapsed';
      var nextState = currentState === 'Collapsed' ? 'Expanded' : 'Collapsed';
      sidebar.setAttribute('data-state', nextState);
    }
  }
  window.toggleSidebar = toggleSidebar;

  function toggleFlyout(show){
    var flyout = document.getElementById('modulos-flyout');
    var modulosBtn = document.getElementById('sb-btn-modulos');
    if(!flyout) return;

    if(typeof show === 'boolean'){
      flyout.style.display = show ? 'flex' : 'none';
      if(modulosBtn) modulosBtn.classList.toggle('active', show);
    } else {
      var isVisible = flyout.style.display === 'flex';
      flyout.style.display = isVisible ? 'none' : 'flex';
      if(modulosBtn) modulosBtn.classList.toggle('active', !isVisible);
    }
  }
  window.toggleFlyout = toggleFlyout;

  function isScreen(id){
    if(!id) return false;
    var el = document.getElementById(id);
    return !!(el && el.classList && el.classList.contains('screen'));
  }

  function getCurrentScreenId(){
    var curr = document.querySelector('.screen.on');
    return curr ? curr.id : null;
  }

  function render(id){
    if(!isScreen(id)){
      var currId = getCurrentScreenId();
      if(currId){
        // Si ya hay una pantalla activa y la solicitada no existe, no hacemos nada
        return;
      }
      // En carga inicial si no existe pantalla activa, recurrimos a login
      id = 'login';
    }
    
    // Hide all screens & activate target
    document.querySelectorAll('.screen').forEach(function(s){ s.classList.remove('on'); });
    var el = document.getElementById(id);
    if(el) el.classList.add('on');

    // Layout visibility
    var isChromeLess = !!CHROMELESS[id];
    var chromeEl = document.getElementById('chrome');
    if(chromeEl) chromeEl.style.display = isChromeLess ? 'none' : 'block';
    
    var shellEl = document.getElementById('shell');
    if(shellEl) shellEl.style.display = isChromeLess ? 'none' : 'flex';

    // Highlight active item in sidebar (EXCLUDING 'Inicio' / data-go="home")
    var sidebar = document.getElementById('sidebar');
    var flyoutVisible = false;
    var flyoutEl = document.getElementById('modulos-flyout');
    if(flyoutEl && flyoutEl.style.display === 'flex'){
      flyoutVisible = true;
    }

    if(sidebar){
      sidebar.querySelectorAll('.sb-icon-btn').forEach(function(btn){
        btn.classList.remove('active');
        var targetGo = btn.getAttribute('data-go');
        if(targetGo !== 'home' && (targetGo === id || (targetGo === 'expediente' && (id === 'expediente' || id === 'exp-list' || id === 'exp-detail')) || (targetGo === 'tra001-list' && (id === 'tra002-list' || id === 'tra001-form' || id === 'tra001-form-v2' || id === 'mod-transversales')))){
          btn.classList.add('active');
        }
      });
      // If flyout is open, ensure Módulos remains highlighted
      var modBtn = document.getElementById('sb-btn-modulos');
      if(modBtn && flyoutVisible) modBtn.classList.add('active');
    }

    // Highlight active item in Flyout Drawer
    if(flyoutEl){
      flyoutEl.querySelectorAll('.flyout-item').forEach(function(item){
        item.classList.remove('active');
        if(item.getAttribute('data-go') === id){
          item.classList.add('active');
        }
      });
    }

    window.scrollTo(0,0);

    // Call screen hooks if defined
    if(window.__onShow && window.__onShow[id]) window.__onShow[id]();
    if(window.__afterShow) window.__afterShow(id);
  }

  function go(id){
    if(!id || !isScreen(id)){
      // Si la pantalla destino no existe en el DOM, no hacer nada ni redirigir
      return;
    }
    if(location.hash !== '#' + id){
      location.hash = id;
    } else {
      render(id);
    }
  }

  window.go = go;
  window.render = render;

  document.addEventListener('click', function(e){
    // 1. ONLY Hamburger icon toggles sidebar
    var toggleBtn = e.target.closest('#btn-toggle-sidebar');
    if(toggleBtn){
      e.preventDefault();
      toggleSidebar();
      return;
    }

    // 2. Close button in Flyout Drawer
    var closeFlyoutBtn = e.target.closest('#btn-close-flyout');
    if(closeFlyoutBtn){
      e.preventDefault();
      toggleFlyout(false);
      return;
    }

    // 3. Módulos Sidebar Button opens/toggles Flyout Drawer
    var modulosBtn = e.target.closest('#sb-btn-modulos');
    if(modulosBtn){
      e.preventDefault();
      toggleFlyout();
      return;
    }

    // 4. Accordion Toggle inside Flyout Drawer
    var flyoutToggle = e.target.closest('.flyout-toggle');
    if(flyoutToggle){
      e.preventDefault();
      var group = flyoutToggle.closest('.flyout-group');
      if(group){
        group.classList.toggle('open');
      }
      return;
    }

    // 5. Global Navigation via [data-go]
    var t = e.target.closest('[data-go]');
    if(t){
      e.preventDefault();
      var targetId = t.getAttribute('data-go');
      // Si la pantalla no existe, no navegar ni alterar nada
      if(!isScreen(targetId)){
        return;
      }
      go(targetId);
      return;
    }

    // 6. Click Outside Flyout Drawer Auto-Close
    var flyoutEl = document.getElementById('modulos-flyout');
    if(flyoutEl && flyoutEl.style.display === 'flex'){
      var insideFlyout = e.target.closest('#modulos-flyout');
      var insideSidebarMod = e.target.closest('#sb-btn-modulos');
      if(!insideFlyout && !insideSidebarMod){
        toggleFlyout(false);
      }
    }
  });

  window.addEventListener('hashchange', function(){
    var h = location.hash.slice(1);
    if(h && !isScreen(h)){
      // Si el hash no apunta a una pantalla real, restauramos o ignoramos
      var currId = getCurrentScreenId();
      if(currId && location.hash !== '#' + currId){
        location.hash = currId;
      }
      return;
    }
    render(h || 'login');
  });

  document.addEventListener('DOMContentLoaded', function(){
    var initialRoute = location.hash.slice(1);
    if(!isScreen(initialRoute)) initialRoute = 'login';
    render(initialRoute);
  });
})();
