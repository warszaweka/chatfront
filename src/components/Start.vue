<template>
  <div>
    <form class="createNodeForm" @submit.prevent="createNode">
      <input
        v-model="name"
        class="createNodeInput"
        type="text"
        placeholder="New Node Name"
      />
      <button class="createNodeButton" type="submit">Create Node</button>
    </form>
  </div>
</template>

<script>
// Retrieving user node name
export default {
  data: () => ({
    name: "",
  }),
  methods: {
    createNode() {
      this.$store.dispatch("commCreateNode", { name: this.name });
    },
  },
};
</script>

<style scoped>
.createNodeForm {
  display: flex;
  flex-direction: row;
}
.createNodeInput {
  order: 1;
  flex: 1;
  height: 30px;
}
.createNodeButton {
  order: 2;
  flex: 0 0 150px;
  height: 30px;
}
</style>
