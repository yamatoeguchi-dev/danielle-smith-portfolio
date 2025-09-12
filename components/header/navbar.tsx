'use client';

import {useState} from 'react';

import { Menu } from 'lucide-react';
import Link from 'next/link';

import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from '../ui/separator';


export const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full m-0 md:mt-3 px-4 md:px-8 max-w-7xl">

      {/* Mobile Menu */}
      <div className="md:hidden absolute right-4 top-3">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTitle className="hidden"></SheetTitle>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-20 h-20" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 px-4">
            <div className="flex flex-col items-start justify-start w-full h-full">
              <ul className="flex flex-col space-y-4 mt-8 w-full">
                <label className="text-lg font-semibold mb-2">My Work</label>
                <Separator className='mt-0 w-full' />
                <li>
                  <Link
                    href="/social"
                    className="text-lg text-gray-700 hover:text-blue-500"
                    onClick={() => setOpen(false)}
                  >
                    Social Media
                  </Link>
                </li>
                <li>
                  <Link
                    href="/digital"
                    className="text-lg text-gray-700 hover:text-blue-500"
                    onClick={() => setOpen(false)}
                  >
                    Digital Writing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/project-leadership"
                    className="text-lg text-gray-700 hover:text-blue-500"
                    onClick={() => setOpen(false)}
                  >
                    Project Leadership
                  </Link>
                </li>
              </ul>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Menu */}
      <ul className='hidden w-full md:flex md:flex-row justify-start items-start gap-10'>
        <li>
          <Link
            href="/social"
            className="text-lg text-gray-700 hover:text-blue-500"
            onClick={() => setOpen(false)}
          >
            Social Media
          </Link>
        </li>
        <li>
          <Link
            href="/digital"
            className="text-lg text-gray-700 hover:text-blue-500"
            onClick={() => setOpen(false)}
          >
            Digital Writing
          </Link>
        </li>
        <li>
          <Link
            href="/project-leadership"
            className="text-lg text-gray-700 hover:text-blue-500"
            onClick={() => setOpen(false)}
          >
            Project Leadership
          </Link>
        </li>
      </ul>
    </nav>
  );
};
