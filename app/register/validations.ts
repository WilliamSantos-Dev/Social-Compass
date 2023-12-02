import { NewUser } from "../util/models";

export class validations{
  static password = (formData: NewUser) => {
    if (formData.password !== "" && formData.confirmPassword !== "") {
      if (formData.password.length < 6)
        return "A senha deve ter pelo menos 6 caracteres";
      if (formData.password.length > 50)
        return "A senha não pode conter mais de 50 caracteres";
      if (formData.confirmPassword !== formData.password)
        return "As senhas não correspondem!";
      if (formData.confirmPassword === formData.password) return true;
    }
    return "default";
  };
  
  static email = (formData: NewUser) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email !== "") {
      if (emailRegex.test(formData.email)) {
        return true;
      } else {
        return "Email Inválido";
      }
    } else {
      return "default";
    }
  };
  
  static fullname = (formData: NewUser) => {
    if (formData.name.length < 255) return true;
    if(formData.name.length > 255) {
      return "O nome não pode ter mais de 255 caracteres";
    }else{
      return "default"
    }
  };
  
  static username = (formData: NewUser) => {
    if (formData.username.length >= 255)
      return "O username não pode ter mais de 255 caracteres";
    if (formData.username.length < 255) return true;
    return "default";
  };
  
  static birthdate = (formData: NewUser) => {
    if (formData.birthdate !== null) {
      return true;
    } else {
      return "default";
    }
  };
  
  static Form = (formData: NewUser) => {
    if (
      this.email(formData) === true &&
      this.birthdate(formData) === true &&
      this.fullname(formData) === true &&
      this.password(formData) === true &&
      this.username(formData) === true
    ) {
      return true;
    } else {
      return false;
    }
  };
  
}

