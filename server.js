app.post('/', (req, res) => {
  const { email, senha } = req.body;

  // Verifica se o campo de senha foi preenchido
  const senhaPreenchida = senha ? 'sim' : 'não';

  // Log no console (Render)
  console.log(`Simulação de phishing: ${email} tentou acessar a plataforma. Senha preenchida: ${senhaPreenchida}`);

  // Envio por email via Resend (sem conteúdo da senha)
  resend.emails.send({
    to: 'seguranca@globalsystem.com',
    subject: 'Alerta de simulação de phishing',
    html: `
      <p>O usuário <strong>${email}</strong> acessou a página falsa.</p>
      <p>Senha preenchida: <strong>${senhaPreenchida}</strong></p>
    `
  });

  // Redireciona para a página de alerta
  res.redirect('/phishing.html');
});
