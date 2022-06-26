import jwtDecode from "jwt-decode";
import moment from "moment";
import LocalStorageService from "./LocalStorageService";

export default class Auth {
  user = null;
  token = "";
  currentUser = null;

  onUserChange = (newUser) => {};

  constructor() {
    this.decodeToken();
    window.addEventListener(
      "storage",
      (e) => e.key === "accessToken" && this.decodeToken()
    );
  }

  userChanged() {
    const user = this.getUser();
    this.onUserChange(user);
  }

  setToken(userObj) {
    LocalStorageService.setUser(userObj.user);
    LocalStorageService.setToken(userObj.token);
    this.decodeToken();
    this.userChanged();
  }

  decodeToken() {
    try {
      const accessToken = LocalStorageService.getAccessToken();
      const currentUser = LocalStorageService.getUser();
      this.token = accessToken || "";
      this.user = jwtDecode(this.token);
      this.currentUser = currentUser || "";
      this.userChanged();
    } catch (e) {
      this.logout();
    }
  }

  logout() {
    this.user = null;
    this.token = "";
    this.currentUser = null;
    LocalStorageService.clearAll();
    this.userChanged();
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    // return this.user && (new Date().getTime() < this.user.exp);
    // return this.user ? true : false;
    // Get the current time as Unix time

    const currentUnixTime = moment().unix();
    return this.user && currentUnixTime < this.user.exp;
  }

  getUser() {
    return this.user;
  }

  getCurrentUser() {
    return this.currentUser;
  }
}
