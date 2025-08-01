import { useState } from 'react';
import { WalletConnect } from '@/components/WalletConnect';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
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

  const handleConnect = () => {
    // This will be handled by the WalletConnect component
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        walletState={walletState} 
        onDisconnect={handleDisconnect}
        onConnect={handleConnect}
      />
      
      <main className="flex-1 pt-16">
        {!walletState.isConnected ? (
          <WalletConnect onWalletConnected={handleWalletConnected} />
        ) : (
          <Game walletState={walletState} onDisconnect={handleDisconnect} />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
