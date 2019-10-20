const fs = require("fs");
const path = require("path");

const { createFilePath } = require(`gatsby-source-filesystem`);
const layoutMapper = require('./utils/layout-mapper');

exports.createPages = ({ graphql, actions }, options) => {
  const { createPage } = actions;

  return graphql(
    `
      {
        docsRemark: allSitePage {
          edges {
            node {
              context {
                frontmatter {
                  menu
                  name
                  order
                  route
                  title
                }
              }
              path
            }
          }
        }
      }
    `
  ).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    // Create docs pages.
    const posts = result.data.docsRemark.edges;
    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node;
      const next = index === 0 ? null : posts[index - 1].node;
      const { node } = post;
      const docPath = node.path;
      const { route } = node.context.frontmatter;
      const _route = route || docPath;
      if (!_route) return;
      // const layoutComponent = layoutMapper[post.node.frontmatter.layout];

      createPage({
        path: _route,
        component: require.resolve('./src/layouts/docs.tsx'),
        context: {
          slug: _route,
          previous,
          next,
        },
      });
    });
  });
};

// exports.onCreateNode = ({ node, actions, getNode }, options) => {
//   const { createNodeField } = actions;

//   if (node.internal.type === "SitePage" && node.context && node.context.id) {
//     const value = createFilePath({ node, getNode });
//     createNodeField({
//       name: `slug`,
//       node,
//       value,
//     });
//   }
// };
