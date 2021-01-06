/* eslint-disable */
import React from 'react';
import { noImagePath } from "utils";
import network from "services/network";
import { Layout,Modal,Skeleton,Image,Row,Col } from "antd";

const DetailUser = (props) => {
  return (
    <div className="our-team">
      <div className="picture">
        {props.type === 'modal' ? 
          <Image fallback={noImagePath} className="img-fluid" src={props.avatar} /> 
          : <img className="img-fluid" src={props.avatar} /> }
      </div>
      <div className="team-content">
        <h3 className="name">{props.first_name} {props.last_name}</h3>
        <h4 className="title">{props.email}</h4>
      </div>
      <ul className="social">
        <li><a href="#" className="fa fa-facebook" aria-hidden="true"></a></li>
      </ul>
    </div>
  )
};
const SkeletonWrap = () => (
  <Layout.Content className="content__wrap">
    <Row className="content__1" style={{width:'100%'}}>
    {
      [1,2,3,4].map(x => (
        <Col span={4} key={x} className="our-team__container">
          <div className="our-team">
              <div className="picture">
                <Skeleton.Image />
              </div>
              <div className="team-content">
                <Skeleton active />
              </div>
              <ul className="social">
                <li><a href="#" className="fa fa-facebook" aria-hidden="true">SHOW DETAILS</a></li>
              </ul>
          </div>
        </Col>
      ))
    }
    </Row>
  </Layout.Content>
)

const TestUsers = () => {
  const [users,setUsers] = React.useState({loading : false,visible : false});

  React.useEffect(() => {
    (async () => {
      setUsers(prev=> ({...prev,loading:true}));
      try {
        const resp = await network.get('/users');
        if(resp){
          setUsers(prev=> ({...prev,...resp,loading:false}));
        }
      } catch (error) {
        console.log(error);
        setUsers(prev=> ({...prev,loading:false}));
      }
    })();
  },[]);
  const handleClick = (element) => {
    setUsers(prev=> ({...prev,visible:true, datamodal : element}));
  }

  if(users.loading){
    return (
      <SkeletonWrap />
    )
  }

  return(
    <Layout.Content className="content__wrap">
    <Row className="content__1">
      {users?.data?.map(el => (
        <Col span={4} key={el.id} className="our-team__container" onClick={() => handleClick(el)}>
          <DetailUser {...el} />
        </Col>
      ))  }
    </Row>
    <Modal 
      visible={users.visible}
      onCancel={() => setUsers(prev=> ({...prev,visible:false}))}
      footer={null}
    >
      <DetailUser type="modal" {...users.datamodal} />
    </Modal>
    </Layout.Content>
  )
};
export default TestUsers;