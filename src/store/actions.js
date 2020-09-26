import * as commands from "./ws/commands";
import * as updates from "./ws/updates";

const acknCb = [];
let ws;

export default {
  commCreateNode(context, options) {
    ws = new WebSocket("ws://localhost:8080/");
    ws.onmessage = (event) => {
      const datum = JSON.parse(event.data);
      if (datum.type === "ackn") {
        acknCb.shift()(context, datum);
      } else if (datum.type === "updt") {
        if (datum.subtype === "newNode") {
          updates.newNode(context, datum);
        } else if (datum.subtype === "newLink") {
          updates.newLink(context, datum);
        } else if (datum.subtype === "newMessage") {
          updates.newMessage(context, datum);
        } else if (datum.subtype === "recievedMessage") {
          updates.recievedMessage(context, datum);
        } else if (datum.subtype === "deadNode") {
          updates.deadNode(context, datum);
        }
      }
    };
    ws.onopen = () => commands.createNode(ws, acknCb, options);
    function animateMessages() {
      Object.values(context.state.graph.messages).forEach((iGraphMessage) => {
        context.commit("stepMessage", { graphMessage: iGraphMessage });
      });
      window.requestAnimationFrame(animateMessages);
    }
    window.requestAnimationFrame(animateMessages);
  },

  commCreateLink(context, options) {
    commands.createLink(ws, acknCb, options);
  },

  commSendMessage(context, options) {
    commands.sendMessage(ws, acknCb, options);
  },
};
