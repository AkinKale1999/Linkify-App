
// export const isAuthenticated = false;


export function  isAuthenticated() {

    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('user')
      console.log(token);
      return !!token;  // Якщо токен є, користувач авторизований
    }

    return false;
  }

