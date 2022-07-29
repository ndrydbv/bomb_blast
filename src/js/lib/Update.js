export default class Update {
  constructor () {
    this.updates = []
  }

  get get () {
    return this.updates
  }

  add (fn) {
    if (!this.check(fn)) {
      this.updates.push(fn)
    }
  }

  remove (fn) {
    const idx = this.updates.findIndex((el) => el === fn)
    if (idx !== -1) this.updates.splice(idx, 1)
  }

  check (fn) {
    return this.updates.findIndex((el) => el === fn) !== -1
  }
}
