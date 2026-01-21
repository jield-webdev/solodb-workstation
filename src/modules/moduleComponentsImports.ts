import React from "react";
import type { ModuleComponent } from "./ModuleComponent";

export const componentImports: Record<string, React.LazyExoticComponent<ModuleComponent>> = {
  "ProcessNextStepInEquipment": React.lazy(() => import("./run/step/ProcessNextStepInEquipment")),
};
