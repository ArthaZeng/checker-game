export const moveCheckerPosition = (
  from: number,
  to: number,
  checkerArr: number[]
) => [...checkerArr.filter((point) => point !== from), to];

export const removeCheckers = (ids: number[], checkerArr: number[]) =>
  checkerArr.filter((point) => ids.indexOf(point) === -1);
