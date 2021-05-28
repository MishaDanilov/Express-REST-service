const uuid = require('uuid');

/**
 * Board class
 */
class Board {
  static instances = []

  /**
   * Board constructor
   * @type {Board}
   * @param {string} id - instance id.
   * @param {string} title - board title.
   * @param {Array} columns - board column.
   */
  constructor({
    id = uuid.v4(),
    title = 'TITLE',
    columns = [{
      id: uuid.v4(),
      title: 'Backlog',
      order: 1
    }],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
    this.columns.map(elem => Object.assign(elem, {
      id: uuid.v4()
    }))
    Board.instances.push(this)

  }
}

module.exports = Board;