export const PUSH = 'QUEUE/PUSH';
export const POP = 'QUEUE/POP';
export const FLUSH = 'QUEUE/FLUSH';

export const push = (name, payload = {}) => ({
  type: PUSH,
  payload,
  meta: { name },
});

export const pop = name => ({
  type: POP,
  meta: { name },
});

export const flush = name => ({
  type: FLUSH,
  meta: { name },
});
