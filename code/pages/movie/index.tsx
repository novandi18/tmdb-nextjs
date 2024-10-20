import Head from "next/head"
import Layout from "../../components/layout/Layout"
import MoviePage from "./page"

export default function Movie() {
  return (
    <>
      <Head>
        <title>Popular Movies - The Movie Database (TMDB)</title>
        <meta
          name="description"
          content="Popular movies of The Movie Database (TMDB)"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <Layout>
        <MoviePage />
      </Layout>
    </>
  )
}