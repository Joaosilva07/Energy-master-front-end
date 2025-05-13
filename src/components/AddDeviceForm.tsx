
import React, { useState, useEffect } from 'react';
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
import { Switch } from "@/components/ui/switch";

interface AddDeviceFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddDevice: (device: Device) => void;
}

// Enhanced device types with more realistic and specific consumption data
const deviceTypes = [
  { value: 'tv', label: 'Televisão', avgConsumption: 45, description: 'TV LED 40-55"' },
  { value: 'refrigerator', label: 'Refrigerador', avgConsumption: 120, description: 'Geladeira duplex frost-free' },
  { value: 'ac', label: 'Ar Condicionado', avgConsumption: 180, description: 'Split 9000-12000 BTU' },
  { value: 'computer', label: 'Computador', avgConsumption: 60, description: 'Desktop com monitor' },
  { value: 'washer', label: 'Máquina de Lavar', avgConsumption: 90, description: 'Lava-roupas 8-10kg' },
  { value: 'microwave', label: 'Micro-ondas', avgConsumption: 70, description: 'Modelo padrão 20-30L' },
  { value: 'shower', label: 'Chuveiro Elétrico', avgConsumption: 200, description: '5500W - uso médio' },
  { value: 'dryer', label: 'Secadora', avgConsumption: 150, description: 'Secadora de roupas 8-10kg' },
  { value: 'iron', label: 'Ferro de Passar', avgConsumption: 100, description: 'Ferro a vapor' },
  { value: 'lamp', label: 'Lâmpadas', avgConsumption: 15, description: '5 lâmpadas LED' },
  { value: 'waterheater', label: 'Aquecedor de Água', avgConsumption: 160, description: 'Boiler elétrico' },
  { value: 'dishwasher', label: 'Lava-louças', avgConsumption: 110, description: 'Modelo standard' },
];

const AddDeviceForm = ({ open, onOpenChange, onAddDevice }: AddDeviceFormProps) => {
  const { toast } = useToast();
  const { user } = useUser();
  const [deviceName, setDeviceName] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [consumption, setConsumption] = useState('');
  const [location, setLocation] = useState('');
  const [useCustomConsumption, setUseCustomConsumption] = useState(false);
  const [selectedDeviceInfo, setSelectedDeviceInfo] = useState<{
    avgConsumption: number;
    description: string;
  } | null>(null);

  // Update the selected device info when the device type changes
  useEffect(() => {
    if (deviceType) {
      const selectedType = deviceTypes.find(device => device.value === deviceType);
      if (selectedType) {
        setSelectedDeviceInfo({
          avgConsumption: selectedType.avgConsumption,
          description: selectedType.description
        });
        // Only auto-set the consumption if not using custom value
        if (!useCustomConsumption) {
          setConsumption(selectedType.avgConsumption.toString());
        }
      } else {
        setSelectedDeviceInfo(null);
      }
    } else {
      setSelectedDeviceInfo(null);
    }
  }, [deviceType, useCustomConsumption]);

  // Handle the custom consumption toggle
  const handleToggleCustomConsumption = (checked: boolean) => {
    setUseCustomConsumption(checked);
    // Reset the consumption value to the device average if turning off custom consumption
    if (!checked && selectedDeviceInfo) {
      setConsumption(selectedDeviceInfo.avgConsumption.toString());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedDeviceType = deviceTypes.find(device => device.value === deviceType);
    const userId = user?.id || 'anonymous';
    
    // Get local time for device addition
    const now = new Date();
    const localTimeString = now.toLocaleTimeString();
    
    const newDevice: Device = {
      name: deviceName,
      type: deviceType,
      consumption: consumption ? parseInt(consumption) : selectedDeviceType?.avgConsumption || 0,
      location: location || 'Casa',
      status: 'online',
      lastActivity: localTimeString,
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
    setUseCustomConsumption(false);
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
                      {type.label} - {type.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedDeviceInfo && (
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-right col-span-1">
                  <Label htmlFor="customConsumption">
                    Personalizar
                  </Label>
                </div>
                <div className="flex items-center gap-2 col-span-3">
                  <Switch
                    id="customConsumption"
                    checked={useCustomConsumption}
                    onCheckedChange={handleToggleCustomConsumption}
                  />
                  <span className="text-sm text-muted-foreground">
                    {useCustomConsumption 
                      ? "Consumo personalizado" 
                      : `Usando valor padrão: ${selectedDeviceInfo.avgConsumption} kWh/mês`
                    }
                  </span>
                </div>
              </div>
            )}
            
            {(useCustomConsumption || !selectedDeviceInfo) && (
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
                  placeholder="Consumo mensal estimado"
                  required={useCustomConsumption}
                />
              </div>
            )}
            
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
