type UserConstructor = {
  userName: string;
  balance: number;
}

export default class User {
  public userName: string;
  public balance: number;


  constructor(user: UserConstructor) {
    this.userName = user.userName;
    this.balance = user.balance;
  }
}

