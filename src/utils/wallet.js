import {ethers} from 'ethers'

const createWallet = () => {
    const wallet = ethers.Wallet.createRandom();
    const publicKey = wallet.address;
    const privateKey = wallet.privateKey;
    return {publicKey, privateKey}
}