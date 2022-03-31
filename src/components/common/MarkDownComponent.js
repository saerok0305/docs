import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import styled from "styled-components";
import "../../markdown-styles.css";
import MetaTag from "../../utils/MetaTag";
import NotFound from "../NotFound";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import "../../pages/research/topic-modeling/lda/Smoothed_LDA.png";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

import "katex/dist/katex.min.css";
import RouterLink from "./RouterLink";

const MarkDownContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  width: 100%;
  max-width: 800px;
  /* width: 800px; */
  /* white-space: nowrap; */
`;

function MarkDownComponent({ file, meta, setLink }) {
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
          <ReactMarkdown
            className={"markdown"}
            remarkPlugins={[remarkGfm, remarkMath]}
            // escapeHtml={false}
            rehypePlugins={[rehypeRaw, rehypeKatex]}
            //components={{
            // a: (props) => (
            //   <RouterLink href={props.href} setLink={setLink}>
            //     {props.children}
            //  </RouterLink>
            // ),
            //}}
          >
            {markdown}
          </ReactMarkdown>
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
