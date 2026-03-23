const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'User-12910',
  database: 'sistema_auth'
});


db.connect(err => {
    if(err) return console.error("Erro no MySQL:", err);
    console.log("Conectado ao MySQL");
});
app.post('/cadastro', (req, res) => {
  const { nome, email,data_nascimento,cpf,senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Preencha todos os campos' });
  }

  const sql = 'INSERT INTO usuarios (nome, email, data_nascimento, cpf, senha) VALUES (?, ?, ?, ?, ?)';

  db.query(sql, [nome, email,data_nascimento,cpf, senha], (err, result) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao cadastrar usuário' });
    }

    res.json({ mensagem: 'Usuário cadastrado com sucesso' });
  });
});

app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  const sql = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';

  db.query(sql, [email, senha], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length > 0) {
      res.json({ sucesso: true, usuario: result[0] });
    } else {
      res.json({ sucesso: false });
    }
  });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));