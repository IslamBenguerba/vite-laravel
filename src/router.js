import { createRouter, createWebHistory } from "vue-router";

// importiamo il componente che è una pagina
import HomePage from "./pages/Home.vue";
import ProgettoShowPage from "./pages/ProgettoShow.vue"
import ContactsPage from "./pages/Contacts.vue";
import ProgettiPage from "./pages/Progetti.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: HomePage,
    },
    {
        path: "/:id",
        name: "progetto.show",
        component: ProgettoShowPage,
    },
    {
        path: "/contatti",
        name: "contacts",
        component: ContactsPage,
    },
    {
        path: "/progetti",
        name: "progetti",
        component: ProgettiPage,
      }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export { router };