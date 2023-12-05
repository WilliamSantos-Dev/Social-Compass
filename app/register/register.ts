import { validations } from "./validations";
import api from "../util/api";
import { NewUser } from "../util/models";

export default async function registerUser(formData: NewUser) {
  if (validations.Form(formData)) {
    const Newuser = await api.register(formData);
    console.log("Register: Sucess");

    return true;
  } else {
    console.log("Ocorreu um erro ao registrar usuário.");
    console.log("User: ", formData);
    return false;
  }
}
