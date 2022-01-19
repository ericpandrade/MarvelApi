import { ButtonHTMLAttributes } from "react";

import "./style.scss";

type ButtonElements = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ ...props }: ButtonElements) {
  return <button className="button" {...props} />;
}
