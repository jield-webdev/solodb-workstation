import React from "react";

export const componentImports: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {
  "ProcessNextStepInEquipment": React.lazy(() => import("./run/step/ProcessNextStepInEquipment")),
};
