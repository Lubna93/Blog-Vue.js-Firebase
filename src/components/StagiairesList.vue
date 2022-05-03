<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Liste des Stagiaires</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(Stagiaires, index) in Stagiaires"
          :key="index"
          @click="setActiveStagiaires(Stagiaires, index)"
        >
          <h4 style="color:#c7929b;">{{ Stagiaires.title }}</h4>
          <br>
          <h5 style="color:#808080;">{{ Stagiaires.description }}</h5>
          <br>
          
          <h6 >Date de naissance: {{ Stagiaires.date }}</h6>
          <h6 >Email: {{ Stagiaires.mail}}</h6>
          <h6 >Discord: {{ Stagiaires.discord}}</h6>
          
        </li>
      </ul>

    </div>
    <div class="col-md-6">
      <div v-if="currentStagiaires">

        <Stagiaires-details
          :Stagiaires="currentStagiaires"
          @refreshList="refreshList"
        />
        
      </div>
      <div v-else>
        <br />
        <p>Veuillez choisir un Stagiaire ...</p>
      </div>
    </div>
  </div>
</template>




<script>
import StagiairesDataService from "../services/StagiairesDataService";
import StagiairesDetails from "./Stagiaires.vue";

export default {
  name: "Stagiaires-list",
  components: { StagiairesDetails },
  data() {
    return {
      Stagiaires: [],
      currentStagiaires: null,
      currentIndex: -1
    };
  },
  methods: {
    onDataChange(items) {
      let _Stagiaires = [];

      items.forEach((item) => {
        let key = item.key;
        let data = item.val();
        _Stagiaires.push({
          key: key,
          title: data.title,
          description: data.description,
          date: data.date,
          url: data.url,
          mail: data.mail,
          discord: data.discord,
          published: data.published,
        });
      });

      this.Stagiaires = _Stagiaires;
    },

    refreshList() {
      this.currentStagiaires = null;
      this.currentIndex = -1;
    },

    setActiveStagiaires(Stagiaires, index) {
      this.currentStagiaires = Stagiaires;
      this.currentIndex = index;
    },

    removeAllStagiaires() {
      StagiairesDataService.deleteAll()
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  
  mounted() {
    StagiairesDataService.getAll().on("value", this.onDataChange);
  },
  beforeUnmount() {
    StagiairesDataService.getAll().off("value", this.onDataChange);
  }
};
</script>
