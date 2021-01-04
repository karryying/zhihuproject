<template>
  <div>
    <header class="header">
      <div class="left">
        <van-icon name="arrow-left" size=".5rem" @click="$router.go(-1)"></van-icon>
      </div>
      <h3 class="center" v-if="commentsLength !== 0">{{commentsLength}}条评论</h3>
      <h3 class="center" v-else>暂无评论</h3>
      <div class="right"></div>
    </header>
    <van-list class="main" v-if="commentsLength !== 0" v-model="loading" @load="onLoad">
      <van-cell v-if="longLength!==0 || shortLength !==0">
        <div class="commentMain" v-for="(item,index) in comments" :key="index">
          <h3 v-if="index === 0">{{longLength===0?"":longLength+'条长评'}}</h3>
          <h3 v-else>{{shortLength+'条短评'}}</h3>
          <div class="commentCon" v-for="i in item" :key="i.id">
            <div class="leftComm">
              <div class="touxiang">
                <img :src="i.avatar" alt />
              </div>
            </div>
            <div class="rightCon">
              <h4>
                {{i.author}}
                <van-icon name="ellipsis" style="line-height:.4rem" class="fr" />
              </h4>
              <p>{{i.content}}</p>
              <div class="bottom">
                <p class="botLeft">{{i.time|timeFilter}}</p>
                <div class="boright">
                  <span>
                    <i v-if="i.likes !== 0">{{i.likes}}</i>
                    <van-icon size=".4rem" name="good-job-o"></van-icon>
                  </span>
                  <span>
                    <van-icon size=".4rem" name="chat-o"></van-icon>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-cell>

      <div class="all" v-if="finished">已显示全部评论</div>
    </van-list>
    <div class="main" v-else>暂无评论</div>
    <footer class="footer">
      <div class="fotimg">
        <img src alt />
      </div>
      <div class="input">
        <van-field v-model="username" placeholder="请说说你的看法" />
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getLongComments, getShortComments } from "../../utils/http";
export default {
  data() {
    return {
      total: 0,
      list: [],
      loading: false,
      finished: false,
      username: "",
    };
  },
  methods: {
    ...mapActions({
      getLongCom: "comments/getLongCom",
    }),
    onLoad() {
      this.loading = false;
      let list = document.getElementsByClassName("van-list")[0].offsetHeight;
      //当卷去的高度等于list的高度去整屏的高度  815
      let s = document.documentElement.scrollTop;
      let winH = document.documentElement.clientHeight;
      if (list === winH + s) {
        this.finished = true;
        this.loading = false;
      }
    },
  },
  mounted() {
    document.documentElement.scrollTop = 0;
    // this.init();
    if (this.comments.length === 0) {
      let id = this.$route.params.id;
      this.getLongCom(id);
    }
  },
  filters: {
    timeFilter(time) {
      let d = time * 1000;
      let date = new Date(d);

      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let day = date.getDate().toString().padStart(2, "0");
      let h = date.getHours().toString();
      let m = date.getMinutes().toString().padStart(2, "0");

      let currentDay = new Date();

      let temp = "";
      //判断是否是今天
      if (date.toDateString() === new Date().toDateString()) {
        //是今天
        temp = `今天 ${h}:${m}`;
      } else {
        //获取日期
        temp = `${month}-${day} ${h}:${m}`;
      }
      return temp;
    },
  },
  computed: {
    ...mapGetters({
      commentsLength: "comments/commentsLength",
      comments: "comments/comments",
      longLength: "comments/longLength",
      shortLength: "comments/shortLength",
    }),
  },
};
</script>

<style scoped>
.header .center {
  text-align: center;
  padding: 0;
}
.header .left {
  border: none;
  text-align: center;
}
.van-icon {
  line-height: 0.8rem;
}
.header .left .icon {
  font: bold 0.4rem/0.8rem "微软雅黑";
}
.header .right {
  width: 1rem;
  background: pink;
}
.main {
  padding: 1rem 0.1rem 1.2rem 0.1rem;
  font: 0.3rem/2rem "微软雅黑";
  color: #ccc;
  text-align: center;
}
.commentMain h3 {
  font: bold 0.25rem/0.6rem "微软雅黑";
  margin-bottom: 0.3rem;
  margin-top: 0.1rem;
}
.commentCon {
  display: flex;
}
.commentCon {
  border-bottom: 0.01rem solid #ccc;
  padding: 0.1rem 0;
}
.bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.boright span {
  float: left;
  display: flex;
  align-items: center;
  height: 0.8rem;
  margin: 0 0.3rem;
}
.rightCon {
  flex: 1;
  margin-left: 0.1rem;
  font: 0.25rem/0.5rem "微软雅黑";
}
.rightCon h4 {
  font-weight: bold;
}
.all {
  text-align: center;
  font: 0.4rem/0.8rem "微软雅黑";
  color: #ccc;
}
.touxiang {
  width: 0.8rem;
  height: 0.8rem;
  overflow: hidden;
  border-radius: 100%;
}
.touxiang img {
  width: 100%;
}
.footer {
  position: fixed;
  width: 100vw;
  height: 0.8rem;
  display: flex;
  bottom: 0;
  left: 0;
  background: #ccc;
}
.fotimg {
  width: 10%;
  height: 100%;
}
.input {
  flex: 1;
  height: 100%;
}
</style>