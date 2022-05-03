<template>

  <div class="list row">
    <div class="col-md-6">
      <h3 style="color:#FF748C;">Liste des articles</h3>

      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(article, index) in articles"
          :key="index"
          @click="setActiveArticle(article, index)"
        >
        
          <h4 style="color:#c7929b;">{{ article.title }}</h4>
          <br>
          <h5 style="color:#808080;">{{ article.description }}</h5>
          <br>
          <div class="row" >
          <h6 class="col-4" >Date: {{ article.date }}</h6>
          <h6 >Written by: {{ article.author }}</h6>
          </div>
          <!-- <img v-bind:src="'{{article.url}}'" /> -->
        </li>
      </ul>


    </div>
    <div class="col-md-6">
      <div v-if="currentArticle">

        <article-details
          :article="currentArticle"
          @refreshList="refreshList"
        />
        
      </div>
      <div v-else>
        <br />
        <p>Veuillez choisir un article ...</p>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleDataService from "../services/ArticleDataService";
import ArticleDetails from "./Article.vue";

export default {
  name: "articles-list",
  components: { ArticleDetails },
  data() {
    return {
      articles: [],
      currentArticle: null,
      currentIndex: -1
    };
  },
  methods: {
    onDataChange(items) {
      let _articles = [];

      items.forEach((item) => {
        let key = item.key;
        let data = item.val();
        _articles.push({
          key: key,
          title: data.title,
          description: data.description,
          date: data.date,
          url: data.url,
          author: data.author,
          published: data.published,
        });
      });

      this.articles = _articles;
    },

    refreshList() {
      this.currentArticle = null;
      this.currentIndex = -1;
    },

    setActiveArticle(article, index) {
      this.currentArticle = article;
      this.currentIndex = index;
    },

    removeAllArticles() {
      ArticleDataService.deleteAll()
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  
  mounted() {
    ArticleDataService.getAll().on("value", this.onDataChange);
  },
  beforeUnmount() {
    ArticleDataService.getAll().off("value", this.onDataChange);
  }
};
</script>
