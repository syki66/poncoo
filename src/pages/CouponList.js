import React, { useEffect, useState } from "react";
import CouponDataService from "../services/coupon.services";
import { Button, Card, Col, Row, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

const { Meta } = Card;
const { Option } = Select;

export default function CouponList() {
  const [coupons, setCoupons] = useState([]);
  const navigate = useNavigate();

  const getCoupons = async () => {
    try {
      const data = await CouponDataService.getAllCoupons();
      const parsedData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const sortedParsedData = parsedData.sort(function (a, b) {
        return b.currDate - a.currDate;
      });
      setCoupons(sortedParsedData);
    } catch (error) {
      console.log("쿠폰 리스트 불러오는 도중 에러 : ", error);
    }
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

  const handleClick = async (id) => {
    navigate(`/view/${id}`);
  };

  useEffect(() => {
    getCoupons();
  }, []);
  return (
    <>
      <Row style={{ padding: "0.5em" }}>
        <Col span={12} style={{ padding: "0.5em" }}>
          <Select
            style={{
              width: "100%",
            }}
            defaultValue="curr_descending"
            onChange={handleChange}
          >
            <Option value="curr_descending">최근 순</Option>
            <Option value="curr_ascending">오래된 순</Option>
            <Option value="exp_ascending">유효기간 만료 순</Option>
            <Option value="exp_descending">유효기간 만료 역순</Option>
          </Select>
        </Col>
        <Col span={12} style={{ padding: "0.5em" }}>
          <Link to="/upload/">
            <Button block type="primary">
              새 쿠폰 추가
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        {coupons.map((doc) => {
          return (
            <Col key={doc.id} span={12} style={{ padding: "0.5em" }}>
              <div
                style={{
                  border: "solid",
                }}
              >
                <Card
                  onClick={(event) => handleClick(doc.id)}
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
                    description={`유효기간: ${moment
                      .unix(doc.expDate)
                      .format("YYYY년 MM월 DD일")}`}
                  />
                </Card>
              </div>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
