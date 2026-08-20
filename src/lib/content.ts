/* ============================================================
   Contenido del dossier BeClean.
   Portado literal desde la versión original en HTML plano.
   La copia no se reescribió: es la voz institucional del cliente
   y los números están respaldados por ensayo, registro o pliego.
   ============================================================ */

export const NAV = [
  { href: "#tesis", label: "Tesis" },
  { href: "#mecanismo", label: "Mecanismo" },
  { href: "#rendimiento", label: "Rendimiento" },
  { href: "#evidencia", label: "Evidencia" },
  { href: "#linea", label: "Línea" },
  { href: "#respaldo", label: "Respaldo" },
] as const;

export const HERO = {
  kicker: "Laboratorio Pyam, desde 1991 en 103 países",
  title: ["Limpiemos hoy,", "cuidando el mañana."],
  // 18 palabras: el hero tiene que entrar en pantalla sin scroll.
  lead: "Convertimos cada producto de limpieza y desinfección en una tableta efervescente: el mismo activo, sin transportar agua.",
  ctaPrimary: { label: "Solicitar cotización", href: "#contacto" },
  ctaSecondary: { label: "Ver la evidencia", href: "#evidencia" },
} as const;

export const HERO_STATS = [
  { value: ">99,999 %", label: "Reducción bacteriana en 5 minutos, norma EN 13697" },
  { value: "×50", label: "Más solución lista por envase que un limpiador tradicional" },
  { value: "3 años", label: "De vida útil, con la concentración intacta" },
  { value: "103", label: "Países donde ya se usan los productos del laboratorio" },
] as const;

export const THESIS_STEPS = [
  {
    n: "01",
    title: "La industria de la limpieza transporta agua.",
    body: "Un bidón de limpiador es, en su enorme mayoría, agua. Esa agua se envasa, se paletiza, sube a un camión y recorre miles de kilómetros, para llegar a un lugar donde ya hay agua de red.",
  },
  {
    n: "02",
    title: "Y la envasa en plástico de un solo uso.",
    body: "Un envase nuevo por cada dosis de producto. El continente pesa, ocupa y contamina más que el contenido que realmente hace el trabajo.",
  },
  {
    n: "03",
    title: "Y después se dosifica a ojo.",
    body: "Sin medida exacta no hay protocolo verificable: en desinfección, una dilución mal calculada es la diferencia entre cumplir una norma y creer que se cumple.",
  },
] as const;

export const THESIS_RESOLVE = {
  title: "BeClean saca el agua de la ecuación.",
  body: "Lo que viaja es solamente el activo, comprimido en una tableta de 2,5 o 5 gramos. El agua la pone el cliente, en el lugar de uso, en el momento exacto en que la fórmula se activa.",
} as const;

export const MECHANISM = {
  title: "Una tableta. Un volumen de agua definido. Listo.",
  lead: "Sin mezclas, sin trasvase, sin cálculo. Cada tableta está comprimida para un volumen exacto, y ese volumen es el protocolo.",
  steps: [
    {
      title: "Preparación",
      body: "Se agrega una tableta en el volumen de agua indicado para ese producto.",
      meta: "Piso 4 L, multiuso 250 ml, Mediclean 5 L",
    },
    {
      title: "Dilución",
      body: "La tableta efervesce y se disuelve por completo. En los desinfectantes, el tiempo de acción es de 5 minutos.",
      meta: "Disolución total, sin agitar",
    },
    {
      title: "Uso",
      body: "La solución queda lista para trapeador, rociador o pulverizador, y mantiene su concentración durante 7 días.",
      meta: "7 días de concentración estable",
    },
  ],
} as const;

export const CHEMISTRY = {
  title: "El activo no viaja disuelto. Se activa en el balde.",
  body: "El principio activo de la línea de desinfección es el dicloroisocianurato de sodio (NaDCC). En estado sólido es estable durante tres años. Al entrar en contacto con el agua se hidroliza y libera ácido hipocloroso, uno de los biocidas más potentes que se conocen, avalado por la OMS y la EPA. La lavandina, en cambio, ya viene disuelta: desde el día uno empieza a perder cloro activo.",
  left: {
    formula: "NaDCC",
    caption: "Tableta efervescente. Sólida, estable, carga no peligrosa.",
  },
  right: {
    formula: "HOCl",
    caption:
      "Ácido hipocloroso. Acción biocida de amplio espectro, pH neutro, no destiñe.",
  },
} as const;

