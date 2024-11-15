import React, { useEffect, useState } from "react";
import { getProducts } from "../../../services/products";
import ShopifyList from "./parts/ShopifyList";
import LazadaList from "./parts/LazadaList";
import { Tabs } from "antd";

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
      <Tabs
        defaultActiveKey="1"
        type="card"
        size={"large"}
        items={[
          {
            label: `Shopify`,
            key: 1,
            children: <ShopifyList isLoading={isLoading} products={products?.shopify || []}></ShopifyList>,
          },
          {
            label: `Lazada`,
            key: 2,
            children: <LazadaList isLoading={isLoading} products={products?.lazada?.products || []}></LazadaList>,
          }
        ]}
      />
    </div>
  );
};

export default ProductsManagerList;
