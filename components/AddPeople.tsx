import { useState } from "react";
export function AddPeople({
  handleNewPerson,
}: {
  handleNewPerson(e: string): any;
}) {
  const [value, setValue] = useState("");
  return (
    <div className="mt-[100px] w-full">
      <div className="w-[95%] max-w-[600px] mx-auto">
        <div className="text-xl font-bold">Add People</div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setValue("");
            handleNewPerson(value);
          }}
        >
          <fieldset className="border-2 border-black rounded">
            <legend className="ml-[.5rem]">Name</legend>
            <input
              id="name"
              value={value}
              onInput={(e) => setValue(e.currentTarget.value)}
              className="outline-none px-[.5rem] py-[2px] w-full"
            />
            <label className="hidden " htmlFor="name">
              Name
            </label>
          </fieldset>
          <button className="mt-2"> Submit</button>
        </form>
      </div>
    </div>
  );
}