export const PERFORMANCE = {
  title: "Mismo trabajo, una fracción del volumen.",
  lead: "Solución lista para usar por envase, comparada con el equivalente de primera marca en góndola.",
  rows: [
    {
      product: "Limpiador de piso",
      meta: "Pote de 80 tabletas · 5 g",
      us: { label: "BeClean", value: "320 L", n: 320 },
      them: { label: "Primera marca", value: "35 L", n: 35 },
      factor: "×9",
    },
    {
      product: "Vidrios / multiuso",
      meta: "Pote de 100 tabletas · 2,5 g",
      us: { label: "BeClean", value: "25 L · 100 usos", n: 25 },
      them: { label: "Primera marca", value: "500 ml", n: 0.5 },
      factor: "×50",
    },
    {
      product: "Desengrasante de cocina",
      meta: "Pote de 100 tabletas · 2,5 g",
      us: { label: "BeClean", value: "25 L · 100 usos", n: 25 },
      them: { label: "Primera marca", value: "500 ml", n: 0.5 },
      factor: "×50",
    },
    {
      product: "Limpiador de baño",
      meta: "Pote de 100 tabletas · 2,5 g",
      us: { label: "BeClean", value: "25 L · 100 usos", n: 25 },
      them: { label: "Primera marca", value: "500 ml", n: 0.5 },
      factor: "×50",
    },
    {
      product: "Desinfectante de superficies",
      meta: "Mediclean, pote de 100 tabletas de 2,5 g",
      us: { label: "Mediclean", value: "500 L", n: 500 },
      them: { label: "Lavandina 1 L", value: "20 L", n: 20 },
      factor: "×25",
    },
  ],
  truck: {
    lead: "Llevado a un camión completo, la diferencia deja de ser una comparación de góndola y pasa a ser un problema de logística resuelto:",
    value: 3072000,
    label: "Usos por camión · 38.400 potes",
    compare: "Primera marca: 184.800 usos por camión",
    factor: "16,6× más eficiente",
  },
} as const;

export const EVIDENCE = {
  title: "No es una promesa. Está medido.",
  lead: "La eficacia biocida de la línea de desinfección fue ensayada por un tercero independiente, bajo norma europea, con el inóculo y los tiempos declarados.",
  docTitle: "Poder bactericida bajo norma EN 13697",
  meta: [
    { k: "Institución", v: "UBA · Facultad de Farmacia y Bioquímica" },
    { k: "Protocolo", v: "N.º 5353" },
    { k: "Fecha", v: "10/01/2021" },
    { k: "Dilución ensayada", v: "1 pastilla / 5 L" },
    { k: "Muestra", v: "Tableta 1,67 g NaDCC" },
    { k: "Tiempo de acción", v: "5 minutos" },
  ],
  tableCaption: "Resultados del ensayo de poder bactericida",
  columns: [
    "Microorganismo de prueba",
    "Inóculo inicial (UFC/carrier)",
    "Recuento a 5 min",
    "Reducción",
  ],
  rows: [
    ["Pseudomonas aeruginosa", "6,0 × 10⁶", "< 10", "> 99,999 %"],
    ["Staphylococcus aureus", "4,8 × 10⁶", "< 10", "> 99,999 %"],
    ["Escherichia coli", "3,2 × 10⁶", "< 10", "> 99,999 %"],
    ["Salmonella choleraesuis", "3,6 × 10⁶", "< 10", "> 99,999 %"],
  ],
  conclusion:
    "La muestra, en una dilución de 1 pastilla en 5 L, demuestra actividad biocida frente a Pseudomonas aeruginosa, Staphylococcus aureus, Escherichia coli y Salmonella choleraesuis, destruyendo más del 99,999 % del inóculo dentro de los 5 minutos de acción.",
  cta: { label: "Pedir documentación técnica", href: "#contacto" },
  disclaimer:
    "El ensayo corresponde a la línea de tabletas desinfectantes de superficies en base a NaDCC. Los limpiadores BeClean de piso, vidrios, cocina y baño son productos de limpieza, no desinfectantes, y responden a sus propias fichas técnicas y registros.",
} as const;

