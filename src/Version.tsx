import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import CardEdit from "./components/CardEdit";
import Button from "./components/ui/Button";
import { categories, colors, formInputsList, productList } from "./Data";
import { IProducts } from "./interfaces";
import ModalEdit from "./components/ModalEdit";
import Input from "./components/ui/Input";
import Color from "./components/Color";
import { validationErrorMessage } from "./Validation";
import Massage from "./components/Massage";
import SelectCategory from "./components/SelectInput";
import { v4 as uuid } from "uuid";
import toast, { Toaster } from "react-hot-toast";
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
    colors: [],
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
  const [productToEdit, setProductToEdit] = useState<IProducts>(defaultData);
  const [error, setError] = useState<{
    title?: string;
    description?: string;
    imageURL?: string;
    price?: string;
  }>();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenToEdit, setIsOpenToEdit] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [selected, setSelected] = useState(categories[3]);
  // const [switchFun, setSwitchFun] = useState("create");
  const [id, setId] = useState<number | string>(0);
  const [tempColor, setTempColor] = useState<string[]>([]);

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
  const openModalToEdit = () => {
    setIsOpenToEdit(true);
  };

  const closeModalRemove = () => {
    setIsOpenModalDelete((prv) => !prv);
  };

  const closeModalToEdit = () => {
    setIsOpenToEdit(false);
    
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const addColorInProduct = (color: string) => {
    if (tempColor.includes(color)) {
      return;
    }
    if (productToEdit.colors.includes(color)) {
      return;
    }
    setTempColor((prv) => [...prv, color]);
    // setColor(prev => [...prev , color])
  };

  const removeColor = (i: string) => {
    setTempColor((prv) => prv.filter((color)=> color !== i));
    // const filter = product.colors.filter((color) => color !== i);
    // setProduct((prv) => ({ ...prv, colors: filter }));
  };
  const removeColorEdit = (i: string) => {
    setTempColor((prv) => prv.filter((color)=> color !== i));
      setProductToEdit((prevProduct) => ({
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
  const onChangeInputToEdit = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductToEdit((prv) => ({ ...prv, [name]: value }));
    setError((prevError) => ({ ...prevError, [name]: "" }));
  };

  const onSubmitToEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, description, price, imageURL } = productToEdit;
    const errors = validationErrorMessage({
      title,
      description,
      price,
      imageURL,
    });
    const errorMsg =
      Object.values(errors).some((i) => i === "") &&
      Object.values(errors).every((i) => i === "");
    // add product

    if (errorMsg) {
      const updateData = [...products];
      updateData[Number(id)] = {
        ...productToEdit,
        colors: tempColor.concat(productToEdit.colors),
      };
      setProducts(updateData);
      setIsOpenToEdit(false);
      setProductToEdit(defaultData);
      toast("Product has been Edit successfully!", {
        icon: "👏",
        style: {
          backgroundColor: "black",
          color: "white",
        },
      });
    } else {
      setError(errors);
      return;
    }
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
    // add product

    if (errorMsg) {
      const updatedProducts = [
        { ...product, id: uuid(), category: selected, colors: tempColor },
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
      toast("Product has been added successfully!", {
        icon: "👏",
        style: {
          backgroundColor: "black",
          color: "white",
        },
      });
    } else {
      setError(errors);
      return;
    }
  };

  const removeCard = (id: string) => {
    setProducts((prv) => prv.filter((i) => i.id !== id));
    toast("Product has been deleted successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "#c2344d",
        color: "white",
      },
    });
    setIsOpenModalDelete((prv) => !prv);
  };

  // ---------Render-----------

  const renderCard = products.map((product, index) => (
    <CardEdit
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      openModalToEdit={openModalToEdit}
      setId={setId}
      index={index}
      setIsOpenModalDelete={setIsOpenModalDelete}
      isOpenModalDelete={isOpenModalDelete}
    />
  ));
  const renderColor = colors.map((color) => (
    <Color onClick={() => addColorInProduct(color)} key={color} color={color} />
  ));
  const renderColorToEdit = colors.map((color) => (
    <Color onClick={() => addColorInProduct(color)} key={color} color={color} />
  ));
  const renderColorClickEdit = tempColor
    .concat(productToEdit.colors)
    .map((i) => (
      <span
        key={i}
        className="w-[70px] h-[30px] text-white flex justify-center items-center rounded-lg cursor-pointer"
        style={{ backgroundColor: i }}
        onClick={() => removeColorEdit(i)}
      >
        {i}
      </span>
    ));
  const renderColorClick = tempColor.map((i) => (
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
  const inputFun = (
    id: string,
    label: string,
    name: "title" | "imageURL" | "description" | "price"
  ) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="font-medium">
          {label}
        </label>
        <Input
          name={name}
          value={productToEdit[name]}
          onChange={onChangeInputToEdit}
        />
        <Massage msg={(error && error[name]) || ""} />
      </div>
    );
  };
  return (
    <main className="container py-6 ">
      {/* Button */}
      <div className="flex justify-center pb-8">
        <Button
          onClick={() => {
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
      <ModalEdit isOpen={isOpen} closeModal={closeModalToEdit}>
        <form onSubmit={onSubmit}>
          {renderInput}
          <div>
            <SelectCategory selected={selected} setSelected={setSelected} />
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
      </ModalEdit>
      <ModalEdit isOpen={isOpenToEdit} closeModal={openModalToEdit}>
        <form onSubmit={onSubmitToEdit}>
          <div>{inputFun("title", "title", "title")}</div>
          <div>{inputFun("description", "description", "description")}</div>
          <div>{inputFun("price", "price", "price")}</div>
          <div>{inputFun("imageURL", "imageURL", "imageURL")}</div>
          <div>
            <SelectCategory
              selected={productToEdit.category}
              setSelected={(value) =>
                setProductToEdit((prv) => ({ ...prv, category: value }))
              }
            />
          </div>
          <div className="flex gap-2 items-center flex-wrap mt-4">
            {renderColorToEdit}
          </div>
          <div className="flex gap-2 items-center flex-wrap mt-2">
            {renderColorClickEdit}
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
                closeModalToEdit();
              }}
              type="button"
              className="bg-gray-400 flex-1 px-4 hover:bg-gray-500 transition-all duration-300"
            >
              Cancel
            </Button>
          </div>
        </form>
      </ModalEdit>
      <ModalEdit isOpen={isOpenModalDelete} closeModal={closeModalRemove}>
        <p className="text-[26px] font-medium">
          Do yo Delete This Product .... ?
        </p>
        <div className="flex items-center space-x-2">
          <Button
            className="bg-red-600 flex-2 hover:bg-red-700 transition-all duration-300"
            onClick={() => removeCard(id.toString())}
          >
            Delete
          </Button>
          <Button
            onClick={closeModalRemove}
            type="button"
            className="bg-gray-400 flex-1 px-4 hover:bg-gray-500 transition-all duration-300"
          >
            Cancel
          </Button>
        </div>
      </ModalEdit>
      <Toaster />
    </main>
  );
};

export default Version;
