import { floorIncludesInArray } from './reducer.js';

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

    let elevatorDirection,
      indexOfFloorInArray;

    // If an elevator has call on one of the floors
    if (nextFloors.length) {
      const nextElevatorFloor = nextFloors[0].number;

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

    /*
      Elevator stops in two cases

      Somebody calls elevator to floor and wants to goes down, goes up

      1) Elevator now is running to the same directions
      2) Elevator stops on the floor and doesn't have new tasks

    */

    if (elevatorDirection !== 'onFloor') {
      // it's the first case
      indexOfFloorInArray = floorIncludesInArray(nextFloors, {
        number: currentFloor,
        direction: elevatorDirection,
      });
    } else {
      // it's the second case, not to note direction of the elevator
      indexOfFloorInArray = floorIncludesInArray(nextFloors, {
        number: currentFloor,
      });
    }

    if (indexOfFloorInArray !== -1) {
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
        indexOfFloorInArray,
      },
    });
  };
}

export function callToFloorElevator(floorCall) {
  if (!floorCall) {
    throw new Error('floorNumber param is requered');
  }

  return {
    type: ELEVATOR.CALL,
    floorCall,
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
