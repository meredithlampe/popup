import { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

interface Popup {
  id: number
  x: number
  y: number
  closeType: 'drag' | 'rotate'
  dragDistance?: number
  dragThreshold?: number
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
        closeType: ['drag', 'rotate'][
          Math.floor(Math.random() * 2)
        ] as Popup['closeType'],
        dragDistance: 0,
        dragThreshold: Math.floor(Math.random() * 200) + 100, // Random number between 100 and 300 pixels
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
    setPopups((prev) =>
      prev.map((popup) => {
        if (popup.id !== id) return popup

        // Calculate the change in angle
        let deltaAngle = angle - startAngle

        // Normalize the delta to be between -180 and 180
        if (deltaAngle > 180) deltaAngle -= 360
        if (deltaAngle < -180) deltaAngle += 360

        // Update the element's rotation
        const newRotation = popup.elementRotation + deltaAngle

        return {
          ...popup,
          elementRotation: newRotation,
          startAngle: angle, // Update start angle for next movement
        }
      }),
    )
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black touch-none">
      {popups.map((popup) => (
        <motion.div
          key={popup.id}
          className="absolute p-4 bg-white rounded-lg shadow-lg cursor-pointer select-none touch-none"
          style={{ left: popup.x, top: popup.y }}
          drag={popup.closeType === 'drag'}
          dragConstraints={{
            left: 0,
            right: window.innerWidth - 300,
            top: 0,
            bottom: window.innerHeight - 200,
          }}
          onDrag={(event, info) => {
            if (popup.closeType === 'drag') {
              const distance = Math.sqrt(
                Math.pow(info.offset.x, 2) + Math.pow(info.offset.y, 2),
              )
              setPopups((prev) =>
                prev.map((p) =>
                  p.id === popup.id ? { ...p, dragDistance: distance } : p,
                ),
              )
            }
          }}
          onDragEnd={(event, info) => {
            if (popup.closeType === 'drag') {
              const distance = Math.sqrt(
                Math.pow(info.offset.x, 2) + Math.pow(info.offset.y, 2),
              )
              if (distance >= (popup.dragThreshold || 200)) {
                handleClose(popup.id)
              }
            }
          }}
          onDoubleClick={() =>
            popup.closeType === 'doubleClick' && handleClose(popup.id)
          }
          onTouchStart={(e) => {
            e.preventDefault()
          }}
          onTouchMove={(e) => {
            e.preventDefault()
          }}
          onTouchEnd={(e) => {
            e.preventDefault()
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
                const totalRotation = Math.abs(angle - startAngle)
                if (totalRotation >= 180) {
                  handleClose(popup.id)
                }
                document.removeEventListener('mousemove', handleMouseMove)
                document.removeEventListener('mouseup', handleMouseUp)
              }

              document.addEventListener('mousemove', handleMouseMove)
              document.addEventListener('mouseup', handleMouseUp)
            },
            onTouchStart: (event) => {
              event.preventDefault()
              const element = event.currentTarget
              if (!element) return

              const rect = element.getBoundingClientRect()
              const centerX = rect.left + rect.width / 2
              const centerY = rect.top + rect.height / 2
              const touch = event.touches[0]
              const startAngle =
                Math.atan2(touch.clientY - centerY, touch.clientX - centerX) *
                (180 / Math.PI)

              const handleTouchMove = (moveEvent: TouchEvent) => {
                if (!element.isConnected) {
                  document.removeEventListener('touchmove', handleTouchMove)
                  document.removeEventListener('touchend', handleTouchEnd)
                  return
                }

                const rect = element.getBoundingClientRect()
                const centerX = rect.left + rect.width / 2
                const centerY = rect.top + rect.height / 2
                const touch = moveEvent.touches[0]
                const angle =
                  Math.atan2(touch.clientY - centerY, touch.clientX - centerX) *
                  (180 / Math.PI)
                element.style.transform = `rotate(${angle}deg)`
              }

              const handleTouchEnd = (endEvent: TouchEvent) => {
                if (!element.isConnected) {
                  document.removeEventListener('touchmove', handleTouchMove)
                  document.removeEventListener('touchend', handleTouchEnd)
                  return
                }

                const rect = element.getBoundingClientRect()
                const centerX = rect.left + rect.width / 2
                const centerY = rect.top + rect.height / 2
                const touch = endEvent.changedTouches[0]
                const angle =
                  Math.atan2(touch.clientY - centerY, touch.clientX - centerX) *
                  (180 / Math.PI)
                const totalRotation = Math.abs(angle - startAngle)
                if (totalRotation >= 180) {
                  handleClose(popup.id)
                }
                document.removeEventListener('touchmove', handleTouchMove)
                document.removeEventListener('touchend', handleTouchEnd)
              }

              document.addEventListener('touchmove', handleTouchMove)
              document.addEventListener('touchend', handleTouchEnd)
            },
          })}
        >
          <div className="w-64 h-32 flex flex-col items-center justify-center">
            <p className="text-center text-gray-600">
              {popup.closeType === 'drag' && (
                <>
                  <div>Drag me {popup.dragThreshold}px to close</div>
                  <div className="text-sm mt-2">
                    Current distance: {Math.round(popup.dragDistance || 0)}px
                  </div>
                </>
              )}
              {popup.closeType === 'rotate' && (
                <>
                  <div>Rotate me 180° to close</div>
                </>
              )}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
