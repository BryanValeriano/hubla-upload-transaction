type UserConstructor = {
  userName: string;
  balance: number;
}

export default class User {
  public userName: string;
  public balance: number;


  constructor(User: UserConstructor) {
    this.userName = User.userName;
    this.balance = User.balance;
  }
}

