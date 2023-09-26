import { Buffer } from 'buffer';
import Transaction from '../entities/Transaction';

type Output = Omit<Transaction, "id">

export default class Base64toTransactionParser {
  private parseLine(linha: string): Output {
    return {
      type: parseInt(linha.substring(0, 1)),
      date: linha.substring(1, 26),
      productDescription: linha.substring(26, 56).trim(),
      value: parseInt(linha.substring(56, 66).trim()),
      transactionOwnerName: linha.substring(66, 86).trim(),
    };
  }

  private parseContent(conteudo: string): Output[] {
    const linhas = conteudo.split('\n').filter(Boolean); // remove linhas vazias
    return linhas.map(this.parseLine);
  }

  public parse(base64File: string) {
    const decodedContent = Buffer.from(base64File, 'base64').toString('utf-8');
    const transactions = this.parseContent(decodedContent);
    console.log(transactions);
  }
}


