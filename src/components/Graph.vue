<template>
  <div class="graph">
    <form class="createLinkForm" @submit.prevent="createLink">
      <input
        v-model="name"
        class="createLinkInput"
        type="text"
        placeholder="New Link Name"
      />
      <button class="createLinkButton" type="submit">Create Link</button>
    </form>
    <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
      <g>
        <g
          v-for="iLink in Object.values($store.state.graph.links)"
          :key="iLink.real ? iLink.real.id : Object.values(iLink)[0].real.id"
        >
          <graph-link v-if="iLink instanceof GraphLink" :link="iLink" />
          <g v-else>
            <graph-link
              v-for="jLink in Object.values(iLink)"
              :key="jLink.real.id + jLink.node1.real.id"
              :link="jLink"
            />
          </g>
        </g>
      </g>
      <g>
        <g
          v-for="iMessage in Object.values($store.state.graph.messages)"
          :key="
            iMessage.real
              ? iMessage.real.id
              : Object.values(iMessage)[0].real.id
          "
        >
          <graph-message
            v-if="iMessage instanceof GraphMessage"
            :message="iMessage"
          />
          <g v-else>
            <graph-message
              v-for="jMessage in Object.values(iMessage)"
              :key="
                jMessage.real.id +
                (jMessage.node2.real instanceof Link
                  ? jMessage.node1.real.id
                  : jMessage.node2.real.id)
              "
              :message="jMessage"
            />
          </g>
        </g>
      </g>
      <g>
        <graph-node
          v-for="iNode in Object.values($store.state.graph.nodes)"
          :key="iNode.real.id"
          :node="iNode"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import Node from "../store/classes/Node";
import Link from "../store/classes/Link";
import GraphLink from "../store/classes/GraphLink";
import GraphMessage from "../store/classes/GraphMessage";
import GraphNodeComp from "./GraphNode.vue";
import GraphLinkComp from "./GraphLink.vue";
import GraphMessageComp from "./GraphMessage.vue";

export default {
  components: {
    GraphNode: GraphNodeComp,
    GraphLink: GraphLinkComp,
    GraphMessage: GraphMessageComp,
  },
  data() {
    return {
      name: "",
      Link,
      Node,
      GraphLink,
      GraphMessage,
    };
  },
  methods: {
    createLink() {
      this.$store.dispatch("commCreateLink", {
        node: this.$store.state.runtime.node,
        name: this.name,
        nodes: this.$store.state.runtime.nodes,
      });
      this.$store.commit("unsetRuntimeNodes");
    },
  },
};
</script>

<style scoped>
.createLinkForm {
  position: fixed;
  height: 30px;
  bottom: 5vh;
  right: 5vw;
  width: 30vw;
  display: flex;
  flex-direction: row;
}
.createLinkInput {
  order: 1;
  flex: 1;
  height: 30px;
}
.createLinkButton {
  order: 2;
  flex: 0 0 150px;
  height: 30px;
}
svg {
  height: 100%;
  width: 100%;
}
</style>
