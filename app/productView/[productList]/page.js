"use client"
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const ProductPage = (props) => {
    const router = useRouter();

    const [reviews, setReviews] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [paid] = useState("No");
    const [orderStatus] = useState("pending");

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

    const handleDecreaseQuantity = () => {
        if(quantity > 0){
            setQuantity(quantity - 1);
        }
    };

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const handleOrder = async () => {
        let recipient = "";

        if (session === "unautenticated") {
            alert('Please log in to place an order. ');
            router.push('/loginPage')
            return;
        }else{
            recipient = `${session.user.name}, ${session.user.email}`;
        }
        try {
            console.log(recipient, name, price, quantity, paid, orderStatus);

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                recipient: recipient,
                name: name,
                price: price,
                quantity: parseInt(quantity),
                paid: paid,
                orderStatus: orderStatus, 
            }),
        };
            const response = await fetch("http://localhost:4000/api/postOrders/", requestOptions);
            console.log('API Response: ', response);

            const data = await response.json();
            if (data.success) {
                alert("Order placed successfully")
                console.log('Order placed successfully:', data.result);
            } else {
                alert("Failed to place order")
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
            <div className="flex ml-4">
                <div className="ml-4 p-4 bg-white items-center">
                    <img
                        src="https://via.placeholder.com/300"
                        alt={name}
                        className="rounded-lg h-auto"
                    />
                    <div className="flex">
                        <div className="p-4 bg-white">
                            <img
                                src="https://via.placeholder.com/70"
                                alt={name}
                                className="rounded-lg"
                            />
                        </div>
                        <div className="p-4 bg-white">
                            <img
                                src="https://via.placeholder.com/70"
                                alt={name}
                                className="rounded-lg"
                            />
                        </div>
                        <div className="p-4 bg-white">
                            <img
                                src="https://via.placeholder.com/70"
                                alt={name}
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                </div>

                <div className="md:w-1/2 p-4 flex-grow mr-4 ml-4">
                    <h1 className="text-2xl font-semibold mb-2">{name}</h1>
                    <p className="text-lg mb-4">Price: {price}</p>
                    <p className="text-gray-600 mb-6">{description}</p>
                    <p className="text-gray-600 mb-6">{category}</p>
                    <div className="flex border border-gray-300 rounded mb-4">
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
                    <button
                        type='button'
                        onClick={handleOrder}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
                    >
                        Place Order
                    </button>
                </div>

            </div>,

            <div className="flex gap-20">
                <div className="w-full md:w-1/3  p-4 bg-white shadow-md mb-4 ml-4">
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
                <div className="w-full md:w-2/3 p-4 bg-white shadow-md mb-4 mr-4">
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
        </div>
    );
};

export default ProductPage;