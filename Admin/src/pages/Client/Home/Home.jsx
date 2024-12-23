import React, { useEffect, useState } from "react";
import BannerSlice from "./BannerSlice/BannerSlice";
import Item from "../../../components/Item/Item";
import { Spin, Tabs } from "antd";
import { useGetProductsQuery } from "../../../services/product.service";
import { Link } from "react-router-dom";

const Home = () => {
  const { data, isLoading, refetch, error } = useGetProductsQuery();

  return (
    <div className="overflow-x-hidden">
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
              <div>
                {data ? (
                  <Tabs
                    defaultActiveKey="1"
                    type="card"
                    size={"large"}
                    items={[
                      {
                        label: `Lazada`,
                        key: 1,
                        children: (
                          <div className="flex flex-wrap gap-3 justify-around">
                            {data?.lazada?.map((item, index) => {
                              return (
                                <Link to={"/product/" + item._id} key={index}>
                                  <Item data={item}></Item>
                                </Link>
                              );
                            })}
                          </div>
                        ),
                      },
                      {
                        label: `Shopee`,
                        key: 22,
                        children: (
                          <div className="flex flex-wrap gap-3 justify-around">
                            {data?.shopee?.map((item, index) => {
                              return (
                                <Link to={"/product/" + item._id} key={index}>
                                  <Item data={item}></Item>
                                </Link>
                              );
                            })}
                          </div>
                        ),
                      },
                    ]}
                  />
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
