"use client"

import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { Icon, type LatLngExpression } from "leaflet"
import { useRouter } from "next/navigation"

// Define parking location interface
interface ParkingLocation {
  id: string
  name: string
  position: LatLngExpression
  slots: number
  maxSlots: number
  pricePerHour: number
}

// Custom marker icons
const createIcon = (color: string) => {
  return new Icon({
    iconUrl: `/marker-${color}.png`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  })
}

const greenIcon = createIcon("green")
const yellowIcon = createIcon("yellow")
const redIcon = createIcon("red")

// Function to determine icon based on availability
const getIcon = (slots: number, maxSlots: number) => {
  const percentage = (slots / maxSlots) * 100
  if (percentage > 30) return greenIcon
  if (percentage > 0) return yellowIcon
  return redIcon
}

// Mock parking locations data
const parkingLocations: ParkingLocation[] = [
  {
    id: "downtown",
    name: "Downtown Parking Garage",
    position: [51.505, -0.09],
    slots: 15,
    maxSlots: 50,
    pricePerHour: 2.5,
  },
  {
    id: "mall",
    name: "Central Mall Parking",
    position: [51.51, -0.1],
    slots: 3,
    maxSlots: 100,
    pricePerHour: 3.0,
  },
  {
    id: "station",
    name: "Metro Station P1",
    position: [51.5, -0.08],
    slots: 0,
    maxSlots: 30,
    pricePerHour: 1.75,
  },
  {
    id: "riverside",
    name: "Riverside Parking",
    position: [51.508, -0.11],
    slots: 22,
    maxSlots: 40,
    pricePerHour: 2.0,
  },
  {
    id: "airport",
    name: "Airport Terminal P3",
    position: [51.495, -0.12],
    slots: 8,
    maxSlots: 200,
    pricePerHour: 4.5,
  },
]

// Component to set the map view based on user's location
function SetViewOnUserLocation() {
  const map = useMap()

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          map.setView([latitude, longitude], 13)
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }, [map])

  return null
}

export default function ParkingMap() {
  const router = useRouter()
  const [position, setPosition] = useState<LatLngExpression>([51.505, -0.09])

  const handleMarkerClick = (id: string) => {
    router.push(`/parking/${id}`)
  }

  return (
    <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }} zoomControl={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <SetViewOnUserLocation />

      {parkingLocations.map((location) => (
        <Marker
          key={location.id}
          position={location.position}
          icon={getIcon(location.slots, location.maxSlots)}
          eventHandlers={{
            click: () => handleMarkerClick(location.id),
          }}
        >
          <Popup>
            <div className="text-black">
              <h3 className="font-bold">{location.name}</h3>
              <p className="text-sm">
                {location.slots > 0 ? (
                  <span className="text-green-600">{location.slots} slots available</span>
                ) : (
                  <span className="text-red-600">No slots available</span>
                )}
              </p>
              <p className="text-sm">${location.pricePerHour.toFixed(2)}/hour</p>
              <button
                className="mt-2 bg-purple-600 text-white px-2 py-1 rounded text-xs"
                onClick={(e) => {
                  e.stopPropagation()
                  handleMarkerClick(location.id)
                }}
              >
                View Details
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

