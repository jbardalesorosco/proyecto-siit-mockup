/* ==========================================================================
   SIIT · EXPEDIENTE ELECTRÓNICO (BANDEJA & GESTIÓN DE EXPEDIENTES)
   Alineación normativa: TRA009 — Expediente Electrónico (SUNAFIL · D.S. 029-2021-PCM · Ley 27444)
   ========================================================================== */

(function(){
  var esc = function(x){
    return (x == null ? '' : String(x)).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  };

  // Conjunto de datos institucional con los 19 campos normativos de TRA009
  var EXPEDIENTES_DATA = [
    {
      // Campo 1: Hoja de Ruta del SGD de apertura (inalterable, Art. 31 TUO Ley 27444, RN-EV-001)
      hojaRuta: 'HR-2026-004521',
      // Campo 2: Correlativo institucional TRA005
      id: 'EXP-SEG-2026-000006',
      // Campo 3: Año del expediente
      anio: 2026,
      // Campo 4: Sede / Intendencia
      sede: 'ILM LIMA METROPOLITANA',
      // Campo 5: Asunto
      asunto: 'Fiscalización en Seguridad y Salud en el Trabajo · Riesgos Críticos',
      // Campo 6: Canal de origen
      canalOrigen: 'Mesa de Partes Virtual',
      // Campo 7: Área u oficina solicitante (RN-EV-010)
      areaSolicitante: 'Subdirección de Fiscalización Laboral',
      // Campo 8: Sujeto inspeccionado / Administrado
      sujetoInspeccionado: 'EMENSA S.A.C.',
      sujetoDoc: '20100154821',
      sujetoTipoDoc: 'RUC',
      // Campo 9: Denunciante con protección de identidad (RN-EV-016 / D.L. 1327)
      denunciante: {
        nombre: 'Juan Erick Ramos Quispe',
        tipoDoc: 'DNI',
        nroDoc: '44481657',
        esConfidencial: true
      },
      // Campo 10: Materia inspeccionada / Procedimiento
      materia: 'Seguridad y Salud en el Trabajo · EPP y Riesgo Eléctrico',
      tramite: 'PO2',
      tramiteDesc: 'PO2 — Fiscalización Laboral',
      // Campo 11: Estado del ciclo de vida (Abierto, En trámite, Archivado)
      estado: 'Abierto',
      // Campo 12: Responsable asignado (Inspector de Trabajo)
      responsable: 'Manuel Ramos Quispe',
      // Campo 13: Fecha de creación / apertura
      fechaCreacion: '04/09/2026 14:15',
      // Campo 14: Fecha de cierre formal (null mientras esté abierto o en trámite, RN-EV-005)
      fechaCierre: null,
      // Campo 15: Control de plazos (RN-EV-012)
      plazo: '30 días hábiles',
      diasTranscurridos: 12,
      fechaLimite: '15/10/2026',
      // Metadatos complementarios y auditoría
      codigoInterno: 'INSP-2026-004521',
      oficina: 'Intendencia de Lima Metropolitana',
      fechaActualizacion: '04/09/2026 14:15',
      prioridad: 'Alta',
      docsCount: 3,
      hashIntegridad: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      // RN-EV-015: Hojas Resumen vinculadas (relación 1:N)
      hojasResumen: [
        { id: 'HR-RES-001', tipo: 'Acta de Inspección Inicial', fecha: '04/09/2026', estado: 'Vigente' }
      ],
      // RN-EV-017: Índice Digital Oficial foliado e inalterable
      documentosIndice: [
        {
          folio: 1,
          iud: 'IUD-SUNAFIL-2026-00891',
          nombre: 'ORDEN_INSPECCION_OI_2026_01.pdf',
          tipo: 'Orden de Inspección',
          tamano: '1.2 MB',
          fecha: '04/09/2026 14:15',
          firmaCvd: 'Firma Digital IOFE (CVD: 9812-4412-8901)',
          hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
        },
        {
          folio: 2,
          iud: 'IUD-SUNAFIL-2026-00892',
          nombre: 'REQUERIMIENTO_INFO_01.pdf',
          tipo: 'Requerimiento de Información',
          tamano: '840 KB',
          fecha: '04/09/2026 14:20',
          firmaCvd: 'Firma Digital IOFE (CVD: 4421-9982-1022)',
          hash: 'b45c2698a9d12e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f'
        },
        {
          folio: 3,
          iud: 'IUD-SUNAFIL-2026-00893',
          nombre: 'DENUNCIA_LABORAL_RESERVADA.pdf',
          tipo: 'Denuncia Laboral (Custodia OTIC)',
          tamano: '620 KB',
          fecha: '04/09/2026 14:22',
          firmaCvd: 'Firma Digital IOFE (CVD: 8871-3321-4509)',
          hash: 'c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9'
        }
      ],
      historialTrazabilidad: [
        {
          fecha: '04/09/2026 14:15',
          hito: 'Apertura de Expediente Electrónico',
          actor: 'Mesa de Partes Virtual · Sistema SIIT',
          motivo: 'Registro de solicitud externa y asignación inalterable de Hoja de Ruta SGD.',
          estado: 'Abierto'
        },
        {
          fecha: '04/09/2026 14:20',
          hito: 'Generación del Índice Digital Inicial',
          actor: 'Sistema Automático SIIT',
          motivo: 'Incorporación y foliado electrónico correlativo de documentos fundantes.',
          estado: 'Abierto'
        },
        {
          fecha: '04/09/2026 14:25',
          hito: 'Asignación de Inspector Responsable',
          actor: 'Subdirección de Fiscalización Laboral',
          motivo: 'Asignación de competencia funcional al inspector Manuel Ramos Quispe.',
          estado: 'Abierto'
        }
      ],
      derivaciones: [
        {
          fecha: '04/09/2026 14:25',
          remitente: 'Mesa de Partes Virtual',
          destino: 'Subdirección de Fiscalización Laboral',
          proveido: 'Pase formal para calificación y designación de inspector conforme al art. 13 Ley 28806.',
          estado: 'Recibido'
        }
      ],
      notificaciones: [
        {
          acto: 'Notificación de Orden de Inspección N° OI-2026-004521',
          destinatario: 'EMENSA S.A.C. (RUC 20100154821)',
          via: 'Casilla Electrónica SIIT',
          cvd: 'CVD-NOTIF-98214-2026',
          fecha: '04/09/2026 14:30',
          estado: 'Entregado'
        }
      ]
    },
    {
      hojaRuta: 'HR-2026-004310',
      id: 'EXP-SEG-2026-000005',
      anio: 2026,
      sede: 'ILM LIMA METROPOLITANA',
      asunto: 'Fiscalización sobre Jornada de Trabajo y Horas Extras Impagas',
      canalOrigen: 'Casilla Electrónica SIIT',
      areaSolicitante: 'Subdirección de Fiscalización Laboral',
      sujetoInspeccionado: 'INVERSIONES METALMECÁNICAS S.A.',
      sujetoDoc: '20459812401',
      sujetoTipoDoc: 'RUC',
      denunciante: {
        nombre: 'Manuel Torres Huamán',
        tipoDoc: 'DNI',
        nroDoc: '16125277',
        esConfidencial: false
      },
      materia: 'Relaciones Laborales · Jornada, Horario de Trabajo y Descansos',
      tramite: 'PO2',
      tramiteDesc: 'PO2 — Fiscalización Laboral',
      estado: 'Abierto',
      responsable: 'Manuel Ramos Quispe',
      fechaCreacion: '04/09/2026 13:40',
      fechaCierre: null,
      plazo: '30 días hábiles',
      diasTranscurridos: 10,
      fechaLimite: '15/10/2026',
      codigoInterno: 'INSP-2026-004310',
      oficina: 'Intendencia de Lima Metropolitana',
      fechaActualizacion: '04/09/2026 13:40',
      prioridad: 'Normal',
      docsCount: 2,
      hashIntegridad: '4a6c8e9b1d2f3a5b7c9e0f2a4b6c8d0e2f4a6b8c0d2e4f6a8b0c2d4e6f8a0b2c',
      hojasResumen: [
        { id: 'HR-RES-002', tipo: 'Acta de Apertura Inspectiva', fecha: '04/09/2026', estado: 'Vigente' }
      ],
      documentosIndice: [
        {
          folio: 1,
          iud: 'IUD-SUNAFIL-2026-00870',
          nombre: 'ORDEN_INSPECCION_OI_2026_02.pdf',
          tipo: 'Orden de Inspección',
          tamano: '1.1 MB',
          fecha: '04/09/2026 13:40',
          firmaCvd: 'Firma Digital IOFE (CVD: 1192-3341-9082)',
          hash: '4a6c8e9b1d2f3a5b7c9e0f2a4b6c8d0e2f4a6b8c0d2e4f6a8b0c2d4e6f8a0b2c'
        },
        {
          folio: 2,
          iud: 'IUD-SUNAFIL-2026-00871',
          nombre: 'SOLICITUD_INSPECCION_DENUNCIA.pdf',
          tipo: 'Denuncia Laboral',
          tamano: '520 KB',
          fecha: '04/09/2026 13:42',
          firmaCvd: 'Firma Digital IOFE (CVD: 7721-4452-1920)',
          hash: 'fa2c3e4d5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e'
        }
      ],
      historialTrazabilidad: [
        {
          fecha: '04/09/2026 13:40',
          hito: 'Apertura de Expediente Electrónico',
          actor: 'Casilla Electrónica SIIT',
          motivo: 'Recepción formal de denuncia y generación de código de radicación.',
          estado: 'Abierto'
        }
      ],
      derivaciones: [
        {
          fecha: '04/09/2026 13:45',
          remitente: 'Casilla Electrónica SIIT',
          destino: 'Subdirección de Fiscalización Laboral',
          proveido: 'Remisión formal para actuaciones inspectivas.',
          estado: 'Recibido'
        }
      ],
      notificaciones: [
        {
          acto: 'Notificación de Apertura Inspectiva',
          destinatario: 'INVERSIONES METALMECÁNICAS S.A.',
          via: 'Casilla Electrónica SIIT',
          cvd: 'CVD-NOTIF-98215-2026',
          fecha: '04/09/2026 13:50',
          estado: 'Entregado'
        }
      ]
    },
    {
      hojaRuta: 'HR-2026-003892',
      id: 'EXP-SEG-2026-000004',
      anio: 2026,
      sede: 'ILM LIMA METROPOLITANA',
      asunto: 'Verificación de Normas de Seguridad en Obras de Construcción Civil',
      canalOrigen: 'PIDE - Plataforma de Interoperabilidad',
      areaSolicitante: 'Subdirección de Fiscalización Laboral',
      sujetoInspeccionado: 'CONSTRUCTORA LOS ANDES S.A.C.',
      sujetoDoc: '20512398451',
      sujetoTipoDoc: 'RUC',
      denunciante: {
        nombre: 'Rosa María Chávez',
        tipoDoc: 'DNI',
        nroDoc: '40892314',
        esConfidencial: false
      },
      materia: 'Seguridad y Salud en el Trabajo · Trabajos en Altura y Andamios',
      tramite: 'PO2',
      tramiteDesc: 'PO2 — Fiscalización Laboral',
      estado: 'En trámite',
      responsable: 'Carlos Alberto Mendoza',
      fechaCreacion: '03/09/2026 10:15',
      fechaCierre: null,
      plazo: '20 días hábiles',
      diasTranscurridos: 15,
      fechaLimite: '01/10/2026',
      codigoInterno: 'INSP-2026-003892',
      oficina: 'Intendencia de Lima Metropolitana',
      fechaActualizacion: '03/09/2026 17:20',
      prioridad: 'Media',
      docsCount: 3,
      hashIntegridad: '5b7d9f0a2e3f4a6b8c0e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c3d5e7f9a1b3c',
      hojasResumen: [
        { id: 'HR-RES-003', tipo: 'Acta de Medidas Inspectivas', fecha: '03/09/2026', estado: 'Vigente' }
      ],
      documentosIndice: [
        {
          folio: 1,
          iud: 'IUD-SUNAFIL-2026-00810',
          nombre: 'ORDEN_INSPECCION_OI_2026_03.pdf',
          tipo: 'Orden de Inspección',
          tamano: '1.4 MB',
          fecha: '03/09/2026 10:15',
          firmaCvd: 'Firma Digital IOFE (CVD: 5542-1209-3388)',
          hash: '5b7d9f0a2e3f4a6b8c0e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c3d5e7f9a1b3c'
        },
        {
          folio: 2,
          iud: 'IUD-SUNAFIL-2026-00811',
          nombre: 'INFORME_VISITA_OBRA_01.pdf',
          tipo: 'Informe de Actuación Inspectiva',
          tamano: '2.1 MB',
          fecha: '03/09/2026 15:30',
          firmaCvd: 'Firma Digital IOFE (CVD: 6631-9984-2101)',
          hash: 'ab1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c'
        },
        {
          folio: 3,
          iud: 'IUD-SUNAFIL-2026-00812',
          nombre: 'MEDIDA_REQUERIMIENTO_CORRECTIVA.pdf',
          tipo: 'Medida Inspectiva de Requerimiento',
          tamano: '950 KB',
          fecha: '03/09/2026 17:20',
          firmaCvd: 'Firma Digital IOFE (CVD: 3341-8890-4421)',
          hash: 'bc2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d'
        }
      ],
      historialTrazabilidad: [
        {
          fecha: '03/09/2026 10:15',
          hito: 'Apertura de Expediente Electrónico',
          actor: 'PIDE - Interoperabilidad',
          motivo: 'Solicitud interinstitucional recibida a través de la plataforma de interoperabilidad.',
          estado: 'Abierto'
        },
        {
          fecha: '03/09/2026 17:20',
          hito: 'Emisión de Medida Inspectiva',
          actor: 'Carlos Alberto Mendoza · Inspector',
          motivo: 'Emisión de requerimiento de subsanación inmediata por riesgo grave en obra.',
          estado: 'En trámite'
        }
      ],
      derivaciones: [
        {
          fecha: '03/09/2026 10:30',
          remitente: 'Subdirección de Fiscalización Laboral',
          destino: 'Equipo de Inspectores de Construcción',
          proveido: 'Asignación inmediata para visita in situ.',
          estado: 'Recibido'
        }
      ],
      notificaciones: [
        {
          acto: 'Notificación de Medida de Requerimiento',
          destinatario: 'CONSTRUCTORA LOS ANDES S.A.C.',
          via: 'Casilla Electrónica SIIT',
          cvd: 'CVD-NOTIF-98102-2026',
          fecha: '03/09/2026 17:35',
          estado: 'Entregado'
        }
      ]
    },
    {
      hojaRuta: 'HR-2026-003504',
      id: 'EXP-SEG-2026-000003',
      anio: 2026,
      sede: 'ILM LIMA METROPOLITANA',
      asunto: 'Fiscalización sobre Obligaciones de Seguridad Social y Pensiones',
      canalOrigen: 'Mesa de Partes Virtual',
      areaSolicitante: 'Subdirección de Fiscalización Laboral',
      sujetoInspeccionado: 'DISTRIBUIDORA LOGÍSTICA DEL CENTRO S.R.L.',
      sujetoDoc: '20394815201',
      sujetoTipoDoc: 'RUC',
      denunciante: {
        nombre: 'Carlos Alberto Mendoza',
        tipoDoc: 'DNI',
        nroDoc: '10749382',
        esConfidencial: true
      },
      materia: 'Seguridad Social · Aportes Previsionales AFP y ONP',
      tramite: 'PO2',
      tramiteDesc: 'PO2 — Fiscalización Laboral',
      estado: 'Abierto',
      responsable: 'Rosa María Chávez',
      fechaCreacion: '03/09/2026 09:30',
      fechaCierre: null,
      plazo: '30 días hábiles',
      diasTranscurridos: 6,
      fechaLimite: '14/10/2026',
      codigoInterno: 'INSP-2026-003504',
      oficina: 'Intendencia de Lima Metropolitana',
      fechaActualizacion: '03/09/2026 11:05',
      prioridad: 'Alta',
      docsCount: 2,
      hashIntegridad: '6c8e0a1b3f4a5b7c9d1e2f4a6b8c0e2f4a6b8c0d2e4f6a8b0c2d4e6f8a0b2c4e',
      hojasResumen: [
        { id: 'HR-RES-004', tipo: 'Informe de Calificación Previa', fecha: '03/09/2026', estado: 'Vigente' }
      ],
      documentosIndice: [
        {
          folio: 1,
          iud: 'IUD-SUNAFIL-2026-00750',
          nombre: 'ORDEN_INSPECCION_OI_2026_04.pdf',
          tipo: 'Orden de Inspección',
          tamano: '1.2 MB',
          fecha: '03/09/2026 09:30',
          firmaCvd: 'Firma Digital IOFE (CVD: 8812-7711-2091)',
          hash: '6c8e0a1b3f4a5b7c9d1e2f4a6b8c0e2f4a6b8c0d2e4f6a8b0c2d4e6f8a0b2c4e'
        },
        {
          folio: 2,
          iud: 'IUD-SUNAFIL-2026-00751',
          nombre: 'DENUNCIA_RESERVADA_SEG_SOCIAL.pdf',
          tipo: 'Denuncia Laboral (Custodia OTIC)',
          tamano: '780 KB',
          fecha: '03/09/2026 09:35',
          firmaCvd: 'Firma Digital IOFE (CVD: 9941-2231-5509)',
          hash: 'cd3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e'
        }
      ],
      historialTrazabilidad: [
        {
          fecha: '03/09/2026 09:30',
          hito: 'Apertura de Expediente Electrónico',
          actor: 'Mesa de Partes Virtual · Sistema SIIT',
          motivo: 'Registro de solicitud con protección de identidad.',
          estado: 'Abierto'
        }
      ],
      derivaciones: [
        {
          fecha: '03/09/2026 09:40',
          remitente: 'Mesa de Partes Virtual',
          destino: 'Subdirección de Fiscalización Laboral',
          proveido: 'Pase para trámite inspectivo.',
          estado: 'Recibido'
        }
      ],
      notificaciones: [
        {
          acto: 'Notificación de Requerimiento de Planillas',
          destinatario: 'DISTRIBUIDORA LOGÍSTICA DEL CENTRO S.R.L.',
          via: 'Casilla Electrónica SIIT',
          cvd: 'CVD-NOTIF-98001-2026',
          fecha: '03/09/2026 11:10',
          estado: 'Entregado'
        }
      ]
    },
    {
      hojaRuta: 'HR-2026-002915',
      id: 'EXP-SEG-2026-000002',
      anio: 2026,
      sede: 'ILM LIMA METROPOLITANA',
      asunto: 'Inspección Finalizada por Cumplimiento de Medidas Correctivas',
      canalOrigen: 'Presencial - Ventanilla',
      areaSolicitante: 'Subdirección de Fiscalización Laboral',
      sujetoInspeccionado: 'SERVICIOS INTEGRALES LIMA NORTE S.A.C.',
      sujetoDoc: '20601928374',
      sujetoTipoDoc: 'RUC',
      denunciante: {
        nombre: 'Diana Patricia Ramos',
        tipoDoc: 'DNI',
        nroDoc: '45982103',
        esConfidencial: false
      },
      materia: 'Relaciones Laborales · Pago de Gratificaciones y CTS',
      tramite: 'PO2',
      tramiteDesc: 'PO2 — Fiscalización Laboral',
      estado: 'Archivado',
      responsable: 'Jorge Luis Villanueva',
      fechaCreacion: '02/09/2026 14:00',
      fechaCierre: '07/09/2026 16:50',
      plazo: '30 días hábiles',
      diasTranscurridos: 30,
      fechaLimite: '07/09/2026',
      codigoInterno: 'INSP-2026-002915',
      oficina: 'Intendencia de Lima Metropolitana',
      fechaActualizacion: '07/09/2026 16:50',
      prioridad: 'Normal',
      docsCount: 4,
      hashIntegridad: '7d9f1b2c4a5b6c8d0e2f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c3d5e7f9a1b3c5f',
      hojasResumen: [
        { id: 'HR-RES-005', tipo: 'Acta de Conclusión y Archivo', fecha: '07/09/2026', estado: 'Archivado' }
      ],
      documentosIndice: [
        {
          folio: 1,
          iud: 'IUD-SUNAFIL-2026-00620',
          nombre: 'ORDEN_INSPECCION_OI_2026_05.pdf',
          tipo: 'Orden de Inspección',
          tamano: '1.0 MB',
          fecha: '02/09/2026 14:00',
          firmaCvd: 'Firma Digital IOFE (CVD: 4410-9921-3310)',
          hash: '7d9f1b2c4a5b6c8d0e2f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c3d5e7f9a1b3c5f'
        },
        {
          folio: 2,
          iud: 'IUD-SUNAFIL-2026-00621',
          nombre: 'INFORME_FINAL_CUMPLIMIENTO.pdf',
          tipo: 'Informe Final de Inspección',
          tamano: '1.8 MB',
          fecha: '07/09/2026 15:30',
          firmaCvd: 'Firma Digital IOFE (CVD: 5521-1182-4409)',
          hash: 'de4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f'
        },
        {
          folio: 3,
          iud: 'IUD-SUNAFIL-2026-00622',
          nombre: 'RESOLUCION_ARCHIVAMIENTO.pdf',
          tipo: 'Resolución de Archivo',
          tamano: '640 KB',
          fecha: '07/09/2026 16:50',
          firmaCvd: 'Firma Digital IOFE (CVD: 6610-3321-9988)',
          hash: 'ef5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a'
        }
      ],
      historialTrazabilidad: [
        {
          fecha: '02/09/2026 14:00',
          hito: 'Apertura de Expediente Electrónico',
          actor: 'Ventanilla Presencial SIIT',
          motivo: 'Radicación de expediente por denuncia directa de parte.',
          estado: 'Abierto'
        },
        {
          fecha: '07/09/2026 16:50',
          hito: 'Archivado Formal del Expediente',
          actor: 'Jorge Luis Villanueva · Inspector',
          motivo: 'Cierre y archivamiento formal tras verificación de cumplimiento total de beneficios adeudados.',
          estado: 'Archivado'
        }
      ],
      derivaciones: [
        {
          fecha: '02/09/2026 14:15',
          remitente: 'Ventanilla Presencial',
          destino: 'Subdirección de Fiscalización Laboral',
          proveido: 'Pase a trámite.',
          estado: 'Recibido'
        }
      ],
      notificaciones: [
        {
          acto: 'Notificación de Resolución de Archivo',
          destinatario: 'SERVICIOS INTEGRALES LIMA NORTE S.A.C.',
          via: 'Casilla Electrónica SIIT',
          cvd: 'CVD-NOTIF-97812-2026',
          fecha: '07/09/2026 17:00',
          estado: 'Entregado'
        }
      ]
    },
    {
      hojaRuta: 'HR-2026-002104',
      id: 'EXP-SEG-2026-000001',
      anio: 2026,
      sede: 'ILM LIMA METROPOLITANA',
      asunto: 'Fiscalización Concluida sobre Remuneraciones y Planilla Electrónica',
      canalOrigen: 'Casilla Electrónica SIIT',
      areaSolicitante: 'Subdirección de Fiscalización Laboral',
      sujetoInspeccionado: 'TEXTILES DEL PACÍFICO S.A.',
      sujetoDoc: '20194827163',
      sujetoTipoDoc: 'RUC',
      denunciante: {
        nombre: 'Jorge Luis Villanueva',
        tipoDoc: 'DNI',
        nroDoc: '09831245',
        esConfidencial: false
      },
      materia: 'Registro en Planilla Electrónica T-Registro',
      tramite: 'PO2',
      tramiteDesc: 'PO2 — Fiscalización Laboral',
      estado: 'Archivado',
      responsable: 'Jorge Luis Villanueva',
      fechaCreacion: '31/08/2026 16:20',
      fechaCierre: '01/09/2026 09:10',
      plazo: '30 días hábiles',
      diasTranscurridos: 30,
      fechaLimite: '01/09/2026',
      codigoInterno: 'INSP-2026-002104',
      oficina: 'Intendencia de Lima Metropolitana',
      fechaActualizacion: '01/09/2026 09:10',
      prioridad: 'Normal',
      docsCount: 5,
      hashIntegridad: '8e0a2c3d5b6c7d9e1f3a4b6c8d0e2f4a6b8c0d2e4f6a8b0c2d4e6f8a0b2c4e6a',
      hojasResumen: [
        { id: 'HR-RES-006', tipo: 'Resolución de Archivo Definitivo', fecha: '01/09/2026', estado: 'Archivado' }
      ],
      documentosIndice: [
        {
          folio: 1,
          iud: 'IUD-SUNAFIL-2026-00510',
          nombre: 'ORDEN_INSPECCION_OI_2026_06.pdf',
          tipo: 'Orden de Inspección',
          tamano: '1.3 MB',
          fecha: '31/08/2026 16:20',
          firmaCvd: 'Firma Digital IOFE (CVD: 3310-4491-8821)',
          hash: '8e0a2c3d5b6c7d9e1f3a4b6c8d0e2f4a6b8c0d2e4f6a8b0c2d4e6f8a0b2c4e6a'
        },
        {
          folio: 2,
          iud: 'IUD-SUNAFIL-2026-00511',
          nombre: 'RESOLUCION_ARCHIVO_DEFINITIVO.pdf',
          tipo: 'Resolución de Archivo',
          tamano: '710 KB',
          fecha: '01/09/2026 09:10',
          firmaCvd: 'Firma Digital IOFE (CVD: 2209-5512-3390)',
          hash: 'fa6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b'
        }
      ],
      historialTrazabilidad: [
        {
          fecha: '31/08/2026 16:20',
          hito: 'Apertura de Expediente Electrónico',
          actor: 'Casilla Electrónica SIIT',
          motivo: 'Apertura de trámite e incorporación formal.',
          estado: 'Abierto'
        },
        {
          fecha: '01/09/2026 09:10',
          hito: 'Archivado Formal del Expediente',
          actor: 'Jorge Luis Villanueva · Inspector',
          motivo: 'Cierre formal por acreditación fehaciente en T-Registro.',
          estado: 'Archivado'
        }
      ],
      derivaciones: [
        {
          fecha: '31/08/2026 16:30',
          remitente: 'Casilla Electrónica SIIT',
          destino: 'Subdirección de Fiscalización Laboral',
          proveido: 'Asignación inspectiva.',
          estado: 'Recibido'
        }
      ],
      notificaciones: [
        {
          acto: 'Notificación de Conclusión y Archivo',
          destinatario: 'TEXTILES DEL PACÍFICO S.A.',
          via: 'Casilla Electrónica SIIT',
          cvd: 'CVD-NOTIF-97500-2026',
          fecha: '01/09/2026 09:20',
          estado: 'Entregado'
        }
      ]
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

  function showToast(msg){
    var t = document.getElementById('t001-toast');
    if(!t){
      alert(msg);
      return;
    }
    t.textContent = msg;
    t.style.display = 'block';
    clearTimeout(t._timer);
    t._timer = setTimeout(function(){
      t.style.display = 'none';
    }, 3500);
  }

  function buildTag(text, badgeClass){
    return '<span class="badge ' + (badgeClass || 'b-off') + '" style="display:inline-flex;width:fit-content;max-width:fit-content;min-width:0;padding:4px 8px;border-radius:4px;font-size:12px;font-family:Inter,sans-serif;font-weight:500;line-height:16px;height:24px;box-sizing:border-box;white-space:nowrap;justify-content:center;align-items:center;align-self:center;">' + esc(text) + '</span>';
  }

  function stBadge(st){
    var m = {
      'Abierto': 'b-info',
      'Aperturado': 'b-info',
      'En trámite': 'b-warn',
      'Archivado': 'b-off',
      'Concluido': 'b-ok',
      'Observado': 'b-warn',
      'Rechazado': 'b-danger'
    };
    return buildTag(st, m[st] || 'b-off');
  }

  function buildDetailTextCell(text, opts){
    opts = opts || {};
    var bb = opts.isLast ? 'border-bottom: 0;' : 'border-bottom: 1px var(--sys-color-divider-default, rgba(32, 32, 32, 0.12)) solid;';
    return '<td class="figma-cell-td" style="padding:0;border:0;' + bb + 'vertical-align:middle;white-space:nowrap;">' +
      '<div data-icon-1="true" data-icon-2="true" data-icon-3="true" data-icon-4="false" data-icon-l="false" data-icon-r="false" data-icon-signature="false" data-icon-validation="false" data-type="Text" style="width: 100%; min-height: 48px; box-sizing: border-box; padding-left: 16px; padding-right: 16px; padding-top: 12px; padding-bottom: 12px; justify-content: flex-start; align-items: center; gap: 8px; display: flex;">' +
        '<div style="flex: 1 1 0; min-height: 24px; justify-content: center; display: flex; flex-direction: column; color: var(--sys-color-text-neutral-medium, #29292A); font-size: 14px; font-family: Inter,sans-serif; font-weight: 400; letter-spacing: 0.02px; white-space: nowrap;">' + esc(text || '') + '</div>' +
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

  function buildTableCell(content, opts){
    opts = opts || {};
    var align = opts.align || 'flex-start';
    var isRight = align === 'right' || align === 'flex-end';
    var justify = isRight ? 'flex-end' : (align === 'center' ? 'center' : 'flex-start');
    var numStyle = opts.num ? ' font-variant-numeric: tabular-nums;' : '';
    var extraStyle = opts.style || '';
    var type = opts.type || 'Text';

    return '<td class="figma-cell-td" style="padding:0;border:0;border-bottom:1px var(--sys-color-divider-default, rgba(32, 32, 32, 0.12)) solid;vertical-align:middle;white-space:nowrap;">' +
      '<div data-icon-1="true" data-icon-2="true" data-icon-3="true" data-icon-4="false" data-icon-l="false" data-icon-r="false" data-icon-signature="false" data-icon-validation="false" data-type="' + type + '" style="width: 100%; min-height: 48px; box-sizing: border-box; padding-left: 16px; padding-right: 16px; padding-top: 10px; padding-bottom: 10px; justify-content: ' + justify + '; align-items: center; gap: 8px; display: flex;' + extraStyle + '">' +
        '<div style="flex: 1 1 0; min-height: 24px; justify-content: center; display: flex; flex-direction: column; align-items: ' + justify + '; color: var(--sys-color-text-neutral-medium, #29292A); font-size: 14px; font-family: Inter, sans-serif; font-weight: 400; letter-spacing: 0.02px; white-space: nowrap;' + (isRight ? ' text-align: right;' : '') + numStyle + '">' +
          content +
        '</div>' +
      '</div>' +
    '</td>';
  }

  function getFilteredData(){
    return EXPEDIENTES_DATA.filter(function(row){
      if(S.search && S.search.trim().length > 0){
        var q = S.search.toLowerCase().trim();
        var matchId = (row.id || '').toLowerCase().indexOf(q) >= 0;
        var matchHR = (row.hojaRuta || '').toLowerCase().indexOf(q) >= 0;
        var matchCod = (row.codigoInterno || '').toLowerCase().indexOf(q) >= 0;
        var matchAsunto = (row.asunto || '').toLowerCase().indexOf(q) >= 0;
        var matchMateria = (row.materia || '').toLowerCase().indexOf(q) >= 0;
        var matchSujeto = (row.sujetoInspeccionado || '').toLowerCase().indexOf(q) >= 0;
        var matchDoc = (row.sujetoDoc || '').toLowerCase().indexOf(q) >= 0;
        var matchOfi = (row.oficina || '').toLowerCase().indexOf(q) >= 0;
        var matchResp = (row.responsable || '').toLowerCase().indexOf(q) >= 0;
        if(!matchId && !matchHR && !matchCod && !matchAsunto && !matchMateria && !matchSujeto && !matchDoc && !matchOfi && !matchResp){
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
          '<input id="exp-search-input" value="' + esc(S.search) + '" placeholder="Buscar por hoja de ruta, expediente, código, sujeto o asunto...">' +
        '</div>' +
        '<div class="tbl-actions">' +
          '<button class="btn-tbl-action" id="exp-btn-filtros" type="button"><svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:#504C4A;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg><span>Filtros</span></button>' +
          '<button class="btn-tbl-action" id="exp-btn-columnas" type="button"><svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:#504C4A;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M10.6 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.6"/><path d="M9 3v18"/><path d="M15 3v5.6"/><path d="m14.305 19.53.923-.382"/><path d="m15.228 16.852-.923-.383"/><path d="m16.852 15.228-.383-.923"/><path d="m16.852 20.772-.383.924"/><path d="m19.148 15.228.383-.923"/><path d="m19.53 21.696-.382-.924"/><path d="m20.772 16.852.924-.383"/><path d="m20.772 19.148.924.383"/><circle cx="18" cy="18" r="3"/></svg><span>Columnas</span></button>' +
        '</div>' +
      '</div>';

    // Filas de la tabla con campos normativos de TRA009
    var rowsHtml = '';
    if(pageRows.length === 0){
      rowsHtml = '<tr><td colspan="10" style="text-align:center;padding:48px 24px;color:#64748B;font-size:14px;font-family:Inter,sans-serif;">' +
        '<div style="display:flex;flex-direction:column;align-items:center;gap:12px;">' +
          '<div style="width:48px;height:48px;border-radius:50%;background:#F1F5F9;display:flex;align-items:center;justify-content:center;color:#64748B;">' +
            '<svg viewBox="0 0 24 24" style="width:24px;height:24px;stroke:currentColor;fill:none;stroke-width:2;"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>' +
          '</div>' +
          '<div>No se encontraron expedientes que coincidan con el criterio de búsqueda.</div>' +
        '</div>' +
      '</td></tr>';
    } else {
      rowsHtml = pageRows.map(function(row){
        var k = (row.hojaRuta + ' ' + row.id + ' ' + row.codigoInterno + ' ' + row.asunto + ' ' + row.materia + ' ' + row.sujetoInspeccionado + ' ' + row.sujetoDoc + ' ' + row.oficina + ' ' + row.responsable).toLowerCase();
        
        var hrCol =
          '<div style="display:flex;flex-direction:column;gap:2px;justify-content:center;white-space:nowrap;">' +
            '<a href="javascript:void(0)" data-exp-act="view" data-exp-id="' + esc(row.id) + '" style="color:#06396E;font-weight:600;font-size:13.5px;letter-spacing:0.02px;cursor:pointer;text-decoration:none;white-space:nowrap;">' + esc(row.hojaRuta) + '</a>' +
            '<span style="color:#64748B;font-size:11.5px;font-family:Inter,sans-serif;white-space:nowrap;">' + esc(row.id) + '</span>' +
          '</div>';

        var asuntoCol =
          '<div style="display:flex;flex-direction:column;gap:2px;justify-content:center;max-width:320px;">' +
            '<div style="color:#252220;font-weight:600;font-size:13px;line-height:17px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:320px;" title="' + esc(row.asunto) + '">' + esc(row.asunto) + '</div>' +
            '<div style="color:#64748B;font-size:11.5px;line-height:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:320px;" title="' + esc(row.materia) + '">' + esc(row.materia) + '</div>' +
          '</div>';

        var sujetoCol =
          '<div style="display:flex;flex-direction:column;gap:2px;justify-content:center;max-width:240px;">' +
            '<div style="color:#252220;font-weight:600;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:240px;" title="' + esc(row.sujetoInspeccionado) + '">' + esc(row.sujetoInspeccionado) + '</div>' +
            '<div style="color:#64748B;font-size:11.5px;white-space:nowrap;">' + esc(row.sujetoTipoDoc) + ': ' + esc(row.sujetoDoc) + '</div>' +
          '</div>';

        var oficinaCol =
          '<div style="display:flex;flex-direction:column;gap:2px;justify-content:center;max-width:220px;">' +
            '<div style="color:#252220;font-size:12.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:220px;" title="' + esc(row.oficina) + '">' + esc(row.oficina) + '</div>' +
            '<div style="color:#64748B;font-size:11.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:220px;" title="' + esc(row.responsable) + '">' + esc(row.responsable) + '</div>' +
          '</div>';

        var a = '<div class="acts" style="justify-content:flex-end;align-items:center;height:100%;display:flex;">' +
          '<a title="Ver detalle del expediente" data-exp-act="view" data-exp-id="' + esc(row.id) + '" style="color:#504C4A;cursor:pointer;display:inline-flex;align-items:center;">' + EYE + '</a>' +
        '</div>';

        return '<tr data-k="' + esc(k) + '" data-st="' + esc(row.estado) + '" style="height:56px;">' +
          buildTableCell(hrCol) +
          buildTableCell(esc(row.codigoInterno), { num: true }) +
          buildTableCell(esc((row.canalOrigen || 'Mesa de Partes Virtual').toUpperCase())) +
          buildTableCell(asuntoCol) +
          buildTableCell(sujetoCol) +
          buildTableCell(oficinaCol) +
          buildTableCell(esc(row.fechaActualizacion), { num: true }) +
          buildTableCell(stBadge(row.estado)) +
          buildTableCell(esc(row.plazo)) +
          buildTableCell(a, { align: 'right' }) +
        '</tr>';
      }).join('');
    }

    // Cabeceras de tabla normativas de TRA009
    var theadHtml =
      '<thead><tr>' +
        buildTableHeader('HOJA DE RUTA / EXPEDIENTE') +
        buildTableHeader('CÓDIGO INTERNO') +
        buildTableHeader('ORIGEN') +
        buildTableHeader('ASUNTO / MATERIA') +
        buildTableHeader('SUJETO / INTERESADO') +
        buildTableHeader('OFICINA / RESPONSABLE') +
        buildTableHeader('ACTUALIZACIÓN') +
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
          '<table style="min-width:1400px;width:100%;border-collapse:collapse;">' +
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

    // Configuración del botón de acción superior: Archivar Expediente (RN-EV-005)
    var btnArchivar = document.getElementById('exp-btn-archivar');
    var btnArchivarText = document.getElementById('exp-btn-archivar-text');
    if(btnArchivar){
      if(exp.estado === 'Archivado'){
        btnArchivar.disabled = true;
        btnArchivar.style.opacity = '0.6';
        btnArchivar.style.cursor = 'not-allowed';
        btnArchivar.style.background = '#F1F5F9';
        btnArchivar.style.color = '#64748B';
        if(btnArchivarText) btnArchivarText.textContent = 'Expediente Archivado';
      } else {
        btnArchivar.disabled = false;
        btnArchivar.style.opacity = '1';
        btnArchivar.style.cursor = 'pointer';
        btnArchivar.style.background = '#F8FAFC';
        btnArchivar.style.color = '#334155';
        if(btnArchivarText) btnArchivarText.textContent = 'Archivar expediente';
      }
      btnArchivar.onclick = function(){
        if(exp.estado === 'Archivado'){
          showToast('Este expediente ya se encuentra formalmente archivado.');
          return;
        }
        var ok = confirm('¿Desea archivar formalmente el expediente ' + exp.id + ' (Hoja de Ruta: ' + exp.hojaRuta + ')?');
        if(ok){
          exp.estado = 'Archivado';
          var now = new Date();
          var day = String(now.getDate()).padStart(2, '0');
          var mon = String(now.getMonth() + 1).padStart(2, '0');
          var yr = now.getFullYear();
          var hr = String(now.getHours()).padStart(2, '0');
          var min = String(now.getMinutes()).padStart(2, '0');
          exp.fechaCierre = day + '/' + mon + '/' + yr + ' ' + hr + ':' + min;
          exp.fechaActualizacion = exp.fechaCierre;
          if(!exp.historialTrazabilidad) exp.historialTrazabilidad = [];
          exp.historialTrazabilidad.push({
            fecha: exp.fechaCierre,
            hito: 'Archivado Formal del Expediente',
            actor: exp.responsable + ' (' + exp.oficina + ')',
            motivo: 'Cierre y archivamiento formal del expediente tras agotamiento de diligencias inspectivas y notificación formal.',
            estado: 'Archivado'
          });
          showToast('Expediente ' + exp.id + ' archivado exitosamente.');
          renderExpedienteDetail();
        }
      };
    }

    // 1. Header 2-Cards Layout (Figma exact structure with 19 normative fields)
    var headerCard = '<div data-info-solicitud="true" class="tra001-two-cards-wrap" style="width:100%;border-radius:8px;justify-content:flex-start;align-items:stretch;gap:12px;display:flex;margin-bottom:20px;">' +
      // Card 1: Left Card (Sede, Origen y Fecha)
      '<div style="flex:1 1 0;min-width:0;align-self:stretch;padding:12px 18px;background:white;border:1px solid rgba(32,32,32,0.12);border-radius:8px;flex-direction:column;justify-content:center;align-items:flex-start;display:inline-flex;gap:4px;">' +
        // Row 1: SEDE
        '<div data-content="Text" data-layout="Inline" style="align-self:stretch;flex-direction:column;justify-content:flex-start;align-items:flex-start;display:flex;">' +
          '<div style="align-self:stretch;min-height:32px;padding:4px 0;border-radius:8px;justify-content:flex-start;align-items:center;gap:8px;display:inline-flex;">' +
            '<div style="width:140px;max-width:180px;min-width:80px;min-height:24px;flex-direction:column;justify-content:center;align-items:flex-start;display:inline-flex;">' +
              '<div style="min-height:16px;padding:0 4px;border-radius:8px;justify-content:center;align-items:center;display:inline-flex;">' +
                '<div style="color:#6F6F71;font-size:12px;font-family:Inter,sans-serif;font-weight:500;letter-spacing:0.5px;">SEDE / INTENDENCIA</div>' +
              '</div>' +
            '</div>' +
            '<div style="flex:1 1 0;overflow:hidden;justify-content:flex-start;align-items:center;display:flex;">' +
              '<div style="color:#353537;font-size:14px;font-family:Inter,sans-serif;font-weight:700;text-transform:uppercase;line-height:20px;letter-spacing:0.5px;">' + esc(exp.sede || 'ILM LIMA METROPOLITANA') + '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        // Row 2: CANAL DE ORIGEN
        '<div data-content="Text" data-layout="Inline" style="align-self:stretch;flex-direction:column;justify-content:flex-start;align-items:flex-start;display:flex;">' +
          '<div style="align-self:stretch;min-height:32px;padding:4px 0;border-radius:8px;justify-content:flex-start;align-items:center;gap:8px;display:inline-flex;">' +
            '<div style="width:140px;max-width:180px;min-width:80px;min-height:24px;flex-direction:column;justify-content:center;align-items:flex-start;display:inline-flex;">' +
              '<div style="min-height:16px;padding:0 4px;border-radius:8px;justify-content:center;align-items:center;display:inline-flex;">' +
                '<div style="color:#6F6F71;font-size:12px;font-family:Inter,sans-serif;font-weight:500;letter-spacing:0.5px;">CANAL ORIGEN</div>' +
              '</div>' +
            '</div>' +
            '<div style="flex:1 1 0;overflow:hidden;justify-content:flex-start;align-items:center;display:flex;">' +
              '<div style="color:#252220;font-size:14px;font-family:Inter,sans-serif;font-weight:700;text-transform:uppercase;line-height:20px;letter-spacing:0.5px;">' + esc((exp.canalOrigen || 'Mesa de Partes Virtual').toUpperCase()) + '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        // Row 3: FECHA
        '<div data-content="Text" data-layout="Inline" style="align-self:stretch;flex-direction:column;justify-content:flex-start;align-items:flex-start;display:flex;">' +
          '<div style="align-self:stretch;min-height:32px;padding:4px 0;border-radius:8px;justify-content:flex-start;align-items:center;gap:8px;display:inline-flex;">' +
            '<div style="width:140px;max-width:180px;min-width:80px;min-height:24px;flex-direction:column;justify-content:center;align-items:flex-start;display:inline-flex;">' +
              '<div style="min-height:16px;padding:0 4px;border-radius:8px;justify-content:center;align-items:center;display:inline-flex;">' +
                '<div style="color:#6F6F71;font-size:12px;font-family:Inter,sans-serif;font-weight:500;letter-spacing:0.5px;">FECHA APERTURA</div>' +
              '</div>' +
            '</div>' +
            '<div style="flex:1 1 0;overflow:hidden;justify-content:flex-start;align-items:center;display:flex;">' +
              '<div style="color:#353537;font-size:14px;font-family:Inter,sans-serif;font-weight:600;line-height:20px;">' + esc(exp.fechaCreacion || '04/09/2026 14:15') + '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +

      // Card 2: Right Card (Hoja de Ruta SGD inalterable, Correlativo TRA005 & Estado)
      '<div style="width:420px;flex-shrink:0;align-self:stretch;padding:12px 18px;background:white;border:1px solid rgba(32,32,32,0.12);border-radius:8px;flex-direction:column;justify-content:center;align-items:flex-start;display:inline-flex;gap:4px;">' +
        // Row 1: HOJA DE RUTA SGD
        '<div data-content="Text" data-layout="Inline" style="align-self:stretch;flex-direction:column;justify-content:flex-start;align-items:flex-start;display:flex;">' +
          '<div style="align-self:stretch;min-height:32px;padding:4px 0;border-radius:8px;justify-content:flex-start;align-items:center;gap:8px;display:inline-flex;">' +
            '<div style="width:140px;max-width:180px;min-width:90px;min-height:24px;flex-direction:column;justify-content:center;align-items:flex-start;display:inline-flex;">' +
              '<div style="min-height:16px;padding:0 4px;border-radius:8px;justify-content:center;align-items:center;display:inline-flex;">' +
                '<div style="color:#6F6F71;font-size:12px;font-family:Inter,sans-serif;font-weight:500;letter-spacing:0.5px;">HOJA DE RUTA (SGD)</div>' +
              '</div>' +
            '</div>' +
            '<div style="flex:1 1 0;overflow:hidden;justify-content:flex-start;align-items:center;display:flex;">' +
              '<div style="color:#252220;font-size:14px;font-family:Inter,sans-serif;font-weight:700;line-height:20px;">' + esc(exp.hojaRuta) + '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        // Row 2: CORRELATIVO INSTITUCIONAL TRA005
        '<div data-content="Text" data-layout="Inline" style="align-self:stretch;flex-direction:column;justify-content:flex-start;align-items:flex-start;display:flex;">' +
          '<div style="align-self:stretch;min-height:32px;padding:4px 0;border-radius:8px;justify-content:flex-start;align-items:center;gap:8px;display:inline-flex;">' +
            '<div style="width:140px;max-width:180px;min-width:90px;min-height:24px;flex-direction:column;justify-content:center;align-items:flex-start;display:inline-flex;">' +
              '<div style="min-height:16px;padding:0 4px;border-radius:8px;justify-content:center;align-items:center;display:inline-flex;">' +
                '<div style="color:#6F6F71;font-size:12px;font-family:Inter,sans-serif;font-weight:500;letter-spacing:0.5px;">CÓDIGO INTERNO</div>' +
              '</div>' +
            '</div>' +
            '<div style="flex:1 1 0;overflow:hidden;justify-content:flex-start;align-items:center;display:flex;">' +
              '<div style="color:#353537;font-size:13.5px;font-family:Inter,sans-serif;font-weight:600;line-height:20px;">' + esc(exp.id) + '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        // Row 3: ESTADO DEL CICLO DE VIDA
        '<div data-content="Tags" data-layout="Inline" style="align-self:stretch;flex-direction:column;justify-content:center;align-items:flex-start;display:flex;">' +
          '<div style="align-self:stretch;min-height:32px;padding:4px 0;border-radius:8px;justify-content:flex-start;align-items:center;gap:8px;display:inline-flex;">' +
            '<div style="width:140px;max-width:180px;min-width:90px;min-height:24px;flex-direction:column;justify-content:center;align-items:flex-start;display:inline-flex;">' +
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

    // 2. Tabs Navigation Bar & Section Header
    var tabs = [
      { id: 1, label: 'Resumen' },
      { id: 2, label: 'Documentos (Índice Digital)', count: exp.documentosIndice ? exp.documentosIndice.length : 0 },
      { id: 3, label: 'Trazabilidad', count: exp.historialTrazabilidad ? exp.historialTrazabilidad.length : 3 },
      { id: 4, label: 'Derivaciones', count: exp.derivaciones ? exp.derivaciones.length : 1 },
      { id: 5, label: 'Participantes', count: (exp.denunciante ? 3 : 2) },
      { id: 6, label: 'Notificantes', count: exp.notificaciones ? exp.notificaciones.length : 1 }
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
              '<div style="color:var(--sys-color-text-neutral-high, #252220);font-size:16px;font-family:Inter,sans-serif;font-weight:600;line-height:24px;">Datos del expediente electrónico</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div style="width:100%;border-bottom:1px solid var(--sys-color-divider-default, rgba(32, 32, 32, 0.12));display:flex;justify-content:flex-start;align-items:flex-end;gap:4px;padding-left:0px;padding-right:24px;box-sizing:border-box;overflow:visible;">' +
        tabsButtonsHtml +
      '</div>' +
    '</div>';

    // 3. Tab Body con especificaciones de TRA009
    var tabBodyHtml = '';
    if(S.detailTab === 1){
      // Tab 1: Resumen con las 4 tarjetas superiores + tarjeta horizontal inferior
      var denuncianteHtml = '';
      if(exp.denunciante && exp.denunciante.esConfidencial){
        denuncianteHtml =
          '<div style="display:inline-flex;align-items:center;gap:6px;background:#FEF3C7;color:#92400E;padding:3px 8px;border-radius:4px;font-size:12px;font-weight:600;">' +
            '<svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>' +
            '<span>Reserva de Identidad</span>' +
          '</div>';
      } else if(exp.denunciante){
        denuncianteHtml = '<div style="color:#1E293B;font-size:13.5px;font-weight:600;">' + esc(exp.denunciante.nombre) + ' (' + esc(exp.denunciante.tipoDoc) + ' ' + esc(exp.denunciante.nroDoc) + ')</div>';
      } else {
        denuncianteHtml = '<div style="color:#64748B;font-size:13px;">De oficio</div>';
      }

      var hojasResumenChips = (exp.hojasResumen || []).map(function(hr){
        return '<span style="background:#F1F5F9;padding:4px 10px;border-radius:4px;font-size:12px;font-family:Inter,sans-serif;color:#334155;border:1px solid #CBD5E1;display:inline-flex;align-items:center;gap:6px;">' +
          '<strong>' + esc(hr.id) + '</strong>: ' + esc(hr.tipo) + ' (' + esc(hr.estado) + ')' +
        '</span>';
      }).join(' ');

      tabBodyHtml =
        '<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(250px, 1fr));gap:16px;margin-bottom:16px;">' +
          // Tarjeta 1: Sujeto Inspeccionado / Administrado
          '<div style="background:white;border:1px solid rgba(32,32,32,0.10);border-radius:8px;padding:18px 20px;box-shadow:0 1px 2px rgba(0,0,0,0.03);display:flex;flex-direction:column;gap:14px;">' +
            '<div style="display:flex;align-items:center;gap:10px;">' +
              '<div style="width:30px;height:30px;border-radius:6px;background:#E0F2FE;color:#0284C7;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
                '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' +
              '</div>' +
              '<div style="color:#0F172A;font-size:14.5px;font-weight:700;font-family:Inter,sans-serif;">Sujeto Inspeccionado</div>' +
            '</div>' +
            '<div>' +
              '<div style="color:#64748B;font-size:11px;font-weight:600;font-family:Inter,sans-serif;letter-spacing:0.5px;margin-bottom:3px;">TIPO Y DOCUMENTO</div>' +
              '<div style="color:#1E293B;font-size:14px;font-weight:700;font-family:Inter,sans-serif;">' + esc(exp.sujetoTipoDoc || 'RUC') + ' ' + esc(exp.sujetoDoc || '20100154821') + '</div>' +
            '</div>' +
            '<div>' +
              '<div style="color:#64748B;font-size:11px;font-weight:600;font-family:Inter,sans-serif;letter-spacing:0.5px;margin-bottom:3px;">RAZÓN SOCIAL / NOMBRE</div>' +
              '<div style="color:#1E293B;font-size:14px;font-weight:700;font-family:Inter,sans-serif;">' + esc(exp.sujetoInspeccionado || 'EMENSA S.A.C.') + '</div>' +
            '</div>' +
            '<div>' +
              '<div style="color:#64748B;font-size:11px;font-weight:600;font-family:Inter,sans-serif;letter-spacing:0.5px;margin-bottom:3px;">RECURRENTE / DENUNCIANTE</div>' +
              denuncianteHtml +
            '</div>' +
          '</div>' +

          // Tarjeta 2: Trámite e Inspección
          '<div style="background:white;border:1px solid rgba(32,32,32,0.10);border-radius:8px;padding:18px 20px;box-shadow:0 1px 2px rgba(0,0,0,0.03);display:flex;flex-direction:column;gap:14px;">' +
            '<div style="display:flex;align-items:center;gap:10px;">' +
              '<div style="width:30px;height:30px;border-radius:6px;background:#E0F2FE;color:#0284C7;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
                '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' +
              '</div>' +
              '<div style="color:#0F172A;font-size:14.5px;font-weight:700;font-family:Inter,sans-serif;">Trámite e Inspección</div>' +
            '</div>' +
            '<div>' +
              '<div style="color:#64748B;font-size:11px;font-weight:600;font-family:Inter,sans-serif;letter-spacing:0.5px;margin-bottom:3px;">PROCEDIMIENTO</div>' +
              '<div style="color:#1E293B;font-size:14px;font-weight:700;font-family:Inter,sans-serif;">' + esc(exp.tramiteDesc || 'PO2 — Fiscalización Laboral') + '</div>' +
            '</div>' +
            '<div>' +
              '<div style="color:#64748B;font-size:11px;font-weight:600;font-family:Inter,sans-serif;letter-spacing:0.5px;margin-bottom:3px;">MATERIA INSPECCIONADA</div>' +
              '<div style="color:#1E293B;font-size:13.5px;font-weight:600;font-family:Inter,sans-serif;">' + esc(exp.materia || 'Seguridad y Salud en el Trabajo') + '</div>' +
            '</div>' +
            '<div>' +
              '<div style="color:#64748B;font-size:11px;font-weight:600;font-family:Inter,sans-serif;letter-spacing:0.5px;margin-bottom:3px;">ÁREA SOLICITANTE</div>' +
              '<div style="color:#1E293B;font-size:13.5px;font-weight:600;font-family:Inter,sans-serif;">' + esc(exp.areaSolicitante || 'Subdirección de Fiscalización Laboral') + '</div>' +
            '</div>' +
          '</div>' +

          // Tarjeta 3: Atención y Asignación Actual
          '<div style="background:white;border:1px solid rgba(32,32,32,0.10);border-radius:8px;padding:18px 20px;box-shadow:0 1px 2px rgba(0,0,0,0.03);display:flex;flex-direction:column;gap:14px;">' +
            '<div style="display:flex;align-items:center;gap:10px;">' +
              '<div style="width:30px;height:30px;border-radius:6px;background:#E0F2FE;color:#0284C7;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
                '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="22"/><line x1="8" y1="6" x2="8.01" y2="6"/><line x1="16" y1="6" x2="16.01" y2="6"/><line x1="8" y1="10" x2="8.01" y2="10"/><line x1="16" y1="10" x2="16.01" y2="10"/><line x1="8" y1="14" x2="8.01" y2="14"/><line x1="16" y1="14" x2="16.01" y2="14"/></svg>' +
              '</div>' +
              '<div style="color:#0F172A;font-size:14.5px;font-weight:700;font-family:Inter,sans-serif;">Atención y Asignación</div>' +
            '</div>' +
            '<div>' +
              '<div style="color:#64748B;font-size:11px;font-weight:600;font-family:Inter,sans-serif;letter-spacing:0.5px;margin-bottom:3px;">OFICINA / DEPENDENCIA</div>' +
              '<div style="color:#1E293B;font-size:14px;font-weight:700;font-family:Inter,sans-serif;">' + esc(exp.oficina || 'SUNAFIL') + '</div>' +
            '</div>' +
            '<div>' +
              '<div style="color:#64748B;font-size:11px;font-weight:600;font-family:Inter,sans-serif;letter-spacing:0.5px;margin-bottom:3px;">INSPECTOR RESPONSABLE</div>' +
              '<div style="color:#1E293B;font-size:14px;font-weight:700;font-family:Inter,sans-serif;">' + esc(exp.responsable || 'Manuel Ramos Quispe') + '</div>' +
            '</div>' +
            '<div>' +
              '<div style="color:#64748B;font-size:11px;font-weight:600;font-family:Inter,sans-serif;letter-spacing:0.5px;margin-bottom:3px;">CANAL DE INGRESO</div>' +
              '<div style="color:#1E293B;font-size:13.5px;font-weight:700;text-transform:uppercase;font-family:Inter,sans-serif;">' + esc((exp.canalOrigen || 'Mesa de Partes Virtual').toUpperCase()) + '</div>' +
            '</div>' +
          '</div>' +

          // Tarjeta 4: Control de Plazo
          '<div style="background:white;border:1px solid rgba(32,32,32,0.10);border-radius:8px;padding:18px 20px;box-shadow:0 1px 2px rgba(0,0,0,0.03);display:flex;flex-direction:column;gap:14px;">' +
            '<div style="display:flex;align-items:center;gap:10px;">' +
              '<div style="width:30px;height:30px;border-radius:6px;background:#E0F2FE;color:#0284C7;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
                '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' +
              '</div>' +
              '<div style="color:#0F172A;font-size:14.5px;font-weight:700;font-family:Inter,sans-serif;">Control de Plazo (Días Hábiles)</div>' +
            '</div>' +
            '<div style="display:flex;align-items:center;gap:8px;margin-top:4px;">' +
              '<span style="color:#0D9488;font-weight:700;font-size:18px;">' + (exp.diasTranscurridos != null ? exp.diasTranscurridos : 12) + 'd</span>' +
              '<span style="color:#0D9488;font-size:13.5px;font-weight:700;font-family:Inter,sans-serif;">transcurridos de ' + esc(exp.plazo || '30 días hábiles') + '</span>' +
            '</div>' +
            '<div style="color:#64748B;font-size:12px;font-family:Inter,sans-serif;">Fecha límite calculada: <strong>' + esc(exp.fechaLimite || '15/10/2026') + '</strong></div>' +
            '<div style="color:#475569;font-size:11.5px;background:#F8FAFC;padding:6px 10px;border-radius:4px;border:1px solid #E2E8F0;">Cómputo en días hábiles conforme al calendario oficial SUNAFIL.</div>' +
          '</div>' +
        '</div>' +

        // Tarjeta Inferior Horizontal: Control, Auditoría y Hojas Resumen vinculadas
        '<div style="background:white;border:1px solid rgba(32,32,32,0.10);border-radius:8px;padding:18px 20px;box-shadow:0 1px 2px rgba(0,0,0,0.03);display:flex;flex-direction:column;gap:16px;">' +
          '<div style="display:flex;align-items:center;gap:10px;">' +
            '<div style="width:30px;height:30px;border-radius:6px;background:#E0F2FE;color:#0284C7;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
              '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' +
            '</div>' +
            '<div style="color:#0F172A;font-size:14.5px;font-weight:700;font-family:Inter,sans-serif;">Control, Auditoría y Hojas Resumen</div>' +
          '</div>' +
          '<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:20px;">' +
            '<div>' +
              '<div style="color:#64748B;font-size:11px;font-weight:600;font-family:Inter,sans-serif;letter-spacing:0.5px;margin-bottom:3px;">NIVEL DE ACCESO</div>' +
              '<div style="color:#1E293B;font-size:13.5px;font-weight:700;font-family:Inter,sans-serif;">INTERNO (Restringido)</div>' +
            '</div>' +
            '<div>' +
              '<div style="color:#64748B;font-size:11px;font-weight:600;font-family:Inter,sans-serif;letter-spacing:0.5px;margin-bottom:3px;">FECHA DE APERTURA</div>' +
              '<div style="color:#1E293B;font-size:13.5px;font-weight:700;font-family:Inter,sans-serif;">' + esc(exp.fechaCreacion) + '</div>' +
            '</div>' +
            '<div>' +
              '<div style="color:#64748B;font-size:11px;font-weight:600;font-family:Inter,sans-serif;letter-spacing:0.5px;margin-bottom:3px;">FECHA DE CIERRE</div>' +
              '<div style="color:#1E293B;font-size:13.5px;font-weight:700;font-family:Inter,sans-serif;">' + (exp.fechaCierre ? esc(exp.fechaCierre) : '<span style="color:#0284C7;">Trámite activo (Abierto)</span>') + '</div>' +
            '</div>' +
            '<div>' +
              '<div style="color:#64748B;font-size:11px;font-weight:600;font-family:Inter,sans-serif;letter-spacing:0.5px;margin-bottom:3px;">HOJAS RESUMEN (1:N)</div>' +
              '<div style="display:flex;gap:6px;flex-wrap:wrap;">' + (hojasResumenChips || '<span style="color:#64748B;font-size:12px;">Ninguna generada</span>') + '</div>' +
            '</div>' +
          '</div>' +
          '<div style="border-top:1px dashed #E2E8F0;padding-top:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">' +
            '<div style="display:flex;align-items:center;gap:8px;">' +
              '<span style="color:#64748B;font-size:12px;font-family:Inter,sans-serif;font-weight:600;">Hash SHA-256 de Integridad Global del Expediente:</span>' +
              '<code style="font-family:monospace;font-size:12px;color:#0284C7;background:#F1F5F9;padding:2px 8px;border-radius:4px;border:1px solid #CBD5E1;">' + esc(exp.hashIntegridad || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855') + '</code>' +
            '</div>' +
            '<div style="color:#10B981;font-size:12px;font-weight:700;display:inline-flex;align-items:center;gap:4px;">' +
              '<svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2.5;"><polyline points="20 6 9 17 4 12"/></svg>' +
              '<span>Cotejado y Verificado</span>' +
            '</div>' +
          '</div>' +
        '</div>';
    } else if(S.detailTab === 2){
      // Tab 2: Documentos -> Official Índice Digital (RN-EV-017)
      var docs = exp.documentosIndice || [];
      var docRowsHtml = '';

      if(docs.length === 0){
        docRowsHtml = '<tr><td colspan="7" style="text-align:center;padding:32px;color:#64748B;">No hay documentos registrados en el índice digital.</td></tr>';
      } else {
        docRowsHtml = docs.map(function(doc, idx){
          var isLast = idx === docs.length - 1;

          var nombreCell =
            '<div style="display:flex;align-items:center;gap:8px;white-space:nowrap;">' +
              '<svg viewBox="0 0 24 24" style="width:18px;height:18px;stroke:#D51317;fill:none;stroke-width:2;flex-shrink:0;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>' +
              '<span style="font-weight:600;color:#1E293B;white-space:nowrap;">' + esc(doc.nombre) + '</span>' +
            '</div>';

          var actionsCell =
            '<td class="figma-cell-td" style="padding:0;border:0;' + (isLast ? 'border-bottom:0;' : 'border-bottom:1px var(--sys-color-divider-default, rgba(32, 32, 32, 0.12)) solid;') + 'vertical-align:middle;text-align:right;white-space:nowrap;">' +
              '<div data-type="Actions" style="width:100%;min-height:48px;box-sizing:border-box;padding-left:16px;padding-right:16px;padding-top:10px;padding-bottom:10px;justify-content:flex-end;align-items:center;gap:12px;display:flex;">' +
                '<button type="button" data-doc-act="hash" data-doc-name="' + esc(doc.nombre) + '" data-doc-iud="' + esc(doc.iud) + '" data-doc-hash="' + esc(doc.hash) + '" title="Verificar Hash SHA-256 e Integridad" style="background:none;border:none;cursor:pointer;color:#0284C7;padding:4px;display:inline-flex;align-items:center;gap:4px;font-size:12px;font-weight:600;white-space:nowrap;">' +
                  '<svg viewBox="0 0 24 24" style="width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:2;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>' +
                  '<span>Ver Hash</span>' +
                '</button>' +
                '<button type="button" data-doc-act="download" data-doc-name="' + esc(doc.nombre) + '" title="Descargar documento" style="background:none;border:none;cursor:pointer;color:#504C4A;padding:4px;display:inline-flex;align-items:center;">' +
                  '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>' +
                '</button>' +
              '</div>' +
            '</td>';

          return '<tr style="height:48px;">' +
            buildDetailTextCell(String(doc.folio), { isLast: isLast }) +
            buildDetailTextCell(doc.iud, { isLast: isLast }) +
            '<td class="figma-cell-td" style="padding:0;border:0;' + (isLast ? 'border-bottom:0;' : 'border-bottom:1px var(--sys-color-divider-default, rgba(32, 32, 32, 0.12)) solid;') + 'vertical-align:middle;white-space:nowrap;">' +
              '<div data-type="Text" style="width:100%;min-height:48px;box-sizing:border-box;padding:10px 16px;display:flex;align-items:center;white-space:nowrap;">' +
                nombreCell +
              '</div>' +
            '</td>' +
            buildDetailTextCell(doc.tipo, { isLast: isLast }) +
            buildDetailTextCell(doc.firmaCvd, { isLast: isLast }) +
            buildDetailTextCell(doc.fecha, { isLast: isLast }) +
            actionsCell +
          '</tr>';
        }).join('');
      }

      tabBodyHtml =
        '<div style="display:flex;flex-direction:column;gap:16px;">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">' +
            '<div>' +
              '<div style="font-size:15px;font-weight:700;color:#252220;">Índice Digital del Expediente Electrónico</div>' +
              '<div style="font-size:12.5px;color:#64748B;margin-top:2px;">Foliado digital inalterable con Identificador Único de Documento (IUD) y verificación criptográfica SHA-256.</div>' +
            '</div>' +
            '<span style="padding:4px 10px;border-radius:12px;background:#E0F2FE;color:#0284C7;font-size:12px;font-weight:700;">' + docs.length + ' folios certificados</span>' +
          '</div>' +
          '<div class="tw" style="border:1px solid rgba(32,32,32,0.12);border-radius:4px;overflow-x:auto;">' +
            '<table class="t001-table" style="width:100%;min-width:1100px;border-collapse:collapse;font-family:Inter,sans-serif;text-align:left;font-size:13px;white-space:nowrap;">' +
              '<thead>' +
                '<tr style="background:rgba(32,32,32,0.04);border-bottom:1px solid rgba(32,32,32,0.12);height:40px;white-space:nowrap;">' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;width:70px;white-space:nowrap;">Folio</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;white-space:nowrap;">IUD (Doc. Único)</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;white-space:nowrap;">Nombre del documento</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;white-space:nowrap;">Tipo</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;white-space:nowrap;">Firma Digital / CVD</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;white-space:nowrap;">Fecha y hora</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;text-align:right;white-space:nowrap;">Acciones</th>' +
                '</tr>' +
              '</thead>' +
              '<tbody>' +
                docRowsHtml +
              '</tbody>' +
            '</table>' +
          '</div>' +
        '</div>';
    } else if(S.detailTab === 3){
      // Tab 3: Trazabilidad con actor, hito, motivo y fecha
      var hist = exp.historialTrazabilidad || [];
      var timelineItems = hist.map(function(item, idx){
        var isFirst = idx === 0;
        var dotColor = isFirst ? '#0284C7' : (item.estado === 'Archivado' ? '#64748B' : '#10B981');
        return '<div style="position:relative;padding-left:18px;margin-bottom:20px;">' +
          '<div style="position:absolute;left:-25px;top:2px;width:12px;height:12px;border-radius:50%;background:' + dotColor + ';border:2px solid #fff;box-shadow:0 0 0 1px ' + dotColor + ';"></div>' +
          '<div style="font-size:13.5px;font-weight:700;color:#252220;">' + esc(item.hito) + '</div>' +
          '<div style="font-size:12px;color:#64748B;margin-top:2px;">' + esc(item.fecha) + ' · Por <strong>' + esc(item.actor) + '</strong></div>' +
          '<div style="font-size:13px;color:#475569;margin-top:4px;line-height:18px;">' + esc(item.motivo) + '</div>' +
        '</div>';
      }).join('');

      tabBodyHtml =
        '<div style="display:flex;flex-direction:column;gap:20px;padding:8px 0;">' +
          '<div>' +
            '<div style="font-size:15px;font-weight:700;color:#252220;">Historial de Trazabilidad y Auditoría</div>' +
            '<div style="font-size:12.5px;color:#64748B;margin-top:2px;">Registro inmutable de actuaciones, hitos, motivos de modificación y responsables.</div>' +
          '</div>' +
          '<div style="display:flex;flex-direction:column;padding-left:14px;border-left:2px solid #E2E8F0;margin-left:8px;">' +
            timelineItems +
          '</div>' +
        '</div>';
    } else if(S.detailTab === 4){
      // Tab 4: Derivaciones
      var derivs = exp.derivaciones || [];
      var derivRows = derivs.map(function(d, idx){
        var isLast = idx === derivs.length - 1;
        return '<tr style="height:48px;">' +
          buildDetailTextCell(d.fecha, { isLast: isLast }) +
          buildDetailTextCell(d.remitente, { isLast: isLast }) +
          buildDetailTextCell(d.destino, { isLast: isLast }) +
          buildDetailTextCell(d.proveido, { isLast: isLast }) +
          '<td class="figma-cell-td" style="padding:0;border:0;' + (isLast ? 'border-bottom:0 !important;' : '') + 'vertical-align:middle;text-align:center;white-space:nowrap;">' +
            '<div data-type="Status" style="width:100%;min-height:48px;box-sizing:border-box;padding:10px 16px;justify-content:center;align-items:center;gap:8px;display:flex;">' +
              buildTag(d.estado || 'Recibido', 'b-ok') +
            '</div>' +
          '</td>' +
        '</tr>';
      }).join('');

      tabBodyHtml =
        '<div style="display:flex;flex-direction:column;gap:16px;">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;">' +
            '<div>' +
              '<div style="font-size:15px;font-weight:700;color:#252220;">Derivaciones y Pases Formales del Expediente</div>' +
              '<div style="font-size:12.5px;color:#64748B;margin-top:2px;">Control de traslados entre unidades orgánicas e intendencias conforme a competencia.</div>' +
            '</div>' +
          '</div>' +
          '<div class="tw" style="border:1px solid rgba(32,32,32,0.12);border-radius:4px;overflow-x:auto;">' +
            '<table class="t001-table" style="width:100%;min-width:980px;border-collapse:collapse;font-family:Inter,sans-serif;text-align:left;font-size:13px;white-space:nowrap;">' +
              '<thead>' +
                '<tr style="background:rgba(32,32,32,0.04);border-bottom:1px solid rgba(32,32,32,0.12);height:40px;white-space:nowrap;">' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;white-space:nowrap;">Fecha</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;white-space:nowrap;">Origen / Remitente</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;white-space:nowrap;">Destino / Oficina</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;white-space:nowrap;">Proveído / Detalle</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;text-align:center;white-space:nowrap;">Estado</th>' +
                '</tr>' +
              '</thead>' +
              '<tbody>' +
                (derivRows || '<tr><td colspan="5" style="text-align:center;padding:24px;color:#64748B;">No se registran derivaciones adicionales.</td></tr>') +
              '</tbody>' +
            '</table>' +
          '</div>' +
        '</div>';
    } else if(S.detailTab === 5){
      // Tab 5: Participantes con soporte para Reserva de Identidad
      var denuncianteRow = '';
      if(exp.denunciante && exp.denunciante.esConfidencial){
        denuncianteRow =
          '<tr style="height:48px;">' +
            buildDetailTextCell('[IDENTIDAD RESERVADA - PROTECCIÓN AL DENUNCIANTE]', { isLast: true }) +
            '<td class="figma-cell-td" style="padding:0;border:0;border-bottom:0 !important;vertical-align:middle;white-space:nowrap;">' +
              '<div data-type="Status" style="width:100%;min-height:48px;box-sizing:border-box;padding:10px 16px;justify-content:flex-start;align-items:center;gap:8px;display:flex;">' +
                buildTag('Reserva de Identidad', 'b-warn') +
              '</div>' +
            '</td>' +
            buildDetailTextCell('DNI ******* (Dato protegido)', { isLast: true }) +
            buildDetailTextCell('Custodia Especial OTIC · Reserva Activa', { isLast: true }) +
            buildDetailTextCell('servidor_seguro@sunafil.gob.pe', { isLast: true }) +
          '</tr>';
      } else if(exp.denunciante){
        denuncianteRow =
          '<tr style="height:48px;">' +
            buildDetailTextCell(exp.denunciante.nombre, { isLast: true }) +
            '<td class="figma-cell-td" style="padding:0;border:0;border-bottom:0 !important;vertical-align:middle;white-space:nowrap;">' +
              '<div data-type="Status" style="width:100%;min-height:48px;box-sizing:border-box;padding:10px 16px;justify-content:flex-start;align-items:center;gap:8px;display:flex;">' +
                buildTag('Denunciante / Recurrente', 'b-off') +
              '</div>' +
            '</td>' +
            buildDetailTextCell(exp.denunciante.tipoDoc + ' ' + exp.denunciante.nroDoc, { isLast: true }) +
            buildDetailTextCell('Persona Natural / Administrado', { isLast: true }) +
            buildDetailTextCell('contacto_administrado@gob.pe', { isLast: true }) +
          '</tr>';
      }

      tabBodyHtml =
        '<div style="display:flex;flex-direction:column;gap:16px;">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;">' +
            '<div>' +
              '<div style="font-size:15px;font-weight:700;color:#252220;">Participantes e Intervinientes del Procedimiento</div>' +
              '<div style="font-size:12.5px;color:#64748B;margin-top:2px;">Sujetos procesales, responsables inspectivos y administrados con salvaguarda de confidencialidad.</div>' +
            '</div>' +
          '</div>' +
          '<div class="tw" style="border:1px solid rgba(32,32,32,0.12);border-radius:4px;overflow-x:auto;">' +
            '<table class="t001-table" style="width:100%;min-width:980px;border-collapse:collapse;font-family:Inter,sans-serif;text-align:left;font-size:13px;white-space:nowrap;">' +
              '<thead>' +
                '<tr style="background:rgba(32,32,32,0.04);border-bottom:1px solid rgba(32,32,32,0.12);height:40px;white-space:nowrap;">' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;white-space:nowrap;">Participante</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;white-space:nowrap;">Rol</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;white-space:nowrap;">Documento</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;white-space:nowrap;">Entidad / Dependencia</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;white-space:nowrap;">Contacto oficial</th>' +
                '</tr>' +
              '</thead>' +
              '<tbody>' +
                '<tr style="height:48px;">' +
                  buildDetailTextCell(exp.sujetoInspeccionado) +
                  '<td class="figma-cell-td" style="padding:0;border:0;vertical-align:middle;white-space:nowrap;">' +
                    '<div data-type="Status" style="width:100%;min-height:48px;box-sizing:border-box;padding:10px 16px;justify-content:flex-start;align-items:center;gap:8px;display:flex;">' +
                      buildTag('Sujeto Inspeccionado', 'b-info') +
                    '</div>' +
                  '</td>' +
                  buildDetailTextCell(exp.sujetoTipoDoc + ' ' + exp.sujetoDoc) +
                  buildDetailTextCell('Empresa / Administrado') +
                  buildDetailTextCell('casilla_siit_' + exp.sujetoDoc + '@sunafil.gob.pe') +
                '</tr>' +
                '<tr style="height:48px;">' +
                  buildDetailTextCell(exp.responsable, { isLast: !denuncianteRow }) +
                  '<td class="figma-cell-td" style="padding:0;border:0;' + (!denuncianteRow ? 'border-bottom:0 !important;' : '') + 'vertical-align:middle;white-space:nowrap;">' +
                    '<div data-type="Status" style="width:100%;min-height:48px;box-sizing:border-box;padding:10px 16px;justify-content:flex-start;align-items:center;gap:8px;display:flex;">' +
                      buildTag('Responsable Asignado', 'b-off') +
                    '</div>' +
                  '</td>' +
                  buildDetailTextCell('Credencial Inspectiva N° 2026-' + exp.id.slice(-4), { isLast: !denuncianteRow }) +
                  buildDetailTextCell(exp.oficina, { isLast: !denuncianteRow }) +
                  buildDetailTextCell('mramos_inspector@sunafil.gob.pe', { isLast: !denuncianteRow }) +
                '</tr>' +
                denuncianteRow +
              '</tbody>' +
            '</table>' +
          '</div>' +
        '</div>';
    } else if(S.detailTab === 6){
      // Tab 6: Notificantes
      var notifs = exp.notificaciones || [];
      var notifRows = notifs.map(function(n, idx){
        var isLast = idx === notifs.length - 1;
        return '<tr style="height:48px;">' +
          buildDetailTextCell(n.acto, { isLast: isLast }) +
          buildDetailTextCell(n.destinatario, { isLast: isLast }) +
          buildDetailTextCell(n.via, { isLast: isLast }) +
          buildDetailTextCell(n.cvd, { isLast: isLast }) +
          buildDetailTextCell(n.fecha, { isLast: isLast }) +
          '<td class="figma-cell-td" style="padding:0;border:0;' + (isLast ? 'border-bottom:0 !important;' : '') + 'vertical-align:middle;text-align:center;white-space:nowrap;">' +
            '<div data-type="Status" style="width:100%;min-height:48px;box-sizing:border-box;padding:10px 16px;justify-content:center;align-items:center;gap:8px;display:flex;">' +
              buildTag(n.estado || 'Entregado', 'b-ok') +
            '</div>' +
          '</td>' +
        '</tr>';
      }).join('');

      tabBodyHtml =
        '<div style="display:flex;flex-direction:column;gap:16px;">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;">' +
            '<div>' +
              '<div style="font-size:15px;font-weight:700;color:#252220;">Notificaciones y Comunicaciones Oficiales (SIIT / Casilla)</div>' +
              '<div style="font-size:12.5px;color:#64748B;margin-top:2px;">Acreditación fehaciente de actos administrativos notificados y entrega digital.</div>' +
            '</div>' +
          '</div>' +
          '<div class="tw" style="border:1px solid rgba(32,32,32,0.12);border-radius:4px;overflow-x:auto;">' +
            '<table class="t001-table" style="width:100%;min-width:980px;border-collapse:collapse;font-family:Inter,sans-serif;text-align:left;font-size:13px;white-space:nowrap;">' +
              '<thead>' +
                '<tr style="background:rgba(32,32,32,0.04);border-bottom:1px solid rgba(32,32,32,0.12);height:40px;white-space:nowrap;">' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;white-space:nowrap;">Acto notificado</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;white-space:nowrap;">Destinatario</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;white-space:nowrap;">Medio / Vía</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;white-space:nowrap;">CVD / Constancia</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;white-space:nowrap;">Fecha y hora</th>' +
                  '<th style="padding:8px 16px;font-weight:600;color:#504C4A;font-size:12px;text-transform:uppercase;text-align:center;white-space:nowrap;">Estado</th>' +
                '</tr>' +
              '</thead>' +
              '<tbody>' +
                (notifRows || '<tr><td colspan="6" style="text-align:center;padding:24px;color:#64748B;">No hay notificaciones emitidas aún.</td></tr>') +
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

    // Event listeners para tabs
    mount.querySelectorAll('[data-exp-tab]').forEach(function(btn){
      btn.addEventListener('click', function(e){
        e.preventDefault();
        var tabId = parseInt(btn.getAttribute('data-exp-tab'), 10) || 1;
        S.detailTab = tabId;
        renderExpedienteDetail();
      });
    });

    // Event listeners para botones del índice digital (Hash y Descarga)
    mount.querySelectorAll('[data-doc-act="hash"]').forEach(function(btn){
      btn.addEventListener('click', function(e){
        e.preventDefault();
        var docName = btn.getAttribute('data-doc-name');
        var docIud = btn.getAttribute('data-doc-iud');
        var docHash = btn.getAttribute('data-doc-hash');
        alert('Cotejo de Integridad Digital\n\n' +
              'Documento: ' + docName + '\n' +
              'IUD: ' + docIud + '\n' +
              'Algoritmo: SHA-256\n' +
              'Valor Hash: ' + docHash + '\n\n' +
              'Estado: Criptográficamente íntegro e inalterado ✓');
      });
    });

    mount.querySelectorAll('[data-doc-act="download"]').forEach(function(btn){
      btn.addEventListener('click', function(e){
        e.preventDefault();
        var docName = btn.getAttribute('data-doc-name');
        showToast('Descargando copia auténtica digital de ' + docName + '...');
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
