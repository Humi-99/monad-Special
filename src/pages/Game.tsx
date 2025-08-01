import { useState } from 'react';
import { SpinWheel } from '@/components/SpinWheel';
import { ClaimModal } from '@/components/ClaimModal';
import { type WalletState } from '@/lib/web3';

interface GameProps {
  walletState: WalletState;
  onDisconnect: () => void;
}

export default function Game({ walletState, onDisconnect }: GameProps) {
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState<string>('');

  const handleClaimAirdrop = (prize: string) => {
    setSelectedPrize(prize);
    setClaimModalOpen(true);
  };

  const handleCloseModal = () => {
    setClaimModalOpen(false);
    setSelectedPrize('');
  };

  return (
    <>
      <SpinWheel
        walletAddress={walletState.address!}
        onClaimAirdrop={handleClaimAirdrop}
        onDisconnect={onDisconnect}
      />
      
      <ClaimModal
        isOpen={claimModalOpen}
        onClose={handleCloseModal}
        prizeName={selectedPrize}
      />
    </>
  );
}