const uuid = require('uuid');

/**
 * User class
 */
class User {
  static instances = []

  /**
   * User constructor.
   * @type {User}
   * @param {string} id - user id.
   * @param {string} name - user name.
   * @param {string} login - user login.
   * @param {string} password - user password.
   */
  constructor({
    id = uuid.v4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
    User.instances.push(this)
  }

  /**
   * Returns object without password
   * @param {User} user user instance
   * @returns {Object} object without password
   * @static
   */
  static toResponse(user) {
    const {
      id,
      name,
      login
    } = user;
    return {
      id,
      name,
      login
    };
  }
}

module.exports = User;