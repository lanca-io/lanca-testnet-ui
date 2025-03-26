import { FC } from "react";
import { Chain } from "../Chain/Chain";
import { useGetChains } from "@/hooks/useGetChains";
import { ActiveTab } from "../AssetModal";
import "./ChainMenu.pcss";

type ChainMenuProps = {
    activeTab: ActiveTab;
    searchInput: string;
};

export const ChainMenu: FC<ChainMenuProps> = ({ activeTab, searchInput }): JSX.Element => {
    const { allChains, ccipChains } = useGetChains();

    const chainsToDisplay = activeTab === ActiveTab.CCIP ? ccipChains : allChains;

    const filteredChains = chainsToDisplay.filter(chain =>
        chain.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <div className="scroll-content">
            <div className="chain-menu">
                {filteredChains.map(chain => (
                    <Chain key={chain.id} name={chain.name} logoURL={chain.logoURL} isCCIP={chain.isCCIP} />
                ))}
            </div>
        </div>
    );
};