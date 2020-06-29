type RecNT<T> = Record<number, T>;

export const getArrayFromObject = <V>(obj: RecNT<V>) => {
  const array: V[] = [];
  // tslint:disable-next-line: no-any
  Object.keys(obj).forEach((key: any) => {
    array.push(obj[key]);
  });
  return array;
};
