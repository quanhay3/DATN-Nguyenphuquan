import React, { useEffect, useState } from "react";
import ShopifyList from "./parts/ShopifyList";
import LazadaList from "./parts/LazadaList";
import { Tabs } from "antd";
import { useGetProductsQuery } from "../../../services/product.service";

const ProductsManagerList = () => {
  const { data, isLoading, refetch, error } = useGetProductsQuery()

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
            children: <ShopifyList isLoading={isLoading} products={data?.shopify || []}></ShopifyList>,
          },
          {
            label: `Lazada`,
            key: 2,
            children: <LazadaList isLoading={isLoading} products={data?.lazada || []}></LazadaList>,
          }
        ]}
      />
    </div>
  );
};

export default ProductsManagerList;
