import { reactive } from "vue";

export default class {
  ym = null
  map = null
  btnData = { content: 'Button' }

  
  get visible () { return this.data.visible }
  set visible (value) { this.data.visible = value }
  
  
  constructor (data) {
    this.data = reactive({visible: false, ...data})
  }


  setMap (ym, map) {
    this.ym = ym
    this.map = map
    if (this.afterSetMap) this.afterSetMap()
  }


  open () {
    if (this.beforeOpen) this.beforeOpen()
    this.data.visible = true; 
  }


  close () {
    if (this.beforeClose) this.beforeClose()
    this.data.visible = false;
  }


  createMapBtn () {
    const btn = new this.ym.control.Button({ data: this.btnData });
    btn.events.add('click', () => { this.open() })
    this.map.controls.add(btn, { selectOnClick: false, maxWidth: [30, 100, 150] });
  }
}
