import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import Validate from '../views/Validate.vue'
import Project from '../views/Project.vue'

const history = createWebHistory()
const router = createRouter({
    history,
    routes: [
        {
            path: '/',
            component: Home,
            meta: {
                hideNavbar: false
            }
        },
        {
            path: '/documents/validate',
            component: Project,
            meta:{
                hideNavbar: true
            }
        },
        {
            path: '/documents/validate-old',
            component: Validate,
            meta:{
                hideNavbar: true
            }
        }
    ]
})

export default router;