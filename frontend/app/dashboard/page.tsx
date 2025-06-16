"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, MapPin, Sliders, Clock, DollarSign, Car, X, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import dynamic from "next/dynamic"
import Link from "next/link"
import DashboardSidebar from "@/components/dashboard/sidebar"

// Dynamically import the map component to avoid SSR issues
const ParkingMap = dynamic(() => import("@/components/map/parking-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  ),
})

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
      }
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return (
    <div className="flex h-screen overflow-hidden bg-black">
      {/* Mobile Sidebar Toggle */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-gray-900/80 backdrop-blur-md"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <DashboardSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-4 z-10"
        >
          <div className="relative max-w-3xl mx-auto">
            <div className="flex items-center bg-gray-900 border border-gray-800 rounded-lg p-2">
              <div className="flex-1 flex items-center">
                <Search className="h-5 w-5 text-gray-400 ml-2 mr-3" />
                <Input
                  type="text"
                  placeholder="Search for parking locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-gray-400">
                  <MapPin className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400">
                  <Sliders className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400">
                  <Clock className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400">
                  <DollarSign className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 relative"
        >
          <ParkingMap />

          {/* Floating Info Panel */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-2xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gray-900/90 backdrop-blur-md border border-gray-800 rounded-lg p-4"
            >
              <h3 className="text-lg font-semibold mb-2">Popular Parking Areas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link href="/parking/downtown" className="block">
                  <div className="bg-gray-800 rounded-md p-3 hover:bg-gray-700 transition-colors">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">Downtown Garage</span>
                      <span className="text-green-500 text-sm">15 slots</span>
                    </div>
                    <div className="text-sm text-gray-400 flex items-center">
                      <Car className="h-3 w-3 mr-1" />
                      <span>$2.50/hr</span>
                    </div>
                  </div>
                </Link>
                <Link href="/parking/mall" className="block">
                  <div className="bg-gray-800 rounded-md p-3 hover:bg-gray-700 transition-colors">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">Central Mall</span>
                      <span className="text-yellow-500 text-sm">3 slots</span>
                    </div>
                    <div className="text-sm text-gray-400 flex items-center">
                      <Car className="h-3 w-3 mr-1" />
                      <span>$3.00/hr</span>
                    </div>
                  </div>
                </Link>
                <Link href="/parking/station" className="block">
                  <div className="bg-gray-800 rounded-md p-3 hover:bg-gray-700 transition-colors">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">Metro Station</span>
                      <span className="text-red-500 text-sm">Full</span>
                    </div>
                    <div className="text-sm text-gray-400 flex items-center">
                      <Car className="h-3 w-3 mr-1" />
                      <span>$1.75/hr</span>
                    </div>
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

