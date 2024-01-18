import { Divider } from "@microsoft/arbutus.divider";
import type { FC } from "react";
import * as React from "react";
import { useSpaceStyles } from "@microsoft/arbutus.use-space-styles";

import { DividerComponentData } from "../component-renderer.types";

type DividerComponentProps = DividerComponentData;

export const DividerComponent: FC<DividerComponentProps> = () => {
  const space = useSpaceStyles();

  return <Divider className={space.my7} />;
};
