import { useRef, useState } from "react";
import { PointPosition } from "../App";
import Point from "./Point";
import DivisionText from "./DivisionText";

type Props = {
    positionLine: { beginPoint: { x: number, y: number }, endPoint: { x: number, y: number } };
    action: string;
    sliceNumber: number;
}

function Line({ positionLine, action, sliceNumber }: Props) {
    const deltaX = positionLine.endPoint.x - positionLine.beginPoint.x;
    const deltaY = positionLine.endPoint.y - positionLine.beginPoint.y;
    const heightBar = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angleInRadians = Math.atan2(deltaY, deltaX);
    const angleInDegrees = angleInRadians * (180 / Math.PI);
    const angleBar = angleInDegrees;

    const [divisionPoints, setDivisionPoints] = useState<PointPosition[]>([]);
    const [textPositions, setTextPositions] = useState<PointPosition[]>([]);

    const styleBarPosition = {
        left: `${positionLine.beginPoint.x - 5}px`,
        top: `${positionLine.beginPoint.y}px`,
        height: `${heightBar}px`,
        transform: `rotate(${angleBar}deg)`
    };

    const inputStyle = {
        transform: `rotate(${angleBar < 0 && angleBar > -90 ? 90 : angleBar < -90 && angleBar > -180 ? -90 : angleBar > 0 && angleBar < 90 ? 90 : -90}deg)`,
    };

    const refTotalSizeLine = useRef<HTMLInputElement>(null);
    const [sliceText, setSliceText] = useState<string>();

    function handleClick() {
        let numberPoints = [];
        if (action == "divide") {
            console.log(sliceNumber);
            console.log("divide");
            const vector = {
                x: positionLine.endPoint.x - positionLine.beginPoint.x,
                y: positionLine.endPoint.y - positionLine.beginPoint.y,
            };

            console.log(vector);

            const step = {
                x: vector.x / (sliceNumber),
                y: vector.y / (sliceNumber),
            };


            for (let i = 1; i < sliceNumber; i++) {
                const point = {
                    x: positionLine.beginPoint.x + (step.x * i),
                    y: positionLine.beginPoint.y + (step.y * i),
                };
                numberPoints.push(point);
                console.log(point);
                console.log("for");
            }

            setDivisionPoints(numberPoints);

            let allPoints = [positionLine.beginPoint, ...numberPoints, positionLine.endPoint];
            console.log(allPoints, "all");

            const textPositionsStore = []

            for (let i = 0; i < allPoints.length - 1; i++) {
                const midpoint = {
                    x: ((allPoints[i].x + allPoints[i + 1].x) / 2),
                    y: ((allPoints[i].y + allPoints[i + 1].y) / 2),
                };
                textPositionsStore.push(midpoint);
            }
            setTextPositions(textPositionsStore);
            console.log(textPositions, "TEXT");

            if (refTotalSizeLine.current) {
                const sliceTextNumber = ((parseFloat(refTotalSizeLine.current.value) / (sliceNumber)).toFixed(2));
                setSliceText(sliceTextNumber);
            }
        }
    }

    return (
        <div>
            <div className="division-points">
                {divisionPoints.map((point, i: number) => <div key={i}><Point positionPoint={point} isDivisionPoint={true} /></div>)}
            </div>
            <div>
                {textPositions.map((point, i: number) => <div key={i}><DivisionText positionPoint={point} text={sliceText || ''} /></div>)}
            </div>
            <div className="line" style={styleBarPosition} onClick={handleClick}>
                <div className="line-info" style={inputStyle}>
                    <input ref={refTotalSizeLine} type="text" className="input-line"></input>
                    <p className="input-info">{`${divisionPoints.length + 1} ${divisionPoints.length + 1 == 1 ? "parte" : "partes"} de ${sliceText == undefined ? 0 : sliceText}`}</p>
                </div>
            </div>
        </div>

    )
}

export default Line;