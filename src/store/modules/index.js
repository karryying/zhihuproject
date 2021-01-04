//导入
import { getCurrentNews, getPreviousNews } from "../../utils/http"
let state = {
    data: [],  // 新闻数据 一个二维数组
    showtime: [], //展示在页面的日期  每天的
    preTime: new Date().getTime(),  // 当前的时间戳(用户获取之前的新闻)
    isloading: true, //是否可进行下一次的请求
    top_stories: []  //banner
}

let mutations = {
    setData(state, obj) {
        state.data.push(obj.stories)
    },
    setShowTime(state, time) {
        state.showtime.push(time);
    },
    setPreTime(state) {
        state.preTime = state.preTime - 24 * 60 * 60 * 1000;
    },
    setIsLoading(state, bool) {
        state.isloading = bool;
    },
    setTopStories(state, arr) {
        state.top_stories = arr;
    }
}

let actions = {
    //获取当天的新闻
    getNewNews(context) {
        getCurrentNews().then(res => {
            if (res.status === 200) {
                context.commit("setData", res.data);
                context.commit("setTopStories", res.data.top_stories);
            }
        })
    },
    getOldNews(context, time) {
        context.commit("setIsLoading", false);
        getPreviousNews(time).then((res) => {
            if (res.status === 200) {
                //触发方法  将数据放入到data中
                context.commit("setData", res.data);
                //修改时间
                context.commit("setPreTime");
                //可请求
                context.commit("setIsLoading", true);
            }
        });
    }
}

let getters = {
    data(state) {
        return state.data;
    },
    showtime(state) {
        return state.showtime;
    },
    preTime(state) {
        return state.preTime;
    },
    isloading(state) {
        return state.isloading;
    },
    top_stories(state) {
        return state.top_stories;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}