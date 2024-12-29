import React from "react";
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import { info } from "../../../constants/info";

const ContactPage = () => {
  return (
    <>
      <div className="main">
        <section className="section-breadcrumb py-[15px] bg-[#f7f7f7] border-b-[1px] border-[#e2e2e2]">
          <div className="cont mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px] flex max-lg:flex-wrap items-start relative">
            <span>
              <Link to="/">Trang chủ </Link> / Liên hệ
            </span>
          </div>
        </section>
        <section className=" lg:py-[100px] md:py-[80px] max-md:py-[60px]">
          <div className=" mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px] ">
            <div className="">
              <div className="contact-main flex gap-7 flex-wrap  lg:flex-nowrap">
                <div className="contact   bg-cover w-[50%] max-lg:w-full">
                  <div
                    style={{ borderRadius: `5px`, padding: `15px` }}
                    className="infor-contact bg-lime-200 mb-5 "
                  >
                    <Title className=" text-start" level={2}>
                      {info.websiteName}
                    </Title>
                    <ul
                      style={{ padding: `10px` }}
                      className="flex text-4xl flex-wrap gap-1 w-[100%]  "
                    >
                      <li className="w-[100%] gap-3 flex items-center  ">
                        <div>
                          <EnvironmentOutlined />
                        </div>
                        <div className="text-sm">
                          <Title level={5}>Địa chỉ</Title>
                          <p>{info.address}</p>
                        </div>
                      </li>

                      <li className="w-[100%] gap-3 flex items-center">
                        <div>
                          <PhoneOutlined />
                        </div>
                        <div className="text-sm">
                          <Title level={5}>Số điện thoại</Title>

                          <p>{info.phoneNumber}</p>
                        </div>
                      </li>

                      <li className="w-[100%] gap-3 flex items-center">
                        <div>
                          <MailOutlined />
                        </div>
                        <div className="text-sm">
                          <Title level={4}>Email</Title>
                          <p>{info.email}</p>
                        </div>
                      </li>

                      <li className="w-[100%] gap-3 flex items-center">
                        <div>
                          <ClockCircleOutlined />
                        </div>
                        <div className="text-sm">
                          <Title level={5}>Giờ làm việc</Title>
                          <p>8h - 22h</p>
                          <p>Từ thứ 2 đến chủ nhật</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div
                    style={{ borderRadius: `5px`, padding: `15px` }}
                    className="form-contact  bg-lime-200 mt-5"
                  >
                    <Title className="text-start" level={2}>
                      Gửi yêu cầu của bạn
                    </Title>
                    <h2>
                      Nếu bạn có thắc mắc gì, có thể gửi yêu cầu cho chúng tôi,
                      và chúng tôi sẽ liên lạc lại với bạn sớm nhất có thể .
                    </h2>
                    <Form className="mt-5">
                      <Form.Item
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng điền họ và tên!",
                          },
                        ]}
                      >
                        <Input placeholder="Họ và tên" />
                      </Form.Item>
                      <Form.Item
                        name="email"
                        rules={[
                          { required: true, message: "Vui lòng nhập email!" },
                        ]}
                      >
                        <Input type="email" placeholder="Email" />
                      </Form.Item>
                      <Form.Item
                        name="phone"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập số điện thoại!",
                          },
                        ]}
                      >
                        <Input type="number" placeholder="Số điện thoại" />
                      </Form.Item>
                      <Form.Item>
                        <TextArea placeholder="Nội dung"></TextArea>
                      </Form.Item>
                      <Button className="bg-lime-600 text-white">
                        Gửi thông tin
                      </Button>
                    </Form>
                  </div>
                </div>
                <div className="address-contact w-[60%]  max-lg:w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.6454926929378!2d105.82292677486178!3d21.006843080636944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad744eb9a567%3A0x86ebcd89ee0bda7b!2zMTc1IFAuIFTDonkgU8ahbiwgVHJ1bmcgTGnhu4d0LCDEkOG7kW5nIMSQYSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1735459374460!5m2!1svi!2s"
                    width="100%"
                    height="500"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;
