export enum Colors {
  red = "0xFF0000",
  green = "0x00FF00",
  blue = "0x0000FF",
}

type ColorNames = any;

export const getColorValue = (color: ColorNames): any => {
  return Colors[color];
};
