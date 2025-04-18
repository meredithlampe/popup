import { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

interface Popup {
  id: number
  x: number
  y: number
  closeType: 'drag' | 'rotate' | 'doubleClick' | 'hold'
  currentRotation?: number
  startAngle?: number
  rotationThreshold?: number
}

interface PopupArtProps {
  data: {
    frequency?: number
  }
}

export default function PopupArt({ data }: PopupArtProps) {
  const [popups, setPopups] = useState<Popup[]>([])
  const [counter, setCounter] = useState(0)
  const frequency = data?.frequency ?? 3

  useEffect(() => {
    const interval = setInterval(() => {
      const newPopup: Popup = {
        id: counter,
        x: Math.random() * (window.innerWidth - 300),
        y: Math.random() * (window.innerHeight - 200),
        closeType: ['drag', 'rotate', 'doubleClick', 'hold'][
          Math.floor(Math.random() * 4)
        ] as Popup['closeType'],
        currentRotation: 0,
        startAngle: 0,
        rotationThreshold: Math.floor(Math.random() * 180) + 90, // Random number between 90 and 270 degrees
      }
      setPopups((prev) => [...prev, newPopup])
      setCounter((prev) => prev + 1)
    }, frequency * 1000)

    return () => clearInterval(interval)
  }, [counter, frequency])

  const handleClose = (id: number) => {
    setPopups((prev) => prev.filter((popup) => popup.id !== id))
  }

  const updateRotation = (id: number, angle: number, startAngle: number) => {
    // Calculate the total rotation from the start angle
    let totalRotation = Math.abs(angle - startAngle)
    // Normalize to 0-360 range
    totalRotation = totalRotation % 360
    // Take the shortest path (e.g., 270° is the same as -90°)
    if (totalRotation > 180) {
      totalRotation = 360 - totalRotation
    }

    setPopups((prev) =>
      prev.map((popup) =>
        popup.id === id ? { ...popup, currentRotation: totalRotation } : popup,
      ),
    )
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {popups.map((popup) => (
        <motion.div
          key={popup.id}
          className="absolute p-4 bg-white rounded-lg shadow-lg cursor-pointer select-none"
          style={{ left: popup.x, top: popup.y }}
          drag={popup.closeType === 'drag'}
          dragConstraints={{
            left: 0,
            right: window.innerWidth - 300,
            top: 0,
            bottom: window.innerHeight - 200,
          }}
          onDragEnd={(event, info) => {
            if (
              Math.abs(info.offset.x) > 100 ||
              Math.abs(info.offset.y) > 100
            ) {
              handleClose(popup.id)
            }
          }}
          onDoubleClick={() =>
            popup.closeType === 'doubleClick' && handleClose(popup.id)
          }
          onMouseDown={() => {
            if (popup.closeType === 'hold') {
              setTimeout(() => handleClose(popup.id), 2000)
            }
          }}
          {...(popup.closeType === 'rotate' && {
            drag: false,
            dragListener: false,
            onMouseDown: (event) => {
              const element = event.currentTarget
              if (!element) return

              const rect = element.getBoundingClientRect()
              const centerX = rect.left + rect.width / 2
              const centerY = rect.top + rect.height / 2
              const startAngle =
                Math.atan2(event.clientY - centerY, event.clientX - centerX) *
                (180 / Math.PI)

              // Update the popup with the start angle
              setPopups((prev) =>
                prev.map((p) => (p.id === popup.id ? { ...p, startAngle } : p)),
              )

              const handleMouseMove = (moveEvent: MouseEvent) => {
                if (!element.isConnected) {
                  document.removeEventListener('mousemove', handleMouseMove)
                  document.removeEventListener('mouseup', handleMouseUp)
                  return
                }

                const rect = element.getBoundingClientRect()
                const centerX = rect.left + rect.width / 2
                const centerY = rect.top + rect.height / 2
                const angle =
                  Math.atan2(
                    moveEvent.clientY - centerY,
                    moveEvent.clientX - centerX,
                  ) *
                  (180 / Math.PI)
                element.style.transform = `rotate(${angle}deg)`
                updateRotation(popup.id, angle, startAngle)
              }

              const handleMouseUp = (upEvent: MouseEvent) => {
                if (!element.isConnected) {
                  document.removeEventListener('mousemove', handleMouseMove)
                  document.removeEventListener('mouseup', handleMouseUp)
                  return
                }

                const rect = element.getBoundingClientRect()
                const centerX = rect.left + rect.width / 2
                const centerY = rect.top + rect.height / 2
                const angle =
                  Math.atan2(
                    upEvent.clientY - centerY,
                    upEvent.clientX - centerX,
                  ) *
                  (180 / Math.PI)
                const totalRotation = Math.abs(angle - startAngle) % 360
                if (totalRotation >= (popup.rotationThreshold || 180)) {
                  handleClose(popup.id)
                }
                document.removeEventListener('mousemove', handleMouseMove)
                document.removeEventListener('mouseup', handleMouseUp)
              }

              document.addEventListener('mousemove', handleMouseMove)
              document.addEventListener('mouseup', handleMouseUp)
            },
          })}
        >
          <div className="w-64 h-32 flex flex-col items-center justify-center">
            <p className="text-center text-gray-600">
              {popup.closeType === 'drag' && 'Drag me away to close'}
              {popup.closeType === 'rotate' && (
                <>
                  <div>Rotate me {popup.rotationThreshold}° to close</div>
                  <div className="text-sm mt-2">
                    Current rotation: {Math.round(popup.currentRotation || 0)}°
                  </div>
                </>
              )}
              {popup.closeType === 'doubleClick' && 'Double click to close'}
              {popup.closeType === 'hold' && 'Hold for 2 seconds to close'}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
