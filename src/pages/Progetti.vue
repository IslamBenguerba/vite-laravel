<script>
import axios from "axios";
import { store } from "../store";
// import dayjs from "dayjs";

export default {
    data() {
        return {
            posts: [],
            pagination: {},
            search: {
                title: "",
            },
        };
    },
    methods: {
        fetchData(url) {
            axios.get(url ?? "http://127.0.0.1:8000/api/projects", {
                params: this.search,
            })
                .then((response) => {
                    const risultati = response.data;
                    this.posts = response.data[0].data
                    // salvo la lista dei post
                    // this.posts = risultati.data;

                    // prima cancello la chiave data dall'oggetto risultati
                    delete risultati.data;

                    // salvo i dati relativi alla paginazione dentro la variabile pagination
                    this.pagination = risultati;
                    console.log(response)
                    console.log(response.data[0].data)
                    console.log(this.posts)
                });
        },
        getImageUrl(post) {
            return `http://127.0.0.1:8000/storage/${post.image}`;
        },
        // formatDate(data) {
        //   return dayjs(data).format("DD/MM/YYYY");
        // },
        onSearch() {
            this.fetchData();
        },
        onReset() {
            this.search.title = "";
            this.fetchData();
        },
        show(post) {
            store.currentPost = post
            console.log(store.currentPost)
        }

    },
    mounted() {
        this.fetchData();
    },
};
</script>

<template>
    <div class="container">
        <h1>I miei progetti</h1>

        <!-- <form class="my-4 border-black" @submit.prevent="onSearch" @reset="onReset">
            <input type="text" placeholder="Titolo articolo" class="form-control" v-model="search.title" />
            <button class="btn btn-secondary" type="reset">Svuota</button>
            <button class="btn btn-primary" type="submit">Cerca</button>
        </form> -->

        <div class="mt-5 d-flex gap-3">
            <div class="card mb-4 project" v-for="post in posts" :key="post.id">
                <img :src="getImageUrl(post)" class="img-projct" alt="..." />

                <div class="card-body">
                    <router-link :to="{ name: 'progetto.show', params: { id: post.id } }" @click="show(post)">
                        <h5 class="card-title badge" :style="`background-color: #1A2B3B`">{{ post.titolo }}</h5>
                    </router-link>
                    

                    <div class="mb-3">
                        <span class="badge" :style="`background-color: #1A2B3B`">{{
                            post.category.categoria
                        }}</span>
                    </div>

                    <div class="d-flex gap-3">
                        <span v-for="tag in post.tags" :key="tag.id" class="badge"
                            :style="`background-color: rgb(${tag.color})`">{{ tag.name }}</span>
                    </div>

                </div>


            </div>
        </div>

        <!-- paginazione -->
        <div>
            <a v-for="pageLink in pagination.links" class="btn btn-link" @click="fetchData(pageLink.url)"
                v-html="pageLink.label"></a>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card {

    display: flex;

    align-items: center;
    width: 400px;
}

.card-img-top {
    height: 20vh;
    overflow: hidden;
    object-fit: cover;
    width: 50%;
}

.img-projct {
    width: 100%;
}
.badge{
    padding: 1px;
}
.project {
    position: relative;
    


    .card-body {
        position: absolute;
        opacity: 0;
        .card-title{
            font-size: 16px;
            margin: 0;
        }
    }

    // .card-footer{
    //     top: 20px;
    //     position: absolute;
    // }
    .card-footer {
        a {
            text-decoration: none;
            color: #DCC48E;
        }
    }
}

.project:hover {
    .card-body {
        display: block;
        transition: opacity 2s;
        opacity: 1;
    }
}</style>