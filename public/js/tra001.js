(function(){
  var PENCIL = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/><path d="M12 20h9"/></svg>';
  var TRASH = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>';
  var EYE = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M3 7V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2"/><path d="M3 17v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2"/><path d="M6 12c1.5-3.5 3.8-5 6-5s4.5 1.5 6 5c-1.5 3.5-3.8 5-6 5s-4.5-1.5-6-5Z"/><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/></svg>';
  var DOTS = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>';
  var CHECK = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M20 6L9 17l-5-5"/></svg>';
  var VALIDATE = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>';
  var APPROVE = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><polyline points="9 14 11 16 15 12"/></svg>';
  var ICON_FILE_CHECK = '<svg viewBox="0 0 24 24" style="width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><polyline points="9 15 11.5 17.5 15.5 12.5"/></svg>';
  var ICON_FILE_SEARCH = '<svg viewBox="0 0 24 24" style="width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><circle cx="11.5" cy="14.5" r="2.5"/><line x1="13.3" y1="16.3" x2="16" y2="19"/></svg>';
  var ICON_FILE_X = '<svg viewBox="0 0 24 24" style="width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="9.5" y1="12.5" x2="14.5" y2="17.5"/><line x1="14.5" y1="12.5" x2="9.5" y2="17.5"/></svg>';
  var LOCK = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>';
  var TYPES = ['Texto', 'Fecha', 'Numérico', 'Numérico decimal'];

  function getCurrentRole(){
    if(window.CURRENT_ROLE) return window.CURRENT_ROLE;
    var el = document.getElementById('tb-current-role');
    if(el && el.textContent.indexOf('Aprobador') !== -1) return 'Aprobador';
    return 'Creador';
  }

  var S = { seq: 9, structures: [], draft: null, mode: 'create', origId: null, tab: 1, step: 1, currentRole: 'Creador' };

  function pad(n){ n = String(n); while(n.length < 4) n = '0' + n; return n; }
  function code(n){ return 'TM-' + pad(n); }
  function uid(){ return 'x' + Math.random().toString(36).slice(2,9); }
  function today(){ var d = new Date(); function p(x){ return String(x).padStart(2,'0'); } return p(d.getDate()) + '/' + p(d.getMonth()+1) + '/' + d.getFullYear(); }
  function nowTime(){ var d = new Date(); function p(x){ return String(x).padStart(2,'0'); } return p(d.getHours()) + ':' + p(d.getMinutes()); }
  function esc(s){ return (s == null ? '' : String(s)).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function val(id){ var el = document.getElementById(id); return el ? el.value : ''; }
  function chk(id){ var el = document.getElementById(id); return !!(el && el.checked); }
  function opt(arr, sel){ return arr.map(function(v){ var l = v === '' ? '—' : v; return '<option value="' + esc(v) + '"' + (v === sel ? ' selected' : '') + '>' + esc(l) + '</option>'; }).join(''); }
  function find(id){ for(var i = 0; i < S.structures.length; i++) if(S.structures[i].id === id) return S.structures[i]; return null; }
  function clone(o){ return JSON.parse(JSON.stringify(o)); }

  function newGroup(o){ o = o || {}; return { id: uid(), name: o.name || '', desc: o.desc || '', locked: !!o.locked }; }
  function newField(o){ o = o || {}; return { id: uid(), name: o.name || '', type: o.type || 'Texto', min: (o.min == null ? '' : o.min), max: (o.max == null ? '' : o.max), required: !!o.required, group: o.group || 'Grupo General', sensitive: !!o.sensitive, active: o.active !== false }; }

  function seed(){
    S.structures = [
      {
        id: uid(), code: 'TM-0009', name: 'Tipos de vía', ref: 'TIPOS_VIA', alcance: 'Nacional', maxErr: 10, desc: 'Catálogo de tipos de vía para direcciones del SIIT.', type: 'Creación', state: 'Elaboración', date: '10/08/2026', needsApproval: true, sustentoFile: 'INFORME_TECNICO_TIPOS_VIA.pdf', obsMotivo: '', rechazoMotivo: '',
        groups: [newGroup({ name: 'Grupo General', locked: true })],
        fields: [
          newField({ name: 'Código', type: 'Texto', min: 1, max: 10, required: true, group: 'Grupo General' }),
          newField({ name: 'Descripción', type: 'Texto', min: 1, max: 100, required: true, group: 'Grupo General' })
        ]
      },
      {
        id: uid(), code: 'TM-0008', name: 'Actividad económica — CIIU', ref: 'CIIU', alcance: 'Nacional', maxErr: 20, desc: 'Clasificación Industrial Internacional Uniforme.', type: 'Creación', state: 'Observado', date: '08/08/2026', needsApproval: true, sustentoFile: 'SUSTENTO_CIIU_REV4.pdf', obsMotivo: 'Se requiere precisar la descripción del grupo de atributos y corroborar que los códigos numéricos mantengan 4 dígitos estándar.', obsDate: '08/08/2026', rechazoMotivo: '',
        groups: [newGroup({ name: 'Grupo General', locked: true })],
        fields: [
          newField({ name: 'Código', type: 'Texto', min: 4, max: 10, required: true, group: 'Grupo General' }),
          newField({ name: 'Descripción', type: 'Texto', min: 3, max: 150, required: true, group: 'Grupo General' })
        ]
      },
      {
        id: uid(), code: 'TM-0007', name: 'Ubigeo — Distritos', ref: 'UBIGEO_DIST', alcance: 'Nacional', maxErr: 10, desc: 'Distritos y su código de ubicación geográfica.', type: 'Creación', state: 'Rechazado', date: '07/08/2026', needsApproval: true, sustentoFile: 'EXP_UBIGEO_2026.pdf', obsMotivo: '', rechazoMotivo: 'La estructura propuesta colisiona con el catálogo oficial de RENIEC/INEI vigente en la plataforma interoperable del Estado.', rechazoDate: '07/08/2026',
        groups: [newGroup({ name: 'Grupo General', locked: true })],
        fields: [
          newField({ name: 'Ubigeo', type: 'Texto', min: 6, max: 6, required: true, group: 'Grupo General' }),
          newField({ name: 'Departamento', type: 'Texto', min: 1, max: 50, required: true, group: 'Grupo General' }),
          newField({ name: 'Provincia', type: 'Texto', min: 1, max: 50, required: true, group: 'Grupo General' }),
          newField({ name: 'Distrito', type: 'Texto', min: 1, max: 50, required: true, group: 'Grupo General' })
        ]
      },
      {
        id: uid(), code: 'TM-0006', name: 'Departamento', ref: 'DEPTO', alcance: 'Nacional', maxErr: 10, desc: 'Catálogo de departamentos del Perú.', type: 'Creación', state: 'Elaboración', date: '06/08/2026', needsApproval: true, sustentoFile: 'SUSTENTO_DEPTO_V1.pdf', obsMotivo: '', rechazoMotivo: '',
        groups: [newGroup({ name: 'Grupo General', locked: true })],
        fields: [
          newField({ name: 'Código', type: 'Texto', min: 2, max: 6, required: true, group: 'Grupo General' }),
          newField({ name: 'Nombre', type: 'Texto', min: 1, max: 60, required: true, group: 'Grupo General' })
        ]
      },
      {
        id: uid(), code: 'TM-0005', name: 'Provincia', ref: 'PROV', alcance: 'Nacional', maxErr: 10, desc: 'Provincias por departamento.', type: 'Creación', state: 'Validado', date: '05/08/2026', needsApproval: true, sustentoFile: 'INFORME_PROV_2026.pdf', obsMotivo: '', rechazoMotivo: '',
        groups: [newGroup({ name: 'Grupo General', locked: true })],
        fields: [
          newField({ name: 'Código', type: 'Texto', min: 4, max: 6, required: true, group: 'Grupo General' }),
          newField({ name: 'Nombre', type: 'Texto', min: 1, max: 60, required: true, group: 'Grupo General' }),
          newField({ name: 'Departamento', type: 'Texto', min: 1, max: 60, required: true, group: 'Grupo General' })
        ]
      },
      {
        id: uid(), code: 'TM-0004', name: 'Países y Nacionalidades', ref: 'PAIS', alcance: 'Nacional', maxErr: 10, desc: 'Catálogo de países según ISO 3166.', type: 'Creación', state: 'Aprobado', date: '04/08/2026', needsApproval: true, sustentoFile: 'ISO_3166_PAISES.pdf', obsMotivo: '', rechazoMotivo: '',
        groups: [newGroup({ name: 'Grupo General', locked: true })],
        fields: [
          newField({ name: 'Código ISO', type: 'Texto', min: 2, max: 3, required: true, group: 'Grupo General' }),
          newField({ name: 'País', type: 'Texto', min: 1, max: 80, required: true, group: 'Grupo General' }),
          newField({ name: 'Nacionalidad', type: 'Texto', min: 1, max: 80, required: false, group: 'Grupo General' })
        ]
      },
      {
        id: uid(), code: 'TM-0003', name: 'Moneda', ref: 'MONEDA', alcance: 'Nacional', maxErr: 10, desc: 'Monedas admitidas por el sistema con su símbolo.', type: 'Creación', state: 'Aprobado', date: '03/08/2026', needsApproval: false, sustentoFile: 'INFORME_BASE.pdf', obsMotivo: '', rechazoMotivo: '',
        groups: [newGroup({ name: 'Grupo General', locked: true })],
        fields: [
          newField({ name: 'Código', type: 'Texto', min: 3, max: 10, required: true, group: 'Grupo General' }),
          newField({ name: 'Descripción', type: 'Texto', min: 1, max: 100, required: true, group: 'Grupo General' }),
          newField({ name: 'Símbolo', type: 'Texto', min: 1, max: 10, required: false, group: 'Grupo General' })
        ]
      },
      {
        id: uid(), code: 'TM-0002', name: 'Tipo de Documento de Identidad', ref: 'TIPO_DOC', alcance: 'Nacional', maxErr: 10, desc: 'DNI, CE, PTP, Pasaporte, RUC.', type: 'Creación', state: 'Aprobado', date: '02/08/2026', needsApproval: false, sustentoFile: 'INFORME_BASE.pdf', obsMotivo: '', rechazoMotivo: '',
        groups: [newGroup({ name: 'Grupo General', locked: true })],
        fields: [
          newField({ name: 'Código', type: 'Texto', min: 2, max: 10, required: true, group: 'Grupo General' }),
          newField({ name: 'Descripción', type: 'Texto', min: 1, max: 100, required: true, group: 'Grupo General' })
        ]
      },
      {
        id: uid(), code: 'TM-0001', name: 'Estado Civil', ref: 'ESTADO_CIVIL', alcance: 'Nacional', maxErr: 10, desc: 'Soltero, Casado, Viudo, Divorciado.', type: 'Creación', state: 'Aprobado', date: '01/08/2026', needsApproval: false, sustentoFile: 'INFORME_BASE.pdf', obsMotivo: '', rechazoMotivo: '',
        groups: [newGroup({ name: 'Grupo General', locked: true })],
        fields: [
          newField({ name: 'Código', type: 'Texto', min: 2, max: 10, required: true, group: 'Grupo General' }),
          newField({ name: 'Descripción', type: 'Texto', min: 1, max: 100, required: true, group: 'Grupo General' })
        ]
      }
    ];
    S.seq = 9;
  }

  function buildTag(text, badgeClass){
    return '<span class="badge ' + (badgeClass || 'b-off') + '" style="display:inline-flex;width:fit-content;max-width:fit-content;min-width:0;padding:4px 8px;border-radius:4px;font-size:12px;font-family:Inter,sans-serif;font-weight:500;line-height:16px;height:24px;box-sizing:border-box;white-space:nowrap;justify-content:center;align-items:center;align-self:flex-start;">' + esc(text) + '</span>';
  }

  function stBadge(st){
    var m = { 'Elaboración': 'b-off', 'Validado': 'b-info', 'Verificado': 'b-info', 'Aprobado': 'b-ok', 'Observado': 'b-warn', 'Rechazado': 'b-danger', 'Eliminado': 'b-off' };
    return buildTag(st, m[st] || 'b-off');
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

  function buildTableHeader(title, opts){
    opts = opts || {};
    var align = opts.align || 'left';
    var isRight = align === 'right' || align === 'flex-end';
    var showIcons = opts.icons !== false && !isRight;

    var sortIcon = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:var(--sys-color-icon-states-enabled, #504C4A);fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;cursor:pointer;flex-shrink:0;" title="Ordenar"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/></svg>';
    var funnelIcon = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:var(--sys-color-icon-states-enabled, #504C4A);fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;cursor:pointer;flex-shrink:0;" title="Filtrar"><polygon points="22 3 2 3 10 12.46 10 21 14 19 14 12.46 22 3"/></svg>';

    var iconsHtml = showIcons
      ? '<div style="display:inline-flex;align-items:center;gap:8px;flex-shrink:0;">' + sortIcon + funnelIcon + '</div>'
      : '';

    var justify = isRight ? 'flex-end' : 'space-between';

    return '<th class="figma-th" style="padding:0;border:0;vertical-align:middle;">' +
      '<div data-show-filter="' + (showIcons ? 'true' : 'false') + '" data-show-lock="false" data-show-sort="' + (showIcons ? 'true' : 'false') + '" data-type="Text" style="width:100%;min-height:48px;padding:12px 16px;background:var(--sys-color-bg-surfaces-surface-high, rgba(32, 32, 32, 0.08));border-top:1px var(--sys-color-divider-default, rgba(32, 32, 32, 0.12)) solid;border-bottom:1px var(--sys-color-divider-default, rgba(32, 32, 32, 0.12)) solid;justify-content:' + justify + ';align-items:center;gap:16px;display:flex;box-sizing:border-box;">' +
        '<div style="flex:1 1 0;justify-content:' + (isRight ? 'flex-end' : 'flex-start') + ';align-items:center;gap:4px;display:flex;">' +
          '<div style="flex:1 1 0;justify-content:center;display:flex;flex-direction:column;color:var(--sys-color-text-neutral-medium, #504C4A);font-size:12px;font-family:Inter,sans-serif;font-weight:700;text-transform:uppercase;line-height:16px;letter-spacing:0.50px;word-wrap:break-word;white-space:nowrap;' + (isRight ? 'text-align:right;' : '') + '">' +
            title +
          '</div>' +
        '</div>' +
        iconsHtml +
      '</div>' +
    '</th>';
  }

  function renderList(){
    S.currentRole = getCurrentRole();
    var mount = document.getElementById('tra001-list-mount');
    if(!mount) return;

    var rows = S.structures.map(function(s){
      var elim = s.state === 'Eliminado';
      var a = '<div class="acts">';
      if (!elim) {
        if (S.currentRole === 'Creador') {
          if (s.state === 'Elaboración') {
            a += '<a title="Editar" data-act="edit" data-id="' + s.id + '" style="color:#504C4A;cursor:pointer;">' + PENCIL + '</a>';
            a += '<a title="Eliminar" data-act="delete" data-id="' + s.id + '" style="color:#504C4A;cursor:pointer;">' + TRASH + '</a>';
          } else if (s.state === 'Observado') {
            a += '<a title="Editar observaciones" data-act="edit" data-id="' + s.id + '" style="color:#504C4A;cursor:pointer;">' + PENCIL + '</a>';
            a += '<a title="Eliminar" data-act="delete" data-id="' + s.id + '" style="color:#504C4A;cursor:pointer;">' + TRASH + '</a>';
          } else {
            // Validado, Aprobado, Rechazado
            a += '<a title="Ver detalle" data-act="view" data-id="' + s.id + '" style="color:#504C4A;cursor:pointer;">' + EYE + '</a>';
          }
        } else {
          // Rol Aprobador: En la tabla principal siempre se usa "Ver detalle"
          a += '<a title="Ver detalle" data-act="view" data-id="' + s.id + '" style="color:#504C4A;cursor:pointer;">' + EYE + '</a>';
        }
      } else {
        a += '<span style="font-size:11px;color:var(--ink3);">Eliminado</span>';
      }
      a += '</div>';

      var nameClickAct = (s.state === 'Elaboración' || s.state === 'Observado') && S.currentRole === 'Creador' ? 'edit' : 'view';
      var nameHtml = '<a data-act="' + nameClickAct + '" data-id="' + s.id + '" class="tbl-name-link" style="color:var(--sys-color-text-neutral-medium, #29292A);font-weight:400;letter-spacing:0.02px;cursor:pointer;text-decoration:none;">' + esc(s.name) + '</a>';

      var k = (s.name + ' ' + s.code + ' ' + s.ref).toLowerCase();
      return '<tr data-k="' + esc(k) + '" data-st="' + s.state + '"' + (elim ? ' style="opacity:.5"' : '') + '>' +
        buildTableCell(s.code, { num: true }) +
        buildTableCell(nameHtml) +
        buildTableCell(buildTag(s.type, 'b-off')) +
        buildTableCell(s.date, { num: true }) +
        buildTableCell(stBadge(s.state)) +
        buildTableCell(a, { align: 'right' }) +
      '</tr>';
    }).join('');

    mount.innerHTML =
      '<div class="card" style="padding:20px 20px 16px;">' +
        '<div class="tools" style="margin-bottom:20px;">' +
          '<div class="search"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>' +
            '<input id="t001-q" placeholder="Buscar por código, nombre o referencia"></div>' +
          '<div class="tbl-actions">' +
            '<button class="btn-tbl-action" type="button"><svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg><span>Filtros</span></button>' +
            '<button class="btn-tbl-action" type="button"><svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M10.6 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.6"/><path d="M9 3v18"/><path d="M15 3v5.6"/><path d="m14.305 19.53.923-.382"/><path d="m15.228 16.852-.923-.383"/><path d="m16.852 15.228-.383-.923"/><path d="m16.852 20.772-.383.924"/><path d="m19.148 15.228.383-.923"/><path d="m19.53 21.696-.382-.924"/><path d="m20.772 16.852.924-.383"/><path d="m20.772 19.148.924.383"/><circle cx="18" cy="18" r="3"/></svg><span>Columnas</span></button>' +
          '</div>' +
        '</div>' +
        '<div class="tw" style="border:1px solid rgba(32,32,32,0.12);border-radius:4px;overflow:hidden;margin-bottom:16px;">' +
          '<table style="min-width:100%;"><thead><tr>' +
            buildTableHeader('CÓDIGO') +
            buildTableHeader('ESTRUCTURA') +
            buildTableHeader('TIPO DE REGISTRO') +
            buildTableHeader('ÚLTIMA MODIFICACIÓN') +
            buildTableHeader('ESTADO') +
            buildTableHeader('ACCIONES', { align: 'right', icons: false }) +
          '</tr></thead><tbody>' + rows + '</tbody></table>' +
        '</div>' +
        '<div data-edge-buttons="true" data-report="true" data-rows-per-page="true" style="width: 100%; padding-top: 16px; background: white; border-top: 1px rgba(32, 32, 32, 0.12) solid; justify-content: space-between; align-items: center; gap: 16px; display: flex; flex-wrap: wrap;">' +
            '<div style="justify-content: flex-start; align-items: center; gap: 24px; display: flex">' +
                '<div style="color: #504C4A; font-size: 12px; font-family: Inter; font-weight: 500; line-height: 16px;">Mostrando 1-' + S.structures.length + ' de ' + S.structures.length + '</div>' +
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

    var q = document.getElementById('t001-q');
    if(q){
      q.addEventListener('input', function(){
        var term = (q.value || '').toLowerCase();
        Array.prototype.forEach.call(mount.querySelectorAll('tbody tr'), function(tr){
          var okT = tr.getAttribute('data-k').indexOf(term) >= 0;
          tr.style.display = okT ? '' : 'none';
        });
      });
    }
  }

  function makeDraft(){
    S.mode = 'create'; S.origId = null; S.tab = 1; S.step = 1; S.draftSaved = false;
    S.draft = {
      id: uid(),
      code: code(S.seq + 1),
      name: '',
      ref: '',
      alcance: 'Nacional',
      maxErr: 10,
      desc: '',
      type: 'Creación',
      state: 'Elaboración',
      date: today(),
      time: nowTime(),
      needsApproval: true,
      sustentoFile: '',
      obsMotivo: '',
      obsDate: '',
      rechazoMotivo: '',
      rechazoDate: '',
      groups: [newGroup({ name: 'Grupo General', desc: 'Agrupación por defecto. No puede eliminarse.', locked: true })],
      fields: []
    };
  }

  function openCreate(){
    S.currentRole = getCurrentRole();
    if(S.currentRole === 'Aprobador'){
      toast('El rol Aprobador solo evalúa solicitudes existentes. Cambie a Rol Creador en el menú de usuario para registrar.', 'warn');
      return;
    }
    makeDraft();
    S.draftSaved = false;
    window.go('tra001-form');
  }

  function openEdit(id){
    S.currentRole = getCurrentRole();
    var s = find(id); if(!s) return;
    if(s.state !== 'Elaboración' && s.state !== 'Observado'){
      toast('Solo se pueden modificar estructuras en estado Elaboración u Observado.', 'err');
      return;
    }
    if(S.currentRole === 'Aprobador'){
      openView(id);
      return;
    }
    S.mode = 'edit'; S.origId = id; S.tab = 1; S.step = 1; S.draft = clone(s); S.draftSaved = true;
    if(!S.draft.time) S.draft.time = '08:40';
    window.go('tra001-form');
  }

  function openView(id){
    S.currentRole = getCurrentRole();
    var s = find(id); if(!s) return;
    S.mode = 'view'; S.origId = id; S.tab = 1; S.step = 1; S.draft = clone(s);
    if(!S.draft.time) S.draft.time = '08:40';
    window.go('tra001-form');
  }

  function isStep1Valid(){
    var d = S.draft;
    if(!d || !d.name || !d.name.trim().length || !d.ref || !d.ref.trim().length) return false;
    if(d.needsApproval && (!d.sustentoFile || !d.sustentoFile.trim().length)) return false;
    return true;
  }
  function isStep2Valid(){
    var d = S.draft;
    return !!(d && d.groups && d.groups.length > 0);
  }
  function isStep3Valid(){
    var d = S.draft;
    return !!(d && d.fields && d.fields.length > 0);
  }

  function buildFigmaFieldHtml(opts){
    var isReq = opts.required !== false;
    var reqMark = isReq ? '<span class="field-req">*</span>' : '';
    var maxLen = opts.maxlength || 200;
    var roAttr = opts.readonly ? ' readonly disabled style="background:#F8FAFC;cursor:default;"' : '';
    var inputTag = opts.customHtml
      ? opts.customHtml
      : (opts.isTextarea
        ? '<textarea id="' + opts.id + '" maxlength="' + maxLen + '" placeholder="' + esc(opts.placeholder || '') + '"' + roAttr + '>' + esc(opts.value || '') + '</textarea>' +
          (!opts.readonly ? '<div class="field-clear-btn" id="clear-' + opts.id + '" title="Limpiar texto">' +
            '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:#504C4A;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>' +
          '</div>' : '')
        : '<input id="' + opts.id + '" value="' + esc(opts.value || '') + '" placeholder="' + esc(opts.placeholder || '') + '"' + roAttr + '>');

    var hasVal = !!((opts.value && opts.value.trim().length > 0) || (opts.selectedValue && opts.selectedValue.trim().length > 0));
    var counterHtml = opts.isTextarea && !opts.readonly
      ? '<div class="field-counter-row"><span class="field-counter" id="counter-' + opts.id + '">' + ((opts.value || '').length) + '/' + maxLen + '</span></div>'
      : '';

    return '<div class="figma-field' + (opts.isTextarea ? ' is-textarea' : '') + (hasVal ? ' has-value' : '') + (opts.readonly ? ' is-readonly' : '') + '" id="wrap-' + opts.id + '">' +
      '<div class="field-box">' +
        '<div class="field-label-notch">' +
          '<div class="field-label-wrapper">' +
            '<span class="field-label">' + esc(opts.label) + '</span>' +
            reqMark +
          '</div>' +
        '</div>' +
        inputTag +
        (!opts.readonly ? '<div class="field-trailing">' +
          '<div class="field-vsep"></div>' +
          '<div class="field-err-icon">!</div>' +
        '</div>' : '') +
      '</div>' +
      (!opts.readonly ? '<div class="field-helper">' + (opts.helperText || 'Este campo es obligatorio.') + '</div>' : '') +
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

  function updateStepButtons(){
    if(!S.draft) return;
    S.currentRole = getCurrentRole();
    var d = S.draft;
    var isReadOnly = S.mode === 'view' || d.state === 'Rechazado' || (d.state === 'Validado' && S.currentRole === 'Creador') || d.state === 'Aprobado';

    // Remove field error styling if valid
    var wName = document.getElementById('wrap-dg-name');
    if(wName && d.name && d.name.trim().length > 0){
      wName.classList.remove('is-error');
    }
    var wRef = document.getElementById('wrap-dg-ref');
    if(wRef && d.ref && d.ref.trim().length > 0){
      wRef.classList.remove('is-error');
    }

    var saveBtns = document.querySelectorAll('[data-fbtn="save"], #btn-save-tra001');
    for(var i = 0; i < saveBtns.length; i++){
      var btn = saveBtns[i];
      if(btn.id === 'btn-save-tra001'){
        btn.style.display = isReadOnly ? 'none' : 'inline-flex';
      }
      btn.disabled = isReadOnly;
      btn.style.opacity = isReadOnly ? '0.5' : '1';
      btn.style.cursor = isReadOnly ? 'not-allowed' : 'pointer';
    }

    var valBtn = document.getElementById('btn-validate-tra001');
    if(valBtn){
      if(isReadOnly || S.currentRole !== 'Creador'){
        valBtn.style.display = 'none';
      } else {
        valBtn.style.display = 'inline-flex';
        var canValidate = !!(S.draftSaved && S.draft && (S.draft.state === 'Elaboración' || S.draft.state === 'Observado'));
        valBtn.disabled = !canValidate;
        valBtn.style.opacity = canValidate ? '1' : '0.4';
        valBtn.style.cursor = canValidate ? 'pointer' : 'not-allowed';
        valBtn.title = canValidate ? 'Validar estructura' : 'Debe guardar la estructura antes de validar.';
      }
    }

    var canCreatorApprove = S.currentRole === 'Creador' && d.state === 'Validado' && !d.needsApproval;
    var showApproverActions = S.currentRole === 'Aprobador' && d.state === 'Validado';
    var aprBtns = document.querySelectorAll('#btn-approve-tra001, #btn-approve-tra001-v2, [data-fbtn="approve"]');
    var obsBtns = document.querySelectorAll('#btn-observe-tra001, #btn-observe-tra001-v2, [data-fbtn="observe"]');
    var rejBtns = document.querySelectorAll('#btn-reject-tra001, #btn-reject-tra001-v2, [data-fbtn="reject"]');

    Array.prototype.forEach.call(aprBtns, function(b){ b.style.display = (showApproverActions || canCreatorApprove) ? 'inline-flex' : 'none'; });
    Array.prototype.forEach.call(obsBtns, function(b){ b.style.display = showApproverActions ? 'inline-flex' : 'none'; });
    Array.prototype.forEach.call(rejBtns, function(b){ b.style.display = showApproverActions ? 'inline-flex' : 'none'; });
  }

  function syncForm(){
    var m = { 'dg-name': 'name', 'dg-ref': 'ref', 'dg-alc': 'alcance', 'dg-maxerr': 'maxErr', 'dg-desc': 'desc' };
    Object.keys(m).forEach(function(id){ var el = document.getElementById(id); if(el) S.draft[m[id]] = el.value; });
    var chkApp = document.getElementById('dg-needs-approval');
    if(chkApp) {
      S.draft.needsApproval = chkApp.checked;
      var reqInd = document.getElementById('sustento-req-indicator');
      if(reqInd){
        reqInd.innerHTML = chkApp.checked ? '<span class="req" style="color:#D51317;">*</span>' : '<span style="font-size:11.5px;color:#64748B;font-weight:400;">(Opcional)</span>';
      }
    }
    updateStepButtons();
  }

  function updateWizardUI(){
    var mount = document.getElementById('tra001-wizard-mount');
    if(mount) mount.innerHTML = '';
  }

  function renderForm(targetMountId){
    var mountId = targetMountId || (document.getElementById('tra001-form-v2') && document.getElementById('tra001-form-v2').classList.contains('on') ? 'tra001-form-v2-mount' : 'tra001-form-mount');
    var mount = document.getElementById(mountId); if(!mount) return;
    S.currentRole = getCurrentRole();
    if(!S.draft) makeDraft();
    var d = S.draft;
    if(!S.tab) S.tab = 1;
    S.step = S.tab;

    var isReadOnly = S.mode === 'view' || d.state === 'Rechazado' || (d.state === 'Validado' && S.currentRole === 'Creador') || d.state === 'Aprobado';

    var sub = document.getElementById('tra001-form-sub');
    if(sub){
      if (isReadOnly) sub.textContent = 'Consulta';
      else if (S.mode === 'edit' || d.state === 'Observado') sub.textContent = 'Edición';
      else sub.textContent = 'Creación';
    }
    updateWizardUI();

    // 0. Status Banners (Observado / Rechazado)
    var statusBanner = '';
    if (d.state === 'Observado') {
      statusBanner = '<div class="status-banner-obs" style="background:#FFFBEB;border:1px solid #FDE68A;border-left:5px solid #F59E0B;border-radius:8px;padding:14px 18px;margin-bottom:20px;display:flex;align-items:flex-start;gap:14px;box-shadow:0 1px 3px rgba(0,0,0,0.04);">' +
        '<div style="width:32px;height:32px;border-radius:50%;background:#FEF3C7;color:#D97706;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;">' +
          '<svg viewBox="0 0 24 24" style="width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>' +
        '</div>' +
        '<div style="flex:1;">' +
          '<div style="display:flex;align-items:center;gap:10px;margin-bottom:4px;flex-wrap:wrap;">' +
            '<span style="font-size:14px;font-weight:700;color:#92400E;font-family:Inter,sans-serif;">Estructura Observada</span>' +
            '<span style="font-size:12px;color:#B45309;background:#FEF3C7;padding:2px 8px;border-radius:4px;font-weight:500;">Fecha de observación: ' + esc(d.obsDate || d.date) + '</span>' +
            '<span style="font-size:12px;color:#4B5563;">(Puede subsanar las observaciones, guardar cambios y volver a validar)</span>' +
          '</div>' +
          '<div style="font-size:13.5px;color:#78350F;line-height:20px;font-family:Inter,sans-serif;">' +
            '<strong>Motivo de observación:</strong> ' + esc(d.obsMotivo || 'Sin detalle especificado.') +
          '</div>' +
        '</div>' +
      '</div>';
    } else if (d.state === 'Rechazado') {
      statusBanner = '<div class="status-banner-rej" style="background:#FEF2F2;border:1px solid #FECACA;border-left:5px solid #EF4444;border-radius:8px;padding:14px 18px;margin-bottom:20px;display:flex;align-items:flex-start;gap:14px;box-shadow:0 1px 3px rgba(0,0,0,0.04);">' +
        '<div style="width:32px;height:32px;border-radius:50%;background:#FEE2E2;color:#DC2626;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;">' +
          '<svg viewBox="0 0 24 24" style="width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>' +
        '</div>' +
        '<div style="flex:1;">' +
          '<div style="display:flex;align-items:center;gap:10px;margin-bottom:4px;flex-wrap:wrap;">' +
            '<span style="font-size:14px;font-weight:700;color:#991B1B;font-family:Inter,sans-serif;">Estructura Rechazada</span>' +
            '<span style="font-size:12px;color:#B91C1C;background:#FEE2E2;padding:2px 8px;border-radius:4px;font-weight:500;">Fecha de rechazo: ' + esc(d.rechazoDate || d.date) + '</span>' +
            '<span style="font-size:12px;color:#6B7280;">(Registro cerrado permanentemente · Modo solo consulta)</span>' +
          '</div>' +
          '<div style="font-size:13.5px;color:#7F1D1D;line-height:20px;font-family:Inter,sans-serif;">' +
            '<strong>Motivo del rechazo:</strong> ' + esc(d.rechazoMotivo || 'Sin detalle especificado.') +
          '</div>' +
        '</div>' +
      '</div>';
    }

    // 1. Header 2-Cards Layout (Figma exact structure)
    var headerCard = '<div data-info-solicitud="true" class="tra001-two-cards-wrap" style="width:100%;border-radius:8px;justify-content:flex-start;align-items:stretch;gap:12px;display:flex;margin-bottom:20px;">' +
      // Card 1: Left Card (Intendencia & Fecha)
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
              '<div style="color:#353537;font-size:14px;font-family:Inter,sans-serif;font-weight:700;line-height:20px;">' + esc(d.date) + ' &nbsp; ' + (d.time || '08:40') + '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +

      // Card 2: Right Card (Codigo & Estado)
      '<div style="width:384px;flex-shrink:0;align-self:stretch;padding:8px 16px;background:white;border:1px solid rgba(32,32,32,0.12);border-radius:8px;flex-direction:column;justify-content:center;align-items:flex-start;display:inline-flex;">' +
        // Row 1: CODIGO
        '<div data-content="Text" data-layout="Inline" style="align-self:stretch;flex-direction:column;justify-content:flex-start;align-items:flex-start;display:flex;">' +
          '<div style="align-self:stretch;min-height:36px;padding:6px 0;border-radius:8px;justify-content:flex-start;align-items:center;gap:8px;display:inline-flex;">' +
            '<div style="max-width:140px;min-width:75px;min-height:24px;flex-direction:column;justify-content:center;align-items:flex-start;display:inline-flex;">' +
              '<div style="min-height:16px;padding:0 4px;border-radius:8px;justify-content:center;align-items:center;display:inline-flex;">' +
                '<div style="color:#6F6F71;font-size:12px;font-family:Inter,sans-serif;font-weight:500;letter-spacing:0.5px;">CODIGO</div>' +
              '</div>' +
            '</div>' +
            '<div style="flex:1 1 0;overflow:hidden;justify-content:flex-start;align-items:center;display:flex;">' +
              '<div style="color:#353537;font-size:14px;font-family:Inter,sans-serif;font-weight:700;line-height:20px;">' + esc(d.code) + '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        // Row 2: ESTADO
        '<div data-content="Tags" data-layout="Inline" style="align-self:stretch;flex-direction:column;justify-content:center;align-items:flex-start;display:flex;">' +
          '<div style="align-self:stretch;min-height:36px;padding:6px 0;border-radius:8px;justify-content:flex-start;align-items:center;gap:8px;display:inline-flex;">' +
            '<div style="max-width:140px;min-width:75px;min-height:24px;flex-direction:column;justify-content:center;align-items:flex-start;display:inline-flex;">' +
              '<div style="min-height:16px;padding:0 4px;border-radius:8px;justify-content:center;align-items:center;display:inline-flex;">' +
                '<div style="color:#6F6F71;font-size:12px;font-family:Inter,sans-serif;font-weight:500;letter-spacing:0.5px;">ESTADO</div>' +
              '</div>' +
            '</div>' +
            '<div style="flex:1 1 0;overflow:hidden;justify-content:flex-start;align-items:center;display:flex;">' +
              stBadge(d.state) +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

    // 2. Tabs Navigation Bar & Section Header (Figma exact card header)
    var tabsNav = '<div style="width:100%;display:flex;flex-direction:column;justify-content:flex-start;align-items:flex-start;">' +
      '<div style="width:100%;min-height:52px;padding-top:16px;padding-bottom:12px;padding-left:24px;padding-right:24px;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;box-sizing:border-box;">' +
        '<div data-actions="false" data-collapse="false" data-description="false" data-helps-icons="false" data-level="Section" data-progress="false" data-requiered="false" data-requiredlegend="false" style="align-self:stretch;justify-content:flex-start;align-items:center;gap:8px;display:flex;width:100%;">' +
          '<div style="flex:1 1 0;flex-direction:column;justify-content:center;align-items:flex-start;gap:4px;display:inline-flex;">' +
            '<div style="align-self:stretch;height:24px;justify-content:flex-start;align-items:center;gap:8px;display:inline-flex;">' +
              '<div style="color:var(--sys-color-text-neutral-high, #252220);font-size:16px;font-family:Inter,sans-serif;font-weight:600;line-height:24px;word-wrap:break-word;">Datos de la estructura</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div style="width:100%;border-bottom:1px solid var(--sys-color-divider-default, rgba(32, 32, 32, 0.12));display:flex;justify-content:flex-start;align-items:flex-end;gap:4px;padding-left:0px;padding-right:24px;box-sizing:border-box;flex-wrap:wrap;">' +
        '<button type="button" class="lg-tab' + (S.tab === 1 ? ' active' : '') + '" data-tab="1" data-decoration="false" data-dropdown="false" data-state="' + (S.tab === 1 ? 'Active' : 'Enabled') + '" style="background:transparent;border:0;border-bottom:2px ' + (S.tab === 1 ? 'var(--sys-color-bg-brand-primary, #06396E)' : 'transparent') + ' solid;margin-bottom:-1px;height:44px;box-sizing:border-box;padding:0 24px;cursor:pointer;justify-content:center;align-items:center;gap:8px;display:inline-flex;border-radius:0 !important;">' +
          '<div style="color:' + (S.tab === 1 ? 'var(--sys-color-bg-brand-primary, #06396E)' : 'var(--sys-color-text-neutral-medium, #504C4A)') + ';font-size:14px;font-family:Inter,sans-serif;font-weight:' + (S.tab === 1 ? '600' : '400') + ';line-height:20px;word-wrap:break-word;">Datos generales</div>' +
        '</button>' +
        '<button type="button" class="lg-tab' + (S.tab === 2 ? ' active' : '') + '" data-tab="2" data-decoration="false" data-dropdown="false" data-state="' + (S.tab === 2 ? 'Active' : 'Enabled') + '" style="background:transparent;border:0;border-bottom:2px ' + (S.tab === 2 ? 'var(--sys-color-bg-brand-primary, #06396E)' : 'transparent') + ' solid;margin-bottom:-1px;height:44px;box-sizing:border-box;padding:0 24px;cursor:pointer;justify-content:center;align-items:center;gap:8px;display:inline-flex;border-radius:0 !important;">' +
          '<div style="color:' + (S.tab === 2 ? 'var(--sys-color-bg-brand-primary, #06396E)' : 'var(--sys-color-text-neutral-medium, #504C4A)') + ';font-size:14px;font-family:Inter,sans-serif;font-weight:' + (S.tab === 2 ? '600' : '400') + ';line-height:20px;word-wrap:break-word;">Agrupaciones</div>' +
          '<span style="display:inline-flex;align-items:center;justify-content:center;height:20px;min-width:20px;box-sizing:border-box;background:' + (S.tab === 2 ? 'rgba(6,57,110,0.1)' : '#F1F5F9') + ';color:' + (S.tab === 2 ? '#06396E' : '#64748B') + ';border-radius:10px;padding:0 6px;font-size:11.5px;font-weight:600;line-height:1;">' + d.groups.length + '</span>' +
        '</button>' +
        '<button type="button" class="lg-tab' + (S.tab === 3 ? ' active' : '') + '" data-tab="3" data-decoration="false" data-dropdown="false" data-state="' + (S.tab === 3 ? 'Active' : 'Enabled') + '" style="background:transparent;border:0;border-bottom:2px ' + (S.tab === 3 ? 'var(--sys-color-bg-brand-primary, #06396E)' : 'transparent') + ' solid;margin-bottom:-1px;height:44px;box-sizing:border-box;padding:0 24px;cursor:pointer;justify-content:center;align-items:center;gap:8px;display:inline-flex;border-radius:0 !important;">' +
          '<div style="color:' + (S.tab === 3 ? 'var(--sys-color-bg-brand-primary, #06396E)' : 'var(--sys-color-text-neutral-medium, #504C4A)') + ';font-size:14px;font-family:Inter,sans-serif;font-weight:' + (S.tab === 3 ? '600' : '400') + ';line-height:20px;word-wrap:break-word;">Campos</div>' +
          '<span style="display:inline-flex;align-items:center;justify-content:center;height:20px;min-width:20px;box-sizing:border-box;background:' + (S.tab === 3 ? 'rgba(6,57,110,0.1)' : '#F1F5F9') + ';color:' + (S.tab === 3 ? '#06396E' : '#64748B') + ';border-radius:10px;padding:0 6px;font-size:11.5px;font-weight:600;line-height:1;">' + d.fields.length + '</span>' +
        '</button>' +
      '</div>' +
    '</div>';

    var tabContent = '';

    if(S.tab === 1){
      var sustentoHtml = '<div style="margin-bottom:20px;">' +
        '<div style="font-size:12px;font-family:Inter,sans-serif;font-weight:600;color:#475569;margin-bottom:6px;display:block;">Archivo de sustento <span id="sustento-req-indicator">' + (d.needsApproval ? '<span class="req" style="color:#D51317;">*</span>' : '<span style="font-size:11.5px;color:#64748B;font-weight:400;">(Opcional)</span>') + '</span></div>' +
        '<div id="t001-file-drag-zone" style="width:100%;display:flex;flex-direction:column;gap:4px;">' +
          '<div style="display:flex;align-items:center;width:100%;height:40px;">' +
            (!isReadOnly ?
              '<label for="t001-file-input" style="cursor:pointer;height:40px;padding:0 16px;background:#06396E;border-radius:8px 0 0 8px;display:inline-flex;align-items:center;justify-content:center;gap:8px;flex-shrink:0;margin:0;">' +
                '<svg viewBox="0 0 24 24" style="width:18px;height:18px;stroke:white;fill:none;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>' +
                '<span style="color:white;font-size:14px;font-family:Inter,sans-serif;font-weight:600;line-height:20px;white-space:nowrap;">Seleccionar archivo</span>' +
              '</label>' +
              '<input type="file" id="t001-file-input" accept=".pdf,.docx,.xlsx" style="display:none !important">' :
              '<div style="height:40px;padding:0 16px;background:#F1F5F9;border-radius:8px 0 0 8px;border:1px solid rgba(32,32,32,0.15);border-right:none;display:inline-flex;align-items:center;justify-content:center;gap:8px;flex-shrink:0;">' +
                '<svg viewBox="0 0 24 24" style="width:18px;height:18px;stroke:#64748B;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>' +
                '<span style="color:#475569;font-size:13px;font-weight:600;">Archivo de sustento</span>' +
              '</div>') +
            '<div style="flex:1;height:40px;padding:0 16px;background:' + (isReadOnly ? '#F8FAFC' : 'white') + ';border-radius:0 8px 8px 0;outline:1px rgba(32,32,32,0.56) solid;outline-offset:-1px;display:flex;align-items:center;justify-content:space-between;overflow:hidden;margin-left:-1px;" id="t001-file-box">' +
              '<div style="font-size:14px;font-family:Inter,sans-serif;letter-spacing:0.02px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" id="t001-file-display">' +
                (d.sustentoFile ? '<span style="color:#06396E;font-weight:600;display:inline-flex;align-items:center;gap:6px;"><svg viewBox="0 0 24 24" style="width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:2;"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>' + esc(d.sustentoFile) + '</span>' : '<span style="color:#6C6865;font-weight:400;">Ningún archivo seleccionado</span>') +
              '</div>' +
              (!isReadOnly && d.sustentoFile ?
                '<button type="button" id="t001-file-clear" title="Quitar archivo" style="background:none;border:none;color:#D51317;cursor:pointer;padding:4px;display:flex;align-items:center;">' +
                  '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
                '</button>' : '') +
            '</div>' +
          '</div>' +
          '<div style="padding-left:4px;padding-right:4px;color:#6C6865;font-size:12px;font-family:Inter,sans-serif;font-weight:400;margin-top:2px;">Formatos permitidos: .pdf, .docx, .xlsx (máximo de 20 MB). Este archivo sustenta formalmente la estructura.</div>' +
        '</div>' +
      '</div>';

      var checkHtml = '<div style="margin-bottom:20px;display:flex;align-items:flex-start;gap:12px;">' +
        '<input type="checkbox" id="dg-needs-approval"' + (d.needsApproval ? ' checked' : '') + (isReadOnly ? ' disabled' : '') + ' style="width:18px;height:18px;margin-top:2px;cursor:' + (isReadOnly ? 'not-allowed' : 'pointer') + ';accent-color:#06396E;">' +
        '<label for="dg-needs-approval" style="cursor:' + (isReadOnly ? 'default' : 'pointer') + ';display:flex;flex-direction:column;gap:2px;">' +
          '<span style="font-size:14px;font-family:Inter,sans-serif;font-weight:600;color:#1E293B;">Esta estructura necesita la aprobación de un aprobador</span>' +
          '<span style="font-size:12px;font-family:Inter,sans-serif;font-weight:400;color:#64748B;">Al activar esta opción, el registro requerirá la validación y evaluación formal (aprobar, observar o rechazar) por parte del rol Aprobador.</span>' +
        '</label>' +
      '</div>';

      tabContent =
        '<div data-actions="false" data-collapse="false" data-description="true" data-level="Subsection" style="width:100%;justify-content:flex-start;align-items:flex-start;gap:8px;display:inline-flex;margin-bottom:20px;">' +
          '<div style="flex:1 1 0;flex-direction:column;justify-content:center;align-items:flex-start;gap:4px;display:inline-flex;">' +
            '<div style="height:24px;justify-content:flex-start;align-items:center;gap:8px;display:inline-flex;">' +
              '<div style="color:#252220;font-size:14px;font-family:Inter,sans-serif;font-weight:600;line-height:20px;">Datos generales</div>' +
            '</div>' +
            '<div style="align-self:stretch;color:#504C4A;font-size:12px;font-family:Inter,sans-serif;font-weight:400;line-height:16px;">Nombre y configuración inicial de la tabla maestra.</div>' +
          '</div>' +
        '</div>' +
        '<div class="fgrid g2" style="margin-bottom:20px;">' +
          buildFigmaFieldHtml({ id: 'dg-name', label: 'Nombre de la estructura', value: d.name, placeholder: 'Ej. Actividad económica — CIIU', required: true, helperText: 'Este campo es obligatorio.', readonly: isReadOnly }) +
          buildFigmaFieldHtml({ id: 'dg-ref', label: 'Nombre de referencia', value: d.ref, placeholder: 'Nombre con el que se identifica el registro', required: true, helperText: 'Este campo es obligatorio.', readonly: isReadOnly }) +
        '</div>' +
        '<div style="margin-bottom:20px;">' +
          buildFigmaFieldHtml({ id: 'dg-desc', label: 'Descripción', value: d.desc, placeholder: 'Describa el propósito de la tabla maestra', required: false, isTextarea: true, readonly: isReadOnly }) +
        '</div>' +
        checkHtml +
        sustentoHtml;
    } else if(S.tab === 2){
      var grows = d.groups.map(function(g, i){
        var del = isReadOnly || g.locked ? '<span style="color:var(--ink3)">' + LOCK + '</span>' : '<a class="dn" title="Quitar" data-gact="delg" data-gid="' + g.id + '">' + TRASH + '</a>';
        var nameCellHtml = '<div style="display:inline-flex;align-items:center;gap:8px;">' +
          (isReadOnly ? '<span style="color:#29292A;font-weight:500;">' + esc(g.name) + '</span>' : '<a data-gact="editg" data-gid="' + g.id + '" style="color:#29292A;text-decoration:none;cursor:pointer;">' + esc(g.name) + '</a>') +
          (g.locked ? buildTag('por defecto', 'b-off') : '') +
        '</div>';
        var actsCellHtml = isReadOnly ? '<div class="acts"><span style="color:var(--ink3)">' + LOCK + '</span></div>' : '<div class="acts"><a title="Editar" data-gact="editg" data-gid="' + g.id + '">' + PENCIL + '</a>' + del + '</div>';
        return '<tr>' +
          buildTableCell(String(i + 1), { num: true }) +
          buildTableCell(nameCellHtml) +
          buildTableCell(esc(g.desc || 'Agrupación por defecto. No puede eliminarse.')) +
          buildTableCell(actsCellHtml, { align: 'right' }) +
        '</tr>';
      }).join('');

      var addGroupBtn = !isReadOnly ?
        '<div style="height:32px;border-radius:6px;justify-content:center;align-items:center;display:flex;">' +
          '<div data-context="Section" data-flow="Add" style="justify-content:flex-end;align-items:center;gap:12px;display:flex;">' +
            '<div data-action="Add" data-type="Primary" style="justify-content:flex-start;align-items:flex-start;gap:12px;display:flex;">' +
              '<button type="button" data-gact="addg" title="Agregar agrupación" style="width:32px;height:32px;background:#06396E;border-radius:8px;border:none;justify-content:center;align-items:center;display:flex;cursor:pointer;padding:0;">' +
                '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:white;fill:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</div>' : '';

      tabContent =
        '<div data-actions="true" data-collapse="false" data-description="true" data-level="Subsection" style="width:100%;justify-content:flex-start;align-items:flex-start;gap:8px;display:inline-flex;margin-bottom:16px;">' +
          '<div style="flex:1 1 0;flex-direction:column;justify-content:center;align-items:flex-start;gap:4px;display:inline-flex;">' +
            '<div style="height:24px;justify-content:flex-start;align-items:center;gap:8px;display:inline-flex;">' +
              '<div style="color:#252220;font-size:14px;font-family:Inter,sans-serif;font-weight:600;line-height:20px;">Agrupaciones</div>' +
            '</div>' +
            '<div style="align-self:stretch;color:#504C4A;font-size:12px;font-family:Inter,sans-serif;font-weight:400;line-height:16px;">Agrega una o más agrupaciones para organizar los campos de la estructura.</div>' +
          '</div>' +
          addGroupBtn +
        '</div>' +
        '<div class="tw" style="border:1px solid rgba(32,32,32,0.12);border-radius:4px;overflow:hidden;"><table class="subtable" style="min-width:100%;"><thead><tr><th style="width:60px">ORDEN</th><th>NOMBRE DE LA AGRUPACIÓN</th><th>DESCRIPCIÓN</th><th style="text-align:right">ACCIONES</th></tr></thead><tbody>' + grows + '</tbody></table></div>';
    } else if(S.tab === 3){
      var frows = d.fields.map(function(f, i){
        var nameCell = isReadOnly ? '<span style="color:#29292A;font-weight:500;">' + esc(f.name || '(sin nombre)') + '</span>' : '<a data-fact="editf" data-fid="' + f.id + '" style="color:#29292A;text-decoration:none;cursor:pointer;">' + esc(f.name || '(sin nombre)') + '</a>';
        var actsCell = isReadOnly ? '<div class="acts"><span style="color:var(--ink3)">' + LOCK + '</span></div>' : '<div class="acts"><a title="Editar" data-fact="editf" data-fid="' + f.id + '">' + PENCIL + '</a><a class="dn" title="Quitar" data-fact="delf" data-fid="' + f.id + '">' + TRASH + '</a></div>';
        return '<tr>' +
          buildTableCell(String(i + 1), { num: true }) +
          buildTableCell(nameCell) +
          buildTableCell(esc(f.type)) +
          buildTableCell(f.min === '' ? '—' : f.min, { num: true }) +
          buildTableCell(f.max === '' ? '—' : f.max, { num: true }) +
          buildTableCell(f.required ? buildTag('Sí', 'b-ok') : buildTag('No', 'b-off')) +
          buildTableCell(esc(f.group)) +
          buildTableCell(f.sensitive ? buildTag('Sí', 'b-warn') : buildTag('No', 'b-off')) +
          buildTableCell(f.active ? buildTag('Activo', 'b-ok') : buildTag('Inactivo', 'b-off')) +
          buildTableCell(actsCell, { align: 'right' }) +
        '</tr>';
      }).join('') || '<tr><td colspan="10" style="padding:0;border:0;"><div style="padding:16px;text-align:center;color:#64748B;">' + (isReadOnly ? 'No se registraron campos en esta estructura.' : 'Aún no hay campos. Use el botón "+" para agregar campos.') + '</div></td></tr>';

      var addFieldBtn = !isReadOnly ?
        '<div style="height:32px;border-radius:6px;justify-content:center;align-items:center;display:flex;">' +
          '<div data-context="Section" data-flow="Add" style="justify-content:flex-end;align-items:center;gap:12px;display:flex;">' +
            '<div data-action="Add" data-type="Primary" style="justify-content:flex-start;align-items:flex-start;gap:12px;display:flex;">' +
              '<button type="button" data-fact="addf" title="Agregar campo" style="width:32px;height:32px;background:#06396E;border-radius:8px;border:none;justify-content:center;align-items:center;display:flex;cursor:pointer;padding:0;">' +
                '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:white;fill:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</div>' : '';

      tabContent =
        '<div data-actions="true" data-collapse="false" data-description="true" data-level="Subsection" style="width:100%;justify-content:flex-start;align-items:flex-start;gap:8px;display:inline-flex;margin-bottom:16px;">' +
          '<div style="flex:1 1 0;flex-direction:column;justify-content:center;align-items:flex-start;gap:4px;display:inline-flex;">' +
            '<div style="height:24px;justify-content:flex-start;align-items:center;gap:8px;display:inline-flex;">' +
              '<div style="color:#252220;font-size:14px;font-family:Inter,sans-serif;font-weight:600;line-height:20px;">Campos</div>' +
            '</div>' +
            '<div style="align-self:stretch;color:#504C4A;font-size:12px;font-family:Inter,sans-serif;font-weight:400;line-height:16px;">Define los campos y atributos que componen la tabla maestra.</div>' +
          '</div>' +
          addFieldBtn +
        '</div>' +
        '<div class="tw" style="border:1px solid rgba(32,32,32,0.12);border-radius:4px;overflow:hidden;"><table class="subtable" style="min-width:100%;"><thead><tr><th style="width:56px">ORDEN</th><th>NOMBRE DEL CAMPO</th><th>TIPO DE DATO</th><th>LONG. MÍN.</th><th>LONG. MÁX.</th><th>OBLIGATORIO</th><th>AGRUPACIÓN</th><th>DATO SENSIBLE</th><th>ESTADO</th><th style="text-align:right">ACCIONES</th></tr></thead><tbody>' + frows + '</tbody></table></div>';
    }

    var mainCard = '<div class="card" style="padding:0;overflow:hidden;margin-bottom:20px;background:white;border:1px solid rgba(32,32,32,0.12);border-radius:8px;">' +
      tabsNav +
      '<div style="padding:24px;">' +
        tabContent +
      '</div>' +
    '</div>';

    mount.innerHTML = statusBanner + headerCard + mainCard;

    if(S.tab === 1){
      ['dg-name', 'dg-ref', 'dg-desc'].forEach(function(id){
        var el = document.getElementById(id);
        var wrap = document.getElementById('wrap-' + id);
        var counter = document.getElementById('counter-' + id);
        if(el){
          el.addEventListener('input', function(){
            syncForm();
            if(counter) counter.textContent = el.value.length + '/200';
            if(wrap){
              if(el.value.trim().length > 0){
                wrap.classList.add('has-value');
                wrap.classList.remove('is-error');
              } else {
                wrap.classList.remove('has-value');
              }
            }
          });
          el.addEventListener('change', syncForm);
          if(wrap && (id === 'dg-name' || id === 'dg-ref')){
            el.addEventListener('blur', function(){
              if(!el.value.trim().length) wrap.classList.add('is-error');
              else wrap.classList.remove('is-error');
            });
          }
        }
      });
      var chkEl = document.getElementById('dg-needs-approval');
      if(chkEl) chkEl.addEventListener('change', syncForm);
    }
    updateStepButtons();
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

  function openDrawer(opts){
    var ov = document.getElementById('t001-drawer');
    var panel = document.getElementById('t001-drawer-panel');
    var titleEl = document.getElementById('t001-drawer-title');
    var subEl = document.getElementById('t001-drawer-sub');
    var bodyEl = document.getElementById('t001-drawer-body');
    var saveText = document.getElementById('t001-drawer-savetext');

    if(panel) {
      panel.style.width = opts.width || '520px';
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

  function openGroupModal(gid){
    var g = gid ? S.draft.groups.filter(function(x){ return x.id === gid; })[0] : null;
    var html = '<div style="display:flex;flex-direction:column;gap:18px;">' +
      buildFigmaFieldHtml({ id: 'm-gname', label: 'Nombre de la agrupación', value: g ? g.name : '', placeholder: 'Nombre de la agrupación', required: true, helperText: 'El nombre de la agrupación es obligatorio.' }) +
      buildFigmaFieldHtml({ id: 'm-gdesc', label: 'Descripción', value: g ? g.desc : '', placeholder: 'Descripción opcional', required: false, isTextarea: true }) +
    '</div>';

    openDrawer({
      width: '400px',
      title: g ? 'Editar agrupación' : 'Agregar agrupación',
      subtitle: 'Secciones lógicas que organizan los campos de la estructura.',
      bodyHtml: html,
      saveText: 'Guardar',
      onSave: function(){
        var name = val('m-gname').trim();
        var w = document.getElementById('wrap-m-gname');
        if(!name){
          if(w) w.classList.add('is-error');
          return false;
        }
        if(g){
          var old = g.name;
          if(!g.locked){ g.name = name; S.draft.fields.forEach(function(f){ if(f.group === old) f.group = name; }); }
          g.desc = val('m-gdesc');
        } else {
          S.draft.groups.push(newGroup({ name: name, desc: val('m-gdesc') }));
        }
        renderForm();
        return true;
      }
    });

    ['m-gname', 'm-gdesc'].forEach(function(id){
      var el = document.getElementById(id);
      var wrap = document.getElementById('wrap-' + id);
      var counter = document.getElementById('counter-' + id);
      if(el && wrap){
        el.addEventListener('input', function(){
          if(counter) counter.textContent = el.value.length + '/200';
          if(el.value.trim().length > 0){
            wrap.classList.add('has-value');
            wrap.classList.remove('is-error');
          } else {
            wrap.classList.remove('has-value');
          }
        });
      }
    });
  }

  function openFieldModal(fid){
    var f = fid ? S.draft.fields.filter(function(x){ return x.id === fid; })[0] : null;
    var gnames = S.draft.groups.map(function(g){ return g.name; });
    var parentFields = S.draft.fields.filter(function(x){ return !f || x.id !== f.id; }).map(function(x){ return x.name; });
    parentFields.unshift('---');

    var html = '<div style="display:flex;flex-direction:column;gap:18px;">' +
      buildFigmaFieldHtml({ id: 'm-fname', label: 'Nombre del campo', value: f ? f.name : '', placeholder: 'Nombre del atributo', required: true, helperText: 'El nombre del campo es obligatorio.' }) +
      buildCustomSelectHtml({ id: 'm-ftype', label: 'Tipo de dato', options: TYPES, selectedValue: f ? f.type : '', placeholder: 'Seleccionar...', required: true, helperText: 'El tipo de dato es obligatorio.' }) +
      buildCustomSelectHtml({ id: 'm-fgroup', label: 'Agrupación', options: gnames, selectedValue: f ? f.group : (gnames[0] || ''), placeholder: 'Seleccionar...', required: true, helperText: 'La agrupación es obligatoria.' }) +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">' +
        buildFigmaFieldHtml({ id: 'm-fmin', label: 'Long. mínima', value: f && f.min !== '' ? f.min : '', placeholder: '0', required: false }) +
        buildFigmaFieldHtml({ id: 'm-fmax', label: 'Long. máxima', value: f && f.max !== '' ? f.max : '', placeholder: '255', required: false }) +
      '</div>' +
      buildCustomSelectHtml({ id: 'm-fparent', label: 'Depende de (campo padre)', options: parentFields, selectedValue: f ? (f.parent || '---') : '---', placeholder: 'Seleccionar...', required: false }) +
      buildFigmaFieldHtml({ id: 'm-fex', label: 'Ejemplo', value: f ? (f.example || '') : '', placeholder: 'Ej. Lima', required: false }) +
      '<div style="display:flex;flex-direction:column;gap:12px;padding:14px 16px;background:#F8FAFC;border-radius:8px;border:1px solid #E2E8F0;">' +
        '<label style="display:flex;align-items:center;gap:10px;font-size:13.5px;font-family:Inter,sans-serif;font-weight:500;color:#334155;cursor:pointer;"><input class="chk" type="checkbox" id="m-freq"' + (f && f.required ? ' checked' : '') + ' style="width:16px;height:16px;cursor:pointer;"> Obligatorio</label>' +
        '<label style="display:flex;align-items:center;gap:10px;font-size:13.5px;font-family:Inter,sans-serif;font-weight:500;color:#334155;cursor:pointer;"><input class="chk" type="checkbox" id="m-fsens"' + (f && f.sensitive ? ' checked' : '') + ' style="width:16px;height:16px;cursor:pointer;"> Dato sensible (encriptado)</label>' +
        '<label style="display:flex;align-items:center;gap:10px;font-size:13.5px;font-family:Inter,sans-serif;font-weight:500;color:#334155;cursor:pointer;"><input class="chk" type="checkbox" id="m-fact"' + (!f || f.active ? ' checked' : '') + ' style="width:16px;height:16px;cursor:pointer;"> Activo</label>' +
      '</div>' +
    '</div>';

    openDrawer({
      width: '560px',
      title: f ? 'Editar campo' : 'Agregar campo',
      subtitle: 'Define las características, tipo de dato y restricciones del campo.',
      bodyHtml: html,
      saveText: 'Guardar',
      onSave: function(){
        var name = val('m-fname').trim();
        var type = val('m-ftype').trim();
        var group = val('m-fgroup').trim();

        var wName = document.getElementById('wrap-m-fname');
        var wType = document.getElementById('wrap-m-ftype');
        var wGroup = document.getElementById('wrap-m-fgroup');

        var isValid = true;
        if(!name){
          if(wName) wName.classList.add('is-error');
          isValid = false;
        }
        if(!type){
          if(wType) wType.classList.add('is-error');
          isValid = false;
        }
        if(!group){
          if(wGroup) wGroup.classList.add('is-error');
          isValid = false;
        }
        if(!isValid) return false;
        var rec = {
          name: name,
          type: val('m-ftype'),
          group: val('m-fgroup'),
          min: val('m-fmin'),
          max: val('m-fmax'),
          parent: val('m-fparent'),
          example: val('m-fex'),
          required: chk('m-freq'),
          sensitive: chk('m-fsens'),
          active: chk('m-fact')
        };
        if(f){ for(var k in rec) f[k] = rec[k]; } else { S.draft.fields.push(newField(rec)); }
        renderForm();
        return true;
      }
    });

    ['m-fname', 'm-fmin', 'm-fmax', 'm-fex'].forEach(function(id){
      var el = document.getElementById(id);
      var wrap = document.getElementById('wrap-' + id);
      if(el && wrap){
        el.addEventListener('input', function(){
          if(el.value.trim().length > 0){
            wrap.classList.add('has-value');
            wrap.classList.remove('is-error');
          } else {
            wrap.classList.remove('has-value');
          }
        });
      }
    });
  }

  function persist(){
    syncForm(); var d = S.draft;
    if(!(d.name || '').trim()){ toast('El nombre de la estructura es obligatorio.', 'err'); return null; }
    if(!(d.ref || '').trim()){ toast('El nombre de referencia es obligatorio.', 'err'); return null; }
    if(d.needsApproval && !(d.sustentoFile || '').trim()){ toast('El archivo de sustento es obligatorio cuando la estructura requiere aprobación.', 'err'); return null; }
    if(!d.groups || d.groups.length === 0){ toast('Debe incluir al menos una agrupación en la estructura.', 'err'); return null; }
    if(!d.fields || d.fields.length === 0){ toast('Debe agregar al menos un campo a la estructura antes de guardar.', 'err'); return null; }

    if(S.mode === 'edit'){
      var orig = find(S.origId);
      if(orig && orig.state === 'Observado'){
        orig.name = d.name;
        orig.ref = d.ref;
        orig.desc = d.desc;
        orig.alcance = d.alcance;
        orig.maxErr = d.maxErr;
        orig.needsApproval = d.needsApproval;
        orig.sustentoFile = d.sustentoFile;
        orig.groups = clone(d.groups);
        orig.fields = clone(d.fields);
        orig.state = 'Elaboración';
        orig.date = today();
        toast('Estructura <b>' + orig.code + '</b> actualizada y devuelta a Elaboración. Ahora puede validarla.', 'ok');
        d = orig;
      } else {
        S.seq++;
        var modRec = clone(d);
        modRec.id = uid();
        modRec.code = code(S.seq);
        modRec.type = 'Modificación';
        modRec.state = 'Elaboración';
        modRec.date = today();
        S.structures.unshift(modRec);
        toast('Solicitud de modificación de <b>' + (orig ? orig.code : d.code) + '</b> registrada como <b>' + modRec.code + '</b> en estado Elaboración.', 'ok');
        d = modRec;
      }
    } else {
      S.seq++; d.code = code(S.seq); d.type = 'Creación'; d.state = 'Elaboración'; S.structures.unshift(d);
      toast('Estructura <b>' + d.code + '</b> guardada correctamente. Ahora puede validarla haciendo clic en "Validar".', 'ok');
    }
    renderList(); return d;
  }

  function confirmDeleteStructure(id){
    var sDel = find(id);
    if(!sDel) return;
    if(sDel.state !== 'Elaboración' && sDel.state !== 'Observado'){
      toast('Solo pueden eliminarse estructuras en estado Elaboración u Observado.', 'err');
      return;
    }
    var html = '<div style="display:flex;flex-direction:column;gap:16px;padding:4px 0;">' +
      '<div style="display:flex;align-items:center;gap:12px;">' +
        '<div style="width:40px;height:40px;padding:8px;background:#FFDBD7;border-radius:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
          '<svg viewBox="0 0 24 24" style="width:20px;height:20px;stroke:#490005;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg>' +
        '</div>' +
        '<div style="color:#252220;font-size:18px;font-family:Inter,sans-serif;font-weight:600;line-height:24px;">¿Eliminar la estructura ' + esc(sDel.code) + '?</div>' +
      '</div>' +
      '<div style="color:#252220;font-size:16px;font-family:Inter,sans-serif;font-weight:400;line-height:24px;padding-left:4px;padding-right:4px;">' +
        'Esta acción es permanente. Se perderá toda la información registrada de <b>' + esc(sDel.name) + '</b> y no podrá recuperarse.' +
      '</div>' +
    '</div>';

    modal(html, function(){
      sDel.state = 'Eliminado';
      renderList();
      toast('Estructura <b>' + sDel.code + '</b> eliminada.', 'err');
      return true;
    }, 'Eliminar');
  }

  function openValidateModal(id){
    var sVal = find(id);
    if(!sVal) return;
    if(sVal.state !== 'Elaboración' && sVal.state !== 'Observado'){
      toast('Solo pueden validarse estructuras en estado Elaboración u Observado.', 'err');
      return;
    }
    var sendsToApprover = sVal.needsApproval;
    var msg = sendsToApprover
      ? 'Al validar la estructura <b>' + esc(sVal.name) + '</b>, su estado cambiará a <b>Validado</b> y quedará en espera de evaluación y resolución por parte del <b>Aprobador</b>.'
      : 'Al validar la estructura <b>' + esc(sVal.name) + '</b>, su estado cambiará a <b>Validado</b> y podrá proceder de inmediato con su aprobación formal.';

    var html = '<div style="display:flex;flex-direction:column;gap:16px;padding:4px 0;">' +
      '<div style="display:flex;align-items:center;gap:12px;">' +
        '<div style="width:40px;height:40px;padding:8px;background:#DDF0FF;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
          '<svg viewBox="0 0 24 24" style="width:20px;height:20px;stroke:#002D48;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>' +
        '</div>' +
        '<div style="color:#252220;font-size:18px;font-family:Inter,sans-serif;font-weight:600;line-height:24px;">¿Validar la estructura ' + esc(sVal.code) + '?</div>' +
      '</div>' +
      '<div style="color:#252220;font-size:15px;font-family:Inter,sans-serif;font-weight:400;line-height:22px;padding-left:4px;padding-right:4px;">' +
        msg +
      '</div>' +
    '</div>';

    modal(html, function(){
      sVal.state = 'Validado';
      if (S.draft && S.draft.id === sVal.id) {
        S.draft.state = 'Validado';
      }
      renderList();
      var currScreen = document.querySelector('.screen.on');
      var isInForm = currScreen && (currScreen.id === 'tra001-form' || currScreen.id === 'tra001-form-v2');

      if (!sendsToApprover && isInForm) {
        renderForm();
        updateStepButtons();
        toast('Estructura <b>' + sVal.code + '</b> validada correctamente. Ahora puede proceder a <b>Aprobar</b>.', 'ok');
      } else {
        toast('Estructura <b>' + sVal.code + '</b> validada correctamente' + (sendsToApprover ? ' y enviada al Aprobador.' : '.'), 'ok');
        if (window.go) window.go('tra001-list');
      }
      return true;
    }, 'Validar');
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

  function openDirectApproveModal(id){
    var sVal = find(id);
    if(!sVal) return;
    if(sVal.state !== 'Validado'){
      toast('Solo pueden evaluarse estructuras en estado Validado.', 'err');
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
      buildFigmaInfoMessage('¿Qué implica aprobar la estructura?', 'Permite dar conformidad formal a la estructura e incorporarla al catálogo oficial vigente de Tablas Maestras del SIIT.') +
    '</div>';

    openDrawer({
      width: '400px',
      title: 'Aprobar estructura ' + esc(sVal.code),
      subtitle: esc(sVal.name),
      bodyHtml: html,
      saveText: 'Aprobar estructura',
      onSave: function(){
        var isProg = document.querySelector('input[name="eval-apr-mode"]:checked').value === 'programada';
        if(isProg){
          var dt = val('eval-apr-date');
          if(!dt){ toast('Indique la fecha de vigencia para la aprobación programada.', 'err'); return false; }
          sVal.state = 'Aprobado';
          sVal.vigenciaDate = dt;
          if(S.draft && S.draft.id === sVal.id){ S.draft.state = 'Aprobado'; S.draft.vigenciaDate = dt; }
          renderList();
          toast('Estructura <b>' + sVal.code + '</b> aprobada (vigente desde ' + dt + ').', 'ok');
        } else {
          sVal.state = 'Aprobado';
          if(S.draft && S.draft.id === sVal.id){ S.draft.state = 'Aprobado'; }
          renderList();
          toast('Estructura <b>' + sVal.code + '</b> aprobada formalmente e incorporada al catálogo oficial.', 'ok');
        }
        var currScreen = document.querySelector('.screen.on');
        var isInForm = currScreen && (currScreen.id === 'tra001-form' || currScreen.id === 'tra001-form-v2');

        if(isInForm && S.draft && S.draft.id === sVal.id){
          renderForm();
          updateStepButtons();
        } else {
          if (window.go) window.go('tra001-list');
        }
        return true;
      }
    });

    var sBtn = document.getElementById('t001-drawer-save');
    if(sBtn) sBtn.style.background = '#06396E';
  }

  function openDirectObserveModal(id){
    var sVal = find(id);
    if(!sVal) return;
    if(sVal.state !== 'Validado'){
      toast('Solo pueden evaluarse estructuras en estado Validado.', 'err');
      return;
    }

    var html = '<div style="display:flex;flex-direction:column;gap:14px;">' +
      '<div style="display:flex;flex-direction:column;gap:6px;">' +
        '<label style="font-size:14px;font-weight:600;color:#1E293B;font-family:Inter,sans-serif;">Motivo de la observación <span style="color:#D51317;">*</span></label>' +
        '<textarea id="eval-obs-motivo" rows="4" placeholder="Detalle las observaciones, precisiones o ajustes requeridos..." style="width:100%;padding:10px 12px;border-radius:8px;border:1px solid #CBD5E1;font-size:13.5px;font-family:Inter,sans-serif;outline:none;resize:vertical;box-sizing:border-box;"></textarea>' +
        '<div id="eval-obs-error" style="display:none;font-size:12px;color:#DC2626;font-weight:500;">Debe ingresar el motivo de la observación para continuar.</div>' +
      '</div>' +
      buildFigmaInfoMessage('¿Qué implica observar la estructura?', 'Permite devolver la estructura al rol Creador en estado Observado para subsanar las precisiones o correcciones solicitadas.') +
    '</div>';

    openDrawer({
      width: '400px',
      title: 'Observar estructura ' + esc(sVal.code),
      subtitle: esc(sVal.name),
      bodyHtml: html,
      saveText: 'Observar estructura',
      onSave: function(){
        var motivo = val('eval-obs-motivo').trim();
        if(!motivo){
          var errEl = document.getElementById('eval-obs-error');
          if(errEl) errEl.style.display = 'block';
          return false;
        }
        sVal.state = 'Observado';
        sVal.obsMotivo = motivo;
        sVal.obsDate = today();
        if(S.draft && S.draft.id === sVal.id){ S.draft.state = 'Observado'; S.draft.obsMotivo = motivo; S.draft.obsDate = today(); }
        renderList();
        toast('Estructura <b>' + sVal.code + '</b> marcada como Observada. El Creador podrá modificarla.', 'warn');
        if (window.go) window.go('tra001-list');
        return true;
      }
    });

    var sBtn = document.getElementById('t001-drawer-save');
    if(sBtn) sBtn.style.background = '#06396E';
  }

  function openDirectRejectModal(id){
    var sVal = find(id);
    if(!sVal) return;
    if(sVal.state !== 'Validado'){
      toast('Solo pueden evaluarse estructuras en estado Validado.', 'err');
      return;
    }

    var html = '<div style="display:flex;flex-direction:column;gap:14px;">' +
      '<div style="display:flex;flex-direction:column;gap:6px;">' +
        '<label style="font-size:14px;font-weight:600;color:#1E293B;font-family:Inter,sans-serif;">Motivo del rechazo <span style="color:#D51317;">*</span></label>' +
        '<textarea id="eval-rej-motivo" rows="4" placeholder="Detalle el sustento técnico o normativo del rechazo definitivo..." style="width:100%;padding:10px 12px;border-radius:8px;border:1px solid #CBD5E1;font-size:13.5px;font-family:Inter,sans-serif;outline:none;resize:vertical;box-sizing:border-box;"></textarea>' +
        '<div id="eval-rej-error" style="display:none;font-size:12px;color:#DC2626;font-weight:500;">Debe ingresar el motivo del rechazo para continuar.</div>' +
      '</div>' +
      buildFigmaInfoMessage('¿Qué implica rechazar la estructura?', 'Permite rechazar de manera definitiva la estructura propuesta. El registro quedará archivado únicamente en modo de consulta.') +
    '</div>';

    openDrawer({
      width: '400px',
      title: 'Rechazar estructura ' + esc(sVal.code),
      subtitle: esc(sVal.name),
      bodyHtml: html,
      saveText: 'Rechazar estructura',
      onSave: function(){
        var motivo = val('eval-rej-motivo').trim();
        if(!motivo){
          var errEl = document.getElementById('eval-rej-error');
          if(errEl) errEl.style.display = 'block';
          return false;
        }
        sVal.state = 'Rechazado';
        sVal.rechazoMotivo = motivo;
        sVal.rechazoDate = today();
        if(S.draft && S.draft.id === sVal.id){ S.draft.state = 'Rechazado'; S.draft.rechazoMotivo = motivo; S.draft.rechazoDate = today(); }
        renderList();
        toast('Estructura <b>' + sVal.code + '</b> rechazada definitivamente.', 'err');
        if (window.go) window.go('tra001-list');
        return true;
      }
    });

    var sBtn = document.getElementById('t001-drawer-save');
    if(sBtn) sBtn.style.background = '#06396E';
  }

  function openEvaluateModal(id){
    openDirectApproveModal(id);
  }

  function openApproveModal(id){
    openEvaluateModal(id);
  }

  // File change listener
  document.addEventListener('change', function(e){
    if(e.target && e.target.id === 't001-file-input'){
      var file = e.target.files && e.target.files[0];
      if(file){
        if(!S.draft) S.draft = {};
        S.draft.sustentoFile = file.name;
        var disp = document.getElementById('t001-file-display');
        if(disp){
          disp.innerHTML = '<span style="color:#06396E;font-weight:600;display:inline-flex;align-items:center;gap:6px;"><svg viewBox="0 0 24 24" style="width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:2;"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>' + esc(file.name) + '</span>';
        }
        var box = document.getElementById('t001-file-box');
        if(box && !document.getElementById('t001-file-clear')){
          var clrBtn = document.createElement('button');
          clrBtn.type = 'button';
          clrBtn.id = 't001-file-clear';
          clrBtn.title = 'Quitar archivo';
          clrBtn.style.cssText = 'background:none;border:none;color:#D51317;cursor:pointer;padding:4px;display:flex;align-items:center;';
          clrBtn.innerHTML = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
          box.appendChild(clrBtn);
        }
        updateStepButtons();
      }
    }
  });

  document.addEventListener('click', function(e){
    // Clear Sustento File Handler
    var clrFile = e.target.closest('#t001-file-clear');
    if(clrFile){
      e.preventDefault();
      if(S.draft) S.draft.sustentoFile = '';
      var fInput = document.getElementById('t001-file-input');
      if(fInput) fInput.value = '';
      var disp = document.getElementById('t001-file-display');
      if(disp) disp.innerHTML = '<span style="color:#6C6865;font-weight:400;">Ningún archivo seleccionado</span>';
      clrFile.remove();
      updateStepButtons();
      return;
    }

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

    // Top Bar Save Button & Bottom Save Button
    var saveBtn = e.target.closest('#btn-save-tra001, [data-fbtn="save"]');
    if (saveBtn) {
      e.preventDefault();
      syncForm();
      if (!isStep1Valid()) {
        toast('Completa los campos obligatorios de Datos generales' + (S.draft && S.draft.needsApproval ? ' (Nombre, Referencia y Archivo de sustento).' : ' (Nombre y Referencia).'), 'warn');
        S.tab = 1; S.step = 1; renderForm();
        return;
      }
      if (!isStep2Valid()) {
        toast('Debe incluir al menos una agrupación en la estructura.', 'warn');
        S.tab = 2; S.step = 2; renderForm();
        return;
      }
      if (!isStep3Valid()) {
        toast('Debe registrar al menos un campo en la estructura antes de guardar.', 'warn');
        S.tab = 3; S.step = 3; renderForm();
        return;
      }
      var d = S.draft;
      if (d.state !== 'Validado' && d.state !== 'Aprobado') d.state = 'Elaboración';
      var res = persist();
      if (res) {
        S.draft = res;
        S.mode = 'edit';
        S.origId = res.id;
        S.draftSaved = true;
        renderForm();
      }
      return;
    }

    // Top Bar Validate Button
    var valBtn = e.target.closest('#btn-validate-tra001, [data-fbtn="validate"]');
    if (valBtn) {
      e.preventDefault();
      if (valBtn.disabled || !S.draftSaved) {
        toast('Primero debe guardar la estructura antes de validarla.', 'warn');
        return;
      }
      if (S.draft && S.draft.id) {
        openValidateModal(S.draft.id);
      }
      return;
    }

    // Top Bar Aprobador Action Buttons (Aprobar, Observar, Rechazar)
    var aprBtn = e.target.closest('#btn-approve-tra001, #btn-approve-tra001-v2, [data-fbtn="approve"]');
    if (aprBtn) {
      e.preventDefault();
      if (S.draft && S.draft.id) {
        openDirectApproveModal(S.draft.id);
      }
      return;
    }

    var obsBtn = e.target.closest('#btn-observe-tra001, #btn-observe-tra001-v2, [data-fbtn="observe"]');
    if (obsBtn) {
      e.preventDefault();
      if (S.draft && S.draft.id) {
        openDirectObserveModal(S.draft.id);
      }
      return;
    }

    var rejBtn = e.target.closest('#btn-reject-tra001, #btn-reject-tra001-v2, [data-fbtn="reject"]');
    if (rejBtn) {
      e.preventDefault();
      if (S.draft && S.draft.id) {
        openDirectRejectModal(S.draft.id);
      }
      return;
    }

    var evalBtn = e.target.closest('#btn-evaluate-tra001, #btn-evaluate-tra001-v2, [data-fbtn="evaluate"]');
    if (evalBtn) {
      e.preventDefault();
      if (S.draft && S.draft.id) {
        openDirectApproveModal(S.draft.id);
      }
      return;
    }

    var tabEl = e.target.closest('[data-tab]');
    if (tabEl) {
      e.preventDefault();
      syncForm();
      var targetTab = parseInt(tabEl.dataset.tab, 10);
      S.tab = targetTab;
      S.step = targetTab;
      renderForm();
      return;
    }

    // Drawer buttons handling
    var drwClose = e.target.closest('#t001-drawer-close, #t001-drawer-cancel');
    if (drwClose) {
      e.preventDefault();
      closeDrawer();
      return;
    }

    var drwSave = e.target.closest('#t001-drawer-save');
    if (drwSave) {
      e.preventDefault();
      var ovDrw = document.getElementById('t001-drawer');
      if (ovDrw && ovDrw._onSave) {
        if (ovDrw._onSave() !== false) {
          closeDrawer();
        }
      } else {
        closeDrawer();
      }
      return;
    }

    // Drawer Backdrop Click
    if (e.target.id === 't001-drawer') {
      closeDrawer();
      return;
    }

    var el = e.target.closest('[data-act],[data-gact],[data-fact],[data-fbtn],[data-mbtn],[data-step]');
    if(!el) return;
    if(el.dataset.step){
      syncForm();
      var targetStep = parseInt(el.dataset.step, 10);
      S.tab = targetStep;
      S.step = targetStep;
      renderForm();
      return;
    }
    e.preventDefault();
    if(el.dataset.act){
      var a = el.dataset.act, id = el.dataset.id;
      if(a === 'new') openCreate();
      else if(a === 'edit') openEdit(id);
      else if(a === 'view') openView(id);
      else if(a === 'validate'){
        openValidateModal(id);
      }
      else if(a === 'evaluate'){
        openEvaluateModal(id);
      }
      else if(a === 'approve'){
        openApproveModal(id);
      }
      else if(a === 'delete'){
        confirmDeleteStructure(id);
      }
      return;
    }
    if(el.dataset.gact){
      var g = el.dataset.gact;
      if(g === 'addg') openGroupModal();
      else if(g === 'editg') openGroupModal(el.dataset.gid);
      else if(g === 'delg'){ S.draft.groups = S.draft.groups.filter(function(x){ return x.id !== el.dataset.gid; }); renderForm(); }
      return;
    }
    if(el.dataset.fact){
      var fa = el.dataset.fact;
      if(fa === 'addf') openFieldModal();
      else if(fa === 'editf') openFieldModal(el.dataset.fid);
      else if(fa === 'delf'){ S.draft.fields = S.draft.fields.filter(function(x){ return x.id !== el.dataset.fid; }); renderForm(); }
      return;
    }
    if(el.dataset.fbtn){
      var b = el.dataset.fbtn;
      if(b === 'cancel') window.go('tra001-list');
      return;
    }
    if(el.dataset.mbtn){
      if(el.dataset.mbtn === 'cancel') closeModal();
      else if(el.dataset.mbtn === 'save'){ var ov = document.getElementById('t001-modal'); if(ov._onSave && ov._onSave() !== false) closeModal(); }
      return;
    }
  });

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      var d = document.getElementById('t001-drawer');
      if(d && d.style.display !== 'none'){
        closeDrawer();
        return;
      }
      var m = document.getElementById('t001-modal');
      if(m && m.style.display !== 'none'){
        closeModal();
        return;
      }
    }
  });

  function renderFormV2(){
    // Carga de ejemplo de estructura en estado "Validado" para evaluar/resolver
    var target = null;
    for(var i = 0; i < S.structures.length; i++){
      if(S.structures[i].state === 'Validado'){
        target = S.structures[i];
        break;
      }
    }
    if(!target && S.structures.length > 0){
      target = S.structures[0];
      target.state = 'Validado';
    }
    if(target){
      S.draft = clone(target);
      S.draft.state = 'Validado';
      S.origId = target.id;
    } else {
      makeDraft();
      S.draft.code = 'TM-0005';
      S.draft.name = 'Provincia';
      S.draft.ref = 'PROV';
      S.draft.state = 'Validado';
      S.draft.date = today();
      S.draft.sustentoFile = 'INFORME_PROV_2026.pdf';
    }
    S.mode = 'view';
    if(!S.tab) S.tab = 1;
    S.step = S.tab;
    renderForm('tra001-form-v2-mount');
  }

  window.__onShow = window.__onShow || {};
  window.__onShow['tra001-list'] = function(){ renderList(); };
  window.__onShow['tra001-form'] = function(){ renderForm('tra001-form-mount'); };
  window.__onShow['tra001-form-v2'] = function(){ renderFormV2(); };

  window.renderTra001List = function(){
    S.currentRole = getCurrentRole();
    renderList();
  };

  window.addEventListener('siit:rolechange', function(){
    S.currentRole = getCurrentRole();
    if(document.getElementById('tra001-list-mount')){
      renderList();
    }
    if(document.getElementById('tra001-form-mount') && S.draft){
      renderForm('tra001-form-mount');
    }
    if(document.getElementById('tra001-form-v2-mount') && S.draft){
      renderForm('tra001-form-v2-mount');
    }
  });

  seed();

  window.TRA001 = {
    getStructures: function(){
      return S.structures.slice();
    },
    getStructureByName: function(name){
      if(!name) return null;
      var clean = String(name).trim().toLowerCase();
      for(var i = 0; i < S.structures.length; i++){
        if(S.structures[i].name.toLowerCase() === clean) return S.structures[i];
      }
      return null;
    }
  };
})();
