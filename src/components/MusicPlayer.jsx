import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true) // Cambiado a true para autoplay
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.3) // Volumen inicial al 30%
  const [hasInteracted, setHasInteracted] = useState(false)
  const audioRef = useRef(null)

  // Intentar reproducir automáticamente cuando el audio esté listo
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Configurar el audio
    audio.volume = volume
    audio.loop = true

    // Función para intentar reproducir
    const attemptPlay = () => {
      if (isPlaying && !isMuted) {
        audio.play()
          .then(() => {
            setHasInteracted(true)
          })
          .catch((error) => {
            // Si falla, esperar a que el usuario interactúe
            console.log('Autoplay bloqueado, esperando interacción del usuario')
            setIsPlaying(false)
          })
      }
    }

    // Intentar reproducir cuando el audio esté listo
    if (audio.readyState >= 2) {
      attemptPlay()
    } else {
      audio.addEventListener('canplaythrough', attemptPlay, { once: true })
    }

    // Manejar errores
    audio.addEventListener('error', (e) => {
      console.error('Error al cargar el audio:', e)
    })

    return () => {
      audio.removeEventListener('canplaythrough', attemptPlay)
      audio.removeEventListener('error', () => {})
    }
  }, [volume, isPlaying, isMuted])

  // Controlar reproducción cuando cambia el estado
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying && !isMuted && hasInteracted) {
      audio.play().catch((error) => {
        console.error('Error al reproducir:', error)
      })
    } else if (!isPlaying || isMuted) {
      audio.pause()
    }
  }, [isPlaying, isMuted, hasInteracted])

  // Intentar reproducir en la primera interacción del usuario
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted && audioRef.current && isPlaying) {
        audioRef.current.play()
          .then(() => {
            setHasInteracted(true)
            setIsPlaying(true)
          })
          .catch((error) => {
            console.log('Error al reproducir en primera interacción:', error)
          })
      }
    }

    // Escuchar varios eventos de interacción
    const events = ['click', 'touchstart', 'keydown', 'scroll']
    events.forEach(event => {
      window.addEventListener(event, handleFirstInteraction, { once: true })
    })

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleFirstInteraction)
      })
    }
  }, [hasInteracted, isPlaying])

  // Actualizar volumen
  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const togglePlay = () => {
    if (!isPlaying) {
      // Intentar reproducir
      const audio = audioRef.current
      if (audio) {
        audio.play().then(() => {
          setIsPlaying(true)
        }).catch((error) => {
          console.log('El usuario debe interactuar primero')
          setIsPlaying(false)
        })
      }
    } else {
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (newVolume > 0) {
      setIsMuted(false)
    }
  }

  return (
    <>
      {/* Audio element oculto */}
      <audio
        ref={audioRef}
        src="/Sonido.wav"
        preload="auto"
        onEnded={() => setIsPlaying(false)}
      />

      {/* Controles de música flotantes */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      >
        {/* Botón Play/Pause principal */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          className={`
            w-14 h-14 rounded-full flex items-center justify-center
            ${isPlaying 
              ? 'bg-cosmic-gold text-cosmic-dark' 
              : 'bg-cosmic-blue/80 border-2 border-cosmic-gold/50 text-cosmic-gold'
            }
            backdrop-blur-sm shadow-lg hover:shadow-xl
            transition-all duration-300
            group
          `}
          title={isPlaying ? 'Pausar música' : 'Reproducir música'}
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.svg
                key="pause"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </motion.svg>
            ) : (
              <motion.svg
                key="play"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="w-6 h-6 ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </motion.svg>
            )}
          </AnimatePresence>

          {/* Indicador de ondas cuando está reproduciendo */}
          {isPlaying && !isMuted && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-full h-full rounded-full border-2 border-current"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
          )}
        </motion.button>

        {/* Controles de volumen (expandibles) */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="flex items-center gap-2 bg-cosmic-blue/80 backdrop-blur-sm rounded-full px-4 py-2 border border-cosmic-gold/30"
            >
              {/* Botón mute */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMute}
                className="text-cosmic-gold hover:text-yellow-400 transition-colors"
                title={isMuted ? 'Activar sonido' : 'Silenciar'}
              >
                {isMuted ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                )}
              </motion.button>

              {/* Slider de volumen */}
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-cosmic-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 9v6h4l5 5V4l-5 5H7z" />
                </svg>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-cosmic-gold/30 rounded-lg appearance-none cursor-pointer accent-cosmic-gold"
                  style={{
                    background: `linear-gradient(to right, #f4c867 0%, #f4c867 ${(isMuted ? 0 : volume) * 100}%, rgba(244, 200, 103, 0.3) ${(isMuted ? 0 : volume) * 100}%, rgba(244, 200, 103, 0.3) 100%)`
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}

export default MusicPlayer

