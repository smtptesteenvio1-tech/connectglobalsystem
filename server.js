const express = require('express');
const bodyParser = require('body-parser');
const { Resend } = require('resend');

const app = express();
const PORT = process.env.PORT || 3000;

// Chave da API Resend diretamente no código
const resend = new Resend('re_bjc3V1g6_JDBHpPnr1vUPjMASnzUa46MA');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Certifique-se de que seus arquivos HTML estão na pasta 'public'

app.post('/', (req, res) => {
  const { email, senha } = req.body;
  const senhaPreenchida = senha ? 'sim' : 'não';

  console.log(`Simulação de phishing: ${email} tentou acessar. Senha preenchida: ${senhaPreenchida}`);

  resend.emails.send({
    to: 'seguranca@globalsystem.com',
    subject: 'Alerta de simulação de phishing',
    html: `
      <p>O usuário <strong>${email}</strong> acessou a página falsa.</p>
      <p>Senha preenchida: <strong>${senhaPreenchida}</strong></p>
    `
  });

  res.redirect('/phishing.html');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
