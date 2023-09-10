import db from "../database/database.connection.js";
import sgMail from "@sendgrid/mail";

async function create(req, res) {
  await db.orders.insertOne(req.body);
  return res.sendStatus(200);
}

async function sendEmailConfirm(req, res){
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  try {        
      const msg = {
          to: req.body.email,
          from: "davibarci0208@gmail.com",
          subject: `Confirmação de compra - Stok&Tok`,
          html: `<img src="http://cdn.mcauto-images-production.sendgrid.net/2119ebd1a1b606bb/d249777d-6ca2-4c49-aef8-75516842cc7c/700x475.jpg" style="width: 100%; object-fit: cover; height: 440px; margin-bottom: 10px; object-position: -29px center;"/> 
          <p style="width: 100%; font-weight: 700; color: #30775b; text-align: center; margin-bottom: 35px;">Olá ${req.body.name}!,</p> 
           <p style="width: 100%; font-weight: 700; color: #30775b; text-align: center; margin-bottom: 35px;">Adivinha só? Sua compra foi aprovada! <br/> 
           Agradecemos pela sua escolha em comprar conosco <br/>  
           e esperamos que você ame o seu novo produto tanto quanto nós amamos!</p>`,
      };
      await sgMail.send(msg);
      res.sendStatus(201);
  } catch (err) {
      return res.status(500).send(err.message);
  }
}

export default { create, sendEmailConfirm };
