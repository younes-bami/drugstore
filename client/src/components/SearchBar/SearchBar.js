import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  searchBar: {
    marginBottom: 20,
  },
}));

const SearchBar =({ onSearchChange }) => {
  const classes = useStyles();

  const handleSearchChange = (event) => {
    onSearchChange(event.target.value);
  };

  return (
    <TextField
      className={classes.searchBar}
      fullWidth
      variant="outlined"
      placeholder="Search by name, address, city, or neighborhood"
      onChange={handleSearchChange}
    />
  );
};

SearchBar.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
};

export default SearchBar;
