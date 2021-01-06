/* eslint-disable */
import React from 'react';
import { noImagePath } from "utils";
import network from "services/network";
import { Layout,Space,Skeleton,Image,Row,Col } from "antd";
import {LoadingOutlined} from '@ant-design/icons';

const TestUsers = (props) => {
  const [users,setUsers] = React.useState({loading : false});

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

  return(
    <Layout.Content>
    <Row>
      {!users.loading ? users?.data?.map(el => (
        <Col span={4} key={el.id}>
          <div className="our-team">
            <div className="picture">
              <Image fallback={noImagePath} className="img-fluid" src={el.avatar} />
            </div>
            <div className="team-content">
              <h3 className="name">{el.first_name} {el.last_name}</h3>
              <h4 className="title">{el.email}</h4>
            </div>
            <ul className="social">
              <li><a href="https://google.com" className="fa fa-facebook" aria-hidden="true"></a></li>
              <li><a href="https://google.com" className="fa fa-twitter" aria-hidden="true"></a></li>
              <li><a href="https://google.com" className="fa fa-google-plus" aria-hidden="true"></a></li>
              <li><a href="https://google.com" className="fa fa-linkedin" aria-hidden="true"></a></li>
            </ul>
          </div>
        </Col>
      )) 
    :
    <LoadingOutlined spin style={{color : 'royalblue'}} /> }
    </Row>
    </Layout.Content>
  )
};
export default TestUsers;