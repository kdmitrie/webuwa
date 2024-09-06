<template>
  <v-card-subtitle v-if="!signal.type">Выберите тип сигнала для просмотра</v-card-subtitle>
  <v-card-subtitle v-else-if="signal.type === 'file'">Просмотр сигнала произвольной формы недоступен</v-card-subtitle>
  <v-card-subtitle v-else-if="plot === false">Выберите корректные параметры сигнала</v-card-subtitle>
  <v-sparkline v-else
    :model-value="plot"
    color="primary"
    height="100"
    padding="10"
    line-width="1"
  />
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  signal: Object
})

const plotFunctions = {
  u2m: {
    sec: 1,
    ms: 1e-3,
    mks: 1e-6
  },

  monochrom: function (t, ) {
    return Math.sin(2 * Math.PI * t)
  },

  _rect: function (t) {
    return Math.abs(t) < 0.5 ? 1 : 0
  },

  _gauss: function (t, sigma=0.5) {
    return 1/(Math.sqrt(2 * Math.PI * sigma * sigma)) * Math.exp( -Math.pow(t, 2) / 2 / sigma / sigma)
  },

  _sin: function (t) {
    return this.monochrom(0.5 * t) * this._rect(0.5 * t)
  },

  _delta: function (t) {
    return t == 0 ? 1 : 0
  },

  impulse: function (t, param) {
    return param.shape ? this['_' + param.shape](t) : NaN
  },

  packet: function (t, param) {
    if (!param.duration || !param.freq) return NaN
    const envelope = this.impulse(t / 5, param)
    const freq1 = Math.min(200, (Number(param.freq) + Number(param.deviation)) * Number(param.duration) * this.u2m[param.units])
    const freq2 = Math.min(200, (Number(param.freq) - Number(param.deviation)) * Number(param.duration) * this.u2m[param.units])
    const freq = Math.max(0, (freq1 + freq2) / 2 + (freq1 - freq2) * t )
    return envelope * this.monochrom(t / 5 * freq)
  },

  file: (t, ) => Math.cos(2 * Math.PI * t )
}

const plot = computed(() => {
  let plot = []
  for(let n = 0; n < 10000; n++)
  {
    let y = plotFunctions[props.signal.type](n / 1000 - 5, props.signal[props.signal.type])
    if (isNaN(y)) return false
    plot.push(y)
  }
  return plot
})
</script>
