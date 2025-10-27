const express = require('express');
const bodyParser = require('body-parser');
const { Resend } = require('resend');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const resend = new Resend('re_bjc3V1g6_JDBHpPnr1vUPjMASnzUa46MA');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', (req, res) => {
  const { email, senha } = req.body;
  const senhaPreenchida = senha ? 'sim' : 'não';

  console.log(`Simulação de phishing: ${email} tentou acessar. Senha preenchida: ${senhaPreenchida}`);

  resend.emails.send({
    from: 'alerta@connectglobalsystem.com',
    to: 'seguranca@globalsystem.com',
    subject: 'Alerta de simulação de phishing',
    html: `
      <p>O usuário <strong>${email}</strong> acessou a página falsa.</p>
      <p>Senha preenchida: <strong>${senhaPreenchida}</strong></p>
    `
  }).then(() => {
    console.log('Email enviado com sucesso.');
  }).catch((error) => {
    console.error('Erro ao enviar email:', error);
  });

  // Exibe a mensagem diretamente
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8"/>
      <title>Simulação de Phishing</title>
      <style>
        body {
          font-family: 'Segoe UI', sans-serif;
          background-color: #fff3cd;
          color: #856404;
          padding: 40px;
          text-align: center;
        }
        h1 {
          font-size: 2rem;
        }
      </style>
    </head>
    <body>
      <h1>Você acaba de cair em uma simulação de phishing ⚠️</h1>
      <p>Essa página foi criada para fins educativos e de conscientização sobre segurança digital.</p>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
