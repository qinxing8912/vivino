import instance from './index'

const _axios = ({ method, url, data, config })=>{
    method = method.toLowerCase();
    if (method === 'post') {
        return instance.post(url, data, {...config})
    } else if(method === 'get'){
        return instance.get(url, { params: data, ...config})
    } else if(method === 'delete'){
        return instance.delete(url, { params: data, ...config})
    } else if(method === 'put'){
        return instance.put(url, data, {...config})
    } else {
        console.log("未知的method",method);
        return false;
    }
}

// post
export const _post = (url,data,config) =>{
    return _axios({
        method: 'post',
        url: url,
        data,
        config: config
    })
}

// get
export const _get = (url,data,config) =>{
    return _axios({
        method: 'get',
        url: url,
        data,
        config: config
    })
}