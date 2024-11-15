import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import React, { memo, useEffect, useState } from 'react'
import { getDataTableList } from '../../../../helper/configTableData';

const LazadaList = ({ products = [], isLoading = false }) => {
    const [data, setData] = useState([])
    
    useEffect(() => {
      setData(getDataTableList(products))
    }, [products])

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
      <Button className="my-4" type="primary" icon={<PlusCircleOutlined />}>
        Thêm sản phẩm
      </Button>
      <Table
        dataSource={data}
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
  )
}

export default memo(LazadaList)
