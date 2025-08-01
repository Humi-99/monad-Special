import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Zap, Gift, Smartphone, Crown, Diamond, Star, LogOut } from 'lucide-react';

const PRIZES = [
  { id: 1, name: 'CHOG GTD', icon: Crown, color: 'text-gold', bgColor: 'bg-gold/20' },
  { id: 2, name: 'MONADVERSE GTD', icon: Diamond, color: 'text-diamond', bgColor: 'bg-diamond/20' },
  { id: 3, name: 'CHOGLIST', icon: Star, color: 'text-primary', bgColor: 'bg-primary/20' },
  { id: 4, name: '10KSQUAD', icon: Zap, color: 'text-accent', bgColor: 'bg-accent/20' },
  { id: 5, name: 'iPhone 18', icon: Smartphone, color: 'text-foreground', bgColor: 'bg-muted' },
  { id: 6, name: 'Full Access', icon: Crown, color: 'text-success', bgColor: 'bg-success/20' },
];

interface SpinWheelProps {
  walletAddress: string;
  onClaimAirdrop: (prize: string) => void;
  onDisconnect: () => void;
}

export function SpinWheel({ walletAddress, onClaimAirdrop, onDisconnect }: SpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentPrize, setCurrentPrize] = useState<typeof PRIZES[0] | null>(null);
  const [hasWon, setHasWon] = useState(false);
  const { toast } = useToast();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleSpin = async () => {
    if (isSpinning || hasWon) return;

    setIsSpinning(true);
    setHasWon(false);
    setCurrentPrize(null);

    // Simulate spinning animation
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Randomly select a prize
    const randomPrize = PRIZES[Math.floor(Math.random() * PRIZES.length)];
    setCurrentPrize(randomPrize);
    setHasWon(true);
    setIsSpinning(false);

    toast({
      title: "🎉 Congratulations!",
      description: `You won ${randomPrize.name}!`,
    });
  };

  const handleClaim = () => {
    if (currentPrize) {
      onClaimAirdrop(currentPrize.name);
    }
  };

  const handleNewSpin = () => {
    setHasWon(false);
    setCurrentPrize(null);
  };

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Spin to Win</h1>
            <p className="text-muted-foreground">
              Connected: {formatAddress(walletAddress)}
            </p>
          </div>
          <Button variant="outline" onClick={onDisconnect}>
            <LogOut className="w-4 h-4 mr-2" />
            Disconnect
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
        {/* Spin Wheel */}
        <div className="space-y-6">
          <Card className="p-8 text-center border-2 border-primary glow-effect">
            <div className="mb-8">
              <div 
                className={`w-64 h-64 mx-auto rounded-full border-8 border-primary relative overflow-hidden ${
                  isSpinning ? 'spin-wheel' : ''
                }`}
                style={{
                  background: 'conic-gradient(from 0deg, hsl(260 100% 65%), hsl(200 100% 60%), hsl(48 100% 67%), hsl(142 76% 36%), hsl(260 100% 65%), hsl(200 100% 60%))'
                }}
              >
                {/* Wheel segments */}
                <div className="absolute inset-4 rounded-full bg-background/90 flex items-center justify-center">
                  <div className="text-center">
                    {isSpinning ? (
                      <div className="space-y-2">
                        <div className="w-8 h-8 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin" />
                        <p className="text-lg font-semibold">Spinning...</p>
                      </div>
                    ) : hasWon && currentPrize ? (
                      <div className="space-y-2 pulse-win">
                        <currentPrize.icon className={`w-12 h-12 mx-auto ${currentPrize.color}`} />
                        <p className="text-lg font-bold">{currentPrize.name}</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Zap className="w-12 h-12 mx-auto text-primary" />
                        <p className="text-lg font-semibold">Ready to Spin!</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Pointer */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-primary-foreground" />
                </div>
              </div>
            </div>

            {!hasWon ? (
              <Button
                onClick={handleSpin}
                disabled={isSpinning}
                size="lg"
                className="w-full h-14 text-xl font-bold glow-effect"
              >
                {isSpinning ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Spinning...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Zap className="w-6 h-6" />
                    SPIN NOW!
                  </div>
                )}
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-success/20 rounded-lg border border-success">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Gift className="w-5 h-5 text-success" />
                    <span className="text-success font-semibold">You've won a Yardrop!</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Claim your reward now</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={handleClaim}
                    className="gold-glow"
                    variant="secondary"
                  >
                    <Gift className="w-4 h-4 mr-2" />
                    Claim Airdrop
                  </Button>
                  <Button
                    onClick={handleNewSpin}
                    variant="outline"
                  >
                    Spin Again
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Prizes List */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              Available Prizes
            </h3>
            <div className="grid gap-3">
              {PRIZES.map((prize) => (
                <div
                  key={prize.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    currentPrize?.id === prize.id 
                      ? `${prize.bgColor} border-current win-glow` 
                      : 'bg-muted border-muted'
                  }`}
                >
                  <prize.icon className={`w-6 h-6 ${prize.color}`} />
                  <span className="font-medium">{prize.name}</span>
                  {currentPrize?.id === prize.id && (
                    <Badge variant="secondary" className="ml-auto">
                      WON!
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-muted/50">
            <h4 className="font-semibold mb-2">How it works:</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Each spin guarantees a prize</p>
              <p>• All prizes include airdrop opportunities</p>
              <p>• Claim rewards on Monad Testnet</p>
              <p>• No limits on spins!</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}