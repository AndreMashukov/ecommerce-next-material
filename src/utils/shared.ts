import { Error } from '../models';

type RecordNumber<T> = Record<number, T>;
type ResultOrError<T> = Partial<T & Error>;

export const getArrayFromObject = <V>(obj: RecordNumber<V>) => {
  const array: V[] = [];
  // tslint:disable-next-line: no-any
  Object.keys(obj).forEach((key: any) => {
    array.push(obj[key]);
  });
  return array;
};

export const pickPropsFromDto = <V>(
  dto: ResultOrError<V>,
  ...props: [keyof V]
): Partial<V> => {
  const finalProps: Partial<V> = {};
  for (const p of props) {
    finalProps[p] = dto[p];
  }

  return finalProps;
};
