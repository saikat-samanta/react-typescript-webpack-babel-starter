import type React from "react";

export interface ButtonProps {}

export function Button({ children }: React.PropsWithChildren<ButtonProps>) {
  return <button>{children}</button>;
}
