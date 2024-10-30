<template>
  <div>
    <h2>Web3 Wallet</h2>
    <button v-if="!wallet" @click="generateWallet">Create Wallet</button>
    <div v-if="wallet">
      <p>Public Key: {{ wallet.address }}</p>
      <p>Private Key: {{ wallet.privateKey }}</p>
      <button @click="encryptWallet">Encrypt and Save Wallet</button>
    </div>

    <div>
        <input v-model="recipientAddress" placeholder="Address to transfer">
        <input v-model.number="transferAmount" placeholder="Amount to transfer" type="number">
        <button @click="transferFunds"> Transfer funds</button>
    </div>

    <div>
      <input v-model="password" type="password" placeholder="Enter password" />
      <button @click="decryptWallet">Decrypt Wallet</button>
    </div>
  </div>
</template>


<script>
import { ethers } from 'ethers';
import { POLYGON_RPC_TESTNET_URL } from '@/utils/constants';

export default {
  data() {
    return {
      wallet: null,
      username: '',
      password: '',
      encryptedJson: null,
      recipientAddress : '',
      transferAmount : null,
    };
  },
  methods: {
    async transferFunds(){
        if (!this.wallet || !this.recipientAddress || !this.transferAmount){
            console.warn('cannot transfer funds')
            alert('data missing')
            return 
        }

        try {
            const provider = ethers.pro
        }
    },

    async generateWallet() {
      // Create a new wallet instance
      const newWallet = ethers.Wallet.createRandom();
      this.wallet = {
        address: newWallet.address,  // Public key (address)
        privateKey: newWallet.privateKey  // Private key
      };
      console.log("Wallet created with address:", this.wallet.address);
    },
    
    async encryptWallet() {
      if (this.wallet && this.password) {
        // Encrypt the wallet using the provided password
        const tempWallet = new ethers.Wallet(this.wallet.privateKey);
        this.encryptedJson = await tempWallet.encrypt(this.password);
        localStorage.setItem('encryptedWallet', this.encryptedJson);
        console.log("Wallet encrypted and saved.");
      } else {
        console.log("Please create a wallet and set a password.");
      }
    },

    async decryptWallet() {
      if (this.password) {
        try {
          const encryptedJson = localStorage.getItem('encryptedWallet');
          if (encryptedJson) {
            const decryptedWallet = await ethers.Wallet.fromEncryptedJson(encryptedJson, this.password);
            this.wallet = {
              address: decryptedWallet.address,
              privateKey: decryptedWallet.privateKey
            };
            console.log("Wallet decrypted with address:", this.wallet.address);
          } else {
            console.log("No encrypted wallet found.");
          }
        } catch (error) {
          console.error("Decryption failed:", error.message);
        }
      } else {
        console.log("Please enter a password.");
      }
    },
  }
};
</script>

