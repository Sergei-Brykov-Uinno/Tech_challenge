import { SyntheticEvent } from "react";
import clx from "../helpers/className";
import "./components.css";

type ButtonProps = {
	className?: string;
	type?: "submit" | "button" | "reset" | undefined;
	buttonType?: "primary" | "secondary";
	onClick?: (e?: SyntheticEvent) => void;
	disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
	children,
	className = "",
	type = "submit",
	buttonType = "primary",
	...rest
}) => {
	return (
		<button {...rest} type={type} className={clx("button", className)}>
			{children}
		</button>
	);
};
