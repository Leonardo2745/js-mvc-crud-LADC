class User {
    constructor(name, age, login, password){
     this.name = name;
     this.age = age;
     this.login = login;
     this.password = password;
    } 
    get(){
     return this.name;
    }
    setName(name){
     this.name = name;
    }
    getAge(){
     return this.age;
    }
    setAge(age){
     this.age = age;
    }
    getLogin(){
     return this.login;
    }
    setLogin(login){
     this.login = login;
    }
    getPassword(){
     return this.password;
    }
    setPassword(password){
     this.password = password;
    }
   } 
   export {User}