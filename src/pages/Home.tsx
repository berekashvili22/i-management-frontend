import * as React from "react";

import InventoryTable from "../features/inventory/components/InventoryTable";
import Pagination from "../features/inventory/components/Pagination";

import SelectField from "../components/SelectFiled";

import { IGetInventories } from "../features/inventory/types/inventory.types";

import { GetInventories, deleteInventory } from "../features/inventory/api";
import { availableLocationsOptions } from "../data";
import { Link } from "react-router-dom";

interface HomeProps {}

const defaultData: IGetInventories = {
  inventories: [],
  currentPage: 1,
  totalPages: 0,
  totalInventories: 0,
};

const Home: React.FC<HomeProps> = () => {
  const [data, setData] = React.useState<IGetInventories>(defaultData);
  const [page, setPage] = React.useState<number>(defaultData.currentPage);

  const [filterField, setFilterField] = React.useState<string>("სახელი");
  const [filterOrder, setFilterOrder] = React.useState<string>("ASC");

  const [selectedLocationFilter, setSelectedLocationFilter] =
    React.useState<string>("ყველა");

  React.useEffect(() => {
    getInventoryData();
  }, [page, selectedLocationFilter, filterField, filterOrder]);

  /**
   * Get inventory data
   */
  const getInventoryData = async (): Promise<void> => {
    const res = await GetInventories(
      page,
      selectedLocationFilter,
      filterField,
      filterOrder
    );

    setData(res);
  };

  /**
   * Update page state
   * @param page - requested page
   */
  const handlePageChange = async (page: number): Promise<void> => {
    setPage(page);
    window.scrollTo(0, 0);
  };

  /**
   * Updates selected location
   * @param location - selected location filter
   */
  const handleLocationFilterChange = (location: string): void => {
    setSelectedLocationFilter(location);
  };

  /**
   * Delete inventory
   * @param inventoryId
   */
  const handleInventoryDelete = async (inventoryId: number): Promise<void> => {
    await deleteInventory(inventoryId);

    getInventoryData();
  };

  const handleFilterFieldChange = (value: string): void => {
    setFilterField(value);
  };

  const handleSortOrderChange = (order: string): void => {
    setFilterOrder(order);
  };

  return (
    <div>
      <Link to={"/add"}>
        <button type="button" className="btn btn-primary mb-2">
          დაამატე ინვენტორი
        </button>
      </Link>
      <div>
        <SelectField
          title={"ადგილმდებარეობა"}
          selectedValue={selectedLocationFilter}
          defaultOption={{ title: "ყველა", value: "" }}
          options={[
            { title: "ყველა", value: "" },
            ...availableLocationsOptions,
          ]}
          callBack={handleLocationFilterChange}
        />
        <SelectField
          title={"დალაგება მიხედვით"}
          selectedValue={filterField}
          defaultOption={{ title: "სახელი", value: "name" }}
          options={[
            { title: "სახელი", value: "name" },
            { title: "ფასი", value: "price" },
          ]}
          callBack={handleFilterFieldChange}
        />
        <SelectField
          title={"დალაგების ტიპი"}
          selectedValue={filterField}
          defaultOption={{ title: "ზრდადობით", value: "ASC" }}
          options={[
            { title: "ზრდადობით", value: "ASC" },
            { title: "კლებადობით", value: "DESC" },
          ]}
          callBack={handleSortOrderChange}
        />
      </div>
      <InventoryTable
        inventories={data?.inventories}
        handleInventoryDelete={handleInventoryDelete}
      />
      <div className="d-flex justify-content-between">
        <Pagination
          currentPage={page}
          totalPages={data.totalPages}
          handlePageChange={handlePageChange}
        />
        <p>სულ : {data.totalInventories}</p>
      </div>
    </div>
  );
};

export default Home;
