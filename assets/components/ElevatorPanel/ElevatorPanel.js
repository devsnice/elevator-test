const ElevatorPanelButton = ({ floorNumber, isActive, onClick }) => {
  const elClassName = cn(['elevator__button', { active: isActive }]);

  return (
    <div
      className={elClassName} onClick={() => {
        !isActive && onClick({
          number: floorNumber,
          direction: 'onFloor',
        });
      }}
    >
      {floorNumber}
    </div>
  );
};

class ElevatorPanel extends React.Component {

  static propTypes = {
    nextFloors: React.PropTypes.array,
    actionCallToFloor: React.PropTypes.func,
  }

  render() {
    const { actionCallToFloor, nextFloors } = this.props;

    return (
      <div className="elevator__panel">
        <ElevatorPanelButton
          floorNumber={5}
          isActive={nextFloors.includes(5)}
          onClick={actionCallToFloor}
        />
        <br />
        <ElevatorPanelButton
          floorNumber={3}
          isActive={nextFloors.includes(3)}
          onClick={actionCallToFloor}
        />
        <ElevatorPanelButton
          floorNumber={4}
          isActive={nextFloors.includes(4)}
          onClick={actionCallToFloor}
        />
        <br />
        <ElevatorPanelButton
          floorNumber={1}
          isActive={nextFloors.includes(1)}
          onClick={actionCallToFloor}
        />
        <ElevatorPanelButton
          floorNumber={2}
          isActive={nextFloors.includes(2)}
          onClick={actionCallToFloor}
        />
      </div>
    );
  }
}

export default ElevatorPanel;
