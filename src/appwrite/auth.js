import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL) // your api endpoint
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method to login directly if user is present
        // console.log("useraccount", userAccount)
        // return this.login({ email, password });
        return userAccount;
        
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const user =  await this.account.createEmailSession(email, password);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite Service :: getCurrentUser :: error", error);
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
     console.log(error)
    }
  }
}

const authService = new AuthService();

export default authService;
