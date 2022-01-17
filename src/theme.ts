import { merge } from "lodash-es";
import BaseTheme from "./themes/BaseTheme";
import Burocrat from "./themes/burocrat";
import DesignBase from "./themes/DesignBase";

const theme = merge(BaseTheme, DesignBase, Burocrat);

export default theme;
