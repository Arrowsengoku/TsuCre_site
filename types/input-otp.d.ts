declare module "input-otp" {
  import * as React from "react";

  export interface OTPInputProps {
    value: string;
    onChange: (value: string) => void;
    length?: number;
  }

  export const OTPInput: React.FC<OTPInputProps>;
  export const OTPInputContext: React.Context<{ value: string; onChange: (value: string) => void }>;
}