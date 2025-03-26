import type { FC } from "react";
import { IconButton } from "@concero/ui-kit";
import { SwapIcon } from "@/assets/icons/swap";
import { useFormStore } from "@/stores/form/useFormStore";
import "./CardSwitcher.pcss"

export const CardSwitcher: FC = (): JSX.Element => {
    const { swapTokensAndChains } = useFormStore()
    return (
        <div className="card-switcher">
                <IconButton size="s" variant="secondary" className="card-switcher__button" onClick={swapTokensAndChains}>
                    <SwapIcon/>
                </IconButton>
        </div>
    )
}