import * as React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import '../styles/index.scss';
import { StaticQuery, graphql } from "gatsby";
import Post from "../components/post";
import { Link } from "gatsby";
import NameCard from "../components/namecard";

const IndexPage = () => {
  return (
    <Layout pageType='main'>
      <NameCard></NameCard>
      <h5 style={{ paddingLeft: '25px', margin: '30px 0', color: 'rgb(170, 170, 170)' }}>Recently published</h5>
      <StaticQuery query={indexQuery} render={data => {
        return (
          <div>
            {data.allMarkdownRemark.edges.map(({ node }, index) => {
              console.log(node.fields);
              return (
                <Post
                  key={node.id}
                  title={node.frontmatter.title}
                  subtitle={node.frontmatter.subtitle}
                  slug={node.fields.slug}
                  date={node.frontmatter.date}
                  logoImage={node.frontmatter.logoImage}
                  tags={node.frontmatter.tags}>
                </Post>
              )
            })}
          </div>
        );
      }} />
      <div className="common-button-container">
        <Link to={'/tags'} style={{ textDecoration: 'none' }}>
          <div className="common-button">
            <span>See older posts</span>
            <div className="arrow"></div>
          </div>
        </Link>
      </div>
    </Layout>
  );
}

const indexQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 5
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            subtitle
            date(formatString: "MMM Do YYYY")
            tags
            logoImage
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
