<template>
  <div class="d-flex mb-6 justify-space-between">
    <v-card class="flex-shrink-0 pa-6 pl-0 pt-0" variant="flat" title="Постановка задачи">
      <v-timeline side="end" align="start">
        <v-timeline-item 
          v-for="step in steps" 
          :value="step.name" 
          :key="step.name" 
          size="x-small" 
          dot-color="grey"
          link
          @click="tab = step.name">
        
          <div class="clickable">
            {{ step.name }}
          </div>
          <ul>
            <li><small>{{ projectModel.geometry }}</small></li>
            <li><small>{{ projectModel.signal }}</small></li>
            <li><small>1</small></li>
          </ul>
        </v-timeline-item>
      </v-timeline>
    </v-card>
    
    <v-card class="flex-grow-1" variant="flat">
      <v-tabs v-model="tab">
        <v-tab v-for="step in steps" :value="step.name" :key="step.name" >
          <v-icon :icon="step.icon"></v-icon>
          {{ step.name }}
        </v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item v-for="step in steps" :value="step.name" :key="step.name">
          <component 
            :is="step.component" 
            :data="projectModel[step.key]" 
            @changeqq="onChange"/>
        </v-tabs-window-item>
      </v-tabs-window>
      
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import BuildGeometry from './BuildGeometry.vue';
import BuildSignal from './BuildSignal.vue';

const projectModel = {
  geometry: '3D',
  signal: '2D-AS',
}

function onChange(a, event) {
  console.log(a, event)
}

const steps = [
  {
    name: 'Геометрия',
    icon: 'mdi-cube-scan',
    component: BuildGeometry,
    key: 'geometry'
  },
  {
    name: 'Сигнал',
    icon: 'mdi-chart-bell-curve-cumulative',
    component: BuildGeometry,
    key: 'signal'
  },
  {
    name: 'Среда',
    icon: 'mdi-waves',
    component: BuildSignal,
    key: 'geometry'
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
    component: BuildSignal,
    key: 'geometry'
  },
  {
    name: 'Результаты',
    icon: 'mdi-chart-areaspline',
    component: BuildSignal,
    key: 'geometry'
  }
]

const tab = ref(null)


</script>

<style scoped>
.clickable { 
  cursor: pointer;
  text-decoration: underline;

}
</style>