export const SPECTRUM = {
  bacteria: {
    title: "Espectro · bacterias",
    items: [
      "Escherichia coli",
      "Pseudomonas aeruginosa",
      "Salmonella y Shigella",
      "Streptococcus y Staphylococcus",
      "Vibrio cholerae",
      "Enterococcus faecalis",
    ],
  },
  virus: {
    title: "Espectro · virus y esporas",
    items: [
      "Hepatitis A",
      "Hepatitis B",
      "Poliovirus",
      "Rotavirus",
      "Clostridium difficile (esporulado)",
    ],
  },
  registries: {
    title: "Registros y normas",
    items: [
      "Mediclean · ANMAT RNPUD 0250001",
      "Mediclean Plus · ANMAT RNPUD 0250022",
      "Clorondina · ANMAT 0250028",
      "ISO 9001:2015 · UKAS AR-U239690",
      "GMP Pharmaceutical · WHO TRS 961",
      "NSF / ANSI Standard 60",
    ],
  },
} as const;

export const PROTOCOLS = {
  title: "Protocolos de dilución",
  lead: "El nivel de riesgo del área define la concentración, y la concentración se cuenta en tabletas. No hay cálculo intermedio.",
  levels: [
    {
      level: "Áreas no críticas",
      examples: "Corredores, baños, vestuarios, cocinas, pasillos, barandas",
      concentration: "0,03 % · 300 ppm",
      dose: "1 tableta",
      tablets: 1,
      img: "/media/protocolo-no-critica.jpg",
      alt: "Habitación de hospital con camas y ventanal, ejemplo de área no crítica",
    },
    {
      level: "Áreas críticas",
      examples: "Consultorios médicos, laboratorios",
      concentration: "0,1 % · 1.000 ppm",
      dose: "4 tabletas",
      tablets: 4,
      img: "/media/protocolo-critica.jpg",
      alt: "Consultorio médico con profesional y paciente, ejemplo de área crítica",
    },
    {
      level: "Áreas altamente contaminadas",
      examples: "Salas de diálisis, hemoterapia, quirófanos, salas de parto",
      concentration: "0,45 % · 4.500 ppm",
      dose: "15 tabletas",
      tablets: 15,
      img: "/media/protocolo-alta.jpg",
      alt: "Interior de quirófano moderno, ejemplo de área altamente contaminada",
    },
  ],
  note: "Valores para tabletas Mediclean de 2,5 g de NaDCC, que liberan 1.500 ppm de cloro por litro de agua. La solución preparada conserva su concentración durante 7 días. Dosis calculadas sobre balde de 5 L.",
} as const;

