import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { web3Service, type WalletState } from '@/lib/web3';
import { Wallet, Zap, Shield, Sparkles } from 'lucide-react';

interface WalletConnectProps {
  onWalletConnected: (walletState: WalletState) => void;
}

export function WalletConnect({ onWalletConnected }: WalletConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    isConnected: false,
    chainId: null,
  });
  const { toast } = useToast();

  useEffect(() => {
    // Check if wallet is already connected
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            // Auto-connect if already authorized
            handleConnect();
          }
        })
        .catch(console.error);
    }
  }, []);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const state = await web3Service.connectWallet();
      setWalletState(state);
      onWalletConnected(state);
      
      toast({
        title: "🎉 Wallet Connected!",
        description: `Welcome ${state.address?.slice(0, 6)}...${state.address?.slice(-4)}`,
      });
    } catch (error: any) {
      toast({
        title: "Connection Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (walletState.isConnected) {
    return (
      <Card className="p-8 text-center border-2 border-primary glow-effect">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center glow-effect">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-primary mb-2">Wallet Connected</h3>
        <p className="text-muted-foreground mb-4">
          {formatAddress(walletState.address!)}
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-success">
          <Zap className="w-4 h-4" />
          <span>Monad Testnet</span>
        </div>
      </Card>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Hero Section */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-primary to-primary-glow rounded-full flex items-center justify-center glow-effect">
              <Sparkles className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Spin to Win
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Connect your wallet to start spinning for amazing prizes!
          </p>
        </div>

        {/* Connection Card */}
        <Card className="p-8 border-2 border-muted">
          <div className="text-center space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
              <p className="text-muted-foreground">
                Connect to Monad Testnet and start playing
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Wallet className="w-5 h-5 text-primary" />
                <span className="text-sm">MetaMask, WalletConnect & more</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Zap className="w-5 h-5 text-accent" />
                <span className="text-sm">Monad Testnet Network</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Shield className="w-5 h-5 text-success" />
                <span className="text-sm">Secure & Non-custodial</span>
              </div>
            </div>

            <Button
              onClick={handleConnect}
              disabled={isConnecting}
              className="w-full h-14 text-lg font-semibold glow-effect"
              size="lg"
            >
              {isConnecting ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Connecting...
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Wallet className="w-6 h-6" />
                  Connect Wallet
                </div>
              )}
            </Button>
          </div>
        </Card>

        {/* Info Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>New to crypto wallets? Get started with MetaMask</p>
        </div>
      </div>
    </div>
  );
}