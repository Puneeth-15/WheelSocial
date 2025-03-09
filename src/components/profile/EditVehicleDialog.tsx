import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface VehicleProps {
  id: string;
  name: string;
  type: "motorcycle" | "car";
  make: string;
  model: string;
  year: number;
  color: string;
  images: string[];
  specs: Record<string, string>;
}

interface EditVehicleDialogProps {
  vehicle: VehicleProps | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (vehicle: VehicleProps) => void;
  isNewVehicle?: boolean;
}

const EditVehicleDialog = ({
  vehicle,
  isOpen,
  onClose,
  onSave,
  isNewVehicle = false,
}: EditVehicleDialogProps) => {
  const [name, setName] = React.useState(vehicle?.name || "");
  const [make, setMake] = React.useState(vehicle?.make || "");
  const [model, setModel] = React.useState(vehicle?.model || "");
  const [year, setYear] = React.useState(
    vehicle?.year || new Date().getFullYear(),
  );
  const [color, setColor] = React.useState(vehicle?.color || "");
  const [type, setType] = React.useState<"motorcycle" | "car">(
    vehicle?.type || "motorcycle",
  );

  // Create a state for each spec
  const [engine, setEngine] = React.useState(vehicle?.specs?.Engine || "");
  const [power, setPower] = React.useState(vehicle?.specs?.Power || "");
  const [torque, setTorque] = React.useState(vehicle?.specs?.Torque || "");
  const [transmission, setTransmission] = React.useState(
    vehicle?.specs?.Transmission || "",
  );
  const [fuelCapacity, setFuelCapacity] = React.useState(
    vehicle?.specs?.["Fuel Capacity"] || "",
  );
  const [mileage, setMileage] = React.useState(vehicle?.specs?.Mileage || "");
  const [weight, setWeight] = React.useState(
    vehicle?.specs?.["Kerb Weight"] || "",
  );

  React.useEffect(() => {
    if (vehicle) {
      setName(vehicle.name);
      setMake(vehicle.make);
      setModel(vehicle.model);
      setYear(vehicle.year);
      setColor(vehicle.color);
      setType(vehicle.type);
      setEngine(vehicle.specs.Engine || "");
      setPower(vehicle.specs.Power || "");
      setTorque(vehicle.specs.Torque || "");
      setTransmission(vehicle.specs.Transmission || "");
      setFuelCapacity(vehicle.specs["Fuel Capacity"] || "");
      setMileage(vehicle.specs.Mileage || "");
      setWeight(vehicle.specs["Kerb Weight"] || "");
    }
  }, [vehicle]);

  const handleSave = () => {
    const updatedVehicle: VehicleProps = {
      id: vehicle?.id || `vehicle-${Date.now()}`,
      name,
      type,
      make,
      model,
      year,
      color,
      images: vehicle?.images || [
        "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80",
      ],
      specs: {
        Engine: engine,
        Power: power,
        Torque: torque,
        Transmission: transmission,
        "Fuel Capacity": fuelCapacity,
        Mileage: mileage,
        "Kerb Weight": weight,
      },
    };

    onSave(updatedVehicle);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isNewVehicle ? "Add New Vehicle" : "Edit Vehicle"}
          </DialogTitle>
          <DialogDescription>
            {isNewVehicle
              ? "Add details about your vehicle."
              : "Make changes to your vehicle information here."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              placeholder="My Classic 350"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as "motorcycle" | "car")}
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="motorcycle">Motorcycle</option>
              <option value="car">Car</option>
            </select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="make" className="text-right">
              Make
            </Label>
            <Input
              id="make"
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className="col-span-3"
              placeholder="Royal Enfield"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="model" className="text-right">
              Model
            </Label>
            <Input
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="col-span-3"
              placeholder="Classic 350"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="year" className="text-right">
              Year
            </Label>
            <Input
              id="year"
              type="number"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="col-span-3"
              placeholder="2022"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="color" className="text-right">
              Color
            </Label>
            <Input
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="col-span-3"
              placeholder="Stealth Black"
            />
          </div>

          <div className="border-t pt-4 mt-2">
            <h3 className="font-medium mb-3">Technical Specifications</h3>

            <div className="grid grid-cols-4 items-center gap-4 mb-3">
              <Label htmlFor="engine" className="text-right">
                Engine
              </Label>
              <Input
                id="engine"
                value={engine}
                onChange={(e) => setEngine(e.target.value)}
                className="col-span-3"
                placeholder="349cc, Single Cylinder, 4 Stroke"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4 mb-3">
              <Label htmlFor="power" className="text-right">
                Power
              </Label>
              <Input
                id="power"
                value={power}
                onChange={(e) => setPower(e.target.value)}
                className="col-span-3"
                placeholder="20.2 bhp @ 6100 rpm"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4 mb-3">
              <Label htmlFor="torque" className="text-right">
                Torque
              </Label>
              <Input
                id="torque"
                value={torque}
                onChange={(e) => setTorque(e.target.value)}
                className="col-span-3"
                placeholder="27 Nm @ 4000 rpm"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4 mb-3">
              <Label htmlFor="transmission" className="text-right">
                Transmission
              </Label>
              <Input
                id="transmission"
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                className="col-span-3"
                placeholder="5-Speed"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4 mb-3">
              <Label htmlFor="fuelCapacity" className="text-right">
                Fuel Capacity
              </Label>
              <Input
                id="fuelCapacity"
                value={fuelCapacity}
                onChange={(e) => setFuelCapacity(e.target.value)}
                className="col-span-3"
                placeholder="13 L"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4 mb-3">
              <Label htmlFor="mileage" className="text-right">
                Mileage
              </Label>
              <Input
                id="mileage"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                className="col-span-3"
                placeholder="35 kmpl"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4 mb-3">
              <Label htmlFor="weight" className="text-right">
                Kerb Weight
              </Label>
              <Input
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="col-span-3"
                placeholder="195 kg"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSave}>
            {isNewVehicle ? "Add Vehicle" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditVehicleDialog;
