type Props = {
    position: {beginPoint : {x: number, y: number}, endPoint : {x: number, y: number}};
}

function Line({ position }: Props) {
    const deltaX = position.endPoint.x - position.beginPoint.x;
    const deltaY = position.endPoint.y - position.beginPoint.y;
    const heightBar = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angleInRadians = Math.atan2(deltaY, deltaX);
    const angleInDegrees = angleInRadians * (180 / Math.PI);
    const angleBar = angleInDegrees;

    const styleBarPosition = {
        left: `${position.beginPoint.x - 5}px`,
        top: `${position.beginPoint.y}px`,
        height: `${heightBar}px`,
        transform: `rotate(${angleBar}deg)`
    };

    return (
        <div className="line" style={styleBarPosition}>
            <div>Linea 1</div>
        </div>
    )
}

export default Line;