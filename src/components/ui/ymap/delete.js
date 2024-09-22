import Dialog from './dialog'

class PointDeleteDialog extends Dialog {
  constructor () { 
    super({ 
      id: null, 
      name: ''
    })
  }


  open (point) {
    this.data.visible = true; 
    this.data.id = point.id
    this.data.name = point.name
  }
  

  setDeleteDialog(dialog) {
    this.deleteDialog = dialog
  }
  

  delete() {
    if (this.deleteDialog) {
      this.deleteDialog.doDeletePoint(this.data.id)
    }
    this.close()
  }

}

export default new PointDeleteDialog()
