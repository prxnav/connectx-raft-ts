import { useState, useEffect, createContext, useContext } from "react";
import { installDefaultData } from "./install-default-data";
interface Relation {
  with: string;
  type: string;
}
type People = Record<string, Record<string, string>>;
installDefaultData();

export function fetchAllPeople(): People {
  return JSON.parse(localStorage.getItem("people_data") || "{}") as any;
}

export function usePeopleContextProvider() {
  const [people, _setPeople] = useState<People>({});
  useEffect(() => {
    _setPeople(fetchAllPeople());
  }, []);
  function setPeople(p: any) {
    localStorage.setItem("people_data", JSON.stringify(p));
    _setPeople(p);
  }

  return { people, fetchAllPeople, setPeople };
}
export const PeopleContext = createContext<{
  people: People;
  setPeople: Function;
}>({ people: {}, setPeople() {} });

export function usePeople() {
  return useContext(PeopleContext);
}
