module.exports=(request,response,next)=>{
    if(request.method==='POST'&&request.path==='/login'){
        if(request.body.username==='admin'&&request.body.password==='123'){
            return response.status(200).json({
                user:{
                    token:'123'
                }
            })
        }else{
            return response.status(400).json({
                msg:'用户名或密码错误'
            })
        }
    }
    next()
}