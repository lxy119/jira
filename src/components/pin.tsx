import {Rate} from "antd";
import React from "react";

interface Pinprops extends React.ComponentProps<typeof Rate>{
    checked:boolean
    onCheckedChange?:(check:boolean)=>void
}

export const Pin=({checked,onCheckedChange,...restProps}:Pinprops)=>{

    return <Rate
    count={1}
    value={checked?1:0}
    onChange={num=>onCheckedChange?.(!!num)}
    />
}