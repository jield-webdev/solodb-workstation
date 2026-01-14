import { Suspense } from "react";
import { componentImports } from "./moduleComponentsImports";

interface Props {
  moduleName: string;
}

export default function ModuleComponentRenderer({ moduleName }: Props) {
  const Component = componentImports[moduleName];

  if (!Component) {
    return <div>Component not found</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
}
