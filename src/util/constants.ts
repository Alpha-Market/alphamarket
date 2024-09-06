export const EXPONENTIAL_TOKEN_ABI = [
    {
        "inputs":
            [
                {
                    "internalType": "string", "name": "_name", "type": "string"
                },
                {
                    "internalType": "string", "name": "_symbol", "type": "string"
                }, {
                    "internalType": "address", "name": "_bcAddress", "type": "address"
                }, {
                    "internalType": "address", "name": "_host", "type": "address"
                }
            ],
        "stateMutability": "payable", "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address", "name": "spender", "type": "address"
            }, {
                "internalType": "uint256", "name": "allowance", "type": "uint256"
            }, {
                "internalType": "uint256", "name": "needed", "type": "uint256"
            }
        ],
        "name": "ERC20InsufficientAllowance", "type": "error"
    }, {
        "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "uint256", "name": "balance", "type": "uint256" }, { "internalType": "uint256", "name": "needed", "type": "uint256" }], "name": "ERC20InsufficientBalance", "type": "error"
    }, { "inputs": [{ "internalType": "address", "name": "approver", "type": "address" }], "name": "ERC20InvalidApprover", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "receiver", "type": "address" }], "name": "ERC20InvalidReceiver", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }], "name": "ERC20InvalidSender", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }], "name": "ERC20InvalidSpender", "type": "error" }, { "inputs": [], "name": "ExponentialToken__AmountMustBeMoreThanZero", "type": "error" }, { "inputs": [], "name": "ExponentialToken__BurnAmountExceedsBalance", "type": "error" }, { "inputs": [], "name": "ExponentialToken__IncorrectAmountOfEtherSent", "type": "error" }, { "inputs": [], "name": "ExponentialToken__InsufficientFundingForTransaction", "type": "error" }, { "inputs": [], "name": "ExponentialToken__SupplyCannotBeReducedBelowOne", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "buyer", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amountSpent", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "fees", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "tokensMinted", "type": "uint256" }], "name": "TokensPurchased", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "seller", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amountReceived", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "fees", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "tokensBurnt", "type": "uint256" }], "name": "TokensSold", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "burnFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "address", "name": "sender", "type": "address" }], "name": "burnTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "collectedFees", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getBondingCurveProxyAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
    {
        "inputs": [], "name": "mintTokens", "outputs": [], "stateMutability": "payable", "type": "function"
    }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "reserveBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }];


export const SEPOLIA_EXPONENTIAL_TOKEN_ABI = [
    {
        "inputs": [
            {
                "internalType": "string", "name": "_name", "type": "string"
            },
            {
                "internalType": "string", "name": "_symbol", "type": "string"
            }, {
                "internalType": "address", "name": "_bcAddress", "type": "address"
            }, {
                "internalType": "address", "name": "_host", "type": "address"
            }
        ], "stateMutability": "payable", "type": "constructor"
    }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "allowance", "type": "uint256" }, { "internalType": "uint256", "name": "needed", "type": "uint256" }], "name": "ERC20InsufficientAllowance", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "uint256", "name": "balance", "type": "uint256" }, { "internalType": "uint256", "name": "needed", "type": "uint256" }], "name": "ERC20InsufficientBalance", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "approver", "type": "address" }], "name": "ERC20InvalidApprover", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "receiver", "type": "address" }], "name": "ERC20InvalidReceiver", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }], "name": "ERC20InvalidSender", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }], "name": "ERC20InvalidSpender", "type": "error" }, { "inputs": [], "name": "ExponentialToken__AmountMustBeMoreThanZero", "type": "error" }, { "inputs": [], "name": "ExponentialToken__BurnAmountExceedsBalance", "type": "error" }, { "inputs": [], "name": "ExponentialToken__IncorrectAmountOfEtherSent", "type": "error" }, { "inputs": [], "name": "ExponentialToken__InsufficientFundingForTransaction", "type": "error" }, { "inputs": [], "name": "ExponentialToken__SupplyCannotBeReducedBelowOne", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "buyer", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amountSpent", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "fees", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "tokensMinted", "type": "uint256" }], "name": "TokensPurchased", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "seller", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amountReceived", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "fees", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "tokensBurnt", "type": "uint256" }], "name": "TokensSold", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "burnFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "address", "name": "sender", "type": "address" }], "name": "burnTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "collectedFees", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getBondingCurveProxyAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "mintTokens", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "reserveBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }];

