/**
 * Composes fns. Fns are called in order until one of them sets
 * `event.preventPowerplugDefault = true`.
 * Can be used for regular fns or eventHandlers.
 * @param {Function} fns the functions / eventHandlers
 * @return {Function} the composed function / event handler to add to an element
 */
export default function callAll(...fns) {
  return (event, ...args) =>
    fns.some(fn => {
      fn && fn(event, ...args);
      return (
        isObject(event) &&
        (event.nativeEvent.preventPowerplugDefault ||
          event.preventPowerplugDefault)
      );
    });
}

function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}
