"use client"
import React, { useEffect, useState } from 'react';

const ProductPage = (props) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() =>{
        getProductDetail();
    }, []);

    const getProductDetail = async () => {
        try {
            let productID = props.params.productList; // Assuming props.params.productView holds the product ID
            let productData = await fetch("http://localhost:4000/api/getProducts/" + productID);
            let productJson = await productData.json();
            
            if (productJson.success) {
                let result = productJson.result;
                setName(result.name);
                setPrice(result.price);
                setDescription(result.description);
                setCategory(result.category);
            } else {
                // Handle error here
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-2">{name}</h1>
            <p className="text-lg mb-4">Price: {price}</p>
            <p className="text-gray-600 mb-6">{description}</p>
            <p className="text-gray-600 mb-6">{category}</p>
            {/* Rest of your code */}
        </div>
    );
};

export default ProductPage;
