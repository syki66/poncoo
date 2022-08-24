import React, { useEffect, useState } from "react";
import couponServices from "../services/coupon.services";
import { Card, Col, Row, Select } from "antd";
const { Meta } = Card;
const { Option } = Select;

export default function CouponList() {
  const [coupons, setCoupons] = useState([]);

  const getCoupons = async () => {
    const data = await couponServices.getAllCoupons();
    const parsedData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const sortedParsedData = parsedData.sort(function (a, b) {
      return b.currDate - a.currDate;
    });
    setCoupons(sortedParsedData);
  };

  const handleChange = (value) => {
    const sorted = [...coupons].sort();
    if (value === "curr_descending") {
      sorted.sort(function (a, b) {
        return b.currDate - a.currDate;
      });
    } else if (value === "curr_ascending") {
      sorted.sort(function (a, b) {
        return a.currDate - b.currDate;
      });
    } else if (value === "exp_ascending") {
      sorted.sort(function (a, b) {
        return a.expDate - b.expDate;
      });
    } else if (value === "exp_descending") {
      sorted.sort(function (a, b) {
        return b.expDate - a.expDate;
      });
    } else {
      console.log("정렬과정 중 에러 발생");
    }
    setCoupons(sorted);
  };

  useEffect(() => {
    getCoupons();
  }, []);
  return (
    <>
      <Select defaultValue="curr_descending" onChange={handleChange}>
        <Option value="curr_descending">최근 순</Option>
        <Option value="curr_ascending">오래된 순</Option>
        <Option value="exp_ascending">유효기간 만료 순</Option>
        <Option value="exp_descending">유효기간 만료 역순</Option>
      </Select>
      <Row>
        {coupons.map((doc) => {
          return (
            <Col key={doc.id} span={12} style={{ padding: "1em" }}>
              <Card
                style={{
                  border: "solid",
                }}
                cover={
                  <img
                    alt="coupon"
                    style={{
                      width: "100%",
                      aspectRatio: "1 / 1",
                      objectFit: "cover",
                      borderBottom: "solid",
                    }}
                    src={doc.imgUrl}
                  />
                }
              >
                <Meta
                  title={doc.title}
                  description={`유효기간: ${doc.expDate}`}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
