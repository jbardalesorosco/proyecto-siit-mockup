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

  function syncAllFigmaFields(container) {
    var root = container || document;
    root.querySelectorAll('.figma-field').forEach(function(fField){
      var inp = fField.querySelector('input:not([type="hidden"]), textarea, select');
      if (inp) {
        var val = (inp.value !== undefined && inp.value !== null ? String(inp.value) : '').trim();
        if (val.length > 0) {
          fField.classList.add('has-value');
        } else {
          fField.classList.remove('has-value');
        }
      } else {
        var hInp = fField.querySelector('.figma-select-wrapper input[type="hidden"]');
        if (hInp) {
          var hVal = (hInp.value !== undefined && hInp.value !== null ? String(hInp.value) : '').trim();
          if (hVal.length > 0) {
            fField.classList.add('has-value');
          } else {
            fField.classList.remove('has-value');
          }
        }
      }
    });
  }

  function buildFigmaFieldHtml(opts){
    var isReq = opts.required !== false;
    var reqMark = isReq ? '<span class="field-req">*</span>' : '';
    var maxLen = opts.maxlength || 200;
    var roAttr = opts.readonly ? ' readonly disabled style="background:#F8FAFC;cursor:default;"' : '';
    var inputTag = opts.customHtml
      ? opts.customHtml
      : (opts.isTextarea
        ? '<textarea id="' + opts.id + '" maxlength="' + maxLen + '" placeholder="' + esc(opts.placeholder || '') + '"' + roAttr + '>' + esc(opts.value || '') + '</textarea>'
        : '<input id="' + opts.id + '" value="' + esc(opts.value || '') + '" placeholder="' + esc(opts.placeholder || '') + '"' + roAttr + '>');

    var hasVal = !!((opts.value && String(opts.value).trim().length > 0) || (opts.selectedValue && String(opts.selectedValue).trim().length > 0));
    var counterHtml = opts.isTextarea && !opts.readonly
      ? '<div class="field-counter-row"><span class="field-counter" id="counter-' + opts.id + '">' + ((opts.value || '').length) + '/' + maxLen + '</span></div>'
      : '';

    return '<div class="figma-field' + (opts.isTextarea ? ' is-textarea' : '') + (hasVal ? ' has-value' : '') + (opts.readonly ? ' is-readonly' : '') + '" id="wrap-' + opts.id + '">' +
      '<div class="field-box">' +
        '<div class="field-label-notch">' +
          '<div class="field-label-wrapper" style="display:inline-flex;align-items:center;gap:2px;">' +
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

  var UNIDADES_ORGANICAS_DATA = [
    // Central (16 registros)
    { tipo: 'Central', sigla: 'GG', nombre: 'GERENCIA GENERAL', cod: '001', nivel: 1, dep: '-' },
    { tipo: 'Central', sigla: 'ORH', nombre: 'OFICINA DE RECURSOS HUMANOS', cod: '002', nivel: 2, dep: 'GG' },
    { tipo: 'Central', sigla: 'ODA', nombre: 'OFICINA DE ADMINISTRACIÓN', cod: '003', nivel: 2, dep: 'GG' },
    { tipo: 'Central', sigla: 'OTIC', nombre: 'OFICINA DE TECNOLOGÍAS DE LA INFORMACIÓN Y COMUNICACIONES', cod: '004', nivel: 2, dep: 'GG' },
    { tipo: 'Central', sigla: 'OAJ', nombre: 'OFICINA DE ASESORÍA JURÍDICA', cod: '005', nivel: 2, dep: 'GG' },
    { tipo: 'Central', sigla: 'OGPP', nombre: 'OFICINA DE PLANEAMIENTO Y PRESUPUESTO', cod: '006', nivel: 2, dep: 'GG' },
    { tipo: 'Central', sigla: 'DII', nombre: 'DIRECCIÓN DE INTELIGENCIA INSPECTIVA', cod: '007', nivel: 2, dep: 'GG' },
    { tipo: 'Central', sigla: 'DPE', nombre: 'DIRECCIÓN DE PROMOCIÓN Y EVALUACIÓN', cod: '008', nivel: 2, dep: 'GG' },
    { tipo: 'Central', sigla: 'UACGD', nombre: 'UNIDAD DE ATENCIÓN AL CIUDADANO Y GESTIÓN DOCUMENTAL', cod: '009', nivel: 3, dep: 'ODA' },
    { tipo: 'Central', sigla: 'UACP', nombre: 'UNIDAD DE ABASTECIMIENTO Y CONTROL PATRIMONIAL', cod: '010', nivel: 3, dep: 'ODA' },
    { tipo: 'Central', sigla: 'UAF', nombre: 'UNIDAD DE ASUNTOS FINANCIEROS', cod: '011', nivel: 3, dep: 'ODA' },
    { tipo: 'Central', sigla: 'UCEC', nombre: 'UNIDAD DE COBRANZA Y EJECUCIÓN COACTIVA', cod: '012', nivel: 3, dep: 'ODA' },
    { tipo: 'Central', sigla: 'SDA', nombre: 'SUBDIRECCIÓN DE ANÁLISIS', cod: '013', nivel: 3, dep: 'DII' },
    { tipo: 'Central', sigla: 'SDPO', nombre: 'SUBDIRECCIÓN DE PROGRAMAS Y OPERACIONES', cod: '014', nivel: 3, dep: 'DPE' },
    { tipo: 'Central', sigla: 'SDPPR', nombre: 'SUBDIRECCIÓN DE PROMOCIÓN Y POLÍTICAS REGULATORIAS', cod: '015', nivel: 3, dep: 'DPE' },
    { tipo: 'Central', sigla: 'SDSU', nombre: 'SUBDIRECCIÓN DE SUPERVISIÓN', cod: '016', nivel: 2, dep: 'GG' },
    // Desconcentrado (31 registros)
    { tipo: 'Desconcentrado', sigla: 'ILM', nombre: 'INTENDENCIA DE LIMA METROPOLITANA', cod: '462', nivel: 2, dep: 'GG' },
    { tipo: 'Desconcentrado', sigla: 'SIFI', nombre: 'SUPERINTENDENCIA DE FISCALIZACIÓN', cod: '017', nivel: 3, dep: 'ILM' },
    { tipo: 'Desconcentrado', sigla: 'SITI', nombre: 'SUPERINTENDENCIA DE INTERVENCIÓN', cod: '018', nivel: 3, dep: 'ILM' },
    { tipo: 'Desconcentrado', sigla: 'SISI', nombre: 'SUPERINTENDENCIA DE INSTRUCCIÓN', cod: '019', nivel: 3, dep: 'ILM' },
    { tipo: 'Desconcentrado', sigla: 'SISN', nombre: 'SUPERINTENDENCIA DE SANCIÓN', cod: '020', nivel: 3, dep: 'ILM' },
    { tipo: 'Desconcentrado', sigla: 'IRE_AM', nombre: 'INTENDENCIA REGIONAL - AMAZONAS', cod: '1288', nivel: 2, dep: 'GG' },
    { tipo: 'Desconcentrado', sigla: 'IRE_AC', nombre: 'INTENDENCIA REGIONAL - ANCASH', cod: '494', nivel: 2, dep: 'GG' },
    { tipo: 'Desconcentrado', sigla: 'ZTC_AC', nombre: 'ZONAL DE TRABAJO CHIMBOTE', cod: '495', nivel: 3, dep: 'IRE_AC' },
    { tipo: 'Desconcentrado', sigla: 'IRE_AP', nombre: 'INTENDENCIA REGIONAL - APURÍMAC', cod: '1291', nivel: 2, dep: 'GG' },
    { tipo: 'Desconcentrado', sigla: 'IRE_AR', nombre: 'INTENDENCIA REGIONAL - AREQUIPA', cod: '509', nivel: 2, dep: 'GG' },
    { tipo: 'Desconcentrado', sigla: 'IRE_AY', nombre: 'INTENDENCIA REGIONAL - AYACUCHO', cod: '1150', nivel: 2, dep: 'GG' },
    { tipo: 'Desconcentrado', sigla: 'IRE_CJ', nombre: 'INTENDENCIA REGIONAL - CAJAMARCA', cod: '487', nivel: 2, dep: 'GG' },
    { tipo: 'Desconcentrado', sigla: 'IRE_CA', nombre: 'INTENDENCIA REGIONAL - CALLAO', cod: '1020', nivel: 2, dep: 'GG' },
    { tipo: 'Desconcentrado', sigla: 'IRE_CU', nombre: 'INTENDENCIA REGIONAL - CUSCO', cod: '1005', nivel: 2, dep: 'GG' },
    { tipo: 'Desconcentrado', sigla: 'IRE_HV', nombre: 'INTENDENCIA REGIONAL - HUANCAVELICA', cod: '1285', nivel: 2, dep: 'GG' },
    { tipo: 'Desconcentrado', sigla: 'IRE_HU', nombre: 'INTENDENCIA REGIONAL - HUÁNUCO', cod: '484', nivel: 2, dep: 'GG' },
    { tipo: 'Desconcentrado', sigla: 'IRE_IC', nombre: 'INTENDENCIA REGIONAL - ICA', cod: '491', nivel: 2, dep: 'GG' },
    { tipo: 'Desconcentrado', sigla: 'IRE_JN', nombre: 'INTENDENCIA REGIONAL - JUNÍN', cod: '1268', nivel: 2, dep: 'GG' },
    { tipo: 'Desconcentrado', sigla: 'IRE_LL', nombre: 'INTENDENCIA REGIONAL - LA LIBERTAD', cod: '490', nivel: 2, dep: 'GG' },
    { tipo: 'Desconcentrado', sigla: 'IRE_LB', nombre: 'INTENDENCIA REGIONAL - LAMBAYEQUE', cod: '1022', nivel: 2, dep: 'GG' },
    { tipo: 'Desconcentrado', sigla: 'IRE_LP', nombre: 'INTENDENCIA REGIONAL - LIMA PROVINCIA', cod: '1273', nivel: 2, dep: 'GG' },
    { tipo: 'Desconcentrado', sigla: 'IRE_LO', nombre: 'INTENDENCIA REGIONAL - LORETO', cod: '489', nivel: 2, dep: 'GG' },
    { tipo: 'Desconcentrado', sigla: 'IRE_MD', nombre: 'INTENDENCIA REGIONAL - MADRE DE DIOS', cod: '1281', nivel: 2, dep: 'GG' },
    { tipo: 'Desconcentrado', sigla: 'IRE_MQ', nombre: 'INTENDENCIA REGIONAL - MOQUEGUA', cod: '492', nivel: 2, dep: 'GG' },
    { tipo: 'Desconcentrado', sigla: 'IRE_PS', nombre: 'INTENDENCIA REGIONAL - PASCO', cod: '1278', nivel: 2, dep: 'GG' },
    { tipo: 'Desconcentrado', sigla: 'IRE_PI', nombre: 'INTENDENCIA REGIONAL - PIURA', cod: '1017', nivel: 2, dep: 'GG' },
    { tipo: 'Desconcentrado', sigla: 'IRE_PU', nombre: 'INTENDENCIA REGIONAL - PUNO', cod: '1151', nivel: 2, dep: 'GG' },
    { tipo: 'Desconcentrado', sigla: 'IRE_SM', nombre: 'INTENDENCIA REGIONAL - SAN MARTÍN', cod: '1267', nivel: 2, dep: 'GG' },
    { tipo: 'Desconcentrado', sigla: 'IRE_TC', nombre: 'INTENDENCIA REGIONAL - TACNA', cod: '1297', nivel: 2, dep: 'GG' },
    { tipo: 'Desconcentrado', sigla: 'IRE_TM', nombre: 'INTENDENCIA REGIONAL - TUMBES', cod: '493', nivel: 2, dep: 'GG' },
    { tipo: 'Desconcentrado', sigla: 'IRE_UC', nombre: 'INTENDENCIA REGIONAL - UCAYALI', cod: '1294', nivel: 2, dep: 'GG' }
  ];

  function formatTitleCase(str) {
    if (!str) return '';
    var lowerWords = ['de', 'del', 'la', 'las', 'el', 'los', 'y', 'en', 'al', 'a'];
    return str.toLowerCase().split(' ').map(function(word, idx) {
      if (word === '-') return '-';
      if (word.indexOf('-') > 0) {
        return word.split('-').map(function(w){ return w.charAt(0).toUpperCase() + w.slice(1); }).join('-');
      }
      if (idx > 0 && lowerWords.indexOf(word) !== -1) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  }

  function updateUnidadesOrganicas(tipoEntidad, selectedVal) {
    var menu = document.getElementById('menu-u-unidad-organica');
    var valSpan = document.getElementById('val-u-unidad-organica');
    var hiddenInp = document.getElementById('u-unidad-organica');
    var fField = document.getElementById('wrap-u-unidad-organica');
    if (!menu || !valSpan || !hiddenInp) return;

    if (!tipoEntidad) {
      menu.innerHTML = '';
      hiddenInp.value = '';
      valSpan.textContent = 'Seleccione primero el tipo de entidad';
      valSpan.classList.add('is-placeholder');
      if (fField) fField.classList.remove('has-value');
      return;
    }

    var list = UNIDADES_ORGANICAS_DATA.filter(function(item){
      return item.tipo.toLowerCase() === tipoEntidad.toLowerCase();
    });

    var selectedFound = false;
    var selectedLabel = '';

    var itemsHtml = list.map(function(item){
      var val = formatTitleCase(item.nombre);
      var isSel = false;
      if (selectedVal) {
        var sLow = selectedVal.toLowerCase().trim();
        isSel = (sLow === val.toLowerCase() || sLow === item.nombre.toLowerCase() || (item.sigla && sLow.indexOf(item.sigla.toLowerCase()) >= 0));
      }
      if (isSel) {
        selectedFound = true;
        selectedLabel = val;
      }
      return '<div class="figma-select-item' + (isSel ? ' is-selected' : '') + '" data-val="' + esc(val) + '">' +
        '<span>' + esc(val) + '</span>' +
      '</div>';
    }).join('');

    menu.innerHTML = itemsHtml;

    if (selectedFound && selectedVal) {
      hiddenInp.value = selectedLabel;
      valSpan.textContent = selectedLabel;
      valSpan.classList.remove('is-placeholder');
      if (fField) fField.classList.add('has-value');
    } else {
      hiddenInp.value = '';
      valSpan.textContent = 'Seleccionar...';
      valSpan.classList.add('is-placeholder');
      if (fField) fField.classList.remove('has-value');
    }
  }

  function setCustomSelectValue(id, val, label) {
    var inp = document.getElementById(id);
    if (!inp) return;
    inp.value = val || '';
    var wrap = document.getElementById('selwrap-' + id) || inp.closest('.figma-select-wrapper');
    if (wrap) {
      var valSpan = wrap.querySelector('.figma-select-val');
      if (valSpan) {
        if (val && String(val).trim().length > 0) {
          valSpan.textContent = label || val;
          valSpan.classList.remove('is-placeholder');
        } else {
          valSpan.textContent = label || 'Seleccionar...';
          valSpan.classList.add('is-placeholder');
        }
      }
      var menu = wrap.querySelector('.figma-select-menu');
      if (menu) {
        menu.querySelectorAll('.figma-select-item').forEach(function(it){
          if (val && it.getAttribute('data-val') === val) {
            it.classList.add('is-selected');
          } else {
            it.classList.remove('is-selected');
          }
        });
      }
      var fField = wrap.closest('.figma-field');
      if (fField) {
        if (val && String(val).trim().length > 0) {
          fField.classList.add('has-value');
        } else {
          fField.classList.remove('has-value');
        }
      }
    }
  }

  var NOMBRES_POOL = [
    'Carlos Alberto', 'María Elena', 'Juan Carlos', 'Rosa Angélica', 'Jorge Luis',
    'Ana María', 'Luis Fernando', 'Patricia del Pilar', 'José Antonio', 'Carmen Rosa',
    'Víctor Manuel', 'Silvia Patricia', 'Miguel Ángel', 'Diana Carolina', 'César Augusto'
  ];
  var PATERNO_POOL = [
    'Sánchez', 'Pérez', 'Gonzales', 'Rodríguez', 'Gómez', 'Fernández', 'López',
    'Díaz', 'Martínez', 'Torres', 'Ramírez', 'Flores', 'Castillo', 'Vargas', 'Morales'
  ];
  var MATERNO_POOL = [
    'Vargas', 'Ramos', 'Alva', 'Palma', 'Mendoza', 'Cruz', 'Quispe', 'Herrera',
    'Ríos', 'Castro', 'Guerrero', 'Paredes', 'Medina', 'Vega', 'Campos'
  ];
  var EMPRESAS_POOL = [
    'CONSORCIO LOGÍSTICO INDUSTRIAL S.A.C.',
    'SERVICIOS INTEGRALES DEL PERÚ S.A.',
    'CORPORACIÓN AGROINDUSTRIAL DEL NORTE S.A.C.',
    'DISTRIBUIDORA COMERCIAL LIMA S.A.',
    'INSPECCIONES & CONSULTORÍA LABORAL S.A.C.',
    'CONSTRUCTORA & EDIFICACIONES ANDINAS S.A.',
    'LOGÍSTICA Y TRANSPORTES NACIONALES S.A.C.'
  ];

  function getRandomItem(arr) {
    if (!arr || !arr.length) return '';
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function generateRandomDNI() {
    var num = Math.floor(10000000 + Math.random() * 90000000);
    return String(num);
  }

  function generateRandomRUC() {
    var prefix = Math.random() > 0.5 ? '20' : '10';
    var num = Math.floor(100000000 + Math.random() * 900000000);
    return prefix + String(num);
  }

  function applyTipoDocRules(tipoDoc) {
    var tdoc = (tipoDoc || '').trim().toUpperCase();
    var wrapNombres = document.getElementById('wrap-u-nombres');
    var wrapPaterno = document.getElementById('wrap-u-paterno');
    var wrapMaterno = document.getElementById('wrap-u-materno');
    var wrapRazonSocial = document.getElementById('wrap-u-razon-social');
    var btnConsultar = document.getElementById('btn-consultar-identidad');
    var inpNombres = document.getElementById('u-nombres');
    var inpPaterno = document.getElementById('u-paterno');
    var inpMaterno = document.getElementById('u-materno');
    var inpRazonSocial = document.getElementById('u-razon-social');
    var inpNdoc = document.getElementById('u-ndoc');

    if (tdoc === 'RUC') {
      if (wrapNombres) wrapNombres.style.display = 'none';
      if (wrapPaterno) wrapPaterno.style.display = 'none';
      if (wrapMaterno) wrapMaterno.style.display = 'none';
      if (wrapRazonSocial) wrapRazonSocial.style.display = 'block';

      if (btnConsultar) {
        btnConsultar.disabled = false;
        btnConsultar.style.opacity = '1';
        btnConsultar.style.cursor = 'pointer';
        btnConsultar.style.pointerEvents = 'auto';
        btnConsultar.title = 'Consultar datos de la empresa en SUNAT';
        var spanTextR = btnConsultar.querySelector('span');
        if (spanTextR) spanTextR.textContent = 'Consultar SUNAT';
      }

      if (inpNdoc) inpNdoc.placeholder = 'Número de RUC (11 dígitos)';
    } else if (tdoc === 'CE') {
      if (wrapRazonSocial) wrapRazonSocial.style.display = 'none';
      if (wrapNombres) {
        wrapNombres.style.display = 'block';
        wrapNombres.classList.remove('is-readonly');
        var boxN = wrapNombres.querySelector('.field-box');
        if (boxN) boxN.style.background = 'white';
      }
      if (wrapPaterno) {
        wrapPaterno.style.display = 'block';
        wrapPaterno.classList.remove('is-readonly');
        var boxP = wrapPaterno.querySelector('.field-box');
        if (boxP) boxP.style.background = 'white';
      }
      if (wrapMaterno) {
        wrapMaterno.style.display = 'block';
        wrapMaterno.classList.remove('is-readonly');
        var boxM = wrapMaterno.querySelector('.field-box');
        if (boxM) boxM.style.background = 'white';
      }

      if (inpNombres) {
        inpNombres.readOnly = false;
        inpNombres.disabled = false;
        inpNombres.placeholder = 'Nombres completos';
        inpNombres.style.cursor = 'text';
      }
      if (inpPaterno) {
        inpPaterno.readOnly = false;
        inpPaterno.disabled = false;
        inpPaterno.placeholder = 'Apellido paterno';
        inpPaterno.style.cursor = 'text';
      }
      if (inpMaterno) {
        inpMaterno.readOnly = false;
        inpMaterno.disabled = false;
        inpMaterno.placeholder = 'Apellido materno';
        inpMaterno.style.cursor = 'text';
      }

      if (btnConsultar) {
        btnConsultar.disabled = true;
        btnConsultar.style.opacity = '0.4';
        btnConsultar.style.cursor = 'not-allowed';
        btnConsultar.style.pointerEvents = 'none';
        btnConsultar.title = 'Consulta en línea no disponible para Carné de Extranjería';
        var spanTextCE = btnConsultar.querySelector('span');
        if (spanTextCE) spanTextCE.textContent = 'Consultar identidad';
      }

      if (inpNdoc) inpNdoc.placeholder = 'Número de carné de extranjería';
    } else {
      // Default / DNI
      if (wrapRazonSocial) wrapRazonSocial.style.display = 'none';
      if (wrapNombres) {
        wrapNombres.style.display = 'block';
        wrapNombres.classList.add('is-readonly');
        var boxNd = wrapNombres.querySelector('.field-box');
        if (boxNd) boxNd.style.background = '#F8FAFC';
      }
      if (wrapPaterno) {
        wrapPaterno.style.display = 'block';
        wrapPaterno.classList.add('is-readonly');
        var boxPd = wrapPaterno.querySelector('.field-box');
        if (boxPd) boxPd.style.background = '#F8FAFC';
      }
      if (wrapMaterno) {
        wrapMaterno.style.display = 'block';
        wrapMaterno.classList.add('is-readonly');
        var boxMd = wrapMaterno.querySelector('.field-box');
        if (boxMd) boxMd.style.background = '#F8FAFC';
      }

      if (inpNombres) {
        inpNombres.readOnly = true;
        inpNombres.disabled = true;
        inpNombres.placeholder = 'Se obtiene del Directorio Activo / RENIEC';
        inpNombres.style.cursor = 'default';
      }
      if (inpPaterno) {
        inpPaterno.readOnly = true;
        inpPaterno.disabled = true;
        inpPaterno.placeholder = 'Apellido paterno';
        inpPaterno.style.cursor = 'default';
      }
      if (inpMaterno) {
        inpMaterno.readOnly = true;
        inpMaterno.disabled = true;
        inpMaterno.placeholder = 'Apellido materno';
        inpMaterno.style.cursor = 'default';
      }

      if (btnConsultar) {
        btnConsultar.disabled = false;
        btnConsultar.style.opacity = '1';
        btnConsultar.style.cursor = 'pointer';
        btnConsultar.style.pointerEvents = 'auto';
        btnConsultar.title = 'Consultar identidad en RENIEC / AD';
        var spanTextDNI = btnConsultar.querySelector('span');
        if (spanTextDNI) spanTextDNI.textContent = 'Consultar identidad';
      }

      if (inpNdoc) inpNdoc.placeholder = 'Número de documento (DNI)';
    }
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
    {
      doc: '01234567',
      tipoDoc: 'DNI',
      name: 'Juan Pérez Ramos',
      username: 'jperez',
      mail: 'juan.perez@sunafil.gob.pe',
      cargo: 'Coordinador de Fiscalización',
      unidad: 'Intendencia de Lima Metropolitana',
      sede: 'Oficina Zonal San Juan de Miraflores',
      anexo: '2104',
      estado: 'Activo'
    },
    {
      doc: '08765432',
      tipoDoc: 'DNI',
      name: 'Maria Rosa Alva',
      username: 'malva',
      mail: 'maria.alva@sunafil.gob.pe',
      cargo: 'Inspector Auxiliar',
      unidad: 'Intendencia de Lima Metropolitana',
      sede: 'Oficina Zonal Villa El Salvador',
      anexo: '2108',
      estado: 'Baja temporal'
    },
    {
      doc: '45678901',
      tipoDoc: 'DNI',
      name: 'Rebecca Ramírez Palma',
      username: 'rramirez',
      mail: 'rebecca.ramirez@sunafil.gob.pe',
      cargo: 'Coordinador Nacional',
      unidad: 'Dirección de Inteligencia Inspectiva',
      sede: 'Sede Central SUNAFIL',
      anexo: '1002',
      estado: 'Inactivo'
    },
    {
      doc: '70293814',
      tipoDoc: 'DNI',
      name: 'Carlos Alberto Sánchez Vargas',
      username: 'csanchez',
      mail: 'carlos.sanchez@sunafil.gob.pe',
      cargo: 'Supervisor Inspector',
      unidad: 'Intendencia Regional Arequipa',
      sede: 'IRE Arequipa',
      anexo: '4012',
      estado: 'Activo'
    }
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

  var userFilterEstado = 'Todos';
  var userSearchQuery = '';
  var currentEditingUserIdx = null;

  function esc(x){ return (x == null ? '' : String(x)).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }

  function getActionBtns(type, idx, status) {
    var isUser = type === 'user';
    var isSucursal = type === 'sucursal';
    var isRol = type === 'rol';
    var isPerfil = type === 'perfil';
    var isOpcion = type === 'opcion';

    var editAttr = isUser ? 'data-uidx="' + idx + '"' : 'data-idx="' + idx + '"';
    var editClass = isUser ? 'btn-edit-user' : isSucursal ? 'btn-edit-sucursal' : isRol ? 'btn-edit-rol' : isPerfil ? 'btn-edit-perfil' : 'btn-edit-opcion';

    if (isUser) {
      var acts = '<div class="acts" style="display:inline-flex;align-items:center;gap:10px;justify-content:flex-end;">' +
        '<a class="' + editClass + '" title="Editar usuario" ' + editAttr + ' style="color:#06396E;cursor:pointer;display:inline-flex;align-items:center;">' + PENCIL + '</a>';

      if (status === 'Baja temporal') {
        acts += '<a class="btn-restore-temp" title="Reactivar desde Baja Temporal" ' + editAttr + ' style="color:#0284C7;cursor:pointer;display:inline-flex;align-items:center;">' +
          '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' +
        '</a>';
      } else if (status === 'Activo') {
        acts += '<a class="btn-suspend-user" title="Dar de Baja Temporal (Suspensión reversible)" ' + editAttr + ' style="color:#D97706;cursor:pointer;display:inline-flex;align-items:center;">' +
          '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2"><circle cx="12" cy="12" r="10"/><line x1="10" y1="15" x2="10" y2="9"/><line x1="14" y1="15" x2="14" y2="9"/></svg>' +
        '</a>';
      }

      if (status === 'Inactivo') {
        acts += '<a class="btn-toggle-user" title="Activar usuario" ' + editAttr + ' style="color:#16A34A;cursor:pointer;display:inline-flex;align-items:center;">' + CHECK + '</a>';
      } else {
        acts += '<a class="btn-toggle-user" title="Inactivar usuario (Baja definitiva lógica)" ' + editAttr + ' style="color:#D51317;cursor:pointer;display:inline-flex;align-items:center;">' + BAN + '</a>';
      }

      acts += '</div>';

      var badgeClass = status === 'Activo' ? 'b-ok' : (status === 'Baja temporal' ? 'b-warn' : 'b-off');
      var badge = '<span class="badge ' + badgeClass + '">' + esc(status) + '</span>';
      return { actions: acts, badge: badge };
    }

    var toggleClass = isSucursal ? 'btn-toggle-sucursal' : isRol ? 'btn-toggle-rol' : isPerfil ? 'btn-toggle-perfil' : 'btn-toggle-opcion';
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

  function getUserToolbar() {
    var hasActiveFilter = userFilterEstado !== 'Todos';
    var filterBadgeHtml = hasActiveFilter
      ? '<span style="background:#EFF6FF;color:#06396E;border:1px solid #BFDBFE;padding:4px 10px;border-radius:6px;font-size:12px;font-weight:600;display:inline-flex;align-items:center;gap:6px;">' +
          '<span>Estado: ' + esc(userFilterEstado) + '</span>' +
          '<button type="button" id="btn-clear-user-filter-tag" style="border:none;background:none;cursor:pointer;color:#06396E;padding:0;font-weight:700;display:flex;align-items:center;" title="Quitar filtro">✕</button>' +
        '</span>'
      : '';

    return '<div class="tools" style="margin-bottom:20px;">' +
      '<div class="search">' +
        '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>' +
        '<input id="user-search-input" value="' + esc(userSearchQuery) + '" placeholder="Buscar por documento, nombre, usuario o correo...">' +
      '</div>' +
      '<div class="tbl-actions" style="display:flex;align-items:center;gap:12px;">' +
        filterBadgeHtml +
        '<button class="btn-tbl-action" id="btn-filtros-usuarios" type="button" style="' + (hasActiveFilter ? 'background:rgba(6,57,110,0.08);color:#06396E;font-weight:700;' : '') + '">' +
          '<svg viewBox="0 0 24 24" style="' + (hasActiveFilter ? 'stroke:#06396E;' : '') + '"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></svg>' +
          '<span>Filtros' + (hasActiveFilter ? ' (1)' : '') + '</span>' +
        '</button>' +
        '<button class="btn-tbl-action" type="button"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18"/></svg><span>Columnas</span></button>' +
      '</div>' +
    '</div>';
  }

  function renderUsuarios() {
    var mount = document.getElementById('usuarios-list-mount');
    if(!mount) return;

    var filtered = usuariosList.filter(function(u){
      if (userFilterEstado !== 'Todos' && u.estado !== userFilterEstado) return false;
      if (userSearchQuery && userSearchQuery.trim().length > 0) {
        var q = userSearchQuery.toLowerCase().trim();
        var matchDoc = (u.doc || '').toLowerCase().indexOf(q) >= 0;
        var matchName = (u.name || '').toLowerCase().indexOf(q) >= 0;
        var matchUser = (u.username || '').toLowerCase().indexOf(q) >= 0;
        var matchMail = (u.mail || '').toLowerCase().indexOf(q) >= 0;
        var matchCargo = (u.cargo || u.perfil || '').toLowerCase().indexOf(q) >= 0;
        var matchSede = (u.sede || '').toLowerCase().indexOf(q) >= 0;
        var matchUni = (u.unidad || '').toLowerCase().indexOf(q) >= 0;
        if (!matchDoc && !matchName && !matchUser && !matchMail && !matchCargo && !matchSede && !matchUni) return false;
      }
      return true;
    });

    var rowsHtml = '';
    if (filtered.length === 0) {
      rowsHtml = '<tr><td colspan="8" style="text-align:center;padding:32px;color:#64748B;">No se encontraron usuarios con los criterios de búsqueda o filtro aplicados.</td></tr>';
    } else {
      rowsHtml = filtered.map(function(u){
        var origIdx = usuariosList.indexOf(u);
        var btns = getActionBtns('user', origIdx, u.estado);
        var usernameDisp = u.username || (u.mail ? u.mail.split('@')[0] : 'usuario');
        return '<tr>' +
          '<td><input class="chk" type="checkbox"></td>' +
          '<td>' +
            '<div style="display:flex;flex-direction:column;gap:2px;">' +
              '<a class="btn-edit-user" data-uidx="' + origIdx + '" style="font-weight:600;color:#06396E;font-size:13.5px;cursor:pointer;text-decoration:none;">' + esc(u.name) + '</a>' +
              '<span style="color:#64748B;font-size:11.5px;font-family:Inter,sans-serif;">@' + esc(usernameDisp) + '</span>' +
            '</div>' +
          '</td>' +
          '<td>' +
            '<span style="color:#252220;font-size:13px;font-weight:500;font-variant-numeric:tabular-nums;">' + esc((u.tipoDoc || 'DNI') + ' ' + u.doc) + '</span>' +
          '</td>' +
          '<td>' +
            '<span style="color:#252220;font-size:13px;">' + esc(u.mail) + '</span>' +
          '</td>' +
          '<td>' +
            '<div style="display:flex;flex-direction:column;gap:2px;">' +
              '<span style="color:#252220;font-size:13px;font-weight:600;">' + esc(u.sede) + '</span>' +
              '<span style="color:#64748B;font-size:11.5px;">' + esc(u.unidad || 'Intendencia de Lima Metropolitana') + '</span>' +
            '</div>' +
          '</td>' +
          '<td>' +
            '<span style="color:#252220;font-size:13px;">' + esc(u.cargo || u.perfil || 'Coordinador de Fiscalización') + '</span>' +
          '</td>' +
          '<td>' + btns.badge + '</td>' +
          '<td style="text-align:right">' + btns.actions + '</td>' +
        '</tr>';
      }).join('');
    }

    mount.innerHTML =
      '<div class="card" style="padding:20px 20px 16px;">' +
        getUserToolbar() +
        '<div class="tw" style="border:1px solid rgba(32,32,32,0.12);border-radius:4px;overflow-x:auto;margin-bottom:16px;">' +
          '<table style="width:100%;min-width:1100px;border-collapse:collapse;">' +
            '<thead><tr>' +
              '<th style="width:36px;"><input class="chk" type="checkbox"></th>' +
              makeTh('Usuario / Identificador') +
              makeTh('Documento') +
              makeTh('Correo institucional') +
              makeTh('Sede y Unidad orgánica') +
              makeTh('Cargo') +
              makeTh('Estado') +
              '<th style="text-align:right">ACCIONES</th>' +
            '</tr></thead>' +
            '<tbody>' + rowsHtml + '</tbody>' +
          '</table>' +
        '</div>' +
        getPagination('Mostrando 1–' + filtered.length + ' de ' + usuariosList.length + ' usuarios', 1) +
      '</div>';

    bindUserEvents(mount);
  }

  function openUserFilterDrawer() {
    var ov = document.getElementById('t001-drawer');
    var panel = document.getElementById('t001-drawer-panel');
    var titleEl = document.getElementById('t001-drawer-title');
    var subEl = document.getElementById('t001-drawer-sub');
    var bodyEl = document.getElementById('t001-drawer-body');
    var saveText = document.getElementById('t001-drawer-savetext');

    if(!ov || !panel) return;
    panel.style.width = '420px';

    if(titleEl) titleEl.textContent = 'Filtro avanzado';
    if(subEl) subEl.textContent = 'Criterios de filtrado para el catálogo de usuarios';
    if(saveText) saveText.textContent = 'Aplicar';

    var bodyHtml =
      '<div style="display:flex;flex-direction:column;gap:18px;">' +
        '<div class="f" style="margin:0;">' +
          '<label>Estado del usuario <span class="req">*</span></label>' +
          '<select id="drw-filter-estado" style="height:40px;font-size:14px;background:#fff;border-radius:8px;border:1px solid rgba(32,32,32,0.56);padding:0 12px;width:100%;">' +
            '<option value="Todos"' + (userFilterEstado === 'Todos' ? ' selected' : '') + '>Todos los estados</option>' +
            '<option value="Activo"' + (userFilterEstado === 'Activo' ? ' selected' : '') + '>Activo</option>' +
            '<option value="Baja temporal"' + (userFilterEstado === 'Baja temporal' ? ' selected' : '') + '>Baja temporal</option>' +
            '<option value="Inactivo"' + (userFilterEstado === 'Inactivo' ? ' selected' : '') + '>Inactivo</option>' +
          '</select>' +
          '<div class="hint" style="font-size:12px;color:#64748B;margin-top:6px;">Filtre por la condición de acceso del usuario al SIIT conforme a RN-AU-014.</div>' +
        '</div>' +
        '<div style="border-top:1px dashed #CBD5E1;padding-top:14px;display:flex;justify-content:space-between;align-items:center;">' +
          '<button type="button" id="btn-drw-reset-filters" style="background:none;border:none;color:#D51317;font-size:13px;font-weight:600;cursor:pointer;padding:4px 0;display:inline-flex;align-items:center;gap:6px;">' +
            '<svg viewBox="0 0 24 24" style="width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:2"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg>' +
            '<span>Restablecer filtros</span>' +
          '</button>' +
        '</div>' +
      '</div>';

    if(bodyEl) bodyEl.innerHTML = bodyHtml;

    ov._onSave = function(){
      var sel = document.getElementById('drw-filter-estado');
      userFilterEstado = sel ? sel.value : 'Todos';
      renderUsuarios();
      closeUserFilterDrawer();
      if(userFilterEstado !== 'Todos'){
        showToast('Filtro aplicado: Estado <b>' + esc(userFilterEstado) + '</b>.', 'ok', 'Filtro avanzado');
      } else {
        showToast('Mostrando todos los usuarios registrados.', 'info', 'Filtro restablecido');
      }
    };

    ov.style.display = 'flex';
    requestAnimationFrame(function(){
      panel.style.transform = 'translateX(0)';
    });
  }

  function closeUserFilterDrawer(){
    var ov = document.getElementById('t001-drawer');
    var panel = document.getElementById('t001-drawer-panel');
    if(!ov) return;
    if(panel) panel.style.transform = 'translateX(100%)';
    setTimeout(function(){
      ov.style.display = 'none';
      ov._onSave = null;
    }, 250);
  }

  function openAsignacionDrawer(editRow) {
    var ov = document.getElementById('t001-drawer');
    var panel = document.getElementById('t001-drawer-panel');
    var titleEl = document.getElementById('t001-drawer-title');
    var subEl = document.getElementById('t001-drawer-sub');
    var bodyEl = document.getElementById('t001-drawer-body');
    var saveText = document.getElementById('t001-drawer-savetext');

    if(!ov || !panel) return;
    panel.style.width = '520px';

    var isEdit = !!editRow;
    if(titleEl) titleEl.textContent = isEdit ? 'Editar asignación de rol y perfil' : 'Agregar asignación de rol y perfil';
    if(subEl) subEl.textContent = 'Configure los permisos funcionales, proceso y sede asignada al usuario';
    if(saveText) saveText.textContent = isEdit ? 'Guardar cambios' : 'Guardar asignación';

    var prevCells = editRow ? editRow.querySelectorAll('td') : null;
    var initProc = (prevCells && prevCells[1]) ? prevCells[1].textContent.trim() : 'PO2 — Fiscalización Laboral';
    var initRol = (prevCells && prevCells[2]) ? prevCells[2].textContent.trim() : 'Aprobador';
    var initPerf = (prevCells && prevCells[3]) ? prevCells[3].textContent.trim() : 'Coordinador de Fiscalización';
    var initAlcance = (prevCells && prevCells[4]) ? prevCells[4].textContent.trim() : 'Por sucursal';
    var initSede = (prevCells && prevCells[5]) ? prevCells[5].textContent.trim() : 'Oficina Zonal San Juan de Miraflores';
    var initJust = (prevCells && prevCells[7]) ? prevCells[7].textContent.trim() : 'Asignación de funciones para coordinación de inspecciones zonales.';

    var modHtml = buildCustomSelectHtml({
      id: 'drw-asig-mod',
      label: 'Módulo del SIIT',
      required: true,
      options: ['Fiscalización (PO2)', 'Atención al ciudadano (PS1)', 'Componentes transversales (TRA)'],
      selectedValue: 'Fiscalización (PO2)'
    });

    var procHtml = buildCustomSelectHtml({
      id: 'drw-asig-proc',
      label: 'Proceso / Procedimiento',
      required: true,
      options: ['PO2 — Fiscalización Laboral', 'PS1 — Atención al Ciudadano', 'TRA001 — Tablas Maestras'],
      selectedValue: initProc.indexOf('PO2') >= 0 ? 'PO2 — Fiscalización Laboral' : (initProc.indexOf('PS1') >= 0 ? 'PS1 — Atención al Ciudadano' : 'TRA001 — Tablas Maestras')
    });

    var rolHtml = buildCustomSelectHtml({
      id: 'drw-asig-rol',
      label: 'Rol del sistema',
      required: true,
      options: ['Aprobador', 'Consultas y Reportes', 'Registrador', 'Evaluador'],
      selectedValue: initRol || 'Aprobador'
    });

    var perfHtml = buildCustomSelectHtml({
      id: 'drw-asig-perfil',
      label: 'Perfil funcional',
      required: true,
      options: ['Coordinador de Fiscalización', 'Inspector Auxiliar — Fiscalización', 'Supervisor Inspector', 'Consulta de maestras'],
      selectedValue: initPerf || 'Coordinador de Fiscalización'
    });

    var sedeHtml = buildCustomSelectHtml({
      id: 'drw-asig-sede',
      label: 'Sede / Ámbito de asignación',
      required: true,
      options: ['Oficina Zonal San Juan de Miraflores', 'Oficina Zonal Villa El Salvador', 'Intendencia Regional Lima Metropolitana', 'Sede Central SUNAFIL', 'No aplica sucursal (Nacional)'],
      selectedValue: initSede || 'Oficina Zonal San Juan de Miraflores'
    });

    var alcanceHtml = buildFigmaFieldHtml({
      id: 'drw-asig-alcance',
      label: 'Alcance territorial (heredado)',
      value: initAlcance || 'Por sucursal',
      readonly: true,
      required: false
    });

    var fIniHtml = buildFigmaFieldHtml({
      id: 'drw-asig-f-inicio',
      label: 'Fecha de inicio',
      value: '2026-08-01',
      required: true,
      customHtml: '<input type="date" id="drw-asig-f-inicio" value="2026-08-01" style="flex:1 1 0;width:100%;border:0;background:transparent;outline:none;font-size:14px;font-family:Inter,sans-serif;color:#353537;padding:10px 0;line-height:20px;" />'
    });

    var fFinHtml = buildFigmaFieldHtml({
      id: 'drw-asig-f-fin',
      label: 'Fecha de fin',
      value: '2026-12-31',
      required: true,
      customHtml: '<input type="date" id="drw-asig-f-fin" value="2026-12-31" style="flex:1 1 0;width:100%;border:0;background:transparent;outline:none;font-size:14px;font-family:Inter,sans-serif;color:#353537;padding:10px 0;line-height:20px;" />'
    });

    var justHtml = buildFigmaFieldHtml({
      id: 'drw-asig-justificacion',
      label: 'Justificación del otorgamiento',
      value: initJust || 'Asignación de funciones para coordinación de inspecciones zonales.',
      placeholder: 'Describa la razón o sustento normativo de este acceso (mínimo 1 oración)...',
      required: true,
      isTextarea: true,
      helperText: 'Sustento obligatorio registrado para auditoría interna.'
    });

    var bodyHtml =
      '<div style="display:flex;flex-direction:column;gap:18px;">' +
        modHtml +
        procHtml +
        rolHtml +
        perfHtml +
        alcanceHtml +
        sedeHtml +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">' +
          fIniHtml +
          fFinHtml +
        '</div>' +
        justHtml +
      '</div>';

    if(bodyEl) {
      bodyEl.innerHTML = bodyHtml;
      syncAllFigmaFields(bodyEl);
    }

    ov._onSave = function(){
      var proc = document.getElementById('drw-asig-proc') ? document.getElementById('drw-asig-proc').value : 'PO2 — Fiscalización Laboral';
      var rol = document.getElementById('drw-asig-rol') ? document.getElementById('drw-asig-rol').value : 'Aprobador';
      var perfil = document.getElementById('drw-asig-perfil') ? document.getElementById('drw-asig-perfil').value : 'Coordinador de Fiscalización';
      var alcance = document.getElementById('drw-asig-alcance') ? document.getElementById('drw-asig-alcance').value : 'Por sucursal';
      var sede = document.getElementById('drw-asig-sede') ? document.getElementById('drw-asig-sede').value : 'Oficina Zonal San Juan de Miraflores';
      var fIni = document.getElementById('drw-asig-f-inicio') ? document.getElementById('drw-asig-f-inicio').value : '2026-08-01';
      var fFin = document.getElementById('drw-asig-f-fin') ? document.getElementById('drw-asig-f-fin').value : '2026-12-31';
      var just = document.getElementById('drw-asig-justificacion') ? document.getElementById('drw-asig-justificacion').value.trim() : 'Asignación jefatural registrada';

      var vigenciaStr = (fIni ? fIni.split('-').reverse().join('/') : '01/08/2026') + ' — ' + (fFin ? fFin.split('-').reverse().join('/') : '31/12/2026');

      var tbody = document.getElementById('tbody-asignaciones-usuario');
      if (tbody) {
        if (isEdit && editRow) {
          var cells = editRow.querySelectorAll('td');
          if (cells.length >= 8) {
            cells[1].textContent = proc;
            cells[2].innerHTML = '<span class="badge b-info">' + esc(rol) + '</span>';
            cells[3].textContent = perfil;
            cells[4].innerHTML = '<span class="badge b-ok">' + esc(alcance) + '</span>';
            cells[5].textContent = sede;
            cells[6].textContent = vigenciaStr;
            cells[7].textContent = just;
          }
          showToast('Asignación actualizada correctamente.', 'ok', 'Asignación modificada');
        } else {
          var rowCount = tbody.querySelectorAll('tr').length;
          var newRow = document.createElement('tr');
          newRow.innerHTML =
            '<td class="num">' + (rowCount + 1) + '</td>' +
            '<td>' + esc(proc) + '</td>' +
            '<td><span class="badge b-info">' + esc(rol) + '</span></td>' +
            '<td>' + esc(perfil) + '</td>' +
            '<td><span class="badge b-ok">' + esc(alcance) + '</span></td>' +
            '<td>' + esc(sede) + '</td>' +
            '<td class="num">' + esc(vigenciaStr) + '</td>' +
            '<td>' + esc(just) + '</td>' +
            '<td style="text-align:right">' +
              '<div class="acts">' +
                '<a class="btn-edit-asig" title="Editar" style="color:#504C4A;cursor:pointer;"><svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg></a>' +
                '<a class="btn-del-asig dn" title="Quitar" style="color:#504C4A;cursor:pointer;"><svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:#D51317;fill:none;stroke-width:2"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg></a>' +
              '</div>' +
            '</td>';
          tbody.appendChild(newRow);
          showToast('Asignación agregada correctamente.', 'ok', 'Asignación agregada');
        }
        updateUserAsigCount();
      }

      closeUserFilterDrawer();
    };

    ov.style.display = 'flex';
    requestAnimationFrame(function(){
      panel.style.transform = 'translateX(0)';
    });
  }

  function bindUserEvents(mount){
    var sInput = mount.querySelector('#user-search-input');
    if(sInput){
      sInput.addEventListener('input', function(e){
        userSearchQuery = e.target.value;
        renderUsuarios();
        var el = document.getElementById('user-search-input');
        if(el){ el.focus(); el.setSelectionRange(el.value.length, el.value.length); }
      });
    }

    var clearTagBtn = mount.querySelector('#btn-clear-user-filter-tag');
    if(clearTagBtn){
      clearTagBtn.addEventListener('click', function(e){
        e.stopPropagation();
        userFilterEstado = 'Todos';
        renderUsuarios();
        showToast('Filtro de estado restablecido.', 'info', 'Filtro restablecido');
      });
    }

    var filtroBtn = mount.querySelector('#btn-filtros-usuarios');
    if(filtroBtn){
      filtroBtn.addEventListener('click', function(e){
        e.preventDefault();
        openUserFilterDrawer();
      });
    }
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

  var currentEditingUserIdx = null;
  var currentUserTab = 1;

  function updateUserHeaderCards(u) {
    var hdEntidad = document.getElementById('u-hd-entidad');
    var hdSede = document.getElementById('u-hd-sede');
    var hdUsuario = document.getElementById('u-hd-usuario');
    var hdEstado = document.getElementById('u-hd-estado');

    if (!hdEntidad || !hdSede || !hdUsuario || !hdEstado) return;

    if (!u) {
      hdEntidad.textContent = 'SUNAFIL';
      hdSede.textContent = 'PENDIENTE DE SELECCIÓN';
      hdUsuario.textContent = '@usuario - Documento';
      hdEstado.innerHTML = '<span class="badge b-off" style="display:inline-flex;width:fit-content;max-width:fit-content;min-width:0;padding:4px 8px;border-radius:4px;font-size:12px;font-family:Inter,sans-serif;font-weight:500;line-height:16px;height:24px;box-sizing:border-box;white-space:nowrap;justify-content:center;align-items:center;">Por asignar</span>';
      return;
    }

    hdEntidad.textContent = (u.entidad || 'SUNAFIL').toUpperCase();
    var depStr = (u.sede || u.unidad || 'Pendiente de selección').toUpperCase();
    hdSede.textContent = depStr;

    var uName = (u.username && u.username.trim()) ? ('@' + u.username.trim().replace(/^@/, '')) : '@usuario';
    var uDoc = (u.doc && u.doc.trim()) ? u.doc.trim() : (u.tipoDoc || 'Documento');
    hdUsuario.textContent = uName + ' - ' + uDoc;

    if (u.estado) {
      var badgeClass = u.estado === 'Activo' ? 'b-ok' : (u.estado === 'Baja temporal' ? 'b-warn' : 'b-off');
      hdEstado.innerHTML = '<span class="badge ' + badgeClass + '" style="display:inline-flex;width:fit-content;max-width:fit-content;min-width:0;padding:4px 8px;border-radius:4px;font-size:12px;font-family:Inter,sans-serif;font-weight:500;line-height:16px;height:24px;box-sizing:border-box;white-space:nowrap;justify-content:center;align-items:center;">' + esc(u.estado) + '</span>';
    } else {
      hdEstado.innerHTML = '<span class="badge b-off" style="display:inline-flex;width:fit-content;max-width:fit-content;min-width:0;padding:4px 8px;border-radius:4px;font-size:12px;font-family:Inter,sans-serif;font-weight:500;line-height:16px;height:24px;box-sizing:border-box;white-space:nowrap;justify-content:center;align-items:center;">Por asignar</span>';
    }
  }

  function switchUserTab(tabNum) {
    currentUserTab = tabNum;
    var btn1 = document.getElementById('tab-u-btn-1');
    var btn2 = document.getElementById('tab-u-btn-2');
    var content1 = document.getElementById('tab-u-content-1');
    var content2 = document.getElementById('tab-u-content-2');

    if (!btn1 || !btn2 || !content1 || !content2) return;

    if (tabNum === 1) {
      btn1.classList.add('active');
      btn1.style.borderBottom = '2px var(--sys-color-bg-brand-primary, #06396E) solid';
      var txt1 = btn1.querySelector('div');
      if (txt1) { txt1.style.color = 'var(--sys-color-bg-brand-primary, #06396E)'; txt1.style.fontWeight = '600'; }

      btn2.classList.remove('active');
      btn2.style.borderBottom = '2px transparent solid';
      var txt2 = btn2.querySelector('div');
      if (txt2) { txt2.style.color = 'var(--sys-color-text-neutral-medium, #504C4A)'; txt2.style.fontWeight = '400'; }

      content1.style.display = 'block';
      content2.style.display = 'none';
    } else {
      btn2.classList.add('active');
      btn2.style.borderBottom = '2px var(--sys-color-bg-brand-primary, #06396E) solid';
      var txt2b = btn2.querySelector('div');
      if (txt2b) { txt2b.style.color = 'var(--sys-color-bg-brand-primary, #06396E)'; txt2b.style.fontWeight = '600'; }

      btn1.classList.remove('active');
      btn1.style.borderBottom = '2px transparent solid';
      var txt1b = btn1.querySelector('div');
      if (txt1b) { txt1b.style.color = 'var(--sys-color-text-neutral-medium, #504C4A)'; txt1b.style.fontWeight = '400'; }

      content1.style.display = 'none';
      content2.style.display = 'block';
    }
  }

  function updateUserAsigCount() {
    var tbody = document.getElementById('tbody-asignaciones-usuario');
    var badge = document.getElementById('tab-u-badge-asig');
    if (!tbody || !badge) return;
    var rows = tbody.querySelectorAll('tr');
    var count = rows.length;
    badge.textContent = count;
    badge.style.background = count > 0 ? 'rgba(6,57,110,0.1)' : '#F1F5F9';
    badge.style.color = count > 0 ? '#06396E' : '#64748B';
  }

  function resetUsuariosForm() {
    currentEditingUserIdx = null;
    ['u-username', 'u-ndoc', 'u-razon-social', 'u-nombres', 'u-paterno', 'u-materno', 'u-mail', 'u-telf', 'u-anexo'].forEach(function(id){
      var el = document.getElementById(id);
      if(el) el.value = '';
    });
    setCustomSelectValue('u-tipo-entidad', '', 'Seleccionar...');
    setCustomSelectValue('u-sede', '', 'Seleccionar...');
    updateUnidadesOrganicas('', '');
    setCustomSelectValue('u-tipo-usuario', '', 'Seleccionar...');
    setCustomSelectValue('u-tdoc', '', 'Seleccionar...');
    setCustomSelectValue('u-cargo', '', 'Seleccionar...');
    setCustomSelectValue('u-estado', '', 'Seleccionar...');

    applyTipoDocRules('');

    var tbody = document.getElementById('tbody-asignaciones-usuario');
    if(tbody) tbody.innerHTML = '';
    updateUserHeaderCards(null);
    updateUserAsigCount();
    switchUserTab(1);
    syncAllFigmaFields(document.getElementById('usuarios-form'));
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

  function loadUserForEdit(u, idx) {
    if(!u) return;
    currentEditingUserIdx = (idx !== undefined && idx !== null) ? idx : null;
    var parts = (u.name || '').split(' ');
    var uUsername = document.getElementById('u-username'); if(uUsername) uUsername.value = u.username || (u.mail ? u.mail.split('@')[0] : 'usuario');
    var uNdoc = document.getElementById('u-ndoc'); if(uNdoc) uNdoc.value = u.doc || '01234567';
    var uRazonSocial = document.getElementById('u-razon-social'); if(uRazonSocial) uRazonSocial.value = u.razonSocial || (u.tipoDoc === 'RUC' ? (u.name || '') : '');
    var uNombres = document.getElementById('u-nombres'); if(uNombres) uNombres.value = (u.tipoDoc !== 'RUC' ? (parts[0] || '') : '');
    var uPaterno = document.getElementById('u-paterno'); if(uPaterno) uPaterno.value = (u.tipoDoc !== 'RUC' ? (parts[1] || '') : '');
    var uMaterno = document.getElementById('u-materno'); if(uMaterno) uMaterno.value = (u.tipoDoc !== 'RUC' ? (parts.slice(2).join(' ') || (parts[2] || '')) : '');
    var uMail = document.getElementById('u-mail'); if(uMail) uMail.value = u.mail || '';
    var uTelf = document.getElementById('u-telf'); if(uTelf) uTelf.value = u.telf || '012197000';
    var uAnexo = document.getElementById('u-anexo'); if(uAnexo) uAnexo.value = u.anexo || '1201';

    var tipoEnt = u.tipoEntidad;
    var uniVal = u.unidad || '';
    if (!tipoEnt) {
      if (uniVal) {
        var foundMatch = UNIDADES_ORGANICAS_DATA.find(function(item){
          return uniVal.toUpperCase().indexOf(item.sigla) >= 0 || uniVal.toUpperCase().indexOf(item.nombre) >= 0;
        });
        tipoEnt = foundMatch ? foundMatch.tipo : 'Desconcentrado';
      } else {
        tipoEnt = 'Desconcentrado';
      }
    }
    setCustomSelectValue('u-tipo-entidad', tipoEnt, tipoEnt);
    updateUnidadesOrganicas(tipoEnt, uniVal);

    if (u.sede) {
      setCustomSelectValue('u-sede', u.sede, u.sede);
    } else {
      setCustomSelectValue('u-sede', '', 'Seleccionar...');
    }

    if (u.tipoDoc) {
      var tdocLbl = u.tipoDoc === 'DNI' ? 'DNI — Documento Nacional de Identidad' : (u.tipoDoc === 'CE' ? 'CE — Carné de Extranjería' : (u.tipoDoc === 'RUC' ? 'RUC — Registro Único de Contribuyentes' : u.tipoDoc));
      setCustomSelectValue('u-tdoc', u.tipoDoc, tdocLbl);
    } else {
      setCustomSelectValue('u-tdoc', 'DNI', 'DNI — Documento Nacional de Identidad');
    }
    applyTipoDocRules(u.tipoDoc || 'DNI');

    if (u.tipoUsuario) {
      var tipoUsrLbl = u.tipoUsuario === 'EXTERNO' ? 'EXTERNO — Proveedor o ciudadano' : 'FUNCIONARIO — Usuario Funcionario';
      setCustomSelectValue('u-tipo-usuario', u.tipoUsuario, tipoUsrLbl);
    } else {
      setCustomSelectValue('u-tipo-usuario', 'FUNCIONARIO', 'FUNCIONARIO — Usuario Funcionario');
    }

    if (u.cargo) setCustomSelectValue('u-cargo', u.cargo, u.cargo);
    if (u.estado) setCustomSelectValue('u-estado', u.estado, u.estado);
    
    var tbody = document.getElementById('tbody-asignaciones-usuario');
    if (tbody) {
      tbody.innerHTML = '<tr>' +
        '<td class="num">1</td>' +
        '<td>PO2 — Fiscalización</td>' +
        '<td><span class="badge b-info">Aprobador</span></td>' +
        '<td>' + (u.cargo || u.perfil || 'Coordinador de Fiscalización') + '</td>' +
        '<td><span class="badge b-ok">Por sucursal</span></td>' +
        '<td>' + (u.unidad || u.sede || 'Intendencia de Lima Metropolitana') + '</td>' +
        '<td class="num">01/08/2026 — 31/12/2026</td>' +
        '<td>Asignación previa registrada</td>' +
        '<td style="text-align:right"><div class="acts"><a class="btn-edit-asig" title="Editar" style="color:#504C4A;cursor:pointer;"><svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg></a><a class="btn-del-asig dn" title="Quitar" style="color:#504C4A;cursor:pointer;"><svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:#D51317;fill:none;stroke-width:2"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg></a></div></td>' +
      '</tr>';
    }

    updateUserHeaderCards(u);
    updateUserAsigCount();
    switchUserTab(1);
    syncAllFigmaFields(document.getElementById('usuarios-form'));
  }

  window.__onShow = window.__onShow || {};
  window.__onShow['usuarios-list'] = renderUsuarios;
  window.__onShow['usuarios-form'] = function() {
    syncAllFigmaFields(document.getElementById('usuarios-form'));
  };
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
    // Custom Select Trigger Click
    var selectTrig = e.target.closest('.figma-select-trigger');
    if (selectTrig) {
      if (e._figmaSelectHandled) return;
      e._figmaSelectHandled = true;

      var wrap = selectTrig.closest('.figma-select-wrapper');
      var fField = wrap ? wrap.closest('.figma-field') : null;
      var wasOpen = wrap ? wrap.classList.contains('is-open') : false;

      document.querySelectorAll('.figma-select-wrapper.is-open').forEach(function(w){
        w.classList.remove('is-open');
        var ff = w.closest('.figma-field');
        if (ff) ff.classList.remove('is-open');
      });

      if (wrap && !wasOpen) {
        wrap.classList.add('is-open');
        if (fField) fField.classList.add('is-open');
      }
      return;
    }

    // Custom Select Item Click
    var selectItem = e.target.closest('.figma-select-item');
    if (selectItem) {
      if (e._figmaSelectItemHandled) return;
      e._figmaSelectItemHandled = true;

      var menu = selectItem.closest('.figma-select-menu');
      var wrap = selectItem.closest('.figma-select-wrapper');
      var fField = wrap ? wrap.closest('.figma-field') : null;
      if (menu && wrap) {
        var hiddenInput = wrap.querySelector('input[type="hidden"]');
        var valSpan = wrap.querySelector('.figma-select-val');
        var newVal = selectItem.getAttribute('data-val') !== null ? selectItem.getAttribute('data-val') : selectItem.textContent.trim();
        var newDisplay = selectItem.querySelector('span') ? selectItem.querySelector('span').textContent.trim() : selectItem.textContent.trim();

        if (hiddenInput) {
          hiddenInput.value = newVal;
          var evt = document.createEvent('HTMLEvents');
          evt.initEvent('change', true, false);
          hiddenInput.dispatchEvent(evt);
        }
        if (valSpan) {
          valSpan.textContent = newDisplay || 'Seleccionar...';
          if (newVal) valSpan.classList.remove('is-placeholder');
          else valSpan.classList.add('is-placeholder');
        }
        menu.querySelectorAll('.figma-select-item').forEach(function(it){ it.classList.remove('is-selected'); });
        selectItem.classList.add('is-selected');
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

    // Click outside custom select wrapper
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
        loadUserForEdit(usuariosList[uidx], uidx);
        if (window.go) window.go('usuarios-form');
      }
      return;
    }

    // Suspend user (Baja temporal)
    var suspendUserBtn = e.target.closest('.btn-suspend-user');
    if (suspendUserBtn) {
      var uidx = parseInt(suspendUserBtn.getAttribute('data-uidx'), 10);
      if (!isNaN(uidx) && usuariosList[uidx]) {
        usuariosList[uidx].estado = 'Baja temporal';
        showToast('Usuario ' + usuariosList[uidx].name + ' pasó a estado <b>Baja temporal</b> (suspensión reversible).', 'info', 'Baja temporal');
        renderUsuarios();
      }
      return;
    }

    // Restore user from suspension
    var restoreUserBtn = e.target.closest('.btn-restore-temp');
    if (restoreUserBtn) {
      var uidx = parseInt(restoreUserBtn.getAttribute('data-uidx'), 10);
      if (!isNaN(uidx) && usuariosList[uidx]) {
        usuariosList[uidx].estado = 'Activo';
        showToast('Usuario ' + usuariosList[uidx].name + ' reactivado a estado <b>Activo</b>.', 'ok', 'Usuario reactivado');
        renderUsuarios();
      }
      return;
    }

    // Toggle user active / inactivo
    var toggleUserBtn = e.target.closest('.btn-toggle-user');
    if (toggleUserBtn) {
      var uidx = parseInt(toggleUserBtn.getAttribute('data-uidx'), 10);
      if (!isNaN(uidx) && usuariosList[uidx]) {
        if (usuariosList[uidx].estado === 'Inactivo') {
          usuariosList[uidx].estado = 'Activo';
          showToast('Usuario ' + usuariosList[uidx].name + ' activado correctamente.', 'ok', 'Usuario activado');
        } else {
          usuariosList[uidx].estado = 'Inactivo';
          showToast('Usuario ' + usuariosList[uidx].name + ' inactivado lógicamente (baja definitiva).', 'err', 'Usuario inactivado');
        }
        renderUsuarios();
      }
      return;
    }

    // Reset filters button inside drawer
    var resetFiltersBtn = e.target.closest('#btn-drw-reset-filters');
    if (resetFiltersBtn) {
      var sel = document.getElementById('drw-filter-estado');
      if (sel) sel.value = 'Todos';
      userFilterEstado = 'Todos';
      renderUsuarios();
      closeUserFilterDrawer();
      showToast('Filtros restablecidos.', 'info', 'Filtro avanzado');
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

    // User Form Tabs switching
    var uTabBtn = e.target.closest('.lg-tab[data-utab]');
    if (uTabBtn) {
      var utabNum = parseInt(uTabBtn.getAttribute('data-utab'), 10);
      if (!isNaN(utabNum)) {
        switchUserTab(utabNum);
      }
      return;
    }

    // Open Asignacion Drawer from '+' button
    var openAsigBtn = e.target.closest('#btn-add-asignacion, #btn-open-asignacion-modal');
    if (openAsigBtn) {
      openAsignacionDrawer();
      return;
    }

    // Delete Asignacion row
    var delAsigBtn = e.target.closest('.btn-del-asig');
    if (delAsigBtn) {
      var row = delAsigBtn.closest('tr');
      if (row) {
        row.remove();
        // Reindex order numbers
        var tbody = document.getElementById('tbody-asignaciones-usuario');
        if (tbody) {
          var rows = tbody.querySelectorAll('tr');
          for (var i = 0; i < rows.length; i++) {
            var numCell = rows[i].querySelector('.num');
            if (numCell) numCell.textContent = String(i + 1);
          }
        }
        updateUserAsigCount();
        showToast('Asignación retirada de la lista.', 'info', 'Asignación');
      }
      return;
    }

    // Edit Asignacion row
    var editAsigBtn = e.target.closest('.btn-edit-asig');
    if (editAsigBtn) {
      var targetRow = editAsigBtn.closest('tr');
      openAsignacionDrawer(targetRow);
      return;
    }

    // Consultar Identidad Button
    var consultarBtn = e.target.closest('#btn-consultar-identidad');
    if (consultarBtn) {
      var tdocEl = document.getElementById('u-tdoc');
      var tdocVal = tdocEl ? (tdocEl.value || 'DNI').toUpperCase() : 'DNI';

      if (tdocVal === 'CE') {
        showToast('La consulta en línea no está disponible para Carné de Extranjería. Ingrese los nombres manualmente.', 'info', 'Carné de Extranjería');
        return;
      }

      var ndocInput = document.getElementById('u-ndoc');
      var ndocVal = ndocInput ? ndocInput.value.trim() : '';

      if (tdocVal === 'RUC') {
        var ndoc = ndocVal || generateRandomRUC();
        if (ndocInput) ndocInput.value = ndoc;

        var randEmpresa = getRandomItem(EMPRESAS_POOL);
        var cleanCorp = randEmpresa.split(' ')[0].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        var uname = 'ruc.' + ndoc;
        var email = 'contacto@' + cleanCorp + '.com.pe';

        if (document.getElementById('u-razon-social')) document.getElementById('u-razon-social').value = randEmpresa;
        if (document.getElementById('u-username')) document.getElementById('u-username').value = uname;
        if (document.getElementById('u-mail')) document.getElementById('u-mail').value = email;

        var stEl = document.getElementById('u-estado');
        var sdEl = document.getElementById('u-sede');
        var unEl = document.getElementById('u-unidad-organica');

        updateUserHeaderCards({
          doc: ndoc,
          tipoDoc: 'RUC',
          username: uname,
          sede: sdEl ? sdEl.value : 'Oficina Zonal San Juan de Miraflores',
          unidad: unEl ? unEl.value : '',
          estado: stEl ? stEl.value : 'Activo'
        });

        syncAllFigmaFields(document.getElementById('usuarios-form'));
        showToast('Datos de la empresa validados con éxito ante SUNAT para el RUC N° ' + ndoc + '.', 'ok', 'Consulta SUNAT');
        return;
      }

      // Default: DNI
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

      var stEl = document.getElementById('u-estado');
      var sdEl = document.getElementById('u-sede');
      var unEl = document.getElementById('u-unidad-organica');

      updateUserHeaderCards({
        doc: ndoc,
        tipoDoc: tdocVal || 'DNI',
        username: uname,
        sede: sdEl ? sdEl.value : 'Oficina Zonal San Juan de Miraflores',
        unidad: unEl ? unEl.value : '',
        estado: stEl ? stEl.value : 'Activo'
      });

      syncAllFigmaFields(document.getElementById('usuarios-form'));

      showToast('Identidad validada con éxito desde RENIEC / AD para el DNI N° ' + ndoc + '.', 'ok', 'Consulta RENIEC');
      return;
    }

    // Save Usuario Button (Aceptar)
    var saveUserBtn = e.target.closest('#btn-save-usuario');
    if (saveUserBtn) {
      var nom = document.getElementById('u-nombres') ? document.getElementById('u-nombres').value.trim() : '';
      var pat = document.getElementById('u-paterno') ? document.getElementById('u-paterno').value.trim() : '';
      var mat = document.getElementById('u-materno') ? document.getElementById('u-materno').value.trim() : '';
      var razonSocialVal = document.getElementById('u-razon-social') ? document.getElementById('u-razon-social').value.trim() : '';
      var docNum = document.getElementById('u-ndoc') ? document.getElementById('u-ndoc').value.trim() : '';
      var tdocVal = document.getElementById('u-tdoc') ? document.getElementById('u-tdoc').value : 'DNI';
      var tipoUserVal = document.getElementById('u-tipo-usuario') ? document.getElementById('u-tipo-usuario').value : 'FUNCIONARIO';
      var userVal = document.getElementById('u-username') ? document.getElementById('u-username').value.trim() : '';
      var mailVal = document.getElementById('u-mail') ? document.getElementById('u-mail').value.trim() : '';
      var telfVal = document.getElementById('u-telf') ? document.getElementById('u-telf').value.trim() : '';
      var anexoVal = document.getElementById('u-anexo') ? document.getElementById('u-anexo').value.trim() : '';
      var cargoVal = document.getElementById('u-cargo') ? document.getElementById('u-cargo').value : 'Coordinador de Fiscalización';
      var tipoEntVal = document.getElementById('u-tipo-entidad') ? document.getElementById('u-tipo-entidad').value : 'Desconcentrado';
      var sedeVal = document.getElementById('u-sede') ? document.getElementById('u-sede').value : 'Oficina Zonal San Juan de Miraflores';
      var unidadVal = document.getElementById('u-unidad-organica') ? document.getElementById('u-unidad-organica').value : 'Intendencia de Lima Metropolitana';
      var estadoVal = document.getElementById('u-estado') ? document.getElementById('u-estado').value : 'Activo';

      var fullName = (tdocVal === 'RUC' && razonSocialVal) ? razonSocialVal : ((nom || pat || mat) ? (nom + ' ' + pat + ' ' + mat).trim() : (tdocVal === 'RUC' ? 'CONSORCIO INDUSTRIAL S.A.C.' : 'Carlos Alberto Sánchez Vargas'));
      var finalDoc = docNum || (tdocVal === 'RUC' ? '20501234567' : '70891234');
      var finalMail = mailVal || (tdocVal === 'RUC' ? 'contacto@empresa.com.pe' : 'carlos.sanchez@sunafil.gob.pe');
      var finalUser = userVal || finalMail.split('@')[0];

      if (currentEditingUserIdx !== null && usuariosList[currentEditingUserIdx]) {
        var existing = usuariosList[currentEditingUserIdx];
        existing.doc = finalDoc;
        existing.tipoDoc = tdocVal;
        existing.tipoUsuario = tipoUserVal;
        existing.name = fullName;
        existing.razonSocial = razonSocialVal;
        existing.username = finalUser;
        existing.mail = finalMail;
        existing.telf = telfVal;
        existing.anexo = anexoVal;
        existing.cargo = cargoVal;
        existing.tipoEntidad = tipoEntVal;
        existing.sede = sedeVal;
        existing.unidad = unidadVal;
        existing.estado = estadoVal;
        currentEditingUserIdx = null;
        showToast('Usuario ' + fullName + ' actualizado correctamente.', 'ok', 'Usuario actualizado');
      } else {
        usuariosList.unshift({
          doc: finalDoc,
          tipoDoc: tdocVal,
          tipoUsuario: tipoUserVal,
          name: fullName,
          razonSocial: razonSocialVal,
          username: finalUser,
          mail: finalMail,
          telf: telfVal,
          anexo: anexoVal,
          cargo: cargoVal,
          tipoEntidad: tipoEntVal,
          sede: sedeVal,
          unidad: unidadVal,
          estado: estadoVal
        });
        showToast('Usuario ' + fullName + ' registrado correctamente con sus asignaciones.', 'ok', 'Usuario creado');
      }

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

  // Dynamic synchronization of user form header card on field changes
  function syncUserHeaderFromForm() {
    var doc = document.getElementById('u-ndoc') ? document.getElementById('u-ndoc').value.trim() : '';
    var tdoc = document.getElementById('u-tdoc') ? document.getElementById('u-tdoc').value : '';
    var user = document.getElementById('u-username') ? document.getElementById('u-username').value.trim() : '';
    var sede = document.getElementById('u-sede') ? document.getElementById('u-sede').value : '';
    var unidad = document.getElementById('u-unidad-organica') ? document.getElementById('u-unidad-organica').value : '';
    var entidad = document.getElementById('u-nombre-entidad') ? document.getElementById('u-nombre-entidad').value.trim() : 'SUNAFIL';
    var estado = document.getElementById('u-estado') ? document.getElementById('u-estado').value : '';

    updateUserHeaderCards({
      entidad: entidad,
      doc: doc,
      tipoDoc: tdoc,
      username: user,
      sede: sede,
      unidad: unidad,
      estado: estado
    });
  }

  document.addEventListener('change', function(e){
    if (e.target && e.target.id === 'u-tipo-entidad') {
      updateUnidadesOrganicas(e.target.value, '');
      syncUserHeaderFromForm();
      return;
    }
    if (e.target && e.target.id === 'u-tdoc') {
      applyTipoDocRules(e.target.value);
      syncUserHeaderFromForm();
      return;
    }
    if (e.target && (e.target.id === 'u-estado' || e.target.id === 'u-sede' || e.target.id === 'u-unidad-organica' || e.target.id === 'u-username' || e.target.id === 'u-ndoc' || e.target.id === 'u-nombre-entidad' || e.target.id === 'u-razon-social')) {
      syncUserHeaderFromForm();
    }
  });

  // Real-time synchronization of floating labels (.has-value) on input & change
  document.addEventListener('input', function(e){
    var inp = e.target;
    if (inp && (inp.id === 'u-username' || inp.id === 'u-ndoc' || inp.id === 'u-nombre-entidad')) {
      syncUserHeaderFromForm();
    }
    if (inp && inp.matches && inp.matches('.figma-field input, .figma-field textarea')) {
      var fField = inp.closest('.figma-field');
      if (fField) {
        if ((inp.value || '').trim().length > 0) {
          fField.classList.add('has-value');
          fField.classList.remove('is-error');
        } else {
          fField.classList.remove('has-value');
        }
      }
    }
  });

  document.addEventListener('change', function(e){
    var inp = e.target;
    if (inp && inp.matches && inp.matches('.figma-field select, .figma-field input, .figma-field textarea')) {
      var fField = inp.closest('.figma-field');
      if (fField) {
        if ((inp.value || '').trim().length > 0) {
          fField.classList.add('has-value');
          fField.classList.remove('is-error');
        } else {
          fField.classList.remove('has-value');
        }
      }
    }
  });

  // Clicking on field-box padding focuses the inner input
  document.addEventListener('click', function(e){
    var box = e.target.closest('.figma-field .field-box');
    if (box && !e.target.matches('input, textarea, select, button, a, .figma-select-trigger, .figma-select-menu, .figma-select-item')) {
      var inp = box.querySelector('input:not([type="hidden"]), textarea, select');
      if (inp && !inp.disabled && !inp.readOnly) {
        inp.focus();
      }
    }
  });

  // Initial sync on document ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){ syncAllFigmaFields(); });
  } else {
    syncAllFigmaFields();
  }
})();
