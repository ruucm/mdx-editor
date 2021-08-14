import React from "react";
import { useESM } from "../hooks/use-esm";

export default IndexPage;

function IndexPage() {
  const m: any = useESM("https://module.harbor.school/m/useScrollDirection.js");
  console.log("m?.useScrollDirection}", m?.useScrollDirection);

  return <>Home</>;
}
