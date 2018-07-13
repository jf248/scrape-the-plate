const formatMins = mins => {
  if (mins < 60) {
    return `${mins} min`;
  }

  let hours = Math.round(mins / 60);
  const half = mins % 60 < 30 && mins % 60 !== 0;
  if (half) {
    hours = hours + 0.5;
  }

  return `${hours} hr`;
};

export default formatMins;
