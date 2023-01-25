import { giphySearch } from "@/api/gighy";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import { ChangeEvent, useCallback, useReducer, useState } from "react";

const TITLE = "Giphy Search App";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOADED":
      const { data: giphys } = action;
      return {
        ...state,
        giphys,
        loading: false,
      };
    case "LOADING":
      return {
        loading: true,
      };
    default:
      return state;
  }
};

const Giphy = (props: any) => {
  const [state, dispatch] = useReducer(reducer, props);
  const router = useRouter();
  const [searchStr, setSearchStr] = useState(router.query.giphyTerm as string);
  const { giphys, loading = false } = state;

  const handleClick = useCallback(async (searchStr: string) => {
    dispatch({ type: "LOADING" });
    const { data } = await giphySearch(searchStr);
    dispatch({ type: "LOADED", data });
    router.query.giphyTerm = searchStr;
    router.push(router);
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchStr(e.target.value);
    },
    [setSearchStr]
  );

  return (
    <>
      <Head>
        <title>Search results for: {router.query.giphyTerm}</title>
        <meta
          name="description"
          content="Love giphys? We do too. Use our advanced giphy search to find the perfect giphy for any occasion"
        ></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <main className={styles.main}>
        <header>
          <h1>{TITLE}</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleClick(searchStr);
            }}
          >
            <input
              className={styles.input}
              value={searchStr}
              onChange={handleChange}
              type="text"
            />
            <button
              className={styles.searchBtn}
              onClick={() => handleClick(searchStr)}
            >
              Search
            </button>
          </form>
        </header>
        <section>
          <a href="/giphy/lions">Click Here for Lions</a>
        </section>

        <section className={styles.container}>
          {loading && <span>Loading...</span>}
          <div className={styles.giphyGrid}>
            {giphys?.map((each: any, index: number) => {
              return (
                <div key={index}>
                  <h3>{each.title}</h3>
                  <img src={each.images.original.url} alt={each.title} />
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
};

export async function getServerSideProps(context: NextRouter) {
  const searchTerm = context.query.giphyTerm as string;
  const { data: giphys } = await giphySearch(searchTerm);
  return {
    props: {
      giphys,
    },
  };
}

export default Giphy;
