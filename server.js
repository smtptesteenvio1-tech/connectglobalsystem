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
    from: 'no-reply@resend.dev',
    to: 'smtptesteenvio1@gmail.com',
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
      <title>🚨 Alerta de Segurança</title>
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
          max-width: 700px;
        }
        h1 {
          font-size: 2.5rem;
          margin-bottom: 20px;
        }
        p {
          font-size: 1.2rem;
          margin-bottom: 10px;
        }
        .alert-icon {
          font-size: 3rem;
          margin-bottom: 20px;
        }
        .highlight {
          color: #ffcc00;
          font-weight: bold;
        }
        .footer {
          margin-top: 30px;
          font-size: 1rem;
          background: linear-gradient(to right, #6a1b9a, #8e24aa);
          padding: 15px;
          border-radius: 8px;
          color: #fff;
        }
      </style>
    </head>
    <body>
      <div class="message-box">
        <div class="alert-icon">⚠️</div>
        <h1>Você caiu em uma simulação de phishing</h1>
        <p class="highlight">⚠️ Isso poderia ter sido um ataque real!</p>
        <p>Você clicou em um link suspeito e digitou seus dados sem conferir o remetente do e-mail ou o endereço da página.</p>
        <p>Esse tipo de descuido pode colocar em risco toda a segurança da empresa.</p>
        <p>🔍 <strong>Dica rápida:</strong> Sempre verifique se o e-mail é confiável, se o link parece legítimo e se a página tem o padrão visual da Connect.</p>
        <hr style="border-color: rgba(255,255,255,0.3); margin: 20px 0;">
        <p>💡 Esta página faz parte de um treinamento de conscientização sobre segurança digital.</p>
        <p>✅ Nenhuma informação foi armazenada. O objetivo é mostrar como ataques reais podem parecer confiáveis.</p>
        <p class="highlight">⚠️ Fique atento. Segurança digital começa com você!</p>
        <div class="footer">
          <p>— Agradecemos sua atenção.</p>
          <p><strong>🛡️ Time de Cyber Security da Global System</strong></p>
        </div>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
