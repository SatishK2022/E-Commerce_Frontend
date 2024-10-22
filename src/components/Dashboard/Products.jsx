import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  addProduct,
  deleteProduct,
  getCategories,
  getProducts,
  updateProduct,
  addCategory,
} from "../../redux/slices/dashboardSlice";

function Products() {
  const [showModal, setShowModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();

  const { register, handleSubmit, reset, setValue } = useForm();
  const {
    register: registerCategory,
    handleSubmit: handleSubmitCategory,
    reset: resetCategory,
  } = useForm();

  useEffect(() => {
    handleGetProducts();
    handleGetCategories();
  }, []);

  const handleGetCategories = async () => {
    const response = await dispatch(getCategories());

    console.log("Categories", response);

    if (response.payload) {
      setCategories(response.payload.data);
    }
  };

  const handleGetProducts = async () => {
    const response = await dispatch(getProducts());

    console.log("Products", response);

    if (response.payload) {
      setProducts(response.payload.data);
      setLoading(false);
    }
  };

  const handleAddProduct = async (product) => {
    const formData = new FormData();
    for (const key in product) {
      if (key === "image" && product[key][0]) {
        formData.append(key, product[key][0]);
      } else {
        formData.append(key, product[key]);
      }
    }

    const response = await dispatch(addProduct(formData));

    console.log("Product Added", product);

    if (response.payload) {
      setShowModal(false);
      reset();
      handleGetProducts();
    }
  };

  const handleAddCategory = async (category) => {
    const response = await dispatch(addCategory(category));

    console.log("Category Added", category);

    if (response.payload) {
      setShowCategoryModal(false);
      resetCategory();
      handleGetCategories();
    }
  };

  const handleUpdateProduct = async (updatedProduct) => {
    const formData = new FormData();
    for (const key in updatedProduct) {
      if (key === "image" && updatedProduct[key][0]) {
        formData.append(key, updatedProduct[key][0]);
      } else if (key !== "id") {
        formData.append(key, updatedProduct[key]);
      }
    }

    const productId = editingProduct.id;
    if (!productId) {
      console.error("Product ID is undefined");
      return;
    }

    console.log("formData", Object.fromEntries(formData));
    console.log("Updating product with ID:", productId);

    try {
      const response = await dispatch(updateProduct({ id: productId, data: formData }));

      if (response.payload) {
        setShowModal(false);
        setEditingProduct(null);
        handleGetProducts();
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async () => {
    if (productToDelete) {
      const response = await dispatch(deleteProduct(productToDelete));

      if (response.payload) {
        setShowDeleteConfirmation(false);
        setProductToDelete(null);
        handleGetProducts();
      }
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    Object.keys(product).forEach((key) => {
      setValue(key, product[key]);
    });
    setShowModal(true);
  };

  const handleDeleteConfirmation = (productId) => {
    setProductToDelete(productId);
    setShowDeleteConfirmation(true);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800 underline decoration-violet-600 underline-offset-8">
          Products
        </h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowCategoryModal(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center"
          >
            <FaPlus className="mr-2 text-sm" /> Add Category
          </button>
          <button
            onClick={() => {
              setEditingProduct(null);
              reset();
              setShowModal(true);
            }}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center"
          >
            <FaPlus className="mr-2 text-sm" /> Add Product
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-violet-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 rounded-md object-contain"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteConfirmation(product.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-2xl w-full">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingProduct(null);
                  reset();
                }}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>
            <form
              onSubmit={handleSubmit(
                editingProduct ? handleUpdateProduct : handleAddProduct
              )}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    {...register("name")}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    {...register("category")}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    {...register("price")}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Stock
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    {...register("quantity")}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  {...register("description")}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                ></textarea>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product Image
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="image"
                    name="image"
                    {...register("image")}
                    accept="image/*"
                    className="w-full px-3 py-2 pl-12 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          setImagePreview(e.target.result);
                        };
                        reader.readAsDataURL(e.target.files[0]);
                      }
                    }}
                  />
                  {(editingProduct?.image || imagePreview) && (
                    <img
                      src={imagePreview || editingProduct.image}
                      alt={editingProduct?.name || "Preview"}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 object-cover rounded-md"
                    />
                  )}
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingProduct(null);
                    reset();
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-violet-600 border border-transparent rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                >
                  {editingProduct ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Add New Category
              </h2>
              <button
                onClick={() => {
                  setShowCategoryModal(false);
                  resetCategory();
                }}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmitCategory(handleAddCategory)}>
              <div className="mb-4">
                <label
                  htmlFor="categoryName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="categoryName"
                  {...registerCategory("name")}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="categoryDescription"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="categoryDescription"
                  {...registerCategory("description")}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCategoryModal(false);
                    resetCategory();
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-violet-600 border border-transparent rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                >
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Confirm Delete
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProduct}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
