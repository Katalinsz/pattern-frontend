import React, { useState } from "react";
import logo from "../assets/logo.png";
import bgPattern from "../assets/img.webp";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <main className={`relative ${isOpen ? "h-auto" : "h-[110px]"}`}>
      {/* 🔳 Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center min-h-full rounded-lg transition-all duration-300"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0.2)), url(${bgPattern})`,
        }}
      ></div>

      {/* 🖼️ Desktop Logo */}
      <div className="absolute top-0 left-0 h-[70px] items-center bg-[#fafafa]/90 pl-6 pr-8 rounded-br-[100px] shadow-sm backdrop-blur-sm z-10 hidden md:flex">
        <img src={logo} alt="Logo" className="h-[32px]" />
      </div>

      {/* 🧭 Desktop Nav */}
      <nav className="absolute top-0 right-0 h-[70px] items-center bg-[#fafafa]/90 pl-10 pr-8 rounded-bl-[100px] shadow-sm backdrop-blur-sm z-10 hidden md:flex">
        <ul className="flex gap-8 text-gray-800 font-medium text-base items-center">
          <li>
            <a href="#" className="hover:text-green-600 transition-colors">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-600 transition-colors">
              Library
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-600 transition-colors">
              Create Motive
            </a>
          </li>

          {/* 🧩 Login Dropdown */}
          <li className="relative">
            <details className="dropdown dropdown-end">
              <summary className="bg-green-600 text-white px-4 py-1.5 rounded-full hover:bg-green-700 transition-colors cursor-pointer list-none">
                Login
              </summary>
              <ul className="menu dropdown-content  rounded-box shadow w-52 mt-2 absolute right-0 z-[20]">
                <li>
                  <a href="#">Item 1</a>
                </li>
                <li>
                  <a href="#">Item 2</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </nav>

      {/* 📱 Mobile Top Bar */}
      <div className="flex justify-between items-center md:hidden h-[70px] px-4 absolute top-0 left-0 right-0 z-20">
        <button
          onClick={toggleMenu}
          className="text-gray-800 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <X size={28} className="text-gray-800" />
          ) : (
            <Menu size={28} className="text-gray-800" />
          )}
        </button>
      </div>

      {/* 📱 Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden transition-all duration-300 ease-in-out mt-[70px] bg-white/90 backdrop-blur-sm shadow-md rounded-b-lg px-6 py-4 space-y-4 z-10 relative">
          {/* Mobile Logo */}
          <div className="flex justify-center mb-4">
            <img src={logo} alt="Logo" className="h-[32px]" />
          </div>

          <a href="#" className="block text-gray-800 hover:text-green-600">
            Home
          </a>
          <a href="#" className="block text-gray-800 hover:text-green-600">
            Library
          </a>
          <a href="#" className="block text-gray-800 hover:text-green-600">
            Create Motive
          </a>

          {/* Mobile Login Dropdown */}
          <details className="dropdown">
            <summary className="block text-gray-800 hover:text-green-600 cursor-pointer">
              Login
            </summary>
            <ul className="menu dropdown-content  rounded-box shadow w-52 mt-2">
              <li>
                <a href="#">Item 1</a>
              </li>
              <li>
                <a href="#">Item 2</a>
              </li>
            </ul>
          </details>
        </div>
      )}
    </main>
  );
}
