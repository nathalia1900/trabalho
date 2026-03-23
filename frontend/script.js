const API = 'http://localhost:3000';
function mostrarCadastro() {
  document.getElementById('login').style.display = 'none';
  document.getElementById('cadastro').style.display = 'block';
}

function mostrarLogin() {
  document.getElementById('login').style.display = 'block';
  document.getElementById('cadastro').style.display = 'none';
}

async function cadastrar() {
const nome = document.getElementById('nome').value;
const email = document.getElementById('email').value;
const data_nascimento = document.getElementById('data_nascimento').value;
const cpf = document.getElementById('cpf').value;
const senha = document.getElementById('senha').value;

  if (!nome || !email  || !data_nascimento || !cpf || !senha) {
    alert('Preencha todos os campos');
    return;
  }

  const resposta = await fetch(API + '/cadastro', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email,data_nascimento,cpf,senha })
  });

  const dados = await resposta.json();
  alert(dados.mensagem);
}

async function login() {
  const email = document.getElementById('loginEmail').value;
  const senha = document.getElementById('loginSenha').value;

  if (!email || !senha) {
    alert('Preencha todos os campos');
    return;
  }

  const resposta = await fetch(API + '/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  });

  const dados = await resposta.json();

  if (dados.sucesso) {
    alert('Login realizado com sucesso');
  } else {
    alert('Email ou senha inválidos');
  }
}