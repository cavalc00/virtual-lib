import React, { useEffect, useState } from "react";
import CardBook from "../../components/CardBook/CardBook";
import Livro from "../../models/Livro";
import LivroService from "../../services/LivroService";
import "./style.scss";

function Home() {
  const [livros, setLivros] = useState<Livro[]>([]);

  useEffect(() => {
    refreshLivros();
  }, []);

  function refreshLivros() {
    LivroService.findAll().then((response) => setLivros(response.data));
  }


  return(
    <CardBook livros={livros} errorRequest={false} loading={false}/>
  );
  
}

export default Home;
