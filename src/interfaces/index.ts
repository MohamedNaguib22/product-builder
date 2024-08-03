export interface IProducts {
  id?: string;
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string[];
  category: {
    name: string;
    imageURL: string;
  };
}

export interface IForm {
  id: string;
  name: "title" | "description" | "imageURL" | "price";
  label: string;
  type: string;
  placeholder: string;
}

export interface ICategory {
  id: string;
  name: string;
  imageURL: string;
}
