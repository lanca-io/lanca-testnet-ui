import type { Abi } from 'viem'

export const ConceroABI = [
	{
		inputs: [
			{
				internalType: 'address',
				name: 'conceroRouter',
				type: 'address',
			},
			{
				internalType: 'address',
				name: 'ccipRouter',
				type: 'address',
			},
			{
				internalType: 'address',
				name: 'lancaToken',
				type: 'address',
			},
			{
				internalType: 'address',
				name: 'lancaPool',
				type: 'address',
			},
			{
				internalType: 'uint64',
				name: 'chainSelector',
				type: 'uint64',
			},
		],
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		inputs: [],
		name: 'BridgeAlreadyProcessed',
		type: 'error',
	},
	{
		inputs: [
			{
				internalType: 'bytes',
				name: 'response',
				type: 'bytes',
			},
		],
		name: 'DelegateCallFailed',
		type: 'error',
	},
	{
		inputs: [],
		name: 'InsufficientBridgeAmount',
		type: 'error',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'provided',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'required',
				type: 'uint256',
			},
		],
		name: 'InsufficientFee',
		type: 'error',
	},
	{
		inputs: [
			{
				internalType: 'enum LibErrors.InvalidAddressType',
				name: 'errorType',
				type: 'uint8',
			},
		],
		name: 'InvalidAddress',
		type: 'error',
	},
	{
		inputs: [],
		name: 'InvalidBridgeToken',
		type: 'error',
	},
	{
		inputs: [],
		name: 'InvalidCcipToken',
		type: 'error',
	},
	{
		inputs: [],
		name: 'InvalidCcipTxType',
		type: 'error',
	},
	{
		inputs: [
			{
				internalType: 'enum IConceroClientErrors.MessageConfigErrorType',
				name: 'error',
				type: 'uint8',
			},
		],
		name: 'InvalidClientMessageConfig',
		type: 'error',
	},
	{
		inputs: [],
		name: 'InvalidConceroMessageSender',
		type: 'error',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'router',
				type: 'address',
			},
		],
		name: 'InvalidConceroRouter',
		type: 'error',
	},
	{
		inputs: [],
		name: 'InvalidDstChainData',
		type: 'error',
	},
	{
		inputs: [],
		name: 'InvalidDstChainGasLimit',
		type: 'error',
	},
	{
		inputs: [],
		name: 'InvalidDstChainSelector',
		type: 'error',
	},
	{
		inputs: [],
		name: 'InvalidFeeAmount',
		type: 'error',
	},
	{
		inputs: [],
		name: 'InvalidFeeToken',
		type: 'error',
	},
	{
		inputs: [],
		name: 'InvalidLancaBridgeMessageVersion',
		type: 'error',
	},
	{
		inputs: [],
		name: 'InvalidReceiver',
		type: 'error',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'router',
				type: 'address',
			},
		],
		name: 'InvalidRouter',
		type: 'error',
	},
	{
		inputs: [],
		name: 'MessageTooLarge',
		type: 'error',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'target',
				type: 'address',
			},
		],
		name: 'NotAContract',
		type: 'error',
	},
	{
		inputs: [
			{
				internalType: 'enum IConceroClientErrors.RequiredVariableUnsetType',
				name: 'variableType',
				type: 'uint8',
			},
		],
		name: 'RequiredVariableUnset',
		type: 'error',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'token',
				type: 'address',
			},
		],
		name: 'SafeERC20FailedOperation',
		type: 'error',
	},
	{
		inputs: [
			{
				internalType: 'enum LibErrors.UnauthorizedType',
				name: 'errorType',
				type: 'uint8',
			},
		],
		name: 'Unauthorized',
		type: 'error',
	},
	{
		inputs: [],
		name: 'UnauthorizedCcipMessageSender',
		type: 'error',
	},
	{
		inputs: [],
		name: 'UnauthorizedConceroMessageSender',
		type: 'error',
	},
	{
		inputs: [],
		name: 'UnsupportedFeeTokenType',
		type: 'error',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'id',
				type: 'bytes32',
			},
		],
		name: 'FailedExecutionLayerTxSettled',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'messageId',
				type: 'bytes32',
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'tokenAddress',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'receiver',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
		],
		name: 'LancaBridgeReceived',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'conceroMessageId',
				type: 'bytes32',
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'token',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'receiver',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint64',
				name: 'dstChainSelector',
				type: 'uint64',
			},
		],
		name: 'LancaBridgeSent',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'ccipMessageId',
				type: 'bytes32',
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'token',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'uint64',
				name: 'dstChainSelector',
				type: 'uint64',
			},
		],
		name: 'LancaSettlementSent',
		type: 'event',
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: 'uint256',
						name: 'amount',
						type: 'uint256',
					},
					{
						internalType: 'address',
						name: 'token',
						type: 'address',
					},
					{
						internalType: 'address',
						name: 'feeToken',
						type: 'address',
					},
					{
						internalType: 'address',
						name: 'receiver',
						type: 'address',
					},
					{
						internalType: 'address',
						name: 'fallbackReceiver',
						type: 'address',
					},
					{
						internalType: 'uint64',
						name: 'dstChainSelector',
						type: 'uint64',
					},
					{
						internalType: 'uint32',
						name: 'dstChainGasLimit',
						type: 'uint32',
					},
					{
						internalType: 'bytes',
						name: 'message',
						type: 'bytes',
					},
				],
				internalType: 'struct ILancaBridge.BridgeReq',
				name: 'bridgeReq',
				type: 'tuple',
			},
		],
		name: 'bridge',
		outputs: [
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32',
			},
		],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: 'bytes32',
						name: 'messageId',
						type: 'bytes32',
					},
					{
						internalType: 'uint64',
						name: 'sourceChainSelector',
						type: 'uint64',
					},
					{
						internalType: 'bytes',
						name: 'sender',
						type: 'bytes',
					},
					{
						internalType: 'bytes',
						name: 'data',
						type: 'bytes',
					},
					{
						components: [
							{
								internalType: 'address',
								name: 'token',
								type: 'address',
							},
							{
								internalType: 'uint256',
								name: 'amount',
								type: 'uint256',
							},
						],
						internalType: 'struct Client.EVMTokenAmount[]',
						name: 'destTokenAmounts',
						type: 'tuple[]',
					},
				],
				internalType: 'struct Client.Any2EVMMessage',
				name: 'message',
				type: 'tuple',
			},
		],
		name: 'ccipReceive',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: 'messageId',
				type: 'bytes32',
			},
			{
				internalType: 'uint24',
				name: 'srcChainSelector',
				type: 'uint24',
			},
			{
				internalType: 'bytes',
				name: 'sender',
				type: 'bytes',
			},
			{
				internalType: 'bytes',
				name: 'message',
				type: 'bytes',
			},
		],
		name: 'conceroReceive',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
			{
				internalType: 'uint64',
				name: 'dstChainSelector',
				type: 'uint64',
			},
			{
				internalType: 'uint32',
				name: 'dstChainGasLimit',
				type: 'uint32',
			},
		],
		name: 'getBridgeFeeBreakdown',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint64',
				name: 'ccipChainSelector',
				type: 'uint64',
			},
		],
		name: 'getConceroChainSelectorByCcipChainSelector',
		outputs: [
			{
				internalType: 'uint24',
				name: '',
				type: 'uint24',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint64',
				name: 'dstChainSelector',
				type: 'uint64',
			},
			{
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
			{
				internalType: 'address',
				name: 'feeToken',
				type: 'address',
			},
			{
				internalType: 'uint32',
				name: 'gasLimit',
				type: 'uint32',
			},
		],
		name: 'getFee',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint64',
				name: 'chainSelector',
				type: 'uint64',
			},
		],
		name: 'getLancaBridgeContractByChain',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'getOwner',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'getRouter',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint64',
				name: 'ccipChainSelector',
				type: 'uint64',
			},
			{
				internalType: 'uint24',
				name: 'conceroChainSelector',
				type: 'uint24',
			},
		],
		name: 'setChainSelectors',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint64',
				name: 'chainSelector',
				type: 'uint64',
			},
			{
				internalType: 'address',
				name: 'lancaBridgeContract',
				type: 'address',
			},
		],
		name: 'setLancaBridgeContract',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'bytes4',
				name: 'interfaceId',
				type: 'bytes4',
			},
		],
		name: 'supportsInterface',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
] as Abi
