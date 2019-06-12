/**
 * El nombre del sitio.
 */
exports.getTitulo = function() {
    return "El Igl&uacute; de Roberto";
};

/**
 * El nombre de la sesion. Cada vez que se modifica hay que cambiar manualmente este valor
 * de la variable cookies.
 */
exports.getSessionKey = function() {
    return "user_sid";
}

/**
 * El tiempo que durara la sesion.
 */
exports.getSessionExpirationTime = function() {
    return 600000;
}

/**
 * La llave de la sesion.
 */
exports.getSessionSecret = function() {
    return "2b9083a01a5b3445027c56f8624bf8f0";
}

/**
 * Las lista de productos usada para inicializar la base de datos con valores por defecto.
 */
exports.getProductos = function() {
    var heladeras = [
    {
      imagen: "/images/dw42x.jpg",
      marca: "Electrolux",
      nombre: "Heladera No Frost Electrolux DW42X 380L Inox",
      descripcion: "Dise&ntilde;o sofisticado e innovador. Comodidad y organizaci&oacute;n: Traba botellas para mayor seguridad y organizaci&oacute;n de peque&ntilde;os recipientes.",
      precioLista: 49999,
      precioFinal: 39999,
      codigo: "DW42X",
      categorias: ["heladera", "inoxidable", "no frost"]
    },
    {
      imagen: "/images/hge455m12l.jpg",
      marca: "GE Appliances",
      nombre: "Heladera No Frost GE Appliances HGE455M12L 424L",
      descripcion: "La GE Appliances HGE455M12L cuenta con un pr&aacute;ctico y c&oacute;modo dise&ntilde;o exterior de tipo Top Mount, es decir que ubica el freezer en la parte superior y el refrigerador en la inferior.",
      precioLista: 49999,
      precioFinal: 41999,
      codigo: "HGE455M12L",
      categorias: ["heladera", "inoxidable", "touch controls", "no frost"]
    },
    {
      imagen: "/images/hsi-rt60.jpg",
      marca: "Siam",
      nombre: "Heladera No Frost Retro Siam HSI-RT60 Rojo 420L",
      descripcion: "Con su gran capacidad de 420 litros, se destaca por su exclusivo dise&ntilde;o Vintage &uacute;nico en el mercado.",
      precioLista: 61799,
      precioFinal: 45999,
      codigo: "HSI-RT60",
      categorias: ["heladera", "rojo"]
    },
    {
      imagen: "/images/e4dx.jpg",
      marca: "Ariston",
      nombre: "Heladera No Frost Ariston E4DX Quadrio 470L",
      descripcion: "Las paredes interiores de las nuevas heladeras son tratadas con iones de plata, un sistema totalmente natural para inhibir la proliferaci&oacute;n de moho y bacterias.",
      precioLista: 45250,
      precioFinal: 45250,
      codigo: "E4DX",
      categorias: ["heladera", "inoxidable", "doble puerta"]
    },
    {
      imagen: "/images/hsi-fc360xt.jpg",
      marca: "Siam",
      nombre: "Heladera No Frost Siam Combi HSI-FC360XT",
      descripcion: "Siam presenta su nueva heladera No Frost HSI-FC360XT, la m&aacute;xima expresi&oacute;n tecnol&oacute;gica para una &oacute;ptima preservaci&oacute;n de los alimentos, en un formato de renovado dise&ntilde;o, con l&iacute;neas s&uacute;per modernas y materiales de &uacute;ltima generaci&oacute;n.",
      precioLista: 49999,
      precioFinal: 41889,
      codigo: "HSI-FC360XT",
      categorias: ["heladera", "inoxidable", "touch controls"]
    },
    {
      imagen: "/images/rgs1951bgrx0.jpg",
      marca: "GE Appliances",
      nombre: "Heladera No Frost GE Appliances RGS1951BGRX0 542L",
      descripcion: "La Heladera General Electric RGS1951BGRX0 tiene eficiencia energ&eacute;tica A y panel Digital Touch. Cuenta con las funciones: Holidays, Alarm, Turbo Cool, bloqueo de panel, indicador ecol&oacute;gico y Express Chill Zone.",
      precioLista: 57117,
      precioFinal: 46999,
      codigo: "RGS1951BGRX0",
      categorias: ["heladera", "inoxidable", "touch controls"]
    },
    {
      imagen: "/images/phsb530xt.jpg",
      marca: "Philco",
      nombre: "Heladera No Frost Philco Side by Side PHSB530XT",
      descripcion: "Viene con 360 litros y el freezer en la parte superior de la heladera. Posee estantes de vidrio templado ajustables, anaqueles en puerta de tamaño intermedio y control de temperatura.",
      precioLista: 61649,
      precioFinal: 45999,
      codigo: "PHSB530XT",
      categorias: ["heladera", "inoxidable", "doble puerta", "touch controls"]
    },
    {
      imagen: "/images/pe-tm54dd.jpg",
      marca: "Peabody",
      nombre: "Heladera No Frost Peabody PE-TM54DD 545L",
      descripcion: "La nueva heladera de Peabody PE-TM54DD de acero inoxidable y sistema No Frost. Tiene un Led Touch, cuenta con un dispenser de agua, control digital con Touch Control y bandeja de hielo removible.",
      precioLista: 35500,
      precioFinal: 34500,
      codigo: "PE-TM54DD",
      categorias: ["heladera", "inoxidable", "touch controls"]
    }
    ];

    return heladeras;
};