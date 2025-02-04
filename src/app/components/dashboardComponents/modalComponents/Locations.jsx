import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { locationSchema } from "@/utils/schemas/dashboardSchema";
import { useDispatch, useSelector } from "react-redux";
import { getCityByCountryId } from "@/redux/reducers/dataBank/dataBankThunk";
import { Item, Separator } from "@radix-ui/react-select";

function Locations({
  countryId,
  setCountryId,
  editDetails,
  setTabs,
  finalSubmit,
  onClose,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { getCityByCountry } = useSelector((state) => state.dataBankSlice); // Assuming cities are stored in state.city

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(locationSchema),
    defaultValues: {
      locations: [],
    },
  });

  const selectedLocations = watch("locations") || [];

  const handleLocationChange = (cityId, checked) => {
    // Update selected locations
    const newLocations = checked
      ? [...selectedLocations, cityId] // Add city ID
      : selectedLocations.filter((id) => id !== cityId); // Remove city ID

    console.log("newLocations", newLocations);
    setValue("locations", newLocations);
    // setValue("locations", newLocations, { shouldValidate: true });
  };

  // Set locations from edit details (if provided)
  useEffect(() => {
    if (editDetails?.listCompanyLocation) {
      const cityIds = editDetails?.listCompanyLocation.map(
        (location) => location.cityId
      );
      setValue("locations", cityIds);
    }
  }, [setValue, editDetails]);

  const prepareFinalData = (locationData, editDetails) => {
    // Convert old data to a map for quick lookup
    const oldLocationsMap = new Map(
      (editDetails?.listCompanyLocation || []).map((location) => [
        location.cityId,
        location,
      ])
    );

    // Prepare merged data
    const mergedData = locationData.map((location) => {
      const oldLocation = oldLocationsMap.get(location.cityId); // Get old data for this cityId
      return {
        id: oldLocation?.id || null, // Use old `id` if exists
        companyId: oldLocation?.companyId || null, // Use old `companyId` if exists
        ...location, // Override with updated location data
      };
    });

    return mergedData;
  };

  const onSubmitForm = (data) => {
    // const params = data?.locations?.map((cityId) => {
    //   const cityDetails = getCityByCountry.find((city) => city.id === cityId);
    //   console.log("cityDetails", cityDetails);
    //   return {
    //     countryId: countryId,
    //     cityId: cityDetails?.id,
    //     stateId: cityDetails?.state?.id,
    //   };
    // });

    // // Prepare updated locations array
    // const updatedLocations = data?.locations?.map((cityId) => {
    //   const cityDetails = getCityByCountry.find((city) => city.id === cityId);

    //   console.log(cityDetails);
    //   return {
    //     cityId: cityDetails?.id,
    //     stateId: cityDetails?.state?.id,
    //     countryId: countryId, // Add country ID
    //   };
    // });

    // Prepare updated locations array
    const updatedLocations = data?.locations
      ?.map((cityId) => {
        const cityDetails = getCityByCountry.find((city) => city.id === cityId);

        console.log(cityDetails);

        return cityDetails
          ? {
              cityId: cityDetails.id, // Add city ID if available
              stateId: cityDetails.state?.id || "", // Add state ID if available
              countryId: countryId, // Add country ID
            }
          : null; // Return null if cityDetails is undefined
      })
      .filter(Boolean); // Remove null values from the array

    // Merge updated locations with old data
    const finalLocations = prepareFinalData(updatedLocations, editDetails);

    finalSubmit(finalLocations);
  };

  // Get country ID from localStorage and fetch cities on mount
  useEffect(() => {
    const storedCountryId = countryId;
    if (storedCountryId) {
      dispatch(getCityByCountryId({ statuses: 1, parentId: storedCountryId }));
    }
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      {/* <div className="text-[#2F2B3D] text-[14px] font-medium leading-[24px] py-2">
        Country: {countryId ? "Loading..." : "Please select a country"}
      </div> */}

      <Separator />

      <div className="grid grid-cols-4 gap-5 py-5">
        {getCityByCountry && getCityByCountry.length > 0 ? (
          getCityByCountry.map((city) => (
            <div key={city.id} className="flex items-center space-x-2">
              <Checkbox
                id={city.id}
                checked={selectedLocations.includes(city.id)} // Use city ID to check
                onCheckedChange={
                  (checked) => handleLocationChange(city.id, checked) // Use city ID in handler
                }
                className="border-[1px] border-[#2F2B3D66]"
              />
              <label htmlFor={city.id}>{city.cityName}</label>{" "}
              {/* Show city name */}
            </div>
          ))
        ) : (
          <div>No cities available</div>
        )}
      </div>

      {errors.locations && (
        <span className="text-red-500 text-sm block mt-2">
          {errors.locations.message}
        </span>
      )}

      <Separator className="my-5 mt-10" />

      <div className="flex flex-row items-center justify-between mt-5">
        <Button
          type="button"
          variant="outlined"
          className="flex flex-row items-center border-[1px] border-[#FF4C51] text-[#FF4C51]"
          onClick={onClose}
        >
          <div className="bg-[#FF4C51] p-[2px] rounded-full">
            <X className="text-white" />
          </div>
          Cancel
        </Button>

        <div className="flex flex-row items-center gap-5">
          <Button type="button" onClick={() => setTabs("contact")}>
            Back
            <ArrowLeft className="text-white" />
          </Button>

          <Button
            type="submit"
            className="bg-[#104774]"
            disabled={selectedLocations.length === 0}
          >
            Save
            <Check className="text-white" />
          </Button>
        </div>
      </div>
    </form>
  );
}

export default Locations;
