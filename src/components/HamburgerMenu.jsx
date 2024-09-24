import React, { useState } from 'react';
import { Menu, X, Settings, Key, Brain, Sliders } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useUIConfig } from '../config/uiConfig';

const HamburgerMenu = ({ onOpenSettings }) => {
  const { config } = useUIConfig();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', action: onOpenSettings },
    { icon: <Key className="w-5 h-5" />, label: 'API Keys', action: () => {} },
    { icon: <Brain className="w-5 h-5" />, label: 'LLM Settings', action: () => {} },
    { icon: <Sliders className="w-5 h-5" />, label: 'Agentic Settings', action: () => {} },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="p-0">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className={`w-[300px] sm:w-[400px] ${config.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Menu</h2>
          <Button variant="ghost" onClick={() => setIsOpen(false)} className="p-0">
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav>
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left"
                  onClick={() => {
                    item.action();
                    setIsOpen(false);
                  }}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default HamburgerMenu;