export const LINEUP = {
  title: "Del hogar al quirófano, la misma lógica.",
  lead: "Cuatro limpiadores de uso cotidiano y tres desinfectantes de grado hospitalario. Todos en tableta, todos carga no peligrosa.",
  cleaners: [
    {
      badge: "Rendimiento ×9",
      name: "Limpiador de piso",
      body: "Superficies duras, materiales sintéticos, sanitarios y acero inoxidable. Fragancia duradera.",
      specs: [
        ["Tableta", "5 g"],
        ["Rinde", "4 L"],
        ["Pote", "80 tabletas"],
        ["Total", "320 L"],
      ],
    },
    {
      badge: "Rendimiento ×50",
      name: "Limpiador de vidrios / multiuso",
      body: "Vidrios, plásticos, acrílicos y superficies generales. Sin marcas ni residuo.",
      specs: [
        ["Tableta", "2,5 g"],
        ["Rinde", "250 ml"],
        ["Pote", "100 tabletas"],
        ["Total", "25 L"],
      ],
    },
    {
      badge: "Rendimiento ×50",
      name: "Desengrasante de cocina",
      body: "Superficies de cocina, campanas y electrodomésticos. Corta la grasa sin abrasivos.",
      specs: [
        ["Tableta", "2,5 g"],
        ["Rinde", "250 ml"],
        ["Pote", "100 tabletas"],
        ["Total", "25 L"],
      ],
    },
    {
      badge: "Rendimiento ×50",
      name: "Limpiador de baño",
      body: "Sanitarios, azulejos y grifería. Formulado para el uso diario del baño.",
      specs: [
        ["Tableta", "2,5 g"],
        ["Rinde", "250 ml"],
        ["Pote", "100 tabletas"],
        ["Total", "25 L"],
      ],
    },
  ],
  disinfectants: [
    {
      badge: "Desinfectante · uso hospitalario",
      name: "Mediclean",
      body: "Amplio espectro, elimina el 99,99 % de microorganismos, bacterias, hongos, protozoos y virus. pH neutro, no destiñe. Apto para trapeador y pulverizador.",
      specs: [
        ["Tableta", "2,5 g NaDCC"],
        ["Rinde", "5 L · 300 ppm"],
        ["Potes", "18 / 60 / 100"],
        ["Registro", "RNPUD 0250001"],
      ],
    },
    {
      badge: "Limpia y desinfecta en una pasada",
      name: "Mediclean Plus",
      body: "Desinfectante con componente detergente (tripolifosfato pentasódico y lauril sulfato de sodio): un solo paso en lugar de dos.",
      specs: [
        ["Tableta", "2,5 g NaDCC"],
        ["Rinde", "5 L · 280 ppm"],
        ["Pote", "100 tabletas"],
        ["Registro", "RNPUD 0250022"],
      ],
    },
    {
      badge: "Aprobado por SENASA",
      name: "Germ Over 1,67 g",
      body: "Desinfectante de superficies de dosificación económica, para volumen y uso profesional intensivo.",
      specs: [
        ["Tableta", "1,67 g NaDCC"],
        ["Rinde", "5 L · 200 ppm"],
        ["Pote", "140 pastillas"],
        ["Vida útil", "3 años"],
      ],
    },
  ],
  formula: {
    title: "Composición · línea de limpieza",
    label: "Fórmula declarada",
    body: "Ácido cítrico, sales inorgánicas, tensioactivo no iónico, conservantes, fragancia y colorantes.",
    specs: [
      ["Transporte", "No peligroso"],
      ["Vía", "Aire, mar y tierra"],
    ],
  },
} as const;

export const COMPARISON = {
  title: "Mediclean frente a lavandina de primera marca",
  cta: { label: "Pedir ficha técnica", href: "#contacto" },
  columns: ["Criterio", "Mediclean", "Lavandina 1 L"],
  rows: [
    ["Usos por envase", "100 usos por pote", "4 usos por botella"],
    ["Solución total", "500 litros", "20 litros"],
    ["Vida útil", "3 años, concentración estable", "120 días, pérdida continua"],
    ["Clasificación de transporte", "Carga no peligrosa", "Carga peligrosa"],
    ["Dosificación", "Exacta, por tableta", "Inexacta, por volumen"],
    ["Acción del calor y la luz", "Ninguna", "Muy dañina"],
    ["Sobre las superficies", "pH neutro · no destiñe", "Destiñe"],
    ["Almacenamiento", "Práctico", "Dificultoso"],
  ],
} as const;

export const LOGISTICS = {
  title: "Carga no peligrosa, pallet cerrado, tres años de vida útil.",
  lead: "Para una licitación o un contrato de abastecimiento, esto pesa tanto como la fórmula. Los datos de la unidad logística, cerrados:",
  stats: [
    { value: "24", label: "Unidades por caja de 300 × 400 × 250 mm" },
    { value: "11,55 kg", label: "Peso de la caja completa" },
    { value: "960", label: "Unidades por pallet · 40 cajas" },
    { value: "1,36 m²", label: "Pallet de 100 × 120 × 114 cm · 477 kg" },
  ],
  note: "Clasificación de mercadería no peligrosa para transporte aéreo, marítimo y terrestre. Esto elimina sobrecostos de flete, restricciones de almacenamiento y requisitos especiales de manipulación que sí aplican a los desinfectantes líquidos clorados.",
} as const;

