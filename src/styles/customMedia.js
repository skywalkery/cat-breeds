const pixelsToEm = (pixels) => `${pixels / 16}em`;

const xSmallMaxWidth = 480;
const smallMinWidth = xSmallMaxWidth + 1;
const smallMaxWidth = 768;
const mediumMinWidth = smallMaxWidth + 1;
const mediumMaxWidth = 1024;
const largeMinWidth = mediumMaxWidth + 1;
const largeMaxWidth = 1200;
const xLargeMinWidth = largeMaxWidth + 1;

module.exports = {
  customMedia: {
    '--x-small-only': `only screen and (max-width: ${pixelsToEm(
      xSmallMaxWidth
    )})`,
    '--small-up': `only screen and (min-width: ${pixelsToEm(smallMinWidth)})`,
    '--small-only': `only screen and (min-width: ${pixelsToEm(
      smallMinWidth
    )}) and (max-width: ${pixelsToEm(smallMaxWidth)})`,
    '--small-down': `only screen and (max-width: ${pixelsToEm(smallMaxWidth)})`,
    '--medium-up': `only screen and (min-width: ${pixelsToEm(mediumMinWidth)})`,
    '--medium-only': `only screen and (min-width: ${pixelsToEm(
      mediumMinWidth
    )}) and (max-width: ${pixelsToEm(mediumMaxWidth)})`,
    '--medium-down': `only screen and (max-width: ${pixelsToEm(mediumMaxWidth)})`,
    '--large-up': `only screen and (min-width: ${pixelsToEm(largeMinWidth)})`,
    '--large-only': `only screen and (min-width: ${pixelsToEm(
      largeMinWidth
    )}) and (max-width: ${pixelsToEm(largeMaxWidth)})`,
    '--large-down': `only screen and (max-width: ${pixelsToEm(largeMaxWidth)})`,
    '--x-large-only': `only screen and (min-width: ${pixelsToEm(
      xLargeMinWidth
    )})`,
  },
  xSmallMaxWidth,
  smallMinWidth,
  smallMaxWidth,
  mediumMinWidth,
  mediumMaxWidth,
  largeMinWidth,
  largeMaxWidth,
  xLargeMinWidth,
};
