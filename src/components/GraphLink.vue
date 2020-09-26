<template>
  <line
    :x1="link.node1.x"
    :y1="link.node1.y"
    :x2="link.node2.x"
    :y2="link.node2.y"
    :stroke="lineStroke"
    :stroke-width="lineStrokeWidth"
    @mouseenter="lineMouseenter"
    @mouseleave="lineMouseleave"
    @click="lineClick"
  />
</template>

<script>
// SVG link representation
import GraphLink from "../store/classes/GraphLink";

export default {
  props: {
    link: {
      type: GraphLink,
      default: undefined,
    },
  },
  data() {
    return {
      lineHover: false,
    };
  },
  computed: {
    lineStroke() {
      if (this.link.real === this.$store.state.runtime.link) {
        return "darkgreen";
      }
      return "green";
    },
    lineStrokeWidth() {
      if (this.lineHover) {
        return 20;
      }
      return 10;
    },
  },
  methods: {
    lineClick() {
      this.$store.commit("setRuntimeLink", {
        link: this.link.real,
      });
    },
    lineMouseenter() {
      this.lineHover = true;
    },
    lineMouseleave() {
      this.lineHover = false;
    },
  },
};
</script>
