export interface User{
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassowrd: string;
    birthdate: string;
}

export interface InputProps {
    type: string;
    placeholder: string;
    isRequired?: boolean;
    icon: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: any; 
    isValid: boolean | string;
  }