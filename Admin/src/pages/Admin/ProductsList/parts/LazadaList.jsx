import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import React, { memo, useEffect, useState } from "react";
import { getDataTableList } from "../../../../helper/configTableData";

const LazadaList = ({ products = [], isLoading = false }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getDataTableList(products));
  }, [products]);

  const columns = [
    { title: "ID", dataIndex: "key", key: "key" },
    { title: "Title", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Discount", dataIndex: "discount", key: "discount" },
    {
      title: "Image",
      dataIndex: "image",
      render: (image) => <img src={image} width="100px" />,
    },
    { title: "Stock", dataIndex: "quantity", key: "quantity" },
    { title: "Status", dataIndex: "status", key: "status" },
  ];
  return (
    <div>
      <Button className="my-4" type="primary" icon={<PlusCircleOutlined />}>
        Thêm sản phẩm
      </Button>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 600, x: 800 }}
        loading={isLoading}
      ></Table>
    </div>
  );
};

export default memo(LazadaList);
