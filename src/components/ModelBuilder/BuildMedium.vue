<template>
  <MapSelect v-model:points="points" v-model:figure="figure"></MapSelect>
</template>

<script setup>
import MapSelect from '../ui/MapSelect.vue';
import { ref, defineProps, defineEmits, watch } from 'vue';

defineProps({
  modelValue: Object,
  config: Object
})

const points = ref([ { "id": 0, "name": "q", "coords": [ 55.611040852862104, 35.717392578124496 ] }, { "id": 1, "name": "wer", "coords": [ 55.1921738156262, 39.101181640624496 ] } ])
const figure = ref({ "type": "rect", "geometry": [ [ 55.02243020397664, 41.069125856532224 ], [ 56.38534041427115, 39.29646127306825 ], [ 56.648894605355444, 39.86883312783535 ], [ 55.295395123073696, 41.64149771129942 ] ] })

const emit = defineEmits(['update:modelValue'])

watch(points, (points) => {
  emit('update:modelValue', {points: points, figure: figure})
})

watch(figure, (figure) => {
  emit('update:modelValue', {points: points, figure: figure}) 
})

emit('update:modelValue', {points: points, figure: figure})
</script>