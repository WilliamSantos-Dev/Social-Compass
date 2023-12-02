export type NewUser = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassowrd: string;
  birthdate: string;
}

export type Author ={
  image: string;
  name: string;
  id: string;
};

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  birthdate: string;
  image: string;
  sex: string;
  address: string;
  phone: string;
  occupation: string;
  reatedAt: string;
  posts: Post[];
}

export type InputProps ={
  type: string;
  placeholder: string;
  isRequired?: boolean;
  icon: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: any;
  isValid: boolean | string;
}

export type Post = {
  id: string;
  text: string;
  location: string;
  likes: number;
  image: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: Author
  comments: Comment[];
};

export type Comment = {
  id: string;
  content: string;
  authorId: string;
  postId: string;
  createdAt: string;
  updatedAt: string;
  
}

