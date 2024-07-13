
const btnTarea = document.querySelector('#btnTarea');
const inputTarea = document.querySelector('#inputTarea');
const tablaTarea = document.querySelector('tbody');
const spanTotalTareas = document.querySelector('#total');
const spanTareasRealizadas = document.querySelector('#realizadas');
const msgError = document.querySelector('#error');

// se pide tres tareas al iniciar, de lo contrario utilizar const tareas = [];
const tareas = [
    { id: Date.now(), tarea: 'Hacer mercado', estado: false },
    { id: Date.now() + 1, tarea: 'Estudiar para la prueba', estado: true },
    { id: Date.now() + 2, tarea: 'Sacar a pasear a Tobby', estado: false },
];

render = () => {
    let template = '';
    for (let tarea of tareas) {
        template += `
        <tr>
            <td>${tarea.estado ? '<del>' + tarea.id + '</del>' : tarea.id}</td>
            <td>
                ${tarea.estado ? '<del>' + tarea.tarea + '</del>' : tarea.tarea}
            </td>
            <td>
                <label class="checkbox">
                ${tarea.estado ? '<input onchange="cambiarEstado(' + tarea.id + ',false)" type="checkbox" checked />' : '<input onchange="cambiarEstado(' + tarea.id + ',true)" type="checkbox" />'}
                    Completada
                </label>
            </td>
            <td><button class="button is-danger" onclick='eliminar(${tarea.id})'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg></button></li></td>
        </tr>
        `;
    }
    tablaTarea.innerHTML = template;
    cuentaTotal()
}

btnTarea.addEventListener('click', (e) => {
    e.preventDefault();
    let tareaAgregar = inputTarea.value.trim();
            if (tareaAgregar === '' || tareaAgregar === 0) {
                msgError.innerHTML = 'Tienes que ingresar una tarea.';
            } else {
                msgError.innerHTML = '';
                tareas.push({ id: Date.now(), tarea: inputTarea.value, estado: false });
            }
    inputTarea.value = '';
    render();
})

cambiarEstado = (id, estado) => {
    let indice = tareas.findIndex((elemento) => elemento.id === id);
    tareas[indice].estado = estado;
    render();
}

function eliminar(id) {
    let indice = tareas.findIndex((elemento) => elemento.id === id);
    tareas.splice(indice, 1);
    render();
}

cuentaTotal = () => {
    spanTotalTareas.innerHTML = tareas.length;
    spanTareasRealizadas.innerHTML = tareas.filter(elemento => elemento.estado === true).length;
}

render();