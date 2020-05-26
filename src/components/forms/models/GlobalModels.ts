export type ChangeEventType = React.ChangeEvent<HTMLInputElement>;

export interface TextField {
  value: string;
  isDirty: boolean;
}
