<template>
  <g :transform="translate(node.x, node.y)">
    <circle
      :r="circleR"
      :fill="circleFill"
      :stroke-width="circleStrokeWidth"
      stroke="black"
      @click="circleClick"
      @mouseenter="circleMouseenter"
      @mouseleave="circleMouseleave"
    />
    <text y="-20" text-anchor="middle">
      {{ node.real.name }}
    </text>
  </g>
</template>

<script>
import GraphNode from "../store/classes/GraphNode";
import Link from "../store/classes/Link";
import Node from "../store/classes/Node";

export default {
  props: {
    node: {
      type: GraphNode,
      default: undefined,
    },
  },
  data() {
    return {
      circleHover: false,
    };
  },
  computed: {
    circleFill() {
      if (this.node.real === this.$store.state.runtime.node) {
        return "red";
      }
      if (this.node.real instanceof Link) {
        if (this.node.real === this.$store.state.runtime.link) {
          return "orange";
        }
        return "yellow";
      }
      return "blue";
    },
    circleStrokeWidth() {
      if (
        this.node.real instanceof Node &&
        this.node.real.id in this.$store.state.runtime.nodes
      ) {
        return 5;
      }
      return 0;
    },
    circleR() {
      if (this.circleHover) {
        return 20;
      }
      return 10;
    },
  },
  methods: {
    translate(x, y) {
      return `translate(${x},${y})`;
    },
    circleClick() {
      if (this.node.real instanceof Node) {
        if (this.node.real.id in this.$store.state.runtime.nodes) {
          this.$store.commit("killRuntimeNode", {
            node: this.node.real,
          });
        } else {
          this.$store.commit("createRuntimeNode", {
            node: this.node.real,
          });
        }
      } else if (this.node.real instanceof Link) {
        this.$store.commit("setRuntimeLink", {
          link: this.node.real,
        });
      }
    },
    circleMouseenter() {
      this.circleHover = true;
    },
    circleMouseleave() {
      this.circleHover = false;
    },
  },
};
</script>

<style scoped>
</style>
