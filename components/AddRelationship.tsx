import { useState } from "react";
export function AddRelationships({
  handleNewRelation,
}: {
  handleNewRelation(a: string, b: string, c: string, d: string): any;
}) {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [relation, setRelation] = useState("");
  const [relationBA, setRelationBA] = useState<string | null>(null);
  return (
    <div className="mt-[100px] w-full">
      <div className="w-[95%] max-w-[600px] mx-auto">
        <div className="text-xl font-bold">Add Relationships</div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setName1("");
            setName2("");
            setRelation("");
            setRelationBA(null);
            handleNewRelation(name1, name2, relation, relationBA ?? relation);
          }}
        >
          <fieldset className="border-2 border-black rounded">
            <legend className="ml-[.5rem]">Name 1</legend>
            <input
              id="name"
              value={name1}
              onInput={(e) => setName1(e.currentTarget.value)}
              className="outline-none px-[.5rem] py-[2px] w-full"
            />
            <label className="hidden " htmlFor="name">
              Name
            </label>
          </fieldset>
          <fieldset className="border-2 border-black rounded">
            <legend className="ml-[.5rem]">Name 2</legend>
            <input
              id="name"
              value={name2}
              onInput={(e) => setName2(e.currentTarget.value)}
              className="outline-none px-[.5rem] py-[2px] w-full"
            />
            <label className="hidden " htmlFor="name">
              Name
            </label>
          </fieldset>
          <fieldset className="border-2 border-black rounded">
            <legend className="ml-[.5rem]">
              Relation of {name1 || "Person 1"} to {name2 || "Person 2"}
            </legend>
            <input
              id="relation"
              value={relation}
              onInput={(e) => setRelation(e.currentTarget.value)}
              className="outline-none px-[.5rem] py-[2px] w-full"
            />
            <label className="hidden " htmlFor="relation">
              Relation
            </label>
          </fieldset>
          <fieldset className="border-2 border-black rounded">
            <legend className="ml-[.5rem]">
              Relation of {name2 || "Person 2"} to {name1 || "Person 1"}
            </legend>
            <input
              id="relation-ba"
              value={relationBA ?? relation}
              onInput={(e) => setRelationBA(e.currentTarget.value)}
              className="outline-none px-[.5rem] py-[2px] w-full"
            />
            <label className="hidden " htmlFor="relation-ba">
              Relation
            </label>
          </fieldset>
          <button className="my-2"> Submit</button>
        </form>
      </div>
    </div>
  );
}
