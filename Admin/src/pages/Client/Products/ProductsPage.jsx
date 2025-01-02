import { Menu, Select, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Item from "../../../components/Item/Item";
import Loading from "../../../components/Loading/Loading";
import { useGetAllExpandQuery } from "../../../services/product.service";
import { useGetAllCategoriesQuery } from "../../../services/category.service";

const ProductsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialPage = searchParams.get("page") || 1;
  const initialCateId = searchParams.get("cate_id") || "";
  const searchString = searchParams.get("q") || "";

  const [filter, setFilter] = useState({
    page: Number(initialPage),
    category: initialCateId || undefined,
    order: "desc",
    searchString: searchString || "",
  });

  const navigate = useNavigate();
  const { data: categories } = useGetAllCategoriesQuery();
  const { data: products, isLoading } = useGetAllExpandQuery({
    limit: 12,
    page: filter.page,
    categoryId: filter.category,
    order: filter.order,
    q: filter.searchString,
  });

  const handlePageChange = (pageNumber) => {
    setFilter((prev) => ({
      ...prev,
      page: pageNumber,
      searchString: searchString,
    }));
    navigate(
      `/products?page=${pageNumber}&cate_id=${filter.category || ""}&q=${
        filter.searchString
      }`
    );
  };

  const handleCategoryChange = (cateId) => {
    setFilter({
      ...filter,
      category: cateId,
      page: 1,
      searchString: searchString,
    });
    navigate(
      `/products?page=1&cate_id=${cateId || ""}&q=${filter.searchString}`
    );
  };

  useEffect(() => {
    setFilter((prev) => ({ ...prev, category: "", searchString: searchString }));
  }, [searchString]);

  const handleOrderChange = (order) => {
    setFilter((prev) => ({ ...prev, order }));
  };

  const renderCategories = () => {
    return [
      { key: "", label: "All" },
      ...(categories?.body?.data || []).map((cate) => ({
        key: cate._id,
        label: cate.name,
      })),
    ];
  };

  return (
    <div className="flex gap-6 px-10">
      {/* Sidebar Menu */}
      <div className="w-[20%] my-5">
        <div className="bg-white shadow-md rounded-md p-4">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ userSelect: "none" }}
          >
            Danh mục
          </h2>
          <Menu
            mode="inline"
            selectedKeys={[filter?.category || ""]}
            onClick={({ key }) =>
              handleCategoryChange(key.replace(/['"]/g, ""))
            }
            items={renderCategories()}
            style={{ userSelect: "none" }} // Prevents text selection
          />
        </div>
      </div>

      {/* Product Listing */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold my-5" style={{ userSelect: "none" }}>
          Danh mục sản phẩm
        </h1>
        <div className="flex justify-end items-center my-4">
          <Select
            defaultValue={filter.order}
            style={{ width: 150 }}
            onChange={handleOrderChange}
            options={[
              // Prevent text selection
              { value: "desc", label: "A - Z" },
              { value: "asc", label: "Z - A" },
            ]}
          />
        </div>
        {!isLoading ? (
          <>
            <div className="grid grid-cols-3 gap-6">
              {products?.body?.data?.map((item) => (
                <Link to={`/product/${item._id}`} key={item._id}>
                  <Item data={item}></Item>
                </Link>
              ))}
            </div>
            <Pagination
              className="my-10"
              current={filter.page}
              pageSize={12}
              onChange={handlePageChange}
              total={products?.body?.pagination?.totalItems}
              showSizeChanger={false}
            />
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
