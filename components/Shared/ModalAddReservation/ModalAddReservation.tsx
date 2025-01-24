import { Button } from "@/components/ui/button";
import { ModalAddReservationProps } from "./ModalAddReservation.types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Bobecars, Car } from "@prisma/client";
import { CalendarSelector } from "./CalendarSelector";
import { addDays } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import axios from "axios";
import { useToast } from "@/hooks/use-toast"

export function ModalAddReservation(props: ModalAddReservationProps) {
  const { car } = props;
  const [dateSelected, setDateSelected] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(),
    to: addDays(new Date(), 5),
  });

  const { toast } = useToast()

  const handleReserveVehicle = () => {
    const phoneNumber = "1136936750";
    const message = `Hola, me gustaría reservar el vehículo ${car.name}.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  const onReserveCar = async (car: Bobecars, dateSelected: DateRange) => {
    const response = await axios.post("/api/checkout", {
      carId: car.id,
      price: car.price,
      startDate: dateSelected.from,
      endDate: dateSelected.to,
      carName: car.name,
    });

    window.location = response.data.url;
    toast({
      title: "Car reserved ✌🏽",
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="w-full mt-3"  onClick={handleReserveVehicle}>
          Reservar vehículo 
        </Button>
      </AlertDialogTrigger>
      {/* <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Selecciona las fechas en las quieres alquilar el coche
          </AlertDialogTitle>
          <AlertDialogDescription>
            <CalendarSelector
              setDateSelected={setDateSelected}
              carPriceDay={car.priceDay}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onReserveCar(car, dateSelected)}>
            Reservar vehículo
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent> */}
    </AlertDialog>
  );
}
