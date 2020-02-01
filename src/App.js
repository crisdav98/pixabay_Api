import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import ListadoImagenes from "./components/ListadoImagenes";

function App() {
  // State del App
  const [termino, guardarTermino] = useState("");
  const [listaImagenes, guardarListaImagenes] = useState([]);
  const [paginaActual, guardarpaginaActual] = useState(1);
  const [totalPaginas, guardartotalPaginas] = useState(1);

  // Consulta a la API
  useEffect(() => {
    // Método para cpnsultar la API
    const consultarApi = async () => {
      // Evitar que se ejecute la primera vez
      if (termino === "") return;
      const imagenerPorPagina = 30;
      const key = "15103300-a3832cae14f6a2296e75068f4";
      const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${imagenerPorPagina}&page=${paginaActual}`;

      // Consultar la api
      const resultado = await fetch(url);
      const imagenes = await resultado.json();
      guardarListaImagenes(imagenes.hits);

      // calcular el total del paginas
      const calcularTotalPaginas = Math.ceil(
        imagenes.totalHits / imagenerPorPagina
      );
      guardartotalPaginas(calcularTotalPaginas);
      // mover la pantalla hacia arriba
      const jumbotron = document.querySelector(".jumbotron");
      jumbotron.scrollIntoView({ behavior: 'smooth' });
    };
    consultarApi();
  }, [termino, paginaActual]);

  // Definir la página anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1;
    if (nuevaPaginaActual === 0) return;
    guardarpaginaActual(nuevaPaginaActual);
  };
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1;
    if (nuevaPaginaActual > totalPaginas) return;
    guardarpaginaActual(nuevaPaginaActual);
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Formulario guardarTermino={guardarTermino} />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes listaImagenes={listaImagenes} />
        {paginaActual === 1 ? null : (
          <button
            type="button"
            className="bbtn btn-info mr-1"
            onClick={paginaAnterior}
          >
            &laquo;Anterior
          </button>
        )}

        {paginaActual < totalPaginas ? (
          <button
            type="button"
            className="bbtn btn-info"
            onClick={paginaSiguiente}
          >
            Siguiente &raquo;
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default App;
