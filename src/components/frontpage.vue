<template>
    <div class="front-page-container">
      <!-- <v-img
        :src="require('@/assets/blood.jpg')"
        class="background-image"
      /> -->
      <div>
        <h1 class="animated-text">Welcome to our society</h1>
      </div>
      <div class="input-container">
        <input
          v-model="name"
          placeholder="Enter your name"
          class="custom-input"
        >
        <v-btn color="danzer" dark @click="enterRoom" href="/chat">Enter</v-btn>
      </div>
      <!-- Your front page content goes here -->
    </div>
  </template>




<script>

import axios from 'axios';


export default {
    name: 'frontpage',
    

    data() {
      return {
        name: ''
      }
    },

    methods: {
      enterRoom() {
        this.$emit('new-message', this.name)
        
        console.log(this.name)

        this.$store.dispatch('setName', this.name);
        this.$router.push('/chat');
       
        axios.post('http://127.0.0.1:8000/edit/name/', {name: this.name})
        .then(({ data }) => {
          alert('Event saved!');
          // this.name = ''
        });

      },

      // enterRoom(nickname) {
      //   axios.post('http://127.0.0.1:8000/edit/name/', { name: nickname })
      //   .then(response => {
      //     console.log('name saved!');
      //   })
      //   .catch(error => {
      //     // Handle error
      //   })
      // },





    }

}


</script>


<style scoped>
.front-page-container {
    background-image: url('@/assets/blood.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 100vh;
}

.input-container {
    position: fixed;
    bottom: 50%;
    right: 50%;
    display: flex;
    align-items: center;
}

.input-container input {
    margin-right: 10px;
}

.input-container input.custom-input {
  margin-right: 10px;
  color: white; /* Set the text color to white */
}

.animated-text {
    animation: fadeIn 2s ease-in-out;
    animation-fill-mode: forwards;
    opacity: 0;
    color: rgb(217, 173, 173);
}

@keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
}
</style>
