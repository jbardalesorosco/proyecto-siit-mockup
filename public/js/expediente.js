/* ==========================================================================
   SIIT · EXPEDIENTE ELECTRÓNICO (DATAGRID & TIMELINE TRACEABILITY)
   ========================================================================== */

(function(){
  var esc = function(x){ return (x == null ? '' : String(x)).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); };

  var EXPEDIENTES = [
    {
      id: 'EXP-2026-004821',
      asunto: 'Verificación de condiciones de seguridad y salud en el trabajo',
      empresa: 'CONSTRUCTORA SAN JOSÉ S.A.C.',
      ruc: '20549182901',
      materia: 'Seguridad y Salud en el Trabajo',
      origen: 'Denuncia Laboral',
      estado: 'Actuaciones en ejecución',
      grupo: 'G3 · Inspección',
      inspector: 'Inspector Pedro Morales V.',
      fechaIngreso: '02/08/2026',
      plazo: '18/30 días hábiles',
      semaforo: 'green',
      docsCount: 6
    },
    {
      id: 'EXP-2026-004790',
      asunto: 'Inspección en materia de pago de remuneraciones y gratificaciones',
      empresa: 'COMERCIAL LIMA SUR E.I.R.L.',
      ruc: '20192847102',
      materia: 'Relaciones de Trabajo',
      origen: 'Operativo Programado',
      estado: 'Pendiente de revisión del supervisor',
      grupo: 'G4 · Supervisión',
      inspector: 'Inspectora María Gómez F.',
      fechaIngreso: '28/07/2026',
      plazo: '4/5 días hábiles',
      semaforo: 'amber',
      docsCount: 8
    },
    {
      id: 'EXP-2026-004105',
      asunto: 'Procedimiento sancionador por infracción muy grave',
      empresa: 'INDUSTRIAS ALIMENTARIAS DEL PERÚ S.A.',
      ruc: '20491827409',
      materia: 'Laboral / Sancionador',
      origen: 'Acta de Infracción',
      estado: 'Pendiente de imputación de cargos',
      grupo: 'G5 · Instrucción',
      inspector: 'Abog. Roberto Castro T.',
      fechaIngreso: '15/07/2026',
      plazo: '9/10 días hábiles',
      semaforo: 'amber',
      docsCount: 14
    },
    {
      id: 'EXP-2026-003890',
      asunto: 'Verificación de registro en planilla electrónica PLAME',
      empresa: 'SERVICES GENERALES SAN JUAN S.A.',
      ruc: '20601928301',
      materia: 'Registro de Trabajadores',
      origen: 'Denuncia Virtual',
      estado: 'Expediente archivado',
      grupo: 'G1 · Archivo',
      inspector: 'Mesa de Partes',
      fechaIngreso: '01/06/2026',
      plazo: 'Concluido',
      semaforo: 'off',
      docsCount: 4
    }
  ];

  function renderExpList() {
    var mount = document.getElementById('exp-list-mount');
    if (!mount) return;

    var rows = EXPEDIENTES.map(function(e, i){
      var semColor = e.semaforo === 'green' ? '#16A34A' : e.semaforo === 'amber' ? '#D97706' : '#94A3B8';
      return '<tr>' +
        '<td><input class="chk" type="checkbox"></td>' +
        '<td>' + esc(e.id) + '</td>' +
        '<td>' + esc(e.asunto) + '</td>' +
        '<td>' + esc(e.materia) + '</td>' +
        '<td><span class="badge b-info">' + esc(e.estado) + '</span></td>' +
        '<td>' + esc(e.inspector) + '</td>' +
        '<td class="num">' + esc(e.plazo) + '</td>' +
        '<td class="num">' + e.docsCount + ' docs</td>' +
        '<td>' +
          '<div class="acts">' +
            '<a data-go="exp-detail" data-expid="' + esc(e.id) + '" title="Ver Expediente Electrónico" style="color:var(--navy-800)">' +
              '<svg viewBox="0 0 24 24" style="width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>' +
            '</a>' +
          '</div>' +
        '</td>' +
      '</tr>';
    }).join('');

    mount.innerHTML =
      '<div class="card" style="padding:20px 20px 16px;">' +
        '<div class="tools" style="margin-bottom:20px;">' +
          '<div class="search"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg><input placeholder="Buscar por número de expediente, RUC o Razón Social"></div>' +
          '<div class="tbl-actions">' +
            '<button class="btn-tbl-action" type="button"><svg viewBox="0 0 24 24"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></svg><span>Filtros</span></button>' +
            '<button class="btn-tbl-action" type="button"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18"/></svg><span>Columnas</span></button>' +
          '</div>' +
        '</div>' +
        '<div class="tw" style="border:1px solid rgba(32,32,32,0.12);border-radius:4px;overflow:hidden;margin-bottom:16px;"><table style="min-width:100%;">' +
          '<thead><tr>' +
            '<th style="width:36px;"><input class="chk" type="checkbox"></th>' +
            '<th><div class="th-cell"><span class="th-title">Nº Expediente / Asunto</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg></div></div></th>' +
            '<th><div class="th-cell"><span class="th-title">Sujeto Inspeccionado</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg></div></div></th>' +
            '<th><div class="th-cell"><span class="th-title">Materia</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg></div></div></th>' +
            '<th><div class="th-cell"><span class="th-title">Estado del Flujo</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg></div></div></th>' +
            '<th><div class="th-cell"><span class="th-title">Responsable</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg></div></div></th>' +
            '<th><div class="th-cell"><span class="th-title">Plazo Legal</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg></div></div></th>' +
            '<th><div class="th-cell"><span class="th-title">Documentos</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg></div></div></th>' +
            '<th style="text-align:right">Acciones</th>' +
          '</tr></thead>' +
          '<tbody>' + rows + '</tbody>' +
        '</table></div>' +
        '<div data-edge-buttons="true" data-report="true" data-rows-per-page="true" style="width: 100%; padding-top: 16px; background: white; border-top: 1px rgba(32, 32, 32, 0.12) solid; justify-content: space-between; align-items: center; gap: 16px; display: flex; flex-wrap: wrap;">' +
            '<div style="justify-content: flex-start; align-items: center; gap: 24px; display: flex">' +
                '<div style="color: #504C4A; font-size: 12px; font-family: Inter; font-weight: 500; line-height: 16px;">Mostrando 1–' + EXPEDIENTES.length + ' de ' + EXPEDIENTES.length + '</div>' +
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

  function renderExpDetail() {
    var mount = document.getElementById('exp-detail-mount');
    if (!mount) return;

    var exp = EXPEDIENTES[0];

    mount.innerHTML =
      '<div class="card" style="margin-bottom:20px;padding:20px 24px;border-left:4px solid var(--navy-800);">' +
        '<div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:16px;">' +
          '<div>' +
            '<div style="font-size:12px;font-weight:700;color:var(--navy-600);letter-spacing:0.5px;text-transform:uppercase;">Expediente Electrónico Unificado</div>' +
            '<h2 style="margin:4px 0 6px;font-size:22px;color:var(--navy-800);font-weight:800;">' + esc(exp.id) + '</h2>' +
            '<div style="font-size:14px;color:var(--ink2);font-weight:500;">' + esc(exp.asunto) + '</div>' +
          '</div>' +
          '<div style="text-align:right;">' +
            '<span class="badge b-info" style="font-size:13px;padding:6px 14px;">' + esc(exp.estado) + '</span>' +
            '<div style="font-size:12px;color:var(--ink3);margin-top:6px;">Sede: Oficina Zonal SJM</div>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div style="display:grid;grid-template-columns:1fr 340px;gap:20px;">' +
        '<div>' +
          '<div class="card">' +
            '<h3 class="sec-t">Índice Electrónico & Documentos Adjuntos (Foliado Digital)</h3>' +
            '<div class="tw"><table>' +
              '<thead><tr><th>Folio</th><th>Tipo Documental</th><th>Nº Documento</th><th>Fecha / Hora</th><th>Firmante</th><th>Hash SHA-256</th></tr></thead>' +
              '<tbody>' +
                '<tr><td>001 - 004</td><td><b>Hoja de Ruta</b></td><td>HR-2026-004821</td><td>02/08/2026 09:15</td><td>Mesa de Partes</td><td><code>e3b0c44298fc1c14...</code></td></tr>' +
                '<tr><td>005 - 008</td><td><b>Orden de Inspección</b></td><td>FIS-OI-2026-0192</td><td>02/08/2026 14:30</td><td>Intendente Reg.</td><td><code>f8a912782b1c4109...</code></td></tr>' +
                '<tr><td>009 - 015</td><td><b>Requerimiento de Info</b></td><td>RQI-2026-00812</td><td>04/08/2026 11:20</td><td>Insp. Pedro Morales</td><td><code>9a8c17b6e2d19401...</code></td></tr>' +
                '<tr><td>016 - 022</td><td><b>Constancia Notificación</b></td><td>CE-NOT-2026-8812</td><td>05/08/2026 16:45</td><td>Casilla Electrónica</td><td><code>7c10b441a9218204...</code></td></tr>' +
              '</tbody>' +
            '</table></div>' +
          '</div>' +
        '</div>' +

        '<div>' +
          '<div class="card">' +
            '<h3 class="sec-t">Datos del Sujeto</h3>' +
            '<div style="font-size:13px;line-height:1.6;color:var(--ink2);">' +
              '<div><b>Razón Social:</b><br/>' + esc(exp.empresa) + '</div>' +
              '<div style="margin-top:8px;"><b>RUC:</b> ' + esc(exp.ruc) + '</div>' +
              '<div style="margin-top:8px;"><b>Domicilio Fiscal:</b><br/>Av. Los Héroes 1042, SJM</div>' +
              '<div style="margin-top:8px;"><b>Inspector Asignado:</b><br/>' + esc(exp.inspector) + '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  window.__onShow = window.__onShow || {};
  window.__onShow['exp-list'] = renderExpList;
  window.__onShow['exp-detail'] = renderExpDetail;

  document.addEventListener('DOMContentLoaded', function(){
    var hash = location.hash.slice(1);
    if (hash === 'exp-list') renderExpList();
    if (hash === 'exp-detail') renderExpDetail();
  });
})();
