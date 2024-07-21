type Props = {
    positionLine: { beginPoint: { x: number, y: number }, endPoint: { x: number, y: number } };
}

function Line({ positionLine }: Props) {
    const deltaX = positionLine.endPoint.x - positionLine.beginPoint.x;
    const deltaY = positionLine.endPoint.y - positionLine.beginPoint.y;
    const heightBar = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angleInRadians = Math.atan2(deltaY, deltaX);
    const angleInDegrees = angleInRadians * (180 / Math.PI);
    const angleBar = angleInDegrees;

    const styleBarPosition = {
        left: `${positionLine.beginPoint.x - 5}px`,
        top: `${positionLine.beginPoint.y}px`,
        height: `${heightBar}px`,
        transform: `rotate(${angleBar}deg)`
    };

    return (
        <div className="line" style={styleBarPosition}></div>
    )
}

export default Line;