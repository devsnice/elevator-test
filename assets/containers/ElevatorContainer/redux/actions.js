const ELEVATOR = {
  MOVE: "ELEVATOR_MOVE",
  CALL: "ELEVATOR_CALL",
  OPEN: "ELEVATOR_OPEN",
  CLOSE: "ELEVATOR_CLOSE"
}

export function tryToMoveElevator() {

    return (dispatch, getState) => {

        let elevator = getState(),
            {currentFloor, nextFloors, speedInSeconds} = elevator;

        let elevatorDirection;

        // If an elevator has call on one of the floors
        if(nextFloors.length) {
           let nextElevatorFloor = nextFloors[0];

           if(currentFloor !== nextElevatorFloor) {
               if(currentFloor < nextElevatorFloor) {
                 elevatorDirection = "up";
               }
               else {
                 elevatorDirection = "down";
             }
           }
           else {
              elevatorDirection = "onFloor";
           }
        }

        // If the elevator will move to one of directions and open the door it would close doors
        if(elevatorDirection) {
          dispatch(openElevatorDoor());

          setTimeout(() => {
            dispatch(closeElevatorDoor());
          }, speedInSeconds / 2);
        }

        dispatch({
            type: ELEVATOR.MOVE,
            payload: {
              elevatorDirection
            }
        });
    }
}

export function callToFloorElevator(floorNumber) {

    if(!floorNumber) {
       console.error(new Error("floorNumber param is requered"));
    }

    return {
       type: ELEVATOR.CALL,
       floorNumber
    }
}

export function openElevatorDoor() {
  return {
    type: ELEVATOR.OPEN
  }
}

export function closeElevatorDoor() {
  return {
    type: ELEVATOR.CLOSE
  }
}



export default ELEVATOR;
