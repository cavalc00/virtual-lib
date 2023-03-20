import { Card } from "react-bootstrap";
import "./style.scss";

function About() {
  return <div className="container">
    <Card className="about-page">
      <h2>Prazer em conhecê-los!</h2>
      <div>
        <p>
          Somos um grupo formado de 4 pessoas com o intuito de trazer a iteração de uma biblioteca virtual atrelada ao arduíno.
        </p>
        <p>
          Formados por: 
        </p>
        <p>
          A necessidade de aprimorar as bibliotecas no âmbito tecnológico torna-se vital, a partir do momento em que elas são um patrimônio importantíssimo para a cultura e desenvolvimento humano.
        </p>
        <p>
          A população necessita de uma ótima infraestrutura para este tipo de patrimônio cultural, devido a importância que ele tem para uma sociedade que está sempre em busca de informações literárias, além de outros que utilizam a biblioteca como lazer e local de estudos.
        </p>
      </div>
    </Card>
  </div>
}

export default About;
