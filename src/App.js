import {useSelector} from "react-redux";
import './App.css';
import {Form} from "./app/components/Form";

function App() {
    const formState = useSelector(state => state.form);

    return (
        <div className="App">
            <Form/>
            <hr />
            <pre>{"Store state:" + JSON.stringify(formState, null, 2)}</pre>
        </div>
    );
}

export default App;
