import axios from "axios"
import Vue from "vue"
import qs from "qs"

Vue.prototype.$axios = axios;

//请求拦截
axios.interceptors.request.use(config => {
    console.log(config);
    return config;
})

axios.interceptors.response.use(res => {
    console.group("-----请求的地址为" + res.config.url + "-------");
    console.log(res);
    if (res.status !== 200) {
        alert("错误");
        return;
    }
    console.groupEnd("--------------------");
    return res;
})

//开发
let baseUrl = "/api"
Vue.prototype.$pre = "https://news-at.zhihu.com"

//打包
// let baseUrl = ""
// Vue.prototype.$pre = ""

//获取最新的新闻
export let getCurrentNews = () => {
    return axios({
        url: baseUrl + '/api/4/stories/latest',
        method: "get",
    })
}

//获取之前的新闻
export let getPreviousNews = (date) => {
    return axios({
        url: baseUrl + `/api/4/stories/before/${date}`,
    })
}

//获取文章详情
export let getStoryDetail = (id) => {
    return axios({
        url: baseUrl + `/api/4/story/${id}`,
    })
}

//获取文章长评
export let getLongComments = (id) => {
    return axios({
        url: baseUrl + `/api/4/story/${id}/long-comments`,
    })
}

//获取文章短评
export let getShortComments = (id) => {
    return axios({
        url: baseUrl + `/api/4/story/${id}/short-comments`,
    })
}

