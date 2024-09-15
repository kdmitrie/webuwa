<template>
    <v-text-field 
      label="Широта" 
      type="number" 
      step="1e-1" 
      min="0" 
      max="90" 
      density="compact" 
      :modelValue="point.latitude" 
      @update:modelValue="onChangeLatitude" 
      :rules="[ruleNonNegative]"
      />

    <v-select 
      density="compact" 
      :items="latitudeList" 
      :modelValue="point.latitude_type" 
      @update:modelValue="onChangeLatitudeType" 
      />

    <v-text-field 
      label="Долгота" 
      type="number" 
      step="1e-1" 
      min="0" 
      max="180"  
      density="compact" 
      :modelValue="point.longitude" 
      @update:modelValue="onChangeLongitude" 
      :rules="[ruleNonNegative]"
      />

    <v-select  
      density="compact" 
      :items="longitudeList" 
      :modelValue="point.longitude_type"
      @update:modelValue="onChangeLongitudeType" 
      />
</template>

<script setup>
import { defineModel, computed } from 'vue';
import { ruleNonNegative } from '../../utils/inputRules'

const model = defineModel()

const latitudeList = [
  {value: 'N', title: 'Северная'},
  {value: 'S', title: 'Южная'}
]

const longitudeList = [
  {value: 'W', title: 'Западная'},
  {value: 'E', title: 'Восточная'},
]

const point = computed(() => {
  return {
    latitude: Math.round((Math.abs(model.value[0]) + Number.EPSILON) * 1e7) / 1e7,
    latitude_type: model.value[0] > 0 ? 'N' : 'S',
    longitude: Math.round((Math.abs(model.value[1]) + Number.EPSILON) * 1e7) / 1e7,
    longitude_type: model.value[1] > 0 ? 'E' : 'W'
  }
})

function onChangeLatitude(value) {
  model.value[0] = value * Math.sign(model.value[0])
}

const onChangeLatitudeType = (value) => {
  model.value[0] = (value == 'N' ? 1 : -1) * Math.abs(model.value[0])
}

function onChangeLongitude(value) {
  model.value[1] = value * Math.sign(model.value[1])
}

const onChangeLongitudeType = (value) => {
  model.value[1] = (value == 'E' ? 1 : -1) * Math.abs(model.value[1])
}


</script>