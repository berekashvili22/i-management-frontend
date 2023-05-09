import { ICreateInventory, IGetInventories } from "../types/inventory.types";

/**
 * Get inventory data
 */
export const GetInventories = async (
  page: number,
  location: string,
  filterField: string,
  filterOrder: string
): Promise<IGetInventories> => {
  let url = `http://localhost:3000/inventories?page=${page}`;

  if (location) {
    url += `&location=${location}`;
  }

  if (filterField) {
    url += `&sortField=${filterField}`;
  }

  if (filterOrder) {
    url += `&sortOrder=${filterOrder}`;
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await res.json();
};

/**
 * Create inventory
 * @param data - inventory data
 */
export const CreateInventory = async (data: ICreateInventory) => {
  let url = `http://localhost:3000/inventories`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res.status === 201;
  } catch (e) {
    console.log("🚀 ~ file: index.ts:48 ~ deleteInventory ~ e:", e);
    return false;
  }
};

/**
 * Deletes inventory
 * @param id - id of inventory to delete
 */
export const deleteInventory = async (id: number) => {
  let url = `http://localhost:3000/inventories/${id}`;

  try {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.status === 200;
  } catch (e) {
    console.log("🚀 ~ file: index.ts:48 ~ deleteInventory ~ e:", e);
    return false;
  }
};

/**
 * Generates inventories
 * @param amount - amount of inventories to create
 */
export const generateInventories = async (amount: number): Promise<boolean> => {
  let url = `http://localhost:3000/inventories/createRandomInventories/${amount}`;

  await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return true;
};
