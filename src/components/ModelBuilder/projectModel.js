import { reactive } from 'vue';
import config from './builderConfig.js'

const configValues = (obj) => obj.map((item) => item.value)
const configKVPairs = (obj) => obj.reduce(function (prev, pair) { prev[pair.value] = pair.title; return prev }, {})

const stringUCFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1, )

class PropertiesModel {
  data = null
  check () { return false }
  describe () { return  [1, 2] }
}


class GeometryModel extends PropertiesModel {
  check () {
    return this.data != null
  }

  describe () {
    if (!this.check()) return []
    return this.data === null ? [] : [`Пространство ${this.data}`]
  }
}


class SignalModel extends PropertiesModel {
  check () {
    if (this.data === null || this.data.type === null) return false

    switch (this.data.type) {
      case 'monochrom':
        return Number(this.data.freq) > 0
      case 'impulse':
        return (configValues(config.signal.impulseShape).includes(this.data.shape) && 
                (Number(this.data.duration) > 0) && 
                configValues(config.signal.timeUnits).includes(this.data.units))
      case 'packet':
        return (configValues(config.signal.envelopeShape).includes(this.data.shape) && 
                (Number(this.data.duration) > 0) && 
                configValues(config.signal.timeUnits).includes(this.data.units) && 
                (Number(this.data.freq) > 0)  && 
                (Number(this.data.deviation) >= 0) &&
                (Number(this.data.deviation) < Number(this.data.freq)))
      case 'file':
      break;
      default:
        return false
    }
  }

  describe () {
    if (!this.check()) return []

    const timeUnits = configKVPairs(config.signal.timeUnits)
    const envelopeShape = configKVPairs(config.signal.envelopeShape)
    const impulseShape = configKVPairs(config.signal.impulseShape)

    switch (this.data.type) {
      case 'monochrom':
        return ['Монохроматический', 
                `Частота ${Number(this.data.freq)} Гц`]
      case 'impulse': {
        return ['Импульс', 
                `${stringUCFirst(impulseShape[this.data.shape])} форма`, 
                `Длительность ${Number(this.data.duration)} ${timeUnits[this.data.units]}`]
      }
      case 'packet': {
        return ['Пакет', 
                `${stringUCFirst(envelopeShape[this.data.shape])} огибающая`, 
                `Длительность ${Number(this.data.duration)} ${timeUnits[this.data.units]}`,
                `Частота ${Number(this.data.freq)} ${this.data.deviation > 0 ? '± ' + Number(this.data.deviation) : ''} Гц`]
      }
      case 'file':
      break;
      default:
        return []
    }  
  }
}


class ProjectModel {
  geometry = new GeometryModel()
  signal = new SignalModel()
  calc = new GeometryModel()
}

/*
class ProjectModel1 {
  geometry = null
  signal = null
  calc = null

  check (key) {
    const check = 'check' + key.charAt(0).toUpperCase() + key.slice(1)
    if (!(check in this)) return false
    return this[check]()
  }

  describe (key) {
    const describe = 'describe' + key.charAt(0).toUpperCase() + key.slice(1)
    if (!(describe in this)) return []
    return this[describe]()
  }

  checkGeometry () {
    return this.geometry != null
  }

  checkSignal () {
    if (this.signal === null || this.signal.type === null) return false

    switch (this.signal.type) {
      case 'monochrom':
        return Number(this.signal.freq) > 0
      case 'impulse':
        return (configValues(config.signal.impulseShape).includes(this.signal.shape) && 
                (Number(this.signal.duration) > 0) && 
                configValues(config.signal.timeUnits).includes(this.signal.units))
      case 'packet':
        return (configValues(config.signal.envelopeShape).includes(this.signal.shape) && 
                (Number(this.signal.duration) > 0) && 
                configValues(config.signal.timeUnits).includes(this.signal.units) && 
                (Number(this.signal.freq) > 0)  && 
                (Number(this.signal.deviation) >= 0))
      case 'file':
      break;
      default:
        return false
    }
  }

  describeGeometry () {
    return this.geometry === null ? [] : [`Пространство ${this.geometry}`]
  }

  describeSignal () {
    if (this.signal === null || this.signal.type === null) return []

    switch (this.signal.type) {
      case 'monochrom':
        return Number(this.signal.freq) > 0
      case 'impulse':
        return (['rect', 'gauss', 'sin', 'delta'].includes(this.signal.shape) && 
                (Number(this.signal.duration) > 0) && 
                ['sec', 'ms', 'mks'].includes(this.signal.units))
      case 'packet':
        return (['rect', 'gauss'].includes(this.signal.shape) && 
                (Number(this.signal.duration) > 0) && 
                ['sec', 'ms', 'mks'].includes(this.signal.units) && 
                (Number(this.signal.freq) > 0)  && 
                (Number(this.signal.deviation) >= 0))
      case 'file':
      break;
      default:
        return []
    }  
  }
}*/

//new ProjectModel1()


const projectModel = reactive(new ProjectModel)

export default projectModel;