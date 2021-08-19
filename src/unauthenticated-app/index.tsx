import {useState} from "react";
import {Button, Card, Divider} from "antd";
import styled from '@emotion/styled'

import {Register} from "./register";
import {Login} from "./login";

import left from 'assets/left.svg'
import right from 'assets/right.svg'
import logo from 'assets/logo.svg'

export const  UnauthenticatedApp=()=>{
    const [isRegister,setIsRegister]=useState(false)
    return <Container>
        <Header />
        <Background/>
            <ShadowCard>
                <Title>
                    {isRegister?'请注册':'请登录'}
                </Title>
                {isRegister?<Register/>:<Login/>}
                <Divider/>
                <a onClick={()=>setIsRegister(!isRegister)}>切换到{isRegister?'已经有账号了？直接登录':'没有账号？注册新账号'}</a>
            </ShadowCard>

    </Container>
}

export const LongButton=styled(Button)`
width: 100%;
`

const Title=styled.h2`
margin-bottom: 2.4rem;
color: rgb(94,108,132);
`


const Background =styled.div`
position: absolute;
width: 100%;
height: 100%;
background-repeat:no-repeat ;
background-attachment:fixed ;
background-position:left bottom,right bottom;
background-size: calc(((100vw - 40rem)/2) ),calc(((100vw - 40rem)/2)),cover;
background-image: url(${left}),url(${right});
`

const Header=styled.header`
background: url(${logo}) no-repeat center;
padding: 5rem 0;
background-size: 8rem;
width: 100%;
`

const Container=styled.div`
display:flex;
flex-direction:column;//div里面的元素垂直排列，一行一个样
align-items: center;
min-height: 100vh;
`
const ShadowCard =styled(Card)`
width: 40rem;
//min-height: 56rem ;
padding: 3.2rem 4rem;
border-radius: 0.3rem;
box-sizing: border-box;
box-shadow: rgba(0,0,0,0.1) 0 0 10px;
text-align: center;
`