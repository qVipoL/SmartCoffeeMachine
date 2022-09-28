import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React, { FC, useEffect, useState } from "react";
import { Wrapper } from "src/components/layout/Wrapper";
import { CoffeeOrderService } from "src/services/CoffeeOrderService";
import { CreateCoffeeOrderModal } from "src/components/organisms/Modals/CreateCoffeeOrderModal";
import CoffeeOrderDto from "src/dto/CoffeeOrder";

const columns = [
  {
    field: "fullname",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 200,
  },
  {
    field: "time",
    headerName: "Order Time",
    width: 250,
    editable: false,
  },
  {
    field: "type",
    headerName: "Coffee Type",
    width: 200,
    editable: false,
  },
  {
    field: "status",
    headerName: "Order Status",
    width: 200,
    editable: false,
  },
];

const HomePage: FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [activeOrders, setActiveOrders] = useState([] as CoffeeOrderDto[]);
  const [last30DaysOrders, setLast30DaysOrders] = useState(
    [] as CoffeeOrderDto[]
  );

  useEffect(() => {
    const loadOrders = async () => {
      const activeOrders = await CoffeeOrderService.getActiveOrders();
      const last30DaysOrders = await CoffeeOrderService.getLast30Days();

      setActiveOrders(
        activeOrders.map((order) => {
          return { ...order, time: new Date(order.time).toLocaleString() };
        })
      );
      setLast30DaysOrders(
        last30DaysOrders.map((order) => {
          return { ...order, time: new Date(order.time).toLocaleString() };
        })
      );
    };

    loadOrders();
  }, [isModalOpen]);

  return (
    <Wrapper>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Typography
          variant={"h3"}
          component={"h1"}
          color={"black"}
          fontWeight={500}
        >
          Smart Coffee Machine
        </Typography>
      </Box>
      <Typography
        variant={"h4"}
        component={"h3"}
        color={"black"}
        fontWeight={500}
        sx={{ mt: 3 }}
      >
        Orders In Progress
      </Typography>
      <Box height={"250px"} sx={{ mt: 1 }}>
        <DataGrid
          rows={activeOrders}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </Box>
      <Typography
        variant={"h4"}
        component={"h3"}
        color={"black"}
        fontWeight={500}
        sx={{ mt: 3 }}
      >
        Orders In Past 30 Days
      </Typography>
      <Box height={"300px"} sx={{ mt: 1 }}>
        <DataGrid
          rows={last30DaysOrders}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          sx={{
            mt: 4,
            fontWeight: 500,
            textTransform: "none",
            fontSize: "20px",
          }}
          variant="contained"
          onClick={() => {
            setModalOpen(true);
          }}
          size={"large"}
        >
          Create Coffee Order
        </Button>
      </Box>
      <CreateCoffeeOrderModal
        open={isModalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      />
    </Wrapper>
  );
};

export default HomePage;
