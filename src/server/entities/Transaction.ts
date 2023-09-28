export enum TransactionType {
  ProducerSale = 1,
  AffiliateSale = 2,
  ComissionPaid = 3,
  ComissionReceived = 4,
}

type TransactionConstructor = {
  id: string;
  type: TransactionType;
  date: string;
  productDescription: string;
  value: number;
  transactionOwnerName: string;
}

export default class Transaction {
  public id: string;
  public type: TransactionType;
  public date: string;
  public productDescription: string;
  public value: number;
  public transactionOwnerName: string;

  constructor(transaction: TransactionConstructor) {
    this.id = transaction.id;
    this.type = transaction.type;
    this.date = transaction.date;
    this.productDescription = transaction.productDescription;
    this.value = transaction.value;
    this.transactionOwnerName = transaction.transactionOwnerName;
  }
}

