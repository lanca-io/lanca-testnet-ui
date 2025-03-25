import type { FC } from "react";
import { useMemo } from "react";
import { TxStatus, StepType } from "@/stores/tx-execution/types";

type HeadingMapType = {
    [TxStatus.Idle]: string
    [TxStatus.Loading]: Record<StepType, string>
    [TxStatus.Success]: string
    [TxStatus.Failed]: string
    [TxStatus.Rejected]: string
}

export const ProcessHeading: FC<{ txStatus: TxStatus; activeStep: StepType | null }> = ({ txStatus, activeStep }) => {
    const headingMap = useMemo<HeadingMapType>(
        () => ({
            [TxStatus.Idle]: 'Initializing...',
            [TxStatus.Loading]: {
                [StepType.Approval]: 'Approval...',
                [StepType.Bridge]: 'Transaction...',
            },
            [TxStatus.Success]: 'Success!',
            [TxStatus.Failed]: 'Transaction Failed',
            [TxStatus.Rejected]: 'Transaction Rejected',
        }),
        [],
    )

    const heading = useMemo<string>(() => {
        if (txStatus === TxStatus.Loading && activeStep !== null) {
            return headingMap[TxStatus.Loading][activeStep]
        }
        return headingMap[txStatus] as string
    }, [txStatus, activeStep, headingMap])

    return <h4 className="process-card__title">{heading}</h4>
}
