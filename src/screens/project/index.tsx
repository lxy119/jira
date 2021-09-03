import React from 'react'
import {Routes,Route,Navigate,useLocation} from "react-router";
import {Link} from "react-router-dom";
import {TaskGroup} from "../task-group";
import {Spectaculars} from "../spectaculars";
import styled from '@emotion/styled';
import { Menu } from 'antd';



const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};



export const ProjectScreen=()=>{
  const routeType = useRouteType();

    
    return <Container>
        <Aside>
          <Menu mode={'inline'} selectedKeys={[routeType]}>
            <Menu.Item key={"kanbans"}>
        <Link to={'kanbans'} >看板</Link>
            </Menu.Item>
            <Menu.Item key={"epic"}>
        <Link to={'epic'}>任务组</Link>
            </Menu.Item>
          </Menu>
        </Aside>
       <Main>
       <Routes>
            <Route path={'/kanbans'} element={<Spectaculars/>}/>
            <Route path={'/epic'} element={<TaskGroup/>}/>
        <Navigate to={window.location.pathname+'/kanbans'} replace={true}/>
        </Routes>
       </Main>
    </Container>
}


const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 12rem 1fr;//左边一个16rem 右边自动
  width: 100%;
  overflow: hidden;
`;
