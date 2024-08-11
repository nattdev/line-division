import { useState } from "react";
import { PointPosition } from "../App";
import Point from "./Point";

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

    const styleBarPosition = {
        left: `${positionLine.beginPoint.x - 5}px`,
        top: `${positionLine.beginPoint.y}px`,
        height: `${heightBar}px`,
        transform: `rotate(${angleBar}deg)`
    };

    const inputStyle = {
        transform: `rotate(${angleBar < 0 && angleBar > -90 ? 180 : angleBar < -90 && angleBar > -180 ? -180 : angleBar > 0 && angleBar < 90 ? -360 : 360}deg)`,
    };


    function handleClick() {
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

            let numberPoints = [];

            for (let i = 1; i < sliceNumber; i++) {
                const point = {
                    x: positionLine.beginPoint.x + (step.x * i) ,
                    y: positionLine.beginPoint.y + (step.y * i) ,
                };
                numberPoints.push(point);
                console.log(point);
                console.log("for");
            }

            setDivisionPoints(numberPoints);
        }
    }

    return (
        <div>
            <div>
                {divisionPoints.map((point, i: number) => <div key={i}><Point positionPoint={point} /></div>)}
            </div>
            <div className="line" style={styleBarPosition} onClick={handleClick}>
                <input type="text" className="input-line" style={inputStyle}></input>
            </div>
        </div>

    )
}

export default Line;