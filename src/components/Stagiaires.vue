<template>
  <div v-if="currentStagiaires" class="edit-form">
    <h4>Stagiaires</h4>
    <form>
      <div class="form-group">
        <label for="title">Prénom :</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentStagiaires.title"
        />
      </div>

      <div class="form-group">
        <label for="description">Nom de famille :</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentStagiaires.description"
        />
      </div>

      <div class="form-group">
        <label for="date">Date de naissance :</label>
        <input
          type="date"
          class="form-control"
          id="date"
          v-model="currentStagiaires.date"
        />
      </div>

      <div class="form-group">
        <label for="url">Photo de profil :</label>
        <img :src="currentStagiaires.url" alt="">
      </div>

      <div class="form-group">
        <label for="mail">Email :</label>
        <input
          type="email"
          class="form-control"
          id="mail"
          v-model="currentStagiaires.mail"
        />
      </div>

      <div class="form-group">
            <label for="discord">Discord :</label>
            <a :href="currentStagiaires.discord">
            <label for="discord" class="discord">{{currentStagiaires.discord}}</label>
        </a>
        <input
          type="url"
          class="form-control"
          id="discord"
          v-model="currentStagiaires.discord"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentStagiaires.published ? "Eleve valider" : "Eleve en attente" }}
      </div>
    </form>

    <button
      class="badge badge-primary mr-2"
      v-if="currentStagiaires.published"
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

    <button class="badge badge-danger mr-2" @click="deleteStagiaires">
      Supprimer
    </button>

    <button type="submit" class="badge badge-success" @click="updateStagiaires">
      Mettre a Jour
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Cliquez sur un Stagiaires Por Favor</p>
  </div>
</template>

<script>
import StagiairesDataService from "../services/StagiairesDataService";

export default {
  name: "Stagiaires",
  props: ["Stagiaires"],
  data() {
    return {
      currentStagiaires: null,
      message: "",
    };
  },
  watch: {
    Stagiaires: function(Stagiaires) {
      this.currentStagiaires = { ...Stagiaires };
      this.message = "";
    },
  },
  methods: {
    updatePublished(status) {
      StagiairesDataService.update(this.currentStagiaires.key, {
        published: status,
      })
        .then(() => {
          this.currentStagiaires.published = status;
          this.message = "Le status MAJ avec succès!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateStagiaires() {
      const data = {
        title: this.currentStagiaires.title,
        description: this.currentStagiaires.description,
      };

      StagiairesDataService.update(this.currentStagiaires.key, data)
        .then(() => {
          this.message = "Stagiaires MAJ avec succès!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteStagiaires() {
      StagiairesDataService.delete(this.currentStagiaires.key)
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
    this.currentStagiaires = { ...this.Stagiaires }
  },
};
</script>

<style scoped>
img{
    width: 200px;
    display: flex;
}
</style>