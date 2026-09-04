const botaoDestaque = document.querySelector("#botaoDestaque");
const servicos = document.querySelector("#servicos");
const formContato = document.querySelector("#formContato");
const resposta = document.querySelector("#resposta");
const ocultarEmailCheckbox = document.querySelector("#ocultarEmailCheckbox");

botaoDestaque.addEventListener("click", () => {
  servicos.scrollIntoView({ behavior: "smooth" });
});

function ocultarEmail(email) {
  const [usuario, dominio] = email.split("@");
  if (!usuario || !dominio) return email;

  const visiveis = usuario.length > 2 ? usuario.slice(0, 2) : usuario.slice(0, 1);
  const mascarado = "*".repeat(Math.max(usuario.length - visiveis.length, 3));

  return `${visiveis}${mascarado}@${dominio}`;
}

formContato.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = document.querySelector("#nome").value.trim();
  const email = document.querySelector("#email").value.trim();

  // Mensagem de área de inspeção (visível no DevTools > Console)
  console.group("📋 Inspeção do envio do formulário");
  console.log("Nome informado:", nome);
  console.log("E-mail informado:", email);
  console.log("Ocultar e-mail?:", ocultarEmailCheckbox?.checked ?? false);
  console.log("Horário do envio:", new Date().toLocaleString("pt-BR"));
  console.groupEnd();

  // Limpa classes de estado anteriores
  resposta.classList.remove("resposta-erro", "resposta-sucesso");

  // Verifica se o e-mail termina com @gmail.com
  if (!email.toLowerCase().endsWith("@gmail.com")) {
    resposta.textContent = "Por favor, insira um e-mail válido do Gmail (ex: nome@gmail.com).";
    resposta.classList.add("resposta-erro");
    return;
  }

  // Define se o e-mail será exibido oculto ou completo
  const emailExibido = ocultarEmailCheckbox?.checked
    ? ocultarEmail(email)
    : email;

  // Mensagem de confirmação dos dados enviados
  resposta.textContent = `Obrigado pelo contato, ${nome}! Enviamos uma confirmação para ${emailExibido}.`;
  resposta.classList.add("resposta-sucesso");
  formContato.reset();
});
