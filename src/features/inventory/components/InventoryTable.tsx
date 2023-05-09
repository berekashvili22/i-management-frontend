import * as React from "react";
import { Inventory } from "../types/inventory.types";

interface InventoryTableProps {
  inventories: Inventory[];
  handleInventoryDelete: (id: number) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({
  inventories,
  handleInventoryDelete,
}) => {
  return (
    <table className="table table-striped table-sm table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">სახელი</th>
          <th scope="col">ფასი</th>
          <th scope="col">ადგილმდებარეობა</th>
          <th scope="col">ოპერაციები</th>
        </tr>
      </thead>
      <tbody>
        {inventories.length ? (
          inventories.map((inventory, index) => (
            <tr key={inventory.id}>
              <th scope="row">{index + 1}</th>
              <td>{inventory.name}</td>
              <td>{inventory.price} ₾</td>
              <td>{inventory.location}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleInventoryDelete(inventory.id)}
                >
                  წაშლა
                </button>
              </td>
            </tr>
          ))
        ) : (
          <p className="mt-2 mb-2">ინვენტარი ვერ მოიძებნა...</p>
        )}
      </tbody>
    </table>
  );
};

export default InventoryTable;
