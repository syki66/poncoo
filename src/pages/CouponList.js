import React, { useEffect } from 'react';
import {
  Button,
  Card,
  Col,
  Row,
  Select,
  Pagination,
  Typography,
  Tabs,
} from 'antd';
import { NotificationOutlined, SyncOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { getAuth, signOut } from 'firebase/auth';
import { initToken } from '../utils/initToken';

const { Title } = Typography;
const { Meta } = Card;
const { Option } = Select;
const { TabPane } = Tabs;

export default function CouponList({
  coupons,
  setCoupons,
  posts,
  setPosts,
  pageIndex,
  setPageIndex,
  getCoupons,
  postPerPage,
  tabID,
  couponsLen,
}) {
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  localStorage.setItem('lastPath', path);

  const handleSelectChange = (value) => {
    const sorted = [...coupons].sort();
    if (value === 'curr_descending') {
      sorted.sort(function (a, b) {
        return b.currDate - a.currDate;
      });
      localStorage.setItem('sortOption', 'curr_descending');
    } else if (value === 'curr_ascending') {
      sorted.sort(function (a, b) {
        return a.currDate - b.currDate;
      });
      localStorage.setItem('sortOption', 'curr_ascending');
    } else if (value === 'exp_ascending') {
      sorted.sort(function (a, b) {
        return a.expDate - b.expDate;
      });
      localStorage.setItem('sortOption', 'exp_ascending');
    } else if (value === 'exp_descending') {
      sorted.sort(function (a, b) {
        return b.expDate - a.expDate;
      });
      localStorage.setItem('sortOption', 'exp_descending');
    } else {
      console.log('정렬과정 중 에러 발생');
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
    navigate(`/${tabID}/${page}`);
  };

  const onTabChange = (key) => {
    if (key === 'unused') {
      navigate('/unused/1');
    } else if (key === 'used') {
      navigate('/used/1');
    }
  };

  const logout = async () => {
    await signOut(auth);
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    getCoupons();
    initToken();
  }, []);

  return (
    <>
      <Row style={{ padding: '0.5em' }}>
        <Col span={12} style={{ padding: '0.5em' }}>
          <Select
            style={{
              width: '100%',
            }}
            defaultValue={
              localStorage.getItem('sortOption') || 'curr_descending'
            }
            onChange={handleSelectChange}
          >
            <Option value="curr_descending">최근 순</Option>
            <Option value="curr_ascending">오래된 순</Option>
            <Option value="exp_ascending">유효기간 만료 순</Option>
            <Option value="exp_descending">유효기간 만료 역순</Option>
          </Select>
        </Col>
        <Col span={12} style={{ padding: '0.5em' }}>
          <Button onClick={() => navigate('/upload')} block type="primary">
            새 쿠폰 추가
          </Button>
        </Col>
      </Row>
      <Row style={{ padding: '0.5em' }}>
        <Col span={12}>
          <Tabs defaultActiveKey={tabID} onChange={onTabChange}>
            <TabPane tab="사용가능" key="unused"></TabPane>
            <TabPane tab="사용완료" key="used"></TabPane>
          </Tabs>
        </Col>
        <Col
          span={6}
          style={{
            padding: '0.5em',
          }}
        >
          <Button
            block
            onClick={(event) => window.location.reload()}
            style={{
              backgroundColor: 'pink',
              height: '100%',
            }}
          >
            <SyncOutlined />
          </Button>
        </Col>
        <Col
          span={6}
          style={{
            padding: '0.5em',
          }}
        >
          <Button
            block
            onClick={(event) => navigate(`/notification`)}
            style={{
              backgroundColor: '#fef957',
              height: '100%',
            }}
          >
            <NotificationOutlined />
          </Button>
        </Col>
      </Row>
      <Row>
        {posts.map((doc) => {
          return (
            <Col key={doc.id} span={12} style={{ padding: '0.5em' }}>
              <div
                style={{
                  border: '0.2em solid black',
                }}
              >
                {tabID === 'unused' ? (
                  <Card
                    size="small"
                    onClick={(event) => navigate(`/view/${doc.id}`)}
                    cover={
                      <div style={{ position: 'relative' }}>
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '0.3em',
                            right: '0.3em',
                            zIndex: '100',
                            textShadow: `-0.1em 0 #fef957, 0 0.1em #fef957, 0.1em 0 #fef957, 0 -0.1em #fef957`,
                          }}
                        >
                          {doc.userEmail.split('@')[0]}
                        </div>
                        <img
                          alt="coupon"
                          style={{
                            width: '100%',
                            aspectRatio: '1 / 1',
                            objectFit: 'cover',
                            objectPosition: '50% 10%',
                            borderBottom: '0.2em solid black',
                          }}
                          src={doc.imgUrl}
                        />
                      </div>
                    }
                  >
                    <Meta
                      title={doc.title}
                      description={`~ ${moment
                        .unix(doc.expDate)
                        .format('YYYY년 MM월 DD일')}`}
                    />
                  </Card>
                ) : (
                  <Card
                    size="small"
                    onClick={(event) => navigate(`/view/${doc.id}`)}
                    cover={
                      <>
                        <div style={{ position: 'relative' }}>
                          <div
                            style={{
                              position: 'absolute',
                              width: '100%',
                              aspectRatio: '1 / 1',
                              zIndex: '100',
                            }}
                          >
                            <div
                              style={{
                                height: '90%',
                                width: '90%',
                                marginLeft: '5%',
                                marginTop: '5%',
                                border: '2vw solid red',
                                borderRadius: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'red',
                                fontWeight: '1000',
                                fontSize: '10vw',
                                transform: 'rotate(-22.5deg)',
                              }}
                            >
                              사용
                              <br />
                              완료
                            </div>
                            <div
                              style={{
                                position: 'absolute',
                                bottom: '0.3em',
                                right: '0.3em',
                                zIndex: '100',
                                textShadow: `-0.1em 0 #fef957, 0 0.1em #fef957, 0.1em 0 #fef957, 0 -0.1em #fef957`,
                              }}
                            >
                              {doc.userEmail.split('@')[0]}
                            </div>
                          </div>
                          <img
                            alt="coupon"
                            style={{
                              width: '100%',
                              aspectRatio: '1 / 1',
                              objectFit: 'cover',
                              objectPosition: '50% 10%',
                              borderBottom: 'solid',
                              opacity: '0.5',
                            }}
                            src={doc.imgUrl}
                          />
                        </div>
                      </>
                    }
                  >
                    <Meta
                      title={doc.title}
                      description={`~ ${moment
                        .unix(doc.expDate)
                        .format('YYYY년 MM월 DD일')}`}
                    />
                  </Card>
                )}
              </div>
            </Col>
          );
        })}
      </Row>
      <Row
        style={{
          paddingTop: '1em',
        }}
        justify="center"
      >
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

      <Title
        style={{
          padding: '1em',
        }}
        level={5}
        align="center"
      >
        전체 쿠폰 : {couponsLen.totalLen} 장<br />
        사용 가능 : {couponsLen.unusedLen} 장<br />
        사용 완료 : {couponsLen.usedLen} 장
      </Title>
      <Title level={5} align="center">
        사용자 : {localStorage.getItem('userEmail')}
      </Title>
      <Row
        style={{
          padding: '1em',
        }}
      >
        <Button onClick={() => logout()} block type="primary">
          로그아웃
        </Button>
      </Row>
    </>
  );
}
