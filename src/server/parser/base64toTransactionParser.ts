import { Buffer } from 'buffer';
import Transaction from '../entities/Transaction';

type Output = Omit<Transaction, "id">

export default class Base64toTransactionParser {

  private parseLine(line: string, index: number): Output | null {
    if (line.length > 86) {
      console.error(`Line ${index}: Invalid line length ${line.length}. Each line must have a maximum of 86 characters long.`)
      console.error(line);
      return null;
    }

    const type = parseInt(line.substring(0, 1));
    if (!(type >= 1 && type <= 4)) {
      console.error(`Lin2 ${index}: Invalid transaction type. Each transaction must be a number between 1 and 4.`);
      return null;
    }

    const date = line.substring(1, 26);
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}-\d{2}:\d{2}$/.test(date)) {
      console.error(`Line ${index}: Invalid date format.`);
      return null;
    }

    const productDescription = line.substring(26, 56).trim();
    if (!productDescription) {
      console.error(`Line ${index}: Invalid product description.`);
      return null;
    }

    const valueString = line.substring(56, 66).trim();
    const value = parseInt(valueString);
    if (!/^\d+$/.test(valueString)) {
      console.error(`Line ${index}: Invalid transaction value.`);
      return null;
    }

    const transactionOwnerName = line.substring(66, 86).trim();
    if (!transactionOwnerName) {
      console.error(`Line ${index}: Invalid transaction ownder name.`);
      return null;
    }

    return {
      type,
      date,
      productDescription,
      value,
      transactionOwnerName
    };
  }

  private parseContent(conteudo: string): Output[] {
    const lines = conteudo.split('\n').filter(Boolean); // remove empty lines
    return lines.map((line, index) => this.parseLine(line, index)).filter(Boolean) as Output[];
  }

  public parse(base64File: string) {
    try {
      const decodedContent = Buffer.from(base64File, 'base64').toString('utf-8');
      const transactions = this.parseContent(decodedContent);
      console.log(transactions);
    } catch (err) {
      console.error('Error parsing the file: ', err);
    }
  }
}


