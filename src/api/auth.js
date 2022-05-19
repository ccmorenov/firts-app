import jwtDecode from "jwt-decode";

export function signUpApi(user) {
    const url = `${"https://localhost:8080"}/registro`;
    const userTemp = {
      ...user,
      email: user.email.toLowerCase(),
      fechaNacimiento: new Date()
    };
    delete userTemp.repeatPassword;
  
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userTemp)
    };
  
    return fetch(url, params)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        return { code: 404, message: "Email no disponible" };
      })
      .then(result => {
        return result;
      })
      .catch(err => {
        return err;
      });
  }

export function setTokenApi(token){
    localStorage.setItem("token", token);
}

export function getTokenApi(){
    return localStorage.getItem("token");
}

export function logoutApi() {
    localStorage.removeItem("token");
}

export function isUserLoguedApi(){
    const token= getTokenApi();

    if (!token) {
        logoutApi();
        return null;
    }

    if (isExpired(token)){
        logoutApi();
    }
    return jwtDecode(token)
}

function isExpired(token) {
    const { exp }= jwtDecode(token);
    const expire =exp *1000;
    const timeout = expire - Date.now();

    if (timeout <0) {
        return true;
    }
    return false;
}