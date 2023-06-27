import { createWebHistory, createRouter } from "vue-router"
import Home from './components/Home.vue'
import frontpage from './components/frontpage.vue'
import chat from './components/chat.vue'



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
    {

    name: 'chat',
    path: '/chat',
    component: chat

},

];



const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;