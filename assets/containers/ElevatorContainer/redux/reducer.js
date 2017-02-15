import ELEVATOR from './actions.js';

const elevatorInitialState = {
    currentFloor: 1,
    nextFloors: [],
    isOpen: false,
    speedInSeconds: 1500
};

function elevator(state = elevatorInitialState, action) {
  let newState = Object.assign({}, state);

  switch (action.type) {
    case ELEVATOR.MOVE:
      if(action.payload.elevatorDirection) {
          //action.payload.elevatorDirection == "up" ? newState.currentFloor++ : newState.currentFloor--;
          if(action.payload.elevatorDirection == "up") {
              newState.currentFloor++;
          }

          if(action.payload.elevatorDirection == "down") {
              newState.currentFloor--;
          }

          // elevator on the one of called floors
          if(newState.nextFloors.includes(newState.currentFloor)) {
              let indexOfFloorInArray = newState.nextFloors.indexOf(newState.currentFloor);

              newState.nextFloors = [...newState.nextFloors.slice(0, indexOfFloorInArray),
                                    ...newState.nextFloors.slice(indexOfFloorInArray+1)];

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
      return newState
  }
}


export default elevator;
