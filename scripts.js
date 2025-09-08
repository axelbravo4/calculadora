document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const historial = document.getElementById("contenedor-operaciones");
    const teclas = document.querySelectorAll(".tecla");

    let operacion = "";

    teclas.forEach(tecla => {
        tecla.addEventListener("click", () => {
            const valor = tecla.dataset.key;

            if (valor === "=") {
                try {
                    // Reemplazos para que eval() entienda
                    let expr = operacion.replace(/X/g, "*").replace(/,/g, ".");
                    let resultado = eval(expr);

                    display.value = resultado;

                    // Guardar en historial
                    const item = document.createElement("div");
                    item.textContent = `${operacion} = ${resultado}`;
                    historial.appendChild(item);

                    // Reiniciar operación con el resultado
                    operacion = resultado.toString();

                } catch (e) {
                    display.value = "Error";
                    operacion = "";
                }
            } else if (valor === "C") {
                // Limpiar display y operación
                operacion = "";
                display.value = "";
            } else {
                operacion += valor;
                display.value = operacion;
            }
        });
    });
});