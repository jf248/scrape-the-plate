/**
 * Wraps a value in an Array if not one alread.
 * @param {*} value - The value to wrap.
 * @returns {Array} - The wrapped value.
 */
const wrap = value => (Array.isArray(value) ? value : [value]);

export default wrap;
