const Yup = require('yup');
const Contact = require('../Models/Contact');
const axios = require('axios');
const { hapikey } = require('../../config/config');

class ContactController {

    async show(req, res) {
        console.log("Função show acessada");
    }

    async showAll(req, res) {
        console.log("Função ShowAll acessada");
    }

    async update(req, res) {
        console.log("Função update acessada");
    }

    async store(req, res) {

        //Validação de dados com Yup
        const schema = Yup.object().shape({
            name: Yup.string().required().min(3),
            email: Yup.string().email().required(),
            phone: Yup.string().required().min(10)
        });

        if(!(await schema.isValid(req.body))){
            return res.status(402).json({
                error: true,
                message: "Dados inválidos"
            })
        }

        //Recebendo as informações no body
        const { name, email, phone } = req.body;

        //Envia para o Hubspot
        axios({
            method: 'post',
            url: `https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/${email}/?hapikey=${hapikey}`,
            data: {
                "properties": [
                    { "property": "firstname", "value": name },
                    { "property": "email", "value": email },
                    { "property": "mobilephone", "value": phone }
                ]
            }
        })
        .then((response) => {
            console.log("contato cadastrado com sucesso");
        })
        .catch((error) =>{
            console.log("Erro ao cadastrar usuário")
            console.log(error);
        })

        //Construindo constante
        const dados = {
            name,
            email,
            phone
        }

        //Envia para o banco de dados
        const contact = await Contact.create(dados, (err) => {
            if(err) res.status(402).json({
                    error: true,
                    message: "Não foi possível cadastrar o contato"
                })

            return res.status(200).json({
                error: false,
                message: "Contato cadastrado com sucesso",
                contact
            })
        })
        

    }

    async remove(req, res) {
        console.log("Função remove acessado");
    }



}

module.exports = new ContactController();