const nodemailer = require('nodemailer');

class EmailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '@gmail.com', // reemplazar con correo rel o de la empresa
        pass: 'hbmfjfjfjf' // contraseña de aplicación
      },
      tls: {
        rejectUnauthorized: false 
      }
    });
  }

  async send(email, mensaje) {
    const mailOptions = {
      from: '"Tu App" <tu_correo@gmail.com>',
      to: email,// poner un correo tempora para probar
      subject: 'Nuevo Mensaje en la Plataforma',
      text: mensaje
    };
//email
    const info = await this.transporter.sendMail(mailOptions);
    console.log('Correo enviado:', info.messageId);
  }
}

module.exports = EmailSender;
