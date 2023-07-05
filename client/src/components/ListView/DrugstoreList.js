// components/ListView/DrugstoreList.js

import React from 'react';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';

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

export default DrugstoreList;
