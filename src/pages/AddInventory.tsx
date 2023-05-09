import * as React from "react";

import { Link } from "react-router-dom";
import CreateInventoryForm from "../features/inventory/components/CreateInventoryForm";
import GenerateRandomInventory from "../features/inventory/components/GenerateRandomInventory";

interface AddInventoryProps {}

const AddInventory: React.FC<AddInventoryProps> = () => {
  return (
    <div>
      <Link to={"/"}>
        <button type="button" className="btn btn-primary mb-2">
          მთავარ გვერდზე დაბრუნება
        </button>
      </Link>
      <CreateInventoryForm />
      <GenerateRandomInventory />
    </div>
  );
};

export default AddInventory;
