"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const page = () => {
  const collectProducts = async () => {
    try {
      const cacheBuster = Date.now();
      let data = await fetch(`http://localhost:4000/api/getProducts?cacheBuster=${cacheBuster}`, {
        method: 'GET',
      });
      let dataArray = await data.json();
      if (dataArray.success) {
        return dataArray.result;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      return [];
    }
  };

  const [productDetail, setProductDetail] = useState([]);
  useEffect(() => {
    collectProducts().then((result) => {
      setProductDetail(result);
    });
  }, []);

  return (
    <div className="container mx-auto">
      <Link href={'/loginPage'} className="text-right">Login</Link>
      <h1 className="text-center mt-10">Products</h1>
      {productDetail.map((item) => (
        <Link href={`/productView/${item._id}`}>
          <div className="bg-white p-4 shadow-md">
            <img
              src={`data:image/jpeg;base64,${item.image}`}
              className="mt-4 w-full"
            />
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-gray-600">${item.price}</p>
            <p className="mt-2">{item.description}</p>
            <p className="mt-2 text-sm text-gray-500">Category: {item.category}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default page;
