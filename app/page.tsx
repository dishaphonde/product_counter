"use client";

import { useEffect, useState } from "react";

interface Product {
  title: string;
  thumbnail: string;
  price: number;
} 

export default function Home() {
  const [product, setProduct] = useState<Product | null>(null);
  const [productId, setProductId] = useState(1); 

  useEffect(() => {
    fetch(`https://api.freeapi.app/api/v1/public/randomproducts/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.data);
      })
      .catch((err) => console.log(err));
  }, [productId]); 

  const handleAdd = () => {
    setProductId(productId + 1);
  };

  const handleSub = () => {
    if (productId > 1) {
      setProductId(productId - 1);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold">{product.title}</h1>

      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-48 mx-auto my-4"
      />

      <p className="text-lg">Price: ₹{product.price}</p>

      <div className="flex justify-center items-center gap-4 mt-5">
        <button
          onClick={handleSub}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          -
        </button>

        <span className="text-xl">{productId}</span>

        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          +
        </button>
      </div>
    </div>
  );
}