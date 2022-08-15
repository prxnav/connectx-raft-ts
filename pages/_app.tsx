import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  PeopleContext,
  usePeopleContextProvider,
} from "../util/fetch-all-people";
function MyApp({ Component, pageProps }: AppProps) {
  const { fetchAllPeople, people, setPeople } = usePeopleContextProvider();
  return (
    <PeopleContext.Provider value={{ people, setPeople }}>
      <Component {...pageProps} />
    </PeopleContext.Provider>
  );
}

export default MyApp;
