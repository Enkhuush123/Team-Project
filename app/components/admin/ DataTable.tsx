export function DataTable({
  columns,
  rows,
}: {
  columns: { key: string; title: string; className?: string }[];
  rows: React.ReactNode[];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-white/5">
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={[
                    "px-4 py-3 text-xs font-semibold text-white/70 border-b border-white/10",
                    c.className || "",
                  ].join(" ")}
                >
                  {c.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-10 text-center text-white/55 text-sm"
                >
                  No data
                </td>
              </tr>
            ) : (
              rows.map((r, idx) => (
                <tr key={idx} className="border-b border-white/10 last:border-b-0">
                  {r}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
