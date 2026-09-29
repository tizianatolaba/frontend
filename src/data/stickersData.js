export const STICKERS_DATA = [
  {
    id: "gatito-feliz",
    nombre: 'Sticker "Gatito feliz"',
    nombreCorto: 'Gatito feliz',
    precio_final: 1200,
    cuotas_cantidad: 3,
    cuotas_valor: 400,
    garantia_meses: 6,
    categoria: "Kawaii",
    descripcion: "Gatito gordito ultra tierno sonriendo con sus mejillas rosadas. Impreso en vinilo mate de alta calidad con acabado resistente al agua y a los rayones. Ideal para darle un toque dulce a tu laptop, botella de agua o cuaderno favorito.",
    image_url: "/stickers/gatito.jpg",
    tag: "Más Vendido 🔥",
    color_badge: "#FF70A6",
    acabado: "Vinilo Laminado Premium",
    tamano: "7cm x 6.5cm"
  },
  {
    id: "cafe-y-calma",
    nombre: 'Sticker "Café y calma"',
    nombreCorto: 'Café y calma',
    precio_final: 1350,
    cuotas_cantidad: 3,
    cuotas_valor: 450,
    garantia_meses: 6,
    categoria: "Relax & Vibes",
    descripcion: "Taza kawaii de café humeante en tonos lila pastel con carita alegre. La compañía perfecta para tus largas jornadas de estudio o trabajo. ¡Recordate tomar un descanso con estilo!",
    image_url: "/stickers/cafe.jpg",
    tag: "Cozy Season ☕",
    color_badge: "#A66CFF",
    acabado: "Vinilo Mate Anti-rayones",
    tamano: "6.5cm x 6.5cm"
  },
  {
    id: "dia-de-lluvia",
    nombre: 'Sticker "Día de lluvia"',
    nombreCorto: 'Día de lluvia',
    precio_final: 1100,
    cuotas_cantidad: 3,
    cuotas_valor: 367,
    garantia_meses: 6,
    categoria: "Naturaleza",
    descripcion: "Nube esponjosa con gotas de lluvia en matices pastel y un arcoíris brillante. Diseñado para almas soñadoras que disfrutan de la calma de los días lluviosos y el café calentito.",
    image_url: "/stickers/lluvia.jpg",
    tag: "Pastel Magic 🌈",
    color_badge: "#70E4C8",
    acabado: "Impermeable UV Protection",
    tamano: "7.5cm x 7cm"
  },
  {
    id: "planeta-kawaii",
    nombre: 'Sticker "Planeta kawaii"',
    nombreCorto: 'Planeta kawaii',
    precio_final: 1400,
    cuotas_cantidad: 3,
    cuotas_valor: 467,
    garantia_meses: 6,
    categoria: "Espacial",
    descripcion: "Planeta Saturno ilustrado en suaves tonos cósmicos lila y rosa con destellos de estrellitas doradas. Dale a tu tablet o termo un look verdaderamente fuera de este mundo.",
    image_url: "/stickers/planeta.jpg",
    tag: "Space Vibes ✨",
    color_badge: "#9055FF",
    acabado: "Vinilo Brillante Holográfico",
    tamano: "8cm x 6cm"
  },
  {
    id: "frase-motivadora",
    nombre: 'Sticker "Frase motivadora"',
    nombreCorto: 'Frase motivadora',
    precio_final: 1250,
    cuotas_cantidad: 3,
    cuotas_valor: 417,
    garantia_meses: 6,
    categoria: "Frases",
    descripcion: "Lettering artístico 'Todo va a estar bien' rodeado de florcitas y destellos pastel. Un abrazo visual diario para recordar que cada paso cuenta y las cosas buenas siempre llegan.",
    image_url: "/stickers/frase.jpg",
    tag: "Good Vibes 🌸",
    color_badge: "#FFD670",
    acabado: "Vinilo Troquelado",
    tamano: "7cm x 7cm"
  },
  {
    id: "dino-coquette",
    nombre: 'Sticker "Dino coquette"',
    nombreCorto: 'Dino coquette',
    precio_final: 1300,
    cuotas_cantidad: 3,
    cuotas_valor: 433,
    garantia_meses: 6,
    categoria: "Kawaii",
    descripcion: "T-Rex bebé verde pastel usando un delicado lazo rosa. La combinación perfecta entre la ferocidad jurásica y la ternura extrema. ¡Uno de los favoritos de nuestra comunidad!",
    image_url: "/stickers/dino.jpg",
    tag: "Tendencia 🎀",
    color_badge: "#4ECCA3",
    acabado: "Vinilo Mate Premium",
    tamano: "7cm x 7.5cm"
  }
];

export const CLIENTE_DEFAULT = {
  nombre: "Cliente mood Sticker",
  email: "cliente@moodsticker.com",
  telefono: "+54 9 11 4321-8765",
  ciudad: "Buenos Aires, Argentina",
  miembroDesde: "Marzo 2024",
  nivelClienta: "Fan de los Stickers ⭐"
};

export const PEDIDOS_RECIENTES = [
  {
    id: "ORD-2026-9842",
    fecha: "24 Sep 2026",
    estado: "Entregado",
    estadoColor: "#4ECCA3",
    total: 3650,
    items: [
      { id: "gatito-feliz", nombre: 'Sticker "Gatito feliz"', cantidad: 2, precio: 1200 },
      { id: "frase-motivadora", nombre: 'Sticker "Frase motivadora"', cantidad: 1, precio: 1250 }
    ]
  },
  {
    id: "ORD-2026-8711",
    fecha: "12 Ago 2026",
    estado: "En Camino 🚚",
    estadoColor: "#FFD670",
    total: 2750,
    items: [
      { id: "planeta-kawaii", nombre: 'Sticker "Planeta kawaii"', cantidad: 1, precio: 1400 },
      { id: "cafe-y-calma", nombre: 'Sticker "Café y calma"', cantidad: 1, precio: 1350 }
    ]
  }
];

export const CATEGORIAS = [
  "Todos",
  "Kawaii",
  "Relax & Vibes",
  "Naturaleza",
  "Espacial",
  "Frases"
];
