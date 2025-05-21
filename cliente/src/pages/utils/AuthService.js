//SINGLETON
class AuthService {
  static instance;

  constructor() {
    if (AuthService.instance) {
      return AuthService.instance;
    }
    this.user = JSON.parse(localStorage.getItem('user'));
    AuthService.instance = this;
  }

  getUser() {
    return this.user;
  }

  setUser(user) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  clearUser() {
    this.user = null;
    localStorage.removeItem('user');
  }
}

export default new AuthService();
