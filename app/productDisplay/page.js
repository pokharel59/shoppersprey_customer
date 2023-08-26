"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import HeroSection from '../components/hero';

const ProductsDisplay = () => {

    const [isLoading, setIsLoading] = useState(true);

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
            setIsLoading(false);
        });
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="px-0 py-0">
                <div className="mb-4">
                    <HeroSection />
                </div>
                <h1 className="text-centre mt-10 font-semibold tracking-tight text-gray-900 dark:text-black">Products</h1>
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center mt-4">
                    <svg className="animate-spin h-8 w-8 text-blue-500 mb-2" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.854 3 7.291l3-2.602z"></path>
                    </svg>
                    <p className="text-gray-600">Loading...</p>
                </div>
                ):(
                    <div className="grid gap-4 grid-cols-4">
                    {productDetail.map((item) => (
                        <Link href={`/productView/${item._id}`}>
                            <div key={item._id} className="bg-white p-4 shadow-md transition-transform transform hover:scale-105 hover:shadow-lg rounded-lg" style={{ width: '220px', height: '290px' }}>
                                <div className="w-full h-40">
                                    <img
                                        src="https://via.placeholder.com/100"
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">{item.name}</h2>
                                <p className="text-gray-600">${item.price}</p>
                                <div className="mt-3">
                                    <Link href={`/productDisplay/${item._id}`}>
                                    <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                        Add to cart
                                    </button>
                                    </Link>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                )}
            </div>
        </div>
    );
};

export default ProductsDisplay;
