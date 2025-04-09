if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => console.log("Service Worker registrado com sucesso!"))
      .catch((error) =>
        console.error("Erro ao registrar Service Worker:", error)
      );
  }


  let deferredPrompt;
    const installBtn = document.getElementById('installBtn');
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        // Armazena o evento para que possa ser acionado depois
        deferredPrompt = e;
        // Mostra o botão de instalação
        installBtn.style.display = 'block';
    });
    
    installBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();

            const { outcome } = await deferredPrompt.userChoice;
            
            deferredPrompt = null;
            
            installBtn.style.display = 'none';
            
            console.log(`Resultado da instalação: ${outcome}`);
        }
    });