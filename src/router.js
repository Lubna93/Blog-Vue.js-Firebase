import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/articles",
    name: "articles",
    component: () => import("./components/ArticlesList")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddArticle")
  },

  {
    path: "/",
    alias: "/Stagiaires",
    name: "Stagiaires",
    component: () => import("./components/StagiairesList")
  },
  {
    path: "/addStagiaires",
    name: "addStagiaires",
    component: () => import("./components/AddStagiaires")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});




export default router;
