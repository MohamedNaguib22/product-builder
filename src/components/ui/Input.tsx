import { InputHTMLAttributes } from "react";

export interface IProps extends InputHTMLAttributes<HTMLInputElement> {}
const Input = ({ ...rest }: IProps) => {
  return (
    <input className="form-input ps-10 placeholder:text-white-dark" {...rest} />
  );
};

export default Input;
