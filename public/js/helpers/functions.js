

/**
 * @description Função que redireciona o usuário para outra página
 * @param {string} path - Caminho para onde o usuário será redirecionado
 */
export function redirectTo(path) {
  window.location.href = path;
}

/**
 * @description Função que seta toast de erroro
 * @param {string} msg - Mensagem a ser exibida
 * @param {string} type - Tipo de toast (success, error, info)
 */
export function showFeedback(msg, type) {
  const feedback = document.querySelector("#feedback-msg");
  feedback.innerHTML = `<div class='alert alert-${type}'>
                            <span>${msg}</span>
                        </div>`;
  setTimeout(() => {
    feedback.innerHTML = "";
  }, 4000);
}
