import { viewController } from "./view/viewController.js";
import { Usuario } from "./model/usuario.model.js";
import { resultView } from "./view/result-view.js";
import { dataService } from "./api/data.service.js";

let data = [];
const submitType = { NEW: 0, UPDATE: 1 };
let submitState = submitType.NEW;
let currentId = null;

const loadData = async () =>{
  const temp = await dataService.carregarDados();
  
  data = temp.map(
    (usuario) =>
    new Usuario(usuario.nome, usuario.idade, usuario.login, usuario.senha)
  );
  viewController.update(data, new Usuario("", null, "", ""));
}



const handleSubmit = (event) => {
  event.preventDefault();
  const user = new Usuario(nome.value, idade.value, login.value, senha.value);
  if (submitState == submitType.NEW) {
    addUser(user);
  } else if (submitState == submitType.UPDATE) {
    updateUser(currentId, user);
    submitState = submitType.NEW;
    btnSub.innerText = "Save";
  }
  viewController.update(data, new Usuario("", null, "", ""));
};

//ADICIONAR NOVO USUARIO
const addUser = (newUser) => {
  data.push(newUser);
  dataService.salvarDados(data);
};
//ATUALIZAR USUARIO SELECIONADO
const updateUser = (index, userToUpdate) => {
  data[index] = userToUpdate;
};
//DELETAR USUÁRIO SELECIONADO
const deletUser = (index) => {
  data.splice(index, 1);
};
//AÇÃO PARA BOTÃO ESQUERDO
const clickEsquerdo = (event) => {
  currentId = event.target.closest("tr").id.split("")[4];
  alert(
    `Clicou com o botão esquerdo, e o ${data[currentId]
      .getNome()
      .toUpperCase()} será carregado para edição`
  );
  const confirmUpdate = window.confirm(

    "Você realmente deseja atualizar este usuário?"
  );

  if(confirmUpdate) {
    viewController.updateForm(data[currentId])
  submitState = submitType.UPDATE;
  btnSub.innerText = "Update";
  }

  

};
//AÇÃO PARA BOTÃO DIREITO
const clickDireito = (event) => {
  event.preventDefault();
  if (event.button == 2) {
    currentId = event.target.closest("tr").id.split("")[4];
    alert(
      `Clicou com o botão direito, e o ${data[currentId]
        .getNome()
        .toUpperCase()} será deletado`
    );
    
    const confirmDelet = window.confirm(

      "Você realmente deseja deletar este usuário?"
    );
  
    if(confirmDelet) {
      deletUser(currentId)
      resultView.update(data)
    }
  
  }

};
const controller = {
  iniciar: () => {
    viewController.build();
    const form = document.getElementById("signForm");
    form.addEventListener("submit", handleSubmit);
    const userList = document.getElementById("users-result");
    //ADICIONADO ESCUTADOR PARA CLIQUE ESQUERDO DENTRO DA TABELA DE USUARIOS
    userList.addEventListener("click", clickEsquerdo);
    userList.addEventListener("contextmenu", clickDireito);
    window.onload = () =>{
      loadData();
    }
  },
};

export { controller };
