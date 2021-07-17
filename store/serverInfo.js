import Constants from "expo-constants";
const { manifest } = Constants;

//locally hosted server when your hosting app on lan and heroku server when tunneling
const location = manifest.packagerOpts.hostType === 'lan'
    ? `http://S${manifest.debuggerHost.split(":")[0]}:1337`
    : "https://blue-mood.herokuapp.com"


export default location
