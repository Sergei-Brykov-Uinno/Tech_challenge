import "./components.css";
import Loader from "react-loader-spinner";
import clx from "../helpers/className";

type LoaderProps = {
	type?:
		| "ThreeDots"
		| "Audio"
		| "BallTriangle"
		| "Bars"
		| "Circles"
		| "Grid"
		| "Hearts"
		| "Oval"
		| "Puff"
		| "Rings"
		| "TailSpin"
		| "Watch"
		| "RevolvingDot"
		| "Triangle"
		| "Plane"
		| "MutatingDots"
		| "CradleLoader";
	color?: string;
	height?: number;
	width?: number;
};
export const MainLoader: React.FC<LoaderProps> = ({
	type = "ThreeDots",
	color = "#0e6c8b",
	height = 100,
	width = 100,
}) => {
	return (
		<div className={clx("flex-center", "wrapper")}>
			<Loader type={type} color={color} height={height} width={width} />
		</div>
	);
};
