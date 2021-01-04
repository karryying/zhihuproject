import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
let index = () => Promise.resolve(import("../pages/index/index"))
let detail = () => Promise.resolve(import("../pages/detail/detail"))
let comments = () => Promise.resolve(import("../pages/comments/comments"))
export default new Router({
  routes: [{
    path: "/",
    component: index
  },
  {
    path: "/detail/:id",
    name: "新闻详细",
    component: detail,
  }, {
    path: "/comments/:id",
    name: "评论",
    component: comments
  }
  ]
})
