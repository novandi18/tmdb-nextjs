import Head from "next/head"
import Layout from "../../../components/layout/Layout"
import { useRouter } from "next/router";
import MovieDetailPage from "./page";
import { useState } from "react";

export default function MovieDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState('');

  return (
    <>
      <Head>
        <title>{title} - The Movie Database (TMDB)</title>
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
        <MovieDetailPage id={Number(id)} setTitle={setTitle} />
      </Layout>
    </>
  )
}