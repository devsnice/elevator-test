import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


// Components
import Elevator from '../../components/Elevator/Elevator.js';
import ElevatorPanel from '../../components/ElevatorPanel/ElevatorPanel.js';
import ElevatorFloors from '../../components/ElevatorFloors/ElevatorFloors.js';
import ElevatorProcessor from '../../components/ElevatorProcessor/ElevatorProcessor.js';

// actions
import * as evelatorActions from './redux/actions.js';

class ElevatorContainer extends React.Component {

  static propTypes = {
    nextFloors: React.PropTypes.array,
    nextFloorsSimplify: React.PropTypes.array,
    isOpen: React.PropTypes.bool,
    currentFloor: React.PropTypes.number,
    speedInSeconds: React.PropTypes.number,
    actions: React.PropTypes.object,
  }

  actionNextFloor = () => {
    this.props.actions.tryToMoveElevator();
  }

  actionCallToFloor = (floorCall) => {
    this.props.actions.callToFloorElevator(floorCall);
  }

  render() {
    const { isOpen, currentFloor, speedInSeconds, nextFloors, nextFloorsSimplify } = this.props;

    return (
      <section className="flex-row align-center justify-center" style={{ height: '100%' }}>
        <Elevator
          isOpen={isOpen}
          currentFloor={currentFloor}
        >
          <ElevatorProcessor
            nextFloors={nextFloorsSimplify}
            speedInSeconds={speedInSeconds}
            actionNextFloor={this.actionNextFloor}
          />
        </Elevator>

        <ElevatorPanel
          actionCallToFloor={this.actionCallToFloor}
          nextFloors={nextFloorsSimplify}
        />

        <ElevatorFloors
          actionCallToFloor={this.actionCallToFloor}
          nextFloors={nextFloors}
        />
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const nextFloorsSimplify = nextFloors => (nextFloors.map(floor => (floor.number)));

  return {
    ...state,
    nextFloorsSimplify: nextFloorsSimplify(state.nextFloors),
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(evelatorActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ElevatorContainer);
