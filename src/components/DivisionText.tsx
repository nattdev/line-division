type Props = {
    text: string,
    positionPoint: {x: number, y: number},
}

function DivisionText({text, positionPoint} : Props) {

    const styleTextPosition = {
        left: `${positionPoint.x - 20}px`,
        top: `${positionPoint.y - 10}px`,
    }

    return(
        <div className="division-text" style={styleTextPosition}>
            <p>{text}</p>
        </div>
    )
}

export default DivisionText;