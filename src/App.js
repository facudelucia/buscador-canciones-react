import React,{Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario'
import Cancion from './components/Cancion'
import Info from './components/Info'
import axios from "axios"
function App() {
  const [lyrics, setLyrics] = useState({})
  const [letra, setLetra] = useState("")
  const [info, setInfo] = useState({})
  const {artista, cancion} = lyrics
  useEffect(() => {
    if(Object.keys(lyrics) === 0) return;
    
    const apiLetra = async() => {
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`
      const [letra, informacion] = await Promise.all([
        axios(url),
        axios(url2)
      ])
      setLetra(letra.data.lyrics)
      setInfo(informacion.data.artists[0])
    }
    apiLetra()
  }, [lyrics])
  return (
      <Fragment>
        <Formulario 
          setLyrics={setLyrics}
        />
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-6">
              <Cancion 
                letra={letra}
                cancion={cancion}
              />
            </div>
            <div className="col-sm-6">
              <Info 
                info={info}
              />
            </div>
          </div>
        </div>
      </Fragment>
  );
}

export default App;
