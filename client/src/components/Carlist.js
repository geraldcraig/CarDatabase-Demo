import React, { useState, useEffect, useCallback } from "react";
import { SERVER_URL } from "../constants";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddCar from './AddCar';
import EditCar from './EditCar';
import { CSVLink } from 'react-csv';
import { Button, Grid } from '@mui/material';

const Carlist = () => {
  const [cars, setCars] = useState([]);

  const fetchCars = useCallback(() => {
    // const token = sessionStorage.getItem("jwt");
    fetch(SERVER_URL + 'cars', {
      // headers: { 'Authorization': token }
    })
        .then((response) => response.json())
        .then((responseData) => {
          setCars(responseData._embedded.cars);
        })
        .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const onDelClick = (link) => {
    if (window.confirm('Are you sure to delete?')) {
      // const token = sessionStorage.getItem("jwt");
      fetch(link, {
        method: 'DELETE',
        // headers: { 'Authorization': token }
      })
          .then(res => {
            toast.success("Car deleted", {
              position: "bottom-left"
            });
            fetchCars();
          })
          .catch(err => {
            toast.error("Error when deleting", {
              position: "bottom-left"
            });
            console.error(err)
          });
    }
  };

  const addCar = (car) => {
    // const token = sessionStorage.getItem("jwt");
    fetch(SERVER_URL + 'api/cars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': token
      },
      body: JSON.stringify(car)
    })
        .then(res => fetchCars())
        .catch(err => console.error(err));
  };

  const updateCar = (car, link) => {
    // const token = sessionStorage.getItem("jwt");
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': token
      },
      body: JSON.stringify(car)
    })
        .then(res => {
          toast.success("Changes saved", {
            position: "bottom-left"
          });
          fetchCars();
        })
        .catch(err =>
            toast.error("Error when saving", {
              position: "bottom-left"
            })
        );
  };

  const columns = [
    { Header: 'Brand', accessor: 'brand' },
    { Header: 'Model', accessor: 'model' },
    { Header: 'Color', accessor: 'color' },
    { Header: 'Year', accessor: 'year' },
    { Header: 'Price €', accessor: 'price' },
    {
      sortable: false,
      filterable: false,
      width: 100,
      accessor: '_links.self.href',
      Cell: ({ value, row }) => (
          <EditCar car={row} link={value} updateCar={updateCar} fetchCars={fetchCars} />
      ),
    },
    {
      sortable: false,
      filterable: false,
      width: 100,
      accessor: '_links.self.href',
      Cell: ({ value }) => (
          <Button size="small" color="secondary" onClick={() => { onDelClick(value) }}>
            Delete
          </Button>
      )
    }
  ];

  return (
      <div className="App">
        <Grid container>
          <Grid item>
            <AddCar addCar={addCar} fetchCars={fetchCars} />
          </Grid>
          <Grid item style={{ padding: 15 }}>
            <CSVLink data={cars} separator=";">Export CSV</CSVLink>
          </Grid>
        </Grid>
        <ReactTable data={cars} columns={columns} filterable={true} />
        <ToastContainer autoClose={1500} />
      </div>
  );
};

export default Carlist;
