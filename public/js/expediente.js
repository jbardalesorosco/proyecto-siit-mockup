/* ==========================================================================
   SIIT · EXPEDIENTE ELECTRÓNICO (BANDEJA & GESTIÓN DE EXPEDIENTES)
   ========================================================================== */

(function(){
  var esc = function(x){
    return (x == null ? '' : String(x)).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  };

  // Conjunto de datos institucional con los registros requeridos
  var EXPEDIENTES_DATA = [
    {
      id: 'EXP-SEG-2026-000006',
      codigoInterno: 'IDENTITY-USER-19',
      asunto: 'Registro de usuario',
      tramite: 'SEG',
      tramiteDesc: 'Gestión de Seguridad e Identidad',
      interesadoNombre: 'Juan Erick',
      interesadoDoc: '44481657',
      interesadoTipoDoc: 'DNI',
      oficina: 'SUNAFIL',
      responsable: 'SIIT',
      fechaActualizacion: '04/09/2026 14:15',
      fechaCreacion: '04/09/2026 14:15',
      estado: 'Aperturado',
      plazo: 'Sin plazo',
      prioridad: 'Normal',
      docsCount: 2,
      observacion: 'Solicitud de creación de cuenta y asignación de perfil de usuario en el Sistema Informático de Inspección del Trabajo.'
    },
    {
      id: 'EXP-SEG-2026-000005',
      codigoInterno: 'IDENTITY-USER-18',
      asunto: 'Registro de usuario',
      tramite: 'SEG',
      tramiteDesc: 'Gestión de Seguridad e Identidad',
      interesadoNombre: 'Manuel',
      interesadoDoc: '16125277',
      interesadoTipoDoc: 'DNI',
      oficina: 'SUNAFIL',
      responsable: 'SIIT',
      fechaActualizacion: '04/09/2026 13:40',
      fechaCreacion: '04/09/2026 13:40',
      estado: 'Aperturado',
      plazo: 'Sin plazo',
      prioridad: 'Normal',
      docsCount: 2,
      observacion: 'Registro de usuario con credenciales de acceso institucional para funciones operativas.'
    },
    {
      id: 'EXP-SEG-2026-000004',
      codigoInterno: 'IDENTITY-USER-17',
      asunto: 'Modificación de perfil y accesos',
      tramite: 'SEG',
      tramiteDesc: 'Gestión de Seguridad e Identidad',
      interesadoNombre: 'Rosa María Chávez',
      interesadoDoc: '40892314',
      interesadoTipoDoc: 'DNI',
      oficina: 'SUNAFIL',
      responsable: 'SIIT',
      fechaActualizacion: '03/09/2026 17:20',
      fechaCreacion: '03/09/2026 10:15',
      estado: 'En trámite',
      plazo: 'Sin plazo',
      prioridad: 'Media',
      docsCount: 3,
      observacion: 'Actualización de roles funcionales e intendencia asignada.'
    },
    {
      id: 'EXP-SEG-2026-000003',
      codigoInterno: 'IDENTITY-USER-16',
      asunto: 'Asignación de rol Aprobador',
      tramite: 'SEG',
      tramiteDesc: 'Gestión de Seguridad e Identidad',
      interesadoNombre: 'Carlos Alberto Mendoza',
      interesadoDoc: '10749382',
      interesadoTipoDoc: 'DNI',
      oficina: 'SUNAFIL',
      responsable: 'SIIT',
      fechaActualizacion: '03/09/2026 11:05',
      fechaCreacion: '03/09/2026 09:30',
      estado: 'Aperturado',
      plazo: 'Sin plazo',
      prioridad: 'Alta',
      docsCount: 4,
      observacion: 'Otorgamiento de privilegios de Aprobador de tablas maestras con alcance nacional.'
    },
    {
      id: 'EXP-SEG-2026-000002',
      codigoInterno: 'IDENTITY-USER-15',
      asunto: 'Habilitación de credenciales institucionales',
      tramite: 'SEG',
      tramiteDesc: 'Gestión de Seguridad e Identidad',
      interesadoNombre: 'Diana Patricia Ramos',
      interesadoDoc: '45982103',
      interesadoTipoDoc: 'DNI',
      oficina: 'SUNAFIL',
      responsable: 'SIIT',
      fechaActualizacion: '02/09/2026 16:50',
      fechaCreacion: '02/09/2026 14:00',
      estado: 'Concluido',
      plazo: 'Sin plazo',
      prioridad: 'Normal',
      docsCount: 1,
      observacion: 'Validación de identidad con RENIEC y emisión de clave de primer acceso.'
    },
    {
      id: 'EXP-SEG-2026-000001',
      codigoInterno: 'IDENTITY-USER-14',
      asunto: 'Alta de usuario inspector zonal',
      tramite: 'SEG',
      tramiteDesc: 'Gestión de Seguridad e Identidad',
      interesadoNombre: 'Jorge Luis Villanueva',
      interesadoDoc: '09831245',
      interesadoTipoDoc: 'DNI',
      oficina: 'SUNAFIL',
      responsable: 'SIIT',
      fechaActualizacion: '01/09/2026 09:10',
      fechaCreacion: '31/08/2026 16:20',
      estado: 'Concluido',
      plazo: 'Sin plazo',
      prioridad: 'Normal',
      docsCount: 5,
      observacion: 'Expediente cerrado con entrega conforme de cuenta de usuario.'
    }
  ];

  var S = {
    search: '',
    statusFilter: 'Todos',
    page: 1,
    pageSize: 10,
    selected: {},
    currentDetailExp: null,
    detailTab: 1
  };

  var EYE = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M3 7V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2"/><path d="M3 17v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2"/><path d="M6 12c1.5-3.5 3.8-5 6-5s4.5 1.5 6 5c-1.5 3.5-3.8 5-6 5s-4.5-1.5-6-5Z"/><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/></svg>';

  function buildTag(text, badgeClass){
    return '<span class="badge ' + (badgeClass || 'b-off') + '" style="display:inline-flex;width:fit-content;max-width:fit-content;min-width:0;padding:4px 8px;border-radius:4px;font-size:12px;font-family:Inter,sans-serif;font-weight:500;line-height:16px;height:24px;box-sizing:border-box;white-space:nowrap;justify-content:center;align-items:center;align-self:flex-start;">' + esc(text) + '</span>';
  }

  function stBadge(st){
    var m = {
      'Aperturado': 'b-info',
      'En trámite': 'b-warn',
      'Concluido': 'b-ok',
      'Observado': 'b-warn',
      'Rechazado': 'b-danger'
    };
    return buildTag(st, m[st] || 'b-off');
  }

  function getBadgeHtml(estado){
    return stBadge(estado);
  }

  function buildFigmaFieldHtml(opts){
    var isReq = opts.required !== false;
    var reqMark = isReq ? '<span class="field-req" style="color:#D51317;">*</span>' : '';
    var maxLen = opts.maxlength || 200;
    var roAttr = opts.readonly ? ' readonly disabled style="background:#F8FAFC;cursor:default;"' : '';
    var inputTag = opts.customHtml
      ? opts.customHtml
      : (opts.isTextarea
        ? '<textarea id="' + opts.id + '" maxlength="' + maxLen + '" placeholder="' + esc(opts.placeholder || '') + '"' + roAttr + '>' + esc(opts.value || '') + '</textarea>'
        : '<input id="' + opts.id + '" value="' + esc(opts.value || '') + '" placeholder="' + esc(opts.placeholder || '') + '"' + roAttr + '>');

    var hasVal = !!((opts.value && String(opts.value).trim().length > 0) || (opts.selectedValue && opts.selectedValue.trim().length > 0));

    return '<div class="figma-field' + (opts.isTextarea ? ' is-textarea' : '') + (hasVal ? ' has-value' : '') + (opts.readonly ? ' is-readonly' : '') + '" id="wrap-' + opts.id + '">' +
      '<div class="field-box">' +
        '<div class="field-label-notch">' +
          '<div class="field-label-wrapper">' +
            '<span class="field-label">' + esc(opts.label) + '</span>' +
            reqMark +
          '</div>' +
        '</div>' +
        inputTag +
      '</div>' +
    '</div>';
  }

  function buildTableCell(content, opts){
    opts = opts || {};
    var align = opts.align || 'flex-start';
    var isRight = align === 'right' || align === 'flex-end';
    var justify = isRight ? 'flex-end' : (align === 'center' ? 'center' : 'flex-start');
    var numStyle = opts.num ? ' font-variant-numeric: tabular-nums;' : '';
    var extraStyle = opts.style || '';
    var type = opts.type || 'Text';

    return '<td class="figma-cell-td" style="padding:0;border:0;vertical-align:middle;white-space:nowrap;">' +
      '<div data-icon-1="true" data-icon-2="true" data-icon-3="true" data-icon-4="false" data-icon-l="false" data-icon-r="false" data-icon-signature="false" data-icon-validation="false" data-type="' + type + '" style="width: 100%; height: 100%; padding-left: 16px; padding-right: 16px; padding-top: 12px; padding-bottom: 12px; border-bottom: 1px var(--sys-color-divider-default, rgba(32, 32, 32, 0.12)) solid; justify-content: ' + justify + '; align-items: center; gap: 8px; display: inline-flex;' + extraStyle + '">' +
        '<div style="flex: 1 1 0; min-height: 24px; justify-content: center; display: flex; flex-direction: column; align-items: ' + justify + '; color: var(--sys-color-text-neutral-medium, #29292A); font-size: 14px; font-family: Inter, sans-serif; font-weight: 400; letter-spacing: 0.02px; word-wrap: break-word; white-space: nowrap;' + (isRight ? ' text-align: right;' : '') + numStyle + '">' +
          content +
        '</div>' +
      '</div>' +
    '</td>';
  }

  function buildDetailTextCell(text, opts){
    opts = opts || {};
    var bb = opts.isLast ? 'border-bottom: 0;' : 'border-bottom: 1px var(--sys-color-divider-default, rgba(32, 32, 32, 0.12)) solid;';
    return '<td class="figma-cell-td" style="padding:0;border:0;vertical-align:middle;">' +
      '<div data-icon-1="true" data-icon-2="true" data-icon-3="true" data-icon-4="false" data-icon-l="false" data-icon-r="false" data-icon-signature="false" data-icon-validation="false" data-type="Text" style="width: 100%; height: 100%; padding-left: 16px; padding-right: 16px; padding-top: 12px; padding-bottom: 12px; ' + bb + ' justify-content: flex-start; align-items: center; gap: 8px; display: inline-flex">' +
        '<div style="flex: 1 1 0; min-height: 24px; justify-content: center; display: flex; flex-direction: column; color: var(--sys-color-text-neutral-medium, #29292A); font-size: 14px; font-family: Inter; font-weight: 400; letter-spacing: 0.02px; word-wrap: break-word">' + esc(text || '') + '</div>' +
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

    return '<th class="figma-th" style="padding:0;border:0;vertical-align:middle;white-space:nowrap;">' +
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

  function getFilteredData(){
    return EXPEDIENTES_DATA.filter(function(row){
      if(S.statusFilter !== 'Todos' && row.estado !== S.statusFilter){
        return false;
      }
      if(S.search && S.search.trim().length > 0){
        var q = S.search.toLowerCase().trim();
        var matchId = (row.id || '').toLowerCase().indexOf(q) >= 0;
        var matchCod = (row.codigoInterno || '').toLowerCase().indexOf(q) >= 0;
        var matchAsunto = (row.asunto || '').toLowerCase().indexOf(q) >= 0;
        var matchNombre = (row.interesadoNombre || '').toLowerCase().indexOf(q) >= 0;
        var matchDoc = (row.interesadoDoc || '').toLowerCase().indexOf(q) >= 0;
        var matchOfi = (row.oficina || '').toLowerCase().indexOf(q) >= 0;
        var matchResp = (row.responsable || '').toLowerCase().indexOf(q) >= 0;
        if(!matchId && !matchCod && !matchAsunto && !matchNombre && !matchDoc && !matchOfi && !matchResp){
          return false;
        }
      }
      return true;
    });
  }

  function renderExpedientes(){
    var mount = document.getElementById('expediente-mount') || document.getElementById('exp-list-mount');
    if(!mount) return;

    var filtered = getFilteredData();
    var totalRows = filtered.length;
    var totalPages = Math.max(1, Math.ceil(totalRows / S.pageSize));
    if(S.page > totalPages) S.page = totalPages;

    var startIdx = (S.page - 1) * S.pageSize;
    var pageRows = filtered.slice(startIdx, startIdx + S.pageSize);

    // Toolbar superior
    var toolbarHtml =
      '<div class="tools" style="margin-bottom:20px;">' +
        '<div class="search">' +
          '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>' +
          '<input id="exp-search-input" value="' + esc(S.search) + '" placeholder="Buscar por número de expediente, código o interesado...">' +
        '</div>' +
        '<div class="tbl-actions">' +
          '<button class="btn-tbl-action" id="exp-btn-filtros" type="button"><svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:#504C4A;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg><span>Filtros</span></button>' +
          '<button class="btn-tbl-action" id="exp-btn-columnas" type="button"><svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:#504C4A;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M10.6 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.6"/><path d="M9 3v18"/><path d="M15 3v5.6"/><path d="m14.305 19.53.923-.382"/><path d="m15.228 16.852-.923-.383"/><path d="m16.852 15.228-.383-.923"/><path d="m16.852 20.772-.383.924"/><path d="m19.148 15.228.383-.923"/><path d="m19.53 21.696-.382-.924"/><path d="m20.772 16.852.924-.383"/><path d="m20.772 19.148.924.383"/><circle cx="18" cy="18" r="3"/></svg><span>Columnas</span></button>' +
        '</div>' +
      '</div>';

    // Filas de la tabla (sin subtítulos según solicitud)
    var rowsHtml = '';
    if(pageRows.length === 0){
      rowsHtml = '<tr><td colspan="9" style="text-align:center;padding:48px 24px;color:#64748B;font-size:14px;font-family:Inter,sans-serif;">' +
        '<div style="display:flex;flex-direction:column;align-items:center;gap:12px;">' +
          '<div style="width:48px;height:48px;border-radius:50%;background:#F1F5F9;display:flex;align-items:center;justify-content:center;color:#64748B;">' +
            '<svg viewBox="0 0 24 24" style="width:24px;height:24px;stroke:currentColor;fill:none;stroke-width:2;"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>' +
          '</div>' +
          '<div>No se encontraron expedientes que coincidan con el criterio de búsqueda.</div>' +
        '</div>' +
      '</td></tr>';
    } else {
      rowsHtml = pageRows.map(function(row){
        var k = (row.id + ' ' + row.codigoInterno + ' ' + row.asunto + ' ' + row.interesadoNombre + ' ' + row.interesadoDoc + ' ' + row.oficina + ' ' + row.responsable).toLowerCase();
        
        var nameHtml = '<a href="javascript:void(0)" data-exp-act="view" data-exp-id="' + esc(row.id) + '" class="tbl-name-link" style="color:var(--sys-color-text-neutral-medium, #29292A);font-weight:400;letter-spacing:0.02px;cursor:pointer;text-decoration:none;">' + esc(row.id) + '</a>';

        var a = '<div class="acts" style="justify-content:flex-end;">' +
          '<a title="Ver detalle" data-exp-act="view" data-exp-id="' + esc(row.id) + '" style="color:#504C4A;cursor:pointer;">' + EYE + '</a>' +
        '</div>';

        return '<tr data-k="' + esc(k) + '" data-st="' + esc(row.estado) + '">' +
          buildTableCell(nameHtml, { num: true }) +
          buildTableCell(esc(row.codigoInterno), { num: true }) +
          buildTableCell(esc(row.asunto)) +
          buildTableCell(esc(row.interesadoNombre)) +
          buildTableCell(esc(row.oficina)) +
          buildTableCell(esc(row.fechaActualizacion), { num: true }) +
          buildTableCell(stBadge(row.estado)) +
          buildTableCell(esc(row.plazo)) +
          buildTableCell(a, { align: 'right' }) +
        '</tr>';
      }).join('');
    }

    // Cabeceras de tabla exactamente según diseño de TRA001
    var theadHtml =
      '<thead><tr>' +
        buildTableHeader('NÚMERO DE EXPEDIENTE') +
        buildTableHeader('CÓDIGO INTERNO') +
        buildTableHeader('ASUNTO / TRÁMITE') +
        buildTableHeader('INTERESADO') +
        buildTableHeader('OFICINA / RESPONSABLE') +
        buildTableHeader('ÚLTIMA ACTUALIZACIÓN') +
        buildTableHeader('ESTADO') +
        buildTableHeader('PLAZO') +
        buildTableHeader('ACCIONES', { align: 'right', icons: false }) +
      '</tr></thead>';

    // Paginador inferior estandarizado exactamente como TRA001
    var startRowDisp = totalRows === 0 ? 0 : startIdx + 1;
    var endRowDisp = Math.min(startIdx + S.pageSize, totalRows);

    var paginationHtml =
      '<div data-edge-buttons="true" data-report="true" data-rows-per-page="true" style="width: 100%; padding-top: 16px; background: white; border-top: 1px rgba(32, 32, 32, 0.12) solid; justify-content: space-between; align-items: center; gap: 16px; display: flex; flex-wrap: wrap;">' +
        '<div style="justify-content: flex-start; align-items: center; gap: 24px; display: flex">' +
          '<div style="color: #504C4A; font-size: 12px; font-family: Inter,sans-serif; font-weight: 500; line-height: 16px;">Mostrando ' + startRowDisp + '–' + endRowDisp + ' de ' + totalRows + '</div>' +
          '<div style="justify-content: flex-start; align-items: center; gap: 8px; display: flex">' +
            '<div style="color: #504C4A; font-size: 12px; font-family: Inter,sans-serif; font-weight: 500; line-height: 16px;">Filas por página:</div>' +
            '<div style="width: 75px; position: relative;">' +
              '<select id="exp-page-size" style="width: 100%; height: 32px; padding: 4px 28px 4px 12px; background: white; border-radius: 8px; border: 1px rgba(32, 32, 32, 0.56) solid; font-size: 13px; font-family: Inter,sans-serif; font-weight: 500; color: #353537; outline: none; appearance: none; -webkit-appearance: none; cursor: pointer; background-image: url(&quot;data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23504C4A\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E&quot;); background-repeat: no-repeat; background-position: right 8px center; background-size: 14px 14px;">' +
                '<option value="5"' + (S.pageSize === 5 ? ' selected' : '') + '>5</option>' +
                '<option value="10"' + (S.pageSize === 10 ? ' selected' : '') + '>10</option>' +
                '<option value="25"' + (S.pageSize === 25 ? ' selected' : '') + '>25</option>' +
                '<option value="50"' + (S.pageSize === 50 ? ' selected' : '') + '>50</option>' +
              '</select>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div style="justify-content: flex-end; align-items: center; gap: 16px; display: flex; flex-wrap: wrap;">' +
          '<div style="justify-content: center; align-items: center; gap: 4px; display: flex">' +
            '<button type="button" id="exp-page-first" title="Primera página" ' + (S.page <= 1 ? 'disabled style="opacity:0.4;cursor:not-allowed;' : 'style="cursor:pointer;') + 'width: 32px; height: 32px; background: transparent; border: 0; border-radius: 8px; justify-content: center; align-items: center; display: flex; color: #504C4A;">' +
              '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2"><polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/></svg>' +
            '</button>' +
            '<button type="button" id="exp-page-prev" title="Página anterior" ' + (S.page <= 1 ? 'disabled style="opacity:0.4;cursor:not-allowed;' : 'style="cursor:pointer;') + 'width: 32px; height: 32px; background: transparent; border: 0; border-radius: 8px; justify-content: center; align-items: center; display: flex; color: #504C4A;">' +
              '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2"><polyline points="15 18 9 12 15 6"/></svg>' +
            '</button>' +
            '<div style="justify-content: flex-start; align-items: center; gap: 4px; display: flex">' +
              '<div style="height: 30px; min-width: 30px; padding: 0 8px; background: #06396E; border-radius: 4px; justify-content: center; align-items: center; display: flex; color: white; font-size: 12px; font-family: Inter,sans-serif; font-weight: 600;">' + S.page + '</div>' +
            '</div>' +
            '<button type="button" id="exp-page-next" title="Página siguiente" ' + (S.page >= totalPages ? 'disabled style="opacity:0.4;cursor:not-allowed;' : 'style="cursor:pointer;') + 'width: 32px; height: 32px; background: transparent; border: 0; border-radius: 8px; justify-content: center; align-items: center; display: flex; color: #504C4A;">' +
              '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2"><polyline points="9 18 15 12 9 6"/></svg>' +
            '</button>' +
            '<button type="button" id="exp-page-last" title="Última página" ' + (S.page >= totalPages ? 'disabled style="opacity:0.4;cursor:not-allowed;' : 'style="cursor:pointer;') + 'width: 32px; height: 32px; background: transparent; border: 0; border-radius: 8px; justify-content: center; align-items: center; display: flex; color: #504C4A;">' +
              '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>' +
            '</button>' +
          '</div>' +
          '<div style="justify-content: flex-end; align-items: center; gap: 8px; display: flex">' +
            '<div style="color: #504C4A; font-size: 12px; font-family: Inter,sans-serif; font-weight: 500; line-height: 16px;">Ir a</div>' +
            '<div style="width: 75px; position: relative;">' +
              '<select id="exp-goto-page" style="width: 100%; height: 32px; padding: 4px 28px 4px 12px; background: white; border-radius: 8px; border: 1px rgba(32, 32, 32, 0.56) solid; font-size: 13px; font-family: Inter,sans-serif; font-weight: 500; color: #353537; outline: none; appearance: none; -webkit-appearance: none; cursor: pointer; background-image: url(&quot;data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23504C4A\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E&quot;); background-repeat: no-repeat; background-position: right 8px center; background-size: 14px 14px;">' +
                (function(){
                  var opts = '';
                  for(var p = 1; p <= totalPages; p++){
                    opts += '<option value="' + p + '"' + (S.page === p ? ' selected' : '') + '>' + p + '</option>';
                  }
                  return opts;
                })() +
              '</select>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    // Montaje del contenedor con scroll horizontal habilitado y bordes idénticos a TRA001
    mount.innerHTML =
      '<div class="card" style="padding:20px 20px 16px;">' +
        toolbarHtml +
        '<div class="tw" style="border:1px solid rgba(32,32,32,0.12);border-radius:4px;overflow-x:auto;overflow-y:hidden;margin-bottom:16px;">' +
          '<table style="min-width:1300px;width:100%;border-collapse:collapse;">' +
            theadHtml +
            '<tbody>' + rowsHtml + '</tbody>' +
          '</table>' +
        '</div>' +
        paginationHtml +
      '</div>';

    bindExpEvents(mount);
  }

  function bindExpEvents(mount){
    // Búsqueda
    var sInput = mount.querySelector('#exp-search-input');
    if(sInput){
      sInput.addEventListener('input', function(e){
        S.search = e.target.value;
        S.page = 1;
        renderExpedientes();
        var el = document.getElementById('exp-search-input');
        if(el){ el.focus(); el.setSelectionRange(el.value.length, el.value.length); }
      });
    }

    // Paginación
    var pSize = mount.querySelector('#exp-page-size');
    if(pSize){
      pSize.addEventListener('change', function(e){
        S.pageSize = parseInt(e.target.value, 10) || 10;
        S.page = 1;
        renderExpedientes();
      });
    }

    var pFirst = mount.querySelector('#exp-page-first');
    if(pFirst) pFirst.addEventListener('click', function(){ S.page = 1; renderExpedientes(); });

    var pPrev = mount.querySelector('#exp-page-prev');
    if(pPrev) pPrev.addEventListener('click', function(){ if(S.page > 1){ S.page--; renderExpedientes(); } });

    var pNext = mount.querySelector('#exp-page-next');
    if(pNext) pNext.addEventListener('click', function(){ S.page++; renderExpedientes(); });

    var pLast = mount.querySelector('#exp-page-last');
    if(pLast) pLast.addEventListener('click', function(){
      var totalPages = Math.ceil(getFilteredData().length / S.pageSize);
      S.page = totalPages;
      renderExpedientes();
    });

    var pGoto = mount.querySelector('#exp-goto-page');
    if(pGoto){
      pGoto.addEventListener('change', function(e){
        S.page = parseInt(e.target.value, 10) || 1;
        renderExpedientes();
      });
    }

    // Botones de acción "Ver detalle"
    mount.querySelectorAll('[data-exp-act="view"]').forEach(function(btn){
      btn.addEventListener('click', function(e){
        e.preventDefault();
        var id = btn.getAttribute('data-exp-id');
        openExpedienteDetail(id);
      });
    });
  }

  function openExpedienteDetail(id){
    var exp = null;
    for(var i = 0; i < EXPEDIENTES_DATA.length; i++){
      if(EXPEDIENTES_DATA[i].id === id){
        exp = EXPEDIENTES_DATA[i];
        break;
      }
    }
    if(!exp) exp = EXPEDIENTES_DATA[0];
    S.currentDetailExp = exp;
    S.detailTab = 1;
    renderExpedienteDetail();
    if(window.go){
      window.go('exp-detail');
    } else {
      location.hash = 'exp-detail';
    }
  }

  function renderExpedienteDetail(){
    var mount = document.getElementById('exp-detail-mount');
    if(!mount) return;

    var exp = S.currentDetailExp || EXPEDIENTES_DATA[0];
    if(!S.detailTab) S.detailTab = 1;

    // 1. Header 2-Cards Layout (Figma exact structure from model)
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
              '<div style="color:#353537;font-size:14px;font-family:Inter,sans-serif;font-weight:700;line-height:20px;">' + esc(exp.fechaActualizacion || '05/08/2026 08:40') + '</div>' +
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
              '<div style="color:#353537;font-size:14px;font-family:Inter,sans-serif;font-weight:700;line-height:20px;">' + esc(exp.id) + '</div>' +
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
              stBadge(exp.estado) +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

    // 2. Tabs Navigation Bar & Section Header (Figma exact card header)
    var tabs = [
      { id: 1, label: 'Resumen' },
      { id: 2, label: 'Documentos', count: exp.docsCount || 2 },
      { id: 3, label: 'Trazabilidad' },
      { id: 4, label: 'Derivaciones', count: 1 },
      { id: 5, label: 'Participantes', count: 2 },
      { id: 6, label: 'Notificantes', count: 1 }
    ];

      var tabsButtonsHtml = tabs.map(function(t){
        var isActive = S.detailTab === t.id;
        return '<button type="button" class="lg-tab' + (isActive ? ' active' : '') + '" data-exp-tab="' + t.id + '" style="background:transparent;border:0;border-bottom:2px ' + (isActive ? 'var(--sys-color-bg-brand-primary, #06396E)' : 'transparent') + ' solid;margin-bottom:-1px;height:44px;box-sizing:border-box;padding:0 20px;cursor:pointer;justify-content:center;align-items:center;gap:8px;display:inline-flex;border-radius:0 !important;">' +
          '<div style="color:' + (isActive ? 'var(--sys-color-bg-brand-primary, #06396E)' : 'var(--sys-color-text-neutral-medium, #504C4A)') + ';font-size:14px;font-family:Inter,sans-serif;font-weight:' + (isActive ? '600' : '400') + ';line-height:20px;white-space:nowrap;">' + esc(t.label) + '</div>' +
          (t.count != null ? '<span style="display:inline-flex;align-items:center;justify-content:center;height:20px;min-width:20px;box-sizing:border-box;background:' + (isActive ? 'rgba(6,57,110,0.1)' : '#F1F5F9') + ';color:' + (isActive ? '#06396E' : '#64748B') + ';border-radius:10px;padding:0 6px;font-size:11.5px;font-weight:600;line-height:1;">' + t.count + '</span>' : '') +
        '</button>';
      }).join('');

      var tabsNav = '<div style="width:100%;display:flex;flex-direction:column;justify-content:flex-start;align-items:flex-start;">' +
        '<div style="width:100%;min-height:52px;padding-top:16px;padding-bottom:12px;padding-left:24px;padding-right:24px;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;box-sizing:border-box;">' +
          '<div style="align-self:stretch;justify-content:flex-start;align-items:center;gap:8px;display:flex;width:100%;">' +
            '<div style="flex:1 1 0;flex-direction:column;justify-content:center;align-items:flex-start;gap:4px;display:inline-flex;">' +
              '<div style="align-self:stretch;height:24px;justify-content:flex-start;align-items:center;gap:8px;display:inline-flex;">' +
                '<div style="color:var(--sys-color-text-neutral-high, #252220);font-size:16px;font-family:Inter,sans-serif;font-weight:600;line-height:24px;">Datos del expediente</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div style="width:100%;border-bottom:1px solid var(--sys-color-divider-default, rgba(32, 32, 32, 0.12));display:flex;justify-content:flex-start;align-items:flex-end;gap:4px;padding-left:0px;padding-right:24px;box-sizing:border-box;overflow:visible;">' +
          tabsButtonsHtml +
        '</div>' +
      '</div>';

    // 3. Tab Body
    var tabBodyHtml = '';
    if(S.detailTab === 1){
      // Tab 1: Resumen (Modelo exacto de tarjetas según requerimiento visual)
      tabBodyHtml =
        '<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:16px;margin-bottom:16px;">' +
          // Tarjeta 1: Interesado
          '<div style="background:white;border:1px solid rgba(32,32,32,0.10);border-radius:8px;padding:18px 20px;box-shadow:0 1px 2px rgba(0,0,0,0.03);display:flex;flex-direction:column;gap:14px;">' +
            '<div style="display:flex;align-items:center;gap:10px;">' +
              '<div style="width:30px;height:30px;border-radius:6px;background:#E0F2FE;color:#0284C7;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
                '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' +
              '</div>' +
              '<div style="color:#0F172A;font-size:14.5px;font-weight:700;font-family:Inter,sans-serif;">Interesado</div>' +
            '</div>' +
            '<div>' +
              '<div style="color:#64748B;font-size:11px;font-weight:600;font-family:Inter,sans-serif;letter-spacing:0.5px;margin-bottom:3px;">TIPO</div>' +
              '<div style="color:#1E293B;font-size:14px;font-weight:700;font-family:Inter,sans-serif;">' + esc(exp.interesadoTipoDoc || 'DNI') + '</div>' +
            '</div>' +
            '<div>' +
              '<div style="color:#64748B;font-size:11px;font-weight:600;font-family:Inter,sans-serif;letter-spacing:0.5px;margin-bottom:3px;">DOCUMENTO</div>' +
              '<div style="color:#1E293B;font-size:14px;font-weight:700;font-family:Inter,sans-serif;">' + esc(exp.interesadoDoc || '44481657') + '</div>' +
            '</div>' +
            '<div>' +
              '<div style="color:#64748B;font-size:11px;font-weight:600;font-family:Inter,sans-serif;letter-spacing:0.5px;margin-bottom:3px;">NOMBRE O RAZÓN SOCIAL</div>' +
              '<div style="color:#1E293B;font-size:14px;font-weight:700;font-family:Inter,sans-serif;">' + esc(exp.interesadoNombre || 'Juan Erick') + '</div>' +
            '</div>' +
          '</div>' +

          // Tarjeta 2: Trámite
          '<div style="background:white;border:1px solid rgba(32,32,32,0.10);border-radius:8px;padding:18px 20px;box-shadow:0 1px 2px rgba(0,0,0,0.03);display:flex;flex-direction:column;gap:14px;">' +
            '<div style="display:flex;align-items:center;gap:10px;">' +
              '<div style="width:30px;height:30px;border-radius:6px;background:#E0F2FE;color:#0284C7;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
                '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' +
              '</div>' +
              '<div style="color:#0F172A;font-size:14.5px;font-weight:700;font-family:Inter,sans-serif;">Trámite</div>' +
            '</div>' +
            '<div>' +
              '<div style="color:#64748B;font-size:11px;font-weight:600;font-family:Inter,sans-serif;letter-spacing:0.5px;margin-bottom:3px;">PROCEDIMIENTO</div>' +
              '<div style="color:#1E293B;font-size:14px;font-weight:700;font-family:Inter,sans-serif;">' + esc(exp.tramite || 'SEG') + '</div>' +
            '</div>' +
            '<div>' +
              '<div style="color:#64748B;font-size:11px;font-weight:600;font-family:Inter,sans-serif;letter-spacing:0.5px;margin-bottom:3px;">DOCUMENTO PRINCIPAL</div>' +
              '<div style="color:#1E293B;font-size:14px;font-weight:700;font-family:Inter,sans-serif;">dev-guidelines.pdf</div>' +
            '</div>' +
            '<div>' +
              '<div style="color:#64748B;font-size:11px;font-weight:600;font-family:Inter,sans-serif;letter-spacing:0.5px;margin-bottom:3px;">ENTIDAD</div>' +
              '<div style="color:#1E293B;font-size:14px;font-weight:700;font-family:Inter,sans-serif;">' + esc(exp.interesadoNombre || 'Juan Erick') + '</div>' +
            '</div>' +
          '</div>' +

          // Tarjeta 3: Atención actual
          '<div style="background:white;border:1px solid rgba(32,32,32,0.10);border-radius:8px;padding:18px 20px;box-shadow:0 1px 2px rgba(0,0,0,0.03);display:flex;flex-direction:column;gap:14px;">' +
            '<div style="display:flex;align-items:center;gap:10px;">' +
              '<div style="width:30px;height:30px;border-radius:6px;background:#E0F2FE;color:#0284C7;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
                '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="22"/><line x1="8" y1="6" x2="8.01" y2="6"/><line x1="16" y1="6" x2="16.01" y2="6"/><line x1="8" y1="10" x2="8.01" y2="10"/><line x1="16" y1="10" x2="16.01" y2="10"/><line x1="8" y1="14" x2="8.01" y2="14"/><line x1="16" y1="14" x2="16.01" y2="14"/></svg>' +
              '</div>' +
              '<div style="color:#0F172A;font-size:14.5px;font-weight:700;font-family:Inter,sans-serif;">Atención actual</div>' +
            '</div>' +
            '<div>' +
              '<div style="color:#64748B;font-size:11px;font-weight:600;font-family:Inter,sans-serif;letter-spacing:0.5px;margin-bottom:3px;">OFICINA</div>' +
              '<div style="color:#1E293B;font-size:14px;font-weight:700;font-family:Inter,sans-serif;">' + esc(exp.oficina || 'SUNAFIL') + '</div>' +
            '</div>' +
            '<div>' +
              '<div style="color:#64748B;font-size:11px;font-weight:600;font-family:Inter,sans-serif;letter-spacing:0.5px;margin-bottom:3px;">RESPONSABLE</div>' +
              '<div style="color:#1E293B;font-size:14px;font-weight:700;font-family:Inter,sans-serif;">' + esc(exp.responsable || 'SIIT') + '</div>' +
            '</div>' +
            '<div>' +
              '<div style="color:#64748B;font-size:11px;font-weight:600;font-family:Inter,sans-serif;letter-spacing:0.5px;margin-bottom:3px;">ÚLTIMA ACTUACIÓN</div>' +
              '<div style="color:#1E293B;font-size:14px;font-weight:700;font-family:Inter,sans-serif;">Incorporación de documento</div>' +
            '</div>' +
          '</div>' +

          // Tarjeta 4: Control de plazo
          '<div style="background:white;border:1px solid rgba(32,32,32,0.10);border-radius:8px;padding:18px 20px;box-shadow:0 1px 2px rgba(0,0,0,0.03);display:flex;flex-direction:column;gap:14px;">' +
            '<div style="display:flex;align-items:center;gap:10px;">' +
              '<div style="width:30px;height:30px;border-radius:6px;background:#E0F2FE;color:#0284C7;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
                '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' +
              '</div>' +
              '<div style="color:#0F172A;font-size:14.5px;font-weight:700;font-family:Inter,sans-serif;">Control de plazo</div>' +
            '</div>' +
            '<div style="display:flex;align-items:center;gap:8px;margin-top:4px;">' +
              '<span style="color:#0D9488;font-weight:700;letter-spacing:-1px;">--</span>' +
              '<span style="color:#0D9488;font-size:13.5px;font-weight:700;font-family:Inter,sans-serif;">' + esc(exp.plazo || 'Sin plazo definido') + '</span>' +
            '</div>' +
            '<div style="color:#64748B;font-size:12px;font-family:Inter,sans-serif;">Fecha límite: No definida</div>' +
          '</div>' +
        '</div>' +

        // Tarjeta Inferior Horizontal: Control y auditoría
        '<div style="background:white;border:1px solid rgba(32,32,32,0.10);border-radius:8px;padding:18px 20px;box-shadow:0 1px 2px rgba(0,0,0,0.03);display:flex;flex-direction:column;gap:16px;">' +
          '<div style="display:flex;align-items:center;gap:10px;">' +
            '<div style="width:30px;height:30px;border-radius:6px;background:#E0F2FE;color:#0284C7;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
              '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' +
            '</div>' +
            '<div style="color:#0F172A;font-size:14.5px;font-weight:700;font-family:Inter,sans-serif;">Control y auditoría</div>' +
          '</div>' +
          '<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:20px;">' +
            '<div>' +
              '<div style="color:#64748B;font-size:11px;font-weight:600;font-family:Inter,sans-serif;letter-spacing:0.5px;margin-bottom:3px;">NIVEL DE ACCESO</div>' +
              '<div style="color:#1E293B;font-size:14px;font-weight:700;font-family:Inter,sans-serif;">INTERNO</div>' +
            '</div>' +
            '<div>' +
              '<div style="color:#64748B;font-size:11px;font-weight:600;font-family:Inter,sans-serif;letter-spacing:0.5px;margin-bottom:3px;">FECHA DE APERTURA</div>' +
              '<div style="color:#1E293B;font-size:14px;font-weight:700;font-family:Inter,sans-serif;">' + esc(exp.fechaCreacion || '04/09/2026 14:12') + '</div>' +
            '</div>' +
            '<div>' +
              '<div style="color:#64748B;font-size:11px;font-weight:600;font-family:Inter,sans-serif;letter-spacing:0.5px;margin-bottom:3px;">ÚLTIMA ACTUALIZACIÓN</div>' +
              '<div style="color:#1E293B;font-size:14px;font-weight:700;font-family:Inter,sans-serif;">' + esc(exp.fechaActualizacion || '04/09/2026 14:15') + '</div>' +
            '</div>' +
            '<div>' +
              '<div style="color:#64748B;font-size:11px;font-weight:600;font-family:Inter,sans-serif;letter-spacing:0.5px;margin-bottom:3px;">VERSIÓN</div>' +
              '<div style="color:#1E293B;font-size:14px;font-weight:700;font-family:Inter,sans-serif;">1</div>' +
            '</div>' +
          '</div>' +
        '</div>';
    } else if(S.detailTab === 2){
      // Tab 2: Documentos
      tabBodyHtml =
        '<div style="display:flex;flex-direction:column;gap:16px;">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;">' +
            '<div style="font-size:14px;font-weight:600;color:#252220;">Documentos anexos al expediente</div>' +
          '</div>' +
          '<div class="tw" style="border:1px solid rgba(32,32,32,0.12);border-radius:4px;overflow-x:auto;">' +
            '<table class="t001-table" style="width:100%;border-collapse:collapse;font-family:Inter,sans-serif;text-align:left;font-size:13px;">' +
              '<thead>' +
                '<tr style="background:rgba(32,32,32,0.04);border-bottom:1px solid rgba(32,32,32,0.12);height:40px;">' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;">Nombre del documento</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;">Tipo</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;">Tamaño</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;">Fecha de subida</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;text-align:right;">Acciones</th>' +
                '</tr>' +
              '</thead>' +
              '<tbody>' +
                '<tr>' +
                  buildDetailTextCell('INFORME_EXP_SEG.pdf') +
                  buildDetailTextCell('PDF / Sustento') +
                  buildDetailTextCell('1.4 MB') +
                  buildDetailTextCell(exp.fechaCreacion || '04/09/2026 14:12') +
                  '<td class="figma-cell-td" style="padding:0;border:0;vertical-align:middle;text-align:right;">' +
                    '<div data-type="Actions" style="width:100%;height:100%;padding-left:16px;padding-right:16px;padding-top:12px;padding-bottom:12px;border-bottom:1px var(--sys-color-divider-default, rgba(32, 32, 32, 0.12)) solid;justify-content:flex-end;align-items:center;gap:8px;display:inline-flex;">' +
                      '<button type="button" title="Descargar documento" style="background:none;border:none;cursor:pointer;color:#504C4A;padding:4px;display:inline-flex;align-items:center;"><svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg></button>' +
                    '</div>' +
                  '</td>' +
                '</tr>' +
                '<tr>' +
                  buildDetailTextCell('SOLICITUD_DE_REGISTRO.pdf', { isLast: true }) +
                  buildDetailTextCell('PDF / Solicitud', { isLast: true }) +
                  buildDetailTextCell('450 KB', { isLast: true }) +
                  buildDetailTextCell(exp.fechaCreacion || '04/09/2026 14:12', { isLast: true }) +
                  '<td class="figma-cell-td" style="padding:0;border:0;vertical-align:middle;text-align:right;">' +
                    '<div data-type="Actions" style="width:100%;height:100%;padding-left:16px;padding-right:16px;padding-top:12px;padding-bottom:12px;border-bottom:0;justify-content:flex-end;align-items:center;gap:8px;display:inline-flex;">' +
                      '<button type="button" title="Descargar documento" style="background:none;border:none;cursor:pointer;color:#504C4A;padding:4px;display:inline-flex;align-items:center;"><svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg></button>' +
                    '</div>' +
                  '</td>' +
                '</tr>' +
              '</tbody>' +
            '</table>' +
          '</div>' +
        '</div>';
    } else if(S.detailTab === 3){
      // Tab 3: Trazabilidad
      tabBodyHtml =
        '<div style="display:flex;flex-direction:column;gap:20px;padding:8px 0;">' +
          '<div style="font-size:14px;font-weight:600;color:#252220;margin-bottom:4px;">Historial de Trazabilidad del Expediente</div>' +
          '<div style="display:flex;flex-direction:column;gap:20px;padding-left:14px;border-left:2px solid #E2E8F0;margin-left:8px;">' +
            '<div style="position:relative;padding-left:18px;">' +
              '<div style="position:absolute;left:-25px;top:2px;width:12px;height:12px;border-radius:50%;background:#0284C7;border:2px solid #fff;box-shadow:0 0 0 1px #0284C7;"></div>' +
              '<div style="font-size:13.5px;font-weight:700;color:#252220;">Apertura de Expediente Electrónico</div>' +
              '<div style="font-size:12px;color:#64748B;margin-top:2px;">' + esc(exp.fechaCreacion) + ' · Por ' + esc(exp.responsable) + ' (' + esc(exp.oficina) + ')</div>' +
              '<div style="font-size:13px;color:#475569;margin-top:4px;line-height:18px;">Generación de código unificado institucional y radicación inicial del trámite.</div>' +
            '</div>' +
            '<div style="position:relative;padding-left:18px;">' +
              '<div style="position:absolute;left:-25px;top:2px;width:12px;height:12px;border-radius:50%;background:#94A3B8;border:2px solid #fff;box-shadow:0 0 0 1px #94A3B8;"></div>' +
              '<div style="font-size:13.5px;font-weight:700;color:#252220;">Validación de Identidad y Requisitos Formales</div>' +
              '<div style="font-size:12px;color:#64748B;margin-top:2px;">' + esc(exp.fechaActualizacion) + ' · Sistema Automático SIIT</div>' +
              '<div style="font-size:13px;color:#475569;margin-top:4px;line-height:18px;">Cotejo con el padrón de identidad de RENIEC y validación de expediente conforme.</div>' +
            '</div>' +
            '<div style="position:relative;padding-left:18px;">' +
              '<div style="position:absolute;left:-25px;top:2px;width:12px;height:12px;border-radius:50%;background:#10B981;border:2px solid #fff;box-shadow:0 0 0 1px #10B981;"></div>' +
              '<div style="font-size:13.5px;font-weight:700;color:#252220;">Estado Actual: ' + esc(exp.estado) + '</div>' +
              '<div style="font-size:12px;color:#64748B;margin-top:2px;">' + esc(exp.fechaActualizacion) + ' · Oficina: ' + esc(exp.oficina) + '</div>' +
              '<div style="font-size:13px;color:#475569;margin-top:4px;line-height:18px;">Expediente en seguimiento activo institucional dentro del flujo establecido.</div>' +
            '</div>' +
          '</div>' +
        '</div>';
    } else if(S.detailTab === 4){
      // Tab 4: Derivaciones
      tabBodyHtml =
        '<div style="display:flex;flex-direction:column;gap:16px;">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;">' +
            '<div style="font-size:14px;font-weight:600;color:#252220;">Derivaciones y Pases del Expediente</div>' +
          '</div>' +
          '<div class="tw" style="border:1px solid rgba(32,32,32,0.12);border-radius:4px;overflow-x:auto;">' +
            '<table class="t001-table" style="width:100%;border-collapse:collapse;font-family:Inter,sans-serif;text-align:left;font-size:13px;">' +
              '<thead>' +
                '<tr style="background:rgba(32,32,32,0.04);border-bottom:1px solid rgba(32,32,32,0.12);height:40px;">' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;">Fecha</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;">Origen / Remitente</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;">Destino / Oficina</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;">Proveído / Detalle</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;text-align:center;">Estado</th>' +
                '</tr>' +
              '</thead>' +
              '<tbody>' +
                '<tr>' +
                  buildDetailTextCell(exp.fechaActualizacion || '04/09/2026 14:15', { isLast: true }) +
                  buildDetailTextCell('Mesa de Partes SIIT', { isLast: true }) +
                  buildDetailTextCell(exp.oficina || 'SUNAFIL', { isLast: true }) +
                  buildDetailTextCell('Para calificación, evaluación y fines pertinentes del trámite según competencia funcional.', { isLast: true }) +
                  '<td class="figma-cell-td" style="padding:0;border:0;vertical-align:middle;text-align:center;">' +
                    '<div data-type="Status" style="width:100%;height:100%;padding-left:16px;padding-right:16px;padding-top:12px;padding-bottom:12px;border-bottom:0;justify-content:center;align-items:center;gap:8px;display:inline-flex;">' +
                      buildTag('Recibido', 'b-ok') +
                    '</div>' +
                  '</td>' +
                '</tr>' +
              '</tbody>' +
            '</table>' +
          '</div>' +
        '</div>';
    } else if(S.detailTab === 5){
      // Tab 5: Participantes
      tabBodyHtml =
        '<div style="display:flex;flex-direction:column;gap:16px;">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;">' +
            '<div style="font-size:14px;font-weight:600;color:#252220;">Participantes e Intervinientes</div>' +
          '</div>' +
          '<div class="tw" style="border:1px solid rgba(32,32,32,0.12);border-radius:4px;overflow-x:auto;">' +
            '<table class="t001-table" style="width:100%;border-collapse:collapse;font-family:Inter,sans-serif;text-align:left;font-size:13px;">' +
              '<thead>' +
                '<tr style="background:rgba(32,32,32,0.04);border-bottom:1px solid rgba(32,32,32,0.12);height:40px;">' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;">Participante</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;">Rol</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;">Documento</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;">Entidad / Dependencia</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;">Contacto institucional</th>' +
                '</tr>' +
              '</thead>' +
              '<tbody>' +
                '<tr>' +
                  buildDetailTextCell(exp.interesadoNombre || 'Juan Erick') +
                  '<td class="figma-cell-td" style="padding:0;border:0;vertical-align:middle;">' +
                    '<div data-type="Status" style="width:100%;height:100%;padding-left:16px;padding-right:16px;padding-top:12px;padding-bottom:12px;border-bottom:1px var(--sys-color-divider-default, rgba(32, 32, 32, 0.12)) solid;justify-content:flex-start;align-items:center;gap:8px;display:inline-flex;">' +
                      buildTag('Titular / Interesado', 'b-info') +
                    '</div>' +
                  '</td>' +
                  buildDetailTextCell((exp.interesadoTipoDoc || 'DNI') + ' ' + (exp.interesadoDoc || '44481657')) +
                  buildDetailTextCell('Persona Natural / Administrado') +
                  buildDetailTextCell('contacto_interesado@gob.pe') +
                '</tr>' +
                '<tr>' +
                  buildDetailTextCell(exp.responsable || 'SUNAFIL', { isLast: true }) +
                  '<td class="figma-cell-td" style="padding:0;border:0;vertical-align:middle;">' +
                    '<div data-type="Status" style="width:100%;height:100%;padding-left:16px;padding-right:16px;padding-top:12px;padding-bottom:12px;border-bottom:0;justify-content:flex-start;align-items:center;gap:8px;display:inline-flex;">' +
                      buildTag('Responsable Asignado', 'b-off') +
                    '</div>' +
                  '</td>' +
                  buildDetailTextCell('RUC Institucional', { isLast: true }) +
                  buildDetailTextCell(exp.oficina || 'SUNAFIL', { isLast: true }) +
                  buildDetailTextCell('siit_soporte@sunafil.gob.pe', { isLast: true }) +
                '</tr>' +
              '</tbody>' +
            '</table>' +
          '</div>' +
        '</div>';
    } else if(S.detailTab === 6){
      // Tab 6: Notificantes
      tabBodyHtml =
        '<div style="display:flex;flex-direction:column;gap:16px;">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;">' +
            '<div style="font-size:14px;font-weight:600;color:#252220;">Notificaciones y Comunicaciones Oficiales</div>' +
          '</div>' +
          '<div class="tw" style="border:1px solid rgba(32,32,32,0.12);border-radius:4px;overflow-x:auto;">' +
            '<table class="t001-table" style="width:100%;border-collapse:collapse;font-family:Inter,sans-serif;text-align:left;font-size:13px;">' +
              '<thead>' +
                '<tr style="background:rgba(32,32,32,0.04);border-bottom:1px solid rgba(32,32,32,0.12);height:40px;">' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;">Acto notificado</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;">Destinatario</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;">Medio / Vía</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;">Fecha y hora</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;text-align:center;">Estado</th>' +
                '</tr>' +
              '</thead>' +
              '<tbody>' +
                '<tr>' +
                  buildDetailTextCell('Notificación de inicio y apertura de expediente ' + (exp.id || ''), { isLast: true }) +
                  buildDetailTextCell((exp.interesadoNombre || '') + ' (' + (exp.interesadoDoc || '') + ')', { isLast: true }) +
                  buildDetailTextCell('Casilla Electrónica SIIT', { isLast: true }) +
                  buildDetailTextCell(exp.fechaActualizacion || '04/09/2026 14:15', { isLast: true }) +
                  '<td class="figma-cell-td" style="padding:0;border:0;vertical-align:middle;text-align:center;">' +
                    '<div data-type="Status" style="width:100%;height:100%;padding-left:16px;padding-right:16px;padding-top:12px;padding-bottom:12px;border-bottom:0;justify-content:center;align-items:center;gap:8px;display:inline-flex;">' +
                      buildTag('Entregado', 'b-ok') +
                    '</div>' +
                  '</td>' +
                '</tr>' +
              '</tbody>' +
            '</table>' +
          '</div>' +
        '</div>';
    }

    var mainCard = '<div class="card" style="background:white;border:1px solid rgba(32,32,32,0.12);border-radius:8px;padding:0;overflow:hidden;">' +
      tabsNav +
      '<div style="padding:24px;">' + tabBodyHtml + '</div>' +
    '</div>';

    mount.innerHTML = headerCard + mainCard;

    // Event listeners para los tabs
    mount.querySelectorAll('[data-exp-tab]').forEach(function(btn){
      btn.addEventListener('click', function(e){
        e.preventDefault();
        var tabId = parseInt(btn.getAttribute('data-exp-tab'), 10) || 1;
        S.detailTab = tabId;
        renderExpedienteDetail();
      });
    });
  }

  // Hook global del enrutador para activar renderizado en #expediente, #exp-list y #exp-detail
  window.__onShow = window.__onShow || {};
  window.__onShow['expediente'] = renderExpedientes;
  window.__onShow['exp-list'] = renderExpedientes;
  window.__onShow['exp-detail'] = function(){
    if(!S.currentDetailExp) S.currentDetailExp = EXPEDIENTES_DATA[0];
    renderExpedienteDetail();
  };

  document.addEventListener('DOMContentLoaded', function(){
    var hash = location.hash.slice(1);
    if(hash === 'expediente' || hash === 'exp-list'){
      renderExpedientes();
    } else if(hash === 'exp-detail'){
      if(!S.currentDetailExp) S.currentDetailExp = EXPEDIENTES_DATA[0];
      renderExpedienteDetail();
    }
  });

  // Exportar para acceso en consola si se requiere
  window.renderExpedientes = renderExpedientes;
  window.renderExpedienteDetail = renderExpedienteDetail;
})();
