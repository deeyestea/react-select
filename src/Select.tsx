import Styles from './Select.module.css';

type SelectOption = {
    label: string;
    value: any;
};

type SelectProps = {
    value?: SelectOption;
    onChange: (value: SelectOption | undefined) => void;
    options: SelectOption[];
};

const Select = ({ value, onChange, options }: SelectProps) => {
    return (
        <div tabIndex={0} className={Styles.container}>
            <span className={Styles.value}>Value</span>
            <button className={Styles['clear-btn']}>&times;</button>
            <div className={Styles.divider}></div>
            <div className={Styles.caret}></div>
            <ul className={`${Styles.options} ${Styles.show}`}>
                {options?.map((option) => (
                    <li key={option.label} className={Styles.option}>
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Select;
