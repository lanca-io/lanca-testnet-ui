import { FC } from "react";
import { Badge } from "../../Badge/Badge";
import "./Chain.pcss"

type ChainProps = {
    name: string;
    logoURL: string;
    isCCIP: boolean;
}

export const Chain: FC<ChainProps> = ({ name, logoURL }): JSX.Element => {
    return (
        <div className="chain">
            <div className="chain-content">
                <Badge logoURL={logoURL} size="l"/>
                <div className="chain-details">
                    <p className="chain-name">{name}</p>
                </div>
            </div>
        </div>
    )
}