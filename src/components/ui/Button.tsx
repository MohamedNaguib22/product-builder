import { ButtonHTMLAttributes, ReactNode } from "react";

export interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  width?: "w-full" | "w-fit";
}
const Button = ({ children, className, width = "w-full", ...rest }: IProps) => {
  return (
    <button
      type="submit"
      className={`${className} ${width} !mt-6 border-0 uppercase py-3 font-bold rounded-lg text-white`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
