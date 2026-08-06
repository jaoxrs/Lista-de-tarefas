const input = document.getElementById('tarefaInput');
const addBtn = document.getElementById('adicionarTarefa');
const lista = document.getElementById('listaTarefas');
const spanTotal = document.getElementById('totalCount');
const spanPend = document.getElementById('pendentes');
const spanConc = document.getElementById('concluidas');

let totalCount = 0;
let pendentes = 0;
let concluidas = 0;

const atualizarContadores = () => {
    spanTotal.textContent = totalCount;
    spanPend.textContent = pendentes;
    spanConc.textContent = concluidas;
};

const criarTarefa = (texto) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex align-items-center justify-content-between';

    const content = document.createElement('div');
    content.className = 'd-flex align-items-center';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'me-2';

    const label = document.createElement('span');
    label.textContent = texto;

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.textContent = 'Excluir';
    deleteBtn.className = 'btn-excluir';

    content.appendChild(checkbox);
    content.appendChild(label);
    li.appendChild(content);
    li.appendChild(deleteBtn);

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            concluidas += 1;
            pendentes -= 1;
            li.style.textDecoration = 'line-through';
        } else {
            concluidas -= 1;
            pendentes += 1;
            li.style.textDecoration = '';
        }
        atualizarContadores();
    });

    deleteBtn.addEventListener('click', () => {
        if (checkbox.checked) {
            concluidas -= 1;
        } else {
            pendentes -= 1;
        }
        totalCount -= 1;
        atualizarContadores();
        li.remove();
    });

    return li;
};

const tarefaExiste = (texto) => {
    const tarefas = Array.from(lista.querySelectorAll('li span'))
        .map((span) => span.textContent.trim().toLowerCase());
    return tarefas.includes(texto.toLowerCase());
};

const adicionarTarefa = (texto) => {
    const tarefaItem = criarTarefa(texto);
    lista.appendChild(tarefaItem);
    totalCount += 1;
    pendentes += 1;
    atualizarContadores();
};

addBtn.addEventListener('click', () => {
    const texto = input.value.trim();
    if (!texto) {
        alert('Por favor, digite uma tarefa antes de adicionar.');
        input.focus();
        return;
    }

    if (tarefaExiste(texto)) {
        alert('Essa tarefa já existe na lista. Digite uma tarefa diferente.');
        input.focus();
        return;
    }

    adicionarTarefa(texto);
    input.value = '';
    input.focus();
});

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addBtn.click();
    }
});

atualizarContadores();