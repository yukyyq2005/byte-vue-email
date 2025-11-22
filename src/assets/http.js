import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useFormStore } from "@/stores/form";

const httpInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 30000 //超时时间30秒
})

// 请求拦截器
httpInstance.interceptors.request.use(
    config => {
        // 在请求发送之前做些什么
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
        return config;
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 响应拦截器
httpInstance.interceptors.response.use(
    response => {
        // 对响应数据做些什么
        return response;
    },
    error => {
        // 对响应错误做些什么
        return Promise.reject(error);
    }
);
export async function uploadBodyFile(file, accessToken){
    const name = generateFileName()
    console.log(name)
    const bucket = 'email-notifications-947df.appspot.com'
    const url = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o?name=` + encodeURIComponent(name)
    const headers = { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': file.type}
    try{
        const response = await axios({method:'POST', url:url, headers:headers, data:file})
        console.log(response.data)
        return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(name)}?alt=media&token=${response.data.downloadTokens}`
    }catch(error){
        if (error.response?.status === 403) {
            try{
                const token = await fetchTokenFromAppScript()
                console.log('拿到新的token: '+token)
                if (token){
                    const formStore = useFormStore();
                    formStore.fmAccessToken = token
                    console.log('再次上传。。。')
                    return uploadBodyFile(file, token)
                }
            }catch(e){
                console.log(e)
            }
        }
        console.log('报错')
        console.log(error)
        return null
    }
}
export async function httpPost(url, params){
    console.log('开始post请求: %s', url)
    if (import.meta.env.VITE_API_BASE_URL){
        params.form_id = "test"
        const res = await httpInstance({url:url, method:'post', data:params});
        console.log('服务器返回数据:')
        console.log(res.data)
        return res.data;
    }else{
        try{
            const res = await fetchDataFromAppScript(2, url, params)
            return res
        }catch(e){
            return {code:1, message:e.message}
        }
    }
}
export async function httpGet(url){
    if (import.meta.env.VITE_API_BASE_URL){
        const res = await httpInstance({url:url});
        return res.data;
    }else{
        try{
            const res = await fetchDataFromAppScript(1, url)
            return res
        }catch(e){
            return {code:1, message:e.message}
        }
    }
} 
const fetchDataFromAppScript = (tag, url ,data) => {
    return new Promise((resolve, reject) => {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        google.script.run.withSuccessHandler((response) => {
          resolve(response);
        })
        .withFailureHandler((error) => {
            reject(error);
        })
        .doAction(tag, url, data, timeZone);
    });
};
const fetchTokenFromAppScript = () => {
    return new Promise((resolve, reject) => {
        google.script.run.withSuccessHandler((response) => {
          resolve(response);
        })
        .withFailureHandler((error) => {
            reject(error);
        })
        .doSign();
    });
};
const generateFileName = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');  // 月份需要补0
    const day = String(now.getDate()).padStart(2, '0');  // 日需要补0
    const timestamp = now.getTime();  // 当前的毫秒时间戳
    const uuid = uuidv4();
    return `email/${year}/${month}/${day}/${timestamp}-${uuid}`;
  };
  

// export default httpInstance