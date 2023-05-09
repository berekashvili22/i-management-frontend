import * as React from "react";

import { generateInventories } from "../api";

const GenerateRandomInventory = () => {
  const [numInventories, setNumInventories] = React.useState<number>(300);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumInventories(parseInt(event.target.value));
  };

  const handleGenerateInventories = async () => {
    await generateInventories(numInventories);
    setNumInventories(0);
  };

  return (
    <div className="mt-5">
      <h3>დააგენერირე ინვენტარი</h3>
      <label htmlFor="numInventories" className="me-2">
        ინვენტარის რაოდენობა:
      </label>
      <input
        type="number"
        id="numInventories"
        name="numInventories"
        value={numInventories}
        onChange={handleInputChange}
        className="form-control me-2"
        min={1}
      />
      <button
        className="btn btn-primary mt-2"
        onClick={() => handleGenerateInventories()}
      >
        დაგენერირება
      </button>
    </div>
  );
};

export default GenerateRandomInventory;
