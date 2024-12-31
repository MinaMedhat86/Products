"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  //API
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // Handle search input 
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter products 
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return  <div className="flex justify-center items-center h-screen">
        <Oval height={80} width={80} color="#173459" ariaLabel="loading" />
      </div>
  }

  return (
    <>
      <h1 className="text-center font-bold mt-10 text-4xl">Product Gallery</h1>

      {/* Search Bar */}
      <div className="mx-5 mt-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          className="px-4 py-2 border border-gray-300 rounded-md w-full"
          placeholder="Search products..."
        />
      </div>

      {/* Display products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6 mt-6">
        {filteredProducts.map((product) => {
          return <div
          key={product.id}
          className="border bg-container-color rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden"
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-56 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-main truncate">
              {product.title}
            </h3>
            <p className="text-sm text-gray-500 mt-2 truncate">
              {product.description}
            </p>
            <div className="flex justify-between items-center mt-4">
              <p className="text-xl font-bold">${product.price}</p>
              <Link
                className="px-4 py-2 bg-main-color rounded-md hover:bg-opacity-90 transition-opacity"
                href={`/products/${product.id}`}
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
        }

        )}
      </div>
    </>
  );
}
