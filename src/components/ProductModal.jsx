import React, { useState, useEffect } from 'react';

const ProductModal = ({ isOpen, onClose, onSave, product }) => {
  const defaultFormData = {
    name: "",
    price: "",
    brand: "",
    inventory: "",
    description: "",
    category: {
      id: 0,
      name: "",
      subCategories: [],
    },
  };

  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price ? product.price.toString() : "", // Ensure it's a string
        brand: product.brand || "",
        inventory: product.inventory ? product.inventory.toString() : "", // Ensure it's a string
        description: product.description || "",
        category: {
          id: product.category?.id || 0,
          name: product.category?.name || "",
          subCategories: product.category?.subCategories || [],
        },
      });
    } else {
      setFormData(defaultFormData);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "subCategories") {
      // Handle multiple subCategories as an array
      setFormData((prevState) => ({
        ...prevState,
        category: {
          ...prevState.category,
          subCategories: value.split(",").map((item) => item.trim()),
        },
      }));
    } else if (name.includes("category")) {
      // Update category fields
      const fieldName = name.split(".")[1]; // Extract "name" or "id"
      setFormData((prevState) => ({
        ...prevState,
        category: {
          ...prevState.category,
          [fieldName]: fieldName === "id" ? Number(value) : value, // Convert ID to a number
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: name === "price" || name === "inventory" ? value.replace(/\D/g, "") : value, // Ensure only numeric input
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSave(formData);
      onClose();
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
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="inventory"
            value={formData.inventory}
            onChange={handleChange}
            placeholder="Inventory"
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded"
          />

          {/* Category Inputs */}
          <input
            type="text"
            name="category.name"
            value={formData.category.name}
            onChange={handleChange}
            placeholder="Category Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="category.id"
            value={formData.category.id}
            onChange={handleChange}
            placeholder="Category ID"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="subCategories"
            value={formData.category.subCategories.join(", ")}
            onChange={handleChange}
            placeholder="Subcategories (comma separated)"
            className="w-full p-2 border rounded"
          />

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              {product ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
