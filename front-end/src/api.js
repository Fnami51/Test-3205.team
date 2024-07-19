import { apiUrl } from "./setting";

function cheakOnline() {if (!navigator.onLine) {
    throw new Error("Нет интернета");
  }} 

export function postSearch(email, number) {
    cheakOnline()
    return fetch(apiUrl + "/contacts", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
        },
      body: JSON.stringify({
        email: email,
        number: number.replaceAll("-", ""),
      }),
    }).then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 400) {
        throw new Error("Неверно введены данный. Исправьте и попробуйте снова");
      } else {
        throw new Error("Кажется, что-то не так. Попробуйте в другой раз");
      }
    });
  }