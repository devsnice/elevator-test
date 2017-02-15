
const ElevatorBoard = ({currentFloor}) => {
   return (
     <div className="elevator__board">
        {currentFloor}
     </div>
   )
}

const Elevator = ({isOpen, currentFloor}) => {

  const elClassName = cn(["elevator", {"elevator--open": isOpen}]);

  return(
    <div className={elClassName}>
        <div className="elevator__people">
          <img src="public/images/hangover.jpg" alt="" />
        </div>

        <ElevatorBoard currentFloor = {currentFloor}/>
    </div>
  )
}

export default Elevator;
