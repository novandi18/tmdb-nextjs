import Head from "next/head"
import Layout from "../components/layout/Layout"
import Home from "./page"

export default function Index() {
  return (
    <>
      <Head>
        <title>Home - The Movie Database (TMDB)</title>
        <meta
          name="description"
          content="Homepage of The Movie Database (TMDB)"
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
        <Home />
      </Layout>
    </>
  )
}