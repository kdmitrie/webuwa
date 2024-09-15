<template>
  <div class="d-flex mb-6 justify-space-between">
    <v-card class="flex-shrink-0 pa-6 pl-0 pt-0" variant="flat" title="Постановка задачи">
      <v-timeline side="end" align="start">
        <v-timeline-item 
          v-for="step in steps" 
          :value="step.name" 
          :key="step.name" 
          size="x-small" 
          :dot-color="projectModel[step.key].check() ? 'success' : 'warning'"
          link
          @click="tab = step.key">
        
          <div class="clickable">
            {{ step.name }}
          </div>
          <ul>
            <li v-for="item in projectModel[step.key].describe()" :key="item"><small> {{ item  }} </small></li>
          </ul>
        </v-timeline-item>
      </v-timeline>
    </v-card>
    
    <v-card class="flex-grow-1" variant="flat">
      <v-tabs v-model="tab">
        <v-tab v-for="step in steps" :value="step.key" :key="step.name" >
          <v-icon :icon="step.icon"></v-icon>
          {{ step.name }}
        </v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item v-for="step in steps" :value="step.key" :key="step.name">
          <component 
            :is="step.component" 
            :config="config[step.key]" 
            v-model="projectModel[step.key].data" />
        </v-tabs-window-item>
      </v-tabs-window>

      {{ projectModel }}
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import config from './builderConfig.js'
import steps from './builderSteps';
import projectModel from './projectModel.js';

const tab = ref('medium')
</script>

<style scoped>
.clickable { 
  cursor: pointer;
  text-decoration: underline;
}
</style>