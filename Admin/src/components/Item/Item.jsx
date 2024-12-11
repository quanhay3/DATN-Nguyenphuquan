import { Badge, Card } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useEffect, useState } from "react";

const Item = ({ data }) => {
  const [item, setItem] = useState(data || {});

  useEffect(() => {
    setItem(data);
  }, [data]);

  return (
    <div className="inline-block">
      <Badge.Ribbon className="inline-block" color="red" text="SALE">
        <Card
          hoverable
          style={{ 
            width: 280, 
            height: 400,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          cover={
            <img
              alt="example"
              className="max-h-[280px] object-cover"
              src={item.images && item.images.length > 0 ? item.images[0] : ''}
            />
          }
        >
          <Meta title={item?.name} description={(item?.skus && item?.skus.length > 0) ? item?.skus[0]?.special_price ? (<p className=""><del>{(item?.skus[0]?.price || 0) + " đ"}</del> <p className="text-xl font-bold text-red-500">{(item?.skus[0]?.special_price || 0) + " đ"}</p></p>) : (<p className="text-xl font-bold text-red-500">{(item?.skus[0]?.price || 0) + " đ"}</p>) : "0 đ"} />
        </Card>
      </Badge.Ribbon>
    </div>
  );
};

export default Item;
