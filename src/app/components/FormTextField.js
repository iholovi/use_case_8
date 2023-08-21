export const FormTextField = ({value, name, label, ...custom}) => (
    <div>
        <label htmlFor={name}>{label} </label>
        <input id={name} value={value} name={name} {...custom} type="text"/>
    </div>
);