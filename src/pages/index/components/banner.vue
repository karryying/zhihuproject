<template>
  <div class="banner">
    <!--  -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item @click="goDetail(item.id)" v-for="item in top_stories" :key="item.id">
        <div class="bannerPic">
          <img :src="item.image" alt />
          <div class="cover"></div>
        </div>
        <div class="bannerCon">
          <h3>{{item.title}}</h3>
          <p>{{item.hint}}</p>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  methods: {
    goDetail(id) {
      this.$router.push(`/detail/${id}`);
    },
  },
  computed: {
    ...mapGetters({
      top_stories: "index/top_stories",
    }),
  },
};
</script>

<style>
.banner {
  padding-top: 1rem;
}
.banner img {
  width: 100%;
}
.bannerPic {
  position: relative;
  /* filter: blur(5px) brightness(110%); */
}
.cover {
  position: absolute;
  width: 100%;
  left: 0;
  height: 35%;
  bottom: 0;
  overflow: hidden;
  z-index: 2;
  /* filter: blur(15px); */
  /* background: linear-gradient(blue, red); */
}
.cover img {
  width: 100%;
}

.bannerCon {
  width: 100%;
  position: absolute;
  bottom: 0.4rem;
  left: 0;
  font: 0.3rem/0.4rem "微软雅黑";
  color: #fff;
}
.bannerCon h3 {
  padding: 0.2rem;
}
.bannerCon p {
  padding: 0 0.2rem;
  font-size: 0.25rem;
  color: #ccc;
}
</style>