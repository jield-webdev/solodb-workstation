import { Link } from "react-router-dom";
import { getServerPlainUrl } from "../helpers/runtimeConfig";

export default function LinkToSoloDb({
  path,
  text = "Link",
  className,
}: {
  path: string;
  text?: string;
  className?: string;
}) {
  /* TODO: change it to use the correct env */
  return (
    <Link className={className} to={`${getServerPlainUrl()}/default/${path}`}>
      {text}
    </Link>
  );
}
