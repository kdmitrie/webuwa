const geometries = [
  {
    name: '2D',
    text: 'Двумерная задача',
    icon: 'mdi-ellipse-outline',
  },
  {
    name: '2D-AS',
    text: 'Цилиндрически симметричная задача',
    icon: 'mdi-cylinder',
  },
  {
    name: '3D',
    text: 'Трехмерная задача',
    icon: 'mdi-cube-outline',
  }
]

export default {
  geometry: geometries,
  signal: {
    timeUnits: [
      {value: 'sec', title: 'сек'},
      {value: 'ms', title: 'мс'},
      {value: 'mks', title: 'мкс'}
    ],
    impulseShape: [
      {value: 'rect', title: 'прямоугольная'},
      {value: 'gauss', title: 'гауссовская'},
      {value: 'sin', title: 'синусоидальная'},
      {value: 'delta', title: 'δ-образная'}
    ],
    envelopeShape: [
      {value: 'rect', title: 'прямоугольная'},
      {value: 'gauss', title: 'гауссовская'},
    ],
  },
  calc: geometries
}