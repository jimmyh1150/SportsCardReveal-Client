let APIURL = "";
export default APIURL;

switch (window.location.hostname) {
  case "localhost" || "127.0.0.1":
    APIURL = "http://localhost:4000";
    break;
  case "sportscard-reveal-client.herokuapp.com":
    APIURL = "https://sportscard-reveal.herokuapp.com";
}
