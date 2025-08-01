import { useState } from 'react';
import { WalletConnect } from '@/components/WalletConnect';
import Game from './Game';
import { web3Service, type WalletState } from '@/lib/web3';

const Index = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    isConnected: false,
    chainId: null,
  });

  const handleWalletConnected = (state: WalletState) => {
    setWalletState(state);
  };

  const handleDisconnect = () => {
    web3Service.disconnect();
    setWalletState({
      address: null,
      isConnected: false,
      chainId: null,
    });
  };

  if (!walletState.isConnected) {
    return <WalletConnect onWalletConnected={handleWalletConnected} />;
  }

  return <Game walletState={walletState} onDisconnect={handleDisconnect} />;
};

export default Index;
