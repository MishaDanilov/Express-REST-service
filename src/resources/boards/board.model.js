const uuid = require('uuid');

class Board {
  static instances = []
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