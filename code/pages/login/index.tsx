import Layout from "@/components/layout/Layout";
import Head from "next/head";
import LoginPage from "./page";

export default function Login() {
  return (
    <>
      <Head>
        <title>Login - The Movie Database (TMDB)</title>
        <meta
          name="description"
          content="Login to The Movie Database (TMDB)"
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
        <LoginPage />
      </Layout>
    </>
  )
}
