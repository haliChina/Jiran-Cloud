import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TypeWriterProps {
  lines: string[]
  speed?: number
  delay?: number
  className?: string
  prefix?: string
}

export function TypeWriter({ lines, speed = 40, delay = 800, className, prefix = '> ' }: TypeWriterProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentLine >= lines.length) {
      setIsComplete(true)
      return
    }

    if (currentChar < lines[currentLine].length) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev]
          newLines[currentLine] = lines[currentLine].slice(0, currentChar + 1)
          return newLines
        })
        setCurrentChar(c => c + 1)
      }, speed)
      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      setCurrentLine(l => l + 1)
      setCurrentChar(0)
    }, delay)

    return () => clearTimeout(timer)
  }, [currentLine, currentChar, lines, speed, delay])

  return (
    <div className={className}>
      {displayedLines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="font-mono text-sm"
        >
          <span className="text-quantum-green">{prefix}</span>
          <span className="text-quantum-text/70">{line}</span>
          {i === currentLine && !isComplete && (
            <motion.span
              className="ml-0.5 inline-block h-4 w-2 bg-quantum-green"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          )}
        </motion.div>
      ))}
      {isComplete && (
        <motion.span
          className="ml-0.5 inline-block h-4 w-2 bg-quantum-green"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </div>
  )
}
