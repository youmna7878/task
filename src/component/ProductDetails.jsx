import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

export default function ProductDetails() {
    let [isLoading, setIsLoading] = useState(false)
    const [productsDetailes, setProductsDetailes] = useState(null);
    let { id } = useParams()
    function getProductsDetails(path) {
        setIsLoading(true)
        axios.get(`https://fakestoreapi.com/products/${path}`)
            .then(({ data }) => {
                setIsLoading(false)
                setProductsDetailes(data)
                console.log(data);
            }
            )
            .catch(() => {
                setIsLoading(false)
                console.log('error');
            })
    }


    useEffect(() => {
        getProductsDetails(id)

    },
        [id])
    return (
        <>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
                <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 flex flex-col md:flex-row items-center gap-10">
                    <div className="w-full md:w-1/2">
                        <img
                            src={productsDetailes?.image}
                            alt={productsDetailes?.title}
                            className="w-full h-[400px] object-contain rounded-2xl bg-gray-100 dark:bg-gray-700 p-4"
                        />
                    </div>
                    <div className="w-full md:w-1/2 space-y-5 text-gray-800 dark:text-gray-100">
                        <h1 className="text-3xl font-bold leading-snug">{productsDetailes?.title}</h1>
                        <h4 className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">{productsDetailes?.category}</h4>
                        <p className="text-base opacity-90 leading-relaxed">{productsDetailes?.description}</p>

                        <div className="flex items-center justify-between flex-wrap gap-3">
                            <p className="text-2xl font-bold text-blue-400 dark:text-blue-400">
                                {productsDetailes?.price}EGP
                            </p>
                            <span className="text-yellow-500 text-base font-medium">
                                <i className="fa-solid fa-star"></i> {productsDetailes?.rating?.rate || 0} ({productsDetailes?.rating?.count || 0})
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {isLoading ? <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
            </div> : null}
        </>
    )
}

