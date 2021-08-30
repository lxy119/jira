import {useEffect, useRef, useState} from "react"
// export const isFalsy=(value:unknown)=>value===0?false:!value

export const isVoid=(value:unknown)=>value===undefined||value===null||value===''
//在一个函数里改变传入的对象本身是不好的
export const cleanObject=(object: { [key:string]:unknown })=>{
    //Object.assign({},object)
    const result={...object}
    Object.keys(result).forEach(
        key=>{
            const value=result[key]
            if(isVoid(value)){
                delete result[key]
            }
        })
        return result
} 
 // eslint-disable-next-line
export const useMount=(callback:()=>void)=>{
useEffect(() => {
   // TODO 依赖项里面加上callback会造成无限循环，这个和useCallback以及useMemo有关系
   callback()
//    eslint-disable-next-line react-hooks/exhaustive-deps
},[])
}
export const useDebounce=<V>(value:V,delay?:number)=>{
    const [debounceValue,setDebounceValue]=useState(value)
    useEffect(()=>{
        //每次在value或delay变化以后设置一个定时器
        const timeout=setTimeout(()=>{setDebounceValue(value)},delay)
        //每次在上一个useEffect处理完以后再运行
        return ()=>{clearTimeout(timeout)}
    },[value,delay])
    return debounceValue
}

export const  useDocumentTitle=(title:string,keepUnmount:boolean=true)=>{
    const preTitle=useRef(document.title).current
    //页面加载时旧title
    //页面加载后新title
    useEffect(()=>{
        document.title=title
    },[title])

    useEffect(()=>{
        return ()=>{
            if (!keepUnmount){
                document.title=preTitle
            }
        }
    },[keepUnmount,preTitle])
}

export const restRoute=()=>window.location.href=window.location.origin


//還沒挂載或者已經卸載返回false；反之，返回true
export const useMountedRef = ()=>{
    const mountedRef=useRef(false)
    useEffect(()=>{
          mountedRef.current=true
        return ()=>{
              mountedRef.current=false
        }
})
    return mountedRef
}



/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 * @param obj
 * @param keys
 */
export const subset = <
    O extends { [key in string]: unknown },
    K extends keyof O
    >(
    obj: O,
    keys: K[]
) => {
    const filteredEntries = Object.entries(obj).filter(([key]) =>
        keys.includes(key as K)
    );
    return Object.fromEntries(filteredEntries) as Pick<O, K>;
};