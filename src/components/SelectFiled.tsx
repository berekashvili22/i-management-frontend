import * as React from "react";

interface SelectFieldProps {
  title: string;
  selectedValue: any;
  defaultOption: any;
  options: any[];
  callBack: any;
}

const SelectField: React.FC<SelectFieldProps> = ({
  title,
  selectedValue,
  defaultOption,
  options,
  callBack,
}) => {
  return (
    <div className="mb-2">
      <label className="fs-6 mb-2">{title}:</label>
      <select
        className="form-select  w-25"
        onChange={(e) => callBack(e.target.value)}
      >
        {!selectedValue ? (
          <option value={defaultOption.value} selected>
            {defaultOption.title}
          </option>
        ) : (
          ""
        )}
        {options.map(({ value, title }) => (
          <>
            {value === selectedValue ? (
              <option value={value} selected>
                {title}
              </option>
            ) : (
              <option value={value}>{title}</option>
            )}
          </>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
