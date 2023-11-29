export interface FormData {
  name: string;
  username: string;
  nascimento: Date | null;
  email: string;
  senha: string;
  confirmesenha: string;
}

export const validPassword = (formData: FormData) => {
  if (formData.senha !== "" && formData.confirmesenha !== "") {
    if (formData.senha.length < 6)
      return "A senha deve ter pelo menos 6 caracteres";
    if (formData.senha.length > 50)
      return "A senha não pode conter mais de 50 caracteres";
    if (formData.confirmesenha !== formData.senha)
      return "As senhas não correspondem!";
    if (formData.confirmesenha === formData.senha) return true;
  }
  return "default";
};

export const validEmail = (formData: FormData) => {
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

export const validName = (formData: FormData) => {
  if (formData.name.length < 255) return true;
  if(formData.name.length > 255) {
    return "O nome não pode ter mais de 255 caracteres";
  }else{
    return "default"
  }
};

export const validUsername = (formData: FormData) => {
  if (formData.username.length >= 255)
    return "O username não pode ter mais de 255 caracteres";
  if (formData.username.length < 255) return true;
  return "default";
};

export const validDate = (formData: FormData) => {
  const dateToday = new Date();
  if (formData.nascimento != null) {
    return true;
  } else {
    return "default";
  }
};

export const validForm = (formData: FormData) => {
  if (
    validEmail(formData) === true &&
    validDate(formData) === true &&
    validName(formData) === true &&
    validPassword(formData) === true &&
    validUsername(formData) === true
  ) {
    return true;
  } else {
    return false;
  }
};
