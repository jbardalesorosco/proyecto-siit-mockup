/* ==========================================================================
   SIIT · ADMINISTRADOR DE LÍNEA GRÁFICA (TRA · LÍNEA GRÁFICA FUNCIONAL)
   ========================================================================== */

(function(){
  var PENCIL = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/><path d="M12 20h9"/></svg>';
  var TRASH = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>';
  var VALIDATE = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>';
  var APPROVE = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><polyline points="9 14 11 16 15 12"/></svg>';
  var SEND = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>';
  var FILE_SEARCH = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><circle cx="11.5" cy="14.5" r="2.5"/><path d="M13.3 16.3 15 18"/></svg>';
  var FILE_X = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="m14.5 12.5-5 5"/><path d="m9.5 12.5 5 5"/></svg>';
  var FILE_PEN = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10"/><path d="M14 2v4a1 1 0 0 0 1 1h4"/><path d="M10.4 12.6a2 2 0 1 1 2.8 2.8L6 22l-3 1 1-3Z"/></svg>';

  var G = {
    palettes: [],
    draft: null,
    mode: 'create',
    origId: null,
    tab: 'colores',
    seq: 6,
    selected: [],
    isSimulating: false,
    tipo: { primaria: 'Inter', secundaria: 'Inter', base: '14px' },
    estados: { warn: '#F7ECD5', info: '#DDF0FF', ok: '#D7F5E8', off: '#F0ECE9' },
    botones: { radius: '6px', style: 'Relleno' }
  };

  var KEYS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

  function uid(){ return 'g' + Math.random().toString(36).slice(2,9); }
  function today(){ var d = new Date(); function p(x){ return String(x).padStart(2,'0'); } return p(d.getDate()) + '/' + p(d.getMonth()+1) + '/' + d.getFullYear(); }
  function esc(s){ return (s == null ? '' : String(s)).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }

  function buildFigmaFieldHtml(opts){
    var isReq = opts.required !== false;
    var reqMark = isReq ? '<span class="field-req">*</span>' : '';
    var maxLen = opts.maxlength || 200;
    var roAttr = opts.readonly ? ' readonly style="background:#F8FAFC;cursor:default;"' : '';
    var inputTag = opts.customHtml
      ? opts.customHtml
      : (opts.isTextarea
        ? '<textarea id="' + opts.id + '" maxlength="' + maxLen + '" placeholder="' + esc(opts.placeholder || '') + '"' + roAttr + '>' + esc(opts.value || '') + '</textarea>' +
          (opts.readonly ? '' : '<div class="field-clear-btn" id="clear-' + opts.id + '" title="Limpiar texto">' +
            '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:#504C4A;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>' +
          '</div>')
        : '<input id="' + opts.id + '" value="' + esc(opts.value || '') + '" placeholder="' + esc(opts.placeholder || '') + '"' + roAttr + '>');

    var hasVal = !!((opts.value && String(opts.value).trim().length > 0) || (opts.selectedValue && String(opts.selectedValue).trim().length > 0));
    var counterHtml = opts.isTextarea
      ? '<div class="field-counter-row"><span class="field-counter" id="counter-' + opts.id + '">' + ((opts.value || '').length) + '/' + maxLen + '</span></div>'
      : '';

    return '<div class="figma-field' + (opts.isTextarea ? ' is-textarea' : '') + (hasVal ? ' has-value' : '') + '" id="wrap-' + opts.id + '">' +
      '<div class="field-box">' +
        '<div class="field-label-notch">' +
          '<div class="field-label-wrapper">' +
            '<span class="field-label">' + esc(opts.label) + '</span>' +
            reqMark +
          '</div>' +
        '</div>' +
        inputTag +
        '<div class="field-trailing">' +
          '<div class="field-vsep"></div>' +
          '<div class="field-err-icon">!</div>' +
        '</div>' +
      '</div>' +
      '<div class="field-helper">' + (opts.helperText || 'Este campo es obligatorio.') + '</div>' +
      counterHtml +
    '</div>';
  }

  function buildCustomSelectHtml(opts){
    var selVal = opts.selectedValue || '';
    var placeholder = opts.placeholder || 'Seleccionar...';
    var displayText = selVal || placeholder;
    var isPl = !selVal;

    var itemsHtml = opts.options.map(function(item){
      var valStr = typeof item === 'object' ? item.val : item;
      var lblStr = typeof item === 'object' ? item.lbl : item;
      var isSel = valStr === selVal;
      return '<div class="figma-select-item' + (isSel ? ' is-selected' : '') + '" data-val="' + esc(valStr) + '">' +
        '<span>' + esc(lblStr) + '</span>' +
      '</div>';
    }).join('');

    var customHtml = '<div class="figma-select-wrapper" id="selwrap-' + opts.id + '">' +
      '<input type="hidden" id="' + opts.id + '" value="' + esc(selVal) + '">' +
      '<div class="figma-select-trigger" id="trigger-' + opts.id + '">' +
        '<span class="figma-select-val' + (isPl ? ' is-placeholder' : '') + '" id="val-' + opts.id + '">' + esc(displayText) + '</span>' +
        '<svg class="figma-select-arrow" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>' +
      '</div>' +
      '<div class="figma-select-menu" id="menu-' + opts.id + '">' + itemsHtml + '</div>' +
    '</div>';

    return buildFigmaFieldHtml({
      id: opts.id,
      label: opts.label,
      required: opts.required,
      helperText: opts.helperText,
      selectedValue: selVal,
      customHtml: customHtml
    });
  }
  
  function toast(msg, kind){
    var t = document.getElementById('t001-toast');
    if(!t) return;
    var cfg = {
      err: { bg: '#FFDBD7', color: '#490005', icon: '<svg viewBox="0 0 24 24" style="width:20px;height:20px;stroke:#490005;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0;"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>' },
      ok: { bg: '#D7F5E8', color: '#004C37', icon: '<svg viewBox="0 0 24 24" style="width:20px;height:20px;stroke:#004C37;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0;"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>' },
      warn: { bg: '#F7ECD5', color: '#4D3800', icon: '<svg viewBox="0 0 24 24" style="width:20px;height:20px;stroke:#4D3800;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' },
      info: { bg: '#DDF0FF', color: '#002D48', icon: '<svg viewBox="0 0 24 24" style="width:20px;height:20px;stroke:#002D48;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>' }
    };
    var c = cfg[kind] || cfg.info;
    t.style.display = 'flex';
    t.style.alignItems = 'center';
    t.style.justifyContent = 'space-between';
    t.style.gap = '12px';
    t.style.background = c.bg;
    t.style.color = c.color;
    t.style.padding = '12px 16px';
    t.style.borderRadius = '8px';
    t.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
    t.style.fontSize = '14px';
    t.style.fontWeight = '500';
    t.style.fontFamily = 'Inter, sans-serif';
    t.style.minWidth = '360px';
    t.style.maxWidth = '640px';
    t.innerHTML = '<div style="display:flex;align-items:center;gap:12px;flex:1;">' + c.icon + '<span style="line-height:20px;">' + msg + '</span></div>' +
      '<button onclick="document.getElementById(\'t001-toast\').style.display=\'none\'" style="background:none;border:0;color:#504C4A;cursor:pointer;padding:2px;display:flex;align-items:center;" title="Cerrar"><svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:#504C4A;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>';
    clearTimeout(t._to);
    t._to = setTimeout(function(){ t.style.display = 'none'; }, 4800);
  }

  function modal(html, onSave){
    var ov = document.getElementById('t001-modal');
    document.getElementById('t001-modal-body').innerHTML = html;
    ov._onSave = onSave;
    var saveBtn = ov.querySelector('[data-mbtn="save"]');
    if(saveBtn && !saveBtn._custom){
      saveBtn.textContent = 'Aceptar';
      saveBtn.style.background = '#06396E';
      saveBtn.style.borderColor = '#06396E';
    }
    if(saveBtn) saveBtn._custom = false;
    ov.style.display = 'grid';
  }
  function closeModal(){ document.getElementById('t001-modal').style.display = 'none'; }
  function confirmModal(title, msg, onOk, okBtnText, okBtnClass){
    var html = '<h3 style="font-size:17px;font-weight:700;color:var(--navy-800);margin:0 0 8px;">' + esc(title) + '</h3>' +
      '<p style="font-size:13.5px;color:#475569;margin:0;">' + esc(msg) + '</p>';
    var ov = document.getElementById('t001-modal');
    var saveBtn = ov ? ov.querySelector('[data-mbtn="save"]') : null;
    if(saveBtn){
      saveBtn.textContent = okBtnText || 'Confirmar';
      saveBtn.style.background = (okBtnClass === 'approve' ? '#16A34A' : '#D51317');
      saveBtn.style.borderColor = (okBtnClass === 'approve' ? '#16A34A' : '#D51317');
      saveBtn._custom = true;
    }
    modal(html, function(){
      onOk();
      return true;
    });
  }

  function find(id){ for(var i = 0; i < G.palettes.length; i++) if(G.palettes[i].id === id) return G.palettes[i]; return null; }

  function hx(h){ h = String(h).replace('#',''); if(h.length === 3) h = h.split('').map(function(c){ return c + c; }).join(''); return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)]; }
  function toHex(a){ return '#' + a.map(function(v){ v = Math.max(0, Math.min(255, Math.round(v))); var s = v.toString(16); return s.length < 2 ? '0' + s : s; }).join(''); }
  function mix(a, b, w){ var x = hx(a), y = hx(b); return toHex([x[0] + (y[0] - x[0]) * w, x[1] + (y[1] - x[1]) * w, x[2] + (y[2] - x[2]) * w]); }
  function lighten(c, w){ return mix(c, '#ffffff', w); }
  function darken(c, w){ return mix(c, '#000000', w); }
  function tones(c){ return { 50: mix(c, '#fff', .90), 100: mix(c, '#fff', .80), 200: mix(c, '#fff', .62), 300: mix(c, '#fff', .44), 400: mix(c, '#fff', .22), 500: toHex(hx(c)), 600: darken(c, .12), 700: darken(c, .26), 800: darken(c, .40), 900: darken(c, .54) }; }

  function seed(){
    G.seq = 6;
    G.palettes = [
      { id: uid(), correlativo: '0001', title: 'Línea Gráfica Institucional SUNAFIL 2026', justificacion: 'Definición de colores e identidad gráfica oficial para el SIIT.', sustento: 'Informe_Tecnico_LG_0001.pdf', primario: '#06396E', secundario: '#2C63B0', terciario: '#D51317', estado: 'Aprobada', vigente: true, fecha: '10/07/2026', logo: 'logo_sunafil_v1.png', favicon: 'favicon_sunafil.ico', btnRadius: '6px', btnStyle: 'Relleno', version: 'v1.0', fechaPublicacion: '10/07/2026' },
      { id: uid(), correlativo: '0002', title: 'Paleta Azul MEF y Servicios Web Interoperables', justificacion: 'Armonización cromática con las plataformas transversales del Estado.', sustento: 'Sustento_MEF_Interoperabilidad.pdf', primario: '#103C6B', secundario: '#2563EB', terciario: '#C0392B', estado: 'Aprobada', vigente: false, fecha: '12/07/2026', logo: 'logo_sunafil_mef.png', favicon: 'favicon_sunafil.ico', btnRadius: '6px', btnStyle: 'Relleno' },
      { id: uid(), correlativo: '0003', title: 'Variante de Alto Contraste y Accesibilidad Web', justificacion: 'Optimización de visibilidad para cumplir con normas de accesibilidad de la SEGDI.', sustento: 'Estudio_Accesibilidad_SIIT.pdf', primario: '#0B1F33', secundario: '#1D4ED8', terciario: '#B91C1C', estado: 'Observado', observacion: 'El contraste cromático del color secundario (#1D4ED8) sobre fondo blanco es de 3.8:1, no alcanzando el mínimo de 4.5:1 exigido por la norma WCAG 2.1 AA (RN-001). Se requiere ajustar el tono y adjuntar el logotipo versión oscura con transparencia PNG.', obsFecha: '16/07/2026', obsAutor: 'Comité de Arquitectura & UX - SUNAFIL', vigente: false, fecha: '15/07/2026', logo: 'logo_sunafil_ac.png', favicon: 'favicon_sunafil.ico', btnRadius: '8px', btnStyle: 'Relleno' },
      { id: uid(), correlativo: '0004', title: 'Propuesta Cromática Edición Bicentenario SIIT', justificacion: 'Actualización de elementos gráficos con validación técnica completa para evaluación de jefatura.', sustento: 'Informe_Bicentenario_SIIT.pdf', primario: '#0F3D2E', secundario: '#1E7A46', terciario: '#C2410C', estado: 'Verificado', vigente: false, fecha: '20/07/2026', logo: 'logo_sunafil_verde.png', favicon: 'favicon_sunafil.ico', btnRadius: '6px', btnStyle: 'Relleno' },
      { id: uid(), correlativo: '0005', title: 'Línea Gráfica Especial Verde Institucional', justificacion: 'Propuesta gráfica para módulos de prevención e inspección técnica.', sustento: 'Propuesta_Verde_Inspeccion.pdf', primario: '#0F3D2E', secundario: '#1E7A46', terciario: '#C2410C', estado: 'Elaboración', vigente: false, fecha: '22/07/2026', logo: 'logo_sunafil_verde.png', favicon: 'favicon_sunafil.ico', btnRadius: '6px', btnStyle: 'Relleno' }
    ];
  }

  function getFontStack(name){
    if(name === 'System') return 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    if(name === 'Segoe UI') return '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif';
    if(name === 'Roboto') return '"Roboto", sans-serif';
    if(name === 'Open Sans') return '"Open Sans", sans-serif';
    if(name === 'Lato') return '"Lato", sans-serif';
    return '"Inter", sans-serif';
  }

  function ensureGoogleFont(fontName){
    if(!fontName || ['Inter', 'Segoe UI', 'System', 'sans-serif'].indexOf(fontName) !== -1) return;
    var fontId = 'font-link-' + fontName.toLowerCase().replace(/\s+/g, '-');
    if(!document.getElementById(fontId)){
      var link = document.createElement('link');
      link.id = fontId;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=' + encodeURIComponent(fontName) + ':wght@400;500;600;700&display=swap';
      document.head.appendChild(link);
    }
  }

  function applyTheme(p){
    if(!p) return;
    ensureGoogleFont(G.tipo.primaria);
    ensureGoogleFont(G.tipo.secundaria);

    var r = document.documentElement.style;
    r.setProperty('--navy-900', darken(p.primario, .22));
    r.setProperty('--navy-800', p.primario);
    r.setProperty('--navy-700', lighten(p.primario, .08));
    r.setProperty('--navy-600', lighten(p.primario, .20));
    r.setProperty('--blue', p.secundario);
    r.setProperty('--blue-500', p.secundario);
    r.setProperty('--blue-d', darken(p.secundario, .14));
    r.setProperty('--blue-400', lighten(p.secundario, .16));
    r.setProperty('--blue-l', lighten(p.secundario, .80));
    r.setProperty('--blue-100', lighten(p.secundario, .86));
    r.setProperty('--blue-050', lighten(p.secundario, .93));
    r.setProperty('--red', p.terciario);
    r.setProperty('--red-700', darken(p.terciario, .14));
    r.setProperty('--r-btn', p.btnRadius || '8px');

    var styleEl = document.getElementById('lg-simulation-style');
    if(G.isSimulating || p.vigente){
      if(!styleEl){
        styleEl = document.createElement('style');
        styleEl.id = 'lg-simulation-style';
        document.head.appendChild(styleEl);
      }
      var prim = p.primario || '#06396E';
      var sec = p.secundario || '#2C63B0';
      var terc = p.terciario || '#D51317';
      var rad = p.btnRadius || '8px';
      var fontP = getFontStack(G.tipo.primaria);
      var fontBase = G.tipo.base || '14px';
      var inputRad = (rad === '999px') ? '24px' : rad;
      var secLight = lighten(sec, 0.85);

      styleEl.textContent = '' +
        '#chrome, #chrome > div, .topbar {' +
          'background-color: ' + prim + ' !important;' +
        '}\n' +
        '.btn.pri, button[data-lg="save"], .sb-new-btn .ic-wrap {' +
          'background-color: ' + prim + ' !important;' +
          'border-radius: ' + rad + ' !important;' +
        '}\n' +
        'label[for$="-file"] {' +
          'background-color: ' + prim + ' !important;' +
          'border-top-left-radius: ' + inputRad + ' !important;' +
          'border-bottom-left-radius: ' + inputRad + ' !important;' +
          'border-top-right-radius: 0 !important;' +
          'border-bottom-right-radius: 0 !important;' +
        '}\n' +
        '.btn:not(label[for$="-file"]), button {' +
          'border-radius: ' + rad + ' !important;' +
        '}\n' +
        'input, select, textarea, .card {' +
          'border-radius: ' + inputRad + ' !important;' +
        '}\n' +
        '.sec-t, .chead h2, td.lnk a {' +
          'color: ' + prim + ' !important;' +
        '}\n' +
        '.sidebar-iconic .sb-icon-btn.active, .sub-menu-list a.active {' +
          'color: ' + sec + ' !important;' +
        '}\n' +
        '.sidebar-iconic .sb-icon-btn.active .ic-wrap {' +
          'background-color: ' + secLight + ' !important;' +
        '}\n' +
        '.sidebar-iconic .sb-icon-btn.active .ic-wrap svg {' +
          'stroke: ' + sec + ' !important;' +
        '}\n' +
        '.btn.gho:hover, .btn-tbl-action:hover {' +
          'border-color: ' + sec + ' !important;' +
          'color: ' + sec + ' !important;' +
        '}\n' +
        '.badge-num, div[style*="background: #D51317"], div[style*="background:#D51317"] {' +
          'background-color: ' + terc + ' !important;' +
        '}\n' +
        '.req, span.req {' +
          'color: ' + terc + ' !important;' +
        '}\n' +
        'body, body *, button, input, select, textarea {' +
          'font-family: ' + fontP + ' !important;' +
        '}\n' +
        'body {' +
          'font-size: ' + fontBase + ' !important;' +
        '}\n' +
        '.badge.b-warn { background-color: ' + G.estados.warn + ' !important; }\n' +
        '.badge.b-info { background-color: ' + G.estados.info + ' !important; }\n' +
        '.badge.b-ok { background-color: ' + G.estados.ok + ' !important; }\n' +
        '.badge.b-off { background-color: ' + G.estados.off + ' !important; }\n';
    } else if(styleEl){
      styleEl.remove();
    }
  }
  function applyFont(){ document.body.style.fontFamily = (G.tipo.primaria || 'Inter') + ', Inter, "Segoe UI", system-ui, sans-serif'; document.body.style.fontSize = G.tipo.base || '14px'; }
  function applyEstados(){ var r = document.documentElement.style, e = G.estados; r.setProperty('--warn-bg', e.warn); r.setProperty('--info-bg', e.info); r.setProperty('--ok-bg', e.ok); r.setProperty('--off-bg', e.off); }

  function previewHtml(d){
    var fontFamily = (G.tipo.primaria || 'Inter') + ', Inter, sans-serif';
    var fontSize = G.tipo.base || '14px';
    var radius = d.btnRadius || '6px';

    return '<div class="preview" style="font-family:' + fontFamily + ';font-size:' + fontSize + '">' +
      '<div class="pv-top" style="background:' + d.primario + '"><span class="m" style="background:' + d.terciario + '">S</span> SIIT · Escritorio Virtual</div>' +
      '<div class="pv-body">' +
        '<div class="pv-row">' +
          '<span class="pv-ic" style="background:' + lighten(d.primario, .20) + '"><svg viewBox="0 0 24 24"><path d="M9 3h9a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7z"/><path d="M9 3v4h4"/></svg></span>' +
          '<span class="pv-ic" style="background:' + d.secundario + '"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H8l-4 3V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z"/></svg></span>' +
          '<span class="pv-ic" style="background:' + d.terciario + '"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg></span>' +
          '<span class="lg-note">Íconos del escritorio</span>' +
        '</div>' +
        '<div class="pv-row">' +
          '<button class="pv-btn" style="background:' + d.secundario + ';border-radius:' + radius + '">Botón primario</button>' +
          '<button class="pv-btn sec" style="color:' + d.secundario + ';border-color:' + d.secundario + ';border-radius:' + radius + '">Secundario</button>' +
          '<span style="color:' + d.secundario + ';font-weight:600;font-size:12.5px">Enlace</span>' +
          '<span class="pv-badge" style="background:' + d.terciario + ';color:#fff">Acento</span>' +
        '</div>' +
      '</div></div>';
  }

  function paletteRow(p){
    var isAprobador = window.CURRENT_ROLE === 'Aprobador';
    var isSelected = G.selected && G.selected.indexOf(p.id) !== -1;
    var isDeletable = !isAprobador && !p.vigente && (p.estado === 'Elaboración' || p.estado === 'Observado');

    var a = '<div class="acts">';
    if(isAprobador){
      if(p.estado === 'Verificado'){
        a += '<a title="Aprobar solicitud" data-lg="app-action" data-id="' + p.id + '" style="color:#16A34A;cursor:pointer;">' + APPROVE + '</a>';
        a += '<a title="Observar solicitud" data-lg="obs-action" data-id="' + p.id + '" style="color:#06396E;cursor:pointer;">' + FILE_SEARCH + '</a>';
        a += '<a title="Rechazar solicitud" data-lg="rej-action" data-id="' + p.id + '" style="color:#991B1B;cursor:pointer;">' + FILE_X + '</a>';
      } else if((p.estado === 'Aprobada' || p.estado === 'Aprobado') && !p.vigente){
        a += '<a title="Publicar línea gráfica" data-lg="publish-action" data-id="' + p.id + '" style="color:#06396E;cursor:pointer;">' + SEND + '</a>';
      } else if(p.restauracionProgramada){
        a += '<a title="Cancelar restauración programada" data-lg="cancel-restore-action" data-id="' + p.id + '" style="color:#D51317;display:inline-flex;align-items:center;gap:4px;font-weight:600;cursor:pointer;"><svg viewBox="0 0 24 24" style="width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> Cancelar restauración</a>';
      } else if((p.estado === 'Publicado' || p.estado === 'Publicada') && !p.vigente){
        a += '<a title="Restaurar versión anterior" data-lg="restore-action" data-id="' + p.id + '" style="color:#0284C7;display:inline-flex;align-items:center;gap:4px;font-weight:600;cursor:pointer;"><svg viewBox="0 0 24 24" style="width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg> Restaurar</a>';
      } else {
        a += '<span style="font-size:11.5px;color:#94A3B8;font-style:italic">—</span>';
      }
    } else {
      if(p.estado === 'Eliminado'){
        a += '<span style="font-size:11.5px;color:#94A3B8;font-style:italic">Baja lógica</span>';
      } else if(p.estado === 'Observado'){
        a += '<a title="Subsanar solicitud observada" data-lg="edit" data-id="' + p.id + '" style="color:#D51317;cursor:pointer;">' + FILE_PEN + '</a>';
        a += '<a title="Eliminar solicitud" data-lg="del" data-id="' + p.id + '" style="color:#D51317;cursor:pointer;">' + TRASH + '</a>';
      } else if(p.estado === 'Elaboración'){
        a += '<a title="Verificar consistencia" data-lg="verify" data-id="' + p.id + '" style="color:#0284C7;cursor:pointer;">' + VALIDATE + '</a>';
        a += '<a title="Editar" data-lg="edit" data-id="' + p.id + '" style="color:#06396E;cursor:pointer;">' + PENCIL + '</a>';
        a += '<a title="Eliminar solicitud" data-lg="del" data-id="' + p.id + '" style="color:#D51317;cursor:pointer;">' + TRASH + '</a>';
      } else if(p.estado === 'Verificado'){
        a += '<span style="font-size:11.5px;color:#94A3B8;font-style:italic">En verificación</span>';
      } else {
        a += '<span style="font-size:11.5px;color:#94A3B8;font-style:italic">Solo lectura</span>';
      }
    }
    a += '</div>';

    var statusBadge = '';
    if(p.vigente){
      statusBadge = '<span class="badge b-ok" style="font-weight:600">Vigente ' + (p.version ? '(' + p.version + ')' : '') + '</span>';
    } else if(p.restauracionProgramada){
      statusBadge = '<span class="badge b-info" style="font-weight:600" title="Restauración: ' + p.restauracionProgramada + '">Restauración Programada (' + p.restauracionProgramada + ')</span>';
    } else if(p.estado === 'Publicado' || p.estado === 'Publicada'){
      statusBadge = '<span class="badge b-ok" style="font-weight:600">Publicado ' + (p.version ? '(' + p.version + ')' : '') + '</span>';
    } else if(p.estado === 'Programado'){
      statusBadge = '<span class="badge b-info" style="font-weight:600" title="Programado para: ' + (p.fechaProgramada || '—') + '">Programado</span>';
    } else if(p.estado === 'Aprobada' || p.estado === 'Aprobado'){
      statusBadge = '<span class="badge b-ok" style="font-weight:600">Aprobado</span>';
    } else if(p.estado === 'Verificado'){
      statusBadge = '<span class="badge b-info" style="font-weight:600">Verificado</span>';
    } else if(p.estado === 'Observado'){
      statusBadge = '<span class="badge b-warn" style="font-weight:600">Observado</span>';
    } else if(p.estado === 'Rechazado'){
      statusBadge = '<span class="badge b-danger" style="font-weight:600">Rechazado</span>';
    } else if(p.estado === 'Eliminado'){
      statusBadge = '<span class="badge b-off" style="font-weight:600">Eliminado</span>';
    } else {
      statusBadge = '<span class="badge b-off" style="font-weight:600">Elaboración</span>';
    }
    var pdfBadge = p.sustento ? '<span class="badge" style="gap:4px;display:inline-flex;align-items:center;background:#EFF6FF;color:#1E40AF;border:1px solid #BFDBFE;font-size:11px"><svg viewBox="0 0 24 24" style="width:12px;height:12px;stroke:currentColor;fill:none;stroke-width:2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> PDF</span>' : '—';

    var colorSwatches = '<span style="display:inline-flex;gap:3px;margin-left:8px;vertical-align:middle">' +
      '<i style="width:11px;height:11px;border-radius:3px;display:inline-block;background:' + p.primario + '" title="Primario"></i>' +
      '<i style="width:11px;height:11px;border-radius:3px;display:inline-block;background:' + p.secundario + '" title="Secundario"></i>' +
      '<i style="width:11px;height:11px;border-radius:3px;display:inline-block;background:' + p.terciario + '" title="Terciario"></i>' +
    '</span>';

    var titleCell = p.estado === 'Eliminado' ?
      '<span style="font-weight:400;color:var(--sys-color-text-neutral-medium, #29292A)">' + esc(p.title || p.name) + '</span>' + colorSwatches :
      '<a data-lg="edit" data-id="' + p.id + '" style="color:var(--sys-color-text-neutral-medium, #29292A);font-size:14px;font-weight:400;text-decoration:none;cursor:pointer">' + esc(p.title || p.name) + '</a>' + colorSwatches;

    return '<tr' + (p.estado === 'Eliminado' ? ' style="opacity:.55;background:#FAFAFA"' : (p.vigente ? ' style="background:#F8FAFC"' : '')) + '>' +
      '<td><input type="checkbox" class="chk" data-lg-chk="' + p.id + '" ' + (isSelected ? 'checked' : '') + ' ' + (isDeletable ? '' : 'disabled title="La selección/eliminación solo está permitida para el Rol Creador en solicitudes en estado Elaboración u Observado"') + '></td>' +
      '<td class="lnk">' + titleCell + '</td>' +
      '<td style="max-width:300px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="' + esc(p.justificacion || '') + '">' + esc(p.justificacion || '—') + '</td>' +
      '<td>' + statusBadge + '</td>' +
      '<td>' + pdfBadge + '</td>' +
      '<td class="num" style="white-space:nowrap">' + esc(p.fecha || '—') + '</td>' +
      '<td style="text-align:right">' + a + '</td>' +
    '</tr>';
  }

  function coloresTab(){
    var d = G.draft;
    var dis = window.CURRENT_ROLE === 'Aprobador' ? 'disabled' : '';
    function row(key, label){
      var t = tones(d[key]);
      var ramp = '<div class="ramp">' + KEYS.map(function(k){ return '<i style="background:' + t[k] + '"></i>'; }).join('') + '</div>';
      return '<div class="pk-row"><span class="lab">' + label + '</span><input type="color" id="lg-c-' + key + '" value="' + d[key] + '" ' + dis + '><input class="hex" id="lg-h-' + key + '" value="' + d[key] + '" maxlength="7" ' + dis + '>' + ramp + '</div>';
    }
    return '<div style="max-width:680px;">' +
      row('primario', 'Primario') + row('secundario', 'Secundario') + row('terciario', 'Terciario') +
    '</div>';
  }

  function tipoTab(){
    var d = G.draft;
    var fonts = ['Inter', 'Roboto', 'Open Sans', 'Lato', 'Segoe UI', 'System'], sizes = ['13px', '14px', '15px', '16px'];
    return '<div style="max-width:540px;">' +
      '<div class="fgrid g1" style="gap:16px">' +
        buildCustomSelectHtml({ id: 'lg-fp', label: 'Fuente primaria', options: fonts, selectedValue: G.tipo.primaria, required: false }) +
        buildCustomSelectHtml({ id: 'lg-fs', label: 'Fuente secundaria', options: fonts, selectedValue: G.tipo.secundaria, required: false }) +
        buildCustomSelectHtml({ id: 'lg-fb', label: 'Tamaño base', options: sizes, selectedValue: G.tipo.base, required: false }) +
      '</div>' +
    '</div>';
  }

  function botonesTab(){
    var d = G.draft;
    var radii = ['4px', '6px', '8px', '12px', '999px'];
    var styles = ['Relleno', 'Borde', 'Plano'];
    return '<div style="max-width:540px;">' +
      '<div class="fgrid g1" style="gap:16px">' +
        buildCustomSelectHtml({ id: 'lg-b-rad', label: 'Radio de borde', options: radii, selectedValue: d.btnRadius || '6px', required: false }) +
        buildCustomSelectHtml({ id: 'lg-b-sty', label: 'Estilo visual', options: styles, selectedValue: d.btnStyle || 'Relleno', required: false }) +
      '</div>' +
    '</div>';
  }

  function estadosTab(){
    var e = G.estados;
    var dis = window.CURRENT_ROLE === 'Aprobador' ? 'disabled' : '';
    function r(k, label, txt){ return '<div class="pk-row"><span class="lab">' + label + '</span><input type="color" id="lg-e-' + k + '" value="' + e[k] + '" ' + dis + '><input class="hex" id="lg-eh-' + k + '" value="' + e[k] + '" maxlength="7" ' + dis + '><span class="pv-badge" style="background:' + e[k] + ';color:' + txt + '">' + label + '</span></div>'; }
    return '<div style="max-width:680px;">' +
      r('warn', 'Elaboración', '#92400E') + r('info', 'Validado', '#1E40AF') + r('ok', 'Aprobado', '#166534') + r('off', 'Eliminado', '#475569') +
    '</div>';
  }

  function renderDropzone(idPrefix, currentVal, labelText, accept, hintText){
    var fileId = idPrefix + '-file';
    var dragZoneId = idPrefix + '-drag-zone';
    var isAprobador = window.CURRENT_ROLE === 'Aprobador';
    var textDisplay = currentVal ?
      '<span style="color:#06396E;font-weight:600;">✓ ' + esc(currentVal) + '</span>' :
      '<span style="color:#6C6865;font-weight:400;">Ningún archivo seleccionado</span>';

    var btnHtml = isAprobador ?
      '<div style="height:40px;padding:0 16px;background:#E2E8F0;border-radius:8px 0 0 8px;display:inline-flex;align-items:center;justify-content:center;gap:8px;flex-shrink:0;margin:0;color:#64748B;font-size:13.5px;font-weight:600;cursor:not-allowed;">' +
        '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:#64748B;fill:none;stroke-width:2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>' +
        '<span>Solo lectura</span>' +
      '</div>' :
      '<label for="' + fileId + '" onclick="document.getElementById(\'' + fileId + '\').click()" style="position:static !important; top:auto !important; left:auto !important; z-index:1 !important; pointer-events:auto !important; cursor:pointer; height: 40px; padding: 0 16px; background: #06396E; border-radius: 8px 0 0 8px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; flex-shrink: 0; margin: 0;">' +
        '<svg viewBox="0 0 24 24" style="width: 18px; height: 18px; stroke: white; fill: none; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>' +
        '<span style="color: white; font-size: 14px; font-family: Inter; font-weight: 600; line-height: 20px; white-space: nowrap;">Seleccionar archivo</span>' +
      '</label><input type="file" id="' + fileId + '" accept="' + accept + '" style="display:none !important">';

    return '<div style="margin-bottom:14px;width:100%;">' +
      '<div style="font-size:12px;font-weight:600;color:#475569;margin-bottom:6px;display:block;">' + labelText + '</div>' +
      '<div id="' + dragZoneId + '" data-extend="active" data-helper-text="true" data-mode="Forms" style="width: 100%; display: flex; flex-direction: column; gap: 4px;">' +
        '<div style="display: flex; align-items: center; width: 100%; height: 40px;">' +
          btnHtml +
          '<div style="flex: 1; height: 40px; padding: 0 16px; background: ' + (isAprobador ? '#F8FAFC' : 'white') + '; border-radius: 0 8px 8px 0; outline: 1px rgba(32, 32, 32, 0.56) solid; outline-offset: -1px; display: flex; align-items: center; overflow: hidden; margin-left: -1px;">' +
            '<div style="font-size: 14px; font-family: Inter; letter-spacing: 0.02px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">' + textDisplay + '</div>' +
          '</div>' +
        '</div>' +
        '<div style="padding-left: 4px; padding-right: 4px; color: #6C6865; font-size: 12px; font-family: Inter; font-weight: 400; margin-top: 2px;">' + hintText + '</div>' +
      '</div>' +
    '</div>';
  }

  function logotiposTab(){
    var d = G.draft;
    return '<div class="fgrid g2" style="max-width:880px;gap:10px 18px">' +
      renderDropzone('lg-logo', d.logo, 'Logotipo versión clara (Fondo oscuro)', '.png,.svg', 'Formatos permitidos: .png, .svg (máximo de 2 MB)') +
      renderDropzone('lg-logo2', d.logo2, 'Logotipo versión oscura (Fondo claro)', '.png,.svg', 'Formatos permitidos: .png, .svg (máximo de 2 MB)') +
    '</div>';
  }

  function faviconTab(){
    var d = G.draft;
    return '<div class="fgrid g1" style="max-width:460px;gap:10px 18px">' +
      renderDropzone('lg-fav', d.favicon, 'Icono Favicon (.ico / .png)', '.ico,.png', 'Formatos permitidos: .ico, .png (máximo de 2 MB, 32x32 px)') +
    '</div>';
  }

  function editorGeneralCard(){
    var d = G.draft;
    var isAprobador = window.CURRENT_ROLE === 'Aprobador';
    
    var titleField = buildFigmaFieldHtml({
      id: 'lg-title',
      label: 'Título de la solicitud',
      value: d.title || d.name || '',
      placeholder: 'Ej. Actualización de colores e imagen institucional 2026',
      required: !isAprobador,
      readonly: isAprobador,
      helperText: 'El título de la solicitud es obligatorio.'
    });

    var justField = buildFigmaFieldHtml({
      id: 'lg-just',
      label: 'Justificación',
      value: d.justificacion || '',
      placeholder: 'Describa la motivación y sustentación técnica de la propuesta',
      required: !isAprobador,
      readonly: isAprobador,
      isTextarea: true,
      helperText: 'La justificación es obligatoria.'
    });

    return '<div class="card" style="margin-bottom:20px">' +
      '<h3 class="sec-t" style="font-size:13px;font-weight:700;color:#06396E;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:18px;">1. Datos generales de la solicitud</h3>' +
      '<div class="fgrid g1" style="gap:16px">' +
        titleField +
        justField +
        renderDropzone('lg-sustento', d.sustento, 'Documento de sustento (PDF, máx. 10 MB) ' + (isAprobador ? '' : '<span class="req">*</span>'), '.pdf', 'Formatos permitidos: .pdf (máximo de 10 MB)') +
      '</div></div>';
  }

  function editorGraphicCard(){
    var tabs = [
      ['colores', 'Colores', '<svg viewBox="0 0 24 24" style="width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>'],
      ['tipografia', 'Tipografía', '<svg viewBox="0 0 24 24" style="width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:2"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>'],
      ['botones', 'Botones', '<svg viewBox="0 0 24 24" style="width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:2"><rect x="3" y="6" width="18" height="12" rx="6"/></svg>'],
      ['estados', 'Estados', '<svg viewBox="0 0 24 24" style="width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>'],
      ['logotipos', 'Logotipos', '<svg viewBox="0 0 24 24" style="width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>'],
      ['favicon', 'Favicon', '<svg viewBox="0 0 24 24" style="width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>']
    ];

    var tabsHeader = '<div class="lg-tabs">' + tabs.map(function(t){
      return '<button class="lg-tab' + (G.tab === t[0] ? ' active' : '') + '" data-lg="tab" data-tab="' + t[0] + '">' + t[2] + ' <span>' + t[1] + '</span></button>';
    }).join('') + '</div>';

    var tabContent = G.tab === 'colores' ? coloresTab() : G.tab === 'tipografia' ? tipoTab() : G.tab === 'botones' ? botonesTab() : G.tab === 'estados' ? estadosTab() : G.tab === 'logotipos' ? logotiposTab() : faviconTab();

    return '<div class="card" style="margin-bottom:20px">' +
      '<h3 class="sec-t" style="font-size:13px;font-weight:700;color:#06396E;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:18px;">2. Configuración de elementos gráficos</h3>' +
      tabsHeader +
      tabContent +
      '</div>';
  }

  function getEditorHeaderActions(){
    var d = G.draft;
    var isAprobador = window.CURRENT_ROLE === 'Aprobador';
    var simBtn = G.isSimulating ? 
      '<button class="btn gho" data-lg="sim-stop" style="height:42px;padding:10px 18px;border-radius:8px;">Cancelar simulación</button>' :
      '<button class="btn gho" data-lg="sim" style="height:42px;padding:10px 18px;border-radius:8px;display:inline-flex;align-items:center;gap:8px;"><svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg> Ver simulación</button>';

    var actionBtns = '<button class="btn gho" data-lg="cancel" style="height:42px;padding:10px 18px;border-radius:8px;display:inline-flex;align-items:center;gap:8px;"><svg viewBox="0 0 24 24" style="width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg><span>Cancelar</span></button>';
    actionBtns += simBtn;
    if(isAprobador){
      actionBtns += '<button class="btn gho" data-lg="open-version-modal" style="height:42px;padding:10px 18px;border-radius:8px;display:inline-flex;align-items:center;gap:6px"><svg viewBox="0 0 24 24" style="width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:2"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="9"/></svg> Control de versiones</button>';
      if(d.estado === 'Verificado'){
        actionBtns += '<button class="btn gho" data-lg="obs-action" data-id="' + d.id + '" style="height:42px;padding:10px 18px;border-radius:8px;">Observar</button>';
        actionBtns += '<button class="btn gho" data-lg="rej-action" data-id="' + d.id + '" style="height:42px;padding:10px 18px;border-radius:8px;">Rechazar</button>';
        actionBtns += '<button class="btn pri" data-lg="app-action" data-id="' + d.id + '" style="height:42px;padding:10px 18px;background:#16A34A;border-radius:8px;color:white;font-weight:600;">Aprobar</button>';
      } else if((d.estado === 'Aprobada' || d.estado === 'Aprobado' || d.estado === 'Programado') && !d.vigente){
        actionBtns += '<button class="btn pri" data-lg="publish-action" data-id="' + d.id + '" style="height:42px;padding:10px 18px;background:#06396E;border-radius:8px;color:white;font-weight:600;">Publicar</button>';
      }
    } else {
      actionBtns += '<button class="btn pri" data-lg="save" style="height:42px;padding:10px 18px;background:#06396E;border-radius:8px;color:white;font-weight:600;display:inline-flex;align-items:center;gap:8px;"><svg viewBox="0 0 24 24" style="width:18px;height:18px;stroke:white;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg><span>Guardar</span></button>';
    }
    return actionBtns;
  }

  function editorHtml(){
    var d = G.draft;
    var isAprobador = window.CURRENT_ROLE === 'Aprobador';
    var nextNum = d.correlativo || (String(G.seq).padStart(4,'0') + '');

    var obsAlert = d.estado === 'Observado' ? 
      '<div id="lg-obs-alert-banner" style="background:#FFE4E6;border-radius:10px;padding:12px 18px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;gap:14px;color:#781113">' +
        '<div style="display:flex;align-items:center;gap:12px">' +
          '<svg viewBox="0 0 24 24" style="width:20px;height:20px;stroke:#781113;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>' +
          '<span style="font-size:13.5px;font-weight:500;color:#781113">Modo Subsanación · Solicitud N° ' + nextNum + ' Observada</span>' +
        '</div>' +
        '<div style="display:flex;align-items:center;gap:12px">' +
          '<button class="btn gho" data-lg="obs-detail" data-id="' + d.id + '" style="padding:5px 14px;font-size:12.5px;background:#fff;border:1px solid #FECDD3;color:#781113;font-weight:600;border-radius:8px">Ver detalle</button>' +
          '<button onclick="document.getElementById(\'lg-obs-alert-banner\').remove()" style="background:none;border:0;color:#781113;font-size:18px;line-height:1;cursor:pointer;padding:2px 4px;opacity:0.85" title="Cerrar">&times;</button>' +
        '</div>' +
      '</div>' : '';

    var titleText = isAprobador ? 'EVALUAR SOLICITUD' : (G.mode === 'edit' ? 'EDITAR SOLICITUD' : 'REGISTRAR SOLICITUD');

    var infoCard = '<div class="card" style="margin-bottom:20px;padding:16px 20px;">' +
      '<div style="font-size:13px;font-weight:700;color:#06396E;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">' + titleText + '</div>' +
      '<div style="font-size:13px;color:#64748B;display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
        '<span>Estado actual:</span>' +
        stBadge(d.estado) +
        '<span style="color:#CBD5E1;margin:0 2px;">·</span>' +
        '<span style="color:#475569;">Código <b style="color:#1E293B;">' + nextNum + '</b></span>' +
      '</div>' +
    '</div>';

    return obsAlert + infoCard + editorGeneralCard() + editorGraphicCard();
  }

  function stBadge(st){
    var m = {
      'Elaboración': 'b-off',
      'Validado': 'b-info',
      'Verificado': 'b-info',
      'Programado': 'b-info',
      'Aprobado': 'b-ok',
      'Aprobada': 'b-ok',
      'Publicado': 'b-ok',
      'Publicada': 'b-ok',
      'Vigente': 'b-ok',
      'Observado': 'b-warn',
      'Rechazado': 'b-danger',
      'Eliminado': 'b-off'
    };
    return '<span class="badge ' + (m[st] || 'b-off') + '">' + esc(st) + '</span>';
  }

  function coloresListHtml(){
    var isAprobador = window.CURRENT_ROLE === 'Aprobador';
    G.selected = G.selected || [];
    var selCount = G.selected.length;
    var totalDeletable = G.palettes.filter(function(x){ return !x.vigente && (x.estado === 'Elaboración' || x.estado === 'Observado'); }).length;

    var actionHeaderBtns = '';
    var roleBanner = '';

    if(isAprobador){
      actionHeaderBtns = '<button class="btn gho" data-lg="open-version-modal" style="height:42px;padding:10px 18px;border-radius:8px;display:inline-flex;align-items:center;gap:6px"><svg viewBox="0 0 24 24" style="width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:2"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="9"/></svg> Control de versiones</button>';
      roleBanner = '';
    } else {
      var bulkVerifyBtn = '<button class="btn gho" data-lg="bulk-verify" ' + (selCount > 0 ? '' : 'disabled') + ' style="height:42px;padding:10px 18px;border-radius:8px;color:' + (selCount > 0 ? '#0369A1' : 'var(--ink3)') + ';border-color:' + (selCount > 0 ? '#BAE6FD' : 'var(--line2)') + ';background:' + (selCount > 0 ? '#F0F9FF' : 'none') + ';display:inline-flex;align-items:center;gap:8px;"><svg viewBox="0 0 24 24" style="width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg> Verificar ' + (selCount > 0 ? '(' + selCount + ')' : '') + '</button>';
      var bulkDelBtn = '<button class="btn gho" data-lg="bulk-del" ' + (selCount > 0 ? '' : 'disabled') + ' style="height:42px;padding:10px 18px;border-radius:8px;color:' + (selCount > 0 ? '#D51317' : 'var(--ink3)') + ';border-color:' + (selCount > 0 ? '#FCA5A5' : 'var(--line2)') + ';display:inline-flex;align-items:center;gap:8px;"><svg viewBox="0 0 24 24" style="width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg> Eliminar ' + (selCount > 0 ? '(' + selCount + ')' : '') + '</button>';
      actionHeaderBtns = bulkVerifyBtn + bulkDelBtn + '<button class="btn pri" data-lg="new" style="height:42px;padding:10px 18px;background:#06396E;border-radius:8px;color:white;font-weight:600;display:inline-flex;align-items:center;gap:8px;"><svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:white;fill:none;stroke-width:2.2"><path d="M12 5v14M5 12h14"/></svg> Registrar solicitud</button>';
    }

    var topBox = document.getElementById('lg-top-header-actions');
    if(topBox) topBox.innerHTML = actionHeaderBtns;

    var query = (G.searchQuery || '').toLowerCase().trim();
    var filteredPalettes = G.palettes.filter(function(p){
      if(!query) return true;
      var t = (p.title || '').toLowerCase();
      var j = (p.justificacion || '').toLowerCase();
      var c = (p.correlativo || '').toLowerCase();
      return t.indexOf(query) !== -1 || j.indexOf(query) !== -1 || c.indexOf(query) !== -1;
    });

    var rows = filteredPalettes.map(paletteRow).join('');
    if(!rows){
      rows = '<tr><td colspan="7" style="text-align:center;padding:32px;color:#64748B;">No se encontraron solicitudes que coincidan con la búsqueda.</td></tr>';
    }

    var thTools = '<div class="th-icons"><svg viewBox="0 0 24 24"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg></div>';

    var searchInput = '<div class="search" style="flex:1;"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"></circle><path d="M21 21l-4.3-4.3"></path></svg><input id="lg-search-input" placeholder="Buscar por título, justificación o correlativo..." style="width:100%;padding:10px 14px 10px 40px;border:1px solid #CBD5E1;border-radius:8px;" value="' + esc(G.searchQuery || '') + '"></div>';

    var paginationFooter = '<div style="padding:16px 20px;border-top:1px solid #E2E8F0;display:flex;align-items:center;justify-content:space-between;color:#64748B;font-size:13px;flex-wrap:wrap;gap:12px;">' +
      '<div style="display:flex;align-items:center;gap:12px;">' +
        '<span>Mostrando 1-' + filteredPalettes.length + ' de ' + filteredPalettes.length + '</span>' +
        '<span style="display:inline-flex;align-items:center;gap:6px;">Filas por página: <select style="padding:4px 8px;border:1px solid #CBD5E1;border-radius:6px;font-size:13px;"><option>10</option></select></span>' +
      '</div>' +
      '<div style="display:flex;align-items:center;gap:6px;">' +
        '<button class="btn gho" style="padding:4px 8px;font-size:12px;border:1px solid #E2E8F0;border-radius:4px;color:#64748B;background:#fff;" disabled>&laquo;</button>' +
        '<button class="btn gho" style="padding:4px 8px;font-size:12px;border:1px solid #E2E8F0;border-radius:4px;color:#64748B;background:#fff;" disabled>&lt;</button>' +
        '<button class="btn pri" style="padding:4px 10px;font-size:12px;background:#06396E;color:#fff;border-radius:4px;font-weight:700;">1</button>' +
        '<button class="btn gho" style="padding:4px 8px;font-size:12px;border:1px solid #E2E8F0;border-radius:4px;color:#64748B;background:#fff;" disabled>&gt;</button>' +
        '<button class="btn gho" style="padding:4px 8px;font-size:12px;border:1px solid #E2E8F0;border-radius:4px;color:#64748B;background:#fff;" disabled>&raquo;</button>' +
        '<span style="display:inline-flex;align-items:center;gap:6px;margin-left:8px;">Ir a <select style="padding:4px 8px;border:1px solid #CBD5E1;border-radius:6px;font-size:13px;"><option>1</option></select></span>' +
      '</div>' +
    '</div>';

    return '<div class="card" style="padding:20px 20px 16px;">' +
      '<div class="tools" style="margin-bottom:20px;">' +
        searchInput +
      '</div>' +
      roleBanner +
      '<div class="tw" style="border:1px solid rgba(32,32,32,0.12);border-radius:4px;overflow:hidden;margin-bottom:16px;"><table style="min-width:100%;">' +
        '<thead><tr>' +
          '<th style="width:36px"><input type="checkbox" class="chk" data-lg-chk-all ' + (selCount > 0 && selCount === totalDeletable ? 'checked' : '') + ' ' + (isAprobador ? 'disabled' : '') + '></th>' +
          '<th><div class="th-cell"><span class="th-title">TÍTULO DE LA SOLICITUD</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"></path></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg></div></div></th>' +
          '<th><div class="th-cell"><span class="th-title">JUSTIFICACIÓN</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"></path></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg></div></div></th>' +
          '<th><div class="th-cell"><span class="th-title">ESTADO</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"></path></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg></div></div></th>' +
          '<th><div class="th-cell"><span class="th-title">SUSTENTO</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"></path></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg></div></div></th>' +
          '<th><div class="th-cell"><span class="th-title">FECHA DE REGISTRO</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"></path></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg></div></div></th>' +
          '<th style="text-align:right"><div class="th-cell" style="justify-content:flex-end"><span class="th-title">ACCIONES</span></div></th>' +
        '</tr></thead>' +
        '<tbody>' + rows + '</tbody>' +
      '</table></div>' +
    '</div>';
  }

  function renderLinea(){
    var m = document.getElementById('linea-mount'); if(!m) return;
    if(G.draft){
      var topBox = document.getElementById('lg-top-header-actions');
      if(topBox) topBox.innerHTML = getEditorHeaderActions();
    }
    var body = G.draft ? editorHtml() : coloresListHtml();
    m.innerHTML = body;
    bindInputs();
  }

  function bindDropzone(idPrefix, propKey, labelText, maxMb, allowedExts){
    var inputEl = document.getElementById(idPrefix + '-file');
    var dz = document.getElementById(idPrefix + '-drag-zone');

    function processFile(f){
      if(!f) return;
      if(f.size > maxMb * 1024 * 1024){ toast(labelText + ' excede el tamaño máximo de ' + maxMb + ' MB.', 'err'); return; }
      var ext = '.' + f.name.split('.').pop().toLowerCase();
      if(allowedExts.indexOf(ext) === -1){ toast(labelText + ' debe tener formato ' + allowedExts.join(', ') + '.', 'err'); return; }
      G.draft[propKey] = f.name;
      renderLinea();
      toast(labelText + ' adjuntado: <b>' + esc(f.name) + '</b>', 'ok');
    }

    if(inputEl){
      inputEl.addEventListener('change', function(){
        if(inputEl.files && inputEl.files[0]) processFile(inputEl.files[0]);
      });
    }

    if(dz){
      ['dragenter', 'dragover'].forEach(function(evt){
        dz.addEventListener(evt, function(e){ e.preventDefault(); e.stopPropagation(); dz.style.borderColor = '#06396E'; dz.style.backgroundColor = '#EFF6FF'; });
      });
      ['dragleave', 'drop'].forEach(function(evt){
        dz.addEventListener(evt, function(e){ e.preventDefault(); e.stopPropagation(); dz.style.borderColor = '#9CA3AF'; dz.style.backgroundColor = '#FAFAFA'; });
      });
      dz.addEventListener('drop', function(e){
        var dt = e.dataTransfer;
        if(dt && dt.files && dt.files[0]){ processFile(dt.files[0]); }
      });
    }
  }

  function bindInputs(){
    var searchInp = document.getElementById('lg-search-input');
    if(searchInp){
      searchInp.addEventListener('input', function(){
        G.searchQuery = searchInp.value;
        renderLinea();
        var r = document.getElementById('lg-search-input');
        if(r){ r.focus(); r.setSelectionRange(r.value.length, r.value.length); }
      });
    }
    if(!G.draft) return;

    function liveSim(){
      if(G.isSimulating) applyTheme(G.draft);
    }

    ['primario', 'secundario', 'terciario'].forEach(function(key){
      var c = document.getElementById('lg-c-' + key), h = document.getElementById('lg-h-' + key);
      if(c){
        c.addEventListener('input', function(){ if(h) h.value = c.value; G.draft[key] = c.value; liveSim(); });
        c.addEventListener('change', function(){ G.draft[key] = c.value; renderLinea(); liveSim(); });
      }
      if(h){
        h.addEventListener('change', function(){
          var v = h.value.trim();
          if(v[0] !== '#') v = '#' + v;
          if(/^#[0-9a-fA-F]{6}$/.test(v)){ G.draft[key] = v; renderLinea(); liveSim(); }
          else { h.value = G.draft[key]; toast('Color HEX no válido (ej. #072B4D).', 'err'); }
        });
      }
    });
    var titleInp = document.getElementById('lg-title'); if(titleInp) titleInp.addEventListener('change', function(){ if(G.draft) G.draft.title = titleInp.value; });
    var justInp = document.getElementById('lg-just'); if(justInp) justInp.addEventListener('change', function(){ if(G.draft) G.draft.justificacion = justInp.value; });

    var fp = document.getElementById('lg-fp'), fs = document.getElementById('lg-fs'), fb = document.getElementById('lg-fb');
    if(fp){ ['change', 'input'].forEach(function(evt){ fp.addEventListener(evt, function(){ G.tipo.primaria = fp.value; liveSim(); }); }); }
    if(fs){ ['change', 'input'].forEach(function(evt){ fs.addEventListener(evt, function(){ G.tipo.secundaria = fs.value; liveSim(); }); }); }
    if(fb){ ['change', 'input'].forEach(function(evt){ fb.addEventListener(evt, function(){ G.tipo.base = fb.value; liveSim(); }); }); }

    var br = document.getElementById('lg-b-rad');
    if(br){ ['change', 'input'].forEach(function(evt){ br.addEventListener(evt, function(){ if(G.draft) G.draft.btnRadius = br.value; liveSim(); }); }); }
    var bs = document.getElementById('lg-b-sty');
    if(bs){ ['change', 'input'].forEach(function(evt){ bs.addEventListener(evt, function(){ if(G.draft) G.draft.btnStyle = bs.value; liveSim(); }); }); }

    ['warn', 'info', 'ok', 'off'].forEach(function(k){
      var c = document.getElementById('lg-e-' + k), h = document.getElementById('lg-eh-' + k);
      if(c){
        c.addEventListener('input', function(){ if(h) h.value = c.value; G.estados[k] = c.value; });
        c.addEventListener('change', function(){ G.estados[k] = c.value; renderLinea(); });
      }
      if(h){
        h.addEventListener('change', function(){
          var v = h.value.trim();
          if(v[0] !== '#') v = '#' + v;
          if(/^#[0-9a-fA-F]{6}$/.test(v)){ G.estados[k] = v; renderLinea(); }
          else { h.value = G.estados[k]; toast('Color HEX no válido.', 'err'); }
        });
      }
    });

    bindDropzone('lg-sustento', 'sustento', 'Documento de sustento', 10, ['.pdf']);
    bindDropzone('lg-logo', 'logo', 'Logotipo versión clara', 2, ['.png', '.svg']);
    bindDropzone('lg-logo2', 'logo2', 'Logotipo versión oscura', 2, ['.png', '.svg']);
    bindDropzone('lg-fav', 'favicon', 'Icono Favicon', 2, ['.ico', '.png']);
  }

  function newDraft(){
    G.mode = 'create'; G.origId = null; G.tab = 'colores';
    G.draft = {
      id: uid(),
      correlativo: '',
      title: '',
      justificacion: '',
      sustento: '',
      primario: '#06396E',
      secundario: '#2C63B0',
      terciario: '#D51317',
      btnRadius: '6px',
      btnStyle: 'Relleno',
      estado: 'Elaboración',
      vigente: false,
      fecha: today()
    };
    renderLinea();
  }

  function editP(id){
    var p = find(id); if(!p) return;
    if(window.CURRENT_ROLE !== 'Aprobador' && p.estado !== 'Elaboración' && p.estado !== 'Observado'){
      toast('Solo se pueden modificar solicitudes en estado Elaboración u Observado.', 'err');
      return;
    }
    G.mode = 'edit'; G.origId = id; G.tab = 'colores';
    G.draft = JSON.parse(JSON.stringify(p));
    renderLinea();
  }

  function saveP(){
    var d = G.draft; if(!d) return;
    var tInp = document.getElementById('lg-title'), jInp = document.getElementById('lg-just');
    if(tInp) d.title = tInp.value.trim();
    if(jInp) d.justificacion = jInp.value.trim();

    var hasErr = false;
    var wTitle = document.getElementById('wrap-lg-title');
    if(!d.title){
      if(wTitle) wTitle.classList.add('is-error');
      hasErr = true;
    } else if(wTitle) {
      wTitle.classList.remove('is-error');
    }

    var wJust = document.getElementById('wrap-lg-just');
    if(!d.justificacion){
      if(wJust) wJust.classList.add('is-error');
      hasErr = true;
    } else if(wJust) {
      wJust.classList.remove('is-error');
    }

    if(hasErr){ toast('Complete los campos obligatorios del formulario.', 'err'); return; }
    if(!d.sustento){ toast('Debe adjuntar el documento de sustento en formato PDF (máx. 10 MB).', 'err'); return; }

    if(G.mode === 'edit'){
      var wasObs = d.estado === 'Observado';
      d.estado = 'Elaboración';
      for(var i = 0; i < G.palettes.length; i++){
        if(G.palettes[i].id === G.origId){
          G.palettes[i] = JSON.parse(JSON.stringify(d));
          break;
        }
      }
      if(wasObs){
        toast('Solicitud N° <b>' + d.correlativo + '</b> subsanada correctamente en estado <b>Elaboración</b>.', 'ok');
      } else {
        toast('Solicitud N° <b>' + d.correlativo + '</b> actualizada con éxito.', 'ok');
      }
    } else {
      var num = String(G.seq++).padStart(4, '0');
      d.correlativo = num;
      d.estado = 'Elaboración';
      d.fecha = today();
      G.palettes.unshift(d);
      toast('Solicitud N° <b>' + num + '</b> registrada en estado <b>Elaboración</b>.', 'ok');
    }
    if(G.isSimulating) detenerSimulacion(true);
    G.draft = null; G.tab = 'colores'; renderLinea();
  }

  function delP(id){
    var p = find(id); if(!p) return;
    if(p.estado === 'Eliminado'){ toast('El registro ya se encuentra en estado Eliminado.', 'info'); return; }
    if(p.vigente || (p.estado !== 'Elaboración' && p.estado !== 'Observado')){
      toast('Solo se pueden eliminar solicitudes en estado Elaboración u Observado.', 'err');
      return;
    }
    var html = '<div style="display:flex;flex-direction:column;gap:16px;padding:4px 0;">' +
      '<div style="display:flex;align-items:center;gap:12px;">' +
        '<div style="width:40px;height:40px;padding:8px;background:#FFDBD7;border-radius:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
          '<svg viewBox="0 0 24 24" style="width:20px;height:20px;stroke:#490005;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg>' +
        '</div>' +
        '<div style="color:#252220;font-size:18px;font-family:Inter,sans-serif;font-weight:600;line-height:24px;">¿Eliminar la solicitud ' + esc(p.correlativo ? 'N° ' + p.correlativo : '') + '?</div>' +
      '</div>' +
      '<div style="color:#252220;font-size:16px;font-family:Inter,sans-serif;font-weight:400;line-height:24px;padding-left:4px;padding-right:4px;">' +
        'Esta acción es una baja lógica irreversible. Se perderá la solicitud <b>' + esc(p.title || p.name) + '</b> y el registro pasará a estado "Eliminado" en el historial.' +
      '</div>' +
    '</div>';

    modal(html, function(){
      p.estado = 'Eliminado';
      p.vigente = false;
      p.fecha = today();
      G.selected = G.selected.filter(function(x){ return x !== id; });
      renderLinea();
      toast('La eliminación es irreversible; el registro pasa a estado Eliminado.', 'info');
      return true;
    }, 'Eliminar');
  }

  function bulkDelP(){
    if(!G.selected || G.selected.length === 0){
      toast('Seleccione al menos una solicitud en estado Elaboración u Observado para eliminar.', 'info');
      return;
    }
    var validSelected = G.selected.filter(function(id){
      var p = find(id);
      return p && !p.vigente && (p.estado === 'Elaboración' || p.estado === 'Observado');
    });

    if(validSelected.length === 0){
      toast('La eliminación solo está permitida para registros en estado Elaboración u Observado.', 'err');
      return;
    }

    var count = validSelected.length;
    var html = '<div style="display:flex;flex-direction:column;gap:16px;padding:4px 0;">' +
      '<div style="display:flex;align-items:center;gap:12px;">' +
        '<div style="width:40px;height:40px;padding:8px;background:#FFDBD7;border-radius:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
          '<svg viewBox="0 0 24 24" style="width:20px;height:20px;stroke:#490005;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg>' +
        '</div>' +
        '<div style="color:#252220;font-size:18px;font-family:Inter,sans-serif;font-weight:600;line-height:24px;">¿Eliminar las ' + count + ' solicitudes seleccionadas?</div>' +
      '</div>' +
      '<div style="color:#252220;font-size:16px;font-family:Inter,sans-serif;font-weight:400;line-height:24px;padding-left:4px;padding-right:4px;">' +
        'Esta acción es una baja lógica irreversible. Las <b>' + count + ' solicitudes</b> seleccionadas pasarán a estado "Eliminado" en el historial.' +
      '</div>' +
    '</div>';

    modal(html, function(){
      validSelected.forEach(function(id){
        var p = find(id);
        if(p){ p.estado = 'Eliminado'; p.vigente = false; p.fecha = today(); }
      });
      G.selected = G.selected.filter(function(x){ return validSelected.indexOf(x) === -1; });
      renderLinea();
      toast('Eliminación múltiple realizada con éxito; las ' + count + ' solicitudes seleccionadas pasan a estado Eliminado.', 'info');
      return true;
    }, 'Eliminar');
  }

  function applyVigente(id){
    var p = find(id); if(!p) return;
    if(p.estado !== 'Aprobada' && p.estado !== 'Aprobado'){ toast('Solo puede aplicarse una propuesta Aprobada (RN-007).', 'err'); return; }
    G.palettes.forEach(function(x){ x.vigente = false; }); p.vigente = true; applyTheme(p);
    toast('RN-020/021 · Solicitud N° <b>' + (p.correlativo || '—') + '</b> aplicada como <b>vigente</b>. El Escritorio Virtual y todo el SIIT usan ahora esta línea gráfica.', 'ok');
  }

  function simular(){
    if(!G.draft) return;
    G.isSimulating = true;
    applyTheme(G.draft);
    renderLinea();
    toast('<b>Modo Simulación Activo:</b> Previsualizando la propuesta en todo el SIIT en tiempo real. Usa <b>Detener simulación</b> para restablecer la vista.', 'info');
  }

  function detenerSimulacion(silent){
    G.isSimulating = false;
    var styleEl = document.getElementById('lg-simulation-style');
    if(styleEl) styleEl.remove();
    var vig = G.palettes.filter(function(x){ return x.vigente; })[0];
    if(vig) applyTheme(vig);
    if(!silent){
      renderLinea();
      toast('Se restableció la línea gráfica oficial vigente.', 'info');
    }
  }

  function showObsModal(id){
    var p = find(id); if(!p) return;
    var html = '<h3 style="margin:0 0 4px;font-size:17px;color:#06396E">Informe de Observación · Solicitud N° ' + (p.correlativo || '') + '</h3>' +
      '<p style="margin:4px 0 18px;font-size:12.5px;color:#64748B">' + esc(p.title || '') + '</p>' +
      '<div style="display:flex;flex-direction:column;gap:14px">' +
        '<div style="display:flex;gap:18px;font-size:12.5px;color:#4B5563;background:#F9FAFA;padding:10px 14px;border-radius:6px;border:1px solid #E5E7EB">' +
          '<div><b>Observado por:</b> ' + esc(p.obsAutor || 'Comité de Calidad SIIT') + '</div>' +
          '<div><b>Fecha:</b> ' + esc(p.obsFecha || p.fecha) + '</div>' +
        '</div>' +
        '<div class="f full"><label style="display:block;font-size:11.5px;font-weight:700;color:#374151;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.04em">Motivo Técnico de Observación:</label>' +
          '<div style="background:#FFF5F5;border:1px solid #FECACA;border-radius:8px;padding:14px;font-size:13.5px;color:#7F1D1D;line-height:1.5">' +
            esc(p.observacion || 'Sin detalle especificado.') +
          '</div>' +
        '</div>' +
      '</div>';
    modal(html, function(){ return true; });
  }


  function verifyP(id){
    var p = find(id); if(!p) return;
    if(p.estado !== 'Elaboración'){
      toast('Solo se pueden verificar solicitudes en estado "Elaboración".', 'err');
      return;
    }

    var errors = [];
    if(!p.title || p.title.trim().length < 5) errors.push('Título de solicitud incompleto (mínimo 5 caracteres).');
    if(!p.justificacion || p.justificacion.trim().length < 10) errors.push('Justificación técnica insuficiente (mínimo 10 caracteres).');
    if(!p.sustento) errors.push('Falta adjuntar el documento de sustento en formato PDF.');
    if(p.title && p.title.indexOf('Inconsistente') !== -1) errors.push('Inconsistencia cromática: El contraste de color secundario no cumple con WCAG 2.1 AA.');

    if(errors.length > 0){
      toast('<b>Verificación de consistencia fallida:</b><br>• ' + errors.join('<br>• ') + '<br><i>La solicitud permanece en estado "Elaboración" para su corrección.</i>', 'err');
      return;
    }

    p.estado = 'Verificado';
    p.auditLog = (p.auditLog || []).concat([{ action: 'Verificación de Consistencia', user: 'Rol Creador', date: today() }]);
    renderLinea();
    toast('Solicitud ' + (p.correlativo ? 'N° <b>' + p.correlativo + '</b> ' : '') + 'verificada con éxito.<br>Se ha generado una alerta de pendiente para el Rol Aprobador.', 'ok');
  }

  function bulkVerifyP(){
    if(!G.selected || G.selected.length === 0){ toast('Seleccione al menos una solicitud en estado Elaboración para verificar.', 'info'); return; }

    var validItems = [], invalidItems = [];
    G.selected.forEach(function(id){
      var p = find(id);
      if(p){
        if(p.estado !== 'Elaboración') invalidItems.push(p);
        else validItems.push(p);
      }
    });

    if(invalidItems.length > 0 && validItems.length === 0){
      toast('Solo se pueden verificar solicitudes en estado "Elaboración".', 'err');
      return;
    }

    var successCount = 0, failedCount = 0;
    validItems.forEach(function(p){
      var errors = [];
      if(!p.title || p.title.trim().length < 5) errors.push('Título incompleto');
      if(!p.justificacion || p.justificacion.trim().length < 10) errors.push('Justificación insuficiente');
      if(!p.sustento) errors.push('Falta sustento PDF');

      if(errors.length === 0){
        p.estado = 'Verificado';
        p.auditLog = (p.auditLog || []).concat([{ action: 'Verificación Masiva', user: 'Rol Creador', date: today() }]);
        successCount++;
      } else { failedCount++; }
    });

    G.selected = [];
    renderLinea();

    if(failedCount > 0){
      toast('<b>Verificación múltiple procesada:</b><br>• ' + successCount + ' solicitud(es) pasaron a estado "Verificado".<br>• ' + failedCount + ' permanece(n) en "Elaboración" por inconsistencias.', 'warn');
    } else {
      toast('<b>' + successCount + ' solicitud(es) verificada(s) con éxito.</b><br>Se han generado las alertas de pendientes para el Rol Aprobador.', 'ok');
    }
  }

  function showObservarModalLG(id){
    var p = find(id); if(!p) return;
    if(p.estado !== 'Verificado'){ toast('El Rol Aprobador solo evalúa solicitudes en estado "Verificado".', 'err'); return; }

    var html = '<h3 style="margin:0 0 4px;font-size:17px;color:#06396E">Observar Solicitud N° ' + (p.correlativo || '') + '</h3>' +
      '<p style="margin:4px 0 14px;font-size:12.5px;color:#64748B">' + esc(p.title || '') + '</p>' +
      '<div class="fgrid g1" style="gap:0;margin-bottom:0">' +
        '<div class="f full" style="margin-bottom:0"><label>Motivo Técnico de Observación <span class="req">*</span></label>' +
          '<textarea id="m-obs-motivo" style="min-height:72px;height:80px;padding:10px;font:inherit;font-size:13px;margin-bottom:0" placeholder="Describa las correcciones que debe realizar el Rol Creador..."></textarea>' +
        '</div>' +
      '</div>';

    modal(html, function(){
      var el = document.getElementById('m-obs-motivo');
      var txt = el ? el.value.trim() : '';
      if(!txt){ toast('El motivo de la observación es obligatorio.', 'err'); return false; }
      p.estado = 'Observado';
      p.observacion = txt;
      p.obsAutor = 'Rol Aprobador';
      p.obsFecha = today();
      p.auditLog = (p.auditLog || []).concat([{ action: 'Observado por Aprobador', user: 'Rol Aprobador', date: today() }]);
      G.draft = null;
      renderLinea();
      toast('Solicitud ' + (p.correlativo ? 'N° <b>' + p.correlativo + '</b> ' : '') + 'marcada como <b>Observada</b>.', 'warn');
      return true;
    });
  }

  function showRechazarModalLG(id){
    var p = find(id); if(!p) return;
    if(p.estado !== 'Verificado'){ toast('El Rol Aprobador solo evalúa solicitudes en estado "Verificado".', 'err'); return; }

    var html = '<h3 style="margin:0 0 4px;font-size:17px;color:#06396E">Rechazar Solicitud N° ' + (p.correlativo || '') + '</h3>' +
      '<p style="margin:4px 0 14px;font-size:12.5px;color:#64748B">' + esc(p.title || '') + '</p>' +
      '<div class="fgrid g1" style="gap:0;margin-bottom:0">' +
        '<div class="f full" style="margin-bottom:0"><label>Motivo Técnico del Rechazo (No subsanable) <span class="req">*</span></label>' +
          '<textarea id="m-rej-motivo" style="min-height:72px;height:80px;padding:10px;font:inherit;font-size:13px;margin-bottom:0" placeholder="Indique la justificación técnica por la cual la propuesta no es viable..."></textarea>' +
        '</div>' +
      '</div>';

    modal(html, function(){
      var el = document.getElementById('m-rej-motivo');
      var txt = el ? el.value.trim() : '';
      if(!txt){ toast('El motivo del rechazo es obligatorio.', 'err'); return false; }
      p.estado = 'Rechazado';
      p.rechazoMotivo = txt;
      p.rechazoAutor = 'Rol Aprobador';
      p.rechazoFecha = today();
      p.auditLog = (p.auditLog || []).concat([{ action: 'Rechazado por Aprobador', user: 'Rol Aprobador', date: today() }]);
      G.draft = null;
      renderLinea();
      toast('Solicitud ' + (p.correlativo ? 'N° <b>' + p.correlativo + '</b> ' : '') + '<b>Rechazada</b> de forma definitiva.', 'err');
      return true;
    });
  }

  function doApproveLG(id){
    var p = find(id); if(!p) return;
    if(p.estado !== 'Verificado' && p.estado !== 'Aprobada' && p.estado !== 'Aprobado'){
      toast('Solo pueden evaluarse solicitudes en estado Verificado.', 'err');
      return;
    }
    var html = '<div style="display:flex;flex-direction:column;gap:16px;padding:4px 0;">' +
      '<div style="display:flex;align-items:center;gap:12px;">' +
        '<div style="width:40px;height:40px;padding:8px;background:#D7F5E8;border-radius:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
          '<svg viewBox="0 0 24 24" style="width:20px;height:20px;stroke:#004C37;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><polyline points="9 14 11 16 15 12"/></svg>' +
        '</div>' +
        '<div style="color:#252220;font-size:18px;font-family:Inter,sans-serif;font-weight:600;line-height:24px;">¿Aprobar la solicitud ' + esc(p.correlativo ? 'N° ' + p.correlativo : '') + '?</div>' +
      '</div>' +
      '<div style="color:#252220;font-size:16px;font-family:Inter,sans-serif;font-weight:400;line-height:24px;padding-left:4px;padding-right:4px;">' +
        'Seleccione la modalidad de aprobación para <b>' + esc(p.title || p.name) + '</b>.' +
      '</div>' +
    '</div>';

    modal(html, function(){
      p.estado = 'Aprobada';
      p.auditLog = (p.auditLog || []).concat([{ action: 'Aprobación por Aprobador', user: 'Rol Aprobador', date: today() }]);
      G.draft = null;
      renderLinea();
      toast('Solicitud N° <b>' + (p.correlativo || '') + '</b> aprobada con éxito.', 'ok');
      return true;
    }, 'Aprobar');
  }

  function showPublishModalLG(id){
    var p = find(id); if(!p) return;
    if(p.estado !== 'Aprobada' && p.estado !== 'Aprobado' && p.estado !== 'Programado'){ toast('RN-LG-008 · El sistema solo permite publicar solicitudes en estado "Aprobado".', 'err'); return; }

    var defaultDate = '2026-08-25';
    var defaultTime = '09:00';

    var html = '<h3 style="margin:0 0 4px;font-size:17px;color:#06396E">Programar Publicación de Línea Gráfica</h3>' +
      '<p style="margin:4px 0 16px;font-size:12.5px;color:#64748B">Solicitud N° ' + (p.correlativo || '') + ' — ' + esc(p.title || '') + '</p>' +
      '<div style="display:flex;flex-direction:column;gap:12px;margin-bottom:14px">' +
        '<div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:8px;padding:12px 14px">' +
          '<label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-weight:700;color:#06396E;font-size:13.5px">' +
            '<input type="radio" name="lg-pub-mode" id="pub-mode-now" value="inmediata" checked onclick="document.getElementById(\'lg-sched-box\').style.display=\'none\'">' +
            '<span>Publicación Inmediata</span>' +
          '</label>' +
          '<div style="font-size:12px;color:#475569;margin-left:24px;margin-top:3px">Publica la solicitud en este instante, genera versión y la establece como la única vigente.</div>' +
        '</div>' +
        '<div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:8px;padding:12px 14px">' +
          '<label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-weight:700;color:#06396E;font-size:13.5px">' +
            '<input type="radio" name="lg-pub-mode" id="pub-mode-sched" value="programada" onclick="document.getElementById(\'lg-sched-box\').style.display=\'block\'">' +
            '<span>Publicación Programada</span>' +
          '</label>' +
          '<div style="font-size:12px;color:#475569;margin-left:24px;margin-top:3px">Programa la fecha y hora exacta de vigencia.</div>' +
          '<div id="lg-sched-box" style="display:none;margin-top:12px;margin-left:24px;padding-top:10px;border-top:1px dashed #CBD5E1">' +
            '<div class="fgrid g2" style="gap:12px">' +
              '<div class="f"><label>Fecha de vigencia <span class="req">*</span></label><input type="date" id="lg-pub-date" value="' + defaultDate + '"></div>' +
              '<div class="f"><label>Hora de vigencia <span class="req">*</span></label><input type="time" id="lg-pub-time" value="' + defaultTime + '"></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    modal(html, function(){
      var isNow = document.getElementById('pub-mode-now') && document.getElementById('pub-mode-now').checked;
      var dateInp = document.getElementById('lg-pub-date');
      var timeInp = document.getElementById('lg-pub-time');

      if(!isNow){
        if(!dateInp || !dateInp.value || !timeInp || !timeInp.value){ toast('RN-LG-008 · Debe ingresar fecha y hora de publicación.', 'err'); return false; }
      }

      if(isNow){
        var maxVer = 1.0;
        G.palettes.forEach(function(x){
          if(x.version){
            var v = parseFloat(x.version.replace('v',''));
            if(!isNaN(v) && v >= maxVer) maxVer = v + 1.0;
          }
        });
        var versionStr = 'v' + maxVer.toFixed(1);

        p.estado = 'Publicado';
        p.version = versionStr;
        p.fechaPublicacion = today();
        p.fechaProgramada = null;
        G.palettes.forEach(function(x){ x.vigente = false; });
        p.vigente = true;
        applyTheme(p);
        G.draft = null;
        renderLinea();
        toast('📢 <b>RN-LG-008 · Solicitud N° ' + (p.correlativo || '') + ' Publicada con éxito (' + versionStr + ').</b>', 'ok');
      } else {
        var dParts = dateInp.value.split('-');
        var formattedDate = (dParts.length === 3 ? dParts[2] + '/' + dParts[1] + '/' + dParts[0] : dateInp.value);
        var fullSchedStr = formattedDate + ' ' + timeInp.value;
        p.estado = 'Programado';
        p.fechaProgramada = fullSchedStr;
        G.draft = null;
        renderLinea();
        toast('<b>RN-LG-008 · Solicitud N° ' + (p.correlativo || '') + ' Programada para el ' + fullSchedStr + '.</b>', 'info');
      }
      return true;
    });
  }

  function showRestoreModalLG(id){
    var p = find(id); if(!p) return;
    if(p.vigente){ toast('RN-LG-009 · El sistema no permite restaurar la versión que ya se encuentra vigente.', 'err'); return; }

    var defaultDate = '2026-08-26';
    var defaultTime = '10:00';

    var html = '<h3 style="margin:0 0 4px;font-size:17px;color:#06396E">Restaurar Versión ' + (p.version || 'v1.0') + '</h3>' +
      '<p style="margin:4px 0 16px;font-size:12.5px;color:#64748B">Solicitud N° ' + (p.correlativo || '') + ' — ' + esc(p.title || '') + '</p>' +
      '<div style="display:flex;flex-direction:column;gap:12px;margin-bottom:14px">' +
        '<div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:8px;padding:12px 14px">' +
          '<label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-weight:700;color:#06396E;font-size:13.5px">' +
            '<input type="radio" name="lg-res-mode" id="res-mode-now" value="inmediata" checked onclick="document.getElementById(\'lg-res-sched-box\').style.display=\'none\'">' +
            '<span>Restauración Inmediata</span>' +
          '</label>' +
          '<div style="font-size:12px;color:#475569;margin-left:24px;margin-top:3px">Restaura esta versión en este instante, estableciéndola como la única vigente.</div>' +
        '</div>' +
        '<div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:8px;padding:12px 14px">' +
          '<label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-weight:700;color:#06396E;font-size:13.5px">' +
            '<input type="radio" name="lg-res-mode" id="res-mode-sched" value="programada" onclick="document.getElementById(\'lg-res-sched-box\').style.display=\'block\'">' +
            '<span>Restauración Programada</span>' +
          '</label>' +
          '<div style="font-size:12px;color:#475569;margin-left:24px;margin-top:3px">Programa la fecha y hora exacta en que se activará esta versión.</div>' +
          '<div id="lg-res-sched-box" style="display:none;margin-top:12px;margin-left:24px;padding-top:10px;border-top:1px dashed #CBD5E1">' +
            '<div class="fgrid g2" style="gap:12px">' +
              '<div class="f"><label>Fecha de vigencia <span class="req">*</span></label><input type="date" id="lg-res-date" value="' + defaultDate + '"></div>' +
              '<div class="f"><label>Hora de vigencia <span class="req">*</span></label><input type="time" id="lg-res-time" value="' + defaultTime + '"></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    modal(html, function(){
      var isNow = document.getElementById('res-mode-now') && document.getElementById('res-mode-now').checked;
      var dateInp = document.getElementById('lg-res-date');
      var timeInp = document.getElementById('lg-res-time');

      if(!isNow){
        if(!dateInp || !dateInp.value || !timeInp || !timeInp.value){ toast('RN-LG-009 · Debe ingresar fecha y hora de restauración.', 'err'); return false; }
      }

      if(isNow){
        G.palettes.forEach(function(x){ x.vigente = false; });
        p.vigente = true;
        p.restauracionProgramada = null;
        applyTheme(p);
        G.draft = null;
        renderLinea();
        toast('📢 <b>RN-LG-009 · Versión ' + (p.version || 'v1.0') + ' Restaurada con éxito.</b>', 'ok');
      } else {
        var dParts = dateInp.value.split('-');
        var formattedDate = (dParts.length === 3 ? dParts[2] + '/' + dParts[1] + '/' + dParts[0] : dateInp.value);
        var fullSchedStr = formattedDate + ' ' + timeInp.value;
        p.restauracionProgramada = fullSchedStr;
        G.draft = null;
        renderLinea();
        toast('<b>RN-LG-009 · Restauración Programada para el ' + fullSchedStr + '.</b>', 'info');
      }
      return true;
    });
  }

  function cancelRestorationLG(id){
    var p = find(id); if(!p) return;
    if(!p.restauracionProgramada){ toast('No hay restauración programada activa.', 'info'); return; }
    confirmModal(
      '¿Cancelar la restauración programada de la versión ' + (p.version || '') + '?',
      'La restauración programada para el ' + p.restauracionProgramada + ' será anulada.',
      function(){
        p.restauracionProgramada = null;
        renderLinea();
        toast('RN-LG-009 · Restauración programada cancelada.', 'info');
      },
      'Cancelar restauración'
    );
  }

  function showVersionControlModalLG(){
    var versions = G.palettes.filter(function(x){ return x.version || x.vigente || x.estado === 'Publicado' || x.estado === 'Publicada'; });
    var rows = versions.map(function(p){
      var vStr = p.version || (p.vigente ? 'v1.0' : '—');
      var statusTag = p.vigente ? '<span class="badge b-ok" style="font-weight:600">Vigente</span>' :
        (p.restauracionProgramada ? '<span class="badge b-info" style="font-weight:600" title="Restauración: ' + p.restauracionProgramada + '">Restauración Programada (' + p.restauracionProgramada + ')</span>' :
        '<span class="badge b-ok" style="font-weight:600">Publicado</span>');

      var act = '';
      if(p.vigente){
        act = '<span style="font-size:12px;color:#64748B;font-style:italic">Vigente (No restaurable)</span>';
      } else if(p.restauracionProgramada){
        act = '<button class="btn gho" data-lg="cancel-restore-action" data-id="' + p.id + '" style="color:#D51317;border-color:#FCA5A5;padding:4px 10px;font-size:12px">Cancelar restauración</button>';
      } else {
        act = '<button class="btn gho" data-lg="restore-action" data-id="' + p.id + '" style="color:#0284C7;border-color:#BAE6FD;padding:4px 10px;font-size:12px">Restaurar</button>';
      }

      var swatches = '<span style="display:inline-flex;gap:3px;margin-left:6px;vertical-align:middle">' +
        '<i style="width:10px;height:10px;border-radius:2px;display:inline-block;background:' + p.primario + '"></i>' +
        '<i style="width:10px;height:10px;border-radius:2px;display:inline-block;background:' + p.secundario + '"></i>' +
        '<i style="width:10px;height:10px;border-radius:2px;display:inline-block;background:' + p.terciario + '"></i>' +
      '</span>';

      return '<tr>' +
        '<td style="font-weight:700;color:#06396E;white-space:nowrap">' + vStr + '</td>' +
        '<td style="font-weight:600"><span>' + esc(p.title || p.name) + '</span>' + swatches + '</td>' +
        '<td class="num" style="color:#64748B;white-space:nowrap">' + esc(p.fechaPublicacion || p.fecha) + '</td>' +
        '<td style="white-space:nowrap">' + statusTag + '</td>' +
        '<td style="text-align:right;white-space:nowrap">' + act + '</td>' +
      '</tr>';
    }).join('');

    var html = '<div style="width:100%;max-width:955px;box-sizing:border-box"><h3 style="margin:0 0 16px;font-size:17px;color:#06396E">Control de Versiones de Línea Gráfica</h3>' +
      '<div class="tw" style="max-height:380px;overflow-y:auto;overflow-x:auto;width:100%"><table style="min-width:100%;width:100%">' +
        '<thead><tr>' +
          '<th style="white-space:nowrap">VERSIÓN</th>' +
          '<th>SOLICITUD / TÍTULO</th>' +
          '<th style="white-space:nowrap">FECHA PUBLICACIÓN</th>' +
          '<th style="white-space:nowrap">ESTADO</th>' +
          '<th style="text-align:right;white-space:nowrap">ACCIONES</th>' +
        '</tr></thead>' +
        '<tbody>' + rows + '</tbody>' +
      '</table></div></div>';

    modal(html, function(){ return true; });
  }

  /* ---------- EVENTS ---------- */
  document.addEventListener('input', function(e){
    var txt = e.target.closest('.figma-field input, .figma-field textarea');
    if(txt){
      var fField = txt.closest('.figma-field');
      if(fField){
        var v = txt.value || '';
        if(v.trim().length > 0){
          fField.classList.add('has-value');
          fField.classList.remove('is-error');
        } else {
          fField.classList.remove('has-value');
        }
        var counterEl = fField.querySelector('.field-counter');
        if(counterEl){
          var maxLen = txt.getAttribute('maxlength') || 200;
          counterEl.textContent = v.length + '/' + maxLen;
        }
      }
    }
  });

  document.addEventListener('change', function(e){
    if(e.target.id && (e.target.id.indexOf('lg-sustento-file') !== -1 || e.target.id.indexOf('lg-logo-file') !== -1 || e.target.id.indexOf('lg-logo2-file') !== -1 || e.target.id.indexOf('lg-fav-file') !== -1)){
      var file = e.target.files && e.target.files[0];
      if(file){
        if(!G.draft) newDraft();
        if(e.target.id.indexOf('lg-sustento-file') !== -1) G.draft.sustento = file.name;
        else if(e.target.id.indexOf('lg-logo2-file') !== -1) G.draft.logo2 = file.name;
        else if(e.target.id.indexOf('lg-logo-file') !== -1) G.draft.logo = file.name;
        else if(e.target.id.indexOf('lg-fav-file') !== -1) G.draft.favicon = file.name;
        toast('✓ Archivo <b>' + esc(file.name) + '</b> adjuntado con éxito.', 'ok');
        renderLinea();
      }
    } else if(e.target.dataset.lgChkAll !== undefined){
      var chkAll = e.target.checked;
      G.selected = [];
      if(chkAll){
        G.palettes.forEach(function(p){ if(!p.vigente && (p.estado === 'Elaboración' || p.estado === 'Observado')) G.selected.push(p.id); });
      }
      renderLinea();
    } else if(e.target.dataset.lgChk){
      var id = e.target.dataset.lgChk;
      if(e.target.checked){
        if(G.selected.indexOf(id) === -1) G.selected.push(id);
      } else {
        G.selected = G.selected.filter(function(x){ return x !== id; });
      }
      renderLinea();
    }
  });

  document.addEventListener('click', function(e){
    if(e.target.closest('label[for]') || (e.target.tagName === 'INPUT' && e.target.type === 'file')) return;

    // Clear Button Handler for Textareas
    var clearBtn = e.target.closest('.field-clear-btn');
    if (clearBtn) {
      var wrap = clearBtn.closest('.figma-field');
      if (wrap) {
        var txt = wrap.querySelector('textarea, input');
        if (txt) {
          txt.value = '';
          var evt = document.createEvent('HTMLEvents');
          evt.initEvent('input', true, false);
          txt.dispatchEvent(evt);
          evt.initEvent('change', true, false);
          txt.dispatchEvent(evt);
        }
      }
      return;
    }

    // Custom Select Dropdown Toggle & Selection
    var trig = e.target.closest('.figma-select-trigger');
    if (trig) {
      if (e._figmaSelectHandled) return;
      e._figmaSelectHandled = true;

      var wrap = trig.closest('.figma-select-wrapper');
      var fField = wrap ? wrap.closest('.figma-field') : null;
      var wasOpen = wrap.classList.contains('is-open');

      document.querySelectorAll('.figma-select-wrapper.is-open').forEach(function(w){
        w.classList.remove('is-open');
        var ff = w.closest('.figma-field');
        if (ff) ff.classList.remove('is-open');
      });

      if (!wasOpen) {
        wrap.classList.add('is-open');
        if (fField) fField.classList.add('is-open');
      }
      return;
    }

    var item = e.target.closest('.figma-select-item');
    if (item) {
      if (e._figmaSelectItemHandled) return;
      e._figmaSelectItemHandled = true;

      var menu = item.closest('.figma-select-menu');
      var wrap = item.closest('.figma-select-wrapper');
      var fField = wrap ? wrap.closest('.figma-field') : null;
      if (menu && wrap) {
        var hiddenInput = wrap.querySelector('input[type="hidden"]');
        var valSpan = wrap.querySelector('.figma-select-val');
        var newVal = item.dataset.val;

        if (hiddenInput) {
          hiddenInput.value = newVal;
          var evt = document.createEvent('HTMLEvents');
          evt.initEvent('change', true, false);
          hiddenInput.dispatchEvent(evt);
        }
        if (valSpan) {
          valSpan.textContent = newVal || 'Seleccionar...';
          if (newVal) valSpan.classList.remove('is-placeholder');
          else valSpan.classList.add('is-placeholder');
        }
        menu.querySelectorAll('.figma-select-item').forEach(function(it){ it.classList.remove('is-selected'); });
        item.classList.add('is-selected');
        wrap.classList.remove('is-open');

        if (fField) {
          fField.classList.remove('is-open');
          if (newVal) {
            fField.classList.add('has-value');
            fField.classList.remove('is-error');
          } else {
            fField.classList.remove('has-value');
          }
        }
      }
      return;
    }

    if (!e.target.closest('.figma-select-wrapper')) {
      if (!e._figmaOutsideHandled) {
        e._figmaOutsideHandled = true;
        document.querySelectorAll('.figma-select-wrapper.is-open').forEach(function(w){
          w.classList.remove('is-open');
          var ff = w.closest('.figma-field');
          if (ff) ff.classList.remove('is-open');
        });
      }
    }

    var el = e.target.closest('[data-lg]'); if(!el) return; e.preventDefault();
    var a = el.dataset.lg, id = el.dataset.id;
    if(a === 'tab'){ G.tab = el.dataset.tab; renderLinea(); }
    else if(a === 'new') newDraft();
    else if(a === 'edit') editP(id);
    else if(a === 'verify') verifyP(id);
    else if(a === 'bulk-verify') bulkVerifyP();
    else if(a === 'obs-action') showObservarModalLG(id);
    else if(a === 'rej-action') showRechazarModalLG(id);
    else if(a === 'app-action') doApproveLG(id);
    else if(a === 'publish-action') showPublishModalLG(id);
    else if(a === 'open-version-modal') showVersionControlModalLG();
    else if(a === 'restore-action') showRestoreModalLG(id);
    else if(a === 'cancel-restore-action') cancelRestorationLG(id);
    else if(a === 'del') delP(id);
    else if(a === 'bulk-del') bulkDelP();
    else if(a === 'approve') doApproveLG(id);
    else if(a === 'apply') applyVigente(id);
    else if(a === 'save') saveP();
    else if(a === 'cancel'){ if(G.isSimulating) detenerSimulacion(true); G.draft = null; G.tab = 'colores'; renderLinea(); }
    else if(a === 'sim') simular();
    else if(a === 'sim-stop') detenerSimulacion();
    else if(a === 'obs-detail') showObsModal(id);
  });

  window.renderLinea = renderLinea;
  window.__onShow = window.__onShow || {};
  var showFn = function(){ if(G.isSimulating) detenerSimulacion(true); G.draft = null; G.tab = 'colores'; renderLinea(); };
  window.__onShow['ph-linea'] = showFn;
  window.__onShow['linea-grafica'] = showFn;
  seed();
  var vig = G.palettes.filter(function(x){ return x.vigente; })[0]; if(vig) applyTheme(vig);
  var curHash = (location.hash || '').slice(1);
  if(curHash === 'ph-linea' || curHash === 'linea-grafica'){ G.draft = null; renderLinea(); }
})();