export const IMPACT = {
  title: "El ahorro ambiental no es un agregado. Es el mismo cambio.",
  lead: "Sacar el agua del envase reduce simultáneamente el plástico, las emisiones del transporte y el desperdicio de producto.",
  stats: [
    {
      value: 98,
      suffix: " %",
      label: "Menos emisiones de CO₂",
      body: "Por unidad de solución entregada, gracias a un transporte drásticamente más eficiente.",
    },
    {
      value: 96,
      suffix: " %",
      label: "Menos plástico",
      body: "Frente al equivalente en envases tradicionales de un solo uso.",
    },
    {
      value: 0,
      suffix: "",
      display: "Cero",
      label: "Agua en la producción",
      body: "La fórmula se comprime en seco y se activa recién en el momento del uso.",
    },
  ],
  note: "Aprovechamiento total por dosis: no queda producto remanente en el envase ni se descarta solución sobrante. Cálculos de CO₂ y plástico provistos por el laboratorio sobre la base del rendimiento comparado por envase.",
} as const;

export const BACKING = {
  title: "BeClean nace de un laboratorio que hace 30 años produce para emergencias.",
  lead: "Laboratorio Pyam fabrica comprimidos potabilizadores de agua y desinfectantes de superficies desde 1991, en una planta diseñada y operada bajo estándares farmacéuticos.",
  timeline: [
    {
      year: "1991",
      title: "Fundación",
      body: "Pyam comienza a operar afrontando la epidemia de cólera en Sudamérica.",
    },
    {
      year: "1998",
      title: "Planta propia",
      body: "Construcción de la planta en el parque industrial de Gualeguaychú, Entre Ríos.",
    },
    {
      year: "2006",
      title: "UNICEF",
      body: "Primer acuerdo a largo plazo. Pyam pasa a ser uno de los 3 proveedores globales de UNICEF para este tipo de productos.",
    },
    {
      year: "2011",
      title: "Haití",
      body: "Soporte en una de las emergencias humanitarias más grandes de la historia.",
    },
    {
      year: "2017",
      title: "Yemen",
      body: "Agua potable para población refugiada durante grandes brotes de cólera en contexto bélico.",
    },
    {
      year: "2020",
      title: "Covid-19",
      body: "Soporte a la respuesta sanitaria con desinfectantes y potabilizadores.",
    },
    {
      year: "2025",
      title: "Ministerio de Salud",
      body: "Contratación directa por exclusividad para el abastecimiento de 5.000.000 de pastillas potabilizadoras.",
    },
  ],
  credentials: [
    { k: "ANMAT", v: "Autorización de productos y de planta. RNE 080030198." },
    { k: "ISO 9001:2015", v: "Certificado UKAS AR-U239690, sistema de gestión de calidad." },
    { k: "GMP Pharmaceutical", v: "Buenas prácticas de manufactura, WHO Technical Report Series 961." },
    { k: "NSF / ANSI 60", v: "Norma internacional para aditivos de tratamiento de agua potable." },
    { k: "SENASA", v: "Habilitación para uso en ámbitos de producción agroalimentaria." },
    { k: "UNICEF", v: "Uno de los 3 proveedores globales desde 2006." },
    { k: "103 países", v: "Foco en América Latina, África y Asia." },
    { k: "Producción para terceros", v: "Unilever, Diversey, Clorotec y Ecolab, entre otros." },
  ],
} as const;

/* Marquee único de la página. Credenciales que aportan amplitud pero
   no necesitan atención individual. */
export const CERT_MARQUEE = [
  "ANMAT · RNE 080030198",
  "ISO 9001:2015 · UKAS AR-U239690",
  "GMP Pharmaceutical · WHO TRS 961",
  "NSF / ANSI Standard 60",
  "SENASA",
  "UNICEF · proveedor global desde 2006",
  "EN 13697 · UBA protocolo 5353",
  "103 países",
] as const;

