<template>
  <div class="list">
    <!-- {{data.stories}} -->
    <van-list finished-text="没有更多了" v-for="(item,index) in data" :key="index" @load="onLoad">
      <div class="dateshow" v-if="index !== 0">
        <p>{{showtime[index]}}</p>
      </div>
      <van-cell @click="goDetail(i.id)" v-for="(i) in item" :key="i.id">
        <div class="listcon">
          <div class="listLeft">
            <h3>{{i.title}}</h3>
            <p>{{i.hint}}</p>
          </div>
          <div class="listRight">
            <img :src="i.images[0]" alt />
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getPreviousNews } from "../../../utils/http";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      listnum: [],
      isnow: false,
    };
  },
  methods: {
    onLoad() {
      //list的高度
      let list = document.getElementsByClassName("list")[0];
      //卷去的高度
      let scrollTop = document.documentElement.scrollTop;
      //整屏高度
      let winH = document.documentElement.clientHeight;
      if (winH + scrollTop >= list.clientHeight - 600 && this.isloading) {
        //判断当前请求是否完成，如果完成就让继续请求，如果没有完成则不请求
        //获取之前的新闻
        this.getOldNews(this.formatDate(this.preTime));
      }
    },
    goDetail(id) {
      this.$router.push(`/detail/${id}`);
    },
    //传入的是一个时间戳
    formatDate(time, bool) {
      let date = new Date(time);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      return bool
        ? `${year}年${month}月${day}日`
        : year + this.zero(month) + this.zero(day);
    },
    zero(num) {
      return num.toString().padStart(2, "0");
    },
    ...mapActions({
      getOldNews: "index/getOldNews",
    }),
  },
  computed: {
    ...mapGetters({
      data: "index/data",
      showtime: "index/showtime",
      preTime: "index/preTime",
      isloading: "index/isloading",
    }),
  },
  watch: {
    preTime(newV, oldV) {
      this.$store.commit("index/setShowTime", this.formatDate(oldV, true));
    },
  },
};
</script>

<style scoped>
.dateshow {
  position: relative;
  width: 100%;
  border-top: 0.03rem solid #ccc;
  margin: 0.3rem 0;
}
.dateshow p {
  position: absolute;
  font: 0.25rem/0.5rem "微软雅黑";
  color: #333;
  z-index: 10;
  top: 50%;
  left: 0;
  background: #fff;
  padding: 0 0.1rem;
  transform: translateY(-55%);
}
.list {
  width: 100%;
}
.list .listcon {
  display: flex;
  align-items: center;
}
.list .listLeft {
  flex: 1;
}
.list .listLeft h3 {
  font: bold 0.3rem/0.4rem "微软雅黑";
  color: black;
}
.list .listRight {
  width: 2rem;
  overflow: hidden;
}
.list .listRight img {
  width: 100%;
}
</style>