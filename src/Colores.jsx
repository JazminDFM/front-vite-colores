import { useState, useEffect } from 'react'
import Formulario from "./Formulario"
import Item from "./Item"

function Colores(){
    
    let [colores, setColores] = useState([])
    
    useEffect(() => {
        fetch("https://api-colores-mongodb-myxj.onrender.com/colores")
        .then(respuesta => respuesta.json())
        .then(colores => setColores(colores)) 
        //Coge estos colores que te estan llegando y modifica las variables de estado
    }, [])

    function crearColor(color){
        setColores([...colores, color]); //Un array con todos los colores que ya habia, y al final el nuevo
    }


    function borrarColor(id){
        setColores(colores.filter( color => color.id != id))
    }

    return (
        <>
            <Formulario crearColor = { crearColor }/> 
            <ul>
                { colores.map( ({id,r,g,b}) => <Item key={id} id={id} r={r} g={g} b={b} borrarColor = {borrarColor} />) }
                
            </ul>
        </>
    )
}

export default Colores