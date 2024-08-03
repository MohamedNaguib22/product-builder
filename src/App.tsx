import { useState } from "react";
import Card from "./components/Card";
import Button from "./components/ui/Button";
import { colors, formInputsList, productList } from "./Data";
import { IProducts } from "./interfaces";
import Modal from "./components/Modal";
import Input from "./components/ui/Input";
import Color from "./components/Color";

const App = () => {
  // --------defaultData----------
  const defaultData = {
    title: " ",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  // -------State-----------
  const [products, setProducts] = useState<IProducts[]>(productList);
  const [product, setProduct] = useState<IProducts>(defaultData);
  const [isOpen, setIsOpen] = useState(false);

  // ------Functions--------
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  // ---------Render-----------
  const renderCard = products.map((product) => (
    <Card key={product.id} product={product} />
  ));
  const renderColor = colors.map((color) => (
    <Color
      onClick={() =>
        setProduct((prv) => ({ ...prv, colors: [...prv.colors, color] }))
      }
      key={color}
      color={color}
    />
  ));
  const renderColorClick = product.colors.map((i) => (
    <span
      key={i}
      className="w-[60px] h-[30px] text-white flex justify-center items-center rounded-lg"
      style={{ backgroundColor: i }}
    >
      {i}
    </span>
  ));
  const renderInput = formInputsList.map((input) => (
    <div key={input.id} className="flex flex-col">
      <label htmlFor={input.id} className="uppercase font-medium">
        {input.name}
      </label>
      <Input placeholder={input.placeholder} />
    </div>
  ));
  return (
    <div className="container py-6 " onClick={openModal}>
      {/* Button */}
      <div className="flex justify-center pb-8">
        <Button
          width="w-fit"
          className="bg-green-500 flex-2 hover:bg-green-600 transition-all duration-300 px-4"
        >
          Add Product
        </Button>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {renderCard}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        {renderInput}
        <div className="flex gap-2 items-center flex-wrap">
          {renderColor}
        </div>
        <div className="flex gap-2 items-center flex-wrap mt-2">
          {renderColorClick}
        </div>
        <div className="flex items-center space-x-2">
          <Button className="bg-green-500 flex-2 hover:bg-green-600 transition-all duration-300">
            Submit
          </Button>
          <Button
            onClick={closeModal}
            className="bg-gray-400 flex-1 px-4 hover:bg-gray-500 transition-all duration-300"
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default App;
