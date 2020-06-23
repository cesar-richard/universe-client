const nodes = {
  "A4:CF:12:24:56:0C": "Relays",
  "24:6F:28:10:93:98": "Controls",
  "24:6F:28:10:61:28": "Weather"
};
export default nodes;
export function nodeNameByMac(macAddress) {
  return nodes[macAddress] ? nodes[macAddress] : "Unknown";
}
export function nodeMacByName(name) {
  return Object.entries(nodes).filter(e => e[1] === name)[0][0];
}
