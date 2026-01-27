import { useEffect, useState } from 'react';
import Styles from './Select.module.css';

type SelectOption = {
    label: string;
    value: string | number;
};

type SelectProps = {
    value?: SelectOption;
    onChange: (value: SelectOption | undefined) => void;
    options: SelectOption[];
};

const Select = ({ value, onChange, options }: SelectProps) => {
    const [isOpen, setOpen] = useState<Boolean>(false);
    const [hightLightedIndex, setHighlightedIndex] = useState(0);

    const clearOptions = () => {
        onChange(undefined);
    };

    const selectOption = (option: SelectOption) => {
        if (option !== value) onChange(option);
    };

    const isOptionSelected = (option: SelectOption) => {
        return option === value;
    };

    useEffect(() => {
        if (isOpen) setHighlightedIndex(0);
    }, [isOpen]);

    return (
        <div
            onBlur={() => setOpen(false)}
            onClick={() => setOpen((prev) => !prev)}
            tabIndex={0}
            className={Styles.container}
        >
            <span className={Styles.value}>{value?.label}</span>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    clearOptions();
                }}
                className={Styles['clear-btn']}
            >
                &times;
            </button>
            <div className={Styles.divider}></div>
            <div className={Styles.caret}></div>
            <ul className={`${Styles.options} ${isOpen ? Styles.show : ''}`}>
                {options?.map((option, index) => (
                    <li
                        onClick={(e) => {
                            e.stopPropagation();
                            selectOption(option);
                            setOpen(false);
                        }}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        key={option.value}
                        className={`${Styles.option} ${
                            isOptionSelected(option) ? Styles.selected : ''
                        } ${
                            index === hightLightedIndex
                                ? Styles.highlighted
                                : ''
                        }`}
                    >
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Select;
