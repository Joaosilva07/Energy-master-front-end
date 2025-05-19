
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { MessageSquare, ThumbsUp, ThumbsDown, Star, Flag } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Tipos de feedback disponíveis
const feedbackTypes = [
  { id: 'suggestion', label: 'Sugestão', icon: <ThumbsUp className="h-4 w-4" /> },
  { id: 'issue', label: 'Problema', icon: <ThumbsDown className="h-4 w-4" /> },
  { id: 'feature', label: 'Nova Funcionalidade', icon: <Star className="h-4 w-4" /> },
  { id: 'bug', label: 'Bug', icon: <Flag className="h-4 w-4" /> },
];

const FeedbackDialog = ({ open, onOpenChange }: FeedbackDialogProps) => {
  const [feedbackType, setFeedbackType] = useState('suggestion');
  const [message, setMessage] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  const handleSubmit = () => {
    if (!message.trim()) {
      toast({
        title: "Mensagem vazia",
        description: "Por favor, escreva uma mensagem de feedback",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Feedback enviado!",
      description: "Agradecemos por compartilhar sua opinião.",
    });
    
    // Limpar formulário
    setFeedbackType('suggestion');
    setMessage('');
    setContactInfo('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-500" />
            Enviar Feedback Detalhado
          </DialogTitle>
          <DialogDescription>
            Compartilhe sua opinião para nos ajudar a melhorar o EnergyMaster
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Tipo de Feedback</Label>
            <RadioGroup value={feedbackType} onValueChange={setFeedbackType} className="grid grid-cols-2 gap-2">
              {feedbackTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={type.id} id={type.id} />
                  <Label htmlFor={type.id} className="flex items-center gap-1.5 cursor-pointer">
                    {type.icon} {type.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Sua Mensagem</Label>
            <Textarea
              id="message"
              placeholder="Descreva sua experiência, sugestão ou problema..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[150px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact" className="flex justify-between">
              <span>Contato (opcional)</span>
              <span className="text-xs text-muted-foreground">Para seguimento caso necessário</span>
            </Label>
            <Textarea
              id="contact"
              placeholder="Email ou telefone para contato (opcional)"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              className="min-h-[60px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Enviar Feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;
