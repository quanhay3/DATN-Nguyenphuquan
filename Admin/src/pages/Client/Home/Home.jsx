import React, { useEffect, useState } from "react";
import BannerSlice from "./BannerSlice/BannerSlice";
import { getProducts } from "../../../services/products";
import Item from "../../../components/Item/Item";
import { Spin } from "antd";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    const result = await getProducts();
    console.log(result);
    setProducts(result.lazada.products);
    setIsLoading(false);
  };

  return (
    <div>
      <div className="px-32">
        <BannerSlice />

        <div className="my-14">
          <h1 className="text-[32px] text-center font-bold">
            Sản phẩm nổi bật
          </h1>
          <div className="my-12">
              {isLoading ? (
                <div className="text-center">
                  <Spin></Spin>
                </div>
              ) : (
                <div className="flex flex-wrap gap-3 justify-around">
                  {products.length > 0 ? (
                    products.map((item, index) => {
                      return <Item key={index} data={item}></Item>;
                    })
                  ) : (
                    <></>
                  )}
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
