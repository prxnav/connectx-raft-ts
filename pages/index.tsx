import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { usePeople } from "../util/fetch-all-people";
import { useState, MouseEventHandler } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AddRelationships } from "../components/AddRelationship";
import { AddPeople } from "../components/AddPeople";
import { Relations } from "../components/Relations";
export default function Home() {
  const { people, setPeople } = usePeople();
  function handleNewPerson(person: string) {
    if (!people[person]) {
      setPeople({ ...people, [person]: {} });
    }
  }
  function handleNewRelation(
    person1: string,
    person2: string,
    relation12: string,
    relation21: string
  ) {
    let peopleCopy = JSON.parse(JSON.stringify(people));
    const needsPerson1 = !peopleCopy[person1];
    const needsPerson2 = !peopleCopy[person2];
    if (needsPerson1 || needsPerson2) {
      toast(
        `Creating new person for ${[
          needsPerson1 && JSON.stringify(person1),
          needsPerson2 && JSON.stringify(person2),
        ]
          .filter(Boolean)
          .join(" and ")}`,
        { icon: "ℹ️" }
      );
      if (needsPerson1) {
        peopleCopy[person1] = {};
      }
      if (needsPerson2) {
        peopleCopy[person2] = {};
      }
    }

    peopleCopy[person1][person2] = relation12;
    peopleCopy[person2][person1] = relation21;
    setPeople(peopleCopy);
  }
  const [selected, setSelected] = useState<string[]>([]);
  const handleClick: MouseEventHandler<HTMLButtonElement> =
    function handleClick(e) {
      const name = e.currentTarget.dataset.name!;
      let copy = [...selected];
      if (copy.includes(name)) {
        copy = copy.filter((x) => x !== name);
      } else {
        if (copy.length === 0) {
          copy = [name];
        } else {
          copy = [copy[0], name];
        }
      }
      setSelected(copy);
    };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="mt-5">
          <h1 className="font-roboto text-5xl text-cyan-500 hover:text-cyan-600 cursor-pointer">
            ConnectX
          </h1>
        </div>

        <div>
          {Object.keys(people ?? {}).length > 0 ? (
            <div
              className="mt-5 gap-2"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
              }}
            >
              {Object.keys(people).map((p) => (
                <button
                  onClick={handleClick}
                  key={p}
                  data-name={p}
                  className={`transition rounded-full flex items-center justify-center border-solid 
                border-2 h-24 overflow-hidden p-2 text-center w-24 flex-col ${
                  selected.includes(p) ? "border-blue-400" : ""
                } `}
                >
                  <span className="overflow-hidden p-2 text-center w-24 text-ellipsis">
                    {p}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div>Fetching...</div>
          )}
        </div>
        <div className="mt-6">
          <h1 className="text-xl font-bold">
            {selected.length !== 2
              ? "Relations will show here"
              : `Relation between ${selected[0]} and ${selected[1]}`}
          </h1>
          {selected?.length === 2 && (
            <Relations from={selected[0]} to={selected[1]} />
          )}
        </div>
        <AddPeople handleNewPerson={handleNewPerson} />
        <AddRelationships handleNewRelation={handleNewRelation} />
        <Toaster />
      </div>
    </div>
  );
}
