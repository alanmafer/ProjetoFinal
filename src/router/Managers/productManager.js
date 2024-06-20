import fs from "fs";
import { v4 as uuid } from "uuid";

const path = "./src/managers/data/products.json";

let products = [];

const addProduct = async (product) => {
  try {
    await getProducts();
    
    const { title, description, price, thumbnail, code, stock, category } = product;

    const newProduct = {
      id: uuid(),
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
      status: true
    };

    products.push(newProduct);

    await fs.promises.writeFile(path, JSON.stringify(products));

    return newProduct;
    
  } catch (error) {
    console.log(`${error}`);
  }
};

const getProducts = async (limit) => {
  try {
    const fileJson = await fs.promises.readFile(path, 'utf-8');
    const parseFile = JSON.parse(fileJson);
    products = parseFile || [];

    if (limit){
       products = products.slice(0, limit);
      return products;
    } 
   

    return products;
  } catch (error) {
    console.log(`${error}`);
    return [];
  }
};

const getProductById = async (id) => {
  try {
    await getProducts();

    const product = products.find((p) => p.id === id);

    return product;
  } catch (error) {
    console.log(`${error}`);
  }
};

const updateProduct = async (id, productData) => {
  try {
    await getProducts();

    const index = products.findIndex((p) => p.id === id);
    products[index] = {
      ...products[index],
      ...productData,
    };

    await fs.promises.writeFile(path, JSON.stringify(products));

    return products[index];
  } catch (error) {
    console.log(`${error}`);
  }
};

const deleteProduct = async (id) => {
  try {
    await getProducts();

    products = products.filter((p) => p.id !== id);
    await fs.promises.writeFile(path, JSON.stringify(products));
    return products;
  } catch (error) {
    console.log(`${error}`);
  }
};

export default {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};