/* ==========================================================================
   SIIT · GESTOR DE IDENTIDAD (USUARIOS, SUCURSALES, ROLES, PERFILES, OPCIONES)
   ========================================================================== */

(function(){
  var PENCIL = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/><path d="M12 20h9"/></svg>';
  var BAN = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>';
  var CHECK = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2"><polyline points="20 6 9 17 4 12"/></svg>';
  var TH_ICONS = '<div class="th-icons"><svg viewBox="0 0 24 24" title="Ordenar"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg><svg viewBox="0 0 24 24" title="Filtrar"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg></div>';

  function makeTh(title, showIcons) {
    if(showIcons === false) return '<th><div class="th-cell"><span class="th-title">' + title + '</span></div></th>';
    return '<th><div class="th-cell"><span class="th-title">' + title + '</span>' + TH_ICONS + '</div></th>';
  }

  function getToolbar(placeholder) {
    return '<div class="tools" style="margin-bottom:20px;">' +
      '<div class="search"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg><input placeholder="' + (placeholder || 'Buscar') + '"></div>' +
      '<div class="tbl-actions">' +
        '<button class="btn-tbl-action" type="button"><svg viewBox="0 0 24 24"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></svg><span>Filtros</span></button>' +
        '<button class="btn-tbl-action" type="button"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18"/></svg><span>Columnas</span></button>' +
      '</div>' +
    '</div>';
  }

  function getPagination(infoText, totalPages) {
    infoText = infoText || 'Mostrando 1–10 de 57';
    totalPages = totalPages || 8;
    return '<div data-edge-buttons="true" data-report="true" data-rows-per-page="true" style="width: 100%; padding-top: 16px; background: white; border-top: 1px rgba(32, 32, 32, 0.12) solid; justify-content: space-between; align-items: center; gap: 16px; display: flex; flex-wrap: wrap;">' +
        '<div style="justify-content: flex-start; align-items: center; gap: 24px; display: flex">' +
            '<div style="color: #504C4A; font-size: 12px; font-family: Inter; font-weight: 500; line-height: 16px;">' + infoText + '</div>' +
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
                    '<div style="height: 30px; min-width: 30px; padding: 0 8px; border-radius: 8px; justify-content: center; align-items: center; display: flex; color: #504C4A; font-size: 12px; font-family: Inter; font-weight: 600; cursor: pointer;">3</div>' +
                    '<div style="height: 30px; min-width: 24px; justify-content: center; align-items: center; display: flex; color: #504C4A; font-size: 14px; font-family: Inter;">…</div>' +
                    '<div style="height: 30px; min-width: 30px; padding: 0 8px; border-radius: 8px; justify-content: center; align-items: center; display: flex; color: #504C4A; font-size: 12px; font-family: Inter; font-weight: 600; cursor: pointer;">' + totalPages + '</div>' +
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
                        '<option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option>' +
                    '</select>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';
  }

  var INITIAL_USUARIOS = [
    { doc: '01234567', name: 'Juan Pérez Ramos', mail: 'juan.perez@sunafil.gob.pe', perfil: 'Coordinador de Fiscalización', sede: 'San Juan de Miraflores', estado: 'Activo' },
    { doc: '08765432', name: 'Maria Rosa Alva', mail: 'maria.alva@sunafil.gob.pe', perfil: 'Inspector Auxiliar', sede: 'Villa El Salvador', estado: 'Activo' },
    { doc: '45678901', name: 'Rebecca Ramírez Palma', mail: 'rebecca.ramirez@sunafil.gob.pe', perfil: 'Coordinador Nacional', sede: 'ILM Lima Metropolitana', estado: 'Activo' }
  ];

  var INITIAL_SUCURSALES = [
    { codigo: 'SUC-01', nombre: 'Oficina Zonal San Juan de Miraflores', tipo: 'Sucursal Zonal', ire: 'ILM Lima Metropolitana', ubigeo: '150132', estado: 'Activo' },
    { codigo: 'SUC-02', nombre: 'Oficina Zonal Villa El Salvador', tipo: 'Sucursal Zonal', ire: 'ILM Lima Metropolitana', ubigeo: '150137', estado: 'Activo' },
    { codigo: 'SUC-03', nombre: 'Intendencia Regional Arequipa', tipo: 'Intendencia Regional', ire: 'IRE Arequipa', ubigeo: '040101', estado: 'Activo' },
    { codigo: 'SUC-04', nombre: 'Intendencia Regional La Libertad', tipo: 'Intendencia Regional', ire: 'IRE La Libertad', ubigeo: '130101', estado: 'Inactivo' }
  ];

  var INITIAL_ROLES = [
    { codigo: 'ROL-01', nombre: 'Creador', alcance: 'Permiso de creación y modificación en tablas y flujos', nivel: 'Nacional / Sucursal', estado: 'Activo' },
    { codigo: 'ROL-02', nombre: 'Aprobador', alcance: 'Permiso de aprobación y firma digital institucional', nivel: 'Nacional / Sucursal', estado: 'Activo' },
    { codigo: 'ROL-03', nombre: 'Consultas y Reportes', alcance: 'Acceso de lectura y descarga de reportes ejecutivos', nivel: 'Nacional', estado: 'Activo' }
  ];

  var INITIAL_PERFILES = [
    { codigo: 'PRF-01', nombre: 'Coordinador de Fiscalización', modulo: 'Fiscalización · PO2', rol: 'Aprobador', estado: 'Activo' },
    { codigo: 'PRF-02', nombre: 'Inspector Auxiliar', modulo: 'Fiscalización · PO2', rol: 'Consultas y Reportes', estado: 'Activo' },
    { codigo: 'PRF-03', nombre: 'Orientador', modulo: 'Atención al ciudadano · PS1', rol: 'Consultas y Reportes', estado: 'Activo' },
    { codigo: 'PRF-04', nombre: 'Consulta de maestras', modulo: 'Componentes transversales · TRA001', rol: 'Consultas y Reportes', estado: 'Activo' }
  ];

  var INITIAL_OPCIONES = [
    { codigo: 'MNU-01', nombre: 'Gestor de Estructura de Tablas Maestras', ruta: 'tra001-list', modulo: 'Componentes Transversales', estado: 'Activo' },
    { codigo: 'MNU-02', nombre: 'Gestor de Datos de Tablas Maestras', ruta: 'tra002-list', modulo: 'Componentes Transversales', estado: 'Activo' },
    { codigo: 'MNU-03', nombre: 'Administrador de Línea Gráfica', ruta: 'linea-grafica', modulo: 'Componentes Transversales', estado: 'Activo' },
    { codigo: 'MNU-04', nombre: 'Expediente Electrónico', ruta: 'expediente-list', modulo: 'Inteligencia Inspectiva', estado: 'Activo' },
    { codigo: 'MNU-05', nombre: 'Diseñador de Flujos (Workflow Engine)', ruta: 'workflow-list', modulo: 'Plataforma Core', estado: 'Activo' }
  ];

  var usuariosList = JSON.parse(JSON.stringify(INITIAL_USUARIOS));
  var sucursalesList = JSON.parse(JSON.stringify(INITIAL_SUCURSALES));
  var rolesList = JSON.parse(JSON.stringify(INITIAL_ROLES));
  var perfilesList = JSON.parse(JSON.stringify(INITIAL_PERFILES));
  var opcionesList = JSON.parse(JSON.stringify(INITIAL_OPCIONES));

  function esc(x){ return (x == null ? '' : String(x)).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }

  function getActionBtns(type, idx, status) {
    var isUser = type === 'user';
    var isSucursal = type === 'sucursal';
    var isRol = type === 'rol';
    var isPerfil = type === 'perfil';
    var isOpcion = type === 'opcion';

    var editAttr = isUser ? 'data-uidx="' + idx + '"' : 'data-idx="' + idx + '"';
    var editClass = isUser ? 'btn-edit-user' : isSucursal ? 'btn-edit-sucursal' : isRol ? 'btn-edit-rol' : isPerfil ? 'btn-edit-perfil' : 'btn-edit-opcion';
    var toggleClass = isUser ? 'btn-toggle-user' : isSucursal ? 'btn-toggle-sucursal' : isRol ? 'btn-toggle-rol' : isPerfil ? 'btn-toggle-perfil' : 'btn-toggle-opcion';

    var acts = '<div class="acts">' +
      '<a class="' + editClass + '" title="Editar" ' + editAttr + ' style="color:#06396E;cursor:pointer;">' + PENCIL + '</a>';

    if(status === 'Activo') {
      acts += '<a class="' + toggleClass + '" title="Desactivar" ' + editAttr + ' style="color:#D51317;cursor:pointer;">' + BAN + '</a>';
    } else {
      acts += '<a class="' + toggleClass + '" title="Activar" ' + editAttr + ' style="color:#16A34A;cursor:pointer;">' + CHECK + '</a>';
    }
    acts += '</div>';

    var badge = status === 'Activo' ? '<span class="badge b-ok">Activo</span>' : '<span class="badge b-off">Inactivo</span>';
    return { actions: acts, badge: badge };
  }

  function renderUsuarios() {
    var mount = document.getElementById('usuarios-list-mount');
    if(!mount) return;
    var rowsHtml = usuariosList.map(function(u, idx){
      var btns = getActionBtns('user', idx, u.estado);
      return '<tr>' +
        '<td><input class="chk" type="checkbox"></td>' +
        '<td class="num">' + esc(u.doc) + '</td>' +
        '<td class="lnk"><a class="btn-edit-user" data-uidx="' + idx + '" style="cursor:pointer;">' + esc(u.name) + '</a></td>' +
        '<td>' + esc(u.mail) + '</td>' +
        '<td>' + esc(u.perfil) + '</td>' +
        '<td>' + esc(u.sede) + '</td>' +
        '<td>' + btns.badge + '</td>' +
        '<td style="text-align:right">' + btns.actions + '</td>' +
      '</tr>';
    }).join('');

    mount.innerHTML =
      '<div class="card" style="padding:20px 20px 16px;">' +
        getToolbar('Buscar usuario...') +
        '<div class="tw" style="border:1px solid rgba(32,32,32,0.12);border-radius:4px;overflow:hidden;margin-bottom:16px;"><table style="min-width:100%;">' +
          '<thead><tr>' +
            '<th style="width:36px;"><input class="chk" type="checkbox"></th>' +
            makeTh('N° Doc.') +
            makeTh('Usuario') +
            makeTh('Correo institucional') +
            makeTh('Perfil principal') +
            makeTh('Ámbito de asignación') +
            makeTh('Estado') +
            '<th style="text-align:right">ACCIONES</th>' +
          '</tr></thead>' +
          '<tbody>' + rowsHtml + '</tbody>' +
        '</table></div>' +
        getPagination('Mostrando 1–' + usuariosList.length + ' de ' + usuariosList.length, 1) +
      '</div>';
  }

  function renderSucursales() {
    var mount = document.getElementById('sucursales-list-mount');
    if(!mount) return;
    var rowsHtml = sucursalesList.map(function(s, idx){
      var btns = getActionBtns('sucursal', idx, s.estado);
      return '<tr>' +
        '<td><input class="chk" type="checkbox"></td>' +
        '<td class="num">' + esc(s.codigo) + '</td>' +
        '<td class="lnk"><a class="btn-edit-sucursal" data-idx="' + idx + '" style="cursor:pointer;">' + esc(s.nombre) + '</a></td>' +
        '<td>' + esc(s.tipo) + '</td>' +
        '<td>' + esc(s.ire) + '</td>' +
        '<td>' + esc(s.ubigeo) + '</td>' +
        '<td>' + btns.badge + '</td>' +
        '<td style="text-align:right">' + btns.actions + '</td>' +
      '</tr>';
    }).join('');

    mount.innerHTML =
      '<div class="card" style="padding:20px 20px 16px;">' +
        getToolbar('Buscar sucursal...') +
        '<div class="tw" style="border:1px solid rgba(32,32,32,0.12);border-radius:4px;overflow:hidden;margin-bottom:16px;"><table style="min-width:100%;">' +
          '<thead><tr>' +
            '<th style="width:36px;"><input class="chk" type="checkbox"></th>' +
            makeTh('Código') +
            makeTh('Nombre de la Sucursal') +
            makeTh('Tipo / Ámbito') +
            makeTh('Intendencia Regional') +
            makeTh('Ubigeo') +
            makeTh('Estado') +
            '<th style="text-align:right">ACCIONES</th>' +
          '</tr></thead>' +
          '<tbody>' + rowsHtml + '</tbody>' +
        '</table></div>' +
        getPagination('Mostrando 1–' + sucursalesList.length + ' de ' + sucursalesList.length, 1) +
      '</div>';
  }

  function renderRoles() {
    var mount = document.getElementById('roles-list-mount');
    if(!mount) return;
    var rowsHtml = rolesList.map(function(r, idx){
      var btns = getActionBtns('rol', idx, r.estado);
      return '<tr>' +
        '<td><input class="chk" type="checkbox"></td>' +
        '<td class="num">' + esc(r.codigo) + '</td>' +
        '<td class="lnk"><a class="btn-edit-rol" data-idx="' + idx + '" style="cursor:pointer;">' + esc(r.nombre) + '</a></td>' +
        '<td>' + esc(r.alcance) + '</td>' +
        '<td>' + esc(r.nivel) + '</td>' +
        '<td>' + btns.badge + '</td>' +
        '<td style="text-align:right">' + btns.actions + '</td>' +
      '</tr>';
    }).join('');

    mount.innerHTML =
      '<div class="card" style="padding:20px 20px 16px;">' +
        getToolbar('Buscar rol...') +
        '<div class="tw" style="border:1px solid rgba(32,32,32,0.12);border-radius:4px;overflow:hidden;margin-bottom:16px;"><table style="min-width:100%;">' +
          '<thead><tr>' +
            '<th style="width:36px;"><input class="chk" type="checkbox"></th>' +
            makeTh('Código') +
            makeTh('Nombre del Rol') +
            makeTh('Descripción del Alcance') +
            makeTh('Nivel de Acceso') +
            makeTh('Estado') +
            '<th style="text-align:right">ACCIONES</th>' +
          '</tr></thead>' +
          '<tbody>' + rowsHtml + '</tbody>' +
        '</table></div>' +
        getPagination('Mostrando 1–' + rolesList.length + ' de ' + rolesList.length, 1) +
      '</div>';
  }

  function renderPerfiles() {
    var mount = document.getElementById('perfiles-list-mount');
    if(!mount) return;
    var rowsHtml = perfilesList.map(function(p, idx){
      var btns = getActionBtns('perfil', idx, p.estado);
      return '<tr>' +
        '<td><input class="chk" type="checkbox"></td>' +
        '<td class="num">' + esc(p.codigo) + '</td>' +
        '<td class="lnk"><a class="btn-edit-perfil" data-idx="' + idx + '" style="cursor:pointer;">' + esc(p.nombre) + '</a></td>' +
        '<td>' + esc(p.modulo) + '</td>' +
        '<td>' + esc(p.rol) + '</td>' +
        '<td>' + btns.badge + '</td>' +
        '<td style="text-align:right">' + btns.actions + '</td>' +
      '</tr>';
    }).join('');

    mount.innerHTML =
      '<div class="card" style="padding:20px 20px 16px;">' +
        getToolbar('Buscar perfil...') +
        '<div class="tw" style="border:1px solid rgba(32,32,32,0.12);border-radius:4px;overflow:hidden;margin-bottom:16px;"><table style="min-width:100%;">' +
          '<thead><tr>' +
            '<th style="width:36px;"><input class="chk" type="checkbox"></th>' +
            makeTh('Código') +
            makeTh('Perfil Funcional') +
            makeTh('Módulo / Proceso') +
            makeTh('Rol Asociado') +
            makeTh('Estado') +
            '<th style="text-align:right">ACCIONES</th>' +
          '</tr></thead>' +
          '<tbody>' + rowsHtml + '</tbody>' +
        '</table></div>' +
        getPagination('Mostrando 1–' + perfilesList.length + ' de ' + perfilesList.length, 1) +
      '</div>';
  }

  function renderOpciones() {
    var mount = document.getElementById('opciones-list-mount');
    if(!mount) return;
    var rowsHtml = opcionesList.map(function(o, idx){
      var btns = getActionBtns('opcion', idx, o.estado);
      return '<tr>' +
        '<td><input class="chk" type="checkbox"></td>' +
        '<td class="num">' + esc(o.codigo) + '</td>' +
        '<td class="lnk"><a class="btn-edit-opcion" data-idx="' + idx + '" style="cursor:pointer;">' + esc(o.nombre) + '</a></td>' +
        '<td>' + esc(o.ruta) + '</td>' +
        '<td>' + esc(o.modulo) + '</td>' +
        '<td>' + btns.badge + '</td>' +
        '<td style="text-align:right">' + btns.actions + '</td>' +
      '</tr>';
    }).join('');

    mount.innerHTML =
      '<div class="card" style="padding:20px 20px 16px;">' +
        getToolbar('Buscar opción...') +
        '<div class="tw" style="border:1px solid rgba(32,32,32,0.12);border-radius:4px;overflow:hidden;margin-bottom:16px;"><table style="min-width:100%;">' +
          '<thead><tr>' +
            '<th style="width:36px;"><input class="chk" type="checkbox"></th>' +
            makeTh('Código') +
            makeTh('Menú / Opción') +
            makeTh('Ruta / Identificador') +
            makeTh('Módulo') +
            makeTh('Estado') +
            '<th style="text-align:right">ACCIONES</th>' +
          '</tr></thead>' +
          '<tbody>' + rowsHtml + '</tbody>' +
        '</table></div>' +
        getPagination('Mostrando 1–' + opcionesList.length + ' de ' + opcionesList.length, 1) +
      '</div>';
  }

  function resetUsuariosForm() {
    ['u-username', 'u-ndoc', 'u-nombres', 'u-paterno', 'u-materno', 'u-mail', 'u-telf', 'u-cel'].forEach(function(id){
      var el = document.getElementById(id);
      if(el) el.value = '';
    });
    var tbody = document.getElementById('tbody-asignaciones-usuario');
    if(tbody) tbody.innerHTML = '';
  }

  function resetSucursalesForm() {
    ['s-codigo', 's-nombre', 's-direccion'].forEach(function(id){
      var el = document.getElementById(id);
      if(el) el.value = '';
    });
  }

  function resetRolesForm() {
    var rCod = document.getElementById('r-codigo'); if(rCod) rCod.value = 'ROL-00' + (rolesList.length + 1);
    var rNom = document.getElementById('r-nombre'); if(rNom) rNom.value = '';
    var rDesc = document.getElementById('r-descripcion'); if(rDesc) rDesc.value = '';
  }

  function resetPerfilesForm() {
    var pCod = document.getElementById('p-codigo'); if(pCod) pCod.value = 'PRF-00' + (perfilesList.length + 1);
    var pNom = document.getElementById('p-nombre'); if(pNom) pNom.value = '';
    var pCargo = document.getElementById('p-cargo'); if(pCargo) pCargo.value = '';
    var pDesc = document.getElementById('p-descripcion'); if(pDesc) pDesc.value = '';
  }

  function loadUserForEdit(u) {
    if(!u) return;
    var parts = u.name.split(' ');
    var uUsername = document.getElementById('u-username'); if(uUsername) uUsername.value = u.mail ? u.mail.split('@')[0] : 'usuario';
    var uNdoc = document.getElementById('u-ndoc'); if(uNdoc) uNdoc.value = u.doc || '01234567';
    var uNombres = document.getElementById('u-nombres'); if(uNombres) uNombres.value = parts[0] || '';
    var uPaterno = document.getElementById('u-paterno'); if(uPaterno) uPaterno.value = parts[1] || '';
    var uMaterno = document.getElementById('u-materno'); if(uMaterno) uMaterno.value = parts.slice(2).join(' ') || (parts[2] || '');
    var uMail = document.getElementById('u-mail'); if(uMail) uMail.value = u.mail || '';
    
    var tbody = document.getElementById('tbody-asignaciones-usuario');
    if (tbody) {
      tbody.innerHTML = '<tr>' +
        '<td>PO2 — Fiscalización</td>' +
        '<td><span class="badge b-info">Aprobador</span></td>' +
        '<td>' + (u.perfil || 'Coordinador de Fiscalización') + '</td>' +
        '<td><span class="badge b-ok">Por sucursal</span></td>' +
        '<td>' + (u.sede || 'Oficina Zonal San Juan de Miraflores') + '</td>' +
        '<td class="num">01/08/2026 — 31/12/2026</td>' +
        '<td>Asignación previa registrada</td>' +
        '<td style="text-align:right"><div class="acts"><a title="Editar" style="color:var(--navy-800)"><svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg></a></div></td>' +
      '</tr>';
    }
  }

  window.__onShow = window.__onShow || {};
  window.__onShow['usuarios-list'] = renderUsuarios;
  window.__onShow['usuarios-form'] = function() {};
  window.__onShow['sucursales-list'] = renderSucursales;
  window.__onShow['sucursales-form'] = function() {};
  window.__onShow['roles-list'] = renderRoles;
  window.__onShow['roles-form'] = function() {};
  window.__onShow['perfiles-list'] = renderPerfiles;
  window.__onShow['perfiles-form'] = function() {};
  window.__onShow['opciones-list'] = renderOpciones;

  function showToast(msg, kind, title) {
    var t = document.getElementById('t001-toast');
    if (!t) return;
    kind = kind || 'info';
    var iconSvg = '';
    if (kind === 'err') {
      iconSvg = '<div style="width:24px;height:24px;border-radius:50%;border:2px solid #881337;display:grid;place-items:center;flex-shrink:0"><svg viewBox="0 0 24 24" style="width:13px;height:13px;stroke:#881337;fill:none;stroke-width:3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></div>';
    } else if (kind === 'ok') {
      iconSvg = '<div style="width:24px;height:24px;border-radius:50%;border:2px solid #14532D;display:grid;place-items:center;flex-shrink:0"><svg viewBox="0 0 24 24" style="width:13px;height:13px;stroke:#14532D;fill:none;stroke-width:3"><polyline points="20 6 9 17 4 12"/></svg></div>';
    } else {
      iconSvg = '<div style="width:24px;height:24px;border-radius:50%;border:2px solid #1E3A8A;display:grid;place-items:center;flex-shrink:0"><svg viewBox="0 0 24 24" style="width:13px;height:13px;stroke:#1E3A8A;fill:none;stroke-width:3"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg></div>';
    }
    var titleHtml = title ? '<div style="font-weight:700;font-size:14px;margin-bottom:2px;">' + title + '</div>' : '';
    t.style.display = 'block';
    t.style.background = (kind==='ok'?'#DCFCE7':kind==='err'?'#FFE4E6':'#EFF6FF');
    t.style.color = (kind==='ok'?'#14532D':kind==='err'?'#881337':'#1E3A8A');
    t.style.border = '1px solid ' + (kind==='ok'?'#BBF7D0':kind==='err'?'#FECDD3':'#BFDBFE');
    t.innerHTML = '<div style="display:flex;align-items:center;gap:12px;">' + iconSvg + '<div style="flex:1;">' + titleHtml + '<div style="font-size:13px;">' + msg + '</div></div></div>';
    clearTimeout(t._to);
    t._to = setTimeout(function(){ t.style.display = 'none'; }, 4500);
  }

  // Interaction Listeners for usuarios-form, sucursales-form, roles-form, perfiles-form and dropdowns
  document.addEventListener('click', function(e){
    // Toggle Activar / Inactivar entity status
    var toggleBtn = e.target.closest('.btn-toggle-entity');
    if (toggleBtn) {
      var entity = toggleBtn.getAttribute('data-entity');
      var idx = parseInt(toggleBtn.getAttribute('data-idx'), 10);
      var item = null;
      var renderFn = null;
      var entityLabel = '';

      if (entity === 'user' && usuariosList[idx]) {
        item = usuariosList[idx]; renderFn = renderUsuarios; entityLabel = 'Usuario';
      } else if (entity === 'sucursal' && sucursalesList[idx]) {
        item = sucursalesList[idx]; renderFn = renderSucursales; entityLabel = 'Sucursal';
      } else if (entity === 'rol' && rolesList[idx]) {
        item = rolesList[idx]; renderFn = renderRoles; entityLabel = 'Rol';
      } else if (entity === 'perfil' && perfilesList[idx]) {
        item = perfilesList[idx]; renderFn = renderPerfiles; entityLabel = 'Perfil';
      } else if (entity === 'opcion' && opcionesList[idx]) {
        item = opcionesList[idx]; renderFn = renderOpciones; entityLabel = 'Opción';
      }

      if (item) {
        var name = item.name || item.nombre || item.doc || item.codigo;
        if (item.estado === 'Activo') {
          item.estado = 'Inactivo';
          showToast(entityLabel + ' "' + name + '" inactivado correctamente.', 'err', 'Registro inactivado');
        } else {
          item.estado = 'Activo';
          showToast(entityLabel + ' "' + name + '" activado correctamente.', 'ok', 'Registro activado');
        }
        if (renderFn) renderFn();
      }
      return;
    }

    // Registrar Usuario button
    var regUserBtn = e.target.closest('[data-go="usuarios-form"]');
    var isTableEdit = e.target.closest('.btn-edit-user');
    if (regUserBtn && !isTableEdit) {
      resetUsuariosForm();
    }

    // Registrar Sucursal button
    var regSucBtn = e.target.closest('[data-go="sucursales-form"]');
    var isSucEdit = e.target.closest('.btn-edit-sucursal');
    if (regSucBtn && !isSucEdit) {
      resetSucursalesForm();
    }

    // Registrar Rol button
    var regRolBtn = e.target.closest('[data-go="roles-form"]');
    var isRolEdit = e.target.closest('.btn-edit-rol');
    if (regRolBtn && !isRolEdit) {
      resetRolesForm();
    }

    // Registrar Perfil button
    var regPerfilBtn = e.target.closest('[data-go="perfiles-form"]');
    var isPerfilEdit = e.target.closest('.btn-edit-perfil');
    if (regPerfilBtn && !isPerfilEdit) {
      resetPerfilesForm();
    }

    // Edit User link in table
    var editUserBtn = e.target.closest('.btn-edit-user');
    if (editUserBtn) {
      var uidx = parseInt(editUserBtn.getAttribute('data-uidx'), 10);
      if (!isNaN(uidx) && usuariosList[uidx]) {
        loadUserForEdit(usuariosList[uidx]);
        if (window.go) window.go('usuarios-form');
      }
      return;
    }

    // Edit Sucursal in table
    var editSucBtn = e.target.closest('.btn-edit-sucursal');
    if (editSucBtn) {
      var sidx = parseInt(editSucBtn.getAttribute('data-idx'), 10);
      if (!isNaN(sidx) && sucursalesList[sidx]) {
        var sItem = sucursalesList[sidx];
        if (document.getElementById('s-codigo')) document.getElementById('s-codigo').value = sItem.codigo;
        if (document.getElementById('s-nombre')) document.getElementById('s-nombre').value = sItem.nombre;
        if (window.go) window.go('sucursales-form');
      }
      return;
    }

    // Edit Rol in table
    var editRolBtn = e.target.closest('.btn-edit-rol');
    if (editRolBtn) {
      var ridx = parseInt(editRolBtn.getAttribute('data-idx'), 10);
      if (!isNaN(ridx) && rolesList[ridx]) {
        var rItem = rolesList[ridx];
        if (document.getElementById('r-codigo')) document.getElementById('r-codigo').value = rItem.codigo;
        if (document.getElementById('r-nombre')) document.getElementById('r-nombre').value = rItem.nombre;
        if (window.go) window.go('roles-form');
      }
      return;
    }

    // Edit Perfil in table
    var editPerfBtn = e.target.closest('.btn-edit-perfil');
    if (editPerfBtn) {
      var pidx = parseInt(editPerfBtn.getAttribute('data-idx'), 10);
      if (!isNaN(pidx) && perfilesList[pidx]) {
        var pItem = perfilesList[pidx];
        if (document.getElementById('p-codigo')) document.getElementById('p-codigo').value = pItem.codigo;
        if (document.getElementById('p-nombre')) document.getElementById('p-nombre').value = pItem.nombre;
        if (window.go) window.go('perfiles-form');
      }
      return;
    }

    // Open Asignacion Modal
    var openBtn = e.target.closest('#btn-open-asignacion-modal');
    if (openBtn) {
      var modal = document.getElementById('modal-asignacion-rol');
      if (modal) modal.style.display = 'grid';
      return;
    }

    // Close Asignacion Modal
    var closeBtn = e.target.closest('#btn-close-modal-asignacion, #btn-cancel-modal-asignacion');
    if (closeBtn) {
      var modal = document.getElementById('modal-asignacion-rol');
      if (modal) modal.style.display = 'none';
      return;
    }

    // Save Asignacion Modal Row
    var saveAsigBtn = e.target.closest('#btn-save-modal-asignacion');
    if (saveAsigBtn) {
      var proc = document.getElementById('m-proc-siit') ? document.getElementById('m-proc-siit').value : 'PO2 — Fiscalización';
      var rol = document.getElementById('m-rol-siit') ? document.getElementById('m-rol-siit').value : 'Aprobador';
      var perfil = document.getElementById('m-perfil-siit') ? document.getElementById('m-perfil-siit').value : 'Coordinador de Fiscalización';
      var alcance = document.getElementById('m-alcance-siit') ? document.getElementById('m-alcance-siit').value : 'Por sucursal';
      var sede = document.getElementById('m-sede-siit') ? document.getElementById('m-sede-siit').value : 'Oficina Zonal San Juan de Miraflores';
      var just = document.getElementById('m-justificacion') ? document.getElementById('m-justificacion').value : 'Sustento registrado';

      var tbody = document.getElementById('tbody-asignaciones-usuario');
      if (tbody) {
        var row = document.createElement('tr');
        row.innerHTML =
          '<td>' + proc + '</td>' +
          '<td><span class="badge b-info">' + rol + '</span></td>' +
          '<td>' + perfil + '</td>' +
          '<td><span class="badge b-ok">' + alcance + '</span></td>' +
          '<td>' + sede + '</td>' +
          '<td class="num">01/08/2026 — 31/12/2026</td>' +
          '<td>' + just + '</td>' +
          '<td style="text-align:right"><div class="acts"><a title="Editar" style="color:var(--navy-800)"><svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg></a><a class="dn" title="Quitar"><svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:#D51317;fill:none;stroke-width:2"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg></a></div></td>';
        tbody.appendChild(row);
      }

      var modal = document.getElementById('modal-asignacion-rol');
      if (modal) modal.style.display = 'none';
      showToast('Asignación agregada correctamente a la lista.', 'ok', 'Asignación agregada');
      return;
    }

    // Consultar Identidad Button
    var consultarBtn = e.target.closest('#btn-consultar-identidad');
    if (consultarBtn) {
      var ndocInput = document.getElementById('u-ndoc');
      var ndocVal = ndocInput ? ndocInput.value.trim() : '';
      var ndoc = ndocVal || generateRandomDNI();
      if (ndocInput) ndocInput.value = ndoc;

      var randNom = getRandomItem(NOMBRES_POOL);
      var randPat = getRandomItem(PATERNO_POOL);
      var randMat = getRandomItem(MATERNO_POOL);

      var cleanPat = randPat.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      var cleanNom = randNom.split(' ')[0].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      var uname = cleanNom.charAt(0) + cleanPat;
      var email = cleanNom + '.' + cleanPat + '@sunafil.gob.pe';

      if (document.getElementById('u-nombres')) document.getElementById('u-nombres').value = randNom;
      if (document.getElementById('u-paterno')) document.getElementById('u-paterno').value = randPat;
      if (document.getElementById('u-materno')) document.getElementById('u-materno').value = randMat;
      if (document.getElementById('u-username')) document.getElementById('u-username').value = uname;
      if (document.getElementById('u-mail')) document.getElementById('u-mail').value = email;

      showToast('Identidad validada con éxito desde RENIEC / AD para el N° ' + ndoc + '.', 'ok', 'Consulta en línea');
      return;
    }

    // Save Usuario Button (Aceptar)
    var saveUserBtn = e.target.closest('#btn-save-usuario');
    if (saveUserBtn) {
      var nom = document.getElementById('u-nombres') ? document.getElementById('u-nombres').value.trim() : '';
      var pat = document.getElementById('u-paterno') ? document.getElementById('u-paterno').value.trim() : '';
      var mat = document.getElementById('u-materno') ? document.getElementById('u-materno').value.trim() : '';
      var docNum = document.getElementById('u-ndoc') ? document.getElementById('u-ndoc').value.trim() : '';
      var mailVal = document.getElementById('u-mail') ? document.getElementById('u-mail').value.trim() : '';
      var cargoVal = document.getElementById('u-cargo') ? document.getElementById('u-cargo').value : 'Coordinador de Fiscalización';
      var sedeVal = document.getElementById('u-sede') ? document.getElementById('u-sede').value : 'San Juan de Miraflores';
      var estadoVal = document.getElementById('u-estado') ? document.getElementById('u-estado').value : 'Activo';

      var fullName = (nom || pat || mat) ? (nom + ' ' + pat + ' ' + mat).trim() : 'Carlos Alberto Sánchez Vargas';
      var finalDoc = docNum || '70891234';
      var finalMail = mailVal || 'carlos.sanchez@sunafil.gob.pe';

      usuariosList.unshift({
        doc: finalDoc,
        name: fullName,
        mail: finalMail,
        perfil: cargoVal,
        sede: sedeVal,
        estado: estadoVal
      });

      showToast('Usuario ' + fullName + ' registrado correctamente con sus asignaciones.', 'ok', 'Usuario creado');
      if (window.go) window.go('usuarios-list');
      renderUsuarios();
      return;
    }

    // Save Sucursal Button (Aceptar)
    var saveSucBtn = e.target.closest('#btn-save-sucursal');
    if (saveSucBtn) {
      var sCode = document.getElementById('s-codigo') ? document.getElementById('s-codigo').value.trim() : '';
      var sName = document.getElementById('s-nombre') ? document.getElementById('s-nombre').value.trim() : '';
      var sTipo = document.getElementById('s-tipo') ? document.getElementById('s-tipo').value : 'Sucursal Zonal';
      var sAmbito = document.getElementById('s-ambito') ? document.getElementById('s-ambito').value : 'Lima Metropolitana';
      var sSup = document.getElementById('s-superior') ? document.getElementById('s-superior').value : 'ILM Lima Metropolitana';
      var sAct = document.getElementById('s-chk-activo') ? document.getElementById('s-chk-activo').checked : true;

      var finalCode = sCode || ('SUC-0' + (sucursalesList.length + 1));
      var finalName = sName || 'Oficina Zonal Chorrillos';

      sucursalesList.unshift({
        codigo: finalCode,
        nombre: finalName,
        tipo: sTipo,
        ire: sSup,
        ubigeo: '150108',
        estado: sAct ? 'Activo' : 'Inactivo'
      });

      showToast('Sucursal ' + finalName + ' registrada correctamente.', 'ok', 'Sucursal creada');
      if (window.go) window.go('sucursales-list');
      renderSucursales();
      return;
    }

    // Save Rol Button (Aceptar)
    var saveRolBtn = e.target.closest('#btn-save-rol');
    if (saveRolBtn) {
      var rCode = document.getElementById('r-codigo') ? document.getElementById('r-codigo').value.trim() : '';
      var rName = document.getElementById('r-nombre') ? document.getElementById('r-nombre').value.trim() : '';
      var rMod = document.getElementById('r-modulo') ? document.getElementById('r-modulo').value : 'Transversal';
      var rEst = document.getElementById('r-estado') ? document.getElementById('r-estado').value : 'Activo';

      var finalRCode = rCode || ('ROL-0' + (rolesList.length + 1));
      var finalRName = rName || 'Validador de Maestras';

      rolesList.unshift({
        codigo: finalRCode,
        nombre: finalRName,
        alcance: rMod,
        nivel: 'Nacional / Sucursal',
        estado: rEst
      });

      showToast('Rol ' + finalRName + ' registrado correctamente.', 'ok', 'Rol creado');
      if (window.go) window.go('roles-list');
      renderRoles();
      return;
    }

    // Save Perfil Button (Aceptar)
    var savePerfBtn = e.target.closest('#btn-save-perfil');
    if (savePerfBtn) {
      var pCode = document.getElementById('p-codigo') ? document.getElementById('p-codigo').value.trim() : '';
      var pName = document.getElementById('p-nombre') ? document.getElementById('p-nombre').value.trim() : '';
      var pCargo = document.getElementById('p-cargo') ? document.getElementById('p-cargo').value.trim() : '';
      var pEst = document.getElementById('p-estado') ? document.getElementById('p-estado').value : 'Activo';

      var finalPCode = pCode || ('PER-0' + (perfilesList.length + 1));
      var finalPName = pName || 'Analista de Sistemas';

      perfilesList.unshift({
        codigo: finalPCode,
        nombre: finalPName,
        modulo: pCargo || 'Componentes Transversales',
        rol: 'Registrador',
        estado: pEst
      });

      showToast('Perfil ' + finalPName + ' registrado correctamente.', 'ok', 'Perfil creado');
      if (window.go) window.go('perfiles-list');
      renderPerfiles();
      return;
    }

    // User Profile Dropdown Box
    var userBox = e.target.closest('#tb-user-box');
    var dropdown = document.getElementById('tb-role-dropdown');
    
    if(userBox && dropdown){
      dropdown.style.display = (dropdown.style.display === 'none' || !dropdown.style.display) ? 'block' : 'none';
      return;
    }

    var roleItem = e.target.closest('.role-item');
    if(roleItem && dropdown){
      var newRole = roleItem.getAttribute('data-role');
      var labelEl = document.getElementById('tb-current-role');
      if(labelEl) labelEl.textContent = newRole;

      if(newRole.indexOf('Aprobador') !== -1) window.CURRENT_ROLE = 'Aprobador';
      else if(newRole.indexOf('Creador') !== -1) window.CURRENT_ROLE = 'Creador';
      else window.CURRENT_ROLE = newRole;

      dropdown.querySelectorAll('.role-item').forEach(function(item){
        item.classList.remove('active');
        item.style.background = 'white';
        item.style.fontWeight = '600';
        var chk = item.querySelector('.chk-mark');
        if(chk) chk.style.display = 'none';
      });

      roleItem.classList.add('active');
      roleItem.style.background = '#EFF6FF';
      roleItem.style.fontWeight = '700';
      var activeChk = roleItem.querySelector('.chk-mark');
      if(activeChk) activeChk.style.display = 'inline';

      dropdown.style.display = 'none';
      showToast('Rol activo: <b>' + (window.CURRENT_ROLE || newRole) + '</b>', 'ok', 'Cambio de Rol');
      if(typeof window.renderLinea === 'function') window.renderLinea();
      if(typeof window.renderTra001List === 'function') window.renderTra001List();
      window.dispatchEvent(new CustomEvent('siit:rolechange', { detail: { role: window.CURRENT_ROLE, fullName: newRole } }));
      return;
    }

    if(dropdown && !e.target.closest('#tb-user-box') && !e.target.closest('#tb-role-dropdown')){
      dropdown.style.display = 'none';
    }
  });
})();
