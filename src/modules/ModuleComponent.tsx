import { type JSX } from "react";

export type ModuleProps = object;

export type ModuleComponent = (...args: [props: ModuleProps]) => JSX.Element;
