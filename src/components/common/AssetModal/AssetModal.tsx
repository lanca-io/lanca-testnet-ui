import type { FC } from 'react';
import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { Input } from '@concero/ui-kit';
import { SearchIcon } from '@/assets/icons/search';
import { ChainController } from './ChainController/ChainController';
import { ChainMenu } from './ChainMenu/ChainMenu';
import "./AssetModal.pcss";

type AssetModalProps = {
    title: string;
    isOpen: boolean;
    onClose: () => void;
};

export enum ActiveTab {
    All = "all",
    CCIP = "ccip"
}

export const AssetModal: FC<AssetModalProps> = ({ title, isOpen, onClose }): JSX.Element => {
    const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.All);
    const [searchInput, setSearchInput] = useState<string>("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    return (
        <Modal title={title} isOpen={isOpen} onClose={onClose}>
            <Input
                placeholder='Select chain'
                size='l'
                icon={<SearchIcon />}
                className='asset-modal__input'
                value={searchInput}
                onChange={handleSearchChange}
            />
            <ChainController activeTab={activeTab} setActiveTab={setActiveTab} />
            <ChainMenu activeTab={activeTab} searchInput={searchInput} />
            <div className="blur" />
        </Modal>
    );
};