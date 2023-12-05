import "./models";
import { EditUser, MarketItem, NewComment, NewPostType, NewUser, Post } from "./models";
var userTokenAuth = "";

type User = {
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
};
export class API {
  static instance?: API;
  baseURL = new URL("http://localhost:3001/");

  private constructor() {}

  static getInstance() {
    return this.instance || (this.instance = new API());
  }

  private async get(path: string, token: string) {
    const url = new URL(path, this.baseURL);
    const res = await fetch(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok)
      throw { message: `Could not fetch from ${url}`, status: res.status };
    return res.json();
  }

  private async post(path: string, body: any, token: string) {
    const url = new URL(path, this.baseURL);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok)
      throw { message: `Could not post to ${url}`, status: res.status };
    return res.json();
  }

  private async put(path: string, body: any, token: string) {
    const url = new URL(path, this.baseURL);
    const res = await fetch(url, {
      method: "PUT", 
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
  
    if (!res.ok) {
      throw { message: `Could not put to ${url}`, status: res.status };
    }
    console.log("PUT", res)
    return res.json();
  }

  async authorizeUser(username: string, password: string) {
    const body = {
      username: username,
      password: password,
    };
    const url = new URL("auth/login", this.baseURL);
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) return false;
    return res.json();
  }

  async getUser<User>(id: string, token: string) {
    const user: User = await this.get(`users/${id}`, token);
    return user;
  }

  async getAllUsers(token: string) {
    return await this.get(`users`, token);
  }

  async updateUser(user: EditUser, id: string, token:string){
    return this.put(`users/${id}`, user, token)
  }

  async getMarketItems(token: string) {
    return await this.get(`market`, token);
  }

  async getMarketItemById(id: string, token:string){
    return await this.get(`market/${id}`, token);
  }

  async getPosts(token: string) {
    return (async () =>
      (await this.get(`posts`, token)).map((post: Post) => ({
        ...post,
      })))() as Promise<Post[]>;
  }


  async register(user: NewUser) {
    const token = ""
    return await this.post("auth/register", user, token);
  }

  async createComment(comment: NewComment, token: string){
    return await this.post('comments', comment, token)
  }

  async createPost(post: NewPostType, token: string){
    return await this.post('posts', post, token)
  }

  public getCover() {
    const coverList = [
      "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg",
      "https://images.pexels.com/photos/12727656/pexels-photo-12727656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://cdn.pixabay.com/photo/2016/10/18/21/22/beach-1751455_1280.jpg",
      "https://images.pexels.com/photos/6640217/pexels-photo-6640217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://cdn.pixabay.com/photo/2016/10/21/14/50/plouzane-1758197_1280.jpg",
      "https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://cdn.pixabay.com/photo/2014/07/28/20/39/sunset-404072_1280.jpg",
      "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ];
    return coverList[Math.floor(Math.random() * coverList.length)];
  }
}

export default API.getInstance();
