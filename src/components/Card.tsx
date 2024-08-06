import { textCut } from "../utilities";
import { IProducts } from "../interfaces";
import Color from "./Color";
import Button from "./ui/Button";

interface IProps {
  product: IProducts;
  index: number;
  setProduct: (product: IProducts) => void;
  openModal: () => void;
  setSwitchFun: (val: string) => void;
  setId: (val: number) => void;
}
const Card = ({
  product,
  setProduct,
  openModal,
  setSwitchFun,
  index,
  setId,
}: IProps) => {
  const { category, description, imageURL, colors, price, title } = product;
  // ------- String To Number -----------
  // const amount = parseInt(amountString, 10);
  const amountString = price;
  const amount = Number(amountString);
  const formattedAmount = amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  // -------- Function Handel ----------
  const editHandlerOpenModal = () => {
    setProduct(product);
    setSwitchFun("edit");
    setId(index);
    openModal();
  };
  return (
    <div className="border rounded-lg flex flex-col p-2 justify-between">
      {/* Image */}
      <div className="rounded-lg w-full h-[300px] overflow-hidden">
        <img
          src={imageURL}
          alt={title}
          className=" rounded-xl w-full h-[300px] object-cover transition-transform duration-300 ease-in-out transform hover:scale-[1.3] hover:rotate-[10deg] hover:brightness-90 "
        />
      </div>
      {/* Title */}
      <div>
        <h2 className="text-[24px] font-bold mb-3">{title}</h2>
        <p className="font-normal text-gray-500 flex-wrap">
          {textCut(description, 50)}
        </p>
      </div>
      {/* Price & Cate */}
      <div className="flex justify-between items-center text-[18px] font-medium">
        {/* Price */}
        <div>{formattedAmount}</div>
        {/* Cate */}
        <div className="flex space-x-2 items-center">
          <div>
            <p>{category.name}</p>
          </div>
          <div>
            <img
              src={category.imageURL}
              alt="Product"
              className="rounded- xl w-[40px] h-[40px]  rounded-full"
            />
          </div>
        </div>
      </div>
      {/* Color */}
      <div className="flex space-x-2 items-center flex-wrap">
        {colors.map((color) =>
          color.length == 0 ? (
            <p key={color} className="font-medium text-gray-500">
              Not Found Color in this product.....
            </p>
          ) : (
            <Color color={color} key={color} />
          )
        )}
      </div>
      {/* Button */}
      <div className="flex items-center space-x-2">
        <Button
          onClick={editHandlerOpenModal}
          className="bg-green-500 flex-2 hover:bg-green-600 transition-all duration-300"
        >
          Edit
        </Button>
        <Button className="bg-red-500 flex-1 px-4 hover:bg-red-600 transition-all duration-300">
          Remove
        </Button>
      </div>
    </div>
  );
};

export default Card;
