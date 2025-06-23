import React from 'react';

import { Menu } from 'lucide-react';

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from '../ui/separator';


export const Navbar: React.FC = () => {
  return (
    <nav className="w-full m-0 md:mt-3 sm:px-20 lg:px-30 xl:px-40">

      {/* Mobile Menu */}
      <div className="md:hidden absolute right-4 top-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 px-4">
            <ul className="flex flex-col space-y-4 mt-8">
              <label className="text-lg font-semibold mb-2">My Work</label>
              <Separator className='mt-0' />
              <li><a href="#" className="hover:text-blue-500">Social Media</a></li>
              <li><a href="#" className="hover:text-blue-500">Digital Writing</a></li>
              <li><a href="#" className="hover:text-blue-500">Project Leadership</a></li>
            </ul>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Menu */}
      <ul className='hidden w-full md:flex md:flex-row justify-start items-start gap-10'>
        <li><a href="#" className="hover:text-blue-500">Social Media</a></li>
        <li><a href="#" className="hover:text-blue-500">Digital Writing</a></li>
        <li><a href="#" className="hover:text-blue-500">Project Leadership</a></li>
      </ul>
    </nav>
  );
};
