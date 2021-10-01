import "./components.css";
import clx from "../helpers/className";

type ErrorComponentProps = {
	error: string;
};
export const ErrorComponent: React.FC<ErrorComponentProps> = ({ error }) => {
	return <div className={clx("form-wrapper", "error")}>{error}</div>;
};
