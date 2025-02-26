// ProductService.js
import Api from "../api/api";

const endpoint = "/product";

// API Service Object
const ProductService = {
  getProducts: async () => {
    try {
      const response = await Api.get(endpoint);
      console.log("Response:", response); 
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products");
    }
  },

  getProductById: async (id) => {
    try {
      const response = await Api.get(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw new Error(error.response?.data?.message || "Failed to fetch product");
    }
  },

  addProduct: async (productData) => {
    try {
      const response = await Api.post(endpoint, productData);
      return response.data;
    } catch (error) {
      console.error("Error adding product:", error);
      throw new Error("Failed to add product");
    }
  },

  updateProduct: async (productId, productData) => {
    try {
      const response = await Api.put(`${endpoint}/${productId}`, productData);
      return response.data;
    } catch (error) {
      console.error(`Error updating product with ID ${productId}:`, error);
      throw new Error("Failed to update product");
    }
  },

  deleteProduct: async (productId) => {
    try {
      const response = await Api.delete(`${endpoint}/${productId}`);
      return response.status; // Returning the status code (e.g., 200 OK)
    } catch (error) {
      console.error(`Error deleting product with ID ${productId}:`, error);
      throw new Error("Failed to delete product");
    }
  }
};
export default ProductService;
