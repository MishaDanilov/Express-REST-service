const uuid = require('uuid');

/**
 * Task class
 */
class Task {
  static instances = []
  
  /**
   * Task constructor
   * @type {Task}
   * @param {string} id - instance id.
   * @param {string} title - task title.
   * @param {number} order - task order.
   * @param {string} description - task description.
   * @param {string|null} userId - task owner's user id.
   * @param {string|null} columnId - task's column id.
   * @param {string|null} boardId - tasks's board id.
   */
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