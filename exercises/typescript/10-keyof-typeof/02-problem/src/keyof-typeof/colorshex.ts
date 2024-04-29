export enum ColorsToHex {
  red = "0xFF0000",
  green = "0x00FF00",
  blue = "0x0000FF",
}

type ColorsAsEasyReadName = any;

export const getColorValue = (color: ColorsAsEasyReadName): any => {
  return ColorsToHex[color];
};
