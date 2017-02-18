import ReactDOM from 'react-dom';
import './scss/main.scss';

// Redux
import { Provider } from 'react-redux';
import store from './store.js';

// Containers
import ElevatorContainer from './containers/ElevatorContainer/ElevatorContainer.js';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ElevatorContainer />
      </Provider>
    );
  }
}

const container = document.querySelector('#elevator');
ReactDOM.render(<App />, container);
