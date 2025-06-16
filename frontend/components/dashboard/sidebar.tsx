"use client"
import { motion, AnimatePresence } from "framer-motion"
import {
  Home,
  Car,
  CreditCard,
  User,
  Settings,
  LogOut,
  ChevronRight,
  Clock,
  History,
  Star,
  MapPin,
  X,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function DashboardSidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname()

  const sidebarLinks = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Find Parking", icon: Car, path: "/parking" },
    { name: "My Bookings", icon: Clock, path: "/bookings" },
    { name: "Payment Methods", icon: CreditCard, path: "/payments" },
    { name: "History", icon: History, path: "/history" },
    { name: "Profile", icon: User, path: "/profile" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ]

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  }

  const overlayVariants = {
    open: { opacity: 1, display: "block" },
    closed: {
      opacity: 0,
      transitionEnd: {
        display: "none",
      },
    },
  }

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/70 z-40 md:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className="fixed md:relative z-50 h-full w-64 bg-gray-900 border-r border-gray-800 overflow-y-auto"
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
      >
        {/* Close button (mobile only) */}
        <div className="absolute top-4 right-4 md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2 p-6">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">P</span>
          </div>
          <h1 className="text-2xl font-bold gradient-text">ParkSmart</h1>
        </div>

        {/* User Info */}
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-gray-400">john.doe@example.com</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-6">
          <ul className="space-y-1">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.path

              return (
                <li key={link.name}>
                  <Link href={link.path}>
                    <div
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                        isActive
                          ? "bg-purple-600/20 text-purple-400"
                          : "text-gray-400 hover:bg-gray-800 hover:text-white"
                      }`}
                    >
                      <link.icon className="h-5 w-5" />
                      <span>{link.name}</span>
                      {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Saved Locations */}
        <div className="px-6 py-4 border-t border-gray-800">
          <h3 className="text-sm font-medium text-gray-400 mb-3">SAVED LOCATIONS</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm text-gray-300">
              <MapPin className="h-4 w-4 text-purple-400" />
              <span>Work - Downtown Office</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-300">
              <MapPin className="h-4 w-4 text-purple-400" />
              <span>Home - Riverside Apartments</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-300">
              <MapPin className="h-4 w-4 text-purple-400" />
              <span>Gym - Fitness Center</span>
            </li>
          </ul>
        </div>

        {/* Recent Activity */}
        <div className="px-6 py-4 border-t border-gray-800">
          <h3 className="text-sm font-medium text-gray-400 mb-3">RECENT ACTIVITY</h3>
          <ul className="space-y-3">
            <li className="text-sm">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-3 w-3 text-purple-400" />
                <span className="text-gray-300">Downtown Garage</span>
              </div>
              <p className="text-xs text-gray-500">Booked 2 hours ago</p>
            </li>
            <li className="text-sm">
              <div className="flex items-center gap-2 mb-1">
                <Star className="h-3 w-3 text-purple-400" />
                <span className="text-gray-300">Central Mall Parking</span>
              </div>
              <p className="text-xs text-gray-500">Rated 5 stars yesterday</p>
            </li>
          </ul>
        </div>

        {/* Logout */}
        <div className="px-6 py-4 border-t border-gray-800 mt-auto">
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white">
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </div>
      </motion.div>
    </>
  )
}

