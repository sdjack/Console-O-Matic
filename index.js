/**
 * Simple Custom Console
 * @namespace Console_O_Matic
 */
const colors = require("colors/safe");
const DEFAULT_NAME = "Console-O-Matic";
/**
 * getTimestamp
 * @function getTimestamp
 * @return {String} timestamp
 * @memberof Console_O_Matic
 */
function getTimestamp() {
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return "[" +
         colors.gray(((hour < 10) ? "0" + hour : hour) +
         ":" +
         ((minutes < 10) ? "0" + minutes : minutes) +
         ":" +
         ((seconds < 10) ? "0" + seconds : seconds)) +
         "] ";
}

/**
 * Custom Console
 * @function CoM
 * @memberof Console_O_Matic
 */
function CoM() {
  this.title = DEFAULT_NAME;
}

/**
 * Console_O_Matic.setName
 * @function setName
 * @param {String} name - The logged parent source
 * @memberof Console_O_Matic
 */
CoM.prototype.setName = function(name) {
  this.title = name;
}

/**
 * Console_O_Matic.log
 * @function log
 * @param {*} msgs - All logged args
 * @memberof Console_O_Matic
 */
CoM.prototype.log = function(msg) {
  const self = this;
  console.log(getTimestamp() + self.title + ":", colors.cyan(msg));
}

/**
 * Console_O_Matic.debug
 * @function debug
 * @param {*} msgs - All logged args
 * @memberof Console_O_Matic
 */
CoM.prototype.debug = function(msg) {
  const self = this;
  console.debug(getTimestamp() + self.title + ":", colors.green(msg));
}

/**
 * Console_O_Matic.warn
 * @function warn
 * @param {*} msgs - All logged args
 * @memberof Console_O_Matic
 */
CoM.prototype.warn = function(msg) {
  const self = this;
  console.warn(getTimestamp() + self.title + ":", colors.yellow(msg));
}

/**
 * Console_O_Matic.error
 * @function error
 * @param {*} msgs - All logged args
 * @memberof Console_O_Matic
 */
CoM.prototype.error = function(msg) {
  const self = this;
  console.error(getTimestamp() + self.title + ":", colors.red(msg));
}

module.exports = new CoM();
