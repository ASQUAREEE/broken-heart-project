<template>

<div class="publisher-container">
 <div class="publisher bt-1 border-light">
                <img class="avatar avatar-xs" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="...">
                <v-text-field v-model="messageText" label="Message" outlined></v-text-field>
                <v-btn @click="sendMessage" color="primary">Send</v-btn>
                
               </div>

               </div>
</template>

  
  <script>
  export default {
    name: 'MessageInput',
    data() {
      return {
        messageText: ''
      }
    },
    methods: {
      sendMessage() {
        this.$emit('new-message', this.messageText)
        this.messageText = ''
      }
    }
  }
  </script>






<style scoped>
  

body {
  background-color: #f9f9fa
}






.avatar {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  border-radius: 100%;
  background-color: #f5f6f7;
  color: #8b95a5;
  text-transform: uppercase;
}


.border-light {
  border-color: #f1f2f3 !important;
}


.publisher {
  position: relative;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding: 12px 20px;
  background-color: #f9fafb;
  width: 600px;


}


.publisher-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    
  }
  






</style>
  