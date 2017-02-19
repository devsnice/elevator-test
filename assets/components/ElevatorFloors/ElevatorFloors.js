import { floorIncludesInArray } from '../../containers/ElevatorContainer/redux/reducer.js';


const ElevatorFloorButton = ({ type, nextFloors, floorNumber, onClick }) => {
  const isActive = floorIncludesInArray(nextFloors, { number: floorNumber, direction: type }) != -1;
  const elClassName = cn(['elevator__button', 'elevator__button--lg', { active: isActive }]);

  return (
    <div
      className={elClassName}
      onClick={() => { !isActive && onClick(floorNumber, type); }}
    >
      {type}
    </div>
  );
};

ElevatorFloorButton.propTypes = {
  floorNumber: React.PropTypes.number,
  nextFloors: React.PropTypes.array,
  type: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

const ElevatorFloor = ({ floorNumber, nextFloors, actionClick }) => (
  <div className="elevator__panel">
    <ElevatorFloorButton
      type="up"
      floorNumber={floorNumber}
      onClick={actionClick}
      nextFloors={nextFloors}
    />

    <br />

    <ElevatorFloorButton
      type="down"
      floorNumber={floorNumber}
      onClick={actionClick}
      nextFloors={nextFloors}
    />
  </div>
);

ElevatorFloor.propTypes = {
  floorNumber: React.PropTypes.number,
  nextFloors: React.PropTypes.array,
  actionClick: React.PropTypes.func,
};

class ElevatorFloors extends React.Component {

  static propTypes = {
    nextFloors: React.PropTypes.array,
    actionCallToFloor: React.PropTypes.func,
  }

  handlerClickOnFloor = (floorNumber, type) => {
    this.props.actionCallToFloor({
      number: floorNumber,
      direction: type,
    });
  }

  render() {
    const { nextFloors } = this.props;

    return (
      <div className="elevator__floors">
        { [5, 4, 3, 2, 1].map(floorNumber => (
          <ElevatorFloor
            floorNumber={floorNumber}
            actionClick={this.handlerClickOnFloor}
            nextFloors={nextFloors}
            key={floorNumber}
          />
        ),
      )}
      </div>
    );
  }
}

export default ElevatorFloors;
