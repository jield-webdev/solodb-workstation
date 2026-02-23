import {useContext} from "react";
import {DeviceContext} from "../context/DeviceContext.ts";

export const useDevice = () => useContext(DeviceContext);