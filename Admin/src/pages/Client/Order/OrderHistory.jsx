import React from "react";
import { useGetOrdersByUserQuery } from "../../../services/order.service";
import Loading from "../../../components/Loading/Loading";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const OrderHistory = () => {
  const { data, isLoading } = useGetOrdersByUserQuery();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loading sreenSize="lg" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-bold m-3">Lịch sử đơn hàng</h1>
      {data?.body?.data?.map((order, index) => {
        return (
          <div
            key={index}
            className="border-[1px] shadow p-2 m-3 border-gray-200"
          >
            <div className="mb-5">
              <div className="flex items-center justify-between mb-1">
                <p>
                  Mã đơn hàng: <span className="font-bold">{order?._id}</span>
                </p>
                <span className="text-white bg-red-500 rounded-md p-1">
                  {order?.status}
                </span>
              </div>
              <hr />
            </div>
            <div>
              <div className="mb-2">
                <p>
                  Thời gian đặt hàng:{" "}
                  <span className="font-bold">
                    {order?.orderDate
                      ? format(
                          new Date(order?.orderDate),
                          "dd/MM/yyyy HH:mm:ss"
                        )
                      : "N/A"}
                  </span>
                </p>
              </div>
              <div className="mb-2">
                <p>
                  Thông tin nhận hàng:{" "}
                  <span className="font-bold">{order?.shippingAddress}</span>
                </p>
              </div>
              <div className="mb-2">
                <p>
                  Số lượng sản phẩm:{" "}
                  <span className="font-bold">{order?.items?.length || 0}</span>
                </p>
              </div>
              <div className="mb-2">
                <p>
                  Tổng tiền:{" "}
                  <span className="font-bold">
                    {order?.totalAmount.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </p>
              </div>
            </div>
            <div className="text-right">
              <Link to={"/"}>
                <Button>Chi tiết</Button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderHistory;
