"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import LoginModal from "@/components/auth/login-modal"
import { Button } from "@/components/ui/button"

// Dynamically import the map component to avoid SSR issues
const MapWithNoSSR = dynamic(() => import("@/components/map/background-map"), {
  ssr: false,
})

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Map */}
      <div className="absolute inset-0 z-0">
        <MapWithNoSSR />
        <div className="absolute inset-0 map-overlay z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 h-full">
        {/* Header */}
        <header className="flex justify-between items-center p-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <h1 className="text-2xl font-bold gradient-text">ParkSmart</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              onClick={() => setShowLogin(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              Login / Register
            </Button>
          </motion.div>
        </header>

        {/* Main Content */}
        <main className="flex h-[calc(100%-80px)]">
          {/* Left Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-80 bg-gray-900/80 backdrop-blur-md p-6 border-r border-gray-800"
          >
            <h2 className="text-xl font-bold mb-6 gradient-text">Smart Parking Dashboard</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">ACTIVE USERS</h3>
                <p className="text-2xl font-bold">1,248</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">RECENTLY SEARCHED</h3>
                <ul className="space-y-2">
                  <li className="p-2 bg-gray-800/50 rounded-md">Downtown Parking Garage</li>
                  <li className="p-2 bg-gray-800/50 rounded-md">Central Mall Parking</li>
                  <li className="p-2 bg-gray-800/50 rounded-md">Airport Terminal P3</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">NEARBY LOCATIONS</h3>
                <ul className="space-y-2">
                  <li className="p-2 bg-gray-800/50 rounded-md flex justify-between">
                    <span>City Center Parking</span>
                    <span className="text-green-500">12 slots</span>
                  </li>
                  <li className="p-2 bg-gray-800/50 rounded-md flex justify-between">
                    <span>Riverside Parking</span>
                    <span className="text-yellow-500">3 slots</span>
                  </li>
                  <li className="p-2 bg-gray-800/50 rounded-md flex justify-between">
                    <span>Metro Station P1</span>
                    <span className="text-red-500">Full</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Main Content Area */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex-1 flex flex-col items-center justify-center p-6"
          >
            <div className="max-w-2xl text-center">
              <h1 className="text-5xl font-bold mb-6 gradient-text">Find and Book Parking Spots in Real-Time</h1>
              <p className="text-xl text-gray-300 mb-8">
                Discover available parking spaces, book securely, and navigate effortlessly with our smart parking
                solution.
              </p>
              <Button
                onClick={() => setShowLogin(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg neon-glow"
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        </main>
      </div>

      {/* Login Modal */}
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  )
}

