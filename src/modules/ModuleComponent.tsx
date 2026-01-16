import { type JSX } from "react";

export interface ModuleProps {
}

export type ModuleComponent = (...args: [props: ModuleProps]) => JSX.Element;
