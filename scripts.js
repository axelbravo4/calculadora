document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const contenedorOperaciones = document.getElementById("contenedor-operaciones");
    const teclas = document.querySelectorAll(".tecla");

    let historial = JSON.parse(localStorage.getItem("historial")) || []; // cargar si existe
    let operacion = "";
    let cursorPos = 0; // posición del cursor dentro del display
    
    // Insertar el cursor en la posición actual
    function actualizarDisplay() {
        const antes = operacion.slice(0, cursorPos);
        const despues = operacion.slice(cursorPos);
        display.innerHTML = antes + '<span class="cursor"></span>' + despues;
    }

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
      }

    function calcular() {
        document.getElementById("enter").addEventListener("click", () => {
        try {
            let expresion = operacion.replace(/X/g, "*").replace(/,/g, ".");
            let resultado = eval(expresion);
            display.value = resultado;

            const item = document.createElement("div");
            item.classList.add("historial-item");
            item.textContent = `${operacion} = ${resultado}`;
            historial.appendChild(item);

            guardarOperacion(operacion);
            agregarOperacionAlDOM(operacion);

            operacion = resultado.toString();
            cursorPos = operacion.length;

        } catch {
            display.value = "Error";
            operacion = "";
            cursorPos = 0;
        }
    }
)};;
    

    // Configuración de las teclas de la calculadora
    teclas.forEach(tecla => {
        tecla.addEventListener("click", () => {
            const valor = tecla.dataset.key;

            if (valor === "=") {
                calcular();
            } else if (valor === "C") {
                operacion = "";
                cursorPos = 0;
                actualizarDisplay();
            } else if (valor === "Backspace") {
                if (cursorPos > 0) {
                    operacion =
                        operacion.slice(0, cursorPos - 1) +
                        operacion.slice(cursorPos);
                    cursorPos--;
                }
                actualizarDisplay();
            } else {
                operacion =
                    operacion.slice(0, cursorPos) +
                    valor +
                    operacion.slice(cursorPos);
                cursorPos++;
                actualizarDisplay();
            }
        });
    });

    // Botones para mover el cursor y borrar historial
    document.getElementById("mover-izquierda").addEventListener("click", () => {
        if (cursorPos > 0) cursorPos--;
        actualizarDisplay();
    });

    document.getElementById("mover-derecha").addEventListener("click", () => {
        if (cursorPos < operacion.length) cursorPos++;
        actualizarDisplay();
    });

    document.getElementById("borrar-historial").addEventListener("click", () => {
        historial.innerHTML = "";
    });



    // Configuración del teclado físico
    document.addEventListener("keydown", (e) => {
        if (e.key >= "0" && e.key <= "9") {
            // Números
            operacion =
                operacion.slice(0, cursorPos) +
                e.key +
                operacion.slice(cursorPos);
            cursorPos++;
            actualizarDisplay();
        } else if (["+", "-", "/", "*"].includes(e.key)) {
            // Operadores
            let valor = e.key === "*" ? "X" : e.key;
            operacion =
                operacion.slice(0, cursorPos) +
                valor +
                operacion.slice(cursorPos);
            cursorPos++;
            actualizarDisplay();
        } else if (e.key === "Enter") {
            try{
            let expresion = operacion.replace(/X/g, "*").replace(/,/g, ".");
            let resultado = eval(expresion);
            display.value = resultado;

            const item = document.createElement("div");
            item.classList.add("historial-item");
            item.textContent = `${operacion} = ${resultado}`;
            historial.appendChild(item);

            operacion = resultado.toString();
            cursorPos = operacion.length;

        } catch {
            display.value = "Error";
            operacion = "";
            cursorPos = 0;
        }
        } else if (e.key === "Backspace") {
            if (cursorPos > 0) {
                operacion =
                    operacion.slice(0, cursorPos - 1) +
                    operacion.slice(cursorPos);
                cursorPos--;
                actualizarDisplay();
            }
            e.preventDefault(); // Evitar que se borre el input completo
        } else if (e.key === "ArrowLeft") {
            if (cursorPos > 0) cursorPos--;
            actualizarDisplay();
        } else if (e.key === "ArrowRight") {
            if (cursorPos < operacion.length) cursorPos++;
            actualizarDisplay();
        } else if (e.key === "Delete") {
            if (cursorPos < operacion.length) {
                operacion =
                    operacion.slice(0, cursorPos) +
                    operacion.slice(cursorPos + 1);
            }
            actualizarDisplay();
        } else if (e.key === ",") {
            operacion =
                operacion.slice(0, cursorPos) +
                "," +
                operacion.slice(cursorPos);
            cursorPos++;
            actualizarDisplay();
        }
    });
});
