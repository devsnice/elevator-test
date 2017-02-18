
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


// Components
import Elevator from '../../components/Elevator/Elevator.js';
import ElevatorPanel from '../../components/ElevatorPanel/ElevatorPanel.js';
import ElevatorFloors from '../../components/ElevatorFloors/ElevatorFloors.js';

// actions
import * as evelatorActions from './redux/actions.js';

class ElevatorContainer extends React.Component {
  componentDidMount() {
    // it isn't a right solution, we should run this timeout only when somebody calls the elevator
    this.elevatorInterval = setInterval(() => {
      this.actionNextFloor();
    }, this.props.elevator.speedInSeconds);
  }

  componentWillUnmount() {
    clearInterval(this.elevatorInterval);
  }

  actionNextFloor = () => {
    this.props.actions.tryToMoveElevator();
  }

  actionCallToFloor = (floorNumber) => {
    this.props.actions.callToFloorElevator(floorNumber);
  }

  render() {
    const { elevator, actions } = this.props;

    return (
      <section className="flex-row align-center justify-center" style={{ height: '100%' }}>
        <Elevator
          isOpen={elevator.isOpen}
          currentFloor={elevator.currentFloor}
        />

        <ElevatorPanel
          actionCallToFloor={this.actionCallToFloor}
          nextFloors={elevator.nextFloors}
        />

        <ElevatorFloors
          actions={actions}
          nextFloors={elevator.nextFloors}
        />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  elevator: state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(evelatorActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ElevatorContainer);
