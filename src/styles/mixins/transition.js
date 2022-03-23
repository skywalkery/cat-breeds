module.exports = (mixin, ...args) => ({
  transition: args
    .map((prop) => `${prop} var(--standart-animation-time) ease`)
    .join(','),
});
