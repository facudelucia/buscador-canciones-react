import React, {useState} from 'react';
import Error from './Error'

const Formulario = ({setLyrics}) => {
    const [form, setForm] = useState({
        artista: "",
        cancion: ""
    })
    const [error, setError] = useState(false)
    const [notFound, setNotFound] = useState(false)
    const {artista, cancion} = form
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(artista.trim() === "" || cancion.trim() === ""){
            setError(true)
            return;
        }
        setError(false)
        const api = await fetch(`https://api.lyrics.ovh/v1/${artista}/${cancion}`)
        const data = await api.json()
        if(data.error){
            setNotFound(true)
            return;
        }
        setNotFound(false)
        setLyrics(form)

    }
    return ( 
        <div className="bg-info">
            <div className="container">
                {error && <Error mensaje={"Ambos campos son requeridos"}/>}
                {notFound &&<Error mensaje={"Cancion no encontrada"} />}
                <div className="row">
                    
                    <form 
                        className="col card text-white bg-transparent mb-5 pt-5 pt-2"
                        onSubmit={handleSubmit}
                    >
                        <fieldset>
                            <legend className="text-center">
                                Buscador de letras de canciones
                            </legend>
                            <div className="row">
                                <div className="col sm-6">
                                    <div className="form-group">
                                        <label>Artista</label>
                                        <input 
                                            type="text"
                                            className="form-control"
                                            name="artista"
                                            value={artista}
                                            placeholder="Nombre artista"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col sm-6">
                                <div className="form-group">
                                        <label>Canción</label>
                                        <input 
                                            type="text"
                                            className="form-control"
                                            name="cancion"
                                            value={cancion}
                                            placeholder="Nombre canción"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary float-right"
                            >Buscar</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
     );
}
 
export default Formulario;