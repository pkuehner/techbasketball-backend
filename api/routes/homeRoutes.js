'use strict';
const nodeMailer = require("nodemailer");


const sendMail = (user, callback) => {
    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "passuu96@googlemail.com",
            pass: "Jeverile123!"
        }
    });
    const mailOptions = {
        from: user.name + ' ' + user.mail,
        to: `passuu96@googlemail.com`,
        subject: "Message from Basketball Blog",
        html: user.message + '\n Phone:' + user.phone + user.mail
    };

    transporter.sendMail(mailOptions, callback);
};

const isLoggedIn = (req, res, next) => {
    console.log(req.isAuthenticated())
    if(req.isAuthenticated()){
        return next()
    }
    return res.status(400).json({"statusCode" : 400, "message" : "not authenticated"})
}


module.exports = function (app) {
    const home = require('../controllers/homeController');
    app.route('/')
        .get(home.get);

    app.route('/sendmail').post((req, res) => {
        console.log("request came");
        let user = req.body;
        sendMail(user, (err, info) => {
            if (err) {
                console.log(err);
                res.status(400);
                res.send({error: "Failed to send email"});
            } else {
                console.log("Email has been sent");
                res.send(info);
            }
        });
    });

};




