<template>
    <div class="container">
        <h1>Brocken_Heart_Chat - <span class="connection_ready" v-if="connection_ready">Connection ready!</span></h1>
        
        <div class="messages" id="messages">
          <div class="message-container">
            <h1 class="error" v-if="connection_error"> Connection error! </h1>
            <div v-for="(m,idx) in messages" :key="'m-' + idx" style="clear:both">
              <div :class="{ 'mine-message' : m.from=='me', 'others-message' : m.from=='other'}">
                <p v-if="name" class="nickname">{{ name }}</p>

                {{m.message}}
              </div>
            </div> 
          </div>
        </div>
  
        <div class="send-zone">
          <input v-model="new_message" type="text" placeholder="Type a message" @keyup.enter="send_message"/>
        </div>
    </div>
  </template>
  
  <script>

import axios from "axios";
import { computed } from 'vue';

  export default {
    name: 'chat',
    
    data(){
      return {
        //TODO: here you must insert your api key from Sockets Bay. Generate it here: https://socketsbay.com/my-account
        sockets_bay_api_key: "f993fd9071684759e039cd9b87da11d4", 
        connection_ready: false,
        connection_error: false,
        nicknames: [],
        websocket: null,
        new_message: "",
        messages: []
      }
    },

  //   computed: {
  //   name() {
  //     return this.$store.getters.getName;
  //   }
  // },


    methods:{
      init_chat() {
        //ask for a nickname
        // if(this.nickname == "") this.nickname = prompt("Enter a nickname:");
  
        //connect to Sockets Bay
        var sockets_bay_url = `wss://socketsbay.com/wss/v2/1/${this.sockets_bay_api_key}/`;
        this.websocket      = new WebSocket(sockets_bay_url);
        //
        this.websocket.onopen    = this.onSocketOpen;
        this.websocket.onmessage = this.onSocketMessage;
        this.websocket.onerror   = this.onSocketError;
      },
      onSocketOpen(evt){
        this.connection_ready = true;
      },
      onSocketMessage(evt){
        //we parse the json that we receive
        var received = JSON.parse(evt.data);
        //check if it's our message or from a friend
        this.messages.push( { from: "other", message: received.message } );
        //scroll to the bottom of the messages div
        const messages_div = document.getElementById('messages');
        messages_div.scrollTo({top: messages_div.scrollHeight, behavior: 'smooth'});
      },
  
      onSocketError(evt){
        this.connection_error = true;
      },
  
      send_message() {
        var to_send = { from: this.nickname, message: this.new_message };
        this.websocket.send( JSON.stringify(to_send) );
        this.messages.push( { from: "me"   , message: this.new_message } );
        this.new_message = "";
      }
    },
    mounted() {
      this.init_chat();

      
      
      axios
        .get("http://127.0.0.1:8000/edit/name/")
        .then((response) => {
          this.nicknames = response.data;
        })
        .catch((error) => {
          // Handle error
        });
    }
  }
  </script>
  
  <style lang="less">
    body{
      background: #111b21;
    }
    .container{
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      max-width: 768px;
      min-height: 98vh;
      position: relative;
  
      h1{
        padding: 0px;
        height: 20px;
        color: white;
        font-size: 20px;
        text-transform: uppercase;
  
        .connection_ready{
          color: greenyellow;
        }
      }
  
      .messages{
        height: 80vh;
        overflow-y: scroll;
        background: url(@/assets/blood.jpg) no-repeat center;
        background-size: cover;
        
        
  
        .mine-message {
          border-radius: 7.5px;
          max-width: 65%;
          font-size: 16px;
          line-height: 19px;
          color: #e9edef;
          background: fade( #046a62, 90%);
          padding: 5px;
          margin: 20px 20px 5px 0px;
          
          float: right;
        }
        .others-message {
          border-radius: 7.5px;
          max-width: 65%;
          font-size: 16px;
          line-height: 19px;
          color: #e9edef;
          background: fade( #202c33, 90%);
          padding: 5px;
          margin: 20px 0px 5px 20px;
          float: left;
        }
      }
      .send-zone{
        height: 62px;
        background: #202c33;
        display: flex;
  
        input[type='text']{
          padding: 9px 12px 11px;
          margin: 5px 10px;
          border: 1px solid #2a3942;
          background: #2a3942;
          border-radius: 8px;
          font-size: 15px;
          flex-grow: 1;
          color: white;
        }
  
      }
    }
    
  </style>