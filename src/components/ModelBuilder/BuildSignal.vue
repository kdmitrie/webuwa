<template>
  <v-form ref="inputForm">
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
                  <v-text-field label="Частота" type="number" min="0" density="compact" v-model="signal.monochrom.freq" :rules="[rulePositive]"/>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-input>Гц</v-input>
                </v-col>
              </v-row>
            </v-container>


            <v-container v-if="signal.type=='impulse'">
              <v-select label="Форма импульса" density="compact" :items="config.impulseShape" v-model="signal.impulse.shape"/>
              <v-row>
                <v-col>
                  <v-text-field label="Длительность" type="number" min="0" density="compact" v-model="signal.impulse.duration" :rules="[rulePositive]"/>
                </v-col>
                <v-col>
                  <v-select label="" density="compact" :items="config.timeUnits" v-model="signal.impulse.units"/>
                </v-col>
              </v-row>
            </v-container>


            <v-container v-if="signal.type=='packet'">
              <v-select label="Форма огибающей" density="compact" :items="config.envelopeShape" v-model="signal.packet.shape"/>
              <v-row>
                <v-col>
                  <v-text-field label="Длительность" type="number" min="0" density="compact" v-model="signal.packet.duration" :rules="[rulePositive]"/>
                </v-col>
                <v-col>
                  <v-select label="" density="compact" :items="config.timeUnits" v-model="signal.packet.units"/>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" sm="6">
                  <v-text-field label="Центральная частота" type="number" min="0" density="compact" v-model="signal.packet.freq" :rules="[rulePositive]"
                  @change="$refs.deviation.validate()"/>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-input>Гц</v-input>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" sm="6">
                  <v-text-field ref="deviation" label="Девиация" type="number" min="0" density="compact" v-model="signal.packet.deviation" :rules="[ruleNonNegative, ruleDeviation]"/>
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

            <SignalViewer :signal="signal"/>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup>
import { defineProps, defineEmits, reactive, watch } from 'vue';
import SignalViewer from '../ui/SignalViewer.vue';
import { rulePositive, ruleNonNegative } from '../../utils/inputRules';

defineProps({
  modelValue: Object,
  config: Object
})

const emit = defineEmits(['update:modelValue'])
const ruleDeviation = (val) => Number(val) < Number(signal.packet.freq) ? true : 'Девиация должна быть меньше центральной частоты'

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

watch(signal, (signal) => {
  emit('update:modelValue', {type: signal.type, ...signal[signal.type]}) 
})

</script>
