const nodes = {
  "A4:CF:12:24:56:0C": "Relays"
};
export default nodes;
export function nodeNameByMac(macAddress) {
  return nodes[macAddress] ? nodes[macAddress] : "Unknown";
}
export function nodeMacByName(name) {
  return Object.entries(nodes).filter(e => e[1] === name)[0][0];
}
