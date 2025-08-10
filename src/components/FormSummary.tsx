export const Summary = ({ data }: { data: Record<string, unknown> }) => {
  console.log(data, "Summary Data");

  return (
    <div className="space-y-4">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="p-2 border rounded">
          <strong>{key}:</strong>{" "}
          {typeof value === "object" ? JSON.stringify(value) : String(value)}
        </div>
      ))}
    </div>
  );
};
