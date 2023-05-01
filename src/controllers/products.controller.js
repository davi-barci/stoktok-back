import db from "../database/database.connection.js";
import sgMail from "@sendgrid/mail";

async function newProduct (req, res) {
    try {
        await db.products.insertOne(req.body);
        res.sendStatus(201);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

async function getProducts (_req, res) { 
    try {        
        const products = await db.products.find().toArray();
        res.send(products).status(200);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

async function deleteProducts (req, res) {
    const { name } = req.body;
    try {        
        await db.products.deleteMany({name: name});
        res.status(200);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

async function sendEmailNewsletter(req, res){
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    try {        
        const msg = {
            to: req.body.email,
            from: "davibarci0208@gmail.com",
            subject: `Bem-vindo(a), ${req.body.name}`,
            html: `<img src="http://cdn.mcauto-images-production.sendgrid.net/2119ebd1a1b606bb/d249777d-6ca2-4c49-aef8-75516842cc7c/700x475.jpg" style="width: 100%; object-fit: cover; height: 440px; margin-bottom: 10px; object-position: -29px center;"/> 
            <p style="width: 100%; font-weight: 700; color: #30775b; text-align: center; margin-bottom: 35px;">Olá ${req.body.name},</p> 
             <p style="width: 100%; font-weight: 700; color: #30775b; text-align: center; margin-bottom: 35px;">Ficamos felizes em saber do seu interesse em receber nossas <br/> 
            comunicações e conhecer um pouco mais sobre a nossa casa. <br/> 
            Agora que você chegou, que seja para ficar.</p>`,
        };
        await sgMail.send(msg);
        res.sendStatus(201);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export default { newProduct, getProducts, deleteProducts, sendEmailNewsletter };