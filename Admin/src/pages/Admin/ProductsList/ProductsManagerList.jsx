import React, { useEffect, useState } from "react";
import ShopeeList from "./parts/ShopeeList";
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
            label: `Shopee`,
            key: 1,
            children: <ShopeeList isLoading={isLoading} products={data?.shopee || []}></ShopeeList>,
          },
          {
            label: `Shopify`,
            key: 2,
            children: <LazadaList isLoading={isLoading} products={data?.lazada || []}></LazadaList>,
          }
        ]}
      />
    </div>
  );
};

export default ProductsManagerList;
