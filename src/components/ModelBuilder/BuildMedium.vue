<template>
  <div>
    <MapSelect v-model:points="points" v-model:figure="figure"></MapSelect>

    <v-table>
      <thead>
        <tr>
          <th>Название точки</th>
          <th>Координаты</th>
        </tr>        
      </thead>
      <tbody>
        <tr v-for="point in points" :key="point">
          <td>{{ point.name }}</td>
          <td>{{ point.coords[0] }}</td>
          <td>{{ point.coords[1] }}</td>
        </tr>
      </tbody>
    </v-table>

    <hr>
    BuildMedium: {{ points }} {{ figure }}
    <hr>
  </div>
</template>

<script setup>
import MapSelect from '../ui/MapSelect.vue';
import { ref } from 'vue';

const points = ref([ { "id": 0, "name": "q", "coords": [ 55.611040852862104, 35.717392578124496 ] }, { "id": 1, "name": "wer", "coords": [ 55.1921738156262, 39.101181640624496 ] } ])
//const points = ref([])
const figure = ref({ "type": "rect", "geometry": [ [ 55.02243020397664, 41.069125856532224 ], [ 56.38534041427115, 39.29646127306825 ], [ 56.648894605355444, 39.86883312783535 ], [ 55.295395123073696, 41.64149771129942 ] ] })

/*
watch(signal, (signal) => {
  emit('update:modelValue', {type: signal.type, ...signal[signal.type]}) 
})*/
</script>