<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="article.title"
          name="title"
          placeholder="ex : Jean"
        />
      </div>

      <div class="form-group">
        <label for="description">Text</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="article.description"
          name="description"
          placeholder="ex : Dujardin"
        />
      </div>

      <div class="form-group">
        <label for="title">Date</label>
        <input
          type="date"
          class="form-control"
          id="date"
          required
          v-model="article.date"
          name="date"
        />
      </div>

      <div class="form-group">
        <label for="title">image</label>
        <input
          type="url"
          class="form-control"
          id="url"
          required
          v-model="article.url"
          name="url"
          placeholder="url (pnj / jpg)"
        />
      </div>

      <div class="form-group">
        <label for="title">Author</label>
        <input
          type="text"
          class="form-control"
          id="author"
          required
          v-model="article.author"
          name="author"
          placeholder="ex : nom"
        />
      </div>


      <button @click="saveArticle" class="btn btn-success">Ajouter</button>
    </div>

    <div v-else>
      <h4>Article ajouté en BDD avec Succès</h4>
      <button class="btn btn-success" @click="newArticle">Add</button>
    </div>
  </div>
</template>

<script>
import ArticleDataService from "../services/ArticleDataService";

export default {
  name: "add-article",
  data() {
    return {
      article: {
        title: "",
        description: "",
        date:"",
        url:"",
        author:"",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveArticle() {
      let data = {
        title: this.article.title,
        description: this.article.description,
        date: this.article.date,
        url: this.article.url,
        author: this.article.author,
        published: false
      };

      ArticleDataService.create(data)
        .then(() => {
          console.log("Article crée avec success");
          this.submitted = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    
    newArticle() {
      this.submitted = false;
      this.article = {
        title: "",
        description: "",
        published: false
      };
    }
  }
};
</script>