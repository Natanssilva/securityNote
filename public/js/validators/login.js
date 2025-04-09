import {
  redirectTo,
  showFeedback,
  setVisibility,
} from "../helpers/functions.js";

const imgPassword = document.querySelector("#showPassword");
const inputPassword = document.querySelector("#password");

if (imgPassword && inputPassword) {
  setVisibility(imgPassword, inputPassword);
}

const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  let {email, password } = form.elements;
  email = email.value.trim();
  password = password.value.trim();

  if (!email || !password ) {
    showFeedback(
      "Não foi possível realizar cadastro. Favor preencher todos os campos",
      "error"
    );
    return;
  }
  const user = {
    email,
    password,
  };

  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    showFeedback(
      "Não existe usuário com essas credenciais. Favor realizar cadastro.",
      "error"
    );
    return;
  }

  if (user.email === savedUser.email && user.password === savedUser.password) {
    showFeedback("Login bem sucedido!", "success");
    setTimeout(() => redirectTo("../pages/home.html"), 2500);
  }
});
