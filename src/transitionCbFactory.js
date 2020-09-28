export default (elements, attributes, paces, starts, finals, done) => {
  elements.forEach((val, ind) => {
    val.setAttribute(attributes[ind], starts[ind]);
  });
  const currents = starts.slice();
  return function cb() {
    if (
      elements.some((val, ind) =>
        paces[ind] > 0
          ? currents[ind] + paces[ind] > finals[ind]
          : currents[ind] + paces[ind] < finals[ind]
      )
    ) {
      elements.forEach((val, ind) => {
        val.setAttribute(attributes[ind], finals[ind]);
      });
      done();
      return;
    }
    elements.forEach((val, ind) => {
      currents[ind] += paces[ind];
      val.setAttribute(attributes[ind], currents[ind]);
    });
    window.requestAnimationFrame(cb);
  };
};
