<template>
  <div class="messages">
    <div class="windowBar">
      <button class="windowCloseButton" @click="closeMessages">X</button>
    </div>
    <div class="messageList">
      <message
        v-for="message in $store.state.runtime.link.messages"
        :key="message.id"
        class="messageItem"
        :sender="message.node.name"
        :content="message.content"
        :time="message.time"
      >
      </message>
    </div>
    <form class="sendMessageForm" @submit.prevent="sendMessage">
      <input
        v-model="content"
        class="sendMessageInput"
        type="text"
        placeholder="New Message Content"
      />
      <button class="sendMessageButton" type="submit">Send Message</button>
    </form>
  </div>
</template>

<script>
// Messages sidebar
import Message from "./Message.vue";

export default {
  components: { Message },
  data() {
    return {
      content: "",
    };
  },
  methods: {
    closeMessages() {
      this.$store.commit("unsetRuntimeLink");
    },
    sendMessage() {
      this.$store.dispatch("commSendMessage", {
        node: this.$store.state.runtime.node,
        content: this.content,
        link: this.$store.state.runtime.link,
      });
      this.content = "";
    },
  },
};
</script>

<style scoped>
.messages {
  display: flex;
  flex-direction: column;
  background-color: #a9a9a9;
}
.windowBar {
  order: 1;
  flex: 0 0 30px;
}
.windowCloseButton {
  float: right;
  height: 30px;
}
.messageList {
  order: 2;
  flex: 1;
  overflow-y: auto;
}
.messageItem {
  height: 30px;
  margin: 5px;
}
.sendMessageForm {
  order: 3;
  flex: 0 0 30px;
  display: flex;
  flex-direction: row;
}
.sendMessageInput {
  order: 1;
  flex: 1;
  height: 30px;
}
.sendMessageButton {
  order: 2;
  flex: 0 0 150px;
  height: 30px;
}
</style>
