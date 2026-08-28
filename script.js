const botaoDestaque = document.querySelector("#botaoDestaque");
const servicos = document.querySelector("#servicos");
const formContato = document.querySelector("#formContato");
const resposta = document.querySelector("#resposta");

botaoDestaque.addEventListener("click", () => {
  servicos.scrollIntoView({ behavior: "smooth" });
});

formContato.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = document.querySelector("#nome").value.trim();
  const email = document.querySelector("#email").value.trim();

  // Limpa classes de estado anteriores
  resposta.classList.remove("resposta-erro", "resposta-sucesso");

  // Verifica se o e-mail termina com @gmail.com
  if (!email.toLowerCase().endsWith("@gmail.com")) {
    resposta.textContent = "Por favor, insira um e-mail válido do Gmail (ex: nome@gmail.com).";
    resposta.classList.add("resposta-erro");
    return;
  }
});
