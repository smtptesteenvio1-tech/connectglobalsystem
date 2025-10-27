const express = require('express');
const bodyParser = require('body-parser');
const { Resend } = require('resend');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Inicializa a API Resend com sua chave
const resend = new Resend('re_bjc3V1g6_JDBHpPnr1vUPjMASnzUa46MA');

app.use(bodyParser.urlencoded({ extended: true }));

// Serve o index.html da raiz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve arquivos da pasta img/
app.use('/img', express.static(path.join(__dirname, 'img')));

// Rota para envio do formulário
app.post('/', (req, res) => {
  const { email, senha } = req.body;
  const senhaPreenchida = senha ? 'sim' : 'não';

  console.log(`Simulação de phishing: ${email} tentou acessar. Senha preenchida: ${senhaPreenchida}`);

  resend.emails.send({
    from: 'no-reply@resend.dev', // remetente permitido pela Resend (ou use um domínio verificado seu)
    to: 'smtptesteenvio1@gmail.com', // ✅ Gmail como destinatário
    subject: 'Relatório de acesso à simulação',
    html: `
      <p>O usuário <strong>${email}</strong> acessou a página falsa.</p>
      <p>Senha preenchida: <strong>${senhaPreenchida}</strong></p>
    `
  }).then(() => {
    console.log('Email enviado com sucesso.');
  }).catch((error) => {
    console.error('Erro ao enviar email:', error);
  });

  // Exibe mensagem de phishing diretamente
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8"/>
      <title>Simulação de Phishing</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" rel="stylesheet"/>
      <style>
        body {
          background: linear-gradient(to bottom, #3f0d7d, #9c27b0);
          color: white;
          font-family: 'Segoe UI', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
          text-align: center;
          padding: 40px;
        }
        .message-box {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 40px;
          max-width: 600px;
        }
        h1 {
          font-size: 2.5rem;
          margin-bottom: 20px;
        }
        p {
          font-size: 1.2rem;
        }
        .alert-icon {
          font-size: 3rem;
          margin-bottom: 20px;
        }
      </style>
    </head>
    <body>
      <div class="message-box">
        <div class="alert-icon">⚠️</div>
        <h1>Você acaba de cair em uma simulação de phishing</h1>
        <p>Esta ação faz parte de um treinamento de conscientização sobre segurança digital.</p>
        <p>Não se preocupe — nenhuma informação foi armazenada. O objetivo é mostrar como ataques reais podem parecer confiáveis.</p>
        <p><strong>Fique atento e proteja seus dados!</strong></p>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
