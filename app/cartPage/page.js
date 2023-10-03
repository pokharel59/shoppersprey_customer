"use client"
import React, { useState, useEffect } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartAvailable, setCartAvailable] = useState(true);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const user_id = JSON.parse(atob(token.split('.')[1])).user_id;

      const response = await fetch(`http://localhost:4000/api/getCart`);
      const data = await response.json();

      if (data.success) {
        const cartItem = data.result.find((item) => item.user_id === user_id);
        if (cartItem) {
          setCartItems(cartItem.product_ids);
          console.log(cartItem);
        } else {
          setCartAvailable(false);
        }
      } else {
        setCartAvailable(false);
        console.error('Failed to fetch cart items.');
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Cart Items</h2>
      {cartAvailable ? (
        cartItems.length > 0 ? (
          <div>
            {cartItems.map((productId, index) => (
              <div key={index} className="border p-4 mb-4 rounded">
                {/* Fetch product details based on productId and display them */}
                <h3 className="text-xl font-bold mb-2">Product {index + 1}</h3>
                <p>Product Name: Fetch this from the database based on productId</p>
                <p>Price: Fetch this from the database based on productId</p>
                <p>Description: Fetch this from the database based on productId</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No items in the cart.</p>
        )
      ) : (
        <p>Cart not available for this user.</p>
      )}
    </div>
  );
};

export default CartPage;