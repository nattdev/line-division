import { useEffect, useRef, useState } from 'react'
import './App.css'

interface Point {
  x: number;
  y: number;
}

function App() {

  const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      canvas.width = windowWidth;
      canvas.height = windowHeight - 30;

      const context = canvas?.getContext("2d") || null;
      setCanvasContext(context);
    }
  }, [canvasRef]);

  const [points, setPoints] = useState<Point[]>([]);
  const [action, setAction] = useState("");

  function createPoint(e: React.MouseEvent<HTMLCanvasElement>) {
    if (canvasContext) {
      const x = e.clientX;
      const y = e.clientY;
      const pointPosition = { x, y };
      setPoints([...points, pointPosition]);
      canvasContext.beginPath();
      canvasContext.arc(pointPosition.x, pointPosition.y, 10, 0, 2 * Math.PI);
      canvasContext.fill();
    }
  }

  const [isSelected, setIsSelected] = useState(false);
  const [selectedPositionX, setSelectedPositionX] = useState(0);
  const [selectedPositionY, setSelectedPositionY] = useState(0);

  function selectPoint(e: React.MouseEvent<HTMLCanvasElement>) {
    const x = e.clientX;
    const y = e.clientY;

    points.forEach(point => {
      if (Math.abs(x - point.x) < 15 && Math.abs(y - point.y) < 15) {
        console.log(`Selected Point: (${point.x}, ${point.y})`);
        setIsSelected(true);
        setSelectedPositionX(point.x);
        setSelectedPositionY(point.y);
      }
    });
  }

  function cleanScreen() {
    canvasContext?.clearRect(0, 0, window.innerWidth, window.innerHeight - 30);
  }

  function handleClick(e: React.MouseEvent<HTMLCanvasElement>) {
    if (canvasContext) {
      switch (action) {
        case "selection":
          selectPoint(e);
          console.log("selection");
          break;
        case "create":
          createPoint(e);
          console.log("create");
          break;
      }
      console.log(e);
    }
  }

  function handleClickSelection() {
    setAction("selection");
  }

  function handleClickCreate() {
    setAction("create");
    setIsSelected(false);
  }

  const dynamicPosition = {
    left: `${selectedPositionX - 10}px`,
    top: `${selectedPositionY - 10}px`
  };

  return (
    <div>
      <canvas ref={canvasRef} onClick={handleClick}>
      </canvas>
      <div>
        <button onClick={handleClickSelection}>Seleccionar</button>
        <button onClick={handleClickCreate}>Crear Punto</button>
        <button onClick={cleanScreen}>Limpiar</button>
      </div>
      <div className={isSelected ? "selected" : "hide"} style={dynamicPosition}></div>
    </div>
  )
}

export default App;
