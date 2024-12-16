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
              src={item?.image || ""}
            />
          }
        >
          <Meta
            title={item?.name}
            description={
              item?.discount ? (
                <p className="">
                  <del>
                    {(+item?.price || 0).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </del>{" "}
                  <p className="text-xl font-bold text-red-500">
                    {(
                      item.price - (item.price * item.discount) / 100 || 0
                    ).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </p>
              ) : (
                <p className="text-xl font-bold text-red-500">
                  {(+item?.price || 0).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              )
            }
          />
        </Card>
      </Badge.Ribbon>
    </div>
  );
};

export default Item;
