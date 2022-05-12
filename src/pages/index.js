import { useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';

import { useAuth } from '../hooks/useAuth';
import { getAllPosts, createPost } from '../lib/posts';

import Bio from '../components/Bio';
import Post from '../components/Post';
import PostForm from '../components/PostForm';

export default function Home({ posts: defaultPosts }) {
  const [posts, updatePosts] = useState(defaultPosts);

  const postsSorted = posts.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  const { user, logIn, logOut } = useAuth();

  async function handleOnSubmit(data, e) {
    e.preventDefault();
    console.log('data', data);
    await createPost(data);

    const posts = await getAllPosts();
    updatePosts(posts);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {!user && (
        <p>
          <button onClick={logIn}>Log In</button>
        </p>
      )}

      {user && (
        <p>
          <button onClick={logOut}>Log Out</button>
        </p>
      )}
      <main className={styles.main}>
        <Bio
          headshot='https://res.cloudinary.com/hackit-africa/image/upload/c_thumb,w_200,g_face/v1580219806/me.jpg'
          name='Eugene Musebe'
          tagline='Community Builder!'
          role='Developer Advocate @ Cloudinary'
        />

        <ul className={styles.posts}>
          {postsSorted.map((post) => {
            const { content, id, date } = post;
            return (
              <li key={id}>
                <Post
                  content={content}
                  date={new Intl.DateTimeFormat('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                  }).format(new Date(date))}
                />
              </li>
            );
          })}
        </ul>
        {user && <PostForm onSubmit={handleOnSubmit} />}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  // const posts = await getAllPosts();

  return {
    props: {
      posts : []
    },
  };
}
