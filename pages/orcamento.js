import React, { useState } from 'react';

import Head from 'next/head';

import {
    Container,
    Jumbotron,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Alert
} from 'reactstrap';

import Menu from '../components/Menu';
import Rodape from '../components/Rodape';


function Orcamento() {
    const [orcamento, setOrcamento] = useState({
        name: '',
        email: '',
        phone: '',
        whatsApp: '',
        projeto: '',
    });

    const [response, setResponse] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const onChangeInput =  (e) => {
        setOrcamento({...orcamento, [e.target.name]: e.target.value });
    }

    const sendOrcamento = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3333/orcamento`, {
                method: 'POST',
                body: JSON.stringify(orcamento),
                headers: { 'Content-Type' : 'application/json'}
            });

            const responseEnv = await res.json();

            if(responseEnv.error) {
                setResponse({
                    type: 'error',
                    message: responseEnv.message
                });
            }else {
                setResponse({
                    type: 'success',
                    message: responseEnv.message
                });
            }

        } catch (err) {
            setResponse({
                type: 'error',
                message: "Erro: Orçamento não enviado com sucesso!"
            });
        }

    }

    return (
        <div>
            <Head>
                <title>Orçamento - Celke</title>
                <meta name="description" content="Solicitar orçamento" />
            </Head>
            <Menu />
                <style>
                {`
                    .descr-top {
                        background-color: #050c3d;
                        color: #00a1fc;
                        padding-top: 40px;
                        padding-bottom: 40px;
                        margin-bottom: 0rem !important;
                    }
                    .form-orcamento {
                        background-color: #fff;
                        padding-top: 80px;
                        padding-bottom: 80px;
                        margin-bottom: 0rem !important;
                    }
                 `}
                </style>
            <Jumbotron fluid className="descr-top">
                <Container className="text-center">
                    <h1 className="display-4">Orçamento</h1>
                </Container>
            </Jumbotron>

            <Jumbotron fluid className="form-orcamento">
                <Container>

                    {response.type === 'erro' ? <Alert color="danger">{response.message}</Alert> : ""}
                    {response.type === 'success' ? <Alert color="success">{response.message}</Alert> : ""}


                    <Form onSubmit={sendOrcamento}>
                        <FormGroup>
                            <Label for="name">Nome</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Preencha com o nome completo"
                                onChange={onChangeInput}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="email">E-mail</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Preencha com o seu e-mail."
                                onChange={onChangeInput}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="phone">Telefone</Label>
                            <Input
                                type="text"
                                name="phone"
                                id="phone"
                                placeholder="(XX) XXXX-XXXX"
                                onChange={onChangeInput}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="whatsApp">WhatsApp</Label>
                            <Input
                                type="text"
                                name="whatsApp"
                                id="whatsApp"
                                placeholder="(XX) XXXX-XXXXX"
                                onChange={onChangeInput}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="projeto">Projeto</Label>
                            <Input
                                type="textarea"
                                name="projeto"
                                id="projeto"
                                placeholder="Fale um pouco do seu projeto"
                                onChange={onChangeInput}
                            />
                        </FormGroup>

                        <Button type="submit" outline color="primary">Solicitar</Button>
                    </Form>
                </Container>
            </Jumbotron>
            <Rodape />
        </div>
    );
}

export default Orcamento;
