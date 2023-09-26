interface ErrorParserListProps {
  errors: string[];
}

export default function ErrorParserList({ errors }: ErrorParserListProps) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-red-600">Errors:</h2>
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md">
        <ul className="list-disc pl-5 space-y-2 break-words">
          {errors.map((error, index) => (
            <li key={index}>
              {error}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
