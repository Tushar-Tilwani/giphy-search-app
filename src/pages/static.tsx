import styles from "@/styles/Home.module.css";
import Head from "next/head";
import { giphySearch } from "../api/gighy";

const TITLE = "Giphy Search App";

const Home = (props: any) => {
  const { giphys } = props;
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta
          name="description"
          content={`Generated by create next app. ${TITLE}`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <main className={styles.main}>
        <header>
          <h1>{TITLE}</h1>
        </header>

        <section className={styles.container}>
          <div className={styles.giphyGrid}>
            {giphys.map((each: any, index: number) => {
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

export async function getStaticProps() {
  const { data: giphys } = await giphySearch("dogs");
  return {
    props: {
      giphys,
    },
    revalidate: 10,
  };
}

export default Home;
