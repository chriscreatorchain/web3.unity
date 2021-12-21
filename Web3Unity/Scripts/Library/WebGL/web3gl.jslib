mergeInto(LibraryManager.library, {
    Web3Connect: function () {
		window.web3gl.connect();
		
    },
    ConnectAccount: function () {
        var bufferSize = lengthBytesUTF8(window.web3gl.connectAccount) + 1;
        var buffer = _malloc(bufferSize);
        stringToUTF8(window.web3gl.connectAccount, buffer, bufferSize);
        return buffer;
    },

    SetConnectAccount: function (value) {
        window.web3gl.connectAccount = value;
    },

    SendContractJs: function (method, abi, contract, args, value, gasLimit, gasPrice) {
        window.web3gl.sendContract(
            Pointer_stringify(method),
            Pointer_stringify(abi),
            Pointer_stringify(contract),
            Pointer_stringify(args),
            Pointer_stringify(value),
            Pointer_stringify(gasLimit),
            Pointer_stringify(gasPrice)
        );
    },

    SendContractResponse: function () {
        var bufferSize = lengthBytesUTF8(window.web3gl.sendContractResponse) + 1;
        var buffer = _malloc(bufferSize);
        stringToUTF8(window.web3gl.sendContractResponse, buffer, bufferSize);
        return buffer;
    },

    SetContractResponse: function (value) {
        window.web3gl.sendContractResponse = value;
    },

    SendTransactionJs: function (to, value, gasLimit, gasPrice) {
        window.web3gl.sendTransaction(
            Pointer_stringify(to),
            Pointer_stringify(value),
            Pointer_stringify(gasLimit),
            Pointer_stringify(gasPrice)
        );
    },

    SendTransactionResponse: function () {
        var bufferSize = lengthBytesUTF8(window.web3gl.sendTransactionResponse) + 1;
        var buffer = _malloc(bufferSize);
        stringToUTF8(window.web3gl.sendTransactionResponse, buffer, bufferSize);
        return buffer;
    },

    SetTransactionResponse: function (value) {
        window.web3gl.sendTransactionResponse = value;
    },

    SignMessage: function (message) {
        window.web3gl.signMessage(Pointer_stringify(message));
    },

    SignMessageResponse: function () {
        var bufferSize = lengthBytesUTF8(window.web3gl.signMessageResponse) + 1;
        var buffer = _malloc(bufferSize);
        stringToUTF8(window.web3gl.signMessageResponse, buffer, bufferSize);
        return buffer;
    },
	
	SetHandle: function () {
		if (typeof window.ethereum !== 'undefined')
		{
			window.ethereum.on('chainChanged', function (chainId) {
			console.log('handleChainChanged');
			console.log(chainId);
			window.unityInstance.SendMessage("HandleJS", "HandleChainChanged", chainId);
			});
			window.ethereum.on('networkChanged', function (networkId) {
			console.log('handlerNetworkChanged');
			console.log(networkId);
			window.unityInstance.SendMessage("HandleJS", "HandlerNetworkChanged", networkId);
			});
			window.ethereum.on('accountsChanged', function (accounts) {
				console.log('accountsChanged');
				console.log(accounts);
				window.unityInstance.SendMessage("HandleJS", "HandleAccountsChanged");
			});
			window.ethereum.on('disconnect', function (){
				window.unityInstance.SendMessage("HandleJS", "HandleDisconnect");
			});
		}
    },
	
    SetSignMessageResponse: function (value) {
        window.web3gl.signMessageResponse = value;
    },
		
    GetNetwork: function () {
        return window.web3gl.networkId;
    },
	
	GetEthereumNetworkVersion: function () {
		var returnStr = "-1";
		if (typeof window.ethereum !== 'undefined') {
		  returnStr = window.ethereum.networkVersion;
		}
		var bufferSize = lengthBytesUTF8(returnStr) + 1;
		var buffer = _malloc(bufferSize);
		stringToUTF8(returnStr, buffer, bufferSize);
		return buffer;
    },
    
    BinanceSmartChainSwitch: function () {
        window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
                chainId: '0x38',
                chainName: 'Binance Smart Chain',
                nativeCurrency: {
                    name: 'Binance Coin',
                    symbol: 'BNB',
                    decimals: 18
                },
                rpcUrls: ['https://bsc-dataseed.binance.org/'],
                blockExplorerUrls: ['https://bscscan.com']
            }]
        });
    },

    BinanceSmartChainTestnetSwitch: function () {
        window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
                chainId: '0x61',
                chainName: 'Binance Smart Chain Testnet',
                nativeCurrency: {
                    name: 'Binance Coin',
                    symbol: 'BNB',
                    decimals: 18
                },
                rpcUrls: ['https://data-seed-prebsc-1-s2.binance.org:8545/'],
                blockExplorerUrls: ['https://testnet.bscscan.com']
            }]
        });
    },
	OpenURL : function(url)
    {
        url = Pointer_stringify(url);
        window.open(url,'_blank');
    },

    CheckMetaMaskInstalled: function () {
        if (typeof window.ethereum !== 'undefined') {
            return window.ethereum.isMetaMask;
        }
        return false;
    },
	
	CheckMetaMaskWalletConnected: function () {
		if (typeof window.ethereum !== 'undefined') {
		  const accounts = window.ethereum.selectedAddress;
		  if(accounts && accounts.length > 0)
		  {
			return true;
		  }
		} 
		return false;
	},
	
	GetSelectedAddress: function () {
		var returnStr = "empty";
		if (typeof window.ethereum !== 'undefined') {
		  var accounts = window.ethereum.selectedAddress;
		  if(accounts && accounts.length > 0)
		  {
			returnStr = accounts;
		  }
		}
		var bufferSize = lengthBytesUTF8(returnStr) + 1;
		var buffer = _malloc(bufferSize);
		stringToUTF8(returnStr, buffer, bufferSize);
		return buffer;
	}
});
