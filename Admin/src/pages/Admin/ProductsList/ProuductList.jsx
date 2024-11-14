import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { getProducts } from "../../../services/products";
import { getDataTableList } from "../../../helper/configTableData";
import Column from "antd/es/table/Column";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    const result = await getProducts();
    console.log(result);
    const data = getDataTableList(result);
    setProducts(data);
    setIsLoading(false);
  };

  const expandedColumn = [
    {title: "Name", dataIndex: "title", key: "title"},
    {title: "Price", dataIndex: "price", key: "price"},
    {title: "Image", key: "image", render: (image) => <img src={image} width="100px" /> },
    {title: "Inventory Management", dataIndex: "inventory_management", key: "inventory_management"},
    {title: "Stock", dataIndex: "stock", key: "stock"},
  ]

  const renderVariants = (variants) => {
    const data = variants.map((variant, index) => ({
      key: index + 1,
      ...variant
    }))
    return (
      <Table
        dataSource={data}
        columns={expandedColumn}
        pagination={false}
        size="small"
      >
      </Table>
    );
  };

  const columns = [
    {title: "ID", dataIndex: "key", key: "key"},
    {title: "Title", dataIndex: "title", key: "title"},
    {title: "Vendor", dataIndex: "vendor", key: "vendor"},
    {title: "Category", dataIndex: "product_type", key: "product_type"},
  ]

  return (
    <div>
      <h1 className="text-[30px] font-bold mb-3">Danh sách sản phẩm</h1>
      <Button className="my-4" type="primary" icon={<PlusCircleOutlined />}>
        Thêm sản phẩm
      </Button>
      <Table
        dataSource={products}
        columns={columns}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 600, x: 800 }}
        loading={isLoading}
        expandable={{
          expandedRowRender: (record) => renderVariants(record.variants),
          rowExpandable: (record) => record.variants && record.variants.length > 0, // Only allow expand if there are variants
          defaultExpandedRowKeys: ['0']
        }}
      >        
      </Table>
    </div>
  );
};

export default ProductList;
