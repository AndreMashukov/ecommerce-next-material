import { TextField } from './GlobalModels';

// TODO: Remove handlers since they are exported from withMakeOrderState
export interface MakeOrderFormProps {
  email: TextField;
  emailError: (email: TextField) => boolean;
  phone: TextField;
  phoneError: (phone: TextField) => boolean;
  lastName: TextField;
  lastNameError: (lastName: TextField) => boolean;
  firstName: TextField;
  firstNameError: (firstName: TextField) => boolean;
  region: number;
  city: TextField;
  cityError: (address: TextField) => boolean;
  address: TextField;
  addressError: (address: TextField) => boolean;
  comment: TextField;
  commentError: (comment: TextField) => boolean;
  deliveryId: number;
  deliveryPrice: number;
  paySystemId: number;
  makeOrderSubmit: (props: Partial<MakeOrderFormProps>) => boolean;
}