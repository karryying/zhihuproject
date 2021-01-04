import { getLongComments, getShortComments } from "../../utils/http"

let state = {
    comments: [],  //获取评论   [[长评],[短评]]
    commentsLength: 0,  //获取评论的总数
    zanLength: 0,  //获取点赞的总数
    longLength: 0,  //获取长评的总数
    shortLength: 0, //获取短评的总数
}

let mutations = {
    setComments(state, arr) {
        state.comments = arr;
    },
    setCommentsLength(state, num) {
        state.commentsLength = num[0] + num[1];
        state.longLength = num[0]
        state.shortLength = num[1]
    },
    setZanLength(state, num) {
        state.zanLength = num;
    },
}

let actions = {
    //获取长评
    getLongCom(context, id) {
        //每次获取之前先把赞的个数清0
        context.commit("setZanLength", "");
        context.commit("setCommentsLength", [0, 0]);
        getLongComments(id).then((r) => {
            if (r.status === 200) {
                r.data.id = id;
                //触发获取短评的方法
                context.dispatch("getShortCom", r.data);
            }
        })
    },
    //获取短评
    getShortCom(context, data) {
        //获取短评
        getShortComments(data.id).then((res) => {
            if (res.status === 200) {
                //定义一个变量 存储 长评论和短评论
                let temp = [];
                temp.push(data.comments)
                temp.push(res.data.comments);
                //修改
                context.commit("setComments", temp);
                //修改评论的总长度
                context.commit("setCommentsLength", [data.comments.length, res.data.comments.length]);
                //计算点赞的总数
                let total = 0;
                temp.forEach(item => {
                    if (item.length > 0) {
                        item.forEach(i => {
                            total = total + i.likes;
                        })
                    }
                })
                //修改赞的总长度
                context.commit("setZanLength", total);
            }
        });
    },

}

let getters = {
    commentsLength(state) {
        return state.commentsLength;
    },
    zanLength(state) {
        return state.zanLength;
    },
    comments(state) {
        return state.comments;
    },
    longLength(state) {
        return state.longLength;
    },
    shortLength(state) {
        return state.shortLength;
    },
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}