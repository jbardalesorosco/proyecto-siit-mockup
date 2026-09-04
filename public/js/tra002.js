/* ==========================================================================
   SIIT · GESTOR DE DATOS DE TABLAS MAESTRAS (TRA002)
   ========================================================================== */

(function(){
  var PENCIL = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/><path d="M12 20h9"/></svg>';
  var TRASH = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>';
  var CHECK = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>';
  var APPROVE = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><polyline points="9 14 11 16 15 12"/></svg>';

  var D = { data: [], draft: null, mode: 'create', origId: null, carga: null };

  function uid(){ return 'd' + Math.random().toString(36).slice(2,9); }
  function today(){ var d = new Date(); function p(x){ return String(x).padStart(2,'0'); } return p(d.getDate()) + '/' + p(d.getMonth()+1) + '/' + d.getFullYear(); }
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
    var m = { 'Elaboración': 'b-off', 'Validado': 'b-info', 'Aprobado': 'b-ok', 'Eliminado': 'b-off' };
    return '<span class="badge ' + (m[st] || 'b-off') + '">' + st + '</span>';
  }
  function orgBadge(org){
    if(org === 'Masivo') return '<span class="badge b-info" style="background:#EFF6FF;color:#1E40AF;border:1px solid #BFDBFE">Masivo</span>';
    return '<span class="badge b-off">Individual</span>';
  }

  var CONFIGS = {
    'Ubigeo — Distritos': { max: 10, fields: [{ name: 'ubigeo', req: true, max: 6, ej: '150101' }, { name: 'departamento', req: true, max: 50, ej: 'Lima' }, { name: 'provincia', req: true, max: 50, ej: 'Lima' }, { name: 'distrito', req: true, max: 50, ej: 'San Juan de Miraflores' }] },
    'Tipo de Documento de Identidad': { max: 10, fields: [{ name: 'codigo', req: true, max: 10, ej: 'DNI' }, { name: 'descripcion', req: true, max: 100, ej: 'Documento Nacional de Identidad' }] },
    'Actividad económica — CIIU': { max: 20, fields: [{ name: 'codigo', req: true, max: 10, ej: '4711' }, { name: 'descripcion', req: true, max: 150, ej: 'Venta al por menor en comercios no especializados' }] },
    'Tipos de vía': { max: 10, fields: [{ name: 'codigo', req: true, max: 10, ej: 'AV' }, { name: 'descripcion', req: true, max: 100, ej: 'Avenida' }] },
    'Moneda': { max: 10, fields: [{ name: 'codigo', req: true, max: 10, ej: 'PEN' }, { name: 'descripcion', req: true, max: 100, ej: 'Sol Peruano' }, { name: 'simbolo', req: false, max: 10, ej: 'S/' }] },
    'Estado Civil': { max: 10, fields: [{ name: 'codigo', req: true, max: 10, ej: 'SOL' }, { name: 'descripcion', req: true, max: 100, ej: 'Soltero(a)' }] }
  };

  function getTNAMES(){ return Object.keys(CONFIGS); }
  function getTableConfig(t){ return CONFIGS[t] || { max: 10, fields: [{ name: 'codigo', req: true, max: 10 }, { name: 'descripcion', req: true, max: 100 }] }; }
  function find(id){ for(var i = 0; i < D.data.length; i++) if(D.data[i].id === id) return D.data[i]; return null; }

  function regOf(tabla, values){
    values = values || {};
    var config = getTableConfig(tabla);
    var fs = config.fields.map(function(f){ return values[f.name] || ''; });
    return fs[0] + (fs.length > 1 ? ' — ' + fs.slice(1).filter(Boolean).join(' / ') : '');
  }

  function seed(){
    D.data = [
      { id: uid(), tabla: 'Ubigeo — Distritos', origen: 'Masivo', tipo: 'Creación', estado: 'Aprobado', fecha: '20/07/2026', values: { ubigeo: '150132', departamento: 'Lima', provincia: 'Lima', distrito: 'San Juan de Miraflores' } },
      { id: uid(), tabla: 'Ubigeo — Distritos', origen: 'Masivo', tipo: 'Creación', estado: 'Aprobado', fecha: '20/07/2026', values: { ubigeo: '150137', departamento: 'Lima', provincia: 'Lima', distrito: 'Villa El Salvador' } },
      { id: uid(), tabla: 'Tipo de Documento de Identidad', origen: 'Individual', tipo: 'Creación', estado: 'Aprobado', fecha: '18/07/2026', values: { codigo: 'DNI', descripcion: 'Documento Nacional de Identidad' } },
      { id: uid(), tabla: 'Actividad económica — CIIU', origen: 'Masivo', tipo: 'Modificación', estado: 'Validado', fecha: '22/07/2026', values: { codigo: '4711', descripcion: 'Venta al por menor en comercios no especializados' } },
      { id: uid(), tabla: 'Tipos de vía', origen: 'Individual', tipo: 'Creación', estado: 'Elaboración', fecha: '23/07/2026', values: { codigo: 'AV', descripcion: 'Avenida' } },
      { id: uid(), tabla: 'Moneda', origen: 'Individual', tipo: 'Creación', estado: 'Aprobado', fecha: '24/07/2026', values: { codigo: 'PEN', descripcion: 'Sol Peruano', simbolo: 'S/' } },
      { id: uid(), tabla: 'Estado Civil', origen: 'Individual', tipo: 'Creación', estado: 'Aprobado', fecha: '25/07/2026', values: { codigo: 'SOL', descripcion: 'Soltero(a)' } }
    ];
  }

  function renderList(){
    var mount = document.getElementById('tra002-list-mount');
    if(!mount) return;
    var tnames = getTNAMES();
    var rows = D.data.map(function(r){
      var elim = r.estado === 'Eliminado';
      var a = '<div class="acts">';
      if (!elim) {
        a += '<a title="Editar" data-d2="edit" data-d2id="' + r.id + '" style="color:#06396E;cursor:pointer;">' + PENCIL + '</a>';
        if (r.estado === 'Elaboración') {
          a += '<a title="Validar" data-d2="validate" data-d2id="' + r.id + '" style="color:#0284C7;cursor:pointer;">' + CHECK + '</a>';
        }
        if (r.estado === 'Validado') {
          a += '<a title="Aprobar" data-d2="approve" data-d2id="' + r.id + '" style="color:#16A34A;cursor:pointer;">' + APPROVE + '</a>';
        }
        a += '<a title="Eliminar" data-d2="delete" data-d2id="' + r.id + '" style="color:#D51317;cursor:pointer;">' + TRASH + '</a>';
      } else {
        a += '<span style="font-size:11px;color:var(--ink3);">Eliminado</span>';
      }
      a += '</div>';

      var reg = regOf(r.tabla, r.values);
      var k = (reg + ' ' + r.tabla + ' ' + r.origen + ' ' + r.estado).toLowerCase();
      return '<tr data-k="' + esc(k) + '" data-st="' + r.estado + '" data-tb="' + esc(r.tabla) + '"' + (elim ? ' style="opacity:.5"' : '') + '>' +
        '<td class="lnk"><a data-d2="edit" data-d2id="' + r.id + '">' + esc(reg) + '</a></td>' +
        '<td>' + esc(r.tabla) + '</td>' +
        '<td>' + orgBadge(r.origen) + '</td>' +
        '<td>' + esc(r.tipo) + '</td>' +
        '<td class="num">' + r.fecha + '</td>' +
        '<td>' + stBadge(r.estado) + '</td>' +
        '<td style="text-align:right">' + a + '</td></tr>';
    }).join('');

    mount.innerHTML =
      '<div class="card" style="padding:20px 20px 16px;">' +
        '<div class="tools" style="margin-bottom:20px;">' +
          '<div class="search" style="flex:1;"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg><input id="d2-q" placeholder="Buscar por código, descripción o tabla maestra" style="width:100%;padding:10px 14px 10px 40px;border:1px solid #CBD5E1;border-radius:8px;"></div>' +
        '</div>' +
        '<div class="tw" style="border:1px solid rgba(32,32,32,0.12);border-radius:4px;overflow:hidden;margin-bottom:16px;">' +
          '<table style="min-width:100%;"><thead><tr>' +
            '<th><div class="th-cell"><span class="th-title">REGISTRO</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"></path></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg></div></div></th>' +
            '<th><div class="th-cell"><span class="th-title">TABLA MAESTRA</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"></path></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg></div></div></th>' +
            '<th><div class="th-cell"><span class="th-title">ORIGEN</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"></path></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg></div></div></th>' +
            '<th><div class="th-cell"><span class="th-title">TIPO DE REGISTRO</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"></path></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg></div></div></th>' +
            '<th><div class="th-cell"><span class="th-title">FECHA DE REGISTRO</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"></path></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg></div></div></th>' +
            '<th><div class="th-cell"><span class="th-title">ESTADO</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"></path></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg></div></div></th>' +
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
    var tnames = getTNAMES();
    D.mode = 'create'; D.origId = null;
    D.draft = { id: uid(), tabla: tnames[0], values: {}, origen: 'Individual', tipo: 'Creación', estado: 'Elaboración', fecha: today() };
  }
  function openNew(){ makeDraft(); window.go('tra002-form'); }
  function openEdit(id){
    var r = find(id); if(!r) return;
    if(r.estado === 'Eliminado'){ toast('RN-DT-007 · Un registro Eliminado es irreversible: no puede editarse.', 'err'); return; }
    D.mode = 'edit'; D.origId = id;
    D.draft = { id: r.id, tabla: r.tabla, values: JSON.parse(JSON.stringify(r.values || {})), origen: r.origen, tipo: r.tipo, estado: r.estado, fecha: r.fecha };
    window.go('tra002-form');
  }

  function renderForm(){
    var mount = document.getElementById('tra002-form-mount'); if(!mount) return;
    if(!D.draft) makeDraft();
    var d = D.draft;
    var orig = D.mode === 'edit' ? find(D.origId) : null;
    var willMod = !!(orig && orig.estado !== 'Elaboración');
    var tnames = getTNAMES();
    var config = getTableConfig(d.tabla);
    var fields = config.fields;

    var tablaField = buildCustomSelectHtml({
      id: 'd2f-tabla',
      label: 'Tabla maestra',
      options: tnames,
      selectedValue: d.tabla,
      required: true,
      helperText: 'La tabla maestra es obligatoria.'
    });

    var fInputs = fields.map(function(f){
      return buildFigmaFieldHtml({
        id: 'd2f-' + f.name,
        label: f.name.charAt(0).toUpperCase() + f.name.slice(1),
        value: d.values[f.name] || '',
        placeholder: 'Máx. ' + f.max + ' caracteres',
        required: f.req,
        maxlength: f.max,
        helperText: f.name + ' es obligatorio.'
      });
    }).join('');

    mount.innerHTML =
      '<div class="card" style="margin-bottom:20px;">' +
        '<div class="chead" style="margin-bottom:10px;">' +
          '<h2 style="font-size:13px;font-weight:700;color:#06396E;text-transform:uppercase;letter-spacing:0.5px;margin:0;">' + (D.mode === 'edit' ? 'EDITAR REGISTRO' : 'REGISTRAR SOLICITUD') + '</h2>' +
        '</div>' +
        '<div style="font-size:13px;color:#504C4A;">' +
          'Estado: ' + stBadge(d.estado) + ' · Origen: ' + orgBadge(d.origen) +
        '</div>' +
      '</div>' +

      '<div class="card" style="margin-bottom:20px;">' +
        '<h3 class="sec-t" style="font-size:13px;font-weight:700;color:#06396E;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:18px;">TABLA MAESTRA</h3>' +
        '<div class="fgrid g1" style="max-width:540px;">' + tablaField + '</div>' +
      '</div>' +

      '<div class="card" style="margin-bottom:20px;">' +
        '<h3 class="sec-t" style="font-size:13px;font-weight:700;color:#06396E;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:16px;">VALORES DE LOS CAMPOS</h3>' +
        '<div class="fgrid g2" style="gap:16px 20px;">' + fInputs + '</div>' +
      '</div>';
  }

  function syncForm(){
    var d = D.draft, config = getTableConfig(d.tabla);
    config.fields.forEach(function(f){ var el = document.getElementById('d2f-' + f.name); if(el) d.values[f.name] = el.value; });
  }

  function saveManual(){
    syncForm();
    var d = D.draft, config = getTableConfig(d.tabla), fields = config.fields, hasErr = false;
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
    
    if(D.mode === 'edit'){
      var o = find(D.origId);
      if(o && o.estado !== 'Elaboración'){
        D.data.unshift({ id: uid(), tabla: d.tabla, origen: 'Individual', tipo: 'Modificación', estado: 'Elaboración', fecha: today(), values: d.values });
        toast('RN-DT-005 · Se registró una <b>Modificación</b> en Elaboración; el registro original se conserva como histórico.', 'ok');
      } else if(o){ o.values = d.values; o.fecha = today(); toast('Cambios guardados en el registro (Elaboración).', 'ok'); }
    } else {
      D.data.unshift({ id: uid(), tabla: d.tabla, origen: 'Individual', tipo: 'Creación', estado: 'Elaboración', fecha: today(), values: d.values });
      toast('RN-DT-001 · Registro creado (origen <b>Individual</b>) en estado Elaboración.', 'ok');
    }
    renderList(); window.go('tra002-list');
  }

  function doValidate(id){
    var r = find(id); if(!r) return;
    if(r.estado !== 'Elaboración'){ toast('RN-DT-009 · La validación solo se ejecuta sobre registros en Elaboración.', 'err'); return; }
    r.estado = 'Validado'; r.fecha = today(); renderList(); toast('RN-DT-009 · Registro <b>Validado</b>.', 'ok');
  }

  function doApprove(id){
    var r = find(id); if(!r) return;
    if(r.estado !== 'Validado'){ toast('RN-DT-010 · Solo pueden aprobarse registros en estado Validado.', 'err'); return; }

    var todayStr = new Date().toISOString().split('T')[0];

    var html =
      '<div style="display:flex;flex-direction:column;gap:16px;padding:4px 0;">' +
        '<div style="display:flex;align-items:center;gap:12px;">' +
          '<div style="width:40px;height:40px;padding:8px;background:#D7F5E8;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
            '<svg viewBox="0 0 24 24" style="width:20px;height:20px;stroke:#004C37;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><polyline points="9 14 11 16 15 12"/></svg>' +
          '</div>' +
          '<div style="color:#252220;font-size:18px;font-family:Inter,sans-serif;font-weight:600;line-height:24px;">¿Aprobar el registro de ' + esc(r.tabla) + '?</div>' +
        '</div>' +
        '<div style="color:#252220;font-size:15px;font-family:Inter,sans-serif;font-weight:400;line-height:22px;padding-left:4px;padding-right:4px;">' +
          'Selecciona la modalidad de aprobación para la incorporación de los datos al SIIT.' +
        '</div>' +
        '<div style="display:flex;flex-direction:column;gap:12px;">' +
          '<label style="display:flex;align-items:flex-start;gap:12px;padding:12px 14px;border:1.5px solid #06396E;border-radius:10px;cursor:pointer;background:#FAFCFF" id="opt-inm-lbl">' +
            '<input type="radio" name="appr-type" value="inmediata" checked style="margin-top:3px;accent-color:#06396E">' +
            '<div>' +
              '<div style="font-weight:600;font-size:14px;color:#06396E">Aprobación Inmediata</div>' +
              '<div style="font-size:12.5px;color:#64748B;margin-top:2px">Incorpora los datos de inmediato a los vigentes.</div>' +
            '</div>' +
          '</label>' +
          '<label style="display:flex;align-items:flex-start;gap:12px;padding:12px 14px;border:1.5px solid #CBD5E1;border-radius:10px;cursor:pointer;background:#fff" id="opt-prog-lbl">' +
            '<input type="radio" name="appr-type" value="programada" style="margin-top:3px;accent-color:#06396E">' +
            '<div style="flex:1">' +
              '<div style="font-weight:600;font-size:14px;color:#06396E">Aprobación Programada</div>' +
              '<div style="font-size:12.5px;color:#64748B;margin-top:2px">Permite indicar una fecha a partir de la cual los datos quedan vigentes.</div>' +
              '<div id="appr-date-box" style="display:none;margin-top:12px;padding-top:10px;border-top:1px dashed #CBD5E1">' +
                '<label style="display:block;font-size:12px;font-weight:600;color:#334155;margin-bottom:4px">Fecha de inicio de vigencia</label>' +
                '<input type="date" id="appr-date" value="' + todayStr + '" min="' + todayStr + '" style="width:100%;max-width:220px;padding:8px 10px;border:1px solid #CBD5E1;border-radius:6px;font-size:13px;outline:none">' +
              '</div>' +
            '</div>' +
          '</label>' +
        '</div>' +
      '</div>';

    modal(html, function(){
      var rProg = document.querySelector('input[name="appr-type"][value="programada"]');
      var isProg = rProg && rProg.checked;
      if(isProg){
        var dtInp = document.getElementById('appr-date');
        var dtVal = dtInp ? dtInp.value : '';
        if(!dtVal){ toast('Selecciona una fecha de vigencia válida.', 'err'); return false; }
        var parts = dtVal.split('-');
        var fmtDate = parts.length === 3 ? parts[2] + '/' + parts[1] + '/' + parts[0] : dtVal;
        r.estado = 'Aprobado';
        r.fechaVigencia = fmtDate;
        r.fecha = today();
        renderList();
        toast('Registro de <b>' + esc(r.tabla) + '</b> aprobado (vigencia programada a partir del ' + fmtDate + ').', 'ok');
      } else {
        r.estado = 'Aprobado';
        r.fecha = today();
        renderList();
        toast('Registro de <b>' + esc(r.tabla) + '</b> aprobado de inmediato.', 'ok');
      }
      return true;
    }, 'Aprobar');

    setTimeout(function(){
      var rInm = document.querySelector('input[name="appr-type"][value="inmediata"]');
      var rProg = document.querySelector('input[name="appr-type"][value="programada"]');
      var dateBox = document.getElementById('appr-date-box');
      var lblInm = document.getElementById('opt-inm-lbl');
      var lblProg = document.getElementById('opt-prog-lbl');

      function updateOpt(){
        if(rProg && rProg.checked){
          if(dateBox) dateBox.style.display = 'block';
          if(lblProg) { lblProg.style.borderColor = '#06396E'; lblProg.style.background = '#FAFCFF'; }
          if(lblInm) { lblInm.style.borderColor = '#CBD5E1'; lblInm.style.background = '#fff'; }
        } else {
          if(dateBox) dateBox.style.display = 'none';
          if(lblInm) { lblInm.style.borderColor = '#06396E'; lblInm.style.background = '#FAFCFF'; }
          if(lblProg) { lblProg.style.borderColor = '#CBD5E1'; lblProg.style.background = '#fff'; }
        }
      }

      if(rInm) rInm.addEventListener('change', updateOpt);
      if(rProg) rProg.addEventListener('change', updateOpt);
    }, 20);
  }

  function doDelete(id){
    var r = find(id); if(!r) return;
    if(r.estado !== 'Elaboración'){ toast('Solo pueden eliminarse registros en estado Elaboración.', 'err'); return; }
    
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
    var selectedTable = tnames[0];
    if(checkedInp.length){
      var tr = checkedInp[0].closest('tr');
      if(tr && tr.getAttribute('data-tb')) selectedTable = tr.getAttribute('data-tb');
    }
    D.carga = { tabla: selectedTable, file: '', rows: null, report: null };
    window.go('tra002-carga');
  }

  function renderCarga(){
    var mount = document.getElementById('tra002-carga-mount'); if(!mount) return;
    var tnames = getTNAMES();
    if(!D.carga) D.carga = { tabla: tnames[0], file: '', rows: null, report: null };
    var c = D.carga, tb = getTableConfig(c.tabla), rep = c.report;
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
      required: true,
      helperText: 'La tabla maestra es obligatoria.'
    });

    mount.innerHTML =
      '<div class="card" style="margin-bottom:20px;">' +
        '<div class="chead" style="margin-bottom:18px;">' +
          '<h3 style="font-size:13px;font-weight:700;color:#06396E;text-transform:uppercase;letter-spacing:0.5px;margin:0;">CARGAR DATOS DE FORMA MASIVA</h3>' +
        '</div>' +
        '<div class="fgrid g2" style="gap:16px 20px;margin-bottom:18px;align-items:flex-start;">' +
          '<div>' +
            tablaField +
            '<button class="btn gho" data-d2c="tpl" style="display:inline-flex;align-items:center;gap:8px;padding:8px 14px;font-size:13px;margin-top:10px;"><svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5M12 15V3"/></svg> Descargar plantilla</button>' +
          '</div>' +
          '<div>' +
            '<div style="margin-top: -17px;width:100%;">' +
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
    var c = D.carga; c.file = file.name; c.report = null;
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
    if(!c || !c.file || !c.rows){
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
    var c = D.carga, tb = getTableConfig(c.tabla), rep = c.report; if(!rep) return;
    var errRows = rep.errors.reduce(function(s, e){ if(s.indexOf(e.fila) < 0) s.push(e.fila); return s; }, []).length;
    if(errRows > tb.max){ toast('RN-DT-003 · El archivo excede el máximo de errores permitidos (' + tb.max + '). Corrige y vuelve a cargar.', 'err'); return; }
    if(!rep.valid.length){ toast('No hay registros válidos para grabar.', 'err'); return; }
    rep.valid.forEach(function(values){ D.data.unshift({ id: uid(), tabla: c.tabla, origen: 'Masivo', tipo: 'Creación', estado: 'Elaboración', fecha: today(), values: values }); });
    toast('RN-DT-004 · Se cargaron <b>' + rep.valid.length + '</b> registros (origen Masivo) en estado Elaboración.', 'ok');
    D.carga = null; renderList(); window.go('tra002-list');
  }

  /* ---------- EVENTS ---------- */
  document.addEventListener('change', function(e){
    if (e.target && (e.target.id === 'd2c-file' || e.target.id === 'd2c-top-file')) {
      if (e.target.files && e.target.files[0]) {
        readFile(e.target.files[0]);
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
      if (!e._figmaSelectHandled) {
        e._figmaSelectHandled = true;
        var wrapper = selectTrigger.closest('.figma-select-wrapper');
        var fField = selectTrigger.closest('.figma-field');
        if (wrapper) {
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
        }
      }
      return;
    }

    var selectItem = e.target.closest('.figma-select-item');
    if (selectItem) {
      if (!e._figmaSelectItemHandled) {
        e._figmaSelectItemHandled = true;
        var wrapper = selectItem.closest('.figma-select-wrapper');
        if (wrapper) {
          var hiddenInp = wrapper.querySelector('input[type="hidden"]');
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
              D.draft.values = {};
            }
            renderForm();
          }

          if (hiddenInp && hiddenInp.id === 'd2c-tabla') {
            if (D.carga) {
              D.carga.tabla = newVal;
              D.carga.file = '';
              D.carga.rows = null;
              D.carga.report = null;
            }
            renderCarga();
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
      else if(a === 'validate') doValidate(id);
      else if(a === 'approve') doApprove(id);
      else if(a === 'delete') doDelete(id);
      return;
    }
    if(el.dataset.d2f){
      if(el.dataset.d2f === 'cancel'){ window.go('tra002-list'); }
      else if(el.dataset.d2f === 'save') saveManual();
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

  window.__onShow = window.__onShow || {};
  window.__onShow['tra002-list'] = function(){ renderList(); };
  window.__onShow['tra002-form'] = function(){ renderForm(); };
  window.__onShow['tra002-carga'] = function(){ renderCarga(); };
  seed();
})();
