import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { shopDataContext } from '../context/ShopContext';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import RelatedProducts from '../components/RelatedProducts';
import Loading from '../components/Loading';

function ProductDetail() {
    let { productId } = useParams();
    let { products, currency, addtoCart , loading } = useContext(shopDataContext);
    let [productData, setProductData] = useState(null);

    const [image, setImage] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');
    const [size, setSize] = useState('');

    useEffect(() => {
        products.map((item) => {
            if (item._id === productId) {
                setProductData(item);
                setImage1(item.image1);
                setImage2(item.image2);
                setImage3(item.image3);
                setImage4(item.image4);
                setImage(item.image1);
            }
        });
    }, [productId, products]);

    return productData ? (
        <div className="w-full bg-[#f4f2ff] text-[#222] pt-[70px]">
            <div className="w-full min-h-[100vh] flex flex-col lg:flex-row gap-10 px-4 lg:px-20 py-10">
                {/* Image Section */}
                <div className="w-full h-[80%] lg:w-1/2 flex flex-col lg:flex-row gap-4 ">
                    <div className="flex lg:flex-col gap-2 items-center justify-center ">
                        {[image1, image2, image3, image4].map((img, idx) => (
                            <div
                                key={idx}
                                className={`w-[60px] h-[60px] md:w-[100px] md:h-[110px] border rounded-md cursor-pointer ${img === image ? 'border-black' : 'border-gray-200'
                                    }`}
                            >
                                <img
                                    src={img}
                                    alt="thumb"
                                    className="w-full h-full object-cover rounded-md"
                                    onClick={() => setImage(img)}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="rounded-md bg-transparent flex items-center justify-center p-2">
                        <img
                            src={image}
                            alt="main"
                            className="max-h-[464px] w-auto object-cover rounded-md"
                        />
                    </div>

                </div>

                {/* Product Info */}
                <div className="w-full lg:w-1/2 flex flex-col gap-4">
                    <h1 className="text-3xl font-bold">{productData.name.toUpperCase()}</h1>

                    <div className="flex items-center gap-1 text-yellow-500">
                        <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
                        <span className="text-gray-600 ml-2">(124)</span>
                    </div>

                    <p className="text-2xl font-semibold">{currency} {productData.price}</p>

                    <p className="text-base text-gray-700 leading-relaxed">
                        {productData.description} and Stylish, breathable cotton shirt with a modern slim fit. Easy to wash, super comfortable, and designed for effortless style.
                    </p>

                    <div>
                        <p className="text-lg font-semibold mt-2">Select Size</p>
                        <div className="flex gap-2 mt-2">
                            {productData.sizes.map((item, index) => (
                                <button
                                    key={index}
                                    className={`border px-4 py-2 rounded-md font-medium ${item === size ? 'bg-black text-white' : 'bg-white text-black'
                                        }`}
                                    onClick={() => setSize(item)}
                                >
                                    {item.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        disabled={!size}
                        className={`mt-4 px-6 py-3 rounded-md transition text-white font-semibold ${size
                                ? 'bg-blue-600 hover:bg-blue-700'
                                : 'bg-gray-400 cursor-not-allowed'
                            }`}
                        onClick={() => ( size && addtoCart(productData._id, size))}
                    >
                        { loading ? <Loading /> : "Add to Cart"}
                    </button>

                    <div className="border-t pt-4 mt-6 text-sm text-gray-600 space-y-1">
                        <p>100% Original Product</p>
                        <p>Cash on delivery is available</p>
                        <p>Easy return and exchange policy within 7 days</p>
                    </div>
                </div>
            </div>

            {/* Description & Reviews */}
            <div className="w-full px-4 lg:px-20 mt-10 border border-white ">
                <div className="flex gap-4 border-b pb-2">
                    <button className="border px-5 py-2 bg-white rounded-md">Description</button>
                    <button className="border px-5 py-2 bg-white rounded-md">Reviews (124)</button>
                </div>

                <div className="mt-4 text-gray-700 text-base p-5 rounded-md shadow">
                    Upgrade your wardrobe with this stylish slim-fit cotton shirt, available now on OneCart. Crafted from breathable, high-quality fabric, it offers all-day comfort and effortless style. Easy to maintain and perfect for any setting, this shirt is a must-have essential for those who value both fashion and function.
                </div>
                 {/* <RelatedProduct category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id}/> */}
                 <RelatedProducts category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id}  />
            </div>


        </div>
    ) : null;
}

export default ProductDetail;
