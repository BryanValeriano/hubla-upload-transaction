interface ErrorParserListProps {
  errors: string[];
}
export default function ErrorParserList({ errors }: ErrorParserListProps) {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold text-red-500">Erros:</h2>
      <ul>
        {errors.map((error, index) => (
          <li key={index} className="text-red-500">
            {error}
          </li>
        ))}
      </ul>
    </div>
  );
}
