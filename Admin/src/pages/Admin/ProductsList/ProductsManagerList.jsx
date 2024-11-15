import React, { useEffect, useState } from "react";
import { getProducts } from "../../../services/products";
import ShopifyList from "./parts/ShopifyList";
import LazadaList from "./parts/LazadaList";

const ProductsManagerList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    const result = await getProducts();
    console.log(result);
    setProducts(result);
    setIsLoading(false);
  };

  return (
    <div>
      <h1 className="text-[30px] font-bold mb-3">Danh sách sản phẩm</h1>
      <ShopifyList isLoading={isLoading} products={products.shopify}></ShopifyList>
      <LazadaList isLoading={isLoading} products={products.lazada}></LazadaList>
    </div>
  );
};

export default ProductsManagerList;
