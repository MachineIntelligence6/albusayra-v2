import { Label } from "@radix-ui/react-label";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useDispatch } from "react-redux";

const RenderSelectField = ({ name, label, control, errors }) => {
  const dispatch = useDispatch();

  // Cascade
  // const { getIndustryByStatuses } = useSelector((state) => state.dataBankSlice);

  const options = {
    getCountryByStatuses: [
      { id: 1, name: "USA" },
      { id: 2, name: "Canada" },
      { id: 3, name: "India" },
    ],

    getStateByStatuses: [
      { id: 1, name: "California", countryId: 1 },
      { id: 2, name: "Texas", countryId: 1 },
      { id: 3, name: "Ontario", countryId: 2 },
      { id: 4, name: "Quebec", countryId: 2 },
      { id: 5, name: "Maharashtra", countryId: 3 },
    ],

    getCityByStatuses: [
      { id: 1, name: "Los Angeles", stateId: 1 },
      { id: 2, name: "San Francisco", stateId: 1 },
      { id: 3, name: "Houston", stateId: 2 },
      { id: 4, name: "Toronto", stateId: 3 },
      { id: 5, name: "Montreal", stateId: 4 },
      { id: 6, name: "Mumbai", stateId: 5 },
    ],
  };

  const [filteredStates, setFilteredStates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [isStateDisabled, setIsStateDisabled] = useState(true);
  const [isCityDisabled, setIsCityDisabled] = useState(true);

  const onCountryChange = (countryId) => {
    const states = options.getStateByStatuses.filter(
      (state) => state.countryId === parseInt(countryId)
    );
    setFilteredStates(states);
    setIsStateDisabled(false);
    setFilteredCities([]); // Reset cities
    setIsCityDisabled(true); // Disable city dropdown
  };

  const onStateChange = (stateId) => {
    const cities = options.getCityByStatuses.filter(
      (city) => city.stateId === parseInt(stateId)
    );
    setFilteredCities(cities);
    setIsCityDisabled(false);
  };
  // Cascade

  return (
    <>
      <div className="flex flex-row items-center gap-[70px]">
        <Label className="min-w-[220px]">
          {label} <span className="text-red-500">*</span>
        </Label>
        <div className="w-full">
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  name === "country"
                    ? onCountryChange(value)
                    : onStateChange(value);
                }}
                defaultValue={field.value}
                disabled={
                  name === "state"
                    ? isStateDisabled
                    : name === "city"
                    ? isCityDisabled
                    : false
                }
              >
                <SelectTrigger
                  className={`w-full ${
                    errors[name] ? "border-red-500" : "border-[#2F2B3D40]"
                  }`}
                >
                  <SelectValue placeholder={`Select ${label}`} />
                </SelectTrigger>
                <SelectContent>
                  {name === "city"
                    ? filteredCities.map((item, idx) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))
                    : name == "state"
                    ? filteredStates.map((item, idx) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))
                    : options.getCountryByStatuses.map((item, idx) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors[name] && (
            <span className="text-red-500 text-sm">
              {errors[name]?.message}
            </span>
          )}
        </div>
      </div>
    </>
  );
};
export default RenderSelectField;
