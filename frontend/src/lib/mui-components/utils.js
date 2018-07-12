/**
 * Creates a reducer callback and and seed wrapped in an array. The array can be
 * spread as the arguments to a Array.prototype.reduce() function.
 * The reduce funcion groups an array of items. If the item is an Object with
 * a `groupField` key, it will be grouped by it. Otherwise the item will be
 * grouped in an `group: undefinded`.
 * @example
 * // returns [{group:"a", items: [{v:1, group:"a"}, ...]}, ...]
 * const array = [{v:1, group:"a"}, {v:2, group:"a"}, ...]
 * array.reduce(...group()).result
 * @param {string} groupField - The field name by which items will be grouped.
 * @returns {Array} reducerAndSeed - The arguments for Array.prototype.reduce()
 */
export const makeGroupReducer = (groupField = 'group') => {
  const itemToGroup = item => item[groupField];
  const fn = (acc, item) => {
    let groupIndex = acc.groups[itemToGroup(item)];
    if (groupIndex === undefined) {
      groupIndex = acc.result.length;
      acc.groups[itemToGroup(item)] = groupIndex;
      acc.result.push({ group: itemToGroup(item), items: [] });
    }
    acc.result[groupIndex].items.push(item);
    return acc;
  };
  return [fn, { result: [], groups: {} }];
};

/**
 * Creates a reducer callback and and seed wrapped in an array. The array can be
 * spread as the arguments to a Array.prototype.reduce() function.
 * The reduce function adds a firstIndex field to each object in the array. The
 * reducer keeps a running total of the number of items in each objects
 * `itemsField`. The firstIndex is the global index of the first item in that
 * object's `itemsField` array.
 * @example
 * // returns [{items:[1,2], firstIndex: 0}, {items:[...]}, firstIndex: 2},...]
 * const array = [{items:[1,2]}, ...]
 * array.reduce(...addFirstIndex()).result
 * @param {string} itemsField - The field name of the array of items.
 * @returns {Array} reducerAndSeed - The arguments for Array.prototype.reduce()
 */
export const makeFirstIndexReducer = (itemsField = 'items') => {
  const fn = (acc, item) => {
    const newItem = { ...item, firstIndex: acc.count };
    acc.result.push(newItem);
    acc.count = acc.count + item[itemsField].length;
    return acc;
  };
  return [fn, { result: [], count: 0 }];
};

/**
 * Check if a value is valid to be displayed inside an input DOM element.
 *
 * @param {*} v - The value to check.
 * @returns {boolean} isValid - True if valid.
 */
export const isValid = v =>
  v !== '' &&
  v !== undefined &&
  v !== null &&
  !(Array.isArray(v) && v.length === 0);

/**
 * Wraps a value in an Array if not one alread.
 * @param {*} value - The value to wrap.
 * @returns {Array} - The wrapped value.
 */
export const wrapInArray = value => {
  if (Array.isArray(value)) {
    return value;
  } else {
    return value ? [value] : [];
  }
};

/**
 * Calls all the functions with given arguments.
 * @see https://blog.kentcdodds.com/how-to-give-rendering-control-to-users-with-prop-getters-549eaef76acf
 */
export const callAll = (...fns) => (...args) =>
  fns.forEach(fn => fn && fn(...args));

export const noop = () => {};
