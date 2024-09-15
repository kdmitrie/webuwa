<template>
  <div>
    <v-card>
      <ul>
        <li>Для пространства 2D-AS нужно указать начало и конец трассы</li>
        <li>Для пространства 3D нужно задать область моделирования и указать все точки в ней, где проводились измерения</li>
      </ul>
      <div id="map" style="width: 100%; height: 400px"></div>
    </v-card>

    <v-dialog v-model="mapCenterDialog.visible" width="auto">
      <v-card
        max-width="400"
        prepend-icon="mdi-image-filter-center-focus"
        title="Центр карты"
        text="Укажите координаты центра карты"
      >
        <div class="pl-4 pr-4">
          <CoordinatesSelect v-model="mapCenterDialog.data.coords"/>
        </div>

        <template v-slot:actions>
          <v-btn color="primary" text="Сохранить" @click="mapCenterDialog.saveClose()" />
          <v-btn class="ms-auto" text="Отмена" @click="mapCenterDialog.close()" />
        </template>
      </v-card>
    </v-dialog>
  
    <v-dialog v-model="mapPointDialog.visible" width="auto">
      <v-form ref="mapPointDialogForm">
        <v-card
          max-width="400"
          prepend-icon="mdi-image-filter-center-focus"
          :title="mapPointDialog.data.id !== null ? 'Точка &quot;' + mapPointDialog.data.name + '&quot;' : 'Новая точка'"
          text="Укажите параметры точки"
        >
          <div class="pl-4 pr-4">
            <v-text-field 
              label="Имя точки" 
              type="text" 
              density="compact" 
              v-model.trim="mapPointDialog.data.newName" 
              :rules="[ruleNonEmpty]"
              />

            <CoordinatesSelect v-model="mapPointDialog.data.newCoords"/>
          </div>
          <template v-slot:actions>
            <v-btn 
              color="primary" 
              :text="mapPointDialog.data.id  !== null ? 'Сохранить' : 'Добавить'" 
              @click="mapPointDialog.pushPoint()" 
              />

            <v-btn class="ms-auto" text="Отмена" @click="mapPointDialog.close()" />
          </template>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, defineModel, watch } from 'vue';
import CoordinatesSelect from '../ui/CoordinatesSelect.vue'
import { ruleNonEmpty } from '@/utils/inputRules';

import mapCenterDialog from './ymap/center'
import mapPointDialog from './ymap/points'
import mapFiguresDialog from './ymap/figures'

const points = defineModel('points')
const figure = defineModel('figure')

const mapPointDialogForm = ref(null)
const mapPointList = reactive(points.value)
const mapFigureGeometry = reactive(figure.value)
let map = null;


function loadScript (onLoad) {
  let ymScript = document.createElement('script')
  ymScript.setAttribute('src', `https://api-maps.yandex.ru/2.1/?apikey=${process.env.VUE_APP_YM_KEY}&lang=ru_RU`)
  ymScript.setAttribute('type', 'text/javascript')
  ymScript.onload = onLoad
  document.head.appendChild(ymScript)
}


function createMap () {
  // eslint-disable-next-line
  const ym = ymaps

  ym.ready(init);
  function init() {
    map = new ym.Map("map", {
      center: [process.env.VUE_APP_YM_LATITUDE, process.env.VUE_APP_YM_LONGITUDE],
      zoom: 7,
      controls: ['zoomControl', 'typeSelector',  'fullscreenControl', 'rulerControl']
    });

    mapFiguresDialog.setMap(ym, map)
    mapFiguresDialog.createMapBtn()
    //mapFiguresDialog.geometry = mapFigureGeometry
    mapFiguresDialog.setGeometry(mapFigureGeometry)


    mapPointDialog.setMap(ym, map)
    mapPointDialog.createMapBtn()
    mapPointDialog.form = mapPointDialogForm
    mapPointDialog.setPointList(mapPointList)
    

    mapCenterDialog.setMap(ym, map)
    mapCenterDialog.createMapBtn()
  }
}

onMounted(() => { loadScript(createMap) })

watch(mapPointList, () => { points.value = mapPointList.filter((point) => point) })
watch(mapFigureGeometry, () => { figure.value = mapFigureGeometry.type ? mapFigureGeometry : {} })
</script>
