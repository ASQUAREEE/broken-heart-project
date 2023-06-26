import { createWebHistory, createRouter } from "vue-router"
import Home from './components/Home.vue'
import frontpage from './components/frontpage.vue'



const routes =[
    
    
    {

    name: 'Home',
    path: '/home',
    component: Home

},


    {

    name: 'frontpage',
    path: '/',
    component: frontpage

},

];



const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;