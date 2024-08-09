type Props = {
    positionPoint: {x: number, y: number};
}

function Point({positionPoint} : Props) {

    const stylePointPosition = {
        left: `${positionPoint.x - 10}px`,
        top: `${positionPoint.y - 10}px`,
    }

    return (
        <div className="point" style={stylePointPosition}>
        </div>
    )
}

export default Point;