import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import styled, { css } from 'styled-components';

const QUERY = graphql`
  query Sidebar {
    allSitePage: allMdx {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            menu
            name
            order
            route
            title
          }
        }
      }
    }

    site {
      siteMetadata {
        menu
      }
    }
  }
`;

const createOrFindGroup = (name, groups) => {
  let group = groups.find((group) => group.name === name);
  if (!group) {
    group = { name, pages: [] };
    groups.push(group);
  }
  return group;
};

const sortByOrder = (a, b) => {
  const diff = (a.frontmatter.order || 0) - (b.frontmatter.order || 0);
  return diff === 0 ? 0 : diff > 0 ? 1 : -1;
};

const pagesToNavGroups = (pages) => pages.reduce((groups, page) => {
  if (!page.frontmatter.menu) {
    return groups;
  }
  const group = createOrFindGroup(page.frontmatter.menu, groups);
  group.pages.push(page);
  group.pages.sort(sortByOrder);
  return groups;
}, []);

const Nav = styled.nav`
  padding: 0 20;
`;

const NavGroup = styled.div`
  margin-bottom: 20;
`;

const NavGroupTitle = styled.h3`
  font-size: 17;
  font-weight: 500;
`;

const NavGroupMenu = styled.ul`
  margin: 0;
  padding: 0;
`;

const NavGroupMenuItem = styled.li`
  list-style-type: none;
  margin: 2 0;
  padding: 0;

  a {
    color: nav-link;
    display: block;
    transition: base;
    transition-property: color;
    padding-left: 10;
    border-left: 3;
    border-color: transparent;

    &:hover {
      color: nav-link-hover;
    }

    &.active {
      font-weight: 600;
      border-left: 3;
      border-color: primary;
    }
  }
`;

const sortGroupsWithConfig = (menu) => (a, b) => {
  const indexA = menu.indexOf(a.name);
  const indexB = menu.indexOf(b.name);
  const diff = indexA - indexB;
  return diff === 0 ? 0 : diff < 0 ? -1 : 1;
};

export function Sidebar() {
  return (
    <StaticQuery
      query={QUERY}
      render={(data) => {
        const navGroups = pagesToNavGroups(
          data.allSitePage.edges
            .map((edge) => edge.node)
            .filter((node) => node.frontmatter),
        );

        navGroups.sort(sortGroupsWithConfig(data.site.siteMetadata.menu));

        return (
          <Nav>
            {navGroups.map((navGroup) => {
              return (
                <NavGroup key={navGroup.name}>
                  <NavGroupTitle>{navGroup.name}</NavGroupTitle>
                  <NavGroupMenu>
                    {navGroup.pages.map((page) => {
                      const path = page.frontmatter.route || page.field.slug;
                      return (
                        <NavGroupMenuItem key={page.id}>
                          <Link activeClassName="active" to={path}>
                            {page.frontmatter.title}
                          </Link>
                        </NavGroupMenuItem>
                      );
                    })}
                  </NavGroupMenu>
                </NavGroup>
              );
            })}
          </Nav>
        );
      }}
    />
  );
}
