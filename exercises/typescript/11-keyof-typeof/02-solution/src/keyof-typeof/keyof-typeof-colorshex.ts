export enum ColorsToHex {
  red = "0xFF0000",
  green = "0x00FF00",
  blue = "0x0000FF",
}

type ColorsAsEasyReadName = keyof typeof ColorsToHex;

export const getColorValue = (color: ColorsAsEasyReadName): string => {
  return ColorsToHex[color];
};
