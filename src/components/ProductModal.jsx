import React, { useState } from "react";

const ProductModal = ({ isOpen, onClose, onSave, product }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    brand: "",
    inventory: "",
    description: "",
    categoryId: ""
  });
  const [imageFile, setImageFile] = useState([]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
      setImageFile(e.target.files); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.price ||
      !formData.brand ||
      !formData.inventory ||
      !formData.description ||
      !formData.categoryId ||
      imageFile.length === 0
    ) {
      alert("Please fill all the fields!");
      return;
    }
  
    try {
      const formPayload = new FormData();
  
      // Append the product data as a Blob (JSON) for 'product' field
      formPayload.append(
        "product",
       JSON.stringify(formData)
      );
  
      // Append the image file(s)
     for(let i = 0; i < imageFile.length; i++){
      formPayload.append("files",imageFile[i])
     }
      // Perform the POST request
      await onSave(formPayload);
      onClose(); // Close modal after saving
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{product ? "Edit Product" : "Add Product"}</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step='0.01'
            placeholder="Price"
            className="w-full p-2 border rounded"
            min="0"
            required
          />
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="inventory"
            value={formData.inventory}
            onChange={handleChange}
            placeholder="Inventory"
            className="w-full p-2 border rounded"
            min="0"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="number"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            placeholder="categoryId"
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="file"
            multiple
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
            required
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;