import React,{useState} from 'react';
import Error from './Error';

const Formulario = ({guardarTermino}) => {
    // State del formulario
    const [tema,guardarTema] = useState('');
    const [error,guardarError] = useState(false)

    // consulta a la api
    const buscarImagenes = e =>{
        e.preventDefault();
        //Validar que este lleno el campo
        if(tema.trim() === ''){
            guardarError(true);
            return

        }
        // Enviar el término de búsqueda al componente principal
        guardarError(false);
        guardarTermino(tema);
    }
    return (
        <form
            onSubmit={buscarImagenes}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Buscador de Imágen, ejemplo: Futbol o café"
                        onChange={e=>guardarTema(e.target.value)}
                    />
                </div>

                <div className="form-group col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                </div>
            </div>
            {error ? <Error mensaje="Agrega un término de Búsqueda"/> : null}
        </form>
    );
};

export default Formulario;