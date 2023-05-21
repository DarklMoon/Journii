import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/about",
    name: "about",
    meta: { guess: true },
    component: () => import("@/views/About.vue"),
  },
  {
    path: "/",
    name: "home",
    meta: { guess: true },
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    meta: { login: true },
    component: () => import("@/views/Admin.vue"),
  },


  {
    path: "/memo",
    name: "list",
    meta: { guess: true },
    component: () => import("@/views/MemoList.vue"),
  },
  {
    path: "/memo/addJourni/",
    name: "addJourni_1",
    meta: { login: true },
    component: () => import("@/views/MemoAdd_1.vue"),
  },
  {
    path: "/memo/detail/:id",
    name: "detail",
    meta: { guess: true },
    component: () => import("@/views/MemoDetail.vue"),
  },


  {
    path: "/report",
    name: "report",
    meta: { login: true },
    component: () => import("@/views/MemoReport.vue"),
  },

  {
    path: "/user/signin",
    name: "signin",
    meta: { guess: true },
    component: () => import("@/views/Signin.vue"),
  },
  {
    path: "/user/signup",
    name: "signup",
    meta: { guess: true },
    component: () => import("@/views/Signup.vue"),
  },
  {
    path: "/user/me",
    name: "account",
    meta: { login: true },
    component: () => import("@/views/Account.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    meta: { guess: true },
    component: () => import("@/views/Contact.vue"),
  },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
})


router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token') //ทำให้เป็นbool
  // console.log(to)
  if (to.meta.login && !isLoggedIn) {
    alert('Please login first!')
    next({ path: '/user/signin' })
  }

  next();
});

export default router;