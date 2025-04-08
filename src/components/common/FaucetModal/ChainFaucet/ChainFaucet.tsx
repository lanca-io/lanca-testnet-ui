import type { FC } from "react";
import "./ChainFaucet.pcss"

type ChainProps = {
    name: string
    logoURI: string
    onClick?: () => void
}

export const ChainFaucet: FC<ChainProps> = ({ name, logoURI, onClick }): JSX.Element => {

    return (
        <div className="chain_faucet" onClick={onClick}>
            <img className="chain_faucet_logo" src={logoURI} alt={name} />
            <p className="chain_faucet_name">{name}</p>
        </div>
    )
}