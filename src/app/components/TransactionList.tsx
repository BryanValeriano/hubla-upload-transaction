import Transaction from "@/server/entities/Transaction";

interface TransactionProps {
  transactions: Omit<Transaction, "id">[]; // Substitua por seu tipo de transação real
}

export default function TransactionList({ transactions }: TransactionProps) {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">Transações:</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            {transaction.type}
            {transaction.date}
            {transaction.productDescription}
            {transaction.value}
            {transaction.transactionOwnerName}
          </li>
        ))}
      </ul>
    </div>
  );
}
