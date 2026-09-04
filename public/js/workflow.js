/* ==========================================================================
   SIIT · MOTOR DE FLUJOS (WORKFLOW DESIGNER & PROCESS GRAPH ENGINE)
   ========================================================================== */

(function(){
  var esc = function(x){ return (x == null ? '' : String(x)).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); };
  
  var GRUPOS = [
    {id:'G1', n:'Gestión Documental', s:'UACGD · Mesa de Partes · SGD', u:'Oficina de Atención al Ciudadano'},
    {id:'G2', n:'Inteligencia e Inspectiva', s:'DINI · SDIE · SIFS/SIFN', u:'Dirección de Inteligencia Inspectiva'},
    {id:'G3', n:'Inspección', s:'Inspector / Equipo de inspección', u:'Intendencia Regional'},
    {id:'G4', n:'Supervisión Inspectiva', s:'Supervisor · Trámite de Órdenes', u:'Intendencia Regional'},
    {id:'G5', n:'Autoridad Instructora', s:'SIRE · Instructor · Asistente', u:'Sub Intendencia de Resolución'},
    {id:'G6', n:'Autoridad Sancionadora', s:'SISA · Subintendente · Intendencia', u:'Sub Intendencia de Sanción'},
    {id:'G7', n:'Tribunal de Fiscalización', s:'TFL · Secretaría Técnica · Sala', u:'Tribunal de Fiscalización Laboral'},
    {id:'G8', n:'Administrado', s:'Casilla Electrónica · actor externo', u:'Externo', ext:true}
  ];

  var FLUJOS = [
    {cod:'WF-001', n:'Gestión de la actuación inspectiva', tram:'PO2.3', proc:'PO2', ver:'01', est:'Vigente', vig:'01/08/2026', ini:'EXP-03'},
    {cod:'WF-002', n:'Procedimiento administrativo sancionador', tram:'PO2.4', proc:'PO2', ver:'01', est:'Vigente', vig:'01/08/2026', ini:'EXP-22'},
    {cod:'WF-003', n:'Recepción, registro y digitalización documental', tram:'PS2.1', proc:'PS2', ver:'01', est:'Vigente', vig:'01/08/2026', ini:'EXP-01'},
    {cod:'WF-004', n:'Asistencia técnica preventiva a empleadores', tram:'PM1.1', proc:'PM1', ver:'01', est:'En revisión', vig:'15/09/2026', ini:'AT-01'}
  ];

  var NODES_INITIAL = [
    {id:'EXP-01', n:'Documento recibido', tipo:'Inicial', grupo:'G1', plazo:1, alerta:1, x:80, y:80},
    {id:'EXP-03', n:'Pendiente de registro de entrada', tipo:'Intermedio', grupo:'G2', plazo:1, alerta:1, x:320, y:80},
    {id:'EXP-04', n:'Pendiente de calificación', tipo:'Intermedio', grupo:'G2', plazo:5, alerta:2, x:560, y:80},
    {id:'EXP-08', n:'Pendiente de programación', tipo:'Intermedio', grupo:'G2', plazo:5, alerta:2, x:800, y:80},
    {id:'EXP-12', n:'Actuaciones en ejecución', tipo:'Intermedio', grupo:'G3', plazo:30, alerta:5, x:1040, y:80},
    {id:'EXP-18', n:'Pendiente de revisión del supervisor', tipo:'Intermedio', grupo:'G4', plazo:5, alerta:2, x:1040, y:260},
    {id:'EXP-19', n:'Devuelto al inspector', tipo:'Reproceso', grupo:'G3', plazo:3, alerta:1, x:800, y:260},
    {id:'EXP-20', n:'Orden cerrada sin infracción', tipo:'Final', grupo:'G4', plazo:0, alerta:0, x:1040, y:440},
    {id:'EXP-21', n:'Acta de infracción emitida', tipo:'Intermedio', grupo:'G4', plazo:1, alerta:1, x:1280, y:260}
  ];

  var EDGES_INITIAL = [
    {id:'e1', from:'EXP-01', to:'EXP-03', sal:'EXITO'},
    {id:'e2', from:'EXP-03', to:'EXP-04', sal:'EXITO'},
    {id:'e3', from:'EXP-04', to:'EXP-08', sal:'EXITO'},
    {id:'e4', from:'EXP-08', to:'EXP-12', sal:'EXITO'},
    {id:'e5', from:'EXP-12', to:'EXP-18', sal:'EXITO'},
    {id:'e6', from:'EXP-18', to:'EXP-19', sal:'FALLIDO'},
    {id:'e7', from:'EXP-19', to:'EXP-18', sal:'CUALQUIERA'},
    {id:'e8', from:'EXP-18', to:'EXP-20', sal:'EXITO'},
    {id:'e9', from:'EXP-18', to:'EXP-21', sal:'EXITO'}
  ];

  var State = {
    flujos: FLUJOS,
    nodes: JSON.parse(JSON.stringify(NODES_INITIAL)),
    edges: JSON.parse(JSON.stringify(EDGES_INITIAL)),
    sel: null,
    zoom: 1,
    px: 0,
    py: 0
  };

  function renderWfList() {
    var mount = document.getElementById('wf-list-mount');
    if (!mount) return;

    var rows = State.flujos.map(function(f, i){
      var badge = f.est === 'Vigente' ? 'b-ok' : 'b-warn';
      return '<tr>' +
        '<td><input class="chk" type="checkbox"></td>' +
        '<td class="num">' + esc(f.cod) + '</td>' +
        '<td>' + esc(f.n) + '</td>' +
        '<td>' + esc(f.proc) + ' · ' + esc(f.tram) + '</td>' +
        '<td class="num">v' + esc(f.ver) + '</td>' +
        '<td><span class="badge ' + badge + '">' + esc(f.est) + '</span></td>' +
        '<td class="num">' + esc(f.vig) + '</td>' +
        '<td>' +
          '<div class="acts">' +
            '<a data-go="wf-editor" data-wfcode="' + esc(f.cod) + '" title="Ver Diseñador" style="color:var(--blue)">' +
              '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>' +
            '</a>' +
          '</div>' +
        '</td>' +
      '</tr>';
    }).join('');

    mount.innerHTML =
      '<div class="card" style="padding:20px 20px 16px;">' +
        '<div class="tools" style="margin-bottom:20px;">' +
          '<div class="search"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg><input placeholder="Buscar flujo..."></div>' +
          '<div class="tbl-actions">' +
            '<button class="btn-tbl-action" type="button"><svg viewBox="0 0 24 24"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></svg><span>Filtros</span></button>' +
            '<button class="btn-tbl-action" type="button"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18"/></svg><span>Columnas</span></button>' +
          '</div>' +
        '</div>' +
        '<div class="tw" style="border:1px solid rgba(32,32,32,0.12);border-radius:4px;overflow:hidden;margin-bottom:16px;"><table style="min-width:100%;">' +
          '<thead><tr>' +
            '<th style="width:36px;"><input class="chk" type="checkbox"></th>' +
            '<th><div class="th-cell"><span class="th-title">Código</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg></div></div></th>' +
            '<th><div class="th-cell"><span class="th-title">Nombre del Flujo</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg></div></div></th>' +
            '<th><div class="th-cell"><span class="th-title">Proceso</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg></div></div></th>' +
            '<th><div class="th-cell"><span class="th-title">Versión</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg></div></div></th>' +
            '<th><div class="th-cell"><span class="th-title">Estado</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg></div></div></th>' +
            '<th><div class="th-cell"><span class="th-title">Vigencia</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg></div></div></th>' +
            '<th style="text-align:right">Acciones</th>' +
          '</tr></thead>' +
          '<tbody>' + rows + '</tbody>' +
        '</table></div>' +
        '<div data-edge-buttons="true" data-report="true" data-rows-per-page="true" style="width: 100%; padding-top: 16px; background: white; border-top: 1px rgba(32, 32, 32, 0.12) solid; justify-content: space-between; align-items: center; gap: 16px; display: flex; flex-wrap: wrap;">' +
            '<div style="justify-content: flex-start; align-items: center; gap: 24px; display: flex">' +
                '<div style="color: #504C4A; font-size: 12px; font-family: Inter; font-weight: 500; line-height: 16px;">Mostrando 1–' + State.flujos.length + ' de ' + State.flujos.length + '</div>' +
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
  }

  function renderWfEditor() {
    var mount = document.getElementById('wf-editor-mount');
    if (!mount) return;

    mount.innerHTML =
      '<div class="card" style="margin-bottom:16px;padding:16px 20px;">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">' +
          '<div>' +
            '<h3 style="margin:0;font-size:16px;color:var(--navy-800);font-weight:700;">WF-001 · Gestión de la actuación inspectiva</h3>' +
            '<div style="font-size:12.5px;color:var(--ink3);">Versión v01 · Vigente desde 01/08/2026</div>' +
          '</div>' +
          '<div style="display:flex;gap:10px;">' +
            '<button class="btn gho" id="wf-btn-addnode">+ Agregar Estado</button>' +
            '<button class="btn gho" id="wf-btn-reset">Restaurar Grafo</button>' +
            '<button class="btn pri" id="wf-btn-save">Guardar Cambios</button>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div style="position:relative;width:100%;height:580px;background:#F8FAFC;border:1px solid #CBD5E1;border-radius:12px;overflow:hidden;" id="wf-canvas-container">' +
        '<svg id="wf-svg-canvas" style="width:100%;height:100%;position:absolute;inset:0;pointer-events:none;z-index:1"></svg>' +
        '<div id="wf-nodes-container" style="position:absolute;inset:0;z-index:2;pointer-events:auto;"></div>' +
      '</div>';

    drawGraph();

    document.getElementById('wf-btn-reset')?.addEventListener('click', function(){
      State.nodes = JSON.parse(JSON.stringify(NODES_INITIAL));
      State.edges = JSON.parse(JSON.stringify(EDGES_INITIAL));
      drawGraph();
      if(window.t001Toast) window.t001Toast('Diseño restaurado al estado inicial.','info');
    });

    document.getElementById('wf-btn-save')?.addEventListener('click', function(){
      if(window.t001Toast) window.t001Toast('Flujo guardado con éxito. Rige para nuevas instancias (RN-WF-028).','ok');
    });

    document.getElementById('wf-btn-addnode')?.addEventListener('click', function(){
      var num = State.nodes.length + 1;
      var id = 'EXP-' + (num < 10 ? '0' + num : num);
      State.nodes.push({
        id: id,
        n: 'Nuevo Estado ' + num,
        tipo: 'Intermedio',
        grupo: 'G3',
        plazo: 5,
        alerta: 2,
        x: 400 + (num * 20),
        y: 200 + (num * 15)
      });
      drawGraph();
    });
  }

  function drawGraph() {
    var nodesCont = document.getElementById('wf-nodes-container');
    var svgCanvas = document.getElementById('wf-svg-canvas');
    if (!nodesCont || !svgCanvas) return;

    nodesCont.innerHTML = '';
    svgCanvas.innerHTML = '';

    // Draw SVG connections
    State.edges.forEach(function(e){
      var fromNode = State.nodes.find(function(n){ return n.id === e.from; });
      var toNode = State.nodes.find(function(n){ return n.id === e.to; });
      if (!fromNode || !toNode) return;

      var x1 = fromNode.x + 90;
      var y1 = fromNode.y + 35;
      var x2 = toNode.x + 90;
      var y2 = toNode.y + 35;

      var strokeColor = e.sal === 'EXITO' ? '#166534' : e.sal === 'FALLIDO' ? '#D51317' : '#1E40AF';

      var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x1);
      line.setAttribute('y1', y1);
      line.setAttribute('x2', x2);
      line.setAttribute('y2', y2);
      line.setAttribute('stroke', strokeColor);
      line.setAttribute('stroke-width', '2.5');
      line.setAttribute('stroke-dasharray', e.sal === 'FALLIDO' ? '4' : 'none');
      svgCanvas.appendChild(line);
    });

    // Draw HTML Nodes
    State.nodes.forEach(function(n){
      var el = document.createElement('div');
      el.style.cssText = 'position:absolute;left:' + n.x + 'px;top:' + n.y + 'px;width:180px;background:#fff;border:2px solid #06396E;border-radius:10px;padding:10px 12px;box-shadow:0 6px 16px rgba(4,28,49,0.12);cursor:move;user-select:none;';
      
      var badgeBg = n.tipo === 'Inicial' ? '#DCFCE7' : n.tipo === 'Final' ? '#E2E8F0' : n.tipo === 'Reproceso' ? '#FEF3C7' : '#DBEAFE';
      var badgeColor = n.tipo === 'Inicial' ? '#166534' : n.tipo === 'Final' ? '#475569' : n.tipo === 'Reproceso' ? '#92400E' : '#1E40AF';

      el.innerHTML =
        '<div style="font-size:10px;font-weight:700;color:#64748B;">' + esc(n.id) + '</div>' +
        '<div style="font-size:12.5px;font-weight:700;color:#0A3A63;margin:2px 0 6px;line-height:1.2;">' + esc(n.n) + '</div>' +
        '<div style="display:flex;justify-content:space-between;align-items:center;">' +
          '<span style="font-size:10px;font-weight:700;padding:2px 6px;border-radius:4px;background:' + badgeBg + ';color:' + badgeColor + ';">' + esc(n.tipo) + '</span>' +
          '<span style="font-size:10.5px;color:#64748B;">' + esc(n.grupo) + ' · ' + n.plazo + 'd</span>' +
        '</div>';

      // Simple dragging implementation
      var isDragging = false;
      var startX, startY, origX, origY;

      el.addEventListener('mousedown', function(ev){
        isDragging = true;
        startX = ev.clientX;
        startY = ev.clientY;
        origX = n.x;
        origY = n.y;
        ev.stopPropagation();
      });

      window.addEventListener('mousemove', function(ev){
        if (!isDragging) return;
        var dx = ev.clientX - startX;
        var dy = ev.clientY - startY;
        n.x = Math.max(10, origX + dx);
        n.y = Math.max(10, origY + dy);
        el.style.left = n.x + 'px';
        el.style.top = n.y + 'px';
        
        // Re-render SVG lines efficiently
        drawGraph();
      });

      window.addEventListener('mouseup', function(){
        isDragging = false;
      });

      nodesCont.appendChild(el);
    });
  }

  window.__onShow = window.__onShow || {};
  window.__onShow['wf-list'] = renderWfList;
  window.__onShow['wf-editor'] = renderWfEditor;

  document.addEventListener('DOMContentLoaded', function(){
    var hash = location.hash.slice(1);
    if (hash === 'wf-list') renderWfList();
    if (hash === 'wf-editor') renderWfEditor();
  });
})();
