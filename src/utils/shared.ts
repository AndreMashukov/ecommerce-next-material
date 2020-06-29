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

export function pickPropsFromDto<T>(o: ResultOrError<T>, ...props: [keyof T]): Partial<T> {
  return Object.assign({}, ...props.map(prop => ({[prop]: o[prop]})));
}