const user = localStorage.getItem("nome");
const userName = document.querySelector("#user");

if (user) {
  userName.textContent = user;
}