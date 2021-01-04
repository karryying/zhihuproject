<template>
  <div>
    <header>
      <div class="left">
        <p class="month" v-text="time.getDate()"></p>
        <p v-text="time.getMonth()+1+'月'"></p>
      </div>
      <h3 class="center">{{title}}</h3>
      <div class="right">
        <div class="toux"></div>
      </div>
    </header>
    <v-banner></v-banner>
    <v-list></v-list>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vBanner from "./components/banner";
import vList from "./components/list";
export default {
  components: {
    vBanner,
    vList,
  },
  data() {
    return {
      time: new Date(),
      title: "知乎日报",
    };
  },
  methods: {
    ...mapActions({
      getNewNews: "index/getNewNews",
    }),
    getCurrentDate() {
      let date = new Date();
      let hour = date.getHours();
      console.log(hour);
      if (hour >= 18) {
        this.title = "晚上好！";
      }
    },
  },
  mounted() {
    if (!this.data.date) {
      this.getNewNews();
    }
    this.getCurrentDate();
    //获取当前时间
  },
  computed: {
    ...mapGetters({
      data: "index/data",
    }),
  },
};
</script>

<style scoped>
header .left {
  border-right: 0.01rem solid #ccc;
}
header .center {
  padding-left: 0.2rem;
}
header .left .month {
  font-size: 0.3rem;
}

header .right .toux {
  width: 0.6rem;
  height: 0.6rem;
  background: #ccc;
  border-radius: 100%;
  overflow: hidden;
}
header .right .toux img {
  width: 100%;
}
</style>