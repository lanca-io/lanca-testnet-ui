import type { FC } from "react";
import { GasIcon } from "@/assets/icons/gas";
import { TimeIcon } from "@/assets/icons/time";
import { useEstimateGas } from "@/hooks/useEstimateGas";
import { SkeletonLoader } from "../SkeletonLoader/SkeletonLoader";
import { format } from "@/utils/format";
import "./TxInfo.pcss"

export const TxInfo: FC = (): JSX.Element => {
    const { formattedGas, isLoading } = useEstimateGas()

    return (
        <div className="tx-info">
            <div className="tx-info__item">
                <div className="tx-info__item__label">
                    <GasIcon color="var(--color-gray-500)" size={16} />
                    <p className="tx-info__item__text">Test gas</p>
                </div>
                <div className="tx-info__item__value">
                    {isLoading ? (
                        <SkeletonLoader width={55} height={20} />
                    ) : (
                        <p className="tx-info__item__text__value">{format(Number(formattedGas), 4)}</p>
                    )}
                </div>

            </div>
            <div className="tx-info__item">
                <div className="tx-info__item__label">
                    <TimeIcon />
                    <p className="tx-info__item__text">ETA</p>
                </div>
                <div className="tx-info__item__value">
                        <p className="tx-info__item__text__value">20s</p>
                </div>
            </div>
        </div>
    )
}