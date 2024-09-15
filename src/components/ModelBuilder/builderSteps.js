import BuildMedium from './BuildMedium.vue';
import BuildSignal from './BuildSignal.vue';
import ListSelect from '../ui/ListSelect.vue';

export default [
  {
    name: 'Геометрия',
    icon: 'mdi-cube-scan',
    component: ListSelect,
    key: 'geometry'
  },
  {
    name: 'Сигнал',
    icon: 'mdi-chart-bell-curve-cumulative',
    component: BuildSignal,
    key: 'signal'
  },
  {
    name: 'Среда',
    icon: 'mdi-waves',
    component: BuildMedium,
    key: 'medium'
  },
  {
    name: 'Антенная система',
    icon: 'mdi-antenna',
    component: BuildSignal,
    key: 'geometry'
  },
  {
    name: 'Расчет',
    icon: 'mdi-calculator',
    component: ListSelect,
    key: 'calc'
  },
  {
    name: 'Результаты',
    icon: 'mdi-chart-areaspline',
    component: BuildSignal,
    key: 'geometry'
  }
]