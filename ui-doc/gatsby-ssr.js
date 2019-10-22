import React from 'react';
import { RootWrapper } from './src/components/RootWrapper';

export const wrapRootElement = ({ element }, { theme }) => {
  return <RootWrapper theme={theme}>{element}</RootWrapper>;
};

export const onRenderBody = (
  { setPreBodyComponents, setPostBodyComponents },
  { algoliaDocSearch },
) => {
  if (algoliaDocSearch) {
    setPostBodyComponents([
      <script
        key="plugin-docsearch-js"
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js"
      />,
    ]);
  }
};
