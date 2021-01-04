<template>
  <div class="detail">
    <div class="pic">
      <img :src="detail.images" alt />
      <div class="htitle">
        <h3 class="htitle_con">{{detail.title}}</h3>
      </div>
    </div>
    <div class="detailcon">
      <div class="conbox" v-html="detail.body"></div>
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item class="back" @click="$router.go(-1)" name="arrow" icon="arrow-left"></van-tabbar-item>
      <van-tabbar-item
        name="chat"
        @click="goComment"
        icon="chat-o"
        :badge="commentsLength===0?'':commentsLength"
      ></van-tabbar-item>
      <van-tabbar-item name="good" icon="good-job-o" :badge="zanLength===0?'':zanLength"></van-tabbar-item>
      <van-tabbar-item name="star" icon="star-o"></van-tabbar-item>
      <van-tabbar-item name="share" icon="share-o"></van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getStoryDetail } from "../../utils/http";
export default {
  data() {
    return {
      detail: {},
      active: "home",
      path: "",
    };
  },
  methods: {
    ...mapActions({
      getLongCom: "comments/getLongCom",
    }),
    init(id) {
      getStoryDetail(id).then((res) => {
        if (res.status === 200) {
          this.detail = res.data;
          this.detail.id = id;
        }
      });
    },
    goComment() {
      this.$router.push(`/comments/${this.detail.id}`);
    },
  },
  mounted() {
    document.documentElement.scrollTop = 0;
    let id = this.$route.params.id;
    this.getLongCom(id);
    //接收参数
    this.init(id);
  },
  computed: {
    ...mapGetters({
      zanLength: "comments/zanLength",
      commentsLength: "comments/commentsLength",
    }),
  },
};
</script>

<style>
.detail {
  width: 100vw;
  overflow: hidden;
  background: #ccc;
}
.pic {
  position: relative;
  height: 7rem;
}
.pic img {
  width: 100%;
  height: 7rem;
}
.pic .htitle {
  width: 100%;
  height: 1.5rem;
  position: absolute;
  bottom: 0;
  left: 0;
  color: #fff;
  font: 0.4rem/0.6rem "微软雅黑";
}
.htitle_con {
  padding: 0 0.1rem;
}
.question {
  margin-bottom: 0.1rem;
  background: #fff;
  padding: 0.1rem;
}
.question .question-title {
  font: bold 0.4rem/0.6rem "微软雅黑";
}
.detailcon {
  padding-bottom: 0.8rem;
}
.meta {
  height: 1rem;
  margin: 0.1rem 0;
  border-radius: 100%;
}
.meta img {
  width: 0.8rem;
  border-radius: 100%;
  margin-right: 0.1rem;
}
.meta span {
  font: 0.2rem/0.8rem "微软雅黑";
}
.meta .author::before {
  content: "@";
}

.meta .bio {
  color: #999;
  display: none;
}
.content-inner .answer figure img {
  width: 100%;
  margin: 20px 0;
}
.content-inner .answer figure figcaption {
  text-align: center;
  font: 0.25rem/0.5rem "微软雅黑";
  color: #ccc;
}
.content-inner p {
  font: 0.25rem/0.5rem "微软雅黑";
  color: #333;
  margin: 10px 0;
}
p strong {
  font-weight: bold;
}
blockquote {
  border-left: 0.04rem solid #888;
  font: 0.25rem/0.5rem "微软雅黑";
  color: #999;
}
.view-more {
  width: 100%;
  height: 0.8rem;
  background: #008bed;
  text-align: center;
  border-radius: 0.2rem;
}
a {
  font: 0.25rem/0.5rem "微软雅黑";
  color: #333;
  border: none;
  border-bottom: 0.01rem solid #333;
}
.view-more {
  margin: 0.2rem 0;
}
.view-more a {
  color: #fff;
  border: none;
  font: 0.3rem/0.8rem "微软雅黑";
}
.content ul {
  list-style-type: disc;
}
.content ul li {
  list-style: disc;
  font: 0.25rem/0.8rem "微软雅黑";
}
figure .content-image {
  width: 70%;
  background: #ccc;
}
.back {
  border-right: 1px solid #ccc;
}
.van-tabbar {
  padding: 0.2rem 0;
  height: 0.6rem;
  border-top: 0.01rem solid #ccc;
}
.van-info {
  top: 0.05rem;
  right: -0.15rem;
  background: none;
  border: none;
  color: #999;
  font-size: 0.2rem;
}
</style>