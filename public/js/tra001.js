(function(){
  var PENCIL = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/><path d="M12 20h9"/></svg>';
  var TRASH = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>';
  var EYE = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><circle cx="12" cy="12" r="3"/><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/></svg>';
  var DOTS = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>';
  var CHECK = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M20 6L9 17l-5-5"/></svg>';
  var VALIDATE = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>';
  var APPROVE = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><polyline points="9 14 11 16 15 12"/></svg>';
  var LOCK = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>';
  var TYPES = ['Texto', 'Fecha', 'Numérico', 'Numérico decimal'];

  var S = { seq: 9, structures: [], draft: null, mode: 'create', origId: null, step: 1 };

  function pad(n){ n = String(n); while(n.length < 4) n = '0' + n; return n; }
  function code(n){ return 'TM-' + pad(n); }
  function uid(){ return 'x' + Math.random().toString(36).slice(2,9); }
  function today(){ var d = new Date(); function p(x){ return String(x).padStart(2,'0'); } return p(d.getDate()) + '/' + p(d.getMonth()+1) + '/' + d.getFullYear(); }
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
      { id: uid(), code: 'TM-0009', name: 'Tipos de vía', ref: 'TIPOS_VIA', alcance: 'Nacional', maxErr: 10, desc: 'Catálogo de tipos de vía para direcciones del SIIT.', type: 'Creación', state: 'Elaboración', date: '10/08/2026', groups: [newGroup({ name: 'Grupo General', locked: true })], fields: [] },
      { id: uid(), code: 'TM-0008', name: 'Actividad económica — CIIU', ref: 'CIIU', alcance: 'Nacional', maxErr: 20, desc: 'Clasificación Industrial Internacional Uniforme.', type: 'Creación', state: 'Elaboración', date: '08/08/2026', groups: [newGroup({ name: 'Grupo General', locked: true })], fields: [] },
      { id: uid(), code: 'TM-0007', name: 'Ubigeo — Distritos', ref: 'UBIGEO_DIST', alcance: 'Nacional', maxErr: 10, desc: 'Distritos y su código de ubicación geográfica.', type: 'Creación', state: 'Elaboración', date: '07/08/2026', groups: [newGroup({ name: 'Grupo General', locked: true })], fields: [] },
      { id: uid(), code: 'TM-0006', name: 'Departamento', ref: 'DEPTO', alcance: 'Nacional', maxErr: 10, desc: 'Catálogo recién creado, todavía sin campos definidos.', type: 'Creación', state: 'Elaboración', date: '06/08/2026', groups: [newGroup({ name: 'Grupo General', locked: true })], fields: [] },
      { id: uid(), code: 'TM-0005', name: 'Provincia', ref: 'PROV', alcance: 'Nacional', maxErr: 10, desc: 'Provincias por departamento.', type: 'Creación', state: 'Validado', date: '05/08/2026', groups: [newGroup({ name: 'Grupo General', locked: true })], fields: [] },
      { id: uid(), code: 'TM-0004', name: 'Países y Nacionalidades', ref: 'PAIS', alcance: 'Nacional', maxErr: 10, desc: 'Catálogo de países según ISO 3166.', type: 'Creación', state: 'Aprobado', date: '04/08/2026', groups: [newGroup({ name: 'Grupo General', locked: true })], fields: [] },
      { id: uid(), code: 'TM-0003', name: 'Moneda', ref: 'MONEDA', alcance: 'Nacional', maxErr: 10, desc: 'Monedas admitidas por el sistema con su símbolo.', type: 'Creación', state: 'Aprobado', date: '03/08/2026', groups: [newGroup({ name: 'Grupo General', locked: true })], fields: [] },
      { id: uid(), code: 'TM-0002', name: 'Tipo de Documento de Identidad', ref: 'TIPO_DOC', alcance: 'Nacional', maxErr: 10, desc: 'DNI, CE, PTP, Pasaporte, RUC.', type: 'Creación', state: 'Aprobado', date: '02/08/2026', groups: [newGroup({ name: 'Grupo General', locked: true })], fields: [] },
      { id: uid(), code: 'TM-0001', name: 'Estado Civil', ref: 'ESTADO_CIVIL', alcance: 'Nacional', maxErr: 10, desc: 'Soltero, Casado, Viudo, Divorciado.', type: 'Creación', state: 'Aprobado', date: '01/08/2026', groups: [newGroup({ name: 'Grupo General', locked: true })], fields: [] }
    ];
    S.seq = 9;
  }

  function stBadge(st){
    var m = { 'Elaboración': 'b-off', 'Validado': 'b-info', 'Verificado': 'b-info', 'Aprobado': 'b-ok', 'Observado': 'b-warn', 'Rechazado': 'b-danger', 'Eliminado': 'b-off' };
    return '<span class="badge ' + (m[st] || 'b-off') + '">' + st + '</span>';
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

  function renderList(){
    var mount = document.getElementById('tra001-list-mount');
    if(!mount) return;

    var rows = S.structures.map(function(s){
      var elim = s.state === 'Eliminado';
      var a = '<div class="acts">';
      if (!elim) {
        if (s.state === 'Elaboración') {
          a += '<a title="Validar" data-act="validate" data-id="' + s.id + '" style="color:#0B63C5;cursor:pointer;">' + VALIDATE + '</a>';
          a += '<a title="Editar" data-act="edit" data-id="' + s.id + '" style="color:var(--navy-800);cursor:pointer;">' + PENCIL + '</a>';
          a += '<a title="Eliminar" data-act="delete" data-id="' + s.id + '" style="color:#D51317;cursor:pointer;">' + TRASH + '</a>';
        }
        if (s.state === 'Validado') {
          a += '<a title="Aprobar" data-act="approve" data-id="' + s.id + '" style="color:#16A34A;cursor:pointer;">' + APPROVE + '</a>';
        }
      } else {
        a += '<span style="font-size:11px;color:var(--ink3);">Eliminado</span>';
      }
      a += '</div>';

      var k = (s.name + ' ' + s.code + ' ' + s.ref).toLowerCase();
      return '<tr data-k="' + esc(k) + '" data-st="' + s.state + '"' + (elim ? ' style="opacity:.5"' : '') + '>' +
        '<td class="num">' + s.code + '</td>' +
        '<td>' + esc(s.name) + '</td>' +
        '<td><span class="badge b-off" style="font-weight:500">' + s.type + '</span></td>' +
        '<td class="num">' + s.date + '</td>' +
        '<td>' + stBadge(s.state) + '</td>' +
        '<td style="text-align:right">' + a + '</td></tr>';
    }).join('');

    mount.innerHTML =
      '<div class="card" style="padding:20px 20px 16px;">' +
        '<div class="tools" style="margin-bottom:20px;">' +
          '<div class="search"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>' +
            '<input id="t001-q" placeholder="Buscar por código, nombre o referencia"></div>' +
          '<div class="tbl-actions">' +
            '<button class="btn-tbl-action" type="button"><svg viewBox="0 0 24 24"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></svg><span>Filtros</span></button>' +
            '<button class="btn-tbl-action" type="button"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18"/></svg><span>Columnas</span></button>' +
          '</div>' +
        '</div>' +
        '<div class="tw" style="border:1px solid rgba(32,32,32,0.12);border-radius:4px;overflow:hidden;margin-bottom:16px;">' +
          '<table style="min-width:100%;"><thead><tr>' +
            '<th><div class="th-cell"><span class="th-title">CÓDIGO</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg></div></div></th>' +
            '<th><div class="th-cell"><span class="th-title">ESTRUCTURA</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg></div></div></th>' +
            '<th><div class="th-cell"><span class="th-title">TIPO DE REGISTRO</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg></div></div></th>' +
            '<th><div class="th-cell"><span class="th-title">ÚLTIMA MODIFICACIÓN</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg></div></div></th>' +
            '<th><div class="th-cell"><span class="th-title">ESTADO</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg></div></div></th>' +
            '<th style="text-align:right">ACCIONES</th>' +
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
    S.mode = 'create'; S.origId = null; S.step = 1;
    S.draft = { id: uid(), code: code(S.seq + 1), name: '', ref: '', alcance: 'Nacional', maxErr: 10, desc: '', type: 'Creación', state: 'Elaboración', date: today(),
      groups: [newGroup({ name: 'Grupo General', desc: 'Agrupación por defecto. No puede eliminarse.', locked: true })], fields: [] };
  }

  function openCreate(){ makeDraft(); window.go('tra001-form'); }
  function openEdit(id){
    var s = find(id); if(!s) return;
    if(s.state !== 'Elaboración'){ toast('Solo se pueden modificar estructuras en estado Elaboración.', 'err'); return; }
    S.mode = 'edit'; S.origId = id; S.step = 1; S.draft = clone(s); window.go('tra001-form');
  }

  function isStep1Valid(){
    var d = S.draft;
    return !!(d && d.name && d.name.trim().length > 0 && d.ref && d.ref.trim().length > 0);
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
    var inputTag = opts.customHtml
      ? opts.customHtml
      : (opts.isTextarea
        ? '<textarea id="' + opts.id + '" maxlength="' + maxLen + '" placeholder="' + esc(opts.placeholder || '') + '">' + esc(opts.value || '') + '</textarea>' +
          '<div class="field-clear-btn" id="clear-' + opts.id + '" title="Limpiar texto">' +
            '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:#504C4A;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>' +
          '</div>'
        : '<input id="' + opts.id + '" value="' + esc(opts.value || '') + '" placeholder="' + esc(opts.placeholder || '') + '">');

    var hasVal = !!((opts.value && opts.value.trim().length > 0) || (opts.selectedValue && opts.selectedValue.trim().length > 0));
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

  function updateStepButtons(){
    if(!S.draft) return;
    var s1 = isStep1Valid();
    var s2 = isStep2Valid();
    var s3 = isStep3Valid();

    // Remove field error styling if valid
    var wName = document.getElementById('wrap-dg-name');
    if(wName && isStep1Valid()){
      wName.classList.remove('is-error');
    }
    var wRef = document.getElementById('wrap-dg-ref');
    if(wRef && isStep1Valid()){
      wRef.classList.remove('is-error');
    }

    var next1 = document.querySelector('[data-fbtn="next1"]');
    if(next1){
      next1.disabled = !s1;
      next1.style.opacity = s1 ? '1' : '0.5';
      next1.style.cursor = s1 ? 'pointer' : 'not-allowed';
    }

    var next2 = document.querySelector('[data-fbtn="next2"]');
    if(next2){
      next2.disabled = !s2;
      next2.style.opacity = s2 ? '1' : '0.5';
      next2.style.cursor = s2 ? 'pointer' : 'not-allowed';
    }

    var isAllValid = s1 && s2 && s3;
    var saveBtns = document.querySelectorAll('[data-fbtn="save"], #btn-save-tra001');
    for(var i = 0; i < saveBtns.length; i++){
      var btn = saveBtns[i];
      if(btn.id === 'btn-save-tra001'){
        btn.style.display = (S.step === 3) ? 'inline-flex' : 'none';
      }
      btn.disabled = !isAllValid;
      btn.style.opacity = isAllValid ? '1' : '0.5';
      btn.style.cursor = isAllValid ? 'pointer' : 'not-allowed';
    }
  }

  function syncForm(){
    var m = { 'dg-name': 'name', 'dg-ref': 'ref', 'dg-alc': 'alcance', 'dg-maxerr': 'maxErr', 'dg-desc': 'desc' };
    Object.keys(m).forEach(function(id){ var el = document.getElementById(id); if(el) S.draft[m[id]] = el.value; });
    updateStepButtons();
  }

  function updateWizardUI(){
    var mount = document.getElementById('tra001-wizard-mount');
    if(!mount) return;

    var currentStep = S.step;
    var steps = [
      { num: 1, name: 'Datos generales', desc: 'Nombre y reglas base' },
      { num: 2, name: 'Agrupaciones', desc: 'Grupos de campos' },
      { num: 3, name: 'Campos', desc: 'Atributos y tipos' }
    ];

    var html = '<div style="display:flex;width:100%;gap:0;margin-bottom:28px;background:#fff;padding:20px 16px 12px;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">' +
      steps.map(function(s, idx){
        var isFirst = idx === 0;
        var isLast = idx === steps.length - 1;
        var isCompleted = s.num < currentStep;
        var isActive = s.num === currentStep;

        var leftBg = isFirst ? 'transparent' : (s.num <= currentStep ? '#06396E' : '#F0ECE9');
        var rightBg = isLast ? 'transparent' : (s.num < currentStep ? '#06396E' : '#F0ECE9');

        var circleHtml = '';
        if(isCompleted){
          circleHtml = '<div style="width: 40px; height: 40px; background: #06396E; border-radius: 20px; display: flex; justify-content: center; align-items: center; flex-shrink: 0;">' +
            '<svg viewBox="0 0 24 24" style="width:20px;height:20px;stroke:white;fill:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;"><polyline points="20 6 9 17 4 12"/></svg>' +
          '</div>';
        } else if(isActive){
          circleHtml = '<div style="width: 40px; height: 40px; background: #005D8F; border-radius: 20px; outline: 4px #C5DFF3 solid; outline-offset: -4px; display: flex; justify-content: center; align-items: center; flex-shrink: 0;">' +
            '<div style="color: white; font-size: 16px; font-family: Inter, sans-serif; font-weight: 600;">' + s.num + '</div>' +
          '</div>';
        } else {
          circleHtml = '<div style="width: 40px; height: 40px; background: white; border-radius: 20px; outline: 1.5px rgba(32, 32, 32, 0.12) solid; outline-offset: -1.5px; display: flex; justify-content: center; align-items: center; flex-shrink: 0;">' +
            '<div style="color: #BEBBB8; font-size: 16px; font-family: Inter, sans-serif; font-weight: 500;">' + s.num + '</div>' +
          '</div>';
        }

        return '<div style="flex: 1 1 0; flex-direction: column; justify-content: flex-start; align-items: center; gap: 8px; display: inline-flex;">' +
          '<div style="align-self: stretch; justify-content: center; align-items: center; display: inline-flex;">' +
            '<div style="flex: 1 1 0; height: 2px; background: ' + leftBg + ';"></div>' +
            circleHtml +
            '<div style="flex: 1 1 0; height: 2px; background: ' + rightBg + ';"></div>' +
          '</div>' +
          '<div style="padding-bottom: 4px; flex-direction: column; justify-content: center; align-items: center; gap: 4px; display: flex; width: 100%; text-align: center;">' +
            '<div style="color: #06396E; font-size: 14px; font-family: Inter, sans-serif; font-weight: 600; line-height: 20px;">' + esc(s.name) + '</div>' +
            '<div style="color: #504C4A; font-size: 12px; font-family: Inter, sans-serif; font-weight: 400; line-height: 16px;">' + esc(s.desc) + '</div>' +
          '</div>' +
        '</div>';
      }).join('') +
    '</div>';

    mount.innerHTML = html;
  }

  function renderForm(){
    var mount = document.getElementById('tra001-form-mount'); if(!mount) return;
    if(!S.draft) makeDraft();
    var d = S.draft;
    var sub = document.getElementById('tra001-form-sub'); if(sub) sub.textContent = (S.mode === 'edit' ? 'Edición' : 'Creación') + ' · Paso ' + S.step + ' de 3';
    updateWizardUI();

    var statusCard = '<div class="card" style="margin-bottom:20px;">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;">' +
        '<div>' +
          '<h3 style="font-size:13px;font-weight:700;color:#06396E;text-transform:uppercase;letter-spacing:0.5px;margin:0 0 6px;">CREAR ESTRUCTURA</h3>' +
          '<div style="font-size:13px;color:#504C4A;">' +
            'Estado actual: ' + stBadge(d.state) + ' · Código <b>' + d.code + '</b>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

    var html = statusCard;

    if(S.step === 1){
      html += '<div class="card" style="margin-bottom:20px;"><h3 class="sec-t" style="font-size:13px;font-weight:700;color:#06396E;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:24px;">DATOS GENERALES</h3>' +
        '<div class="fgrid g2" style="margin-bottom:24px;">' +
          buildFigmaFieldHtml({ id: 'dg-name', label: 'Nombre de la estructura', value: d.name, placeholder: 'Ej. Actividad económica — CIIU', required: true, helperText: 'Este campo es obligatorio.' }) +
          buildFigmaFieldHtml({ id: 'dg-ref', label: 'Nombre de referencia', value: d.ref, placeholder: 'Nombre con el que se identifica el registro', required: true, helperText: 'Este campo es obligatorio.' }) +
        '</div>' +
        '<div style="margin-bottom:6px;">' +
          buildFigmaFieldHtml({ id: 'dg-desc', label: 'Descripción', value: d.desc, placeholder: 'Describa el propósito de la tabla maestra', required: false, isTextarea: true }) +
        '</div>' +
      '</div>' +
      '<div style="display:flex;justify-content:space-between"><button class="btn gho" data-fbtn="cancel" style="height:42px;padding:10px 18px;border-radius:8px;">Cancelar</button><button class="btn pri" data-fbtn="next1" style="height:42px;padding:10px 18px;background:#06396E;border-radius:8px;color:white;font-weight:600;">Siguiente: Agrupaciones →</button></div>';
    } else if(S.step === 2){
      var grows = d.groups.map(function(g, i){
        var del = g.locked ? '<span style="color:var(--ink3)">' + LOCK + '</span>' : '<a class="dn" title="Quitar" data-gact="delg" data-gid="' + g.id + '">' + TRASH + '</a>';
        return '<tr><td class="num">' + (i + 1) + '</td>' +
          '<td class="lnk"><a data-gact="editg" data-gid="' + g.id + '">' + esc(g.name) + '</a>' + (g.locked ? ' <span class="badge b-off" style="margin-left:6px">por defecto</span>' : '') + '</td>' +
          '<td>' + esc(g.desc || 'Agrupación por defecto. No puede eliminarse.') + '</td>' +
          '<td style="text-align:right"><div class="acts"><a title="Editar" data-gact="editg" data-gid="' + g.id + '">' + PENCIL + '</a>' + del + '</div></td></tr>';
      }).join('');
      html += '<div class="card" style="margin-bottom:20px;">' +
        '<div class="chead" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">' +
          '<h3 class="sec-t" style="font-size:13px;font-weight:700;color:#06396E;text-transform:uppercase;letter-spacing:0.5px;margin:0;">AGRUPACIONES</h3>' +
          '<button class="btn gho" data-gact="addg" style="border-color:#06396E;color:#06396E;font-weight:600;">+ Agregar agrupación</button>' +
        '</div>' +
        '<div class="tw" style="border:1px solid rgba(32,32,32,0.12);border-radius:4px;overflow:hidden;"><table class="subtable" style="min-width:100%;"><thead><tr><th style="width:60px">ORDEN</th><th>NOMBRE DE LA AGRUPACIÓN</th><th>DESCRIPCIÓN</th><th style="text-align:right">ACCIONES</th></tr></thead><tbody>' + grows + '</tbody></table></div></div>' +
        '<div style="display:flex;justify-content:space-between"><button class="btn gho" data-fbtn="prev1" style="height:42px;padding:10px 18px;border-radius:8px;">← Anterior</button><button class="btn pri" data-fbtn="next2" style="height:42px;padding:10px 18px;background:#06396E;border-radius:8px;color:white;font-weight:600;">Siguiente: Campos →</button></div>';
    } else if(S.step === 3){
      var frows = d.fields.map(function(f, i){
        return '<tr><td class="num">' + (i + 1) + '</td>' +
          '<td class="lnk"><a data-fact="editf" data-fid="' + f.id + '">' + esc(f.name || '(sin nombre)') + '</a></td>' +
          '<td>' + esc(f.type) + '</td>' +
          '<td class="num">' + (f.min === '' ? '—' : f.min) + '</td><td class="num">' + (f.max === '' ? '—' : f.max) + '</td>' +
          '<td>' + (f.required ? '<span class="badge b-ok">Sí</span>' : '<span class="badge b-off">No</span>') + '</td>' +
          '<td>' + esc(f.group) + '</td>' +
          '<td>' + (f.sensitive ? '<span class="badge b-warn">Sí</span>' : '<span class="badge b-off">No</span>') + '</td>' +
          '<td>' + (f.active ? '<span class="badge b-ok">Activo</span>' : '<span class="badge b-off">Inactivo</span>') + '</td>' +
          '<td style="text-align:right"><div class="acts"><a title="Editar" data-fact="editf" data-fid="' + f.id + '">' + PENCIL + '</a><a class="dn" title="Quitar" data-fact="delf" data-fid="' + f.id + '">' + TRASH + '</a></div></td></tr>';
      }).join('') || '<tr><td colspan="10" style="color:#64748B;text-align:center;padding:16px;">Aún no hay campos. Use "Agregar campo".</td></tr>';
      html += '<div class="card" style="margin-bottom:20px;">' +
        '<div class="chead" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">' +
          '<h3 class="sec-t" style="font-size:13px;font-weight:700;color:#06396E;text-transform:uppercase;letter-spacing:0.5px;margin:0;">CAMPOS</h3>' +
          '<button class="btn gho" data-fact="addf" style="border-color:#06396E;color:#06396E;font-weight:600;">+ Agregar campo</button>' +
        '</div>' +
        '<div class="tw" style="border:1px solid rgba(32,32,32,0.12);border-radius:4px;overflow:hidden;"><table class="subtable" style="min-width:100%;"><thead><tr><th style="width:56px">ORDEN</th><th>NOMBRE DEL CAMPO</th><th>TIPO DE DATO</th><th>LONG. MÍN.</th><th>LONG. MÁX.</th><th>OBLIGATORIO</th><th>AGRUPACIÓN</th><th>DATO SENSIBLE</th><th>ESTADO</th><th style="text-align:right">ACCIONES</th></tr></thead><tbody>' + frows + '</tbody></table></div></div>' +
        '<div style="display:flex;justify-content:space-between"><button class="btn gho" data-fbtn="prev2" style="height:42px;padding:10px 18px;border-radius:8px;">← Anterior</button><button class="btn pri" data-fbtn="save" style="height:42px;padding:10px 18px;background:#06396E;border-radius:8px;color:white;font-weight:600;display:inline-flex;align-items:center;gap:8px;"><svg viewBox="0 0 24 24" style="width:18px;height:18px;stroke:white;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg><span>Guardar</span></button></div>';
    }

    mount.innerHTML = html;
    if(S.step === 1){
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

  function openGroupModal(gid){
    var g = gid ? S.draft.groups.filter(function(x){ return x.id === gid; })[0] : null;
    var html = '<h3 style="font-size:18px;font-weight:700;color:#0F172A;margin:0 0 4px;">' + (g ? 'Editar agrupación' : 'Agregar agrupación') + '</h3>' +
      '<p style="font-size:13px;color:#64748B;margin:0 0 24px;">Secciones lógicas que organizan los campos de la estructura.</p>' +
      '<div class="fgrid g2" style="gap:20px;">' +
        buildFigmaFieldHtml({ id: 'm-gname', label: 'Nombre', value: g ? g.name : '', placeholder: 'Nombre de la agrupación', required: true, helperText: 'El nombre de la agrupación es obligatorio.' }) +
        buildFigmaFieldHtml({ id: 'm-gdesc', label: 'Descripción', value: g ? g.desc : '', placeholder: 'Descripción opcional', required: false }) +
      '</div>';
    modal(html, function(){
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

    var html = '<h3 style="font-size:18px;font-weight:700;color:#0F172A;margin:0 0 4px;">' + (f ? 'Editar campo' : 'Agregar campo') + '</h3>' +
      '<p style="font-size:13px;color:#64748B;margin:0 0 24px;">Las características varían según el tipo de dato seleccionado.</p>' +
      '<div class="fgrid g2" style="gap:12px 20px;">' +
        buildFigmaFieldHtml({ id: 'm-fname', label: 'Nombre del campo', value: f ? f.name : '', placeholder: 'Nombre del atributo', required: true, helperText: 'El nombre del campo es obligatorio.' }) +
        buildCustomSelectHtml({ id: 'm-ftype', label: 'Tipo de dato', options: TYPES, selectedValue: f ? f.type : '', placeholder: 'Seleccionar...', required: true, helperText: 'El tipo de dato es obligatorio.' }) +
        buildCustomSelectHtml({ id: 'm-fgroup', label: 'Agrupación', options: gnames, selectedValue: f ? f.group : (gnames[0] || ''), placeholder: 'Seleccionar...', required: true, helperText: 'La agrupación es obligatoria.' }) +
        buildFigmaFieldHtml({ id: 'm-fmin', label: 'Long. mínima', value: f && f.min !== '' ? f.min : '', placeholder: '0', required: false }) +
        buildFigmaFieldHtml({ id: 'm-fmax', label: 'Long. máxima', value: f && f.max !== '' ? f.max : '', placeholder: '255', required: false }) +
        buildCustomSelectHtml({ id: 'm-fparent', label: 'Depende de (campo padre)', options: parentFields, selectedValue: f ? (f.parent || '---') : '---', placeholder: 'Seleccionar...', required: false }) +
        buildFigmaFieldHtml({ id: 'm-fex', label: 'Ejemplo', value: f ? (f.example || '') : '', placeholder: 'Ej. Lima', required: false }) +
      '</div>' +
      '<div style="display:flex;align-items:center;gap:28px;margin-top:16px;padding-top:4px;">' +
        '<label style="position:static;display:flex;align-items:center;gap:8px;font-size:13.5px;font-family:Inter,sans-serif;font-weight:500;color:#334155;cursor:pointer;"><input class="chk" type="checkbox" id="m-freq"' + (f && f.required ? ' checked' : '') + ' style="width:16px;height:16px;cursor:pointer;"> Obligatorio</label>' +
        '<label style="position:static;display:flex;align-items:center;gap:8px;font-size:13.5px;font-family:Inter,sans-serif;font-weight:500;color:#334155;cursor:pointer;"><input class="chk" type="checkbox" id="m-fsens"' + (f && f.sensitive ? ' checked' : '') + ' style="width:16px;height:16px;cursor:pointer;"> Dato sensible (encriptado)</label>' +
        '<label style="position:static;display:flex;align-items:center;gap:8px;font-size:13.5px;font-family:Inter,sans-serif;font-weight:500;color:#334155;cursor:pointer;"><input class="chk" type="checkbox" id="m-fact"' + (!f || f.active ? ' checked' : '') + ' style="width:16px;height:16px;cursor:pointer;"> Activo</label>' +
      '</div>';

    modal(html, function(){
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
    }, 'Aceptar');

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
    if(!d.groups || d.groups.length === 0){ toast('Debe incluir al menos una agrupación en la estructura.', 'err'); return null; }
    if(!d.fields || d.fields.length === 0){ toast('Debe agregar al menos un campo a la estructura antes de guardar.', 'err'); return null; }

    if(S.mode === 'edit'){
      var orig = find(S.origId);
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
    } else {
      S.seq++; d.code = code(S.seq); d.type = 'Creación'; d.state = 'Elaboración'; S.structures.unshift(d);
      toast('Estructura <b>' + d.code + '</b> creada correctamente en estado Elaboración.', 'ok');
    }
    renderList(); return d;
  }

  function confirmDeleteStructure(id){
    var sDel = find(id);
    if(!sDel) return;
    if(sDel.state !== 'Elaboración'){
      toast('Solo pueden eliminarse estructuras en estado Elaboración.', 'err');
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
    if(sVal.state !== 'Elaboración'){
      toast('Solo pueden validarse estructuras en estado Elaboración.', 'err');
      return;
    }
    var html = '<div style="display:flex;flex-direction:column;gap:16px;padding:4px 0;">' +
      '<div style="display:flex;align-items:center;gap:12px;">' +
        '<div style="width:40px;height:40px;padding:8px;background:#DDF0FF;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
          '<svg viewBox="0 0 24 24" style="width:20px;height:20px;stroke:#002D48;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>' +
        '</div>' +
        '<div style="color:#252220;font-size:18px;font-family:Inter,sans-serif;font-weight:600;line-height:24px;">¿Validar la estructura ' + esc(sVal.code) + '?</div>' +
      '</div>' +
      '<div style="color:#252220;font-size:15px;font-family:Inter,sans-serif;font-weight:400;line-height:22px;padding-left:4px;padding-right:4px;">' +
        'Al validar la estructura <b>' + esc(sVal.name) + '</b>, su estado cambiará a <b>Validado</b> para su posterior aprobación.' +
      '</div>' +
    '</div>';

    modal(html, function(){
      sVal.state = 'Validado';
      renderList();
      toast('Estructura <b>' + sVal.code + '</b> validada correctamente.', 'ok');
      return true;
    }, 'Validar');
  }

  function openApproveModal(id){
    var sApp = find(id);
    if(!sApp) return;
    if(sApp.state !== 'Validado'){
      toast('Solo pueden aprobarse estructuras en estado Validado.', 'err');
      return;
    }
    var html = '<div style="display:flex;flex-direction:column;gap:16px;padding:4px 0;">' +
      '<div style="display:flex;align-items:center;gap:12px;">' +
        '<div style="width:40px;height:40px;padding:8px;background:#D7F5E8;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
          '<svg viewBox="0 0 24 24" style="width:20px;height:20px;stroke:#004C37;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><polyline points="9 14 11 16 15 12"/></svg>' +
        '</div>' +
        '<div style="color:#252220;font-size:18px;font-family:Inter,sans-serif;font-weight:600;line-height:24px;">¿Aprobar la estructura ' + esc(sApp.code) + '?</div>' +
      '</div>' +
      '<div style="color:#252220;font-size:16px;font-family:Inter,sans-serif;font-weight:400;line-height:24px;padding-left:4px;padding-right:4px;">' +
        'Seleccione la modalidad de aprobación para <b>' + esc(sApp.name) + '</b>.' +
      '</div>' +
      '<div style="display:flex;flex-direction:column;gap:10px;margin-top:4px;">' +
        '<label style="position:static;display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border:1px solid #E2E8F0;border-radius:8px;cursor:pointer;background:#fff;">' +
          '<input type="radio" name="app-type" value="inmediata" checked style="margin-top:2px;" onclick="document.getElementById(\'app-date-box\').style.display=\'none\';">' +
          '<div>' +
            '<div style="font-size:13.5px;font-weight:600;color:#1E293B;">Aprobación Inmediata</div>' +
            '<div style="font-size:12px;color:#64748B;">Incorpora la estructura de inmediato a las vigentes en el SIIT.</div>' +
          '</div>' +
        '</label>' +
        '<label style="position:static;display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border:1px solid #E2E8F0;border-radius:8px;cursor:pointer;background:#fff;">' +
          '<input type="radio" name="app-type" value="programada" style="margin-top:2px;" onclick="document.getElementById(\'app-date-box\').style.display=\'block\';">' +
          '<div>' +
            '<div style="font-size:13.5px;font-weight:600;color:#1E293B;">Aprobación Programada</div>' +
            '<div style="font-size:12px;color:#64748B;">Indica una fecha a partir de la cual entra en vigencia.</div>' +
          '</div>' +
        '</label>' +
      '</div>' +
      '<div id="app-date-box" style="display:none;margin-top:4px;">' +
        '<div class="f"><label>Fecha de inicio de vigencia <span class="req">*</span></label><input type="date" id="m-app-date" value="' + today().split('/').reverse().join('-') + '"></div>' +
      '</div>' +
    '</div>';

    modal(html, function(){
      var isProg = document.querySelector('input[name="app-type"]:checked').value === 'programada';
      if(isProg){
        var dt = val('m-app-date');
        if(!dt){ toast('La fecha de vigencia es obligatoria para aprobación programada.', 'err'); return false; }
        sApp.state = 'Aprobado';
        sApp.vigenciaDate = dt;
        renderList();
        toast('Estructura <b>' + sApp.code + '</b> aprobada. Vigente a partir de <b>' + dt + '</b>.', 'ok');
      } else {
        sApp.state = 'Aprobado';
        renderList();
        toast('Estructura <b>' + sApp.code + '</b> aprobada e incorporada como vigente de inmediato.', 'ok');
      }
      return true;
    }, 'Aprobar');
  }

  document.addEventListener('click', function(e){
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

    // Top Bar Save Button
    var saveBtn = e.target.closest('#btn-save-tra001');
    if (saveBtn) {
      syncForm();
      if (!isStep1Valid() || !isStep2Valid() || !isStep3Valid()) return;
      var d = S.draft;
      if (d.state !== 'Validado' && d.state !== 'Aprobado') d.state = 'Elaboración';
      var res = persist();
      if (res && window.go) window.go('tra001-list');
      return;
    }

    var el = e.target.closest('[data-act],[data-gact],[data-fact],[data-fbtn],[data-mbtn],[data-step]');
    if(!el) return;
    if(el.dataset.step){
      var targetStep = parseInt(el.dataset.step, 10);
      if(targetStep > 1 && !isStep1Valid()) return;
      if(targetStep > 2 && !isStep2Valid()) return;
      S.step = targetStep; renderForm(); return;
    }
    e.preventDefault();
    if(el.dataset.act){
      var a = el.dataset.act, id = el.dataset.id;
      if(a === 'new') openCreate();
      else if(a === 'edit') openEdit(id);
      else if(a === 'validate'){
        openValidateModal(id);
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
      else if(b === 'next1'){ syncForm(); if(!isStep1Valid()) return; S.step = 2; renderForm(); }
      else if(b === 'next2'){ syncForm(); if(!isStep2Valid()) return; S.step = 3; renderForm(); }
      else if(b === 'prev1') { S.step = 1; renderForm(); }
      else if(b === 'prev2') { S.step = 2; renderForm(); }
      else if(b === 'save'){
        syncForm();
        if(!isStep1Valid() || !isStep2Valid() || !isStep3Valid()) return;
        var r = persist(); if(r) window.go('tra001-list');
      }
      return;
    }
    if(el.dataset.mbtn){
      if(el.dataset.mbtn === 'cancel') closeModal();
      else if(el.dataset.mbtn === 'save'){ var ov = document.getElementById('t001-modal'); if(ov._onSave && ov._onSave() !== false) closeModal(); }
      return;
    }
  });

  window.__onShow = window.__onShow || {};
  window.__onShow['tra001-list'] = function(){ renderList(); };
  window.__onShow['tra001-form'] = function(){ renderForm(); };
  seed();
})();
