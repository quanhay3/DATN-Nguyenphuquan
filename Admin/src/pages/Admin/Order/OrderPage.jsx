import React, { useState } from "react";
import { Table, Button, Modal, Tag, Select, message } from "antd";
import { useGetAllOrdersQuery, useUpdateOrderStatusMutation } from "../../../services/order.service";

const { Option } = Select;

const OrderPage = () => {
  const { data: orders = [], isLoading } = useGetAllOrdersQuery();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Handle modal open/close
  const showModal = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setSelectedOrder(null);
    setIsModalVisible(false);
  };

  // Update order status
  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus({ orderId, status }).unwrap();
      message.success("Order status updated successfully.");
    } catch (error) {
      message.error("Failed to update order status.");
    }
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "User",
      dataIndex: ["userId", "userName"],
      key: "user",
      render: (_, record) => record.userId?.userName || "N/A",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount) => `${amount.toLocaleString()} ₫`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const colors = {
          PENDING: "orange",
          PAID: "green",
          SHIPPED: "blue",
          DELIVERED: "purple",
        };
        return <Tag color={colors[status]}>{status}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => showModal(record)}>
            View Details
          </Button>
          <Select
            style={{ width: 150 }}
            defaultValue={record.status}
            onChange={(status) => handleStatusChange(record._id, status)}
          >
            <Option value="PENDING">PENDING</Option>
            <Option value="PAID">PAID</Option>
            <Option value="SHIPPED">SHIPPED</Option>
            <Option value="DELIVERED">DELIVERED</Option>
          </Select>
        </>
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={orders?.body?.data || []}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        scroll={{ y: 600, x: 800 }}
        loading={isLoading}
      />
      <Modal
        title="Order Details"
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        {selectedOrder ? (
          <>
            <p><b>Order ID:</b> {selectedOrder?._id}</p>
            <p><b>User:</b> {selectedOrder.userId?.userName}</p>
            <p><b>Shipping Address:</b> {selectedOrder.shippingAddress}</p>
            <p><b>Total Amount:</b> {selectedOrder.totalAmount.toLocaleString()} ₫</p>
            <p><b>Status:</b> {selectedOrder.status}</p>
            <h3>Items:</h3>
            <Table
              dataSource={selectedOrder?.items || []}
              columns={[
                { title: "Product", dataIndex: ["productId", "name"], key: "product" },
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
        ) : (
          "Loading..."
        )}
      </Modal>
    </div>
  );
};

export default OrderPage;
