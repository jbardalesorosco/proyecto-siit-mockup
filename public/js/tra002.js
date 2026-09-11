/* ==========================================================================
   SIIT · GESTOR DE DATOS DE TABLAS MAESTRAS (TRA002)
   ========================================================================== */

(function(){
  var PENCIL = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/><path d="M12 20h9"/></svg>';
  var TRASH = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>';
  var EYE = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M3 7V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2"/><path d="M3 17v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2"/><path d="M6 12c1.5-3.5 3.8-5 6-5s4.5 1.5 6 5c-1.5 3.5-3.8 5-6 5s-4.5-1.5-6-5Z"/><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/></svg>';
  var CHECK = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>';
  var APPROVE = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><polyline points="9 14 11 16 15 12"/></svg>';
  var ICON_FILE_CHECK = '<svg viewBox="0 0 24 24" style="width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><polyline points="9 15 11.5 17.5 15.5 12.5"/></svg>';
  var ICON_FILE_SEARCH = '<svg viewBox="0 0 24 24" style="width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><circle cx="11.5" cy="14.5" r="2.5"/><line x1="13.3" y1="16.3" x2="16" y2="19"/></svg>';
  var ICON_FILE_X = '<svg viewBox="0 0 24 24" style="width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="9.5" y1="12.5" x2="14.5" y2="17.5"/><line x1="14.5" y1="12.5" x2="9.5" y2="17.5"/></svg>';

  function getCurrentRole(){
    if(window.CURRENT_ROLE) return window.CURRENT_ROLE;
    var el = document.getElementById('tb-current-role');
    if(el && el.textContent.indexOf('Aprobador') !== -1) return 'Aprobador';
    return 'Creador';
  }

  function buildFigmaInfoMessage(title, text){
    return '<div data-borde="false" data-show-actions="false" data-type="Info" style="width: 100%; padding: 14px 16px; border-radius: 8px; background: var(--sys-color-bg-feedback-light-info, #DDF0FF); justify-content: flex-start; align-items: flex-start; gap: 12px; display: flex; box-sizing: border-box; margin-top: 14px;">' +
      '<div style="width: 20px; height: 20px; flex-shrink: 0; margin-top: 1px; display: flex; align-items: center; justify-content: center;">' +
        '<svg viewBox="0 0 24 24" style="width: 20px; height: 20px; stroke: var(--sys-color-icon-feedback-light-info, #002D48); fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>' +
      '</div>' +
      '<div style="flex: 1 1 0; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 4px; display: flex;">' +
        '<div style="align-self: stretch; color: var(--sys-color-text-feedback-info, #002D48); font-size: 14px; font-family: Inter, sans-serif; font-weight: 600; line-height: 20px; word-wrap: break-word;">' + esc(title) + '</div>' +
        '<div style="align-self: stretch; color: var(--sys-color-text-feedback-info, #002D48); font-size: 14px; font-family: Inter, sans-serif; font-weight: 400; line-height: 20px; word-wrap: break-word;">' + text + '</div>' +
      '</div>' +
    '</div>';
  }

  var D = { data: [], draft: null, mode: 'create', origId: null, carga: null, currentRole: 'Creador', draftSaved: false };

  function uid(){ return 'd' + Math.random().toString(36).slice(2,9); }
  function today(){ var d = new Date(); function p(x){ return String(x).padStart(2,'0'); } return p(d.getDate()) + '/' + p(d.getMonth()+1) + '/' + d.getFullYear(); }
  function nowTime(){ var d = new Date(); function p(x){ return String(x).padStart(2,'0'); } return p(d.getHours()) + ':' + p(d.getMinutes()); }
  function esc(s){ return (s == null ? '' : String(s)).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function opt(arr, sel){ return arr.map(function(v){ var l = v === '' ? '—' : v; return '<option value="' + esc(v) + '"' + (v === sel ? ' selected' : '') + '>' + esc(l) + '</option>'; }).join(''); }

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

    var roTriggerStyle = opts.readonly ? ' pointer-events:none; cursor:default; background:transparent;' : '';
    var arrowHtml = opts.readonly ? '' : '<svg class="figma-select-arrow" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>';

    var customHtml = '<div class="figma-select-wrapper" id="selwrap-' + opts.id + '">' +
      '<input type="hidden" id="' + opts.id + '" value="' + esc(selVal) + '">' +
      '<div class="figma-select-trigger" id="trigger-' + opts.id + '" style="' + roTriggerStyle + '">' +
        '<span class="figma-select-val' + (isPl ? ' is-placeholder' : '') + '" id="val-' + opts.id + '" style="' + (opts.readonly ? 'color:#29292A;' : '') + '">' + esc(displayText) + '</span>' +
        arrowHtml +
      '</div>' +
      (opts.readonly ? '' : '<div class="figma-select-menu" id="menu-' + opts.id + '">' + itemsHtml + '</div>') +
    '</div>';

    return buildFigmaFieldHtml({
      id: opts.id,
      label: opts.label,
      required: opts.required,
      readonly: opts.readonly,
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
  function modal(html, onSave, saveText){
    var ov = document.getElementById('t001-modal');
    document.getElementById('t001-modal-body').innerHTML = html;
    var saveBtn = ov.querySelector('[data-mbtn="save"]');
    if(saveBtn){
      saveBtn.textContent = saveText || 'Confirmar';
      saveBtn.style.border = 'none';
      saveBtn.style.outline = 'none';
      if(saveText === 'Eliminar'){
        saveBtn.style.background = '#D51317';
      } else {
        saveBtn.style.background = '#06396E';
      }
    }
    ov._onSave = onSave;
    ov.style.display = 'grid';
  }
  function closeModal(){ document.getElementById('t001-modal').style.display = 'none'; }
  function confirmModal(title, msg, onOk){
    var html = '<h3 style="font-size:17px;font-weight:700;color:var(--navy-800);margin:0 0 8px;">' + esc(title) + '</h3>' +
      '<p style="font-size:13.5px;color:#475569;margin:0 0 20px;">' + esc(msg) + '</p>' +
      '<div style="display:flex;justify-content:flex-end;gap:12px;">' +
        '<button class="btn gho" onclick="document.getElementById(\'t001-modal\').style.display=\'none\'">Cancelar</button>' +
        '<button class="btn pri" id="btn-conf-ok" style="background:#D51317;border-color:#D51317;color:white;">Confirmar</button>' +
      '</div>';
    modal(html, null);
    setTimeout(function(){
      var b = document.getElementById('btn-conf-ok');
      if(b) b.onclick = function(){ closeModal(); onOk(); };
    }, 20);
  }

  function stBadge(st){
    var m = {
      'Elaboración': 'b-off',
      'Observado': 'b-warn',
      'Validado': 'b-info',
      'Aprobado': 'b-ok',
      'Rechazado': 'b-err',
      'Eliminado': 'b-off'
    };
    return '<span class="badge ' + (m[st] || 'b-off') + '">' + st + '</span>';
  }
  function orgBadge(org){
    if(org === 'Masivo') return '<span class="badge b-info" style="background:#EFF6FF;color:#1E40AF;border:1px solid #BFDBFE">Masivo</span>';
    return '<span class="badge b-off">Individual</span>';
  }

  function getTableNeedsApproval(t){
    if(!t) return false;
    function norm(str){
      return String(str || '').trim().toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[\s\u00A0\u2000-\u200B]+/g, ' ')
        .replace(/[—–-]/g, '-');
    }
    var normTarget = norm(t);
    if(window.TRA001 && typeof window.TRA001.getStructureByName === 'function'){
      var st = window.TRA001.getStructureByName(t);
      if(st && typeof st.needsApproval === 'boolean'){
        return st.needsApproval;
      }
      if(typeof window.TRA001.getStructures === 'function'){
        var all = window.TRA001.getStructures();
        for(var i = 0; i < all.length; i++){
          var item = all[i];
          var normItem = norm(item.nombre || item.name || '');
          if(normItem === normTarget && typeof item.needsApproval === 'boolean'){
            return item.needsApproval;
          }
        }
      }
    }
    // Tablas base del sistema conocidas sin aprobador
    var noApprovalDefaults = ['moneda', 'tipo de documento de identidad', 'estado civil'];
    if(noApprovalDefaults.indexOf(normTarget) !== -1){
      return false;
    }
    return true;
  }

  function openDrawer(opts){
    var ov = document.getElementById('t001-drawer');
    var panel = document.getElementById('t001-drawer-panel');
    var titleEl = document.getElementById('t001-drawer-title');
    var subEl = document.getElementById('t001-drawer-sub');
    var bodyEl = document.getElementById('t001-drawer-body');
    var saveText = document.getElementById('t001-drawer-savetext');

    if(panel) {
      panel.style.width = opts.width || '400px';
    }
    if(titleEl) titleEl.textContent = opts.title || '';
    if(subEl) subEl.textContent = opts.subtitle || '';
    if(bodyEl) bodyEl.innerHTML = opts.bodyHtml || '';
    if(saveText) saveText.textContent = opts.saveText || 'Guardar';

    ov._onSave = opts.onSave;
    ov.style.display = 'flex';
    requestAnimationFrame(function(){
      if(panel) panel.style.transform = 'translateX(0)';
    });
  }

  function closeDrawer(){
    var ov = document.getElementById('t001-drawer');
    var panel = document.getElementById('t001-drawer-panel');
    if(!ov) return;
    if(panel) panel.style.transform = 'translateX(100%)';
    setTimeout(function(){
      ov.style.display = 'none';
      ov._onSave = null;
    }, 250);
  }

  var CONFIGS = {
    'Ubigeo — Distritos': { max: 10, fields: [{ name: 'ubigeo', label: 'Ubigeo', req: true, max: 6, ej: '150101' }, { name: 'departamento', label: 'Departamento', req: true, max: 50, ej: 'Lima' }, { name: 'provincia', label: 'Provincia', req: true, max: 50, ej: 'Lima' }, { name: 'distrito', label: 'Distrito', req: true, max: 50, ej: 'San Juan de Miraflores' }] },
    'Tipo de Documento de Identidad': { max: 10, fields: [{ name: 'codigo', label: 'Código', req: true, max: 10, ej: 'DNI' }, { name: 'descripcion', label: 'Descripción', req: true, max: 100, ej: 'Documento Nacional de Identidad' }] },
    'Actividad económica — CIIU': { max: 20, fields: [{ name: 'codigo', label: 'Código', req: true, max: 10, ej: '4711' }, { name: 'descripcion', label: 'Descripción', req: true, max: 150, ej: 'Venta al por menor en comercios no especializados' }] },
    'Tipos de vía': { max: 10, fields: [{ name: 'codigo', label: 'Código', req: true, max: 10, ej: 'AV' }, { name: 'descripcion', label: 'Descripción', req: true, max: 100, ej: 'Avenida' }] },
    'Moneda': { max: 10, fields: [{ name: 'codigo', label: 'Código', req: true, max: 10, ej: 'PEN' }, { name: 'descripcion', label: 'Descripción', req: true, max: 100, ej: 'Sol Peruano' }, { name: 'simbolo', label: 'Símbolo', req: false, max: 10, ej: 'S/' }] },
    'Estado Civil': { max: 10, fields: [{ name: 'codigo', label: 'Código', req: true, max: 10, ej: 'SOL' }, { name: 'descripcion', label: 'Descripción', req: true, max: 100, ej: 'Soltero(a)' }] },
    'Países y Nacionalidades': { max: 10, fields: [{ name: 'codigo_iso', label: 'Código ISO', req: true, max: 3, ej: 'PER' }, { name: 'pais', label: 'País', req: true, max: 80, ej: 'Perú' }, { name: 'nacionalidad', label: 'Nacionalidad', req: false, max: 80, ej: 'Peruana' }] }
  };

  function normalizeKey(str){
    return (str || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '_').replace(/^_+|_+$/g, '') || 'campo';
  }

  function getTNAMES(){
    var names = [];
    if(window.TRA001 && typeof window.TRA001.getStructures === 'function'){
      var structs = window.TRA001.getStructures();
      structs.forEach(function(s){
        if(s && s.name && s.state === 'Aprobado' && names.indexOf(s.name) === -1){
          names.push(s.name);
        }
      });
    }
    // Fallback de tablas maestras base aprobadas si no se encuentran cargadas desde TRA001
    if(names.length === 0){
      var defaultApproved = ['Países y Nacionalidades', 'Moneda', 'Tipo de Documento de Identidad', 'Estado Civil'];
      defaultApproved.forEach(function(k){
        if(names.indexOf(k) === -1) names.push(k);
      });
    }
    return names;
  }

  function getTableConfig(t){
    if(window.TRA001 && typeof window.TRA001.getStructureByName === 'function'){
      var st = window.TRA001.getStructureByName(t);
      if(st && st.fields && st.fields.length > 0){
        var mappedFields = st.fields.map(function(f){
          var rawName = f.name || 'Campo';
          var key = normalizeKey(rawName);
          var maxLen = parseInt(f.max, 10);
          if(isNaN(maxLen) || maxLen <= 0) maxLen = 150;
          return {
            name: key,
            label: rawName,
            req: f.required !== false,
            min: (f.min != null && f.min !== '') ? parseInt(f.min, 10) : 0,
            max: maxLen,
            allowDuplicates: f.allowDuplicates !== false,
            type: f.type || 'Texto'
          };
        });
        return {
          max: st.maxErr || 10,
          fields: mappedFields
        };
      }
    }
    return CONFIGS[t] || {
      max: 10,
      fields: [
        { name: 'codigo', label: 'Código', req: true, max: 10 },
        { name: 'descripcion', label: 'Descripción', req: true, max: 100 }
      ]
    };
  }

  function find(id){ for(var i = 0; i < D.data.length; i++) if(D.data[i].id === id) return D.data[i]; return null; }

  function regOf(tabla, values){
    values = values || {};
    var config = getTableConfig(tabla);
    var fs = config.fields.map(function(f){ return values[f.name] || values[f.label] || ''; });
    return fs[0] + (fs.length > 1 ? ' — ' + fs.slice(1).filter(Boolean).join(' / ') : '');
  }

  function seed(){
    D.data = [
      {
        id: uid(),
        tabla: 'Moneda',
        origen: 'Individual',
        tipo: 'Creación',
        estado: 'Elaboración',
        fecha: today(),
        hora: '10:30',
        needsApproval: false,
        obsMotivo: '',
        obsDate: '',
        rechazoMotivo: '',
        rechazoDate: '',
        values: { codigo: 'EUR', descripcion: 'Euro', simbolo: '€' }
      },
      {
        id: uid(),
        tabla: 'Tipos de vía',
        origen: 'Individual',
        tipo: 'Creación',
        estado: 'Observado',
        fecha: '08/08/2026',
        hora: '14:20',
        needsApproval: true,
        obsMotivo: 'Se requiere precisar la abreviatura oficial según directiva de estandarización catastral.',
        obsDate: '08/08/2026',
        rechazoMotivo: '',
        rechazoDate: '',
        values: { codigo: 'JR', descripcion: 'Jirón' }
      },
      {
        id: uid(),
        tabla: 'Actividad económica — CIIU',
        origen: 'Masivo',
        tipo: 'Modificación',
        estado: 'Validado',
        fecha: '09/08/2026',
        hora: '11:15',
        needsApproval: true,
        obsMotivo: '',
        obsDate: '',
        rechazoMotivo: '',
        rechazoDate: '',
        values: { codigo: '4711', descripcion: 'Venta al por menor en comercios no especializados' }
      },
      {
        id: uid(),
        tabla: 'Moneda',
        origen: 'Individual',
        tipo: 'Creación',
        estado: 'Validado',
        fecha: '09/08/2026',
        hora: '09:40',
        needsApproval: false,
        obsMotivo: '',
        obsDate: '',
        rechazoMotivo: '',
        rechazoDate: '',
        values: { codigo: 'USD', descripcion: 'Dólar Estadounidense', simbolo: '$' }
      },
      {
        id: uid(),
        tabla: 'Ubigeo — Distritos',
        origen: 'Masivo',
        tipo: 'Creación',
        estado: 'Rechazado',
        fecha: '07/08/2026',
        hora: '16:00',
        needsApproval: true,
        obsMotivo: '',
        obsDate: '',
        rechazoMotivo: 'El código de ubigeo propuesto colisiona con el catálogo oficial de RENIEC/INEI vigente.',
        rechazoDate: '07/08/2026',
        values: { ubigeo: '150199', departamento: 'Lima', provincia: 'Lima', distrito: 'Distrito No Homologado' }
      },
      {
        id: uid(),
        tabla: 'Ubigeo — Distritos',
        origen: 'Masivo',
        tipo: 'Creación',
        estado: 'Aprobado',
        fecha: '20/07/2026',
        hora: '10:15',
        needsApproval: true,
        obsMotivo: '',
        obsDate: '',
        rechazoMotivo: '',
        rechazoDate: '',
        values: { ubigeo: '150132', departamento: 'Lima', provincia: 'Lima', distrito: 'San Juan de Miraflores' }
      },
      {
        id: uid(),
        tabla: 'Tipo de Documento de Identidad',
        origen: 'Individual',
        tipo: 'Creación',
        estado: 'Aprobado',
        fecha: '18/07/2026',
        hora: '08:45',
        needsApproval: true,
        obsMotivo: '',
        obsDate: '',
        rechazoMotivo: '',
        rechazoDate: '',
        values: { codigo: 'DNI', descripcion: 'Documento Nacional de Identidad' }
      },
      {
        id: uid(),
        tabla: 'Moneda',
        origen: 'Individual',
        tipo: 'Creación',
        estado: 'Aprobado',
        fecha: '24/07/2026',
        hora: '09:12',
        needsApproval: false,
        obsMotivo: '',
        obsDate: '',
        rechazoMotivo: '',
        rechazoDate: '',
        values: { codigo: 'PEN', descripcion: 'Sol Peruano', simbolo: 'S/' }
      }
    ];
  }

  function buildTableCell(content, opts){
    opts = opts || {};
    var align = opts.align || 'flex-start';
    var isRight = align === 'right' || align === 'flex-end';
    var justify = isRight ? 'flex-end' : (align === 'center' ? 'center' : 'flex-start');
    var numStyle = opts.num ? ' font-variant-numeric: tabular-nums;' : '';
    var extraStyle = opts.style || '';
    var type = opts.type || 'Text';

    return '<td class="figma-cell-td" style="padding:0;border:0;vertical-align:middle;">' +
      '<div data-icon-1="true" data-icon-2="true" data-icon-3="true" data-icon-4="false" data-icon-l="false" data-icon-r="false" data-icon-signature="false" data-icon-validation="false" data-type="' + type + '" style="width: 100%; height: 100%; padding-left: 16px; padding-right: 16px; padding-top: 12px; padding-bottom: 12px; border-bottom: 1px var(--sys-color-divider-default, rgba(32, 32, 32, 0.12)) solid; justify-content: ' + justify + '; align-items: center; gap: 8px; display: inline-flex;' + extraStyle + '">' +
        '<div style="flex: 1 1 0; min-height: 24px; justify-content: center; display: flex; flex-direction: column; align-items: ' + justify + '; color: var(--sys-color-text-neutral-medium, #29292A); font-size: 14px; font-family: Inter, sans-serif; font-weight: 400; letter-spacing: 0.02px; word-wrap: break-word;' + (isRight ? ' text-align: right;' : '') + numStyle + '">' +
          content +
        '</div>' +
      '</div>' +
    '</td>';
  }

  function renderList(){
    D.currentRole = getCurrentRole();
    var mount = document.getElementById('tra002-list-mount');
    if(!mount) return;
    var tnames = getTNAMES();
    var rows = D.data.map(function(r){
      var elim = r.estado === 'Eliminado';
      var a = '<div class="acts">';
      if (!elim) {
        if (D.currentRole === 'Creador') {
          if (r.estado === 'Elaboración' || r.estado === 'Observado') {
            a += '<a title="' + (r.estado === 'Observado' ? 'Editar observaciones' : 'Editar') + '" data-d2="edit" data-d2id="' + r.id + '" style="color:#504C4A;cursor:pointer;">' + PENCIL + '</a>';
            a += '<a title="Eliminar" data-d2="delete" data-d2id="' + r.id + '" style="color:#504C4A;cursor:pointer;">' + TRASH + '</a>';
          } else {
            a += '<a title="Ver detalle" data-d2="view" data-d2id="' + r.id + '" style="color:#504C4A;cursor:pointer;">' + EYE + '</a>';
          }
        } else {
          // Rol Aprobador: En la tabla principal siempre se usa "Ver detalle"
          a += '<a title="Ver detalle" data-d2="view" data-d2id="' + r.id + '" style="color:#504C4A;cursor:pointer;">' + EYE + '</a>';
        }
      } else {
        a += '<span style="font-size:11px;color:var(--ink3);">Eliminado</span>';
      }
      a += '</div>';

      var reg = regOf(r.tabla, r.values);
      var k = (reg + ' ' + r.tabla + ' ' + r.origen + ' ' + r.estado).toLowerCase();
      var clickAct = (D.currentRole === 'Creador' && (r.estado === 'Elaboración' || r.estado === 'Observado')) ? 'edit' : 'view';

      return '<tr data-k="' + esc(k) + '" data-st="' + r.estado + '" data-tb="' + esc(r.tabla) + '"' + (elim ? ' style="opacity:.5"' : '') + '>' +
        buildTableCell('<a data-d2="' + clickAct + '" data-d2id="' + r.id + '" style="color:#29292A;text-decoration:none;cursor:pointer;font-weight:400;">' + esc(reg) + '</a>') +
        buildTableCell(esc(r.tabla)) +
        buildTableCell(orgBadge(r.origen)) +
        buildTableCell(esc(r.tipo)) +
        buildTableCell(r.fecha, { num: true }) +
        buildTableCell(stBadge(r.estado)) +
        buildTableCell(a, { align: 'right' }) +
      '</tr>';
    }).join('');

    mount.innerHTML =
      '<div class="card" style="padding:20px 20px 16px;">' +
        '<div class="tools" style="margin-bottom:20px;">' +
          '<div class="search" style="flex:1;"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg><input id="d2-q" placeholder="Buscar por código, descripción o tabla maestra" style="width:100%;padding:10px 14px 10px 40px;border:1px solid #CBD5E1;border-radius:8px;"></div>' +
        '</div>' +
        '<div class="tw" style="border:1px solid rgba(32,32,32,0.12);border-radius:4px;overflow:hidden;margin-bottom:16px;">' +
          '<table style="min-width:100%;"><thead><tr>' +
            '<th><div class="th-cell"><span class="th-title">REGISTRO</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 21 14 19 14 12.46 22 3"/></svg></div></div></th>' +
            '<th><div class="th-cell"><span class="th-title">TABLA MAESTRA</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 21 14 19 14 12.46 22 3"/></svg></div></div></th>' +
            '<th><div class="th-cell"><span class="th-title">ORIGEN</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 21 14 19 14 12.46 22 3"/></svg></div></div></th>' +
            '<th><div class="th-cell"><span class="th-title">TIPO DE REGISTRO</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 21 14 19 14 12.46 22 3"/></svg></div></div></th>' +
            '<th><div class="th-cell"><span class="th-title">FECHA DE REGISTRO</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 21 14 19 14 12.46 22 3"/></svg></div></div></th>' +
            '<th><div class="th-cell"><span class="th-title">ESTADO</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 21 14 19 14 12.46 22 3"/></svg></div></div></th>' +
            '<th style="text-align:right"><div class="th-cell" style="justify-content:flex-end"><span class="th-title">ACCIONES</span></div></th>' +
          '</tr></thead><tbody>' + rows + '</tbody></table>' +
        '</div>' +
        '<div data-edge-buttons="true" data-report="true" data-rows-per-page="true" style="width: 100%; padding-top: 16px; background: white; border-top: 1px rgba(32, 32, 32, 0.12) solid; justify-content: space-between; align-items: center; gap: 16px; display: flex; flex-wrap: wrap;">' +
            '<div style="justify-content: flex-start; align-items: center; gap: 24px; display: flex">' +
                '<div style="color: #504C4A; font-size: 12px; font-family: Inter; font-weight: 500; line-height: 16px;">Mostrando 1-' + D.data.length + ' de ' + D.data.length + '</div>' +
                '<div style="justify-content: flex-start; align-items: center; gap: 8px; display: flex">' +
                    '<div style="color: #504C4A; font-size: 12px; font-family: Inter; font-weight: 500; line-height: 16px;">Filas por página:</div>' +
                    '<div style="width: 75px; position: relative;">' +
                        '<select style="width: 100%; height: 32px; padding: 4px 28px 4px 12px; background: white; border-radius: 8px; border: 1px rgba(32, 32, 32, 0.56) solid; font-size: 13px; font-family: Inter; font-weight: 500; color: #353537; outline: none; appearance: none; -webkit-appearance: none; cursor: pointer; background-image: url(&quot;data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23504C4A\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E&quot;); background-repeat: no-repeat; background-position: right 8px center; background-size: 14px 14px;">' +
                            '<option>10</option><option>25</option><option>50</option><option>100</option>' +
                        '</select>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div style="justify-content: flex-end; align-items: center; gap: 16px; display: flex; flex-wrap: wrap;">' +
                '<div style="justify-content: center; align-items: center; gap: 4px; display: flex">' +
                    '<button type="button" title="Primera página" style="width: 32px; height: 32px; background: transparent; border: 0; border-radius: 8px; justify-content: center; align-items: center; display: flex; cursor: pointer; color: #504C4A;">' +
                        '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2"><polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/></svg>' +
                    '</button>' +
                    '<button type="button" title="Página anterior" style="width: 32px; height: 32px; background: transparent; border: 0; border-radius: 8px; justify-content: center; align-items: center; display: flex; cursor: pointer; color: #504C4A;">' +
                        '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2"><polyline points="15 18 9 12 15 6"/></svg>' +
                    '</button>' +
                    '<div style="justify-content: flex-start; align-items: center; gap: 4px; display: flex">' +
                        '<div style="height: 30px; min-width: 30px; padding: 0 8px; background: #06396E; border-radius: 4px; justify-content: center; align-items: center; display: flex; color: white; font-size: 12px; font-family: Inter; font-weight: 600; cursor: pointer;">1</div>' +
                    '</div>' +
                    '<button type="button" title="Página siguiente" style="width: 32px; height: 32px; background: transparent; border: 0; border-radius: 8px; justify-content: center; align-items: center; display: flex; cursor: pointer; color: #504C4A;">' +
                        '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2"><polyline points="9 18 15 12 9 6"/></svg>' +
                    '</button>' +
                    '<button type="button" title="Última página" style="width: 32px; height: 32px; background: transparent; border: 0; border-radius: 8px; justify-content: center; align-items: center; display: flex; cursor: pointer; color: #504C4A;">' +
                        '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>' +
                    '</button>' +
                '</div>' +
                '<div style="justify-content: flex-end; align-items: center; gap: 8px; display: flex">' +
                    '<div style="color: #504C4A; font-size: 12px; font-family: Inter; font-weight: 500; line-height: 16px;">Ir a</div>' +
                    '<div style="width: 75px; position: relative;">' +
                        '<select style="width: 100%; height: 32px; padding: 4px 28px 4px 12px; background: white; border-radius: 8px; border: 1px rgba(32, 32, 32, 0.56) solid; font-size: 13px; font-family: Inter; font-weight: 500; color: #353537; outline: none; appearance: none; -webkit-appearance: none; cursor: pointer; background-image: url(&quot;data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23504C4A\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E&quot;); background-repeat: no-repeat; background-position: right 8px center; background-size: 14px 14px;">' +
                            '<option>1</option>' +
                        '</select>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
      '</div>';

    var q = document.getElementById('d2-q');
    function flt(){
      var term = (q.value || '').toLowerCase();
      Array.prototype.forEach.call(mount.querySelectorAll('tbody tr'), function(tr){
        var okT = tr.getAttribute('data-k').indexOf(term) >= 0;
        tr.style.display = okT ? '' : 'none';
      });
    }
    if(q) q.addEventListener('input', flt);

    function syncCargaBtn(){
      var topBtn = document.getElementById('d2-top-carga-btn');
      if(!topBtn) return;
      topBtn.disabled = false;
      topBtn.classList.remove('disabled');
      topBtn.style.opacity = '1';
      topBtn.style.cursor = 'pointer';
    }
    syncCargaBtn();
  }

  function makeDraft(){
    D.mode = 'create';
    D.origId = null;
    D.draftSaved = false;
    D.draft = {
      id: uid(),
      tabla: '',
      values: {},
      origen: 'Individual',
      tipo: 'Creación',
      estado: 'Elaboración',
      fecha: today(),
      hora: nowTime(),
      needsApproval: false,
      obsMotivo: '',
      obsDate: '',
      rechazoMotivo: '',
      rechazoDate: ''
    };
  }
  function openNew(){
    D.currentRole = getCurrentRole();
    if(D.currentRole === 'Aprobador'){
      toast('El rol Aprobador solo evalúa registros existentes. Cambie a Rol Creador en el menú de usuario para registrar.', 'warn');
      return;
    }
    makeDraft();
    window.go('tra002-form');
  }
  function openEdit(id){
    D.currentRole = getCurrentRole();
    var r = find(id); if(!r) return;
    if(r.estado === 'Eliminado'){
      toast('Un registro Eliminado es irreversible: no puede editarse.', 'err');
      return;
    }
    if(D.currentRole === 'Aprobador'){
      openView(id);
      return;
    }
    if(r.estado !== 'Elaboración' && r.estado !== 'Observado'){
      openView(id);
      return;
    }
    D.mode = 'edit';
    D.origId = id;
    D.draft = JSON.parse(JSON.stringify(r));
    if(typeof D.draft.needsApproval !== 'boolean'){
      D.draft.needsApproval = getTableNeedsApproval(D.draft.tabla);
    }
    D.draftSaved = true;
    window.go('tra002-form');
  }
  function openView(id){
    D.currentRole = getCurrentRole();
    var r = find(id); if(!r) return;
    D.mode = 'view';
    D.origId = id;
    D.draft = JSON.parse(JSON.stringify(r));
    if(typeof D.draft.needsApproval !== 'boolean'){
      D.draft.needsApproval = getTableNeedsApproval(D.draft.tabla);
    }
    window.go('tra002-form');
  }

  function renderForm(){
    var mount = document.getElementById('tra002-form-mount'); if(!mount) return;
    if(!D.draft) makeDraft();
    var d = D.draft;
    D.currentRole = getCurrentRole();
    if(D.mode === 'create' || typeof d.needsApproval !== 'boolean'){
      d.needsApproval = getTableNeedsApproval(d.tabla);
    }
    var orig = D.mode === 'edit' ? find(D.origId) : null;
    var tnames = getTNAMES();
    var selectOptions = tnames.slice();
    if(d.tabla && selectOptions.indexOf(d.tabla) === -1){
      if(D.mode === 'view'){
        selectOptions.unshift(d.tabla);
      } else {
        d.tabla = '';
        d.needsApproval = false;
      }
    }
    var config = d.tabla ? getTableConfig(d.tabla) : { max: 10, fields: [] };
    var fields = config.fields;

    var isRoleAprobador = D.currentRole.toLowerCase() === 'aprobador';
    var isReadOnly = D.mode === 'view' || d.estado === 'Rechazado' || (d.estado === 'Validado' && !isRoleAprobador) || d.estado === 'Aprobado';

    var tablaField = buildCustomSelectHtml({
      id: 'd2f-tabla',
      label: 'Tabla maestra',
      options: selectOptions,
      selectedValue: d.tabla,
      placeholder: 'Seleccionar tabla maestra',
      required: true,
      readonly: isReadOnly || D.mode === 'edit',
      helperText: 'La tabla maestra es obligatoria.'
    });

    var fInputs = '';
    if(!d.tabla){
      fInputs = '<div style="grid-column:1/-1;padding:28px 20px;border:1px dashed #CBD5E1;border-radius:8px;background:#F8FAFC;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;text-align:center;">' +
        '<svg viewBox="0 0 24 24" style="width:28px;height:28px;stroke:#94A3B8;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10M6 10h10"/></svg>' +
        '<div style="font-size:14px;font-weight:600;color:#475569;font-family:Inter,sans-serif;">Ninguna tabla maestra seleccionada</div>' +
        '<div style="font-size:12.5px;color:#64748B;font-family:Inter,sans-serif;max-width:420px;line-height:18px;">Selecciona una tabla maestra en el campo superior para cargar automáticamente los campos requeridos para el registro de datos.</div>' +
      '</div>';
    } else {
      fInputs = fields.map(function(f){
        var displayLabel = f.label || (f.name.charAt(0).toUpperCase() + f.name.slice(1));
        return buildFigmaFieldHtml({
          id: 'd2f-' + f.name,
          label: displayLabel,
          value: d.values[f.name] || d.values[displayLabel] || '',
          placeholder: 'Máx. ' + f.max + ' caracteres',
          required: f.req,
          readonly: isReadOnly,
          maxlength: f.max,
          helperText: displayLabel + ' es obligatorio.'
        });
      }).join('');
    }

    // Banners para Observado y Rechazado
    var bannerHtml = '';
    if(d.estado === 'Observado' && (d.obsMotivo || d.motivoObservacion)){
      bannerHtml = '<div style="margin-bottom:16px;padding:12px 16px;background:#FEF3C7;border-left:4px solid #D97706;border-radius:6px;color:#92400E;font-size:13.5px;line-height:20px;display:flex;align-items:flex-start;gap:10px;">' +
        '<svg viewBox="0 0 24 24" style="width:20px;height:20px;stroke:#D97706;fill:none;stroke-width:2;flex-shrink:0;margin-top:1px;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' +
        '<div><strong>Observación:</strong> ' + esc(d.obsMotivo || d.motivoObservacion) + '</div>' +
      '</div>';
    } else if(d.estado === 'Rechazado' && (d.rechazoMotivo || d.motivoRechazo)){
      bannerHtml = '<div style="margin-bottom:16px;padding:12px 16px;background:#FEE2E2;border-left:4px solid #DC2626;border-radius:6px;color:#991B1B;font-size:13.5px;line-height:20px;display:flex;align-items:flex-start;gap:10px;">' +
        '<svg viewBox="0 0 24 24" style="width:20px;height:20px;stroke:#DC2626;fill:none;stroke-width:2;flex-shrink:0;margin-top:1px;"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>' +
        '<div><strong>Motivo del rechazo:</strong> ' + esc(d.rechazoMotivo || d.motivoRechazo) + '</div>' +
      '</div>';
    }

    // 1. Header 2-Cards Readonly Layout (Patrón estándar Figma SIIT)
    var headerCard = '<div data-info-solicitud="true" class="tra001-two-cards-wrap" style="width:100%;border-radius:8px;justify-content:flex-start;align-items:stretch;gap:12px;display:flex;margin-bottom:20px;">' +
      // Card 1: Izquierda (Intendencia & Fecha)
      '<div style="flex:1 1 0;min-width:0;align-self:stretch;padding:8px 16px;background:white;border:1px solid rgba(32,32,32,0.12);border-radius:8px;flex-direction:column;justify-content:center;align-items:flex-start;display:inline-flex;">' +
        // Row 1: INTENDENCIA
        '<div data-content="Text" data-layout="Inline" style="align-self:stretch;flex-direction:column;justify-content:flex-start;align-items:flex-start;display:flex;">' +
          '<div style="align-self:stretch;min-height:36px;padding:6px 0;border-radius:8px;justify-content:flex-start;align-items:center;gap:8px;display:inline-flex;">' +
            '<div style="width:140px;max-width:180px;min-width:80px;min-height:24px;flex-direction:column;justify-content:center;align-items:flex-start;display:inline-flex;">' +
              '<div style="min-height:16px;padding:0 4px;border-radius:8px;justify-content:center;align-items:center;display:inline-flex;">' +
                '<div style="color:#6F6F71;font-size:12px;font-family:Inter,sans-serif;font-weight:500;letter-spacing:0.5px;">INTENDENCIA</div>' +
              '</div>' +
            '</div>' +
            '<div style="flex:1 1 0;overflow:hidden;justify-content:flex-start;align-items:center;display:flex;">' +
              '<div style="color:#353537;font-size:14px;font-family:Inter,sans-serif;font-weight:700;text-transform:uppercase;line-height:20px;letter-spacing:0.5px;">ILM LIMA METROPOLITANA</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        // Row 2: FECHA
        '<div data-content="Text" data-layout="Inline" style="align-self:stretch;flex-direction:column;justify-content:flex-start;align-items:flex-start;display:flex;">' +
          '<div style="align-self:stretch;min-height:36px;padding:6px 0;border-radius:8px;justify-content:flex-start;align-items:center;gap:8px;display:inline-flex;">' +
            '<div style="width:140px;max-width:180px;min-width:80px;min-height:24px;flex-direction:column;justify-content:center;align-items:flex-start;display:inline-flex;">' +
              '<div style="min-height:16px;padding:0 4px;border-radius:8px;justify-content:center;align-items:center;display:inline-flex;">' +
                '<div style="color:#6F6F71;font-size:12px;font-family:Inter,sans-serif;font-weight:500;letter-spacing:0.5px;">FECHA</div>' +
              '</div>' +
            '</div>' +
            '<div style="flex:1 1 0;overflow:hidden;justify-content:flex-start;align-items:center;display:flex;">' +
              '<div style="color:#353537;font-size:14px;font-family:Inter,sans-serif;font-weight:700;line-height:20px;">' + esc(d.fecha) + ' &nbsp; ' + esc(d.hora || '09:30') + '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +

      // Card 2: Derecha (Origen & Estado)
      '<div style="width:384px;flex-shrink:0;align-self:stretch;padding:8px 16px;background:white;border:1px solid rgba(32,32,32,0.12);border-radius:8px;flex-direction:column;justify-content:center;align-items:flex-start;display:inline-flex;">' +
        // Row 1: ORIGEN
        '<div data-content="Text" data-layout="Inline" style="align-self:stretch;flex-direction:column;justify-content:flex-start;align-items:flex-start;display:flex;">' +
          '<div style="align-self:stretch;min-height:36px;padding:6px 0;border-radius:8px;justify-content:flex-start;align-items:center;gap:8px;display:inline-flex;">' +
            '<div style="width:100px;min-height:24px;flex-direction:column;justify-content:center;align-items:flex-start;display:inline-flex;">' +
              '<div style="min-height:16px;padding:0 4px;border-radius:8px;justify-content:center;align-items:center;display:inline-flex;">' +
                '<div style="color:#6F6F71;font-size:12px;font-family:Inter,sans-serif;font-weight:500;letter-spacing:0.5px;">ORIGEN</div>' +
              '</div>' +
            '</div>' +
            '<div style="flex:1 1 0;overflow:hidden;justify-content:flex-start;align-items:center;display:flex;">' +
              orgBadge(d.origen) +
            '</div>' +
          '</div>' +
        '</div>' +
        // Row 2: ESTADO
        '<div data-content="Text" data-layout="Inline" style="align-self:stretch;flex-direction:column;justify-content:flex-start;align-items:flex-start;display:flex;">' +
          '<div style="align-self:stretch;min-height:36px;padding:6px 0;border-radius:8px;justify-content:flex-start;align-items:center;gap:8px;display:inline-flex;">' +
            '<div style="width:100px;min-height:24px;flex-direction:column;justify-content:center;align-items:flex-start;display:inline-flex;">' +
              '<div style="min-height:16px;padding:0 4px;border-radius:8px;justify-content:center;align-items:center;display:inline-flex;">' +
                '<div style="color:#6F6F71;font-size:12px;font-family:Inter,sans-serif;font-weight:500;letter-spacing:0.5px;">ESTADO</div>' +
              '</div>' +
            '</div>' +
            '<div style="flex:1 1 0;overflow:hidden;justify-content:flex-start;align-items:center;display:flex;">' +
              stBadge(d.estado) +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

    // 2. Card Principal del Formulario (Abajo)
    var formCard = '<div class="card" style="padding:0;margin-bottom:20px;background:white;border:1px solid rgba(32,32,32,0.12);border-radius:8px;">' +
      // Header de Sección
      '<div style="width:100%;min-height:52px;padding:16px 24px 12px;border-bottom:1px solid rgba(32,32,32,0.12);display:flex;justify-content:flex-start;align-items:center;box-sizing:border-box;">' +
        '<div style="color:var(--sys-color-text-neutral-high, #252220);font-size:16px;font-family:Inter,sans-serif;font-weight:600;line-height:24px;">' +
          (D.mode === 'view' ? 'Detalle del registro de datos' : (D.mode === 'edit' ? 'Datos del registro a editar' : 'Datos del registro')) +
        '</div>' +
      '</div>' +
      // Contenido del Formulario
      '<div style="padding:24px;display:flex;flex-direction:column;gap:24px;">' +
        // Sección Tabla Maestra
        '<div>' +
          '<div style="font-size:13px;font-weight:700;color:#06396E;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:14px;font-family:Inter,sans-serif;">TABLA MAESTRA</div>' +
          '<div class="fgrid g1" style="max-width:540px;">' +
            tablaField +
            '<div style="margin-top:10px;display:flex;align-items:center;gap:8px;">' +
              '<input type="checkbox" id="d2f-needs-approval" ' + (d.needsApproval ? 'checked' : '') + ' disabled style="width:16px;height:16px;accent-color:#06396E;cursor:not-allowed;">' +
              '<label for="d2f-needs-approval" style="font-size:13px;color:#475569;cursor:not-allowed;">' +
                'Esta estructura necesita la aprobación de un aprobador <span style="font-size:11.5px;color:#64748B;font-style:italic;">(Heredado de la estructura)</span>' +
              '</label>' +
            '</div>' +
          '</div>' +
        '</div>' +
        // Sección Valores de los Campos
        '<div>' +
          '<div style="font-size:13px;font-weight:700;color:#06396E;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:14px;font-family:Inter,sans-serif;">VALORES DE LOS CAMPOS</div>' +
          '<div class="fgrid g2" style="gap:16px 20px;">' + fInputs + '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

    mount.innerHTML = bannerHtml + headerCard + formCard;

    var chkNeedsApp = document.getElementById('d2f-needs-approval');
    if(chkNeedsApp){
      chkNeedsApp.checked = !!d.needsApproval;
    }

    updateStepButtons();
  }

  function updateStepButtons(){
    if(!D.draft) return;
    D.currentRole = getCurrentRole();
    var d = D.draft;
    var isRoleAprobador = D.currentRole.toLowerCase() === 'aprobador';
    var isRoleCreador = D.currentRole.toLowerCase() === 'creador';
    var isReadOnly = D.mode === 'view' || d.estado === 'Rechazado' || (d.estado === 'Validado' && !isRoleAprobador) || d.estado === 'Aprobado';

    var btnSave = document.getElementById('btn-save-tra002');
    if(btnSave){
      btnSave.style.display = isReadOnly ? 'none' : 'inline-flex';
      btnSave.disabled = isReadOnly;
      btnSave.style.opacity = isReadOnly ? '0.5' : '1';
      btnSave.style.cursor = isReadOnly ? 'not-allowed' : 'pointer';
    }

    var btnVal = document.getElementById('btn-validate-tra002');
    if(btnVal){
      if(isReadOnly || !isRoleCreador){
        btnVal.style.display = 'none';
      } else {
        btnVal.style.display = 'inline-flex';
        var canValidate = !!(D.draftSaved && D.draft && (D.draft.estado === 'Elaboración' || D.draft.estado === 'Observado'));
        btnVal.disabled = !canValidate;
        btnVal.style.opacity = canValidate ? '1' : '0.4';
        btnVal.style.cursor = canValidate ? 'pointer' : 'not-allowed';
        btnVal.title = canValidate ? 'Validar registro' : 'Debe guardar el registro antes de validar.';
      }
    }

    var canCreatorApprove = isRoleCreador && d.estado === 'Validado' && !d.needsApproval;
    var showApproverActions = isRoleAprobador && d.estado === 'Validado';

    var btnApp = document.getElementById('btn-approve-tra002');
    var btnObs = document.getElementById('btn-observe-tra002');
    var btnRej = document.getElementById('btn-reject-tra002');

    if(btnApp) btnApp.style.display = (showApproverActions || canCreatorApprove) ? 'inline-flex' : 'none';
    if(btnObs) btnObs.style.display = showApproverActions ? 'inline-flex' : 'none';
    if(btnRej) btnRej.style.display = 'none';
  }

  function syncForm(){
    if(!D.draft) return;
    var d = D.draft;
    d.values = d.values || {};
    var config = getTableConfig(d.tabla);
    if(config && config.fields){
      config.fields.forEach(function(f){
        var el = document.getElementById('d2f-' + f.name);
        if(el) d.values[f.name] = el.value;
      });
    }
  }

  function saveManual(){
    syncForm();
    var d = D.draft;
    if(!d.tabla){
      var wrapT = document.getElementById('wrap-d2f-tabla');
      if(wrapT) wrapT.classList.add('is-error');
      toast('Debe seleccionar una tabla maestra obligatoriamente.', 'err');
      return;
    }
    var config = getTableConfig(d.tabla), fields = config.fields, hasErr = false;
    fields.forEach(function(f){
      var v = (d.values[f.name] || '').trim();
      var wrap = document.getElementById('wrap-d2f-' + f.name);
      if(f.req && !v){
        if(wrap) wrap.classList.add('is-error');
        hasErr = true;
      } else if(wrap) {
        wrap.classList.remove('is-error');
      }
    });
    if(hasErr){ toast('Complete los campos obligatorios del formulario.', 'err'); return; }

    d.needsApproval = getTableNeedsApproval(d.tabla);

    if(D.mode === 'edit'){
      var o = find(D.origId);
      if(o && o.estado !== 'Elaboración' && o.estado !== 'Observado'){
        var newId = uid();
        var newRec = {
          id: newId,
          tabla: d.tabla,
          origen: 'Individual',
          tipo: 'Modificación',
          estado: 'Elaboración',
          fecha: today(),
          hora: nowTime(),
          needsApproval: d.needsApproval,
          values: JSON.parse(JSON.stringify(d.values))
        };
        D.data.unshift(newRec);
        D.origId = newId;
        d.id = newId;
        d.tipo = 'Modificación';
        d.estado = 'Elaboración';
        toast('RN-DT-005 · Se registró una <b>Modificación</b> en Elaboración; el registro original se conserva como histórico.', 'ok');
      } else if(o){
        o.values = JSON.parse(JSON.stringify(d.values));
        o.fecha = today();
        o.hora = nowTime();
        o.needsApproval = d.needsApproval;
        toast('Cambios guardados en el registro (' + o.estado + ').', 'ok');
      }
    } else {
      var newRecId = uid();
      var createdRec = {
        id: newRecId,
        tabla: d.tabla,
        origen: 'Individual',
        tipo: 'Creación',
        estado: 'Elaboración',
        fecha: today(),
        hora: nowTime(),
        needsApproval: d.needsApproval,
        values: JSON.parse(JSON.stringify(d.values))
      };
      D.data.unshift(createdRec);
      d.id = newRecId;
      D.origId = newRecId;
      D.mode = 'edit';
      toast('RN-DT-001 · Registro creado en estado Elaboración. Ya puedes Validar.', 'ok');
    }

    D.draftSaved = true;
    renderList();
    renderForm();
    updateStepButtons();
  }

  function openValidateModal(id){
    var r = find(id);
    if(!r) return;
    if(r.estado !== 'Elaboración' && r.estado !== 'Observado'){
      toast('RN-DT-009 · La validación solo se ejecuta sobre registros en Elaboración u Observados.', 'err');
      return;
    }

    var sendsToApprover = !!r.needsApproval;
    var html = '<div style="display:flex;flex-direction:column;gap:14px;padding:4px 0;">' +
      '<div style="display:flex;align-items:center;gap:12px;">' +
        '<div style="width:40px;height:40px;padding:8px;background:#D7F5E8;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
          CHECK +
        '</div>' +
        '<div style="color:#252220;font-size:18px;font-family:Inter,sans-serif;font-weight:600;line-height:24px;">¿Validar el registro de ' + esc(r.tabla) + '?</div>' +
      '</div>' +
      '<div style="color:#252220;font-size:14px;font-family:Inter,sans-serif;font-weight:400;line-height:20px;">' +
        (sendsToApprover
          ? 'El registro pasará a estado <b>Validado</b> y se remitirá a la bandeja del <b>Aprobador</b> para su evaluación.'
          : 'El registro pasará a estado <b>Validado</b>. Al no requerir aprobador externo, podrás proceder inmediatamente con su <b>Aprobación</b>.') +
      '</div>' +
      buildFigmaInfoMessage('¿Qué implica validar el registro?', 'Permite certificar que los datos ingresados cumplen con los requerimientos técnicos para su posterior aprobación.') +
    '</div>';

    modal(html, function(){
      r.estado = 'Validado';
      r.fecha = today();
      r.hora = nowTime();
      if(D.draft && D.draft.id === r.id){
        D.draft.estado = 'Validado';
        D.draft.fecha = r.fecha;
        D.draft.hora = r.hora;
      }
      renderList();
      if(sendsToApprover){
        toast('RN-DT-009 · Registro de <b>' + esc(r.tabla) + '</b> validado y remitido al Aprobador.', 'ok');
        window.go('tra002-list');
      } else {
        toast('RN-DT-009 · Registro <b>Validado</b>. Ahora puedes proceder a <b>Aprobarlo</b>.', 'ok');
        renderForm();
        updateStepButtons();
      }
      return true;
    }, 'Validar');
  }

  function openDirectApproveModal(id){
    var r = find(id);
    if(!r) return;
    if(r.estado !== 'Validado'){
      toast('Solo pueden evaluarse registros en estado Validado.', 'err');
      return;
    }

    var html = '<div style="display:flex;flex-direction:column;gap:14px;">' +
      '<div style="display:flex;flex-direction:column;gap:10px;">' +
        '<div style="font-size:14px;font-weight:600;color:#252220;font-family:Inter,sans-serif;">Modalidad de vigencia:</div>' +
        '<div style="display:flex;gap:20px;">' +
          '<label style="display:inline-flex;align-items:center;gap:8px;font-size:14px;font-family:Inter,sans-serif;color:#334155;cursor:pointer;">' +
            '<input type="radio" name="eval-apr-mode" value="inmediata" checked style="margin-left:0;accent-color:#06396E;" onchange="document.getElementById(\'eval-apr-date-box\').style.display=\'none\';">' +
            '<span>Vigencia Inmediata</span>' +
          '</label>' +
          '<label style="display:inline-flex;align-items:center;gap:8px;font-size:14px;font-family:Inter,sans-serif;color:#334155;cursor:pointer;">' +
            '<input type="radio" name="eval-apr-mode" value="programada" style="accent-color:#06396E;" onchange="document.getElementById(\'eval-apr-date-box\').style.display=\'block\';">' +
            '<span>Vigencia Programada</span>' +
          '</label>' +
        '</div>' +
        '<div id="eval-apr-date-box" style="display:none;margin-top:6px;">' +
          '<label style="font-size:13px;color:#475569;font-weight:500;font-family:Inter,sans-serif;margin-bottom:4px;display:block;">Fecha de inicio de vigencia <span style="color:#D51317;">*</span></label>' +
          '<input type="date" id="eval-apr-date" value="' + today().split('/').reverse().join('-') + '" style="width:100%;padding:8px 12px;border-radius:6px;border:1px solid #CBD5E1;font-size:13.5px;font-family:Inter,sans-serif;outline:none;background:white;box-sizing:border-box;">' +
        '</div>' +
      '</div>' +
      buildFigmaInfoMessage('¿Qué implica aprobar el registro?', 'Permite dar conformidad formal al registro de datos e incorporarlo al catálogo oficial vigente de Tablas Maestras del SIIT.') +
    '</div>';

    openDrawer({
      width: '400px',
      title: 'Aprobar registro de ' + esc(r.tabla),
      subtitle: esc(regOf(r.tabla, r.values)),
      bodyHtml: html,
      saveText: 'Aprobar registro',
      onSave: function(){
        var rProg = document.querySelector('input[name="eval-apr-mode"]:checked');
        var isProg = rProg && rProg.value === 'programada';
        if(isProg){
          var dtEl = document.getElementById('eval-apr-date');
          var dt = dtEl ? dtEl.value : '';
          if(!dt){ toast('Indique la fecha de vigencia para la aprobación programada.', 'err'); return false; }
          var parts = dt.split('-');
          var fmtDate = parts.length === 3 ? parts[2] + '/' + parts[1] + '/' + parts[0] : dt;
          r.estado = 'Aprobado';
          r.fechaVigencia = fmtDate;
          r.fecha = today();
          if(D.draft && D.draft.id === r.id){ D.draft.estado = 'Aprobado'; D.draft.fechaVigencia = fmtDate; }
          renderList();
          toast('Registro de <b>' + esc(r.tabla) + '</b> aprobado (vigente desde ' + fmtDate + ').', 'ok');
        } else {
          r.estado = 'Aprobado';
          r.fecha = today();
          if(D.draft && D.draft.id === r.id){ D.draft.estado = 'Aprobado'; }
          renderList();
          toast('Registro de <b>' + esc(r.tabla) + '</b> aprobado de inmediato e incorporado formalmente.', 'ok');
        }
        var currScreen = document.querySelector('.screen.on');
        var isInForm = currScreen && currScreen.id === 'tra002-form';
        if(isInForm && D.draft && D.draft.id === r.id){
          renderForm();
          updateStepButtons();
        } else {
          if (window.go) window.go('tra002-list');
        }
        return true;
      }
    });

    var sBtn = document.getElementById('t001-drawer-save');
    if(sBtn) sBtn.style.background = '#06396E';
  }

  function openDirectObserveModal(id){
    var r = find(id);
    if(!r) return;
    if(r.estado !== 'Validado'){
      toast('Solo pueden evaluarse registros en estado Validado.', 'err');
      return;
    }

    var html = '<div style="display:flex;flex-direction:column;gap:14px;">' +
      '<div style="display:flex;flex-direction:column;gap:6px;">' +
        '<label style="font-size:14px;font-weight:600;color:#1E293B;font-family:Inter,sans-serif;">Motivo de la observación <span style="color:#D51317;">*</span></label>' +
        '<textarea id="eval-obs-motivo" rows="4" placeholder="Detalle las observaciones, precisiones o ajustes requeridos..." style="width:100%;padding:10px 12px;border-radius:8px;border:1px solid #CBD5E1;font-size:13.5px;font-family:Inter,sans-serif;outline:none;resize:vertical;box-sizing:border-box;"></textarea>' +
        '<div id="eval-obs-error" style="display:none;font-size:12px;color:#DC2626;font-weight:500;">Debe ingresar el motivo de la observación para continuar.</div>' +
      '</div>' +
      buildFigmaInfoMessage('¿Qué implica observar el registro?', 'Permite devolver el registro al rol Creador en estado Observado para subsanar los datos solicitados.') +
    '</div>';

    openDrawer({
      width: '400px',
      title: 'Observar registro de ' + esc(r.tabla),
      subtitle: esc(regOf(r.tabla, r.values)),
      bodyHtml: html,
      saveText: 'Observar registro',
      onSave: function(){
        var elMotivo = document.getElementById('eval-obs-motivo');
        var motivo = elMotivo ? elMotivo.value.trim() : '';
        if(!motivo){
          var errEl = document.getElementById('eval-obs-error');
          if(errEl) errEl.style.display = 'block';
          return false;
        }
        r.estado = 'Observado';
        r.obsMotivo = motivo;
        r.obsDate = today();
        if(D.draft && D.draft.id === r.id){ D.draft.estado = 'Observado'; D.draft.obsMotivo = motivo; D.draft.obsDate = today(); }
        renderList();
        toast('Registro de <b>' + esc(r.tabla) + '</b> marcado como Observado. El Creador podrá corregirlo.', 'warn');
        if (window.go) window.go('tra002-list');
        return true;
      }
    });

    var sBtn = document.getElementById('t001-drawer-save');
    if(sBtn) sBtn.style.background = '#06396E';
  }

  function openDirectRejectModal(id){
    var r = find(id);
    if(!r) return;
    if(r.estado !== 'Validado'){
      toast('Solo pueden evaluarse registros en estado Validado.', 'err');
      return;
    }

    var html = '<div style="display:flex;flex-direction:column;gap:14px;">' +
      '<div style="display:flex;flex-direction:column;gap:6px;">' +
        '<label style="font-size:14px;font-weight:600;color:#1E293B;font-family:Inter,sans-serif;">Motivo del rechazo <span style="color:#D51317;">*</span></label>' +
        '<textarea id="eval-rej-motivo" rows="4" placeholder="Detalle el sustento técnico o normativo del rechazo definitivo..." style="width:100%;padding:10px 12px;border-radius:8px;border:1px solid #CBD5E1;font-size:13.5px;font-family:Inter,sans-serif;outline:none;resize:vertical;box-sizing:border-box;"></textarea>' +
        '<div id="eval-rej-error" style="display:none;font-size:12px;color:#DC2626;font-weight:500;">Debe ingresar el motivo del rechazo para continuar.</div>' +
      '</div>' +
      buildFigmaInfoMessage('¿Qué implica rechazar el registro?', 'Permite rechazar de manera definitiva el registro propuesto. El registro quedará archivado únicamente con fines de auditoría e histórico.') +
    '</div>';

    openDrawer({
      width: '400px',
      title: 'Rechazar registro de ' + esc(r.tabla),
      subtitle: esc(regOf(r.tabla, r.values)),
      bodyHtml: html,
      saveText: 'Rechazar registro',
      onSave: function(){
        var elMotivo = document.getElementById('eval-rej-motivo');
        var motivo = elMotivo ? elMotivo.value.trim() : '';
        if(!motivo){
          var errEl = document.getElementById('eval-rej-error');
          if(errEl) errEl.style.display = 'block';
          return false;
        }
        r.estado = 'Rechazado';
        r.rechazoMotivo = motivo;
        r.rechazoDate = today();
        if(D.draft && D.draft.id === r.id){ D.draft.estado = 'Rechazado'; D.draft.rechazoMotivo = motivo; D.draft.rechazoDate = today(); }
        renderList();
        toast('Registro de <b>' + esc(r.tabla) + '</b> rechazado definitivamente.', 'err');
        if (window.go) window.go('tra002-list');
        return true;
      }
    });

    var sBtn = document.getElementById('t001-drawer-save');
    if(sBtn) sBtn.style.background = '#06396E';
  }

  function doDelete(id){
    var r = find(id); if(!r) return;
    if(r.estado !== 'Elaboración' && r.estado !== 'Observado'){
      toast('Solo pueden eliminarse registros en estado Elaboración u Observado.', 'err');
      return;
    }
    
    var html = '<div style="display:flex;flex-direction:column;gap:16px;padding:4px 0;">' +
      '<div style="display:flex;align-items:center;gap:12px;">' +
        '<div style="width:40px;height:40px;padding:8px;background:#FFDBD7;border-radius:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
          '<svg viewBox="0 0 24 24" style="width:20px;height:20px;stroke:#490005;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg>' +
        '</div>' +
        '<div style="color:#252220;font-size:18px;font-family:Inter,sans-serif;font-weight:600;line-height:24px;">¿Eliminar el registro de ' + esc(r.tabla) + '?</div>' +
      '</div>' +
      '<div style="color:#252220;font-size:16px;font-family:Inter,sans-serif;font-weight:400;line-height:24px;padding-left:4px;padding-right:4px;">' +
        'Esta acción es permanente. El registro cambiará a estado <b>Eliminado</b> y se conservará como historial sin posibilidad de recuperarse.' +
      '</div>' +
    '</div>';

    modal(html, function(){
      r.estado = 'Eliminado';
      r.fecha = today();
      renderList();
      toast('Registro de <b>' + esc(r.tabla) + '</b> eliminado.', 'err');
      return true;
    }, 'Eliminar');
  }

  /* ---------- CARGA MASIVA ---------- */
  function openCarga(){
    var tnames = getTNAMES();
    var checkedInp = document.querySelectorAll('#tra002-list-mount tbody .chk:checked');
    var selectedTable = '';
    if(checkedInp.length){
      var tr = checkedInp[0].closest('tr');
      if(tr && tr.getAttribute('data-tb')){
        var cand = tr.getAttribute('data-tb');
        if(tnames.indexOf(cand) !== -1) selectedTable = cand;
      }
    }
    D.carga = {
      tabla: selectedTable,
      descripcion: '',
      file: '',
      rows: null,
      report: null,
      needsApproval: getTableNeedsApproval(selectedTable)
    };
    window.go('tra002-carga');
  }

  function renderCarga(){
    var mount = document.getElementById('tra002-carga-mount'); if(!mount) return;
    var tnames = getTNAMES();
    if(!D.carga) D.carga = { tabla: '', descripcion: '', file: '', rows: null, report: null, needsApproval: false };
    var c = D.carga;
    if(c.tabla && tnames.indexOf(c.tabla) === -1){
      c.tabla = '';
    }
    c.needsApproval = getTableNeedsApproval(c.tabla);
    var tb = c.tabla ? getTableConfig(c.tabla) : { max: 10, fields: [] }, rep = c.report;
    var repHtml = '';

    var isClean = !!(rep && rep.errors && rep.errors.length === 0 && rep.valid && rep.valid.length > 0);
    var topSaveBtn = document.getElementById('d2c-btn-guardar');
    if (topSaveBtn) {
      topSaveBtn.disabled = !isClean;
      if (isClean) {
        topSaveBtn.classList.remove('disabled');
        topSaveBtn.style.opacity = '1';
        topSaveBtn.style.cursor = 'pointer';
      } else {
        topSaveBtn.classList.add('disabled');
        topSaveBtn.style.opacity = '0.5';
        topSaveBtn.style.cursor = 'not-allowed';
      }
    }

    if(rep){
      var errRows = rep.errors.reduce(function(s,e){ if(s.indexOf(e.fila)<0) s.push(e.fila); return s; },[]).length;
      repHtml = '<h3 class="sec-t" style="font-size:13px;font-weight:700;color:#06396E;text-transform:uppercase;letter-spacing:0.5px;margin:20px 0 16px;">RESULTADO DE LA VALIDACIÓN</h3>' +
        '<div class="fgrid g3" style="margin-bottom:18px">' +
          '<div class="f"><label>Registros leídos</label><input value="' + rep.read + '" readonly style="background:#F8FAFC;"></div>' +
          '<div class="f"><label>Registros válidos</label><input value="' + rep.valid.length + '" readonly style="background:#F8FAFC;"></div>' +
          '<div class="f"><label>Registros observados</label><input value="' + errRows + '" readonly style="background:#F8FAFC;"></div>' +
        '</div>' +
        (rep.errors.length ? 
          '<div style="margin-bottom:12px;font-weight:600;font-size:13px;color:#991B1B;">Se encontraron ' + rep.errors.length + ' observación(es) en ' + errRows + ' registro(s). Puedes editar los valores directamente en la columna "VALOR" para corregirlos:</div>' +
          '<div class="tw" style="border:1px solid rgba(32,32,32,0.12);border-radius:4px;overflow:hidden;"><table style="min-width:100%;"><thead><tr><th style="width:70px">FILA</th><th style="width:180px">CAMPO</th><th>VALOR</th><th>OBSERVACIÓN</th></tr></thead><tbody>' +
          rep.errors.map(function(e, idx){
            return '<tr>' +
              '<td class="num" style="font-weight:600;">' + e.fila + '</td>' +
              '<td><span class="badge b-info" style="font-size:11px;">' + esc(e.campo) + '</span></td>' +
              '<td><input class="d2c-obs-edit" data-err-idx="' + idx + '" value="' + esc(e.valor || '') + '" style="width:100%;height:32px;padding:4px 10px;border:1px solid #CBD5E1;border-radius:6px;font-size:13px;outline:none;"></td>' +
              '<td style="color:#991B1B;font-size:12.5px;">' + esc(e.obs) + '</td>' +
            '</tr>';
          }).join('') +
          '</tbody></table></div>'
          : '<p style="font-size:13.5px;color:#004C37;font-weight:600;margin-top:12px;display:flex;align-items:center;gap:8px;background:#D7F5E8;padding:12px 16px;border-radius:8px;">' +
              '<svg viewBox="0 0 24 24" style="width:18px;height:18px;stroke:#004C37;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>' +
              'El archivo no tiene observaciones. Ya puedes grabar la carga.' +
            '</p>');
    }

    var tablaField = buildCustomSelectHtml({
      id: 'd2c-tabla',
      label: 'Tabla maestra',
      options: tnames,
      selectedValue: c.tabla,
      placeholder: 'Seleccionar tabla maestra',
      required: true,
      helperText: 'La tabla maestra es obligatoria.'
    });

    var descField = buildFigmaFieldHtml({
      id: 'd2c-desc',
      label: 'Descripción de la carga',
      value: c.descripcion || '',
      placeholder: 'Ingresa la descripción de la carga masiva',
      required: true,
      maxlength: 200,
      helperText: 'La descripción de la carga es obligatoria.'
    });

    mount.innerHTML =
      '<div class="card" style="margin-bottom:20px;">' +
        '<div class="chead" style="margin-bottom:18px;">' +
          '<h3 style="font-size:13px;font-weight:700;color:#06396E;text-transform:uppercase;letter-spacing:0.5px;margin:0;">CARGAR DATOS DE FORMA MASIVA</h3>' +
        '</div>' +
        '<div class="fgrid g2" style="gap:18px 24px;margin-bottom:18px;align-items:flex-start;">' +
          '<div>' +
            tablaField +
          '</div>' +
          '<div>' +
            descField +
          '</div>' +
          '<div>' +
            '<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">' +
              '<input type="checkbox" id="d2c-needs-approval" ' + (c.needsApproval ? 'checked' : '') + ' disabled style="width:16px;height:16px;accent-color:#06396E;cursor:not-allowed;">' +
              '<label for="d2c-needs-approval" style="font-size:13px;color:#475569;cursor:not-allowed;">' +
                'Esta estructura necesita la aprobación de un aprobador <span style="font-size:11.5px;color:#64748B;font-style:italic;">(Heredado de la estructura)</span>' +
              '</label>' +
            '</div>' +
            '<button class="btn gho" data-d2c="tpl" style="display:inline-flex;align-items:center;gap:8px;padding:8px 14px;font-size:13px;"><svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5M12 15V3"/></svg> Descargar plantilla</button>' +
          '</div>' +
          '<div>' +
            '<div style="width:100%;">' +
              '<div style="font-size:12px;font-weight:600;color:#475569;margin-bottom:6px;display:block;">Seleccionar archivo <span class="req" style="color:#D51317;">*</span></div>' +
              '<div id="d2c-file-drag-zone" data-extend="active" data-helper-text="true" data-mode="Forms" style="width: 100%; display: flex; flex-direction: column; gap: 4px;">' +
                '<div style="display: flex; align-items: center; width: 100%; height: 40px;">' +
                  '<label for="d2c-file" onclick="document.getElementById(\'d2c-file\').click()" style="position:static !important; top:auto !important; left:auto !important; z-index:1 !important; pointer-events:auto !important; cursor:pointer; height: 40px; padding: 0 16px; background: #06396E; border-radius: 8px 0 0 8px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; flex-shrink: 0; margin: 0;">' +
                    '<svg viewBox="0 0 24 24" style="width: 18px; height: 18px; stroke: white; fill: none; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>' +
                    '<span style="color: white; font-size: 14px; font-family: Inter; font-weight: 600; line-height: 20px; white-space: nowrap;">Seleccionar archivo</span>' +
                  '</label>' +
                  '<input type="file" id="d2c-file" accept=".xlsx,.xls,.csv" style="display:none !important">' +
                  '<div style="flex: 1; height: 40px; padding: 0 16px; background: white; border-radius: 0 8px 8px 0; outline: 1px rgba(32, 32, 32, 0.56) solid; outline-offset: -1px; display: flex; align-items: center; overflow: hidden; margin-left: -1px;">' +
                    '<div style="font-size: 14px; font-family: Inter; letter-spacing: 0.02px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" id="d2c-file-display">' +
                      (c.file ? '<span style="color:#1E293B;font-weight:500;">' + esc(c.file) + '</span>' : '<span style="color:#6C6865;font-weight:400;">Ningún archivo seleccionado</span>') +
                    '</div>' +
                  '</div>' +
                '</div>' +
                '<div style="padding-left: 4px; padding-right: 4px; color: #6C6865; font-size: 12px; font-family: Inter; font-weight: 400; margin-top: 2px;">Formatos permitidos: .xlsx, .xls o .csv (máximo de 15 MB)</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        repHtml +
      '</div>';

    var chkCarga = document.getElementById('d2c-needs-approval');
    if(chkCarga){
      chkCarga.checked = !!c.needsApproval;
    }

    var descInp = document.getElementById('d2c-desc');
    var wrapDesc = document.getElementById('wrap-d2c-desc');
    if(descInp){
      descInp.addEventListener('input', function(){
        if(D.carga) D.carga.descripcion = descInp.value;
        if(wrapDesc){
          if(descInp.value.trim().length > 0){
            wrapDesc.classList.add('has-value');
            wrapDesc.classList.remove('is-error');
          } else {
            wrapDesc.classList.remove('has-value');
          }
        }
      });
      descInp.addEventListener('blur', function(){
        if(D.carga) D.carga.descripcion = descInp.value;
        if(wrapDesc){
          if(!descInp.value.trim().length){
            wrapDesc.classList.add('is-error');
          } else {
            wrapDesc.classList.remove('is-error');
          }
        }
      });
    }
  }

  function downloadTemplate(){
    var c = D.carga, tb = getTableConfig(c.tabla);
    var headers = tb.fields.map(function(f){ return f.name; });
    var ejemplo = tb.fields.map(function(f){ return f.ej || ''; });
    var fname = 'plantilla_' + c.tabla.replace(/[^A-Za-z0-9]+/g, '_');
    if(typeof XLSX !== 'undefined'){
      var ws = XLSX.utils.aoa_to_sheet([headers, ejemplo]);
      var wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, 'Plantilla');
      XLSX.writeFile(wb, fname + '.xlsx');
      toast('Plantilla de <b>' + esc(c.tabla) + '</b> descargada (.xlsx).', 'ok');
    } else {
      var csv = headers.join(',') + '\n' + ejemplo.join(',');
      var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = fname + '.csv'; a.click();
      toast('Plantilla de <b>' + esc(c.tabla) + '</b> descargada (.csv).', 'info');
    }
  }

  function readFile(file){
    var c = D.carga;
    var descInp = document.getElementById('d2c-desc');
    if(descInp && c) c.descripcion = descInp.value;
    c.file = file.name; c.report = null;
    var r = new FileReader();
    r.onload = function(ev){
      var rows = [];
      try {
        if(typeof XLSX !== 'undefined'){
          var wb = XLSX.read(ev.target.result, { type: 'array' });
          var ws = wb.Sheets[wb.SheetNames[0]];
          rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '', raw: false });
        } else {
          var text = new TextDecoder('utf-8').decode(ev.target.result);
          rows = text.split(/\r?\n/).filter(function(l){ return l.length; }).map(function(l){ return l.split(/[,;\t]/); });
        }
      } catch(e){ toast('No se pudo leer el archivo. Verifica el formato.', 'err'); return; }
      c.rows = rows;
      renderCarga();
      toast('Archivo <b>' + esc(c.file) + '</b> seleccionado. Presiona <b>Validar archivo</b> para comprobar los datos.', 'info');
    };
    r.readAsArrayBuffer(file);
  }

  function validateFile(){
    var c = D.carga, tb = getTableConfig(c.tabla), rows = c.rows || [];
    if(rows.length < 2){ c.report = { read: 0, valid: [], errors: [{ fila: '—', campo: 'archivo', valor: '', obs: 'El archivo no contiene registros.' }] }; return; }
    var header = rows[0].map(function(h){ return String(h).trim(); });
    var idx = {}; tb.fields.forEach(function(f){ idx[f.name] = header.indexOf(f.name); });
    var body = rows.slice(1).filter(function(rw){ return rw.join('').trim().length; });
    var errors = [], valid = [];
    body.forEach(function(rw, i){
      var fila = i + 2, rowErr = false, values = {};
      tb.fields.forEach(function(f){
        var v = idx[f.name] >= 0 ? String(rw[idx[f.name]] == null ? '' : rw[idx[f.name]]).trim() : '';
        values[f.name] = v;
        if(f.req && !v){ errors.push({ fila: fila, campo: f.name, valor: '', obs: 'Campo obligatorio no informado.', rIdx: i + 1, cIdx: idx[f.name] }); rowErr = true; }
        else if(v && f.max && v.length > f.max){ errors.push({ fila: fila, campo: f.name, valor: v, obs: 'Excede la longitud máxima (' + f.max + ').', rIdx: i + 1, cIdx: idx[f.name] }); rowErr = true; }
      });
      if(rw.length > tb.fields.length){
        var extraCols = rw.slice(tb.fields.length).filter(function(x){ return String(x == null ? '' : x).trim().length > 0; });
        if(extraCols.length > 0){
          errors.push({
            fila: fila,
            campo: 'Columnas fuera de plantilla',
            valor: extraCols.join(', '),
            obs: 'Se detectaron ' + extraCols.length + ' valor(es) adicional(es) en la fila. Elimina el texto sobrante en la casilla para corregirlo.',
            rIdx: i + 1,
            cIdx: tb.fields.length
          });
          rowErr = true;
        }
      }
      if(!rowErr) valid.push(values);
    });
    c.report = { read: body.length, valid: valid, errors: errors };
  }

  function doValidateCarga(userTriggered){
    var c = D.carga;
    var descInp = document.getElementById('d2c-desc');
    if(descInp && c) c.descripcion = descInp.value.trim();

    if(!c || !c.tabla){
      if(userTriggered) toast('Seleccione una tabla maestra antes de realizar la validación.', 'err');
      return;
    }
    if(!c.descripcion){
      var wrapDesc = document.getElementById('wrap-d2c-desc');
      if(wrapDesc) wrapDesc.classList.add('is-error');
      if(userTriggered) toast('La descripción de la carga es obligatoria.', 'err');
      if(descInp) descInp.focus();
      return;
    }
    if(!c.file || !c.rows){
      if(userTriggered) toast('Seleccione un archivo antes de realizar la validación.', 'err');
      return;
    }
    validateFile();
    renderCarga();
    if(userTriggered){
      if(c.report && c.report.errors.length === 0){
        toast('El archivo no tiene observaciones. Ya puedes grabar la carga.', 'ok');
      } else if(c.report){
        var errRows = c.report.errors.reduce(function(s,e){ if(s.indexOf(e.fila)<0) s.push(e.fila); return s; },[]).length;
        toast('Se encontraron observaciones en ' + errRows + ' registro(s). Revisa y corrige los datos en la tabla.', 'warn');
      }
    }
  }

  function grabarCarga(){
    var c = D.carga;
    var descInp = document.getElementById('d2c-desc');
    if(descInp && c) c.descripcion = descInp.value.trim();

    if(!c || !c.descripcion){
      var wrapDesc = document.getElementById('wrap-d2c-desc');
      if(wrapDesc) wrapDesc.classList.add('is-error');
      toast('La descripción de la carga es obligatoria.', 'err');
      if(descInp) descInp.focus();
      return;
    }
    var tb = getTableConfig(c.tabla), rep = c.report; if(!rep) return;
    var errRows = rep.errors.reduce(function(s, e){ if(s.indexOf(e.fila) < 0) s.push(e.fila); return s; }, []).length;
    if(errRows > tb.max){ toast('RN-DT-003 · El archivo excede el máximo de errores permitidos (' + tb.max + '). Corrige y vuelve a cargar.', 'err'); return; }
    if(!rep.valid.length){ toast('No hay registros válidos para grabar.', 'err'); return; }
    var needsAppr = getTableNeedsApproval(c.tabla);
    rep.valid.forEach(function(values){
      D.data.unshift({
        id: uid(),
        tabla: c.tabla,
        descripcionCarga: c.descripcion,
        origen: 'Masivo',
        tipo: 'Creación',
        estado: 'Elaboración',
        fecha: today(),
        hora: nowTime(),
        needsApproval: needsAppr,
        values: values
      });
    });
    toast('RN-DT-004 · Se cargaron <b>' + rep.valid.length + '</b> registros (origen Masivo) en estado Elaboración.', 'ok');
    D.carga = null; renderList(); window.go('tra002-list');
  }

  /* ---------- EVENTS ---------- */
  document.addEventListener('change', function(e){
    var target = e.target;
    if (!target) return;

    if (target.id === 'd2f-tabla') {
      var newVal = target.value;
      syncForm();
      if (D.draft) {
        D.draft.tabla = newVal;
        D.draft.needsApproval = getTableNeedsApproval(newVal);
        D.draft.values = {};
      }
      renderForm();
      return;
    }

    if (target.id === 'd2c-tabla') {
      var descInp = document.getElementById('d2c-desc');
      if (descInp && D.carga) D.carga.descripcion = descInp.value;
      var newVal = target.value;
      if (D.carga) {
        D.carga.tabla = newVal;
        D.carga.needsApproval = getTableNeedsApproval(newVal);
        D.carga.file = '';
        D.carga.rows = null;
        D.carga.report = null;
      }
      renderCarga();
      return;
    }

    if (target.id === 'd2c-file' || target.id === 'd2c-top-file') {
      if (target.files && target.files[0]) {
        readFile(target.files[0]);
      }
    }
  });

  document.addEventListener('input', function(e){
    var inp = e.target;
    if (!inp || !inp.id) return;

    if (inp.id.indexOf('d2f-') === 0) {
      var fField = inp.closest('.figma-field');
      if (fField) {
        var val = (inp.value || '').trim();
        if (val) {
          fField.classList.add('has-value');
          fField.classList.remove('is-error');
        } else {
          fField.classList.remove('has-value');
        }
      }
    }
  });

  document.addEventListener('click', function(e){
    var selectTrigger = e.target.closest('.figma-select-trigger');
    if (selectTrigger) {
      var wrapper = selectTrigger.closest('.figma-select-wrapper');
      var hiddenInp = wrapper ? wrapper.querySelector('input[type="hidden"]') : null;
      var isTra002 = selectTrigger.closest('#tra002-form, #tra002-carga') || (hiddenInp && (hiddenInp.id.indexOf('d2f-') === 0 || hiddenInp.id.indexOf('d2c-') === 0));

      if (isTra002 && wrapper) {
        e._figmaSelectHandled = true;
        var fField = selectTrigger.closest('.figma-field');
        var isOpen = wrapper.classList.contains('is-open');
        document.querySelectorAll('.figma-select-wrapper.is-open').forEach(function(w){
          w.classList.remove('is-open');
          var ff = w.closest('.figma-field');
          if (ff) ff.classList.remove('is-open');
        });
        if (!isOpen) {
          wrapper.classList.add('is-open');
          if (fField) fField.classList.add('is-open');
        }
        return;
      }
    }

    var selectItem = e.target.closest('.figma-select-item');
    if (selectItem) {
      var wrapper = selectItem.closest('.figma-select-wrapper');
      var hiddenInp = wrapper ? wrapper.querySelector('input[type="hidden"]') : null;
      var isTra002 = selectItem.closest('#tra002-form, #tra002-carga') || (hiddenInp && (hiddenInp.id.indexOf('d2f-') === 0 || hiddenInp.id.indexOf('d2c-') === 0));

      if (isTra002 && wrapper) {
        e._figmaSelectItemHandled = true;
        var valSpan = wrapper.querySelector('.figma-select-val');
        var newVal = selectItem.getAttribute('data-val');
        var fField = wrapper.closest('.figma-field');

        if (hiddenInp) hiddenInp.value = newVal;
        if (valSpan) {
          valSpan.textContent = selectItem.querySelector('span') ? selectItem.querySelector('span').textContent : newVal;
          valSpan.classList.remove('is-placeholder');
        }

        wrapper.querySelectorAll('.figma-select-item').forEach(function(it){ it.classList.remove('is-selected'); });
        selectItem.classList.add('is-selected');

        wrapper.classList.remove('is-open');
        if (fField) fField.classList.remove('is-open');

        if (fField) {
          if (newVal) {
            fField.classList.add('has-value');
            fField.classList.remove('is-error');
          } else {
            fField.classList.remove('has-value');
          }
        }

        if (hiddenInp && hiddenInp.id === 'd2f-tabla') {
          syncForm();
          if (D.draft) {
            D.draft.tabla = newVal;
            D.draft.needsApproval = getTableNeedsApproval(newVal);
            D.draft.values = {};
          }
          renderForm();
        }

        if (hiddenInp && hiddenInp.id === 'd2c-tabla') {
          if (D.carga) {
            var descInp = document.getElementById('d2c-desc');
            if (descInp) D.carga.descripcion = descInp.value;
            D.carga.tabla = newVal;
            D.carga.needsApproval = getTableNeedsApproval(newVal);
            D.carga.file = '';
            D.carga.rows = null;
            D.carga.report = null;
          }
          renderCarga();
        }
        return;
      }
    }

    if (!e.target.closest('.figma-select-wrapper')) {
      document.querySelectorAll('#tra002-form .figma-select-wrapper.is-open, #tra002-carga .figma-select-wrapper.is-open').forEach(function(w){
        w.classList.remove('is-open');
        var ff = w.closest('.figma-field');
        if (ff) ff.classList.remove('is-open');
      });
    }

    var el = e.target.closest('[data-d2],[data-d2f],[data-d2c]'); if(!el) return;
    e.preventDefault();
    if(el.getAttribute('data-d2')){
      var a = el.getAttribute('data-d2'), id = el.getAttribute('data-d2id');
      if(a === 'new') openNew();
      else if(a === 'carga'){
        if(el.disabled || el.classList.contains('disabled')) return;
        openCarga();
      }
      else if(a === 'edit') openEdit(id);
      else if(a === 'view') openView(id);
      else if(a === 'delete') doDelete(id);
      return;
    }
    if(el.dataset.d2f){
      if(el.dataset.d2f === 'cancel'){ window.go('tra002-list'); }
      else if(el.dataset.d2f === 'save') saveManual();
      else if(el.dataset.d2f === 'validate'){
        if(el.disabled || el.classList.contains('disabled')) return;
        if(D.draft) openValidateModal(D.draft.id);
      }
      else if(el.dataset.d2f === 'approve'){
        if(D.draft) openDirectApproveModal(D.draft.id);
      }
      else if(el.dataset.d2f === 'observe'){
        if(D.draft) openDirectObserveModal(D.draft.id);
      }
      else if(el.dataset.d2f === 'reject'){
        if(D.draft) openDirectRejectModal(D.draft.id);
      }
      return;
    }
    if(el.dataset.d2c){
      var b = el.dataset.d2c;
      if(b === 'cancel') window.go('tra002-list');
      else if(b === 'tpl') downloadTemplate();
      else if(b === 'validar') doValidateCarga(true);
      else if(b === 'grabar'){
        if(el.disabled || el.classList.contains('disabled')) return;
        grabarCarga();
      }
      return;
    }
  });

  document.addEventListener('input', function(e){
    if(e.target && e.target.classList.contains('d2c-obs-edit')){
      var idx = parseInt(e.target.getAttribute('data-err-idx'), 10);
      var c = D.carga;
      if(c && c.report && c.report.errors && c.report.errors[idx]){
        var errObj = c.report.errors[idx];
        var newVal = (e.target.value || '').trim();
        errObj.valor = newVal;
        if(errObj.rIdx && c.rows && c.rows[errObj.rIdx]){
          if(errObj.campo === 'Columnas fuera de plantilla'){
            if(!newVal){
              var tbCfg = getTableConfig(c.tabla);
              c.rows[errObj.rIdx] = c.rows[errObj.rIdx].slice(0, tbCfg.fields.length);
            }
          } else if(errObj.cIdx !== undefined){
            c.rows[errObj.rIdx][errObj.cIdx] = newVal;
          }
        }
        validateFile();
        var isClean = !!(c.report && c.report.errors.length === 0);
        var topSaveBtn = document.getElementById('d2c-btn-guardar');
        if (topSaveBtn) {
          topSaveBtn.disabled = !isClean;
          if (isClean) {
            topSaveBtn.classList.remove('disabled');
            topSaveBtn.style.opacity = '1';
            topSaveBtn.style.cursor = 'pointer';
            toast('Todos los registros observados han sido corregidos. Ya puedes grabar la carga.', 'ok');
            renderCarga();
          }
        }
      }
    }
  });

  window.addEventListener('siit:rolechange', function(e){
    D.currentRole = getCurrentRole();
    var curr = document.querySelector('.screen.on');
    if(curr && curr.id === 'tra002-list') renderList();
    else if(curr && curr.id === 'tra002-form'){ renderForm(); updateStepButtons(); }
  });

  window.__onShow = window.__onShow || {};
  window.__onShow['tra002-list'] = function(){ renderList(); };
  window.__onShow['tra002-form'] = function(){ renderForm(); };
  window.__onShow['tra002-carga'] = function(){ renderCarga(); };
  seed();
})();
