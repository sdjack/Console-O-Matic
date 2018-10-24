/**
 * Simple Custom Console
 * @namespace Console_O_Matic
 */
const COLORS = require("./colorMap.json");
const DEFAULT_NAME = "Console";
const TAG_EXPR = /\|([\w]*?)\:\|([\w\W\s\S]*?)\|\:\1\|/;
const RESET_COLOR = "\x1b[0m";
const PRIVATE_COLORS = {
  black: "\x1b[30m",
  grey: "\x1b[90m",
  white: "\x1b[97m",
  red: "\x1b[91m",
  yellow: "\x1b[93m",
  green: "\x1b[92m",
  cyan: "\x1b[96m",
  blue: "\x1b[94m",
  magenta: "\x1b[95m"
};
const DISCO = [
  COLORS.red,
  COLORS.orange,
  COLORS.yellow,
  COLORS.green,
  COLORS.cyan,
  COLORS.blue,
  COLORS.indigo,
  COLORS.violet,
  COLORS.magenta
];
/**
 * getColorCode
 * @function getColorCode
 * @return {String} output
 * @memberof Console_O_Matic
 */
function getColorCode(name, bg = false) {
  const preset = bg ? "48;5;" : "38;5;";
  const colorIndex = COLORS[name] || 7;
  return `\x1b[${preset}${colorIndex}m`;
}
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

  return "[" + PRIVATE_COLORS.grey +
        ((hour < 10) ? "0" + hour : hour) +
        ":" +
        ((minutes < 10) ? "0" + minutes : minutes) +
        ":" +
        ((seconds < 10) ? "0" + seconds : seconds) +
        RESET_COLOR + "] ";
}
/**
 * disco
 * @function disco
 * @return {String} output
 * @memberof Console_O_Matic
 */
function disco(input) {
  let output = "";
  const minDex = DISCO.length;
  const chars = input.split("");
  for (let i  = 0; i < chars.length; i += 1) {
    const x = Math.floor(Math.random() * minDex);
    output += `\x1b[38;5;${DISCO[x]}m${chars[i]}${RESET_COLOR}`;
  }
  return output;
}
/**
 * colorFormat
 * @function colorFormat
 * @param {String} input
 * @return {String} output
 * @memberof Console_O_Matic
 */
function colorFormat(input, override = null) {
  let tagApplied = false;
  let output = input;
  const tagSearch = new RegExp(TAG_EXPR, "gim");
  let tags;
  while ((tags = tagSearch.exec(input)) !== null) {
    const orignal = tags[0];
    const tag = tags[1];
    const msg = tags[2] || "";
    if (tag === "disco") {
      const fever = disco(msg);
      output = output.replace(orignal, fever);
    } else {
      const colorDef = getColorCode(tag);
      const formatted = `${colorDef}${msg}${RESET_COLOR}`;
      output = output.replace(orignal, formatted);
    }
    tagApplied = true;
  }
  if (!tagApplied) {
    const color = override || PRIVATE_COLORS.white;
    output = `${color}${output}${RESET_COLOR}`;
  }
  return output;
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
CoM.prototype.log = function(...args) {
  const self = this;
  let msg = "";
  for (let i  = 0; i < args.length; i += 1) {
    msg += colorFormat(args[i]);
  }
  console.log(getTimestamp() + `${self.title}: ${msg}`);
}

/**
 * Console_O_Matic.debug
 * @function debug
 * @param {*} msgs - All logged args
 * @memberof Console_O_Matic
 */
CoM.prototype.debug = function(...args) {
  const self = this;
  let msg = "";
  for (let i  = 0; i < args.length; i += 1) {
    msg += colorFormat(args[i], PRIVATE_COLORS.green);
  }
  console.log(getTimestamp() + `${PRIVATE_COLORS.green}${self.title}${RESET_COLOR}: ${msg}`);
}

/**
 * Console_O_Matic.warn
 * @function warn
 * @param {*} msgs - All logged args
 * @memberof Console_O_Matic
 */
CoM.prototype.warn = function(...args) {
  const self = this;
  let msg = "";
  for (let i  = 0; i < args.length; i += 1) {
    msg += colorFormat(args[i], PRIVATE_COLORS.yellow);
  }
  console.log(getTimestamp() + `${PRIVATE_COLORS.yellow}${self.title}${RESET_COLOR}: ${msg}`);
}

/**
 * Console_O_Matic.error
 * @function error
 * @param {*} msgs - All logged args
 * @memberof Console_O_Matic
 */
CoM.prototype.error = function(...args) {
  const self = this;
  let msg = "";
  for (let i  = 0; i < args.length; i += 1) {
    msg += colorFormat(args[i], PRIVATE_COLORS.red);
  }
  console.log(getTimestamp() + `${PRIVATE_COLORS.red}${self.title}${RESET_COLOR}: ${msg}`);
}

module.exports = new CoM();
