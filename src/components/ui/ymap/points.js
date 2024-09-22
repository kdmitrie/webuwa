import Dialog from './dialog'
import { watch } from 'vue'
import { inside } from './inside'

class MapPointDialog extends Dialog {
  btnData = {
    content: 'Новая точка',
    title: 'Создать новую точку',
    image: 'data:image/png;base64,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',
  }

  placeMarkList = []
  pointList = []
  form = null


  constructor () { 
    super({ 
      id: null, 
      name: '', 
      coords: [], 
      newName: '', 
      newCoords: [] 
    })
  }


  setDeleteDialog(dialog) {
    this.deleteDialog = dialog
  }


  setFigureGeometry (figure) {
    this.figure = figure
    watch(this.figure, () => { this.figureUpdate() })
  }


  figureUpdate () {
    for (let pointId=0; pointId < this.pointList.length; pointId++) {
      this.updatePointStyle (pointId)
    }
  }


  setPointList (pointList) {
    for (const k in pointList) {
      this.createPoint(pointList[k])
    }
    this.pointList = pointList
  }


  afterSetMap () {
    this.ym.__editPoint = (id) => {return this.editPoint.call(this, id) }
    this.ym.__deletePoint = (id) => { return this.deletePoint.call(this, id) }
  }


  beforeOpen () {
    Object.assign(this.data.newCoords, this.map.getCenter());
  }


  afterDrag (pointId, coords) {
    this.pointList[pointId].coords = coords
    this.updatePointStyle(pointId)
  }


  createPoint (item=null) {
    if (item === null) {
      item = {
        id: Object.keys(this.pointList).length,
        name: this.data.newName,
        coords: this.data.newCoords,
        inside: null
      }
    }

    const pmContent = `<div class="pm-content">
      <a href="#" onclick="return ymaps.__editPoint(${item.id})">Редактировать точку</a>
      <br/>
      <a href="#" onclick="return ymaps.__deletePoint(${item.id})">Удалить точку</a></div>`

    const pm = new this.ym.Placemark(item.coords, { balloonContentBody: pmContent, balloonContentHeader: item.name, iconCaption: item.name }, 
      { preset: "islands#blueDotIcon", draggable: true });
    this.map.geoObjects.add(pm);

    pm.events.add('drag', (e) => { this.afterDrag(item.id, e.get('target').geometry.getCoordinates()) });
    pm.events.add('dragend', (e) => { this.afterDrag(item.id, e.get('target').geometry.getCoordinates()) });

    this.placeMarkList.push(pm)
    this.pointList.push(item)
    this.updatePointStyle(item.id)
  }


  updatePoint() {
    const pm = this.placeMarkList[this.data.id]
    pm.properties.set('balloonContentHeader', this.data.newName)
    pm.properties.set('iconCaption', this.data.newName)
    pm.geometry.setCoordinates(this.data.newCoords)
    pm.balloon.close()

    this.pointList[this.data.id].name = this.data.newName
    this.pointList[this.data.id].coords = this.data.newCoords
    this.updatePointStyle(this.data.id)
  }


  updatePointStyle (pointId) {
    if (!this.pointList[pointId]) return;
    
    this.pointList[pointId].inside = inside(this.pointList[pointId].coords, this.figure)
    const color = this.pointList[pointId].inside ? 'blue' : 'red'
    this.placeMarkList[pointId].options.set('preset', `islands#${color}DotIcon`)
  }


  async pushPoint () {
    if (this.form && !(await this.form.value.validate()).valid)
      return false;
  
    if (this.data.id === null) 
      this.createPoint()
    else
      this.updatePoint()

    this.close()
  }
  

  editPoint (id) {
    Object.assign(this.data, { visible: true, id: id, ...this.pointList[id], newName: this.pointList[id].name, newCoords: this.pointList[id].coords } )
    return false
  }

  
  deletePoint (id) {
    this.deleteDialog.open(this.pointList[id])
    return false
  }
  
  
  doDeletePoint (id) {
    this.map.geoObjects.remove(this.placeMarkList[id]);
    this.pointList[id] = null
  }

}



export default new MapPointDialog()
