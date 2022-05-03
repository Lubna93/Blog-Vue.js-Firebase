<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Prenom</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="Stagiaires.title"
          name="title"
          placeholder="ex : Jean"
        />
      </div>

      <div class="form-group">
        <label for="description">Nom de famille</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="Stagiaires.description"
          name="description"
          placeholder="ex : Dujardin"
        />
      </div>

      <div class="form-group">
        <label for="title">Date de naissance</label>
        <input
          type="date"
          class="form-control"
          id="date"
          required
          v-model="Stagiaires.date"
          name="date"
        />
      </div>

      <div class="form-group">
        <label for="title">Photo de profil</label>
        <input
          type="url"
          class="form-control"
          id="url"
          required
          v-model="Stagiaires.url"
          name="url"
          placeholder="url (pnj / jpg)"
        />
      </div>

      <div class="form-group">
        <label for="title">Email</label>
        <input
          type="email"
          class="form-control"
          id="mail"
          required
          v-model="Stagiaires.mail"
          name="mail"
          placeholder="ex : Jean.Dujardin@gmail.com"
        />
      </div>

      <div class="form-group">
        <label for="title">Discord</label>
        <input
          type="url"
          class="form-control"
          id="discord"
          required
          v-model="Stagiaires.discord"
          name="discord"
          placeholder="ex : https://discord.gg/######"
        />
      </div>

      <button @click="saveStagiaires" class="btn btn-success">Ajouter</button>
    </div>

    <div v-else>
      <h4>Stagiaires ajouté en BDD avec Succès</h4>
      <button class="btn btn-success" @click="newStagiaires">Add</button>
    </div>
  </div>
</template>

<script>
import StagiairesDataService from "../services/StagiairesDataService";

export default {
  name: "add-Stagiaires",
  data() {
    return {
      Stagiaires: {
        title: "",
        description: "",
        date:"",
        url:"",
        mail:"",
        discord: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveStagiaires() {
      let data = {
        title: this.Stagiaires.title,
        description: this.Stagiaires.description,
        date: this.Stagiaires.date,
        url: this.Stagiaires.url,
        mail: this.Stagiaires.mail,
        discord: this.Stagiaires.discord,
        published: false
      };

      StagiairesDataService.create(data)
        .then(() => {
          console.log("Stagiaires crée avec success");
          this.submitted = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    
    newStagiaires() {
      this.submitted = false;
      this.Stagiaires = {
        title: "",
        description: "",
        published: false
      };
    }
  }
};
</script>