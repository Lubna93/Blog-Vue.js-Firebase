<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark" style="background-color: #c7929b !important;">

      <router-link to="/" class="navbar-brand">Gestion
      </router-link>


      <div class="navbar-nav mr-auto">
        
        <li class="nav-item">
          <router-link to="/articles" class="nav-link">Liste des articles</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add" class="nav-link">Ajouter un article</router-link>
        </li>

        <li class="nav-item">
          <router-link to="/Stagiaires" class="nav-link">Liste des Stagiaires</router-link>
        </li>
        <li class="nav-item">
          <router-link to="addStagiaires" class="nav-link">Ajouter un Stagiaire</router-link>
        </li>

      </div>
    </nav>

    <div class="container mt-3">
      <h2>Gestion Classroom</h2>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style scoped>
.container h2 {
  text-align: center;
  margin: 25px auto;
}
</style>