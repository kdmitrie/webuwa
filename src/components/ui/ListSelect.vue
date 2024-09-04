<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="4" v-for="item in config" :key="item.name">
        <v-card 
          variant="elevated" 
          :prepend-icon="item.icon" 
          :title="item.name" 
          :color="modelValue == item.name ? 'primary' : ''"
          link
          @mouseup="change(item)"
          >
          <v-card-text>
            {{ item.text }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  config: Array,
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const change = (item) => {
  emit('update:modelValue', item.name) 
}
</script>
