import { InputHTMLAttributes } from "react";

export interface IProps extends InputHTMLAttributes<HTMLInputElement> {}
const Input = ({ ...rest }: IProps) => {
  return (
    <input className="py-2 border-[2px] border-green-400 px-1 rounded-lg outline-none mb-4" {...rest} />
  );
};

export default Input;
