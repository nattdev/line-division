import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      canvas.width = windowWidth;
      canvas.height = windowHeight;

      const context = canvas?.getContext("2d") || null;
      setCanvasContext(context);
    }
  }, [canvasRef]);

  return (
    <div>
      <canvas ref={canvasRef}>
      </canvas>
    </div>
  )
}

export default App;
