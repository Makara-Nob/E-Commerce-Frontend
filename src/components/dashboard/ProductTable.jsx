import React from 'react';
import ProductModal from '../ProductModal';
import ProductService from '../../Services/ProductService';

const tableHeader = {
  product: 'Product',
  id: 'ID',
  name: 'Name',
  inventory: 'Inventory',
  price: 'Price',
  brand: 'Brand',
  action: ''
};

function ProductTable({ products, isLoading, isError, isRefetch }) {
  const [modalOpen, setModalOpen] = React.useState(false);  
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const activeProduct = selectedProduct || {};

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setModalOpen(true);
  };

  const handleEditProduct = (product) => {
      setSelectedProduct(product);
      setModalOpen(true);
  };

  const handleSaveProduct = async (data) => {
      try {
          if (selectedProduct) {
              await ProductService.updateProduct(selectedProduct.productId, data)
          } else {
              await ProductService.addProduct(data);
          }
          setModalOpen(false);
          isRefetch();
      } catch (error) {
          console.error("Error saving product:", error);
      }
  };

const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
        try {
            await ProductService.deleteProduct(productId);
            isRefetch();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }
};

  return (
    <div className="max-w-4xl md:max-w-3xl my-12">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">Products List</h3>
        <div className="w-full min-w-[200px] relative">
            <div className='w-auto gap-3 flex justify-end items-end'>
                <button 
                    onClick={handleAddProduct}
                    className=" text-white bg-green-500 px-5 py-1 rounded-md hover:bg-green-600">Add</button>
                <input
                    className="bg-white pr-12 h-10 pl-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Search for a product..."
                />
                <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    type="button"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197a7.5 7.5 0 10-10.607 10.607 7.5 7.5 0 0010.607-10.607l5.197 5.197z" />
                    </svg>
                </button>
            </div>
        </div>
      </div>

      {isLoading && <p className="text-blue-600">Loading...</p>}
      {isError && <p className="text-red-500">Error fetching products. Please try again.</p>}

      <div className="overflow-hidden max-w-4xl flex justify-center text-center bg-white shadow-md rounded-lg">
        <table className="w-auto table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left font-medium text-gray-700">{tableHeader.product}</th>
              <th className="p-4 text-left font-medium text-gray-700">{tableHeader.id}</th>
              <th className="p-4 text-left font-medium text-gray-700">{tableHeader.name}</th>
              <th className="p-4 text-left font-medium text-gray-700">{tableHeader.inventory}</th>
              <th className="p-4 text-left font-medium text-gray-700">{tableHeader.price}</th>
              <th className="p-4 text-left font-medium text-gray-700">{tableHeader.brand}</th>
              <th className="p-4 text-left font-medium text-gray-700">{tableHeader.action}</th>
            </tr>
          </thead>
          <tbody>
            {
              Array.isArray(products) || products?.length > 0 ? (
                products.map((product, index) => {
                  const imageUrl = product?.images && product.images.length > 0 ? 
                        `http://localhost:5000${product.images[0].downloadUrl}` : 
                        'https://via.placeholder.com/150';
    
                  return (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4 md:text-[12px]">
                      <img 
                          src={imageUrl} 
                          alt={product.name} 
                          className="w-13 h-12 object-cover rounded" />
                    </td>
                    <td className="p-4 text-gray-600">{product.productId}</td>
                    <td className="p-4 text-gray-600">{product.name}</td>
                    <td className="p-4 text-gray-600">{product.inventory}</td>
                    <td className="p-4 text-gray-600">{`$${product.price.toFixed(2)}`}</td>
                    <td className="p-4 text-gray-600">{product.brand}</td>
                    <td className="p-4 flex items-center justify-center space-x-2">
                      <button 
                          onClick={() => handleEditProduct(product)} 
                          className=" text-white bg-indigo-500 px-3 py-1 rounded-md hover:bg-indigo-600">
                            Edit
                      </button>
                      <button 
                          onClick={() => handleDeleteProduct(product.productId)} 
                          className=" text-white bg-red-500 px-3 py-1 rounded-md ml-2 hover:bg-red-600">
                            Delete
                      </button>
                    </td>
                  </tr>
                  )
            })
              ) : (
                <tr>
                  <td colSpan="8" className="p-4 py-5 text-center">No products found.</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>

      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveProduct}
        product={activeProduct} 
      />      
    </div>
  );
}

export default ProductTable;
