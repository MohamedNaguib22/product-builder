export const validationErrorMessage = (product: {
  title: string;
  description: string;
  imageURL: string;
  price: string;
}) => {
  const errors: {
    title: string;
    description: string;
    imageURL: string;
    price: string;
  } = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };
  const imageUrlRegex = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);
  if (
    !product.title.trim() ||
    product.title.length < 12 ||
    product.title.length > 30
  ) {
    errors.title = "Product title must be between 10 and 30 characters!";
  }
  if (
    !product.description.trim() ||
    product.description.length < 12 ||
    product.description.length > 900
  ) {
    errors.description =
      "Product description must be between 10 and 900 characters!";
  }
  if (!product.imageURL.trim() || !imageUrlRegex) {
    errors.imageURL = "Valid image URL is required";
  }
  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "Valid price is required!";
  }
  return errors;
};
