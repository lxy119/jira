import React from "react";
import {Select} from "antd";


interface SelectProps extends Omit<React.ComponentProps<typeof Select>,'value'|'onChange'|'options'>{
    value?:number|string|null|undefined
    onChange?:(value?:number)=>void
    defaultOptionName?:string
    options?:{name:string,id:number}[]
}
const toNumber=(value:unknown)=>isNaN(Number(value))?0:Number(value)

export const IdSelect=(props:SelectProps)=>{
    const {value,onChange,defaultOptionName,options,...restProps}=props

    return <Select
    value={options?.length?toNumber(value):0}
    onChange={(value)=>onChange?.(toNumber(value)||undefined)}
    {...restProps}
    >
        {
            defaultOptionName?<Select.Option value={0}>{defaultOptionName}</Select.Option>:''
        }
        {
            options?.map(option=><Select.Option value={option.id} key={option.id}>{option.name}</Select.Option>)
        }
    </Select>
}


