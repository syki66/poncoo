import React from "react";
import { useRef } from "react";
import { useState, useEffect } from "react";
import notificationService from "../services/notification.service";
import { Button, Col, List, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined, SmileOutlined } from "@ant-design/icons";

const { Title } = Typography;

const postPerPage = 20;

const calculateDates = (prevTS) => {
  const currTS = Math.floor(Date.now() / 1000);
  const ts = Math.abs(currTS - prevTS);

  if (ts < 60) {
    // 1분 이내
    return `${Math.floor(ts)}초 전`;
  } else if (ts < 3600) {
    // 1시간 이내
    return `${Math.floor(ts / 60)}분 전`;
  } else if (ts < 86400) {
    // 하루 이내
    return `${Math.floor(ts / 3600)}시간 전`;
  } else if (ts < 604800) {
    // 일주일 이내
    return `${Math.floor(ts / 86400)}일 전`;
  } else if (ts < 2592000) {
    // 1달 이내
    return `${Math.floor(ts / 604800)}주 전`;
  } else if (ts < 31536000) {
    // 1년 이내
    return `${Math.floor(ts / 2592000)}개월 전`;
  } else {
    // 연 단위 표시
    return `${Math.floor(ts / 31536000)}년 전`;
  }
};

// 클릭하면 모달형식으로 보여주기
export default function Notification() {
  const [data, setData] = useState([]);
  const [post, setPost] = useState([]);
  const [isEnd, setIsEnd] = useState(false);
  const listInnerRef = useRef();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const data = await notificationService.getAllNotis();
      const parsedData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // console.log(parsedData);
      const sortedParsedData = parsedData.sort(function (a, b) {
        return b.date - a.date;
      });
      setData(sortedParsedData);
      setPost(sortedParsedData.slice(0, postPerPage));
    } catch (error) {
      console.log("noti 탭 에러: ", error);
    }
  };

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        // console.log("reached bottom");
        setTimeout(() => {
          setPost(data.slice(0, post.length + postPerPage));
          if (post.length + postPerPage >= data.length) {
            setIsEnd(true);
          }
        }, 2000);
      }
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div
        onScroll={onScroll}
        ref={listInnerRef}
        style={{ height: "100vh", overflowY: "auto", padding: "0.5em" }}
      >
        <Title align="center">쿠폰 알림 로그</Title>
        <Title level={5} align="center" type="danger">
          ※삭제된 쿠폰은 사진이 표시되지 않음※
        </Title>
        <Row>
          <Col span={12}>
            <Title align="center" level={5}>
              {data.length}개
            </Title>
          </Col>
          <Col span={12}>
            <Button
              block
              type="primary"
              onClick={() => {
                navigate(localStorage.getItem("lastPath"));
              }}
            >
              뒤로 가기
            </Button>
          </Col>
        </Row>
        <List
          itemLayout="horizontal"
          dataSource={post}
          renderItem={(item) => (
            <List.Item>
              <img
                src={item.imgUrl}
                style={{
                  width: "5em",
                  aspectRatio: "1 / 1",
                  objectFit: "cover",
                  objectPosition: "50% 10%",
                  borderBottom: "solid",
                }}
              />
              <List.Item.Meta
                title={
                  <>
                    <div style={{ fontWeight: "1000" }}>{item.type}</div>
                    <div>{item.title}</div>
                  </>
                }
                description={item.userEmail}
              />
              <div>{calculateDates(item.date)}</div>
            </List.Item>
          )}
        />
        {isEnd ? (
          <Title align="center" type="danger">
            <SmileOutlined />
            &nbsp;끝&nbsp;
            <SmileOutlined />
          </Title>
        ) : (
          <Title align="center">
            <LoadingOutlined />
          </Title>
        )}
      </div>
    </>
  );
}
