import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Zap, User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { type WalletState } from '@/lib/web3';

interface NavbarProps {
  walletState: WalletState;
  onDisconnect: () => void;
  onConnect: () => void;
}

export function Navbar({ walletState, onDisconnect, onConnect }: NavbarProps) {
  const [activeLink, setActiveLink] = useState('Home');

  const menuItems = [
    { name: 'Home', href: '#', icon: '🏠' },
    { name: 'Learn Monad', href: '#', icon: '🧠' },
    { name: 'Leaderboard', href: '#', icon: '📜' },
    { name: 'Prizes', href: '#', icon: '🎁' },
    { name: 'Airdrop Info', href: '#', icon: '🚀' }
  ];

  const socialLinks = [
    { name: 'Discord', href: '#' },
    { name: 'GitHub', href: '#' },
    { name: 'Docs', href: '#' }
  ];

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/20 backdrop-blur-md">
      <div className="bg-[#0e0e1a]/90 px-6">
        <div className="flex items-center justify-between h-16 max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold gradient-text">Monad Spin</span>
          </div>

          {/* Menu Items */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveLink(item.name)}
                className={`
                  relative text-sm font-medium transition-all duration-300
                  ${activeLink === item.name 
                    ? 'text-white' 
                    : 'text-white/70 hover:text-primary'
                  }
                `}
              >
                <span className="flex items-center space-x-1">
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </span>
                {activeLink === item.name && (
                  <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full glow-effect" />
                )}
              </button>
            ))}
          </div>

          {/* Right Side - Wallet + Socials */}
          <div className="flex items-center space-x-4">
            {/* Social Links */}
            <div className="hidden lg:flex items-center space-x-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-white/70 hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Wallet Section */}
            {walletState.isConnected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                  >
                    <User className="h-4 w-4 mr-2" />
                    {formatAddress(walletState.address!)}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="bg-[#0e0e1a] border-white/20 text-white"
                >
                  <DropdownMenuItem className="hover:bg-white/10">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/20" />
                  <DropdownMenuItem 
                    onClick={onDisconnect}
                    className="hover:bg-red-500/20 text-red-400"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={onConnect}
                className="bg-primary hover:bg-primary/90 text-white glow-effect transition-all duration-300"
              >
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}