const express = require('express');
const bodyParser = require('body-parser');
const resend = require('./resend'); // ajuste conforme seu arquivo de envio

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // para servir HTML, CSS, imagens

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
