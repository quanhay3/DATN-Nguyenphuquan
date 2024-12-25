import React, { useState } from "react";
import { Table, Button, Tag, Switch, message, Modal } from "antd";
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "../../../services/user.service";
import { getDataTableList } from "../../../helper/configTableData";

const UserManagementPage = () => {
  const { data: users = [], isLoading } = useGetAllUsersQuery();
  const [updateUserState] = useUpdateUserMutation();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleStateChange = async (userId, state) => {
    try {
      await updateUserState({ userId, state }).unwrap();
      message.success(`User state updated successfully.`);
    } catch (error) {
      message.error("Failed to update user state.");
    }
  };
  
  // Handle modal open/close
  const showUserDetails = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setSelectedUser(null);
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "User ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Username",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={role === "admin" ? "gold" : "blue"}>{role}</Tag>
      ),
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      render: (state, record) => (
        <Switch
          checked={state}
          onChange={(checked) => handleStateChange(record._id, checked)}
          checkedChildren="Active"
          unCheckedChildren="Inactive"
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => showUserDetails(record)}>
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={
          users?.body?.data ? getDataTableList(users?.body?.data) : []
        }
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        scroll={{ y: 600 }}
        loading={isLoading}
      />
      <Modal
        title="User Details"
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        {selectedUser ? (
          <div>
            <p>
              <b>User ID:</b> {selectedUser._id}
            </p>
            <p>
              <b>Username:</b> {selectedUser.userName}
            </p>
            <p>
              <b>Email:</b> {selectedUser.email}
            </p>
            <p>
              <b>Phone Number:</b> {selectedUser.phoneNumber || "N/A"}
            </p>
            <p>
              <b>Address:</b> {selectedUser.address || "N/A"}
            </p>
            <p>
              <b>Role:</b> {selectedUser.role}
            </p>
            <p>
              <b>State:</b> {selectedUser.state ? "Active" : "Inactive"}
            </p>
            <p>
              <b>Avatar:</b>
            </p>
            <img
              src={selectedUser.avatar}
              alt="User Avatar"
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
            <h3>Orders:</h3>
            <ul>
              {selectedUser.orders && selectedUser.orders.length > 0 ? (
                selectedUser.orders.map((order) => <li key={order}>{order}</li>)
              ) : (
                <p>No orders available.</p>
              )}
            </ul>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
    </div>
  );
};

export default UserManagementPage;
