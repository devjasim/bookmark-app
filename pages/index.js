import Head from 'next/head'
import BookMarkComponent from '../components/Bookmarks'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Bookmark Manager App</title>
        <meta name="description" content="Bookmark manager app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="main">
        <BookMarkComponent/>
      </div>
    </div>
  )
}
