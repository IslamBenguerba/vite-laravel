<script>
import axios from "axios";
export default {
  data() {
    return {
      projects: [],
    };
  },
  methods: {
    allData() {
      axios.get("http://127.0.0.1:8000/api/projects")
        .then((response) => {
          this.projects = response.data[0].data;
          console.log(response.data)
          console.log(this.projects)
        })
      // .catch((e) => {
      //   console.error(e);
      // })
    },
  },
  mounted() {
    this.allData();

  }
}
</script>

<template>
  <div class="container">
    <h1>Benvenuto !</h1>
  </div>
  <div class="container">

  </div>
</template>

<style></style>