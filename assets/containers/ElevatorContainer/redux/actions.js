const ELEVATOR = {
  MOVE: 'ELEVATOR_MOVE',
  CALL: 'ELEVATOR_CALL',
  OPEN: 'ELEVATOR_OPEN',
  CLOSE: 'ELEVATOR_CLOSE',
};

export function tryToMoveElevator() {
  return (dispatch, getState) => {
    const elevator = getState();
    let { currentFloor, nextFloors, speedInSeconds } = elevator;

    let elevatorDirection;

        // If an elevator has call on one of the floors
    if (nextFloors.length) {
      const nextElevatorFloor = nextFloors[0];

      if (currentFloor !== nextElevatorFloor) {
        if (currentFloor < nextElevatorFloor) {
          elevatorDirection = 'up';
          currentFloor++;
        } else {
          elevatorDirection = 'down';
          currentFloor--;
        }
      } else {
        elevatorDirection = 'onFloor';
      }
    }

        // If the elevator will move to one of directions and open the door it would close doors
    if (nextFloors.includes(currentFloor)) {
      dispatch(openElevatorDoor());

      setTimeout(() => {
        dispatch(closeElevatorDoor());
      }, speedInSeconds / 2);
    }

    dispatch({
      type: ELEVATOR.MOVE,
      payload: {
        elevatorDirection,
        currentFloor,
      },
    });
  };
}

export function callToFloorElevator(floorNumber) {
  if (!floorNumber) {
    console.error(new Error('floorNumber param is requered'));
  }

  return {
    type: ELEVATOR.CALL,
    floorNumber,
  };
}

export function openElevatorDoor() {
  return {
    type: ELEVATOR.OPEN,
  };
}

export function closeElevatorDoor() {
  return {
    type: ELEVATOR.CLOSE,
  };
}


export default ELEVATOR;
