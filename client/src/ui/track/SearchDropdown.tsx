"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { CircularProgress,TextFieldProps } from "@mui/material";
import { InputField } from "@/ui/InputField"; // Custom InputField component
import axios from "axios";

/**
 * A custom version of the Autocomplete component with the label designed similarly to the InputField.
 * Funcationality is either API calling or static list of options.
 * @param {TextFieldProps} props - Props for the Autocomplete component, including label, placeholder, required status, and other relevant values.
*/

interface SearchDropdownProps {
  options?: string[]; // The options prop to accept a list of strings
  apiEndpoint?: string; // The API endpoint to fetch the options from
  queryKey?: string; // The query key to use for the API call 
  value: string; // Track the current selected value
  onValueChange: (newValue: string | null) => void; // Handler for value changes
  disabled?: boolean; // Optional disabled prop
  debounceTime?: number; // Optional debounce time for API calls
  useApi?: boolean;
}

export function SearchDropdown({ 
  required, 
  label, 
  placeholder, 
  style, 
  options = [], 
  apiEndpoint,
  queryKey = "name", //default to name since right now we are only fetching name of school
  value, 
  onValueChange, 
  debounceTime = 300,
  useApi = false, //default to false since not everytime we will use API
  disabled = false, 
  ...restProps }: SearchDropdownProps & TextFieldProps) {
  const [dynamicOptions, setDynamicOptions] = useState<string[]>([]); // Options fetched from API
  const [loading, setLoading] = useState(false); // Loading state
  const [query, setQuery] = useState<string>(""); // User's search query
 
  // Fetch options from the API based on the user's input
  const fetchOptions = async (query?: string) => {
    if (!query) {
      setDynamicOptions([]); // Clear options if the query is empty
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(apiEndpoint as string, {
        params: { [queryKey]: query },
      });
      const fetchedOptions = response.data.map((item: { name: string }) => item.name); // Map API response to options
      setDynamicOptions(fetchedOptions);
    } catch (error) {
      console.error("Error fetching options:", error);
      setDynamicOptions([]);
    } finally {
      setLoading(false);
    }
  };


  // Fetch initial options when `useApi` is enabled
  useEffect(() => {
    if (useApi && apiEndpoint) {
      fetchOptions(); // Fetch default API options without a query
    }
  }, [useApi, apiEndpoint]);

  // Debounce input to minimize API calls
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        fetchOptions(query); // Fetch API options only when user types something
      }
    }, debounceTime);

    return () => clearTimeout(delayDebounceFn);
  }, [query, apiEndpoint]);

  // Decide which options to use: static or dynamic
  const finalOptions = query ? dynamicOptions : options;

  return (
    <div style={style}>
      {/* Autocomplete with custom InputField component */}
      <Autocomplete
        disablePortal
        options={finalOptions} // Options will be added later
        value={value} // Bind the value to the current selection
        onInputChange={(event, newInputValue) => {
          if (useApi) setQuery(newInputValue); // Update query only when using API
        }}
        onChange={(event, newValue) => {onValueChange(newValue);}} // Handle the change event
        disabled={disabled} // Pass the disabled prop
        loading={useApi && loading} // Pass the loading
        renderOption={(props, option, index) => (
          <li {...props} key={`${option}-${index}`}>{option}</li>
        )}
        PaperComponent={(props) => (
          <div
            {...props}
            style={{
              boxShadow: "none",
              border: "1px solid rgba(0, 0, 0, 0.12)",
              borderRadius: "8px",
              backgroundColor: "white",
            }}
          />
        )}
        renderInput={(params) => (
          <InputField
            {...params} 
            placeholder={placeholder} 
            label={label} 
            required={required}
            disabled={disabled}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {useApi && loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
            {...restProps} 
          />
        )}
      />
    </div>
  );
}


