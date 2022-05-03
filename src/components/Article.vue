<template>
  <div v-if="currentArticle" class="edit-form">
    <h4>Article</h4>
    <form>
      <div class="form-group">
        <label for="title">Title :</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentArticle.title"
        />
      </div>

      <div class="form-group">
        <label for="description">Text :</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentArticle.description"
        />
      </div>

      <div class="form-group">
        <label for="date">Date :</label>
        <input
          type="date"
          class="form-control"
          id="date"
          v-model="currentArticle.date"
        />
      </div>

      <div class="form-group">
        <label for="url">Image :</label>
        <img :src="currentArticle.url" alt="">
      </div>

      <div class="form-group">
        <label for="author">Author :</label>
        <input
          type="text"
          class="form-control"
          id="author"
          v-model="currentArticle.author"
        />
      </div>



      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentArticle.published ? "Eleve valider" : "Eleve en attente" }}
      </div>
    </form>

    <button
      class="badge badge-primary mr-2"
      v-if="currentArticle.published"
      @click="updatePublished(false)"
    >
      Invalider
    </button>
    <button
      v-else
      class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Valider
    </button>

    <button class="badge badge-danger mr-2" @click="deleteArticle">
      Supprimer
    </button>

    <button type="submit" class="badge badge-success" @click="updateArticle">
      Mettre a Jour
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Cliquez sur un article Por Favor</p>
  </div>
</template>

<script>
import ArticleDataService from "../services/ArticleDataService";

export default {
  name: "article",
  props: ["article"],
  data() {
    return {
      currentArticle: null,
      message: "",
    };
  },
  watch: {
    article: function(article) {
      this.currentArticle = { ...article };
      this.message = "";
    },
  },
  methods: {
    updatePublished(status) {
      ArticleDataService.update(this.currentArticle.key, {
        published: status,
      })
        .then(() => {
          this.currentArticle.published = status;
          this.message = "Le status MAJ avec succès!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateArticle() {
      const data = {
        title: this.currentArticle.title,
        description: this.currentArticle.description,
      };

      ArticleDataService.update(this.currentArticle.key, data)
        .then(() => {
          this.message = "Article MAJ avec succès!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteArticle() {
      ArticleDataService.delete(this.currentArticle.key)
        .then(() => {
          this.$emit("refreshList");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.currentArticle = { ...this.article }
  },
};
</script>

<style scoped>
img{
    width: 200px;
    display: flex;
}
</style>