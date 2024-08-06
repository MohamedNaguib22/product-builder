import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Card from "./components/Card";
import Button from "./components/ui/Button";
import { categories, colors, formInputsList, productList } from "./Data";
import { IProducts } from "./interfaces";
import Modal from "./components/Modal";
import Input from "./components/ui/Input";
import Color from "./components/Color";
import { validationErrorMessage } from "./Validation";
import Massage from "./components/Massage";
import SelectCategory from "./components/SelectInput";
import { v4 as uuid } from "uuid";
const Version = () => {
  // Function add product Comment
  // const addColor = (color: string)=> {
  //     setProduct((prv)=> {
  //       if (prv.colors.includes(color)) {
  //         return prv
  //       }
  //       return { ...prv, colors: [...prv.colors, color] };
  //     });
  // }

  // --------defaultData----------
  const defaultData = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [""],
    category: {
      name: "",
      imageURL: "",
    },
  };
  // -------State-----------
  const [products, setProducts] = useState<IProducts[]>(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : productList;
  });
  const [product, setProduct] = useState<IProducts>(defaultData);
  const [error, setError] = useState<{
    title?: string;
    description?: string;
    imageURL?: string;
    price?: string;
  }>();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(categories[3]);
  const [switchFun, setSwitchFun] = useState("create");
  const [id, setId] = useState<number>(0);
  console.log(switchFun);

  // ------Functions--------
  const updateLocalStorage = (updatedProducts: IProducts[]) => {
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  useEffect(() => {
    updateLocalStorage(products);
  }, [product, products]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSwitchFun("create");
    setProduct(defaultData);
  };

  const addColorInProduct = (color: string) => {
    if (product.colors.includes(color)) {
      return;
    }
    setProduct((prv) => ({ ...prv, colors: [...prv.colors, color] }));
    // setColor(prev => [...prev , color])
  };

  const removeColor = (i: string) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      colors: prevProduct.colors.filter((color) => color !== i),
    }));
    // const filter = product.colors.filter((color) => color !== i);
    // setProduct((prv) => ({ ...prv, colors: filter }));
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prv) => ({ ...prv, [name]: value }));
    setError((prevError) => ({ ...prevError, [name]: "" }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, description, price, imageURL } = product;
    const errors = validationErrorMessage({
      title,
      description,
      price,
      imageURL,
    });
    const errorMsg =
      Object.values(errors).some((i) => i === "") &&
      Object.values(errors).every((i) => i === "");
    if (switchFun === "create") {
      if (errorMsg) {
        const updatedProducts = [
          { ...product, id: uuid(), category: selected },
          ...products,
        ];
        setProducts(updatedProducts);
        updateLocalStorage(updatedProducts);
        // setProducts((prev) => {
        //   const updatedProducts = [product, ...prev];
        //   updateLocalStorage(updatedProducts);
        //   return updatedProducts;
        // });
        setIsOpen(false);
        setProduct(defaultData);
      } else {
        setError(errors);
        return;
      }
    } else {
      if (errorMsg) {
        const updateData = [...products];
        updateData[id] = product;
        setProducts(updateData);
        setIsOpen(false);
        setProduct(defaultData);
      } else {
        setError(errors);
        return;
      }
    }
  };

  // ---------Render-----------

  const renderCard = products.map((product, index) => (
    <Card
      key={product.id}
      product={product}
      setProduct={setProduct}
      openModal={openModal}
      setSwitchFun={setSwitchFun}
      setId={setId}
      index={index}
    />
  ));
  const renderColor = colors.map((color) => (
    <Color onClick={() => addColorInProduct(color)} key={color} color={color} />
  ));
  const renderColorClick = product.colors.map((i) => (
    <span
      key={i}
      className="w-[70px] h-[30px] text-white flex justify-center items-center rounded-lg cursor-pointer"
      style={{ backgroundColor: i }}
      onClick={() => removeColor(i)}
    >
      {i}
    </span>
  ));
  const renderInput = formInputsList.map((input) => (
    <div key={input.id} className="flex flex-col">
      <label htmlFor={input.id} className="font-medium">
        {input.name}
      </label>
      <Input
        placeholder={input.placeholder}
        name={input.name}
        value={product[input.name]}
        onChange={onChangeInput}
      />
      <Massage msg={(error && error[input.name]) || ""} />
    </div>
  ));
  return (
    <div className="container py-6 ">
      {/* Button */}
      <div className="flex justify-center pb-8">
        <Button
          onClick={() => {
            setSwitchFun("create");
            openModal();
          }}
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
        <form onSubmit={onSubmit}>
          {renderInput}
          <div>
            {switchFun === "create" ? (
              <SelectCategory selected={selected} setSelected={setSelected} />
            ) : (
              <SelectCategory
                selected={product.category}
                setSelected={(value) =>
                  setProduct((prv) => ({ ...prv, category: value }))
                }
              />
            )}
          </div>
          <div className="flex gap-2 items-center flex-wrap mt-4">
            {renderColor}
          </div>
          <div className="flex gap-2 items-center flex-wrap mt-2">
            {renderColorClick}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              type={"submit"}
              className="bg-green-500 flex-2 hover:bg-green-600 transition-all duration-300"
            >
              Submit
            </Button>
            <Button
              onClick={() => {
                closeModal();
              }}
              type="button"
              className="bg-gray-400 flex-1 px-4 hover:bg-gray-500 transition-all duration-300"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Version;