export const EXPONENTIAL_TOKEN_BYTECODE = '0x6080604052600436106100f35760003560e01c80639003adfe1161008a578063a677676111610059578063a677676114610287578063a9059cbb146102cb578063dd62ed3e146102eb578063eeb9635c1461033157600080fd5b80639003adfe1461022657806395d89b411461023c5780639730b30514610251578063a10954fe1461027157600080fd5b8063313ce567116100c6578063313ce5671461019257806342966c68146101ae57806370a08231146101d057806379cc67901461020657600080fd5b806306fdde03146100f8578063095ea7b31461012357806318160ddd1461015357806323b872dd14610172575b600080fd5b34801561010457600080fd5b5061010d610339565b60405161011a9190611035565b60405180910390f35b34801561012f57600080fd5b5061014361013e366004611098565b6103cb565b604051901515815260200161011a565b34801561015f57600080fd5b506002545b60405190815260200161011a565b34801561017e57600080fd5b5061014361018d3660046110c4565b6103e5565b34801561019e57600080fd5b506040516012815260200161011a565b3480156101ba57600080fd5b506101ce6101c9366004611105565b610409565b005b3480156101dc57600080fd5b506101646101eb36600461111e565b6001600160a01b031660009081526020819052604090205490565b34801561021257600080fd5b506101ce610221366004611098565b610416565b34801561023257600080fd5b5061016460065481565b34801561024857600080fd5b5061010d61042f565b34801561025d57600080fd5b506101ce61026c366004611142565b61043e565b34801561027d57600080fd5b5061016460055481565b34801561029357600080fd5b506040516001600160a01b037f0000000000000000000000003d81177238c69e104472b0d3781631c771e8c88a16815260200161011a565b3480156102d757600080fd5b506101436102e6366004611098565b6109c6565b3480156102f757600080fd5b50610164610306366004611172565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6101ce6109d4565b606060038054610348906111a0565b80601f0160208091040260200160405190810160405280929190818152602001828054610374906111a0565b80156103c15780601f10610396576101008083540402835291602001916103c1565b820191906000526020600020905b8154815290600101906020018083116103a457829003601f168201915b5050505050905090565b6000336103d9818585610cdb565b60019150505b92915050565b6000336103f3858285610ced565b6103fe858585610d6b565b506001949350505050565b6104133382610dca565b50565b610421823383610ced565b61042b8282610dca565b5050565b606060048054610348906111a0565b7f0000000000000000000000003d81177238c69e104472b0d3781631c771e8c88a6001600160a01b0316635e45da236040518163ffffffff1660e01b8152600401602060405180830381865afa15801561049c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104c091906111da565b3a11156104e85760405162461bcd60e51b81526004016104df906111f3565b60405180910390fd5b816000036105095760405163cf7df37b60e01b815260040160405180910390fd5b670de0b6b3a76400008261051c60025490565b610526919061125f565b101561054557604051632ba8caa960e11b815260040160405180910390fd5b6001600160a01b0381166000908152602081905260409020548281101561057f5760405163fb0d90ad60e01b815260040160405180910390fd5b6000807f0000000000000000000000003d81177238c69e104472b0d3781631c771e8c88a6001600160a01b03166390be1ede6105ba60025490565b6005546040516001600160e01b031960e085901b16815260048101929092526024820152604481018890526064016040805180830381865afa158015610604573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106289190611272565b91509150816005600082825461063e919061125f565b9091555061064e9050818361125f565b91507f0000000000000000000000003d81177238c69e104472b0d3781631c771e8c88a6001600160a01b031663272354a06040518163ffffffff1660e01b8152600401602060405180830381865afa1580156106ae573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106d291906111da565b156107a0576000670de0b6b3a76400007f0000000000000000000000003d81177238c69e104472b0d3781631c771e8c88a6001600160a01b031663272354a06040518163ffffffff1660e01b8152600401602060405180830381865afa158015610740573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061076491906111da565b61076e9084611296565b61077891906112ad565b9050806006600082825461078c91906112cf565b9091555061079c9050818361125f565b9150505b6107aa8486610416565b60408051838152602081018390529081018690526001600160a01b038516907f6db63bebf1e6540277744df32846ebdb98385b1a73f2d5de49b28348add63f509060600160405180910390a260007f0000000000000000000000003d81177238c69e104472b0d3781631c771e8c88a6001600160a01b0316634ce7957c6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610856573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061087a91906112e2565b6001600160a01b03168260405160006040518083038185875af1925050503d80600081146108c4576040519150601f19603f3d011682016040523d82523d6000602084013e6108c9565b606091505b505090508061091a5760405162461bcd60e51b815260206004820152601c60248201527f50726f746f636f6c20666565207472616e73666572206661696c65640000000060448201526064016104df565b6000856001600160a01b03168460405160006040518083038185875af1925050503d8060008114610967576040519150601f19603f3d011682016040523d82523d6000602084013e61096c565b606091505b50509050806109bd5760405162461bcd60e51b815260206004820152601a60248201527f546f6b656e2073616c65207472616e73666572206661696c656400000000000060448201526064016104df565b50505050505050565b6000336103d9818585610d6b565b7f0000000000000000000000003d81177238c69e104472b0d3781631c771e8c88a6001600160a01b0316635e45da236040518163ffffffff1660e01b8152600401602060405180830381865afa158015610a32573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a5691906111da565b3a1115610a755760405162461bcd60e51b81526004016104df906111f3565b34600003610a965760405163cf7df37b60e01b815260040160405180910390fd5b6000807f0000000000000000000000003d81177238c69e104472b0d3781631c771e8c88a6001600160a01b0316637806091c610ad160025490565b6005546040516001600160e01b031960e085901b168152600481019290925260248201523460448201526064016040805180830381865afa158015610b1a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b3e9190611272565b9092509050610b4d813461125f565b60056000828254610b5e91906112cf565b9250508190555060007f0000000000000000000000003d81177238c69e104472b0d3781631c771e8c88a6001600160a01b0316634ce7957c6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610bc5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610be991906112e2565b6001600160a01b03168260405160006040518083038185875af1925050503d8060008114610c33576040519150601f19603f3d011682016040523d82523d6000602084013e610c38565b606091505b5050905080610c895760405162461bcd60e51b815260206004820152601c60248201527f50726f746f636f6c20666565207472616e73666572206661696c65640000000060448201526064016104df565b610c933384610e00565b604080513481526020810184905290810184905233907f0d1a0d5e3d583a0e92588799dd06e50fd78c07daf05f0cc06d7b848b1ca445f19060600160405180910390a2505050565b610ce88383836001610e36565b505050565b6001600160a01b038381166000908152600160209081526040808320938616835292905220546000198114610d655781811015610d5657604051637dc7a0d960e11b81526001600160a01b038416600482015260248101829052604481018390526064016104df565b610d6584848484036000610e36565b50505050565b6001600160a01b038316610d9557604051634b637e8f60e11b8152600060048201526024016104df565b6001600160a01b038216610dbf5760405163ec442f0560e01b8152600060048201526024016104df565b610ce8838383610f0b565b6001600160a01b038216610df457604051634b637e8f60e11b8152600060048201526024016104df565b61042b82600083610f0b565b6001600160a01b038216610e2a5760405163ec442f0560e01b8152600060048201526024016104df565b61042b60008383610f0b565b6001600160a01b038416610e605760405163e602df0560e01b8152600060048201526024016104df565b6001600160a01b038316610e8a57604051634a1406b160e11b8152600060048201526024016104df565b6001600160a01b0380851660009081526001602090815260408083209387168352929052208290558015610d6557826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92584604051610efd91815260200190565b60405180910390a350505050565b6001600160a01b038316610f36578060026000828254610f2b91906112cf565b90915550610fa89050565b6001600160a01b03831660009081526020819052604090205481811015610f895760405163391434e360e21b81526001600160a01b038516600482015260248101829052604481018390526064016104df565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b038216610fc457600280548290039055610fe3565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161102891815260200190565b60405180910390a3505050565b602081526000825180602084015260005b818110156110635760208186018101516040868401015201611046565b506000604082850101526040601f19601f83011684010191505092915050565b6001600160a01b038116811461041357600080fd5b600080604083850312156110ab57600080fd5b82356110b681611083565b946020939093013593505050565b6000806000606084860312156110d957600080fd5b83356110e481611083565b925060208401356110f481611083565b929592945050506040919091013590565b60006020828403121561111757600080fd5b5035919050565b60006020828403121561113057600080fd5b813561113b81611083565b9392505050565b6000806040838503121561115557600080fd5b82359150602083013561116781611083565b809150509250929050565b6000806040838503121561118557600080fd5b823561119081611083565b9150602083013561116781611083565b600181811c908216806111b457607f821691505b6020821081036111d457634e487b7160e01b600052602260045260246000fd5b50919050565b6000602082840312156111ec57600080fd5b5051919050565b60208082526036908201527f5472616e73616374696f6e206761732070726963652063616e6e6f742065786360408201527532b2b21036b0bc34b6bab69033b0b9903634b6b4ba1760511b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b818103818111156103df576103df611249565b6000806040838503121561128557600080fd5b505080516020909101519092909150565b80820281158282048414176103df576103df611249565b6000826112ca57634e487b7160e01b600052601260045260246000fd5b500490565b808201808211156103df576103df611249565b6000602082840312156112f457600080fd5b815161113b8161108356fea26469706673582212206c68bd051f51541378809b6f5b6068b2acb92c8392102415de95d174eed0a30264736f6c634300081a0033';
export const SEPOLIA_EXPONENTIAL_TOKEN_BYTECODE = '0x6080604052600436106100f35760003560e01c80639003adfe1161008a578063a677676111610059578063a677676114610287578063a9059cbb146102cb578063dd62ed3e146102eb578063eeb9635c1461033157600080fd5b80639003adfe1461022657806395d89b411461023c5780639730b30514610251578063a10954fe1461027157600080fd5b8063313ce567116100c6578063313ce5671461019257806342966c68146101ae57806370a08231146101d057806379cc67901461020657600080fd5b806306fdde03146100f8578063095ea7b31461012357806318160ddd1461015357806323b872dd14610172575b600080fd5b34801561010457600080fd5b5061010d610339565b60405161011a9190611060565b60405180910390f35b34801561012f57600080fd5b5061014361013e3660046110c3565b6103cb565b604051901515815260200161011a565b34801561015f57600080fd5b506002545b60405190815260200161011a565b34801561017e57600080fd5b5061014361018d3660046110ef565b6103e5565b34801561019e57600080fd5b506040516012815260200161011a565b3480156101ba57600080fd5b506101ce6101c9366004611130565b610409565b005b3480156101dc57600080fd5b506101646101eb366004611149565b6001600160a01b031660009081526020819052604090205490565b34801561021257600080fd5b506101ce6102213660046110c3565b610416565b34801561023257600080fd5b5061016460065481565b34801561024857600080fd5b5061010d61042f565b34801561025d57600080fd5b506101ce61026c36600461116d565b61043e565b34801561027d57600080fd5b5061016460055481565b34801561029357600080fd5b506040516001600160a01b037f0000000000000000000000003fe1eefd8fca939dd0670564700a2703bbfafe9616815260200161011a565b3480156102d757600080fd5b506101436102e63660046110c3565b6109c6565b3480156102f757600080fd5b5061016461030636600461119d565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6101ce6109d4565b606060038054610348906111cb565b80601f0160208091040260200160405190810160405280929190818152602001828054610374906111cb565b80156103c15780601f10610396576101008083540402835291602001916103c1565b820191906000526020600020905b8154815290600101906020018083116103a457829003601f168201915b5050505050905090565b6000336103d9818585610cfc565b60019150505b92915050565b6000336103f3858285610d0e565b6103fe858585610d8c565b506001949350505050565b6104133382610deb565b50565b610421823383610d0e565b61042b8282610deb565b5050565b606060048054610348906111cb565b7f0000000000000000000000003fe1eefd8fca939dd0670564700a2703bbfafe966001600160a01b0316635e45da236040518163ffffffff1660e01b8152600401602060405180830381865afa15801561049c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104c09190611205565b3a11156104e85760405162461bcd60e51b81526004016104df9061121e565b60405180910390fd5b816000036105095760405163cf7df37b60e01b815260040160405180910390fd5b670de0b6b3a76400008261051c60025490565b610526919061128a565b101561054557604051632ba8caa960e11b815260040160405180910390fd5b6001600160a01b0381166000908152602081905260409020548281101561057f5760405163fb0d90ad60e01b815260040160405180910390fd5b6000807f0000000000000000000000003fe1eefd8fca939dd0670564700a2703bbfafe966001600160a01b03166390be1ede6105ba60025490565b6005546040516001600160e01b031960e085901b16815260048101929092526024820152604481018890526064016040805180830381865afa158015610604573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610628919061129d565b91509150816005600082825461063e919061128a565b9091555061064e9050818361128a565b91507f0000000000000000000000003fe1eefd8fca939dd0670564700a2703bbfafe966001600160a01b031663272354a06040518163ffffffff1660e01b8152600401602060405180830381865afa1580156106ae573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106d29190611205565b156107a0576000670de0b6b3a76400007f0000000000000000000000003fe1eefd8fca939dd0670564700a2703bbfafe966001600160a01b031663272354a06040518163ffffffff1660e01b8152600401602060405180830381865afa158015610740573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107649190611205565b61076e90846112c1565b61077891906112d8565b9050806006600082825461078c91906112fa565b9091555061079c9050818361128a565b9150505b6107aa8486610416565b60408051838152602081018390529081018690526001600160a01b038516907f6db63bebf1e6540277744df32846ebdb98385b1a73f2d5de49b28348add63f509060600160405180910390a260007f0000000000000000000000003fe1eefd8fca939dd0670564700a2703bbfafe966001600160a01b0316634ce7957c6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610856573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061087a919061130d565b6001600160a01b03168260405160006040518083038185875af1925050503d80600081146108c4576040519150601f19603f3d011682016040523d82523d6000602084013e6108c9565b606091505b505090508061091a5760405162461bcd60e51b815260206004820152601c60248201527f50726f746f636f6c20666565207472616e73666572206661696c65640000000060448201526064016104df565b6000856001600160a01b03168460405160006040518083038185875af1925050503d8060008114610967576040519150601f19603f3d011682016040523d82523d6000602084013e61096c565b606091505b50509050806109bd5760405162461bcd60e51b815260206004820152601a60248201527f546f6b656e2073616c65207472616e73666572206661696c656400000000000060448201526064016104df565b50505050505050565b6000336103d9818585610d8c565b7f0000000000000000000000003fe1eefd8fca939dd0670564700a2703bbfafe966001600160a01b0316635e45da236040518163ffffffff1660e01b8152600401602060405180830381865afa158015610a32573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a569190611205565b3a1115610a755760405162461bcd60e51b81526004016104df9061121e565b34600003610a965760405163cf7df37b60e01b815260040160405180910390fd5b6000807f0000000000000000000000003fe1eefd8fca939dd0670564700a2703bbfafe966001600160a01b0316637806091c610ad160025490565b6005546040516001600160e01b031960e085901b168152600481019290925260248201523460448201526064016040805180830381865afa158015610b1a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b3e919061129d565b9092509050610b4d813461128a565b60056000828254610b5e91906112fa565b9250508190555060007f0000000000000000000000003fe1eefd8fca939dd0670564700a2703bbfafe966001600160a01b0316634ce7957c6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610bc5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610be9919061130d565b6001600160a01b03168260405160006040518083038185875af1925050503d8060008114610c33576040519150601f19603f3d011682016040523d82523d6000602084013e610c38565b606091505b5050905080610c895760405162461bcd60e51b815260206004820152601c60248201527f50726f746f636f6c20666565207472616e73666572206661696c65640000000060448201526064016104df565b610c933384610e21565b604080513481526020810184905290810184905233907f0d1a0d5e3d583a0e92588799dd06e50fd78c07daf05f0cc06d7b848b1ca445f19060600160405180910390a2505050565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b610d098383836001610e57565b505050565b6001600160a01b038381166000908152600160209081526040808320938616835292905220546000198114610d865781811015610d7757604051637dc7a0d960e11b81526001600160a01b038416600482015260248101829052604481018390526064016104df565b610d8684848484036000610e57565b50505050565b6001600160a01b038316610db657604051634b637e8f60e11b8152600060048201526024016104df565b6001600160a01b038216610de05760405163ec442f0560e01b8152600060048201526024016104df565b610d09838383610f2c565b6001600160a01b038216610e1557604051634b637e8f60e11b8152600060048201526024016104df565b61042b82600083610f2c565b6001600160a01b038216610e4b5760405163ec442f0560e01b8152600060048201526024016104df565b61042b60008383610f2c565b6001600160a01b038416610e815760405163e602df0560e01b8152600060048201526024016104df565b6001600160a01b038316610eab57604051634a1406b160e11b8152600060048201526024016104df565b6001600160a01b0380851660009081526001602090815260408083209387168352929052208290558015610d8657826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92584604051610f1e91815260200190565b60405180910390a350505050565b6001600160a01b038316610f57578060026000828254610f4c91906112fa565b90915550610fc99050565b6001600160a01b03831660009081526020819052604090205481811015610faa5760405163391434e360e21b81526001600160a01b038516600482015260248101829052604481018390526064016104df565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b038216610fe557600280548290039055611004565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161104991815260200190565b60405180910390a3505050565b61105e61132a565b565b602081526000825180602084015260005b8181101561108e5760208186018101516040868401015201611071565b506000604082850101526040601f19601f83011684010191505092915050565b6001600160a01b038116811461041357600080fd5b600080604083850312156110d657600080fd5b82356110e1816110ae565b946020939093013593505050565b60008060006060848603121561110457600080fd5b833561110f816110ae565b9250602084013561111f816110ae565b929592945050506040919091013590565b60006020828403121561114257600080fd5b5035919050565b60006020828403121561115b57600080fd5b8135611166816110ae565b9392505050565b6000806040838503121561118057600080fd5b823591506020830135611192816110ae565b809150509250929050565b600080604083850312156111b057600080fd5b82356111bb816110ae565b91506020830135611192816110ae565b600181811c908216806111df57607f821691505b6020821081036111ff57634e487b7160e01b600052602260045260246000fd5b50919050565b60006020828403121561121757600080fd5b5051919050565b60208082526036908201527f5472616e73616374696f6e206761732070726963652063616e6e6f742065786360408201527532b2b21036b0bc34b6bab69033b0b9903634b6b4ba1760511b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b818103818111156103df576103df611274565b600080604083850312156112b057600080fd5b505080516020909101519092909150565b80820281158282048414176103df576103df611274565b6000826112f557634e487b7160e01b600052601260045260246000fd5b500490565b808201808211156103df576103df611274565b60006020828403121561131f57600080fd5b8151611166816110ae565b634e487b7160e01b600052605160045260246000fdfea2646970667358221220676aa28c487d5222c5ccacc6fc70a4ac575090dcce47eda8eb152baf31003b3a64736f6c634300081a0033';

export const MAX_GAS_FOR_EXPONENTIAL_TOKEN = 1641304;