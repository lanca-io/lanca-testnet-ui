import type { FC } from "react";
import "./ErrorDisplay.pcss";

type ErrorDisplayProps = {
    error: string | null;
};

export const ErrorDisplay: FC<ErrorDisplayProps> = ({ error }): JSX.Element | null => {

    if (!error) return null;

    return (
        <div className="error-display">
            <span className="error-display__title">{error}</span>
        </div>
    );
};