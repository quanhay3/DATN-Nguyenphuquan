import { Pagination, Radio, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Item from "../../../components/Item/Item";
import { useGetAllExpandQuery } from "../../../services/product.service";
import Loading from "../../../components/Loading/Loading";
import { useGetAllCategoriesQuery } from "../../../services/category.service";

const ProductsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page") != null ? searchParams.get("page") : 1;
  const cateId =
    searchParams.get("cate_id") != null ? searchParams.get("cate_id") : "";
  const [filter, setFilter] = useState({ page: page || 1 });
  const navigate = useNavigate();
  const { data: categories } = useGetAllCategoriesQuery();
  const { data: products, isLoading } = useGetAllExpandQuery({
    limit: 12,
    page: filter?.page,
    categoryId: filter?.category,
    order: filter?.order || "desc",
  });

  useEffect(() => {
    setFilter({
      ...filter,
      page: page,
      category: cateId == "" ? undefined : cateId,
    });
    // eslint-disable-next-line
  }, [page, cateId]);

  const handlePageChange = async (pageNumber) => {
    navigate("/products?page=" + pageNumber + "&cate_id=" + cateId);
  };

  const onChange = (e) => {
    navigate(
      "/products?page=" +
        page +
        (e.target.value ? "&cate_id=" + e.target.value : "")
    );
  };

  return (
    <div className="flex gap-3 px-10">
      <div className="w-[20%] my-5">
        <h2 className="text-xl my-2">Danh mục</h2>
        <hr />
        <Radio.Group onChange={onChange}>
          <Space direction="vertical">
            <Radio value={undefined}>All</Radio>
            {categories?.body?.data?.map((cate, index) => {
              return (
                <Radio key={index} value={cate._id}>
                  {cate.name}
                </Radio>
              );
            })}
          </Space>
        </Radio.Group>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl my-5 font-bold">Danh mục sản phẩm</h1>
        <div className="flex justify-end items-center my-4">
            <Select
              defaultValue="desc"
              className=""
              style={{ width: 120 }}
              onChange={(e) => setFilter({ ...filter, order: e }) }
              options={[
                { value: "desc", label: "A -> Z" },
                { value: "asc", label: "Z -> A" },
              ]}
            />
        </div>
        {!isLoading ? (
          <>
            <div className="flex flex-wrap gap-3 justify-around">
              {products?.body?.data?.map((item, index) => {
                return (
                  <Link to={"/product/" + item._id} key={index}>
                    <Item data={item}></Item>
                  </Link>
                );
              })}
            </div>
            <Pagination
              align="center"
              className="my-10"
              onChange={(current) => handlePageChange(current)}
              responsive={true}
              pageSize={12}
              showSizeChanger={false}
              defaultCurrent={products?.body?.pagination?.currentPage}
              total={products?.body?.pagination?.totalItems}
            />
          </>
        ) : (
          <Loading></Loading>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
