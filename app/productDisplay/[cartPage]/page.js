"use client"
import React, { useEffect, useState } from 'react';

const CartPage = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCart()
  }, []);

  const getCart = async () => {
    try {
      let productID = props.params.cartPage;
      let productData = await fetch("http://localhost:4000/api/getProducts/" + productID);
      let productJson = await productData.json();

      if (productJson.success) {
        let result = productJson.result;
        setName(result.name);
        setPrice(result.price);
        setDescription(result.description);
        setCategory(result.category);
      } else {
        console.log("Data could not be fetched")
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-20 flex justify-between">
      {isLoading ? (
        <div className="w-full text-center">
          <svg className="animate-spin h-8 w-8 text-blue-500 m-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.854 3 7.291l3-2.602z"></path>
          </svg>
          <p className="text-gray-600">Loading...</p>
        </div>
      ) : (
        <div className='w-2/3 pr-4'>
          <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center border-b border-gray-300 py-2">
              <img
                src="https://via.placeholder.com/100"
                alt="Product"
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="ml-4">
                <h2 className="text-lg font-semibold">{name}</h2>
                <p className="text-gray-600">{price}</p>
                <p className="text-gray-600">{description}</p>
                <p className="text-gray-600">{category}</p>
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    className="px-2 py-1"
                    onClick={handleDecreaseQuantity}
                  >
                    -
                  </button>
                  <div className="px-3">{quantity}</div>
                  <button
                    className="px-2 py-1"
                    onClick={handleIncreaseQuantity}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="ml-auto flex items-center">
                <button
                  className="text-red-500 font-semibold mr-2"
                  onClick={() => {
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='w-1/3 pl-4'>
        <div className="bg-white rounded-lg shadow-md p-4 mt-4">
          <h2 className="text-lg font-semibold mb-2">Cart Summary</h2>
          <p className="text-gray-600">Total Items: {quantity}</p>
          <p className="text-gray-600">Total Price: ${(price * quantity).toFixed(2)}</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-4">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
