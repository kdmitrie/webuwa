<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Тип сигнала</v-card-title>
          <v-radio-group v-model="signal.type">
            <v-radio label="Монохроматический" value="monochrom" />
            <v-radio label="Одиночный импульс" value="impulse" />
            <v-radio label="Волновой пакет" value="packet" />
            <v-radio label="Произвольная форма" value="file" />
          </v-radio-group>

          <v-card-title v-if="signal.type">Параметры сигнала</v-card-title>

          <v-container v-if="signal.type=='monochrom'">
            <v-row align="center">
              <v-col cols="12" sm="6">
                <v-text-field label="Частота" type="number" density="compact" v-model="signal.monochrom.freq" :rules="[rulePositive]"/>
              </v-col>
              <v-col cols="12" sm="6">
                <v-input>Гц</v-input>
              </v-col>
            </v-row>
          </v-container>


          <v-container v-if="signal.type=='impulse'">
            
            <v-select  label="Форма импульса" type="number" density="compact" :items="config.impulseShape" v-model="signal.impulse.shape"/>

            <v-row>
              <v-col>
                <v-text-field  label="Длительность" type="number" density="compact" v-model="signal.impulse.duration" :rules="[rulePositive]"/>
              </v-col>
              <v-col>
                <v-select  label="" type="number" density="compact" :items="config.timeUnits" v-model="signal.impulse.units"/>
              </v-col>
            </v-row>
          </v-container>


          <v-container v-if="signal.type=='packet'">
            <v-select  label="Форма огибающей" type="number" density="compact" :items="config.envelopeShape" v-model="signal.packet.shape"/>
            <v-row>
              <v-col>
                <v-text-field  label="Длительность" type="number" density="compact" v-model="signal.packet.duration" :rules="[rulePositive]"/>
              </v-col>
              <v-col>
                <v-select  label="" type="number" density="compact" :items="config.timeUnits" v-model="signal.packet.units"/>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="12" sm="6">
                <v-text-field label="Центральная частота" type="number" density="compact" v-model="signal.packet.freq" :rules="[rulePositive]"/>
              </v-col>
              <v-col cols="12" sm="6">
                <v-input>Гц</v-input>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="12" sm="6">
                <v-text-field label="Девиация" type="number" density="compact" v-model="signal.packet.deviation" :rules="[ruleNonNegative]"/>
              </v-col>
              <v-col cols="12" sm="6">
                <v-input>Гц</v-input>
              </v-col>
            </v-row>
          </v-container>


          <v-container v-if="signal.type=='file'">
            <v-file-input label="Загрузка файла" density="compact" v-model="signal.file"/>
          </v-container>

        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Просмотр сигнала</v-card-title>
          <v-sparkline
            :model-value="plot"
            color="primary"
            height="100"
            padding="10"
            line-width="1"
            class="plot1"
            v-if="signal.type!='file'"
          />
          <v-card-subtitle v-else>Просмотр сигнала произвольной формы недоступен</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <hr>
    {{ signal }}
    <hr>
  </v-container>
</template>

<script setup>
import { defineProps, defineEmits, reactive, watch } from 'vue';

defineProps({
  modelValue: Object,
  config: Object
})

const emit = defineEmits(['update:modelValue'])

const signal = reactive({
  type: null,
  monochrom: {
    freq: null
  },
  impulse: {
    shape: null,
    duration: null,
    units: null,
  },
  packet: {
    shape: null,
    duration: null,
    units: null,
    freq: null,
    deviation: 0
  },
  file: {},
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

let plot = []
watch(signal, (signal) => {
  emit('update:modelValue', {type: signal.type, ...signal[signal.type]}) 

  plot = []
  for(let n = 0; n < 10000; n++)
  {
    plot.push(plotFunctions[signal.type](n / 1000 - 5, signal[signal.type]))
  }
})

const rulePositive = (val) => val > 0 ? true : 'Значение должно быть положительно'
const ruleNonNegative= (val) => val >= 0 ? true : 'Значение должно быть неотрицательно'

</script>

<style scoped>

</style>