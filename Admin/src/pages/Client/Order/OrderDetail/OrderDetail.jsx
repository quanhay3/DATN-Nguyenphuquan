import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetOrderQuery } from "../../../../services/order.service";
import { Button, Table } from "antd";
import Loading from "../../../../components/Loading/Loading";
import { ArrowLeftOutlined } from "@ant-design/icons";

const OrderDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetOrderQuery(id);
  return (
    <div className="p-8">
        <Link to={'/orders'}><Button><ArrowLeftOutlined/> Trở lại</Button></Link>
        <h1 className="text-center text-2xl font-bold mb-4">Thông tin đơn hàng của bạn</h1>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
          <p className="mb-2">
            <b>Order ID:</b> {data?.body?.data?._id}
          </p>
          <p className="mb-2">
            <b>User:</b> {data?.body?.data?.userId?.userName}
          </p>
          <p className="mb-2">
            <b>Shipping Address:</b> {data?.body?.data?.shippingAddress}
          </p>
          <p className="mb-2">
            <b>Payment method:</b> {data?.body?.data?.paymentMethod}
          </p>
          <p className="mb-2">
            <b>Total Amount:</b> {data?.body?.data?.totalAmount?.toLocaleString()} ₫
          </p>
          <p className="mb-2">
            <b>Status:</b> {data?.body?.data?.status}
          </p>
          <h3>Items:</h3>
          <Table
            dataSource={data?.body?.data?.items || []}
            columns={[
              {
                title: "Product",
                dataIndex: ["productId", "name"],
                key: "product",
              },
              { title: "Quantity", dataIndex: "quantity", key: "quantity" },
              {
                title: "Price",
                dataIndex: "price",
                key: "price",
                render: (price) => `${price.toLocaleString()} ₫`,
              },
              {
                title: "Total Price",
                dataIndex: "totalPrice",
                key: "totalPrice",
                render: (totalPrice) => `${totalPrice.toLocaleString()} ₫`,
              },
            ]}
            rowKey={(item) => item?.productId?._id || "'"}
            pagination={false}
          />
        </>
      )}
    </div>
  );
};

export default OrderDetail;
