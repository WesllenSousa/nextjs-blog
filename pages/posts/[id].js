
import Head from 'next/head';
import { useRouter } from 'next/router'

import Layout from '../../components/layouts';
import { getAllPostIds, getPostData } from '../../lib/read_posts';
import Date from '../../lib/date';

import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }) {
    const router = useRouter()

    return (
      <Layout home={false}>
        <Head>
            <title>{postData.title}</title>
        </Head>

        <p>Post: {router.query.id}</p>

        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <br />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </Layout>
    );
  }

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}
