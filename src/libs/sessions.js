const SESSION_NAME = 'login' // nombre como el que se guarda

class AppSessions {
  static CreateSessions (token) {
    localStorage.setItem(SESSION_NAME, JSON.stringify(token))
  }

  static GetSessions () {
    return JSON.parse(localStorage.getItem(SESSION_NAME))
  }

  static DestroySessions () {
    localStorage.removeItem(SESSION_NAME)
  }
}

export { AppSessions }
