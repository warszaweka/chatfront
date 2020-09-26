import * as data from "./data";
import * as acknowledges from "./acknowledges";

export function createNode(ws, acknCb, options) {
  acknCb.push((context, datum) =>
    acknowledges.createNode(context, datum, options)
  );
  ws.send(JSON.stringify(data.commCreateNode(options)));
}

export function createLink(ws, acknCb, options) {
  acknCb.push((context, datum) =>
    acknowledges.createLink(context, datum, options)
  );
  ws.send(JSON.stringify(data.commCreateLink(options)));
}
export function sendMessage(ws, acknCb, options) {
  acknCb.push((context, datum) =>
    acknowledges.sendMessage(context, datum, options)
  );
  ws.send(JSON.stringify(data.commSendMessage(options)));
}
