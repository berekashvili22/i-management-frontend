import * as React from "react";

import { ICreateInventory } from "../types/inventory.types";

import { availableLocationsOptions } from "../../../data";
import { CreateInventory } from "../api";

interface Errors {
  name?: string;
  price?: string;
  location?: string;
}

interface CreateInventoryFormProps {}

const defaultFormValues: ICreateInventory = {
  name: "",
  price: 0,
  location: availableLocationsOptions[0].value,
};

const CreateInventoryForm: React.FC<CreateInventoryFormProps> = () => {
  const [formValues, setFormValues] =
    React.useState<ICreateInventory>(defaultFormValues);
  const [errors, setErrors] = React.useState<Errors>({});

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    const newValue = name === "price" ? parseFloat(value) : value;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      const created = await CreateInventory(formValues);

      if (created) {
        setFormValues(defaultFormValues);
      }
    }
  };

  const validateForm = (): Errors => {
    const errors: Errors = {};

    if (!formValues.name.trim()) {
      errors.name = "სახელი სავალდებულოა";
    }
    if (!formValues.price) {
      errors.price = "ფასი სავალდებულოა";
    }
    if (!formValues.location.trim()) {
      errors.location = "ადგილმდებარეობა სავალდებულოა";
    }

    return errors;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          სახელი
        </label>
        <input
          type="text"
          className={`form-control ${errors.name && "is-invalid"}`}
          id="name"
          name="name"
          value={formValues.name}
          onChange={handleInputChange}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          ფასი
        </label>
        <input
          type="number"
          className={`form-control ${errors.price && "is-invalid"}`}
          id="price"
          name="price"
          value={formValues.price}
          onChange={handleInputChange}
        />
        {errors.price && <div className="invalid-feedback">{errors.price}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="location" className="form-label">
          ადგილმდებარეობა
        </label>
        <select
          className={`form-select ${errors.location && "is-invalid"}`}
          id="location"
          name="location"
          value={formValues.location}
          onChange={handleInputChange}
        >
          {availableLocationsOptions.map(({ value, title }) => (
            <>
              <option value={value}>{title}</option>
            </>
          ))}
        </select>
        {errors.location && (
          <div className="invalid-feedback">{errors.location}</div>
        )}
      </div>
      <button type="submit" className="btn btn-primary">
        დამატება
      </button>
    </form>
  );
};

export default CreateInventoryForm;
