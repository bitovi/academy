/**
 * EX 2: Update the `ColorsAsEasyReadName` type so that it represents the keys of the enum (eg 'red', 'blue', and 'green')
 * and then add all the necessary types to the `getColorValue` function signature.
 *
 * The `getColorValue` function should take a one of the easily readable names and return the hex string equivalent
 */
export enum ColorsToHex {
  red = "0xFF0000",
  green = "0x00FF00",
  blue = "0x0000FF",
}

/**
 * Replace `any` with a type so that it represents the keys of the enum (eg 'red', 'blue', and 'green')
 */
type ColorsAsEasyReadName = any;

/**
 * Fix the ts errors by updating the type above and replace the `any` with the proper type
 */
export const getColorValue = (color: ColorsAsEasyReadName): any => {
  return ColorsToHex[color];
};
