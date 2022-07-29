export default class SceneManager {
  constructor (stage) {
    this.stage = stage
    this.current = false
    this.layers = []
  }

  add (name, scene) {
    if (this.hasOwnProperty(name)) {
      console.log(`Scene ${name} is already exists`)
      return
    }
    this[name] = scene
  }

  addLayer (name, options) {
    if (!this.hasOwnProperty(name)) {
      console.log(`Scene ${name} is not found`)
      return
    }
    const layer = new this[name](options)
    this.layers.push(layer)
    this.stage.addChild(layer)
  }

  start (name, options) {
    if (!this.hasOwnProperty(name)) {
      console.log(`Scene ${name} is not found`)
      return
    }
    this.stage.removeChildren()
    this.layers = []
    this.current = new this[name](options)
    this.stage.addChild(this.current)
  }

  remove (name) {
    if (!this.hasOwnProperty(name)) {
      console.log(`Scene ${name} is not found`)
      return
    }
    delete this[name]
  }
}
