export type ChangeEventType = React.ChangeEvent<HTMLInputElement>;

export interface TextField {
  value: string;
  isDirty: boolean;
}

export interface SubmitStateInterface {
  submitState: SubmitState;
}


export class SubmitState {
  public submitted: boolean;

  constructor() {
    this.submitted = false;
  }

  public setSubmitted() {
    this.submitted = true;
  }
}