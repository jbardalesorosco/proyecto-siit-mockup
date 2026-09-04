/* ==========================================================================
   SIIT · CALENDARIO DE DÍAS NO HÁBILES (FERIADOS Y DÍAS INHÁBILES)
   ========================================================================== */

(function(){
  var FERIADOS = [
    { fecha: '01/01/2026', desc: 'Año Nuevo', ambito: 'Nacional', tipo: 'Feriado Nacional' },
    { fecha: '02/04/2026', desc: 'Jueves Santo', ambito: 'Nacional', tipo: 'Feriado Nacional' },
    { fecha: '03/04/2026', desc: 'Viernes Santo', ambito: 'Nacional', tipo: 'Feriado Nacional' },
    { fecha: '01/05/2026', desc: 'Día del Trabajo', ambito: 'Nacional', tipo: 'Feriado Nacional' },
    { fecha: '28/07/2026', desc: 'Fiestas Patrias', ambito: 'Nacional', tipo: 'Feriado Nacional' },
    { fecha: '29/07/2026', desc: 'Fiestas Patrias', ambito: 'Nacional', tipo: 'Feriado Nacional' },
    { fecha: '06/08/2026', desc: 'Batalla de Junín', ambito: 'Nacional', tipo: 'Feriado Nacional' },
    { fecha: '30/08/2026', desc: 'Santa Rosa de Lima', ambito: 'Nacional', tipo: 'Feriado Nacional' },
    { fecha: '08/10/2026', desc: 'Combate de Angamos', ambito: 'Nacional', tipo: 'Feriado Nacional' },
    { fecha: '01/11/2026', desc: 'Día de Todos los Santos', ambito: 'Nacional', tipo: 'Feriado Nacional' },
    { fecha: '08/12/2026', desc: 'Inmaculada Concepción', ambito: 'Nacional', tipo: 'Feriado Nacional' },
    { fecha: '09/12/2026', desc: 'Batalla de Ayacucho', ambito: 'Nacional', tipo: 'Feriado Nacional' },
    { fecha: '25/12/2026', desc: 'Navidad', ambito: 'Nacional', tipo: 'Feriado Nacional' }
  ];

  function renderCalendario() {
    var mount = document.getElementById('calendario-list-mount');
    if (!mount) return;

    var rows = FERIADOS.map(function(f, i){
      return '<tr>' +
        '<td><input class="chk" type="checkbox"></td>' +
        '<td class="num">' + f.fecha + '</td>' +
        '<td>' + f.desc + '</td>' +
        '<td><span class="badge b-warn">' + f.tipo + '</span></td>' +
        '<td>' + f.ambito + '</td>' +
        '<td style="text-align:right;">' +
          '<div class="acts"><a title="Editar" style="color:var(--navy-800)"><svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg></a></div>' +
        '</td>' +
      '</tr>';
    }).join('');

    mount.innerHTML =
      '<div class="card" style="padding:0;overflow:hidden;">' +
        '<div style="padding:20px 20px 0;">' +
          '<div class="tools" style="margin-bottom:20px;">' +
            '<div class="search"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg><input placeholder="Buscar fecha o motivo..."></div>' +
            '<div class="tbl-actions">' +
              '<button class="btn-tbl-action" type="button"><svg viewBox="0 0 24 24"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></svg><span>Filtros</span></button>' +
              '<button class="btn-tbl-action" type="button"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18"/></svg><span>Columnas</span></button>' +
            '</div>' +
          '</div>' +
          '<p class="mini" style="margin-top:0;margin-bottom:16px;color:#64748B;font-size:12.5px;">Los días no hábiles son descontados automáticamente del cómputo de plazos legales del Motor de Flujos (RN-WF-020).</p>' +
        '</div>' +
        '<div class="tw"><table>' +
          '<thead><tr>' +
            '<th style="width:36px;"><input class="chk" type="checkbox"></th>' +
            '<th><div class="th-cell"><span class="th-title">Fecha</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg></div></div></th>' +
            '<th><div class="th-cell"><span class="th-title">Descripción / Motivo</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg></div></div></th>' +
            '<th><div class="th-cell"><span class="th-title">Tipo de Inhábil</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg></div></div></th>' +
            '<th><div class="th-cell"><span class="th-title">Ámbito</span><div class="th-icons"><svg viewBox="0 0 24 24"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg><svg viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg></div></div></th>' +
            '<th style="text-align:right">Acciones</th>' +
          '</tr></thead>' +
          '<tbody>' + rows + '</tbody>' +
        '</table></div>' +
        '<div data-edge-buttons="true" data-report="true" data-rows-per-page="true" style="width: 100%; padding: 16px 20px 14px; background: white; border-top: 1px rgba(32, 32, 32, 0.12) solid; justify-content: space-between; align-items: center; gap: 16px; display: flex; flex-wrap: wrap; border-radius: 0 0 12px 12px;">' +
            '<div style="justify-content: flex-start; align-items: center; gap: 24px; display: flex">' +
                '<div style="color: #504C4A; font-size: 12px; font-family: Inter; font-weight: 500; line-height: 16px;">Mostrando 1–10 de ' + FERIADOS.length + '</div>' +
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
                        '<div style="height: 30px; min-width: 30px; padding: 0 8px; border-radius: 8px; justify-content: center; align-items: center; display: flex; color: #504C4A; font-size: 12px; font-family: Inter; font-weight: 600; cursor: pointer;">2</div>' +
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
                            '<option>1</option><option>2</option>' +
                        '</select>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
      '</div>';
  }

  window.__onShow = window.__onShow || {};
  window.__onShow['calendario-list'] = renderCalendario;

  document.addEventListener('DOMContentLoaded', function(){
    if (location.hash.slice(1) === 'calendario-list') renderCalendario();
  });
})();
