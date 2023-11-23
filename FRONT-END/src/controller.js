import { viewController } from "./view/view.js";
import { Usuario } from "./model/usuario.model.js";
import { resultView } from "./view/table-component.js";
import { usersService } from "./api/users.service.js";

let users = [];
const nullUser = new Usuario(null, null, null, null);
const submitType = { NEW: 0, UPDATE: 1 };
let submitState = submitType.NEW;
let currentId = null;

const loadData = async () => {
  const temp = await usersService.carregarDados();

  users = temp.map(
    (usuario) =>
      new Usuario(usuario.nome, usuario.idade, usuario.login, usuario.senha)
  );
  viewController.update(users, nullUser);
};

const getFromInputs = () => {
  new Usuario(nome.value, idade.value, login.value, senha.value);
}



const handleSubmit = (event) => {
  event.preventDefault();
  const user = getFromInputs();
  if (submitState == submitType.NEW) {
    addUser(user);
  } else if (submitState == submitType.UPDATE) {
    updateUser(currentId, user);
    submitState = submitType.NEW;
    btnSub.innerText = "Save";
  }
  viewController.update(users, nullUser);
};

//ADICIONAR NOVO USUARIO
const addUser = (newUser) => {
  users.push(newUser);
  usersService.salvarDados(users);
};

//ATUALIZAR USUARIO SELECIONADO
const updateUser = (index, userToUpdate) => {
  users[index] = userToUpdate;
  usersService.salvarDados(users);
};

//DELETAR USUÁRIO SELECIONADO
const deletUser = (index) => {
  users.splice(index, 1);
  usersService.salvarDados(users);
};

const handleClick = (event) => {
  currentId = event.target.closest("tr").id.split("")[4];
  if (event.type === "click") {
    alert(
      `Clicou com o botão esquerdo, e o ${users[currentId]
        .getNome()
        .toUpperCase()} será carregado para edição`
    );
    const confirmUpdate = window.confirm(
      "Você realmente deseja atualizar este usuário?"
    );

    if (confirmUpdate) {
      viewController.updateForm(users[currentId]);
      submitState = submitType.UPDATE;
      btnSub.innerText = "Update";
    }
  } else if (event.type == "contextMenu") {
    event.preventDefault();
    alert(
      `Clicou com o botão direito, e o ${users[currentId]
        .getNome()
        .toUpperCase()} será deletado`
    );

    const confirmDelet = window.confirm(
      "Você realmente deseja deletar este usuário?"
    );

    if (confirmDelet) {
      deletUser(currentId);
      resultView.update(users);
    }
  }
};


const setEvents = () => {
  const form = document.getElementById("signForm");
  form.addEventListener("submit", handleSubmit);
  const userList = document.getElementById("users-result");
  //ADICIONADO ESCUTADOR PARA CLIQUE ESQUERDO DENTRO DA TABELA DE USUARIOS
  userList.addEventListener("click", handleClick);
  userList.addEventListener("contextmenu", handleClick);
};


const controller = {
  iniciar: () => {
    viewController.build();
    setEvents();
    window.onload = () => {
      loadusers();
    };
  },
};

export { controller };
