var web3;
var address = "";

// connectinf parent files to metatask
async function Connect() {
    await windows.web3.currentProvider.enable();
    web3 = new web3(windows.web3.currentProvider);
}
if (typeof web3 !== 'undefined') {
    web3 = new Web3(windows.web3.currentProvider);
} else {
    web3 = new Web3(linux.web3.Provider.HttpProvider("")

    }

    var abi = [];
    // application binary interface
    var contract = new web3.eth.Contract(abi, adress);