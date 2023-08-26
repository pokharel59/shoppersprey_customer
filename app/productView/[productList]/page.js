"use client"
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const ProductPage = (props) => {
    const router = useRouter();

    const [reviews, setReviews] = useState([]);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");

    const [isLoading, setIsLoading] = useState(true);

    const { data: session, status } = useSession();

    useEffect(() => {
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
        } finally {
            setIsLoading(false);
        }
    };

    const handleOrder = async () => {

        if (!session) {
            alert('Please log in to place an order. ');
            router.push('/loginPage')
            return;
        }

        try {
            const orderData = {
                recipient: `${session.user.name}, ${session.user.email}`,
                products: `${name}, ${price}, ${description}`,
                paid: false,
            };

            const response = await fetch("http://localhost:4000/api/postOrders/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            const data = await response.json();

            if (data.success) {
                alert("Order placed successfully")
                console.log('Order placed successfully:', data.result);
            } else {
                alert("Faled to place order")
                console.log('Failed to place order:', data);
            }
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    const handleReviewSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className="bg-gray-100 py-8">
            <div className="container mx-auto">
            {isLoading ? (
                <div className="w-full text-center">
                    <svg className="animate-spin h-8 w-8 text-blue-500 m-auto mb-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.854 3 7.291l3-2.602z"></path>
                    </svg>
                    <p className="text-gray-600">Loading...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white shadow-md">
                        <img
                            src="https://via.placeholder.com/200"
                            alt={name}
                            className="w-full h-auto"
                        />
                    </div>
                    <div className="w-full md:w-1/2 p-4 bg-white shadow-md">
                        <h1 className="text-2xl font-semibold mb-2">{name}</h1>
                        <p className="text-lg mb-4">Price: {price}</p>
                        <p className="text-gray-600 mb-6">{description}</p>
                        <p className="text-gray-600 mb-6">{category}</p>
                        <button
                            type='button'
                            onClick={handleOrder}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
                        >
                            Place Order
                        </button>
                    </div>
                </div>,

                    <div className="flex flex-wrap justify-between">
                        <div className="w-full md:w-1/2 p-4 bg-white shadow-md mb-4">
                            <h2 className="text-lg font-semibold mb-2">Write a Review</h2>
                            <form onSubmit={handleReviewSubmit}>
                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Rating
                                    </label>
                                    {/* Star rating component */}
                                    {/* Implement star rating component */}
                                </div>
                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full border rounded-md py-2 px-3"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full border rounded-md py-2 px-3"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
                                >
                                    Submit Review
                                </button>
                            </form>
                        </div>
                        <div className="w-full md:w-1/2 p-4 bg-white shadow-md mb-4">
                            <h2 className="text-lg font-semibold mb-2">Customer Reviews</h2>
                            {reviews.map((review) => (
                                <div key={review.id} className="bg-gray-200 p-4 mb-2 rounded-md">
                                    <p className="text-gray-600 mb-2">Rating: {review.rating}</p>
                                    <h3 className="text-md font-semibold mb-1">{review.title}</h3>
                                    <p className="text-gray-600">{review.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
            )}
            </div>

        </div>
    );
};

export default ProductPage;
