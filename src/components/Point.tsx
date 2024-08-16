type Props = {
    positionPoint: {x: number, y: number};
    isDivisionPoint?: boolean;
}

function Point({positionPoint, isDivisionPoint} : Props) {

    const positionCalculate = isDivisionPoint ? 8 : 10;

    const stylePointPosition = {
        left: `${positionPoint.x - positionCalculate}px`,
        top: `${positionPoint.y - positionCalculate}px`,
    }

    return (
        <div className="point" style={stylePointPosition}>
        </div>
    )
}

export default Point;