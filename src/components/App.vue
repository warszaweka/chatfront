<template>
  <div class="app">
    <div v-if="$store.state.runtime.node" class="appStarted">
      <messages v-if="$store.state.runtime.link" class="appMessages" />
      <graph class="appGraph" />
    </div>
    <start v-else class="appStart" />
  </div>
</template>

<script>
import Messages from "./Messages.vue";
import Start from "./Start.vue";
import Graph from "./Graph.vue";

export default {
  components: { Messages, Start, Graph },
  data() {
    return {
      name: "",
    };
  },
};
</script>

<style scoped>
.appStart {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.app,
.appStarted,
.appGraph {
  width: 100%;
  height: 100%;
}
.appMessages {
  position: fixed;
  top: 5vh;
  bottom: 5vh;
  left: 5vw;
  width: 50vw;
}
.app {
  background-color: #5f9ea0;
}
</style>
