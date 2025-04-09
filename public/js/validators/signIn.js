import { redirectTo, setVisibility, showFeedback } from "../helpers/functions.js";

const imgPassword = document.querySelector("#showPassword");
const inputPassword = document.querySelector("#password");

if (imgPassword && inputPassword) {
  setVisibility(imgPassword, inputPassword);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  let { nome, email, password } = form.elements;
  email = email.value.trim();
  password = password.value.trim();
  nome = nome.value.trim();

  if (!email || !password || !nome) {
    showFeedback(
      "Não foi possível realizar cadastro. Favor preencher todos os campos",
      "error"
    );
    return;
  }

  // Mock de usuário para fins de estudo( nunca poderia ser salva uma senha assim)
  const user = {
    nome,
    email,
    password,
  };

  localStorage.setItem("user", JSON.stringify(user));

  try {
    const publicKey = {
      challenge: new Uint8Array(32),
      rp: {
        name: "Meu App",
      },
      user: {
        id: new TextEncoder().encode(email),
        name: email,
        displayName: nome,
      },
      pubKeyCredParams: [
        { type: "public-key", alg: -7 },
        { type: "public-key", alg: -257 },
      ],
      authenticatorSelection: {
        userVerification: "required",
      },
      timeout: 60000,
      attestation: "none",
    };

    const credential = await navigator.credentials.create({ publicKey });

    localStorage.setItem("credentialId", credential.id);

    showFeedback("Cadastro feito com sucesso e chave criada!", "success");
    setTimeout(() => redirectTo("../pages/home.html"), 2500);

  } catch (err) {
    console.error("Erro ao registrar WebAuthn:", err);
    showFeedback(
      `Cadastro realizado, mas houve falha ao registrar WebAuthn: ${err.message}`,
      "info"
    );

    setTimeout(() => redirectTo("../pages/home.html"), 2500);
  }
});
