import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {FormTextField} from "./FormTextField";

describe('FormTextField component', () => {
    it('renders without crashing', () => {
        render(<FormTextField value="" name="test" label="Test" onChange={() => {
        }}/>);
        expect(screen.getByLabelText('Test')).toBeInTheDocument();
    });

    it('displays the correct label', () => {
        render(<FormTextField value="" name="test" label="Test Label" onChange={() => {
        }}/>);
        expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('calls onChange handler on user input', () => {
        const onChange = jest.fn();
        const {getByLabelText} = render(<FormTextField value="" name="test" label="Test" onChange={onChange}/>);
        userEvent.type(getByLabelText('Test'), 'Hello, World!');
        expect(onChange).toBeCalled();
    });
});