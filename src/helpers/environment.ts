let APIURL = "";

switch (window.location.hostname) {
  case "localhost" || "127.0.0.1":
    //APIURL = "http://localhost:3000";
    APIURL = "https://sportscardreveal-server.herokuapp.com";
    break;
  case "sportscardreveal.herokuapp.com":
    APIURL = "https://sportscardreveal-server.herokuapp.com";
}

export default APIURL;
