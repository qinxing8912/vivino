import axios from 'axios'

//创建axios的一个实例
const instance = axios.create({
    baseURL: "",
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8;'
    }
})

// 请求拦截器
instance.interceptors.request.use((config)=>{
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token
    // const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis4NjEzMzc4ODU1NDY4IiwidXNlcklkIjo2LCJ1c2VyVVVJRCI6ImZmNGEzMmU0LThjOWQtNDI0ZS1iNDQyLWNkYzJlODBkNTgwNyIsImlhdCI6MTY2NjA1ODY1NSwiZXhwIjoxNjY2NjYzNDU1fQ.tqDbPJXQlaJLlmKJnVe71a61EHOR-Q9CGD1YakDw5c8";
    const token = '';
    token && (config.headers.Authorization = token);
    //若请求方式为post，则将data参数转为JSON字符串
    if( config.method === 'post'){
        config.data = JSON.stringify(config.data);
    }
    return config;
},(error)=>{
    return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use((response)=>{
    // 响应成功，则返回数据
    return response.data;
},(error)=>{
    // 相应错误
    if ( error.respons && error.response.status ) {
        const  { status } = error.response.status;
        switch (status) {
            case 400:
                msg = '请求错误!'
                break;
            case 401:
                msg = '请求错误!'
                break;
            case 404:
                msg = '请求地址出错!'
                break;
            case 408:
                msg = '请求超时!'
                break;
            case 500:
                msg = '服务器内部错误!'
                break;
            case 500:
                msg = '服务器内部错误!'
                break;
            case 501:
                msg = '服务未实现!'
                break;
            case 502:
                msg = '网关错误!'
                break;
            case 503:
                msg = '网关不可用!'
                break;
            case 504:
                msg = '服务超时!'
                break;
            case 505:
                msg = 'HTTP版本不受支持!'
                break;
            default:
                msg = '请求失败!'
                break;
        }
        alelt(msg)
        return Promise.reject(error)
    }
    return Promise.reject(error)
})

export default instance