"use client";

import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { use } from "react"; 
import Link from "next/link";

export default function ProductDetails({ params }) {
  const { id } = use(params);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
        <Oval height={80} width={80} color="#173459" ariaLabel="loading" />
      </div>

  }

  if (!product) {
    return <div className="text-center mt-20">
        <h1 className="text-2xl font-semibold text-main">Product not found</h1>
      </div>
    
  }

  return <>
    <div className="container mx-auto px-20 mt-11">
    <h1 className="text-5xl font-bold text-center mb-7">{product.title}</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Image */}
        <div className="lg:w-1/3">
          <img
            src={product.image}
            alt={product.title}
            className=" w-80 h-auto rounded-lg shadow-lg border border-gray-200"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            {product.description}
          </p>
          <p className=" text-lg font-semibold text-gray-500 mb-6">
            Category: <span className="text-gray-800 capitalize ml-3">{product.category}</span>
          </p>
          <p className="text-xl font-semibold text-rating-color mb-6">{product.price} $</p>


          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="border border-slate-950  px-6 py-2 rounded-lg shadow hover:bg-slate-950 hover:text-white transition">
              Add to Cart
            </button>
            <Link
            href={`/products`}
            className="border border-slate-950 px-6 py-2 rounded-lg shadow hover:bg-slate-950 hover:text-white transition">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  </>
}
