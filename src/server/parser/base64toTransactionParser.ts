import { Buffer } from 'buffer';
import Transaction from '../entities/Transaction';

type Output = Omit<Transaction, "id">

export default class Base64toTransactionParser {

  private parseLine(line: string, index: number, errors: string[]): Output | null {
    if (line.length > 86) {
      const errorMsg = `Line ${index}: Invalid line length ${line.length}. Each line must have a maximum of 86 characters long. - ${line}`;
      errors.push(errorMsg);
      return null;
    }

    const type = parseInt(line.substring(0, 1));
    if (!(type >= 1 && type <= 4)) {
      const errorMsg = `Lin2 ${index}: Invalid transaction type. Each transaction must be a number between 1 and 4. - ${line}`;
      errors.push(errorMsg);
      return null;
    }

    const date = line.substring(1, 26);
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}-\d{2}:\d{2}$/.test(date)) {
      const errorMsg = `Line ${index}: Invalid date format. - ${line}`;
      errors.push(errorMsg);
      return null;
    }

    const productDescription = line.substring(26, 56).trim();
    if (!productDescription) {
      const errorMsg = `Line ${index}: Invalid product description. - ${line}`;
      errors.push(errorMsg);
      return null;
    }

    const valueString = line.substring(56, 66).trim();
    const value = parseInt(valueString);
    if (!/^\d+$/.test(valueString)) {
      const errorMsg = `Line ${index}: Invalid transaction value. - ${line}`;
      errors.push(errorMsg);
      return null;
    }

    const transactionOwnerName = line.substring(66, 86).trim();
    if (!transactionOwnerName) {
      const errorMsg = `Line ${index}: Invalid transaction ownder name. - ${line}`;
      errors.push(errorMsg);
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

  private parseContent(conteudo: string, errors: string[]): Output[] {
    const lines = conteudo.split('\n').filter(Boolean); // remove empty lines
    return lines.map((line, index) => this.parseLine(line, index, errors)).filter(Boolean) as Output[];
  }

  public parse(base64File: string): { transactions: Output[], errors: string[] } {
    try {
      const errors: string[] = [];
      const decodedContent = Buffer.from(base64File, 'base64').toString('utf-8');
      const transactions = this.parseContent(decodedContent, errors);
      return { transactions, errors };
    } catch (err) {
      console.log('Error parsing the file: ', err);
      return { transactions: [], errors: ['Error decoding the file'] };
    }
  }
}

