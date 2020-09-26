<template>
  <circle
    :cx="
      Math.floor(
        ((message.node2.x - message.node1.x) * message.prog) / 100 +
          message.node1.x
      )
    "
    :cy="
      Math.floor(
        ((message.node2.y - message.node1.y) * message.prog) / 100 +
          message.node1.y
      )
    "
    r="5"
    fill="black"
  />
</template>

<script>
// SVG message representation
import GraphMessage from "../store/classes/GraphMessage";

export default {
  props: {
    message: {
      type: GraphMessage,
      default: undefined,
    },
  },
  data() {
    return {};
  },
};
</script>
