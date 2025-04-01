import type { FC } from "react";
import { useTxProcess } from "@/hooks/useTxProcess";
import { Button } from "@concero/ui-kit";
import { Status } from "@lanca/sdk";
import "./ProcessAction.pcss";

export const ProcessAction: FC = (): JSX.Element | null => {
    const { txStatus } = useTxProcess();

    const renderButtons = () => {
        switch (txStatus) {
            case Status.FAILED:
            case Status.REJECTED:
                return (
                    <Button variant="secondary_color" size="l" isFull>
                        Try again
                    </Button>
                );
            case Status.SUCCESS:
                return (
                    <>
                        <Button variant="secondary_color" size="l" isFull>
                            Swap again
                        </Button>
                        <Button variant="secondary" size="l" isFull>
                            Share on X
                        </Button>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className={`process-action__${txStatus.toLowerCase()}`}>
            <div className="process-action">{renderButtons()}</div>
        </div>
    );
};