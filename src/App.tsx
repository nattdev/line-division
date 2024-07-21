import { useEffect, useRef, useState } from 'react'
import './App.css'
import Line from './components/Line';

interface Point {
  x: number;
  y: number;
}

interface PositionBar {
  beginPoint: { x: number, y: number };
  endPoint: { x: number, y: number };
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
  const [selectedPoints, setSelectedPoints] = useState(0);
  const [isDynamicBar, setIsDynamicBar] = useState(true);
  const [beginPoint, setBeginPoint] = useState<Point>({ x: 0, y: 0 });
  const [endPoint, setEndPoint] = useState<Point>({ x: 0, y: 0 });
  const [isCreatedLine, setIsCreatedLine] = useState(false);
  const [lines, setLines] = useState<PositionBar[]>([]);

  function selectPoint(e: React.MouseEvent<HTMLCanvasElement>) {
    const x = e.clientX;
    const y = e.clientY;

    points.forEach(point => {
      if (Math.abs(x - point.x) < 15 && Math.abs(y - point.y) < 15) {
        console.log(`Selected Point: (${point.x}, ${point.y})`);
        let totalPoints = selectedPoints + 1;
        setSelectedPoints(totalPoints);
        setIsSelected(true);
        setSelectedPositionX(point.x - 10);
        setSelectedPositionY(point.y - 10);
        if (totalPoints == 1) {
          setBeginPoint({ x: point.x, y: point.y });
        } else {
          setEndPoint({ x: point.x, y: point.y });
          setIsDynamicBar(false);
          setIsCreatedLine(true);
          const newLine = {beginPoint : {x: beginPoint.x, y: beginPoint.y}, endPoint : {x: point.x, y: point.y}};
          setLines([...lines, newLine]);
          setIsSelected(false);
          setSelectedPoints(0);
        }
      }
    });
  }

  function cleanScreen() {
    canvasContext?.clearRect(0, 0, window.innerWidth, window.innerHeight - 30);
    setLines([]);
  }

  function handleClick(e: React.MouseEvent<HTMLCanvasElement>) {
    if (canvasContext) {
      switch (action) {
        case "selection":
          setIsSelected(false);
          setSelectedPoints(0);
          setIsDynamicBar(true);
          setDynamicHeightBar(0);
          selectPoint(e);
          if(isCreatedLine) {
            setIsCreatedLine(false);
          }
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
    left: `${selectedPositionX}px`,
    top: `${selectedPositionY}px`
  };

  const [dynamicHeightBar, setDynamicHeightBar] = useState(0);
  const [dynamicAngleBar, setDynamicAngleBar] = useState(0);

  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    if (isSelected && isDynamicBar) {
      const x = e.clientX - 10;
      const y = e.clientY - 10;

      const deltaX = x - selectedPositionX;
      const deltaY = y - selectedPositionY;

      const angleInRadians = Math.atan2(deltaY, deltaX);

      const angleInDegrees = angleInRadians * (180 / Math.PI);

      setDynamicAngleBar(angleInDegrees);
      console.log(x, y);
      console.log(e);
      setDynamicHeightBar((Math.sqrt(deltaX * deltaX + deltaY * deltaY)) - 20)
    }
  }

  const dynamicBarPosition = {
    left: `${beginPoint.x - 5}px`,
    top: `${beginPoint.y}px`,
    height: `${dynamicHeightBar}px`,
    transform: `rotate(${dynamicAngleBar}deg)`
  };

  return (
    <div>
      <canvas ref={canvasRef} onClick={handleClick} onMouseMove={handleMouseMove}>
      </canvas>
      <div>
        <button onClick={handleClickSelection}>Seleccionar</button>
        <button onClick={handleClickCreate}>Crear Punto</button>
        <button onClick={cleanScreen}>Limpiar</button>
      </div>
      <div>
        {isSelected ? <div className={isSelected && action == "selection" ? "selected" : "hide"} style={dynamicPosition}></div> : ""}
        {isSelected ? <div className={isSelected && action == "selection" ? "line" : "hide"} style={dynamicBarPosition}></div> : ""}
      </div>
      <div>
        {lines.map((line, i : number) => <div key={i}><Line positionLine={line}/></div>)}
      </div>
    </div>
  )
}

export default App;
