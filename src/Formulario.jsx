import { useState } from "react"

function Formulario({crearColor}){
    let [textoTemporal, setTextoTemporal] = useState(""); //Value del input text
    let [error, setError] = useState(false); //Variable interna que determina si hay o no error
    let [textoError, setTextoError] = useState(""); //Lo que tiene que aparecer en la cajita cuando hay error
    
    //Funcion dentro de otra para validar
    function validar(evento){
        evento.preventDefault()

        setError(false)

        setTextoError("Debes escribir tres números entre 0 y 255 separados por comas");

        if(/^(\d{1,3},){2}\d{1,3}$/.test(textoTemporal)){
        
            let [r,g,b] = textoTemporal.split(",").map(n => Number(n))

            let valido = true; //Si no tiene punto y coma da fallo >:(

            [r,g,b].forEach(n => valido = valido && n <= 255) //Se pone valido = valido para cuando falle y se corte ahi

            if(valido){
                return fetch("https://api-colores-mongodb-myxj.onrender.com/nuevo", {
                    method : "POST",
                    body : JSON.stringify({r,g,b}),
                    headers : {
                        "Content-type" : "application/json"
                    }
                })
                .then(respuesta => respuesta.json())
                .then(({id, error}) => {
                    if(!error){
                        setTextoTemporal("")
                        return crearColor({id,r,g,b})
                    }
                    console.log("..error");
                });
            }
            setTextoError("Números fuera de rango (0-255)")
          }
           setError(true)
        }


    return (
        <form onSubmit={ validar }>
            <input type="text" placeholder="rrr,ggg,bbb" value= {textoTemporal} onChange={ evento => setTextoTemporal(evento.target.value)}/>
            <p className={`error ${ error ? "visible" : ""} `}>{ textoError }</p>
            <input type="submit" value="Crear color" />
        </form>
    )
}

export default Formulario