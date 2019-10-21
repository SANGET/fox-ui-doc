import React from 'react';
import styled from 'styled-components';
import { WebsiteHeader } from './WebsiteHeader';
import { ProjectHeader } from './ProjectHeader';
import { Head } from './Head';

const Headers = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

const PageWrapper = styled.div`
  background-color: bg;
  flex: 1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export function BaseLayout({ children, pageContext, backgroundColor }) {
  return (
    <Container>
      <Head pageContext={pageContext} />
      <Headers>
        <WebsiteHeader />
        <ProjectHeader />
      </Headers>
      <PageWrapper backgroundColor={backgroundColor}>{children}</PageWrapper>
    </Container>
  );
}
