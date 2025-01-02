import React from "react";
import { Link } from "react-router-dom";

const ItemSearch = ({ data }) => {
  return (
    <Link
      to={`/product/${data._id}`}
      className="flex items-center hover:bg-[rgba(0,0,0,0.1)] p-[9px] px-[16px] cursor-pointer transition duration-200 ease-in-out text-decoration-none"
    >
      <img
        className="rounded-[8px] overflow-hidden w-[40px] h-[40px] object-cover"
        src={data.image}
        alt={data.name}
      />
      <div className="flex-1 max-w-[calc(100%-72px)] ml-[12px]">
        <h4 className="font-semibold text-sm max-w-full whitespace-nowrap text-ellipsis overflow-hidden">
          {data.name}
        </h4>
        {data?.discount ? (
          <p className="text-xm">
            <del>
              {(+data?.price || 0).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </del>{" "}
            <span className="text-md font-bold text-red-500">
              {(
                data.price - (data.price * data.discount) / 100 || 0
              ).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </p>
        ) : (
          <p className="text-[var(--text-color)] text-xl font-bold text-red-500">
            {(+data?.price || 0).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        )}
      </div>
    </Link>
  );
};

export default ItemSearch;
