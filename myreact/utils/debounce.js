export function debounce (callback) {
  let currentTimer = -1;
  return function () {
    cancelAnimationFrame(currentTimer);
    currentTimer = requestAnimationFrame(callback);
  }
}
