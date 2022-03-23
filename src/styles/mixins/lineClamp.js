module.exports = (mixin, lineCount) => ({
  display: '-webkit-box',
  '-webkit-box-orient': 'vertical',
  '-webkit-line-clamp': lineCount,
  'word-break': 'break-all',
  overflow: 'hidden',
});
