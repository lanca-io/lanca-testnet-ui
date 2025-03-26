import type { FC } from "react";
import { Button } from "@concero/ui-kit";
import { useGetChains } from "@/hooks/useGetChains";
import { ActiveTab } from "../AssetModal";
import "./ChainController.pcss";

type ChainControllerProps = {
    activeTab: ActiveTab;
    setActiveTab: (tab: ActiveTab) => void;
};

export const ChainController: FC<ChainControllerProps> = ({ activeTab, setActiveTab }): JSX.Element => {
    const { allChains, ccipChains, isLoading } = useGetChains();

    return (
        <div className="chain-controller">
            <Button
                isFull
                size="m"
                variant={activeTab === ActiveTab.All ? "secondary_color" : "secondary"}
                isLoading={isLoading}
                onClick={() => setActiveTab(ActiveTab.All)}
            >
                All: {allChains.length}
            </Button>
            <Button
                isFull
                size="m"
                variant={activeTab === ActiveTab.CCIP ? "secondary_color" : "secondary"}
                isLoading={isLoading}
                onClick={() => setActiveTab(ActiveTab.CCIP)}
            >
                CCIP: {ccipChains.length}
            </Button>
        </div>
    );
};