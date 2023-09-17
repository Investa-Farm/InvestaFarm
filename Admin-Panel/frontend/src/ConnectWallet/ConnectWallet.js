import contractInstance from "../ContractInstance/ContractInstance";
const { ethereum } = window;

const checkVerifiedAddresses = async (account) => {
    console.log("Checking verified addresses...");
    try {
        const farmDAO = await contractInstance(false);
        const verifiedAddresses = await farmDAO.getVerifiedAddresses();

        const lowerCaseAddresses = verifiedAddresses.map(address => address.toLowerCase());
        const lowerCaseAccount = account.toLowerCase();

        if (lowerCaseAddresses.includes(lowerCaseAccount)) {
            return true; 
        } else {
            return false; 
        }
        
    } catch (error) {
        console.error(error);
    }
} 

export const connectWallet = async () => {
    try {
        const accounts = await ethereum.request({
            method: 'eth_requestAccounts',
        });

        const account = accounts[0]

        const result = await checkVerifiedAddresses(account); 

        if (result) {
            console.log("Account is verified!")
        } else {
            console.error("Account is NOT verified!")
            return; 
        }

        // Change chain id to Mumbai 
        const chainId = await ethereum.request({ method: "eth_chainId" })
        console.log("Chain id is: ", chainId)

        if (chainId !== "0xaa36a7") {
            switchChainIds()
        }

        return account;
    } catch (error) {
        console.error(error)
    }
}

//  Switching chainId to Sepolia
const switchChainIds = async () => {
    await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xaa36a7" }], // Change this to your preferred chain ID
    })
}