export const INSTITUTIONAL = {
  title:
    "Cuando un Estado necesita que el producto funcione, no licita: contrata por exclusividad.",
  body: "Es el mayor aval que puede recibir un fabricante de este rubro. El Ministerio de Salud de la Nación resolvió el abastecimiento de pastillas potabilizadoras mediante contratación directa por exclusividad, el mecanismo que se aplica cuando un solo proveedor puede cumplir con la especificación técnica requerida.",
  cta: { label: "Solicitar cotización", href: "#contacto" },
  docLabel: "Expediente vigente · 2025",
  docTitle: "Adquisición de pastillas potabilizadoras de agua",
  meta: [
    { k: "Organismo", v: "Ministerio de Salud de la Nación" },
    { k: "Procedimiento", v: "Contratación directa por exclusividad" },
    { k: "Proceso", v: "COMPR.AR 80-0031-CDI25" },
    { k: "Cantidad", v: "5.000.000 de pastillas" },
    { k: "Plazo", v: "12 meses, con opción a prórroga" },
    { k: "Vida útil exigida", v: "Mínimo 36 meses" },
  ],
  note: "Requisito del pliego: certificado ANMAT vigente y sin restricciones de comercialización a la fecha de apertura de ofertas.",
} as const;

export const FAQ = {
  title: "Lo que suelen preguntarnos antes de comprar.",
  items: [
    {
      q: "¿Una tableta rinde realmente lo mismo que un limpiador líquido?",
      a: "Rinde más. Un pote de 100 tabletas de multiuso equivale a 25 litros de solución lista, contra los 500 ml de una botella de primera marca. En el limpiador de piso, 80 tabletas rinden 320 litros. La diferencia es que el líquido ya viene diluido de fábrica: se paga y se transporta el agua.",
    },
    {
      q: "¿Sirve para uso hospitalario o solo doméstico?",
      a: "Mediclean y Mediclean Plus están declarados aptos para uso doméstico y hospitalario, con protocolos de dilución diferenciados por nivel de riesgo: 1 tableta en 5 L para áreas no críticas, 4 tabletas para áreas críticas y 15 tabletas para áreas altamente contaminadas. Ambos cuentan con registro RNPUD de ANMAT.",
    },
    {
      q: "¿Cómo se manipula y qué precauciones exige?",
      a: "Las tabletas son carga no peligrosa para transporte y almacenamiento, lo que simplifica toda la cadena logística. En manipulación directa, la ficha de datos de seguridad de la línea NaDCC clasifica el producto concentrado con irritación ocular categoría 2 (H319) y posible irritación de vías respiratorias (H335): se recomienda usar guantes, evitar respirar el polvo y trabajar en lugar ventilado. Una vez diluida en agua, la solución de uso no presenta esas advertencias. Entregamos la ficha de seguridad completa con cada pedido.",
    },
    {
      q: "¿Cuánto dura el producto y cuánto dura la solución preparada?",
      a: "La tableta tiene 3 años de vida útil manteniendo su concentración intacta, porque el activo viaja en estado sólido. Una vez disuelta, la solución conserva su concentración durante 7 días. La lavandina, en comparación, declara unos 120 días y pierde cloro activo de forma continua desde el envasado.",
    },
    {
      q: "¿Qué respaldo científico tiene la eficacia declarada?",
      a: "El ensayo de poder bactericida bajo norma EN 13697 fue realizado por la Facultad de Farmacia y Bioquímica de la Universidad de Buenos Aires (protocolo N.º 5353), y verificó una destrucción superior al 99,999 % del inóculo en 5 minutos frente a cuatro microorganismos de prueba. El protocolo completo está disponible a pedido.",
    },
    {
      q: "¿Manejan volúmenes para licitaciones y contratos de abastecimiento?",
      a: "Sí. La planta de Gualeguaychú opera bajo estándares farmacéuticos y exporta a 103 países, con producciones especiales para Unilever, Diversey, Clorotec y Ecolab. La unidad logística está estandarizada en pallets de 960 unidades, y los productos cuentan con los registros ANMAT y las certificaciones que suelen exigir los pliegos públicos.",
    },
  ],
} as const;

export const CONTACT = {
  title: "Revolucionemos la limpieza juntos.",
  body: "Cotizaciones, muestras, fichas técnicas, protocolos de ensayo y condiciones para licitación. Contanos qué necesitás y te respondemos con la documentación completa.",
  email: "info@laboratoriopyam.com",
  phone: "+54 11 4717-0677",
  phoneHref: "+541147170677",
  address: ["México 964 · (B1640DLD) Martínez", "Buenos Aires, Argentina"],
  plant: "Parque industrial de Gualeguaychú, Entre Ríos",
  footer:
    "Limpieza y desinfección en tabletas efervescentes. Una marca respaldada por Laboratorio Pyam S.A.",
} as const;
