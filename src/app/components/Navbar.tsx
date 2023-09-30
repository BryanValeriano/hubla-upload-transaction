"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation'; // ensure this import is correct
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const [hiddenMenu, setHiddenMenu] = useState(true);

  const activeLinkStyle = "text-black";
  const inactiveLinkStyle = "text-gray-500 hover:text-black";

  return (
    <nav className="flex items-center justify-between flex-wrap bg-[#dffc79] p-1">
      <div className="flex items-center flex-shrink-0 text-black mr-6">
        <img src="https://assets.website-files.com/61155779df3cb9f240815607/6206aa98efa43a84b2d43f98_HUBLA%20Logo.svg" alt="Logo" className="h-16 w-16 mx-3" />
      </div>

      <button
        type="button"
        className="block lg:hidden px-2 text-gray-500 hover:text-black"
        onClick={() => setHiddenMenu(!hiddenMenu)}
      >
        {/* Here you can insert an icon or some symbol representing the menu */}
        <span className="sr-only">Toggle Menu</span>
        {/* This can be replaced with an actual icon */}
        <span>{hiddenMenu ? '☰' : '✖'}</span>
      </button>

      <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${hiddenMenu ? 'hidden' : ''}`}>
        <div className="text-sm lg:flex-grow">
          <Link href="/upload" className={`block mt-4 lg:inline-block lg:mt-0 ${pathname === "/upload" ? activeLinkStyle : inactiveLinkStyle} mr-4`}>
            Upload
          </Link>
          <Link href="/users" className={`block mt-4 lg:inline-block lg:mt-0 ${pathname === "/users" ? activeLinkStyle : inactiveLinkStyle} mr-4`}>
            Users
          </Link>
          <Link href="/transactions" className={`block mt-4 lg:inline-block lg:mt-0 ${pathname === "/transactions" ? activeLinkStyle : inactiveLinkStyle} mr-4`}>
            Transactions
          </Link>
        </div>
        <div>
          <Link href="https://github.com/BryanValeriano/upload-transaction#readme" className="inline-block text-sm px-2 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-gray-500 hover:bg-none mt-4 mr-2 lg:mt-0">
            Project Documentation
          </Link>
        </div>
      </div>
    </nav>
  );
}
