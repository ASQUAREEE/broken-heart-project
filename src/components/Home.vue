<template>
    <div class="home-container">
      <div class="messages-container">




        <div v-for="message in messages" :key="message.id" class="message-container">
          

          <p v-if="nicknames.length > 0" class="nickname">{{ nicknames[nicknames.length - 1].name }}</p>
          
          <p class="message">{{ message.text }}</p>
        
        </div>
       
      </div>

      <div class="text-box">
      <MessageInput @new-message="sendMessage" />
      </div>

      
    </div>
  </template>

<script>
import axios from "axios";

import MessageInput from "./MessageInput.vue";
import frontpage from "./frontpage.vue";

export default {
  name: "Home",
  props: ["messages"],
  components: {
    MessageInput,
    frontpage,
  },
  data() {
    return {
      messages: [],
      messageText: "",
      nicknames: [],
    };
  },
  methods: {
    sendMessage() {
      this.$emit("new-message", this.messageText);
      this.messageText = "";
    },

    sendMessage(message) {
      axios
        .post("http://127.0.0.1:8000/edit/messages/", { text: message })
        .then((response) => {
          console.log("Event saved!");
        })
        .catch((error) => {
          // Handle error
        });
    },

    fetchMessages() {
      axios
        .get("http://127.0.0.1:8000/edit/messages/")
        .then((response) => {
          this.messages = response.data;
        })
        .catch((error) => {
          // Handle error
        });

      axios
        .get("http://127.0.0.1:8000/edit/name/")
        .then((response) => {
          this.nicknames = response.data;
        })
        .catch((error) => {
          // Handle error
        });
    },

    deleteMessages() {
      axios
        .delete("http://127.0.0.1:8000/edit/messages/")
        .then((response) => {
          console.log("Messages deleted!");
        })
        .catch((error) => {
          // Handle error
        });
    },
  },

  created() {
    // Fetch messages initially
    this.fetchMessages();

    // this.deleteMessages();

    // Fetch messages every 5 seconds (adjust the interval as needed)
    setInterval(this.fetchMessages, 100); //100 milisecond intervall

    setInterval(this.deleteMessages, 60000);
  },
};
</script>



<style scoped>
body {
  background-color: #f4f7f6;
  margin-top: 20px;
}

.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.messages-container {
  max-width: 1600px;
  width: 600px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.message {
  margin: 10px 0;
  padding: 8px 12px;
  background-color: #f2f5f4;
  border-radius: 8px;
  color: #333333;
}

.text-box {
  position: absolute;
  bottom: 0;
}

.message-container {
  display: flex;
  align-items: baseline;
  margin-bottom: 10px;
}

.nickname {
  font-weight: bold;
  margin-right: 8px;
}
</style>