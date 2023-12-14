<script>
import axios from "axios";
import { store } from './store';
import axiosInstance from './store';
import Home from "./pages/Home.vue";

export default {
  components: {

  },
  data() {
    return {
      store,
      projects: []
    }
  },
  methods: {
    console() {
      console.log(this.$route)
    },
    //allData() {

    //console.log('ciao')
    // axios.get("http://127.0.0.1:8000/api/projects")
    // .then((response) => {
    //   this.projects = response.data[0].data;
    //   console.log(this.projects)
    //   // console.log(this.$route)
    // })
    //}
    getImage(image) {
      return `http://127.0.0.1:8000/storage/${image}`;
    },
    showProgetto(progetto) {

      axios.get("http://127.0.0.1:8000/api/projects/" + progetto.id).then((response) => {
        this.projects = response.data.results.data;
        console.log(response)
        console.log(this.projects)
      })
    },
  },
  mounted() {
    this.console()
    //this.allData()
  }
};
</script>

<template>
  <header>
    <nav class="container-fluid main-navbar">
      <div class="py-3 d-flex">
        LOGO

        <ul class="ms-auto d-flex list-unstyled gap-3">
          <!-- in laravel usavamo route('nome_rotta') -->
          <li class="link-main"><router-link :to="{ name: 'home' }" :class="{ $route: '' }">Home</router-link></li>
          <li class="link-main"><router-link :to="{ name: 'contacts' }">Contatti</router-link></li>
          <li class="link-main"> <router-link :to="{ name: 'progetti' }">Progetti</router-link></li>
    
        </ul>
      </div>
    </nav>
  </header>

  <main>
    <!-- E' l'equivalente di @yield("content") di blade -->
    <router-view></router-view>
  </main>

  <footer class="bg-dark py-5">
    <div class="container">
      <h3>Puoi trovarmi anche qui</h3>
      <!-- <a href="#"><i class="fab fa-facebook"></i></a>
      <a href="#"><i class="fab fa-instagram"></i></a> -->
      <div class="container-social">
        <a href="https://github.com/IslamBenguerba"><i class="fab fa-github"></i></a>
        <a href="https://www.linkedin.com/in/islam-benguerba-9003881b7"><i class="fab fa-linkedin"></i></a>
        <a class="hidden" href="http://127.0.0.1:8000/login">pannello</a>

      </div>


    </div>
  </footer>
</template>

<style lang="scss">
.main-navbar {
  background-color: #1A2B3B;
}

main {
  color: #DCC48E;
  // background-color: hsl(251, 97, 28)
  background-color: #1A2B3B;
  height: 80vh;

}

.link-main {
  a {
    text-decoration: none;
    color: #d36135;
  }

  a:hover {
    border-bottom: 3px solid #d36135;
  }
}

.router-link-active {
  font-size: large;
  border-bottom: 3px solid #d36135;
}

footer {
  h3 {
    color: white;
  }

  a {
    font-size: 2rem;
  }

  .container-social {
    display: flex;
    flex-direction: row;
    gap: .5rem;
  }
}
.hidden{
  display: none;
  visibility: hidden !important;
}
</style>