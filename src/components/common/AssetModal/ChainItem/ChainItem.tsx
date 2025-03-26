import type { FC } from "react";
import type { Chain } from "@/stores/chains/types";
import { SkeletonLoader } from "../../SkeletonLoader/SkeletonLoader";
import { Badge } from "../../Badge/Badge";
import { Tag } from "@concero/ui-kit";
import { format } from "@/utils/format";
import "./ChainItem.pcss";

type ChainProps = {
    chain: Chain;
    balance?: string;
    onSelectChain: (chain: Chain) => void;
    isLoading: boolean;
};

export const ChainItem: FC<ChainProps> = ({ chain, balance, onSelectChain, isLoading }): JSX.Element => {
    return (
        <div className="chain" onClick={() => onSelectChain(chain)}>
            <div className="chain-content">
                <Badge logoURL={chain.logoURL} size="l"/>
                <div className="chain-details">
                    <p className="chain-name">{chain.name}</p>
                    {chain.isCCIP && <Tag variant="neutral" size="s">CCIP</Tag>}
                </div>
            </div>
            <div className="chain-balance">
                {isLoading ? (
                    <SkeletonLoader width={30} height={16} />
                ) : (
                    balance && <p className="chain-balance__value">{format(Number(balance), 2)}</p>
                )}
            </div>
        </div>
    );
};