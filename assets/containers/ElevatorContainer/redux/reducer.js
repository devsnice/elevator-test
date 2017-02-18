import ELEVATOR from './actions.js';

// Solution of the second task consist in change of a  nextFloors array structure,
// instead of saving only the number of a floor we will hold information about direction of moving - to down or to up
// and in depends on situation open the elevator only when it goes up or goes down

// for correct working we will normalize the shape of array for our components


const elevatorInitialState = {
  currentFloor: 1,
  nextFloors: [],
  isOpen: false,
  speedInSeconds: 1500,
};

function elevator(state = elevatorInitialState, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case ELEVATOR.MOVE:
      if (action.payload.elevatorDirection) {
        newState.currentFloor = action.payload.currentFloor;

          // elevator on the one of called floors
        if (newState.nextFloors.includes(newState.currentFloor)) {
          const indexOfFloorInArray = newState.nextFloors.indexOf(newState.currentFloor);

          newState.nextFloors = [...newState.nextFloors.slice(0, indexOfFloorInArray),
            ...newState.nextFloors.slice(indexOfFloorInArray + 1)];
        }
      }

      return newState;

    case ELEVATOR.CALL:
      newState.nextFloors = [...newState.nextFloors, action.floorNumber];

      return newState;

    case ELEVATOR.OPEN:
      newState.isOpen = true;

      return newState;

    case ELEVATOR.CLOSE:
      newState.isOpen = false;

      return newState;

    default:
      return newState;
  }
}


export default elevator;
