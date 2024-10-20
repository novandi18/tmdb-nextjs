import Head from "next/head";
import Layout from "@/components/layout/Layout";
import ProfilePage from "./page";
import Cookies from 'js-cookie';
import { decrypt } from "@/utils/utils";

export default function Profile() {
  const accountId = Cookies.get('tmdb_account_id') as string;
  const sessionId = Cookies.get('tmdb_session_id') as string;
  const decryptedSessionId = sessionId ? decrypt(sessionId) : '';

  return (
    <>
      <Head>
        <title>Profile - The Movie Database (TMDB)</title>
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
        <ProfilePage accountId={accountId} sessionId={decryptedSessionId} />
      </Layout>
    </>
  )
}