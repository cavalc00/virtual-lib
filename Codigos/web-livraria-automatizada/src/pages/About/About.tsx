import { Card } from "react-bootstrap";
import "./style.scss";

function About() {
  return <div className="container">
    <Card className="about-page">
      <h2>Prazer em conhecê-los!</h2>
      <div>
      <p>
        Uma biblioteca virtual é uma plataforma online que permite o acesso a diversos materiais de leitura, como livros, revistas, jornais, artigos e outros tipos de conteúdo. O objetivo da biblioteca virtual é facilitar o acesso à informação e proporcionar uma experiência de leitura agradável e acessível a todos.
      </p>
      <p>
        Para desenvolver uma biblioteca virtual utilizando Arduino, é necessário ter conhecimento de programação e eletrônica. O Arduino é uma placa microcontroladora que pode ser programada para realizar diversas tarefas, desde acionar motores até coletar e processar dados.
      </p>
      <p>
        Uma possível aplicação do Arduino em uma biblioteca virtual seria a criação de um sistema de controle de empréstimo de livros. Utilizando sensores de RFID, é possível identificar cada livro e controlar o seu empréstimo. O sistema seria composto por uma placa Arduino, um leitor de RFID, uma tela LCD para exibir as informações do livro e um módulo Wi-Fi para se conectar à internet.
      </p>

      <p>
        Para utilizar o sistema, o usuário deverá aproximar o livro do leitor de RFID, que irá reconhecer o código do livro e enviar essa informação para a placa Arduino. A placa irá então verificar se o livro está disponível para empréstimo e exibirá a informação na tela LCD. Se o livro estiver disponível, o usuário poderá efetuar o empréstimo. Caso contrário, o sistema irá informar que o livro já está emprestado.
      </p>

      <p>
        Além do controle de empréstimo, o Arduino também pode ser utilizado para outras funcionalidades na biblioteca virtual, como o acionamento de dispositivos de iluminação, a criação de jogos interativos para crianças, a exibição de informações sobre os livros e autores, entre outras possibilidades.
      </p>

      <p>
        Em resumo, a utilização do Arduino em uma biblioteca virtual pode trazer diversas vantagens, como a automatização de processos, a melhoria da experiência do usuário e a implementação de novas funcionalidades. Porém, é importante destacar que a implementação desse tipo de sistema requer conhecimentos técnicos e um cuidadoso planejamento, para garantir a sua eficiência e segurança.
      </p>
      </div>
    </Card>
  </div>
}

export default About;
