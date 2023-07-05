import React from 'react';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  drugstoreCard: {
    margin: 10,
    padding: 20,
    border: '1px solid #ddd',
    borderRadius: 4,
  },
}));

const DrugstoreList = ({ drugstores }) => {
  const classes = useStyles();

  return (
    <div>
      {drugstores.map((drugstore, index) => (
        <Card className={classes.drugstoreCard} key={index}>
          <CardContent>
            <Typography variant="h5">{drugstore.name}</Typography>
            <Typography variant="body2">{drugstore.address}</Typography>
            <Typography variant="body2">
              {drugstore.city}, {drugstore.neighborhood}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

DrugstoreList.propTypes = {
  drugstores: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      address: PropTypes.string,
      city: PropTypes.string,
      neighborhood: PropTypes.string,
    })
  ).isRequired,
};

export default DrugstoreList;
