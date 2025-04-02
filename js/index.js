const errorMessage = document.getElementById("error-message");
const bttn = document.getElementById("bttn");
const inputName = document.querySelector("#input-name");

const eventName = document
  .querySelector("#input-name")
  .addEventListener("input", (e) => {
    const nome = e.target.value.trim(); // Pega o valor completo digitado

    const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]{3,}$/;

    // Verifica se o nome é válido (se possui numero e nao é menor que 3 caracteres)
    const isValid = nomeRegex.test(nome);

    errorMessage.style.display = isValid ? "none" : "block";
    e.target.style.borderColor = isValid ? "" : "red";
    bttn.disabled = !isValid;
  });

const eventBttnClick = bttn.addEventListener("click", (e) => {
  let nome = inputName.value;
  console.log(nome);

  if (nome != "") {
    localStorage.setItem("nome", nome);
    window.location.href = "home.html";
  }
});

// Lógica para o botão de instalação
let deferredPrompt;

const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  // Previne o comportamento padrão
  e.preventDefault();
  // Armazena o evento para que possa ser acionado depois
  deferredPrompt = e;
  // Mostra o botão de instalação
  installBtn.style.display = "block";
});

installBtn.addEventListener("click", async () => {
  if (deferredPrompt) {
    // Mostra o prompt de instalação
    deferredPrompt.prompt();
    // Espera pelo resultado
    const { outcome } = await deferredPrompt.userChoice;
    // Limpa a referência
    deferredPrompt = null;
    // Esconde o botão
    installBtn.style.display = "none";
    console.log(`Resultado da instalação: ${outcome}`);
  }
});

