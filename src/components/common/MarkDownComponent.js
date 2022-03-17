import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styled from "styled-components";
import "../../markdown-styles.css";
import MetaTag from "../../utils/MetaTag";
import NotFound from "../NotFound";

import "../../pages/research/topic-modeling/lda/Smoothed_LDA.png";

import rehypeRaw from "rehype-raw";

const MarkDownContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  width: 100%;
  max-width: 800px;
  /* width: 800px; */
  /* white-space: nowrap; */
`;

function MarkDownComponent({ file, meta }) {
  const [markdown, setMarkdown] = useState(null);
  useEffect(() => {
    return () => {
      setMarkdown(null); ///
    };
  }, []);
  if (file) {
    try {
      const f = require("../../pages/" + file);
      fetch(f)
        .then((res) => res.text())
        .then((text) => setMarkdown(text));

      return (
        <MarkDownContainer>
          <MetaTag meta={meta} />
          <Markdown
            className={"markdown"}
            remarkPlugins={[remarkGfm]}
            // escapeHtml={false}
            rehypePlugins={[rehypeRaw]}
          >
            {markdown}
          </Markdown>
        </MarkDownContainer>
      );
    } catch {
      console.log("../../pages/" + file + " not found ...");
      return (
        <MarkDownContainer>
          <NotFound />
        </MarkDownContainer>
      );
    }
  }
}

export default MarkDownComponent;
