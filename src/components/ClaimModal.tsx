import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { web3Service } from '@/lib/web3';
import { Gift, CheckCircle, XCircle, ExternalLink, Loader2 } from 'lucide-react';

interface ClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  prizeName: string;
}

export function ClaimModal({ isOpen, onClose, prizeName }: ClaimModalProps) {
  const [isClaimingStatus, setClaimingStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [txHash, setTxHash] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { toast } = useToast();

  const handleClaim = async () => {
    setClaimingStatus('pending');
    setErrorMessage('');
    setTxHash('');

    try {
      const hash = await web3Service.claimAirdrop();
      setTxHash(hash);
      setClaimingStatus('success');
      
      toast({
        title: "🎉 Airdrop Claimed!",
        description: "Your tokens have been sent to your wallet",
      });
    } catch (error: any) {
      console.error('Claim error:', error);
      setErrorMessage(error.message || 'Failed to claim airdrop');
      setClaimingStatus('error');
      
      toast({
        title: "Claim Failed",
        description: error.message || 'Failed to claim airdrop',
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    setClaimingStatus('idle');
    setTxHash('');
    setErrorMessage('');
    onClose();
  };

  const getExplorerUrl = (hash: string) => {
    return `https://testnet.monadexplorer.com/tx/${hash}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-primary" />
            Claim Your Airdrop
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Prize Display */}
          <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
            <h3 className="text-lg font-semibold text-primary mb-1">{prizeName}</h3>
            <p className="text-sm text-muted-foreground">Prize won from spin</p>
          </div>

          {/* Status Display */}
          {isClaimingStatus === 'idle' && (
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Click below to claim your airdrop tokens on Monad Testnet
              </p>
              <Button onClick={handleClaim} className="w-full glow-effect" size="lg">
                <Gift className="w-4 h-4 mr-2" />
                Claim Airdrop
              </Button>
            </div>
          )}

          {isClaimingStatus === 'pending' && (
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">Sending Transaction...</h4>
                <p className="text-sm text-muted-foreground">
                  Please confirm the transaction in your wallet
                </p>
              </div>
            </div>
          )}

          {isClaimingStatus === 'success' && (
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-success" />
              </div>
              <div>
                <h4 className="font-semibold text-success mb-2">Success!</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Your airdrop has been successfully claimed!
                </p>
                {txHash && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="gap-2"
                  >
                    <a
                      href={getExplorerUrl(txHash)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Transaction
                    </a>
                  </Button>
                )}
              </div>
              <Button onClick={handleClose} className="w-full" variant="secondary">
                Close
              </Button>
            </div>
          )}

          {isClaimingStatus === 'error' && (
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center">
                <XCircle className="w-12 h-12 text-destructive" />
              </div>
              <div>
                <h4 className="font-semibold text-destructive mb-2">Claim Failed</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {errorMessage}
                </p>
              </div>
              <div className="space-y-2">
                <Button onClick={handleClaim} className="w-full" variant="outline">
                  Try Again
                </Button>
                <Button onClick={handleClose} className="w-full" variant="secondary">
                  Close
                </Button>
              </div>
            </div>
          )}

          {/* Info Footer */}
          <div className="text-xs text-muted-foreground text-center p-3 bg-muted rounded-lg">
            <p>Contract: 0x3D8f...3abc</p>
            <p>Network: Monad Testnet</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

