import React from "react";

export const componentImports: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {
  "ListEquipment": React.lazy(() => import("./equipment/ListEquipmentModule")),
  "ListRun": React.lazy(() => import("./run/ListRunModule")),
};
