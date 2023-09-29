import TransactionList from "../components/TransactionList";

async function getData() {
  const res = await fetch(process.env.NEXT_PUBLIC_URL + '/api/transactions', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: "no-store"
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Transactions() {
  console.log("------------------------------------");
  console.log(process.env.NEXT_PUBLIC_URL);
  const data = await getData();
  const transactions = data.transactions;
  return <TransactionList transactions={transactions} />
}
