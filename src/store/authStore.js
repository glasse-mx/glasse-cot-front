import createStore from "react-auth-kit/createStore";

export const appStore = createStore({
  authName: "_authCiampi",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});
