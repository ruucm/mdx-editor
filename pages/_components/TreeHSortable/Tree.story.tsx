import { useAtom } from "jotai";
import React from "react";
import { mdxItemsAtom } from "../../../store";

import { SortableTree } from "./SortableTree";

export default {
  title: "Examples/Tree/Sortable",
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      maxWidth: 1080,
      padding: 10,
      margin: "0 auto",
      marginTop: "10%",
    }}
  >
    {children}
  </div>
);

export const MySetup = ({ sendMessage }: any) => {
  const [mdxItems, setMdxItems] = useAtom(mdxItemsAtom);

  return (
    <Wrapper>
      <SortableTree
        collapsible
        removable
        defaultItems={mdxItems.body}
        frontMatter={mdxItems.frontMatter}
        setMdxItems={setMdxItems}
        sendMessage={sendMessage}
      />
    </Wrapper>
  );
};
export const BasicSetup = () => (
  <Wrapper>
    <SortableTree />
  </Wrapper>
);

export const AllFeatures = () => (
  <Wrapper>
    <SortableTree collapsible indicator removable />
  </Wrapper>
);

export const DropIndicator = () => (
  <Wrapper>
    <SortableTree indicator />
  </Wrapper>
);

export const Collapsible = () => (
  <Wrapper>
    <SortableTree collapsible />
  </Wrapper>
);

export const RemovableItems = () => (
  <Wrapper>
    <SortableTree removable />
  </Wrapper>
);
