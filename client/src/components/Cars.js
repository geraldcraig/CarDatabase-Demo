import React, { useState, useEffect, useCallback } from "react";
import { SERVER_URL } from "../constants";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCar from "./AddCar";
import EditCar from "./EditCar";
import { CSVLink } from "react-csv";
import { Button, Grid } from "@mui/material";

const toFormCar = (apiCar) => ({
    brand: apiCar.brand ?? "",
    model: apiCar.model ?? "",
    color: apiCar.color ?? "",
    year: apiCar.carYear ?? "",
    price: apiCar.price ?? "",
});

const toApiCar = (formCar) => ({
    brand: formCar.brand,
    model: formCar.model,
    color: formCar.color,
    carYear: Number(formCar.year),
    price: Number(formCar.price),
});

const Cars = () => {
    const [cars, setCars] = useState([]);

    const fetchCars = useCallback(() => {
        fetch(SERVER_URL + "cars")
            .then((response) => {
                if (!response.ok) throw new Error("Failed to fetch cars");
                return response.json();
            })
            .then((responseData) => {
                setCars(Array.isArray(responseData) ? responseData : []);
            })
            .catch((err) => {
                toast.error("Error loading cars", { position: "bottom-left" });
                console.error(err);
            });
    }, []);

    useEffect(() => {
        fetchCars();
    }, [fetchCars]);

    const onDelClick = (id) => {
        if (!window.confirm("Are you sure to delete?")) return;

        fetch(SERVER_URL + `cars/${id}`, { method: "DELETE" })
            .then((res) => {
                if (!res.ok) throw new Error("Delete failed");
                toast.success("Car deleted", { position: "bottom-left" });
                fetchCars();
            })
            .catch((err) => {
                toast.error("Error when deleting", { position: "bottom-left" });
                console.error(err);
            });
    };

    const addCar = (car) => {
        fetch(SERVER_URL + "cars", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(toApiCar(car)),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Create failed");
                fetchCars();
            })
            .catch((err) => {
                toast.error("Error when adding", { position: "bottom-left" });
                console.error(err);
            });
    };

    const updateCar = (car, id) => {
        fetch(SERVER_URL + `cars/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(toApiCar(car)),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Update failed");
                toast.success("Changes saved", { position: "bottom-left" });
                fetchCars();
            })
            .catch((err) => {
                toast.error("Error when saving", { position: "bottom-left" });
                console.error(err);
            });
    };

    const columns = [
        { Header: "Brand", accessor: "brand" },
        { Header: "Model", accessor: "model" },
        { Header: "Color", accessor: "color" },
        { Header: "Year", accessor: "carYear" },
        { Header: "Price €", accessor: "price" },
        {
            Header: "",
            sortable: false,
            filterable: false,
            width: 100,
            accessor: "id",
            Cell: ({ value, original }) => (
                <EditCar
                    car={toFormCar(original)}
                    link={value}
                    updateCar={updateCar}
                    fetchCars={fetchCars}
                />
            ),
        },
        {
            Header: "",
            sortable: false,
            filterable: false,
            width: 100,
            accessor: "id",
            Cell: ({ value }) => (
                <Button size="small" color="secondary" onClick={() => onDelClick(value)}>
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <div className="App">
            <Grid container>
                <Grid item>
                    <AddCar addCar={addCar} fetchCars={fetchCars} />
                </Grid>
                <Grid item style={{ padding: 15 }}>
                    <CSVLink data={cars} separator=";">
                        Export CSV
                    </CSVLink>
                </Grid>
            </Grid>

            <ReactTable data={cars} columns={columns} filterable />
            <ToastContainer autoClose={1500} />
        </div>
    );
};

export default Cars;
