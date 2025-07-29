import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/noImage.jpg'

export default function Products() {

  const [searchItem, setSearchItem] = useState('')
  const [sort, setSort] = useState('');
  async function getProducts() {
    return await axios.get('https://fakestoreapi.com/products').then(res => res.data);
  }
  const { isError, isLoading, error, data } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 5000,
    refetchInterval: 30000,
  });
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="p-4 text-red-700 bg-red-100 rounded-md flex items-center justify-center">
        <strong>Error:</strong> {error.message}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl  mb-6 text-center text-blue-400 font-medium">  All Products </h1>
      <div className='my-10 flex flex-col md:flex-row justify-center items-center gap-4'>
        <input type="search" id="search" onChange={(e) => setSearchItem(e.target.value)} name="search" className="w-full md:w-2/4 border border-gray-300 text-gray-900 text-sm rounded-full shadow py-2.5 px-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white placeholder:text-gray-600 dark:placeholder:text-white  focus:shadow-blue-300  focus:outline-0" placeholder='Search...' />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-white dark:bg-gray-800 text-gray-700 font-medium dark:text-white rounded-xl px-4 py-2 border border-gray-200 dark:border-gray-700 shadow-[inset_1px_1px_4px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-blue-200 w-full md:w-auto" >
          <option value="default">Sort By</option>
          <option value="price-asc" >Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name (A-Z)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.filter((product) => {
          if (searchItem == '') {
            return product
          }
          else if (product.title.toLowerCase().includes(searchItem.toLowerCase())) {
            return product
          }
          else if (product.category.toLowerCase().includes(searchItem.toLowerCase())) {
            return product
          }
        })
          .sort((a, b) => {
            if (sort === 'price-asc') return a.price - b.price;
            if (sort === 'price-desc') return b.price - a.price;
            if (sort === 'name') return a.title.localeCompare(b.title);
            return 0;
          })
          .map(product => (
            <Link to={`/productdetails/${product.id}`} key={product.id}>
              <div
                className="mt-10 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-lg rounded-2xl overflow-hidden transition-transform hover:scale-105 duration-300"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  onError={(e) => {
                    e.currentTarget.src = {image};
                    e.currentTarget.onerror = null;

                  }}
                  className="h-48 w-full object-contain p-6 bg-gray-50 dark:bg-gray-800"
                />

                <div className="p-4 flex flex-col gap-2">
                  <h2 className="text-base font-semibold text-gray-800 dark:text-white line-clamp-2">
                    {product.title}
                  </h2>

                  <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                    {product.category}
                  </p>

                  <div className="flex justify-between items-center mt-3">
                    <span className="text-blue-400 dark:text-blue-400 font-bold text-lg">
                      {product.price}EGP
                    </span>
                    <span className="text-yellow-500 text-sm">
                      <i className="fa-solid fa-star"></i> {product.rating?.rate || 0} ({product.rating?.count || 0})
                    </span>
                  </div>
                </div>
              </div>

            </Link>
          ))}
      </div>
    </div >
  );
}
