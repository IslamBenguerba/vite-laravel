<script>
import axios from "axios";
import { store } from '../store'

export default {
    data() {
        return {
            project: [],
            pagination: {},
            search: '',
            store
        };
    },
    methods: {
        fetchData() {
            axios.get("http://127.0.0.1:8000/api/projects/" + this.$route.params.id, {
                // params: this.search,

            })
                .then((response) => {
                    const risultati = response.data.results;
                    console.log(this.$route)
                    // salvo la lista dei post
                    this.project = risultati;

                    // prima cancello la chiave data dall'oggetto risultati
                    delete risultati.data;

                    // salvo i dati relativi alla paginazione dentro la variabile pagination
                    this.pagination = risultati;
                    // console.log(risultati)
                    console.log(response)

                    console.log(this.project)
                    this.getImageUrl(this.project)
                    console.log(this.project['technologies'])
                });

        },
        // showProgetto(progetto) {

        //     axios.get("http://127.0.0.1:8000/api/projects/" + progetto.id).then((response) => {
        //         this.project = response.data.results.data;
        //         console.log(response)
        //         console.log(this.projects)
        //     })
        // },
        getImageUrl(project) {
            return `http://127.0.0.1:8000/storage/${project.image}`;
        },
        // formatDate(data) {
        //     return dayjs(data).format("DD/MM/YYYY");
        // },
        onSearch() {
            this.fetchData();
        },
        onReset() {
            this.search.title = "";
            this.fetchData();
        },

    },
    mounted() {
        this.fetchData()
    },
};
</script>

<template>
    <div>
        <div class="container-category" v-if="project.length != 0">
            {{ project['category']['categoria'] }}
            <!-- <ul>
                <li v-for="category in project.category">ff</li>
            </ul> -->
        </div>
        <div class="container-technology">
            <div v-for="tech in project['technologies']">{{ tech['tecnologia'] }}</div>
        </div>
        <!-- container che tiene il post -->
        <div class="container">
            <div class="title">
                <h3>{{ project.titolo }} </h3>
                <a :href=" project['link_git'] ">Guarda la repo</a>
            </div>

            <div class="col-12 col-md-6 ">
                <img class="img-site" :src="getImageUrl(project)" alt="">
            </div>

            <p>{{ project.descrizione }}</p>

        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.title{
    width: 100%;
    display: flex;
    justify-content: space-around;
    a{
        text-decoration: none;
        color: #d36135;
    }
    a:hover{
        color:#9e4b28;
    }
}

.card-img-top {

    // overflow: hidden;
    object-fit: contain;
}

.container-technology {
    color: white;
}

.col-6 {
    overflow: hidden;
    object-fit: contain;
}

.img-site {
    max-width: 600px;
}
.col-12{
    display: contents;

    width: 100%;
    object-fit: cover;
   
}
// @media only screen and (max-width: 430px) and (max-height: 932px) {
//     .col-6 {
//         overflow: visible; /* Rimuove overflow: hidden */
//         display: flex;
//         justify-content: center;
//     }
// }
</style>