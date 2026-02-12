import React from "react";
import type { ModuleComponent } from "./ModuleComponent";

/*
 * HOW TO CREATE A MODULE:
 * - Create a component that implements the ModuleComponent interface in src/modules/
 * - Export the component as the default export
 * - In componentImports, add the module name string and the lazy import
 */
export const componentImports: Record<string, React.LazyExoticComponent<ModuleComponent>> = {
  "ProcessNextStepInEquipment": React.lazy(() => import("./run/step/ProcessNextStepInEquipment")),
  "Iris": React.lazy(() => import("./iris/Iris")),
};
