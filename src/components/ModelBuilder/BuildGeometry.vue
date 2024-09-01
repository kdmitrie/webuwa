<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="4" v-for="item in geometries" :key="item.name">
        <v-card 
          variant="elevated" 
          :prepend-icon="item.icon" 
          :title="item.name" 
          :color="geometry == item.name ? 'primary' : ''"
          link
          @mouseup="changeGeometry(item)"
          >
          <v-card-text>
            {{ item.text }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  {{ geometry}}
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
  data: String
})

const emit = defineEmits(['change'])

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

const geometry = ref(props.data)

const changeGeometry = ref((item) => {
  if(geometry.value != item.name) { 
    emit('change', item.name) 
  }
})

</script>

<style lang="scss" scoped>

</style>