import React, { useState, useEffect } from "react"

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener(`scroll`, handleScroll, { passive: true })
    return () => window.removeEventListener(`scroll`, handleScroll)
  }, [])

  return (
    <div
      style={{
        position: `fixed`,
        top: 0,
        left: 0,
        height: `3px`,
        width: `${progress}%`,
        background: `linear-gradient(90deg, #28b00c, #3ada10)`,
        zIndex: 9999,
        transition: `width 0.1s linear`,
        borderRadius: `0 2px 2px 0`,
      }}
    />
  )
}

export default ReadingProgress
