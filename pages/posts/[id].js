import Head from "next/head"
import Date from "../../components/date"
import Layout from "../../components/layout"
import { getAllPostIds, getPostData } from "../../lib/posts"
import utilStyles from "../../styles/utils.module.css"

export default function Post({ postData }) {
  const { title, id, date, contentHtml } = postData
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={date} />
        </div>
        <br />
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { id } = params
  const postData = await getPostData(id)
  return {
    props: {
      postData,
    },
  }
}
