export default [
  {
    path: "/",
    name: "Home",
    role: "all",
    img: "icon_workDesk",
    meta: {
      title: "管理工作台",
      deepth: 2,
      keepAlive: true
    },
    component: (resolve: any) => require(["@/views/IndexPage/Home.vue"], resolve)
  },
  // {
  //   path: "/404",
  //   name: "404",
  //   role: "all",
  //   hidden: true,
  //   component: () => import("@/components/404.vue"),
  //   meta: {
  //     title: "404",
  //     keepAlive: false,
  //     navBar: true
  //   }
  // }
]
