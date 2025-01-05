declare module 'react-native-pixel-perfect' {
  export function create(designWidth: number): (size: number) => number;
  export const PREDEF_RES: Record<string, {width: number; height: number}>;
}
