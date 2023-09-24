/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Card } from "react-bootstrap";
import "./style.scss";

function About() {
  return <div className="container">
    <Card className="about-page">
      <h2>Sobre Nossa Biblioteca Virtual de Arduino</h2>
      <div className="about-content">
        <p>
        Nossa solução, desenvolvida no contexto do TCC, utiliza a plataforma Arduino para criar um sistema inovador de gerenciamento de biblioteca. Ao invés de simplesmente manter registros online ou usar sistemas tradicionais, nós integramos a tecnologia Arduino para proporcionar uma experiência mais dinâmica e informativa aos usuários da biblioteca.
        </p>
        <p>
          Você pode acessar nossa biblioteca clicando no link abaixo. Esperamos que nossa contribuição ajude a impulsionar ainda mais a comunidade de Arduino, oferecendo um recurso valioso para todos.
        </p>
        <div className="image-div">
          <p>Link do Projeto:</p>
          <a href="https://github.com/cavalc00/virtual-lib" target="blank">
            <img className="img-github"></img>
          </a>
        </div>
      </div>
    </Card>
  </div>
}

export default About;