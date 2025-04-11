export const EventCategory = {
    BRIDGE: 'bridge',
    TOKEN: 'token',
    GUIDES: 'guides',
    FAUCET: 'faucet',
    WHITELIST: 'whitelist',
    SOCIAL: 'social',
} as const

export const EventActions = {
    BRIDGE: {
        SUCCESSFUL: 'testnet_bridge_successful',
        FAILED: 'testnet_bridge_failed',
        REJECTED: 'testnet_bridge_rejected',
    },

    TOKEN: {
        CLAIM_SUCCESSFUL: 'tcero_claim_successful',
        CLAIM_FAILED: 'tcero_claim_failed',
    },

    GUIDES: {
        YOUTUBE_OPENED: 'youtube_guide_opened',
        MEDIUM_OPENED: 'medium_guide_opened',
    },

    FAUCET: {
        LIST_OPENED: 'faucet_list_opened',
    },

    WHITELIST: {
        APPLY_PRESSED: 'apply_for_whitelist_pressed',
    },

    SOCIAL: {
        SHARED_ON_X: 'shared_on_x',
    },
} as const

export const BridgeEvents = {
    SUCCESSFUL: {
        category: EventCategory.BRIDGE,
        action: EventActions.BRIDGE.SUCCESSFUL,
        label: 'Bridge transaction completed successfully',
    },
    FAILED: {
        category: EventCategory.BRIDGE,
        action: EventActions.BRIDGE.FAILED,
        label: 'Bridge transaction failed',
    },
    REJECTED: {
        category: EventCategory.BRIDGE,
        action: EventActions.BRIDGE.REJECTED,
        label: 'Bridge transaction rejected by user',
    },
} as const

export const TokenEvents = {
    CLAIM_SUCCESSFUL: {
        category: EventCategory.TOKEN,
        action: EventActions.TOKEN.CLAIM_SUCCESSFUL,
        label: 'Successfully claimed tCERO tokens',
    },
    CLAIM_FAILED: {
        category: EventCategory.TOKEN,
        action: EventActions.TOKEN.CLAIM_FAILED,
        label: 'Failed to claim tCERO tokens',
    },
} as const

export const GuideEvents = {
    YOUTUBE_OPENED: {
        category: EventCategory.GUIDES,
        action: EventActions.GUIDES.YOUTUBE_OPENED,
        label: 'YouTube guide opened',
    },
    MEDIUM_OPENED: {
        category: EventCategory.GUIDES,
        action: EventActions.GUIDES.MEDIUM_OPENED,
        label: 'Medium guide opened',
    },
} as const

export const FaucetEvents = {
    LIST_OPENED: {
        category: EventCategory.FAUCET,
        action: EventActions.FAUCET.LIST_OPENED,
        label: 'Faucet list opened',
    },
} as const

export const WhitelistEvents = {
    APPLY_PRESSED: {
        category: EventCategory.WHITELIST,
        action: EventActions.WHITELIST.APPLY_PRESSED,
        label: 'Apply for whitelist button pressed',
    },
} as const

export const SocialEvents = {
    SHARED_ON_X: {
        category: EventCategory.SOCIAL,
        action: EventActions.SOCIAL.SHARED_ON_X,
        label: 'Content shared on X/Twitter',
    },
} as const