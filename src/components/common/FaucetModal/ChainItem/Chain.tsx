import type { FC } from "react";
import "./Chain.pcss"

type ChainProps = {
    name: string
    logoURI: string
}

export const Chain: FC<ChainProps> = ({ name, logoURI }): JSX.Element => {

    return (
        <div className="chain">
            <img className="chain_logo" src={logoURI} alt={name} />
            <p className="chain_name">{name}</p>
        </div>
    )
}