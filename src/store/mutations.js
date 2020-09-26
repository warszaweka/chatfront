import Vue from "vue";

import GraphNode from "./classes/GraphNode";
import GraphLink from "./classes/GraphLink";
import GraphMessage from "./classes/GraphMessage";

export default {
  setRuntimeNode(state, { node }) {
    Vue.set(state.runtime, "node", node);
  },

  setRuntimeLink(state, { link }) {
    Vue.set(state.runtime, "link", link);
  },

  setGraphNodeXY(state, { node, x, y }) {
    node.x = x;
    node.y = y;
  },

  createRuntimeNode(state, { node }) {
    Vue.set(state.runtime.nodes, node.id, node);
  },

  unsetRuntimeNodes(state) {
    Vue.set(state.runtime, "nodes", {});
  },

  unsetRuntimeLink(state) {
    Vue.delete(state.runtime, "link");
  },

  killRuntimeNode(state, { node }) {
    Vue.delete(state.runtime.nodes, node.id);
  },

  createNode(state, { node }) {
    Vue.set(state.nodes, node.id, node);
    Vue.set(state.graph.nodes, node.id, new GraphNode(node));
  },

  createLink(state, { link }) {
    Vue.set(state.links, link.id, link);
    Object.values(link.nodes).forEach((iNode) => {
      Vue.set(iNode.links, link.id, link);
    });
    if (Object.values(link.nodes).length === 2) {
      const aNodes = Object.values(link.nodes);
      Vue.set(
        state.graph.links,
        link.id,
        new GraphLink(
          link,
          state.graph.nodes[aNodes[0].id],
          state.graph.nodes[aNodes[1].id]
        )
      );
    } else {
      const graphNode = new GraphNode(link);
      Vue.set(state.graph.nodes, link.id, graphNode);
      const aGraphLinks = {};
      Object.values(link.nodes).forEach((iNode) => {
        aGraphLinks[iNode.id] = new GraphLink(
          link,
          state.graph.nodes[iNode.id],
          graphNode
        );
      });
      Vue.set(state.graph.links, link.id, aGraphLinks);
    }
  },

  createMessage(state, { message }) {
    Vue.set(state.messages, message.id, message);
    Vue.set(message.link.messages, message.id, message);
    const graphSender = state.graph.nodes[message.node.id];
    if (Object.values(message.link.nodes).length === 2) {
      const graphReciever =
        state.graph.links[message.link.id].node1 === graphSender
          ? state.graph.links[message.link.id].node2
          : state.graph.links[message.link.id].node1;
      Vue.set(
        state.graph.messages,
        message.id,
        new GraphMessage(message, graphSender, graphReciever)
      );
    } else {
      const graphReciever = state.graph.nodes[message.link.id];
      Vue.set(state.graph.messages, message.id, {
        [message.node.id]: new GraphMessage(
          message,
          graphSender,
          graphReciever
        ),
      });
    }
  },

  killNode(state, { node }) {
    Object.values(node.links).forEach((iLink) => {
      Object.values(iLink.messages).forEach((jMessage) => {
        Vue.delete(state.messages, jMessage.id);
      });
      Object.values(iLink.nodes).forEach((jNode) => {
        Vue.delete(jNode.links, iLink.id);
      });
      Vue.delete(state.links, iLink.id);
      Vue.delete(state.graph.links, iLink.id);
      if (Object.values(iLink.nodes).length === 2) {
        Vue.delete(state.graph.nodes, iLink.id);
      }
    });
    Vue.delete(state.nodes, node.id);
    Vue.delete(state.graph.nodes, node.id);
  },

  stepMessage(state, { graphMessage }) {
    if (graphMessage instanceof GraphMessage) {
      if (graphMessage.prog === 100) {
        if (graphMessage.real.content === "") {
          Vue.delete(state.messages, graphMessage.real.id);
          Vue.delete(graphMessage.real.link.messages, graphMessage.real.id);
        }
        Vue.delete(state.graph.messages, graphMessage.real.id);
      } else {
        graphMessage.prog += 1;
      }
    } else {
      const aGraphMessages = Object.values(graphMessage);
      const firstGraphMessage = aGraphMessages[0];
      if (firstGraphMessage.prog === 100) {
        if (aGraphMessages.length === 1) {
          Object.values(firstGraphMessage.real.link.nodes).forEach((iNode) => {
            if (iNode !== firstGraphMessage.node1.real) {
              Vue.set(
                state.graph.messages[firstGraphMessage.real.id],
                iNode.id,
                new GraphMessage(
                  firstGraphMessage.real,
                  state.graph.nodes[firstGraphMessage.real.link.id],
                  state.graph.nodes[iNode.id]
                )
              );
              Vue.delete(
                state.graph.messages[firstGraphMessage.real.id],
                firstGraphMessage.node1.real.id
              );
            }
          });
        } else {
          if (firstGraphMessage.real.content === "") {
            Vue.delete(state.messages, firstGraphMessage.real.id);
            Vue.delete(
              firstGraphMessage.real.link.messages,
              firstGraphMessage.real.id
            );
          }
          Vue.delete(state.graph.messages, firstGraphMessage.real.id);
        }
      } else {
        aGraphMessages.forEach((iGraphMessage) => {
          iGraphMessage.prog += 1;
        });
      }
    }
  },
};
