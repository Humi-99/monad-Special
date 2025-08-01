import { ethers } from 'ethers';

export const MONAD_TESTNET = {
  chainId: '0x279F', // 10143 in hex
  chainName: 'Monad Testnet',
  nativeCurrency: {
    name: 'MON',
    symbol: 'MON',
    decimals: 18,
  },
  rpcUrls: ['https://testnet-rpc.monad.xyz'],
  blockExplorerUrls: ['https://testnet.monadexplorer.com'],
};

export const CLAIM_CONTRACT_ADDRESS = '0x3D8fcE672772F9164bA77fb33425f503BACB3abc';

export const CLAIM_CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "claim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export interface WalletState {
  address: string | null;
  isConnected: boolean;
  chainId: string | null;
}

export class Web3Service {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.Signer | null = null;

  async connectWallet(): Promise<WalletState> {
    if (!window.ethereum) {
      throw new Error('Please install MetaMask or another Web3 wallet');
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      // Switch to Monad testnet
      await this.switchToMonadTestnet();

      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.signer = await this.provider.getSigner();
      
      const address = await this.signer.getAddress();
      const network = await this.provider.getNetwork();

      return {
        address,
        isConnected: true,
        chainId: network.chainId.toString(),
      };
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  }

  async switchToMonadTestnet(): Promise<void> {
    if (!window.ethereum) {
      throw new Error('No wallet found');
    }

    try {
      // Try to switch to the network
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: MONAD_TESTNET.chainId }],
      });
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [MONAD_TESTNET],
          });
        } catch (addError) {
          throw new Error('Failed to add Monad Testnet to wallet');
        }
      } else {
        throw new Error('Failed to switch to Monad Testnet');
      }
    }
  }

  async claimAirdrop(): Promise<string> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    try {
      const contract = new ethers.Contract(
        CLAIM_CONTRACT_ADDRESS,
        CLAIM_CONTRACT_ABI,
        this.signer
      );

      const tx = await contract.claim();
      const receipt = await tx.wait();
      
      return receipt.hash;
    } catch (error) {
      console.error('Error claiming airdrop:', error);
      throw error;
    }
  }

  disconnect(): void {
    this.provider = null;
    this.signer = null;
  }
}

// Global instance
export const web3Service = new Web3Service();

// Type declarations for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}