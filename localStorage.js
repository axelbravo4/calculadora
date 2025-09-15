document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const contenedorOperaciones = document.getElementById("contenedor-operaciones");
    const btnBorrarHistorial = document.getElementById("borrar-historial");
  
    let historial = JSON.parse(localStorage.getItem("historial")) || []; // cargar si existe
  
    // Mostrar historial al iniciar
    historial.forEach(op => agregarOperacionAlDOM(op));
  
    function agregarOperacionAlDOM(operacion) {
      const div = document.createElement("div");
      div.textContent = operacion;
      contenedorOperaciones.appendChild(div);
    }
  
    function guardarOperacion(operacion) {
      historial.push(operacion);
      localStorage.setItem("historial", JSON.stringify(historial));
      agregarOperacionAlDOM(operacion);
    }
  
    // Al calcular
    document.getElementById("enter").addEventListener("click", () => {
      try {
        let expresion = display.textContent.replace(/X/g, "*").replace(/,/g, "."); // Reemplazar "X" por "*" y "," por "." para eval
        let resultado = eval(expresion);
        let operacion = `${display.textContent} = ${resultado}`;
  
        guardarOperacion(operacion);
        display.textContent = resultado;
      } catch (e) {
        alert("Operación inválida");
      }
    });
    
  
    // Borrar historial
    btnBorrarHistorial.addEventListener("click", () => {
      historial = [];
      localStorage.removeItem("historial");
      contenedorOperaciones.innerHTML = "";
    });
  });
  