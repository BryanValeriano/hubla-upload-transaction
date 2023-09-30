import Transaction from "@/server/entities/Transaction";

interface TransactionProps {
  transactions: Omit<Transaction, "id">[];
}

export default function TransactionList({ transactions }: TransactionProps) {
  return (
    <div className="max-w-xs mx-auto mt-4" >
      <h2 className="text-2xl font-semibold mb-4">Transactions:</h2>
      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <div key={index} className="p-4 border rounded shadow-sm">
            <div className="border-b border-gray-200 pb-2 mb-2">
              <span className="text-gray-500">Type:</span>
              <span className="font-medium ml-2">{transaction.type}</span>
            </div>
            <div className="border-b border-gray-200 pb-2 mb-2">
              <span className="text-gray-500">Date:</span>
              <span className="font-medium ml-2">{transaction.date}</span>
            </div>
            <div className="border-b border-gray-200 pb-2 mb-2">
              <span className="text-gray-500">Product:</span>
              <span className="font-medium ml-2">{transaction.productDescription}</span>
            </div>
            <div className="border-b border-gray-200 pb-2 mb-2">
              <span className="text-gray-500">Value:</span>
              <span className="font-medium ml-2">{transaction.value}</span>
            </div>
            <div className="pb-2">
              <span className="text-gray-500">Seller Name:</span>
              <span className="font-medium ml-2">{transaction.transactionOwnerName}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
