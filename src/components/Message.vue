<template>
  <div class="message">
    {{ sender }}:
    {{ content }}
    [{{ time }}]
  </div>
</template>

<script>
// Message in sidebar
export default {
  props: {
    sender: {
      type: String,
      default: "N/A",
    },
    content: {
      type: String,
      default: "N/A",
    },
    time: {
      type: String,
      default: "N/A",
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.message {
  border: 1px solid black;
}
</style>
