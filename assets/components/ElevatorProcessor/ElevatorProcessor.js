class ElevatorProcessor extends React.Component {

  static elevatorInterval = 0;

  static propTypes = {
    nextFloors: React.PropTypes.array,
    speedInSeconds: React.PropTypes.string,
    actionNextFloor: React.PropTypes.function
  }

  state = {
    isRunningNow: false
  }

  componentWillUnmount() {
    clearInterval(this.elevatorInterval);
  }

  componentWillReceiveProps({nextFloors}) {
    if(nextFloors.length) {
      if(!this.state.isRunningNow) {
        this.handlerElevatorStart();
      }
    }
    else {
      if(this.state.isRunningNow) {
        this.handlerElevatorStop();
      }
    }
  }

  handlerElevatorStart = () => {
    this.elevatorInterval = setInterval(() => {
      this.props.actionNextFloor();
    }, this.props.speedInSeconds);

    this.setState({
      isRunningNow: true
    });
  }

  handlerElevatorStop = () => {
    clearInterval(this.elevatorInterval);

    this.setState({
      isRunningNow: false
    })
  }

  render() {
    return null;
  }
}
export default ElevatorProcessor;
