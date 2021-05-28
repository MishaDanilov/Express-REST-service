const uuid = require('uuid');

class Task {
  static instances = []
  
  constructor({
    id = uuid.v4(),
    title = 'title',
    order = 0,
    description = 'Lorem ipsum',
    userId = null,
    columnId = null,
    boardId = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
    Task.instances.push(this)
  }

}

module.exports = Task;