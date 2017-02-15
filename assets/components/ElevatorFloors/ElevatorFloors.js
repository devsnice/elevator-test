const ElevatorFloor = ({floorIndex, actionClick}) => {
  return (
     <div className="elevator__panel">
        <div className="elevator__button elevator__button--lg">up</div>
        <br />
        <div className="elevator__button elevator__button--lg">down</div>
      </div>
  )
}

class ElevatorFloors extends React.Component {
  render() {
    return(
      <div className="elevator__floors">
          {[5, 4, 3, 2, 1].map(floorIndex => {
            return (
              <ElevatorFloor
                floorIndex = {floorIndex}
                key = {floorIndex}
              />
            )
          })}
      </div>
    )
  }
}

export default ElevatorFloors;
