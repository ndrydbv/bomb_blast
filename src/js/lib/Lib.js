export default class Lib {
  static distance (a, b = { x: 0, y: 0 }) {
    return Math.hypot(a.x - b.x, a.y - b.y)
  }

  static randomInteger (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min))
  }

  static arrShuffle (arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }

    return arr
  }

  static getGroup (field, row, col, id) {
    const arr = [{ row, col }]
    field[row][col] = '0'

    if (field?.[row - 1]?.[col] === id) {
      arr.push(...this.getGroup(field, row - 1, col, id))
    }
    if (field?.[row + 1]?.[col] === id) {
      arr.push(...this.getGroup(field, row + 1, col, id))
    }
    if (field[row][col - 1] === id) {
      arr.push(...this.getGroup(field, row, col - 1, id))
    }
    if (field[row][col + 1] === id) {
      arr.push(...this.getGroup(field, row, col + 1, id))
    }

    return arr
  }

  static getTileTop (field, row, col) {
    if (!row) return false

    if (field[row - 1][col] === '0' || field[row - 1][col] === 'X') {
      return this.getTileTop(field, row - 1, col)
    }

    return { row: row - 1, col }
  }

  static getBomb (field, row, col, id) {
    const group = [
      [0, -1],
      [1, -1],
      [1, 0],
      [1, 1],
      [0, 1],
      [-1, 1],
      [-1, 0],
      [-1, -1]
    ]
    const arr = [{ row, col }]
    let R = row
    let C = col

    field[R][C] = '0'

    for (let i = 0; i < group.length; i++) {
      R = row + group[i][0]
      C = col + group[i][1]

      if (field?.[R]?.[C]) {
        if (field[R][C] === '0' || field[R][C] === 'X') continue

        if (field[R][C] === id) {
          field[R][C] = '0'
          arr.push(...this.getBomb(field, R, C, id))
          continue
        }

        field[R][C] = '0'
        arr.push({ row: R, col: C })
      }
    }

    return arr
  }
}
