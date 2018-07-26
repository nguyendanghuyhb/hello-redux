export const LENGTH = 20;
export const POINT_TO_WIN = 3;

export const createData = () => {
  let i;
  let j;
  const arr = [];
  for (i = 0; i < LENGTH; i += 1) {
    arr[i] = [];
    for (j = 0; j < LENGTH; j += 1) {
      arr[i][j] = '';
    }
  }
  return arr;
};
