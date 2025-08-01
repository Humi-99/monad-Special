import { Zap } from 'lucide-react';

export function Footer() {
  const footerSections = {
    about: {
      title: 'About',
      links: [
        { name: 'What is Monad?', href: '#' },
        { name: 'About this App', href: '#' }
      ]
    },
    community: {
      title: 'Community',
      links: [
        { name: 'Telegram', href: '#' },
        { name: 'Discord', href: '#' },
        { name: 'Twitter', href: '#' }
      ]
    },
    resources: {
      title: 'Resources',
      links: [
        { name: 'Docs', href: '#' },
        { name: 'GitHub', href: '#' },
        { name: 'Whitepaper', href: '#' }
      ]
    },
    legal: {
      title: 'Legal',
      links: [
        { name: 'Terms & Conditions', href: '#' },
        { name: 'Privacy Policy', href: '#' }
      ]
    }
  };

  return (
    <footer className="bg-[#0b0f1f] border-t border-[#1f2937] mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">{footerSections.about.title}</h3>
            <ul className="space-y-3">
              {footerSections.about.links.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-[#d1d5db] hover:text-primary transition-colors duration-300 text-sm"
                    style={{ boxShadow: 'none' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textShadow = '0 0 8px hsl(260 100% 65%)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textShadow = 'none';
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">{footerSections.community.title}</h3>
            <ul className="space-y-3">
              {footerSections.community.links.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-[#d1d5db] hover:text-primary transition-colors duration-300 text-sm"
                    style={{ boxShadow: 'none' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textShadow = '0 0 8px hsl(260 100% 65%)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textShadow = 'none';
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">{footerSections.resources.title}</h3>
            <ul className="space-y-3">
              {footerSections.resources.links.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-[#d1d5db] hover:text-primary transition-colors duration-300 text-sm"
                    style={{ boxShadow: 'none' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textShadow = '0 0 8px hsl(260 100% 65%)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textShadow = 'none';
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">{footerSections.legal.title}</h3>
            <ul className="space-y-3">
              {footerSections.legal.links.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-[#d1d5db] hover:text-primary transition-colors duration-300 text-sm"
                    style={{ boxShadow: 'none' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textShadow = '0 0 8px hsl(260 100% 65%)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textShadow = 'none';
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#1f2937] my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo & Copyright */}
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Zap className="h-5 w-5 text-primary" />
            <span className="text-[#d1d5db] text-sm">
              © 2025 Monad Special Event. All rights reserved.
            </span>
          </div>

          {/* Additional Links */}
          <div className="flex items-center space-x-6">
            <a 
              href="#"
              className="text-[#d1d5db] hover:text-primary transition-colors duration-300 text-sm"
              onMouseEnter={(e) => {
                e.currentTarget.style.textShadow = '0 0 8px hsl(260 100% 65%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textShadow = 'none';
              }}
            >
              Testnet Explorer
            </a>
            <a 
              href="#"
              className="text-[#d1d5db] hover:text-primary transition-colors duration-300 text-sm"
              onMouseEnter={(e) => {
                e.currentTarget.style.textShadow = '0 0 8px hsl(260 100% 65%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textShadow = 'none';
              }}
            >
              Add Monad Network
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}