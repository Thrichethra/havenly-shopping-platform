import { postMethod } from "./postMethod";
// The base URL for the API endpoints.
const Api = "https://localhost:44367/api/service/";

// Load All Categories
export const api_LoadAllCategories = () => {
  let url = `${Api}ReadAllCategory`;
  return postMethod(url, {});
};

// Loads all products
export const api_LoadAllProducts = () => {
  let url = `${Api}ReadAllProduct`;
  return postMethod(url, {});
};

// Load Products By Category
export const api_LoadProductsByCategory = async (cid) => {
  const url = `${Api}ReadProductsByCategory`;
  return await postMethod(url, JSON.stringify(cid));
};

// Load Product Details By PID
export const api_LoadProductDetails = async (pid) => {
  const url = `${Api}ReadProductDetails`;
  return await postMethod(url, JSON.stringify({ PID: pid }));
};

// Read Customer
export const api_ValidateCustomer = async (username, password) => {
  const url = `${Api}ValidateCustomer`;
  return await postMethod(url, { UserName: username, Password: password });
};

//Saves a new customer's information
export const api_SaveCustomer = (
  firstName,
  address,
  contact,
  username,
  password
) => {
  let url = `${Api}SaveCustomer`;
  const customerData = {
    FirstName: firstName,
    Address: address,
    Contact: contact,
    UserName: username,
    Password: password,
  };
  return postMethod(url, customerData);
};

//Save Invoice
export const api_SaveInvoice = (checkoutData) => {
  let url = `${Api}SaveInvoice`;
  return postMethod(url, checkoutData);
};
