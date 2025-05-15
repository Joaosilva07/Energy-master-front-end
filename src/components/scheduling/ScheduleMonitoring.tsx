
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Clock, Plus, Calendar as CalendarIcon, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Time slot options for scheduling
const timeSlots = [
  "00:00", "01:00", "02:00", "03:00", "04:00", "05:00",
  "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
];

const ScheduleMonitoring = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [schedules, setSchedules] = useState<{date: Date, times: string[]}[]>([]);

  const handleTimeSlotClick = (time: string) => {
    if (selectedTimeSlots.includes(time)) {
      setSelectedTimeSlots(selectedTimeSlots.filter(t => t !== time));
    } else {
      setSelectedTimeSlots([...selectedTimeSlots, time]);
    }
  };

  const handleSchedule = () => {
    if (!date) {
      toast({
        title: "Nenhuma data selecionada",
        description: "Por favor, selecione uma data para agendar o monitoramento",
        variant: "destructive"
      });
      return;
    }
    
    if (selectedTimeSlots.length === 0) {
      toast({
        title: "Nenhum horário selecionado",
        description: "Por favor, selecione pelo menos um horário para monitoramento",
        variant: "destructive"
      });
      return;
    }
    
    // Add new schedule
    const newSchedule = { date, times: [...selectedTimeSlots] };
    setSchedules([...schedules, newSchedule]);
    
    // Clear selections
    setSelectedTimeSlots([]);
    setDate(undefined);
    
    toast({
      title: "Monitoramento agendado",
      description: `Monitoramento agendado para ${date.toLocaleDateString('pt-BR')} nos horários selecionados`,
    });
    
    setOpen(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-500" />
          Monitoramento Agendado
        </h3>
        <Button onClick={() => setOpen(true)} className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Agendar
        </Button>
      </div>

      {schedules.length > 0 ? (
        <div className="space-y-4">
          {schedules.map((schedule, idx) => (
            <div key={idx} className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <div className="font-medium">{schedule.date.toLocaleDateString('pt-BR')}</div>
                <div className="text-sm text-gray-500">
                  {schedule.times.sort().join(", ")}
                </div>
              </div>
              <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-1 px-2 rounded text-xs flex items-center gap-1">
                <Check className="h-3 w-3" /> Ativo
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <CalendarIcon className="mx-auto h-12 w-12 text-gray-400 mb-3" />
          <p className="mb-1">Nenhum monitoramento agendado</p>
          <p className="text-sm">Agende horários específicos para monitorar seu consumo de energia</p>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Agendar Monitoramento</DialogTitle>
            <DialogDescription>
              Selecione uma data e horários para monitorar seu consumo de energia.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Data</label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="border rounded-md"
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Horários</label>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    className={`p-2 rounded text-sm ${
                      selectedTimeSlots.includes(time)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                    onClick={() => handleTimeSlotClick(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleSchedule}>Agendar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScheduleMonitoring;
