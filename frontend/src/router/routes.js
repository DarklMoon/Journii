import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/About.vue"),
  },
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/Admin.vue"),
  },


  {
    path: "/memo",
    name: "list",
    component: () => import("@/views/MemoList.vue"),
  },
  {
    path: "/memo/addJourni/first",
    name: "addJourni_1",
    component: () => import("@/views/MemoAdd_1.vue"),
  },
  {
    path: "/memo/addJourni/second",
    name: "addJourni_2",
    component: () => import("@/views/MemoAdd_2.vue"),
  },
  {
    path: "/memo/addJourni/thrid",
    name: "addJourni_3",
    component: () => import("@/views/MemoAdd_3.vue"),
  },


  {
    path: "/user/signin",
    name: "signin",
    component: () => import("@/views/Signin.vue"),
  },
  {
    path: "/user/signup",
    name: "signup",
    component: () => import("@/views/Signup.vue"),
  },
  {
    path: "/account",
    name: "account",
    component: () => import("@/views/Account.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("@/views/Contact.vue"),
  },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
})

// router.beforeEach((to, from, next) => {
//   console.log(`Navigating from ${from.name} to ${to.name}`);
//   next();
// });

export default router;