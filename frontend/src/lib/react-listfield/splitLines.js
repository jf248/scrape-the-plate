/**
 * Splits a string into an array by new-line characters.
 * @param {*} text - The value to split.
 * @returns {Array}
 */
export default function splitLines(text = '') {
  return text.split(/\r\n|\r|\n/g).filter(line => !!line);
}
