import { BehaviorSubject } from "rxjs";

class UserService {
  constructor() {
    this.usernameSubject = new BehaviorSubject(localStorage.getItem("username"));
    this.username$ = this.usernameSubject.asObservable();

    this.authStatusSubject = new BehaviorSubject(this.isAuthenticated());
    this.authStatus$ = this.authStatusSubject.asObservable();
  }

  setUsername(username) {
    this.usernameSubject.next(username);
    this.authStatusSubject.next(this.isAuthenticated());
  }

  isAuthenticated() {
    const token = localStorage.getItem("token");
    return token !== null;
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    this.usernameSubject.next(null);
    this.authStatusSubject.next(this.isAuthenticated());
  }

  getToken() {
    return localStorage.getItem("token");
  }
}

export default UserService;
