export interface PaySystem {
  pay_system_id: number;
  pay_system_name: string;
  pay_system_active: string;
  pay_system_description: string;
}

export interface NoSuffixPaySystem {
  id: number;
  name: string;
  active: string;
  description: string;
}
