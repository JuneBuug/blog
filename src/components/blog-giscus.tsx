import Giscus from '@giscus/react';
import React from 'react';

export default function BlogGiscus() {
  return (
    <Giscus
      id="comments"
      repo="JuneBuug/blog"
      repoId="MDEwOlJlcG9zaXRvcnkyNDYyMzM4Njc="
      category="Announcements"
      categoryId="DIC_kwDODq07C84CU6CJ"
      mapping="pathname"
      term="Welcome to @giscus/react component!"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="light"
      lang="ko"
      loading="lazy"
    />
  );
}
