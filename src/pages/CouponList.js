import React, { useEffect, useState } from "react";
import CouponDataService from "../services/coupon.services";
import { Button, Card, Col, Row, Select, Pagination, Typography } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const { Title } = Typography;
const { Meta } = Card;
const { Option } = Select;

const postPerPage = 1;

export default function CouponList() {
  const [coupons, setCoupons] = useState([]);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [pageIndex, setPageIndex] = useState(Number(location.pathname.split("/").pop()));
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
      setPosts(
        sortedParsedData.slice(
          (pageIndex - 1) * postPerPage,
          (pageIndex - 1) * postPerPage + postPerPage
        )
      );
    } catch (error) {
      console.log("쿠폰 리스트 불러오는 도중 에러 : ", error);
    }
  };

  const handleSelectChange = (value) => {
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
    setPosts(
      sorted.slice(
        (pageIndex - 1) * postPerPage,
        (pageIndex - 1) * postPerPage + postPerPage
      )
    );
  };

  const onPagiChange = (page) => {
    setPageIndex(page);
    setPosts(
      coupons.slice(
        (page - 1) * postPerPage,
        (page - 1) * postPerPage + postPerPage
      )
    );
    navigate(`/${page}`);
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
            onChange={handleSelectChange}
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
        {posts.map((doc) => {
          return (
            <Col key={doc.id} span={12} style={{ padding: "0.5em" }}>
              <div
                style={{
                  border: "solid",
                }}
              >
                <Card
                  onClick={(event) => navigate(`/view/${doc.id}`)}
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
      <Row style={{
        paddingTop:'1em'
      }} justify="center">
        <Col>
          <Pagination
            defaultCurrent={1}
            current={pageIndex}
            total={coupons.length}
            pageSize={postPerPage}
            showQuickJumper={{ goButton: <button>go</button> }}
            onChange={onPagiChange}
            size="large"
          />
        </Col>
      </Row>

      <Title style={{
        padding: '1em',
      }} level={5} align="center">총 쿠폰 개수: {coupons.length} 장</Title>
    </>
  );
}
