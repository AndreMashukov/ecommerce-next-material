export interface Error {
  name: string;
  message: string;
  // tslint:disable-next-line: no-any
  errors: any[];
  status?: number;
}
