interface IProps {
  msg: string;
}
const Massage = ({ msg }: IProps) => {
  return (
    <span className="text-[14px] text-red-600 font-medium mt-[-16px] mb-[12px]">
      {msg}
    </span>
  );
};

export default Massage;
