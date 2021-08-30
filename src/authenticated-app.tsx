import React from "react";
import styled from "@emotion/styled";
import {Button, Dropdown, Menu} from "antd";
import {Route,Routes,Navigate} from 'react-router'

import {ProjectListScreen} from "screens/project-list";
import {useAuth} from "context/auth-context";
import {ReactComponent as Softwarelogo} from 'assets/software-logo.svg'
import {ButtonNoPadding, Row} from "./components/lib";
import {ProjectScreen} from "./screens/project";
import {restRoute} from "./utils";
import {ProjectModal} from './screens/project-list/project-modal'
import {ProjectPopover} from "./components/projectpopover";
export const AuthenticatedApp=()=>{
    return <Container>
        <PageHeader/>
        <Main>
                <Routes>
                    <Route path={'/projects'} element={<ProjectListScreen/>}/>
                    <Route path={'/projects/:projectId/*'} element={<ProjectScreen/>}/>
                    <Navigate to={'/projects'}/>
                </Routes>
                <ProjectModal/>
        </Main>
    </Container>
}
const PageHeader=()=>{
    const {logout,user}=useAuth()
    return (<Header between={true}>
        <LeftHeader gap={true}>
            <ButtonNoPadding type={'link'} onClick={restRoute} >
                <Softwarelogo width={'18rem'} color={'rgba(38,132,255)'}/>
            </ButtonNoPadding>
            <ProjectPopover/>
            <span>用户</span>
        </LeftHeader>
        <RightHeader>
            <Dropdown overlay={<Menu><Menu.Item key={'logout'}>
                <Button onClick={logout}>退出</Button>
            </Menu.Item></Menu>}>
                <Button type={"link"} onClick={e => e.preventDefault()}>Hi,{user?.name}</Button>
            </Dropdown>
        </RightHeader>
    </Header>)
}


const Container=styled.div`
display: grid;
grid-template-rows: 6rem 1fr;
height: 100vh;
`
const Header=styled(Row)`
padding: 3.2rem;
box-shadow: 0 0 5px 0 rgba(0,150,254,0.1);
z-index: 1;
`
const LeftHeader=styled(Row)``
const RightHeader=styled.div``

const Main = styled.main``

