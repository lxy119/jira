import React from "react";
import styled from "@emotion/styled";
import {Button, Spin, Typography} from "antd";
import {DevTools} from "jira-dev-tool/dist";
// import React from "react";

export const Row=styled.div<{
    gap?:number|boolean
    between?:boolean
    marginBottom?:number
}>`
display: flex;
align-items: center;
justify-content: ${prop=>prop.between?'space-between':undefined};
margin-bottom: ${prop=>prop.marginBottom+'rem'};
> * {
margin-top: 0 !important;
margin-bottom: 0 !important;
margin-right: ${props=>typeof props.gap === 'number'? props.gap+'rem':props.gap?'2rem':undefined};

}
`
const FullPage=styled.div`
height: 100vh;
display: flex;
align-items: center;
justify-content: center;
`
export const FullPageLoading=()=><FullPage>
    <Spin size={'large'}/>
</FullPage>
export const FullPageErrorFallback=({error}:{error:Error|null})=><FullPage>
    <DevTools/>
    <Typography.Text type={'danger'}>{error?.message}</Typography.Text>
</FullPage>

export const ButtonNoPadding=styled(Button)`
padding: 0;
`