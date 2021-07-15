import Constants from "expo-constants";
const { manifest } = Constants;

// if you want to use the locally hosted server:
// const location = `http://${
//   typeof manifest.packagerOpts === "object" && manifest.packagerOpts.dev
//     ? manifest.debuggerHost.split(":")[0]
//     : ""
// }:1337`;

const location = 'https://blue-mood.herokuapp.com'


export default location
