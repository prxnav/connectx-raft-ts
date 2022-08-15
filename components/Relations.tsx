import { useMemo } from "react";
import { usePeople } from "../util/fetch-all-people";
export function Relations({ from, to }: { from: string; to: string }) {
  const paths = usePaths(from, to);

  if (paths && paths.length > 0) {
    return (
      <ol>
        {paths.map((x) => (
          <ul key={x.join("")}>
            {from} {">"} {x.map((a) => ` (${a[1]} of ) ${a[0]}`).join(" > ")}
          </ul>
        ))}
      </ol>
    );
  }
  return <div>No relations found</div>;
}

function usePaths(from: string, to: string) {
  const { people } = usePeople();

  const paths = useMemo(() => {
    if (!from || !to) return null;
    const res: [string, string][][] = [];
    let begin = from;
    function find(tmp: [string, string][], from: string, to: string) {
      if (from === to) {
        res.push(tmp);
        return;
      }
      const relations = people[from];
      for (const person in relations) {
        if (tmp.find((x) => x[0] === person || x[0] === begin)) continue;
        const t: [string, string][] = tmp.concat([[person, relations[person]]]);
        find(t, person, to);
      }
    }
    find([], begin, to);
    return res;
  }, [Object.keys(people), from, to]);
  return paths;
}
