import Dialog from './dialog'

class MapFiguresDialog extends Dialog {
  _fig = null
  geometry = {type: null, geometry: []}


  setGeometry (geometry) {
    this.geometry = geometry
    let fig
    if (geometry.type == 'circle')
      fig = new this.ym.Circle(geometry.geometry);
    else
      fig = new this.ym.Polygon([[]])
      fig.geometry.setCoordinates([[...geometry.geometry, geometry.geometry[0]]])
    fig.type = geometry.type
    this.replaceFigure (fig)
  }


  createFigure (type) {
    let l, b, r, t, fig;
    [[l, b], [r, t]] = this.map.getBounds()
    const w = (r - l) / 4
    const h = (t - b) / 4

    if (type == 'circle')
      fig = new this.ym.Circle([[(l + r) / 2, (b + t)/2], 111000 * Math.min(r - l, t - b) / 4]);
    else
      fig = new this.ym.Polygon([[ [l + w, t - h], [l + w, b + h], [r - w, b + h], [r - w, t - h], [l + w, t - h], ]]);
    fig.type = type
    return fig
  }


  replaceFigure (fig) {
    if (this._fig) {
      this.map.geoObjects.remove(this._fig)
    }
    if (fig) {
      this.map.geoObjects.add(fig)
      fig.editor.startFraming();
      fig.geometry.events.add('change', () => { this.changeFigure.call(this, fig) })
    }
    this.changeFigure(fig)
    this._fig = fig
  }


  changeFigure (fig) {
    if (!fig) {
      Object.assign(this.geometry, {type: null, geometry: []})
      return
    }

    let geom = fig.geometry.getCoordinates()
    if (fig.type == 'circle') {
      geom = [geom, fig.geometry.getRadius()]
    } else {
      geom = [geom[0][0], geom[0][1], geom[0][2], geom[0][3]]
    }
    Object.assign(this.geometry, { type: fig.type, geometry: geom })
  }


  selectListItem (event, figureList, type, other) {
    let fig = null
    if (event.get('target').state.get('selected') !== true) {
      fig = this.createFigure(type)
      figureList.collapse()
    }
    this.replaceFigure(fig)      
    other.state.set('selected', false)
  }


  createMapBtn () {
    const itemRect = new this.ym.control.ListBoxItem('Прямоугольник')
    const itemCircle = new this.ym.control.ListBoxItem('Круг')
    
    itemRect.type = 'rect'
    itemRect.other = itemCircle

    itemCircle.type = 'circle'
    itemCircle.other = itemRect
    
    const figureList = new this.ym.control.ListBox({
      data: {
        content: 'Область',
        title: 'Задать область проведения измерений',
        image: 'data:image/png;base64,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'
      },
      items: [ itemRect, itemCircle ]
    });

    itemRect.events.add('click', (e) => { this.selectListItem.call(this, e, figureList, 'rect', itemCircle) })
    itemCircle.events.add('click', (e) => { this.selectListItem.call(this, e, figureList, 'circle', itemRect) })

    this.map.controls.add(figureList, { floatIndex: 0, selectOnClick: false, maxWidth: [30, 100, 150] });
  }

}

export default new MapFiguresDialog()
