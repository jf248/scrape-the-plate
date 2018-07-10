export default function remove(object, key) {
  const { [key]: v, ...rest } = object; // eslint-disable-line no-unused-vars
  return rest;
}
