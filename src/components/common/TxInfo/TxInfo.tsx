import type { FC } from "react";
import "./TxInfo.pcss"
import { GasIcon } from "@/assets/icons/gas";
import { TimeIcon } from "@/assets/icons/time";



export const TxInfo: FC = (): JSX.Element => {
    return (
        <div className="tx-info">
            <div className="tx-info__item">
                <div className="tx-info__item__label">
                    <GasIcon color="var(--color-gray-500)" size={16} />
                    <p className="tx-info__item__text">Test gas</p>
                </div>
                <div className="tx-info__item__value">
                    <p className="tx-info__item__text__value">0.00</p>
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