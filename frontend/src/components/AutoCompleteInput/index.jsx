import * as React from "react";

import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import { debounce } from "@mui/material/utils";
import ListSubheader from "@mui/material/ListSubheader";
import Popper from "@mui/material/Popper";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme, styled } from "@mui/material/styles";
import { VariableSizeList } from "react-window";
import { faToEnDigit } from "@/helpers";

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: style.top + LISTBOX_PADDING,
  };

  if (dataSet.hasOwnProperty("group")) {
    return (
      <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    );
  }

  return (
    <Typography component="li" {...dataSet[0]} noWrap style={inlineStyle}>
      {`#${dataSet[2] + 1} - ${dataSet[1]}`}
    </Typography>
  );
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef(function OuterElementRef(props, ref) {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(
  function ListboxComponent(props, ref) {
    const { children, ...other } = props;
    const itemData = [];
    children.forEach((item) => {
      itemData.push(item);
      itemData.push(...(item.children || []));
    });

    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
      noSsr: true,
    });
    const itemCount = itemData.length;
    const itemSize = smUp ? 36 : 48;

    const getChildSize = (child) => {
      if (child.hasOwnProperty("group")) {
        return 48;
      }

      return itemSize;
    };

    const getHeight = () => {
      if (itemCount > 8) {
        return 8 * itemSize;
      }
      return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
    };

    const gridRef = useResetCache(itemCount);

    return (
      <div ref={ref}>
        <OuterElementContext.Provider value={other}>
          <VariableSizeList
            itemData={itemData}
            height={getHeight() + 2 * LISTBOX_PADDING}
            width="100%"
            ref={gridRef}
            outerElementType={OuterElementType}
            innerElementType="ul"
            itemSize={(index) => getChildSize(itemData[index])}
            overscanCount={5}
            itemCount={itemCount}
          >
            {renderRow}
          </VariableSizeList>
        </OuterElementContext.Provider>
      </div>
    );
  },
);

ListboxComponent.propTypes = {
  children: PropTypes.node,
};

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
});

export default function AutoCompleteInput(props) {
  const [options, setOptions] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [value, setValue] = React.useState(null);

  const fetchWrapper = React.useMemo(
    () =>
      debounce(async (query, callback) => {
        setIsLoading(true);
        const url = `http://localhost:8080/api/students/suggest?q=${query}`;
        const response = await fetch(url);
        callback(await response.json());
        setIsLoading(false);
      }, 400),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (inputValue === "") {
      setOptions([]);
      return undefined;
    }

    fetchWrapper(faToEnDigit(inputValue), (result) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (result) {
          newOptions = [...newOptions, ...result];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetchWrapper]);

  return (
    <Autocomplete
      sx={{ width: 300, mt: 2 }}
      disableListWrap
      PopperComponent={StyledPopper}
      ListboxComponent={ListboxComponent}
      options={options}
      loading={isLoading}
      getOptionLabel={(opt) => opt.national_code}
      value={value}
      onInputChange={(_event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={(_event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        props.onChange(newValue);
      }}
      loadingText="درحال پردازش..."
      filterOptions={(x) => x}
      noOptionsText="چیزی پیدا نشد!"
      renderInput={(params) => <TextField {...params} label="کد ملی" />}
      renderOption={(props, option, state) => [
        props,
        `${option.national_code} - ${option.first_name} ${option.last_name}`,
        state.index,
      ]}
    />
  );
}
