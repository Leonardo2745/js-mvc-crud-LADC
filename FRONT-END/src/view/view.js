import { tableComponent } from "./form-component.js";
import { formComponent } from "./table-component.js";

const view = {
    build:()=>{
        tableComponent.build();
        formComponent.build();
    },

    update:(userArray, userToUpdate)=>{        
        formComponent.update(userArray);
        tableComponent.update(userToUpdate);
    },

    updateForm:(userToUpdate) => {
        formNewUser.update(userToUpdate);
        
    }
}

export {view}