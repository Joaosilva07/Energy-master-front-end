import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Device } from '@/hooks/useDevices';
import { useUser } from '@/contexts/UserContext';

interface AddDeviceFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddDevice: (device: Device) => void;
}

const deviceTypes = [
  { value: 'tv', label: 'Televisão', avgConsumption: 45 },
  { value: 'refrigerator', label: 'Refrigerador', avgConsumption: 120 },
  { value: 'ac', label: 'Ar Condicionado', avgConsumption: 180 },
  { value: 'computer', label: 'Computador', avgConsumption: 60 },
  { value: 'washer', label: 'Máquina de Lavar', avgConsumption: 90 },
  { value: 'microwave', label: 'Micro-ondas', avgConsumption: 70 },
];

const AddDeviceForm = ({ open, onOpenChange, onAddDevice }: AddDeviceFormProps) => {
  const { toast } = useToast();
  const { user } = useUser();
  const [deviceName, setDeviceName] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [consumption, setConsumption] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedDeviceType = deviceTypes.find(device => device.value === deviceType);
    const userId = user?.id || 'anonymous';
    
    const newDevice: Device = {
      name: deviceName,
      type: deviceType,
      consumption: consumption ? parseInt(consumption) : selectedDeviceType?.avgConsumption || 0,
      location: location || 'Casa',
      status: 'online',
      lastActivity: 'Agora',
      powerState: true,
      id: Date.now().toString(),
      userId: userId,
    };
    
    onAddDevice(newDevice);
    toast({
      title: "Dispositivo adicionado",
      description: `${deviceName} foi adicionado com sucesso.`,
    });
    
    // Clear form fields
    setDeviceName('');
    setDeviceType('');
    setConsumption('');
    setLocation('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Dispositivo</DialogTitle>
          <DialogDescription>
            Preencha os detalhes do novo dispositivo para monitorar seu consumo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                id="name"
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
                className="col-span-3"
                required
                placeholder="Ex: TV da Sala"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Tipo
              </Label>
              <Select value={deviceType} onValueChange={setDeviceType} required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o tipo de dispositivo" />
                </SelectTrigger>
                <SelectContent>
                  {deviceTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="consumption" className="text-right">
                Consumo (kWh)
              </Label>
              <Input
                id="consumption"
                type="number"
                value={consumption}
                onChange={(e) => setConsumption(e.target.value)}
                className="col-span-3"
                placeholder="Deixe em branco para usar valor médio"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Local
              </Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="col-span-3"
                placeholder="Ex: Sala, Quarto, etc."
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-energy-primary hover:bg-energy-primary/90">
              Adicionar Dispositivo
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDeviceForm;
