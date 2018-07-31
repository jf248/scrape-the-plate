export const MOUNT = 'APP/VIEW/MOUNT';

export const mount = (resource, id) => ({
  type: MOUNT,
  meta: { resource, id },
});
