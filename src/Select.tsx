import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import Styles from './Select.module.css';

export type SelectOption = {
    label: string;
    value: string | number;
};

type MultiSelectProps = {
    multiple: true;
    value?: SelectOption[];
    onChange: (value: SelectOption[]) => void;
};

type SingleSelectProps = {
    multiple?: false;
    value?: SelectOption;
    onChange: (value: SelectOption | undefined) => void;
};

type SelectProps = {
    options: SelectOption[];
} & (SingleSelectProps | MultiSelectProps);

const Select = ({ multiple, value, onChange, options }: SelectProps) => {
    const [isOpen, setOpen] = useState<Boolean>(false);
    const [hightLightedIndex, setHighlightedIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const clearOptions = () => {
        multiple ? onChange([]) : onChange(undefined);
    };

    const selectOption = (option: SelectOption) => {
        if (multiple) {
            const currentValue = value ?? [];
            if (currentValue?.includes(option)) {
                onChange(currentValue.filter((o) => o !== option));
            } else {
                onChange([...currentValue, option]);
            }
        } else {
            if (option !== value) onChange(option);
        }
    };

    const isOptionSelected = (option: SelectOption) => {
        return multiple ? value?.includes(option) : option === value;
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        switch (e.code) {
            case 'Enter':
            case 'Space': {
                e.preventDefault();
                setOpen((prev) => !prev);
                if (isOpen) {
                    selectOption(options[hightLightedIndex]);
                }
                break;
            }

            case 'ArrowUp':
            case 'ArrowDown': {
                e.preventDefault();
                if (!isOpen) {
                    setOpen(true);
                    break;
                }

                const newIndex =
                    hightLightedIndex + (e.code === 'ArrowDown' ? 1 : -1);

                if (newIndex >= 0 && newIndex < options.length) {
                    setHighlightedIndex(newIndex);
                }
                break;
            }

            case 'Escape':
                setOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) setHighlightedIndex(0);
    }, [isOpen]);

    console.log('value', value);

    return (
        <div
            ref={containerRef}
            onKeyDown={handleKeyDown}
            onBlur={() => setOpen(false)}
            onClick={() => setOpen((prev) => !prev)}
            tabIndex={0}
            className={Styles.container}
        >
            <span className={Styles.value}>
                {multiple
                    ? value?.map((v) => (
                          <button
                              key={v.value}
                              onClick={(e) => {
                                  e.stopPropagation();
                                  selectOption(v);
                              }}
                              className={Styles['option-badge']}
                          >
                              {v?.label}
                              <span className={Styles['clear-btn']}>
                                  &times;
                              </span>
                          </button>
                      ))
                    : value?.label}
            </span>
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
