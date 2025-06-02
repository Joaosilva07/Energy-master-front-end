
export interface TipData {
  title: string;
  description: string;
  icon: string;
  savings?: string;
  category: string;
  featured: boolean;
}

export const energyTipsDatabase: TipData[] = [
  // Climatização (20 dicas)
  {
    title: "Ajuste a temperatura do ar condicionado",
    description: "Mantenha entre 23-25°C. Cada grau a menos aumenta o consumo em 8%.",
    icon: "thermometerSun",
    savings: "Até 25% no consumo de A/C",
    category: "climatizacao",
    featured: true
  },
  {
    title: "Limpe filtros do ar condicionado",
    description: "Filtros sujos fazem o aparelho trabalhar mais para resfriar o ambiente.",
    icon: "wind",
    savings: "15% no consumo de A/C",
    category: "climatizacao",
    featured: false
  },
  {
    title: "Use ventiladores junto com o A/C",
    description: "Ventiladores ajudam a circular o ar frio, permitindo temperatura mais alta.",
    icon: "wind",
    savings: "10% no consumo total",
    category: "climatizacao",
    featured: false
  },
  {
    title: "Feche portas e janelas",
    description: "Mantenha o ambiente fechado para não perder o ar condicionado.",
    icon: "lock",
    savings: "20% no consumo de A/C",
    category: "climatizacao",
    featured: false
  },
  {
    title: "Use cortinas ou persianas",
    description: "Bloqueie a entrada de calor solar durante o dia.",
    icon: "sun",
    savings: "12% no consumo de climatização",
    category: "climatizacao",
    featured: false
  },
  {
    title: "Programe o timer do A/C",
    description: "Configure para desligar quando você não estiver em casa.",
    icon: "timer",
    savings: "30% no consumo de A/C",
    category: "climatizacao",
    featured: false
  },
  {
    title: "Instale isolamento térmico",
    description: "Melhore o isolamento das paredes e teto para manter a temperatura.",
    icon: "home",
    savings: "18% no consumo de climatização",
    category: "climatizacao",
    featured: false
  },
  {
    title: "Use modo econômico",
    description: "A maioria dos aparelhos tem modo eco que reduz o consumo.",
    icon: "leaf",
    savings: "15% no consumo de A/C",
    category: "climatizacao",
    featured: false
  },
  {
    title: "Desligue quando sair",
    description: "Não deixe o ar condicionado ligado em ambientes vazios.",
    icon: "power",
    savings: "100% durante ausência",
    category: "climatizacao",
    featured: false
  },
  {
    title: "Faça manutenção preventiva",
    description: "Aparelhos bem conservados consomem menos energia.",
    icon: "wrench",
    savings: "10% no consumo de A/C",
    category: "climatizacao",
    featured: false
  },
  {
    title: "Use o aquecedor com moderação",
    description: "No inverno, ajuste para temperaturas confortáveis, não excessivas.",
    icon: "thermometer",
    savings: "20% no consumo de aquecimento",
    category: "climatizacao",
    featured: false
  },
  {
    title: "Aproveite o calor natural",
    description: "Abra cortinas durante o dia no inverno para aproveitar o sol.",
    icon: "sun",
    savings: "8% no consumo de aquecimento",
    category: "climatizacao",
    featured: false
  },
  {
    title: "Use roupas adequadas",
    description: "Vista-se adequadamente para reduzir dependência de climatização.",
    icon: "shirt",
    savings: "12% no consumo total",
    category: "climatizacao",
    featured: false
  },
  {
    title: "Instale termostato inteligente",
    description: "Controle automático da temperatura otimiza o consumo.",
    icon: "smartphone",
    savings: "15% no consumo de climatização",
    category: "climatizacao",
    featured: false
  },
  {
    title: "Evite abrir geladeira desnecessariamente",
    description: "Cada abertura faz o motor trabalhar mais para resfriar novamente.",
    icon: "refrigerator",
    savings: "5% no consumo da geladeira",
    category: "climatizacao",
    featured: false
  },
  {
    title: "Regule a temperatura da geladeira",
    description: "Mantenha entre 3-5°C na geladeira e -15°C no freezer.",
    icon: "thermometer",
    savings: "8% no consumo da geladeira",
    category: "climatizacao",
    featured: false
  },
  {
    title: "Descongele freezer regularmente",
    description: "Gelo acumulado faz o freezer consumir mais energia.",
    icon: "snowflake",
    savings: "10% no consumo do freezer",
    category: "climatizacao",
    featured: false
  },
  {
    title: "Mantenha a geladeira cheia",
    description: "Geladeiras cheias mantêm temperatura mais facilmente.",
    icon: "package",
    savings: "5% no consumo da geladeira",
    category: "climatizacao",
    featured: false
  },
  {
    title: "Verifique borrachas de vedação",
    description: "Borrachas danificadas deixam o frio escapar.",
    icon: "shield",
    savings: "12% no consumo da geladeira",
    category: "climatizacao",
    featured: false
  },
  {
    title: "Aguarde alimentos esfriarem",
    description: "Não coloque alimentos quentes na geladeira.",
    icon: "clock",
    savings: "7% no consumo da geladeira",
    category: "climatizacao",
    featured: false
  },

  // Iluminação (25 dicas)
  {
    title: "Substitua por lâmpadas LED",
    description: "LEDs consomem até 80% menos energia que incandescentes.",
    icon: "lightbulb",
    savings: "12% no consumo geral",
    category: "iluminacao",
    featured: true
  },
  {
    title: "Aproveite a luz natural",
    description: "Mantenha cortinas abertas durante o dia.",
    icon: "sun",
    savings: "10% no consumo de iluminação",
    category: "iluminacao",
    featured: true
  },
  {
    title: "Desligue luzes desnecessárias",
    description: "Apague luzes ao sair de ambientes vazios.",
    icon: "power",
    savings: "15% no consumo de iluminação",
    category: "iluminacao",
    featured: false
  },
  {
    title: "Use sensores de movimento",
    description: "Instale sensores que ligam/desligam automaticamente as luzes.",
    icon: "zap",
    savings: "20% no consumo de iluminação",
    category: "iluminacao",
    featured: false
  },
  {
    title: "Instale dimmers",
    description: "Controle a intensidade da luz conforme necessário.",
    icon: "sliders",
    savings: "8% no consumo de iluminação",
    category: "iluminacao",
    featured: false
  },
  {
    title: "Pinte paredes com cores claras",
    description: "Cores claras refletem mais luz, reduzindo necessidade de iluminação artificial.",
    icon: "paintbrush",
    savings: "5% no consumo de iluminação",
    category: "iluminacao",
    featured: false
  },
  {
    title: "Limpe lâmpadas e luminárias",
    description: "Poeira reduz a eficiência da iluminação.",
    icon: "sparkles",
    savings: "3% no consumo de iluminação",
    category: "iluminacao",
    featured: false
  },
  {
    title: "Use iluminação direcionada",
    description: "Ilumine apenas onde necessário em vez de todo o ambiente.",
    icon: "focus",
    savings: "12% no consumo de iluminação",
    category: "iluminacao",
    featured: false
  },
  {
    title: "Substitua lâmpadas fluorescentes",
    description: "Troque por LEDs para maior eficiência energética.",
    icon: "repeat",
    savings: "6% no consumo de iluminação",
    category: "iluminacao",
    featured: false
  },
  {
    title: "Use timers para iluminação externa",
    description: "Programe luzes externas para funcionar apenas quando necessário.",
    icon: "timer",
    savings: "25% no consumo de iluminação externa",
    category: "iluminacao",
    featured: false
  },
  {
    title: "Instale claraboias",
    description: "Aproveite luz natural durante o dia em corredores e banheiros.",
    icon: "sun",
    savings: "15% no consumo de iluminação",
    category: "iluminacao",
    featured: false
  },
  {
    title: "Use luminárias eficientes",
    description: "Escolha luminárias que direcionam melhor a luz.",
    icon: "lamp",
    savings: "7% no consumo de iluminação",
    category: "iluminacao",
    featured: false
  },
  {
    title: "Evite deixar luzes acesas à noite",
    description: "Use apenas iluminação necessária para segurança.",
    icon: "moon",
    savings: "18% no consumo noturno",
    category: "iluminacao",
    featured: false
  },
  {
    title: "Use espelhos estrategicamente",
    description: "Posicione espelhos para refletir e amplificar a luz natural.",
    icon: "mirror",
    savings: "4% no consumo de iluminação",
    category: "iluminacao",
    featured: false
  },
  {
    title: "Prefira lâmpadas frias para trabalho",
    description: "Lâmpadas frias são mais eficientes para atividades que exigem atenção.",
    icon: "monitor",
    savings: "3% no consumo de iluminação",
    category: "iluminacao",
    featured: false
  },
  {
    title: "Configure iluminação inteligente",
    description: "Use sistemas que ajustam automaticamente conforme horário.",
    icon: "smartphone",
    savings: "12% no consumo de iluminação",
    category: "iluminacao",
    featured: false
  },
  {
    title: "Substitua luminárias antigas",
    description: "Luminárias modernas são mais eficientes energeticamente.",
    icon: "refresh",
    savings: "8% no consumo de iluminação",
    category: "iluminacao",
    featured: false
  },
  {
    title: "Use luz amarela à noite",
    description: "Lâmpadas amarelas consomem menos e são melhores para relaxar.",
    icon: "sun",
    savings: "5% no consumo noturno",
    category: "iluminacao",
    featured: false
  },
  {
    title: "Evite iluminação decorativa excessiva",
    description: "Use decoração com luz apenas em ocasiões especiais.",
    icon: "star",
    savings: "10% no consumo de iluminação",
    category: "iluminacao",
    featured: false
  },
  {
    title: "Instale interruptores inteligentes",
    description: "Controle luzes remotamente e programe horários.",
    icon: "wifi",
    savings: "14% no consumo de iluminação",
    category: "iluminacao",
    featured: false
  },
  {
    title: "Use fitas LED em vez de spots",
    description: "Fitas LED consomem menos para iluminação indireta.",
    icon: "zap",
    savings: "6% no consumo de iluminação",
    category: "iluminacao",
    featured: false
  },
  {
    title: "Organize móveis para aproveitar luz",
    description: "Posicione mesa de trabalho próxima à janela.",
    icon: "layout",
    savings: "8% no consumo de iluminação",
    category: "iluminacao",
    featured: false
  },
  {
    title: "Use luz solar em áreas externas",
    description: "Instale luminárias solares para jardim e garagem.",
    icon: "sun",
    savings: "100% na iluminação externa",
    category: "iluminacao",
    featured: false
  },
  {
    title: "Mantenha janelas limpas",
    description: "Janelas sujas bloqueiam até 25% da luz natural.",
    icon: "sparkles",
    savings: "5% no consumo de iluminação",
    category: "iluminacao",
    featured: false
  },
  {
    title: "Use lâmpadas de menor potência",
    description: "Avalie se você realmente precisa de tanta luminosidade.",
    icon: "minus",
    savings: "10% no consumo de iluminação",
    category: "iluminacao",
    featured: false
  },

  // Eletrodomésticos (35 dicas)
  {
    title: "Desligue aparelhos do standby",
    description: "Equipamentos em standby consomem energia desnecessariamente.",
    icon: "power",
    savings: "8% no consumo geral",
    category: "eletrodomesticos",
    featured: true
  },
  {
    title: "Use timer nos aparelhos",
    description: "Configure horários automáticos para ligar/desligar equipamentos.",
    icon: "timer",
    savings: "15% no consumo geral",
    category: "eletrodomesticos",
    featured: true
  },
  {
    title: "Lave roupas com água fria",
    description: "90% da energia da máquina é usada para aquecer a água.",
    icon: "droplets",
    savings: "25% no consumo da lavadora",
    category: "eletrodomesticos",
    featured: false
  },
  {
    title: "Use capacidade máxima da máquina",
    description: "Lave cargas completas para otimizar o consumo por peça.",
    icon: "package",
    savings: "12% no consumo da lavadora",
    category: "eletrodomesticos",
    featured: false
  },
  {
    title: "Limpe filtro da máquina de lavar",
    description: "Filtros entupidos fazem a máquina trabalhar mais.",
    icon: "filter",
    savings: "8% no consumo da lavadora",
    category: "eletrodomesticos",
    featured: false
  },
  {
    title: "Seque roupas no varal",
    description: "Evite usar secadora sempre que possível.",
    icon: "wind",
    savings: "100% do consumo da secadora",
    category: "eletrodomesticos",
    featured: false
  },
  {
    title: "Use lava-louças apenas cheio",
    description: "Lave louça em cargas completas para economizar água e energia.",
    icon: "utensils",
    savings: "10% no consumo da lava-louças",
    category: "eletrodomesticos",
    featured: false
  },
  {
    title: "Evite abrir forno desnecessariamente",
    description: "Cada abertura reduz a temperatura em 25°C.",
    icon: "chef-hat",
    savings: "8% no consumo do forno",
    category: "eletrodomesticos",
    featured: false
  },
  {
    title: "Use micro-ondas para pequenas porções",
    description: "Micro-ondas é mais eficiente que forno para aquecer pouca comida.",
    icon: "zap",
    savings: "15% para pequenas porções",
    category: "eletrodomesticos",
    featured: false
  },
  {
    title: "Descongele alimentos naturalmente",
    description: "Não use micro-ondas ou água quente para descongelar.",
    icon: "clock",
    savings: "5% no consumo do micro-ondas",
    category: "eletrodomesticos",
    featured: false
  },
  {
    title: "Use panelas de pressão",
    description: "Cozinham mais rápido e consomem menos energia.",
    icon: "timer",
    savings: "20% no consumo do fogão",
    category: "eletrodomesticos",
    featured: false
  },
  {
    title: "Tampe panelas ao cozinhar",
    description: "Panelas tampadas cozinham mais rápido.",
    icon: "circle",
    savings: "10% no consumo do fogão",
    category: "eletrodomesticos",
    featured: false
  },
  {
    title: "Use ferro a vapor eficientemente",
    description: "Passe várias peças de uma vez para aproveitar o aquecimento.",
    icon: "shirt",
    savings: "15% no consumo do ferro",
    category: "eletrodomesticos",
    featured: false
  },
  {
    title: "Regule temperatura do chuveiro",
    description: "Banhos mais curtos e mornos reduzem significativamente o consumo.",
    icon: "droplets",
    savings: "30% no consumo do chuveiro",
    category: "eletrodomesticos",
    featured: false
  },
  {
    title: "Use aspirador de pó eficientemente",
    description: "Aspire regularmente com potência adequada à sujeira.",
    icon: "wind",
    savings: "8% no consumo do aspirador",
    category: "eletrodomesticos",
    featured: false
  },
  {
    title: "Mantenha geladeira longe do fogão",
    description: "Calor do fogão faz a geladeira trabalhar mais.",
    icon: "arrow-right",
    savings: "5% no consumo da geladeira",
    category: "eletrodomesticos",
    featured: false
  },
  {
    title: "Use liquidificador por menos tempo",
    description: "Processe alimentos apenas o necessário.",
    icon: "zap",
    savings: "3% no consumo do liquidificador",
    category: "eletrodomesticos",
    featured: false
  },
  {
    title: "Desligue TV quando não assistir",
    description: "Não deixe TV ligada apenas fazendo barulho.",
    icon: "tv",
    savings: "20% no consumo da TV",
    category: "eletrodomesticos",
    featured: false
  },
  {
    title: "Regule brilho da TV",
    description: "Telas mais escuras consomem menos energia.",
    icon: "monitor",
    savings: "5% no consumo da TV",
    category: "eletrodomesticos",
    featured: false
  },
  {
    title: "Use modo econômico dos aparelhos",
    description: "A maioria dos eletrodomésticos tem modo eco.",
    icon: "leaf",
    savings: "10% no consumo geral",
    category: "eletrodomesticos",
    featured: false
  },
  {
    title: "Carregue dispositivos durante o dia",
    description: "Evite carregar celular e laptop durante a madrugada.",
    icon: "battery",
    savings: "3% no consumo de carregamento",
    category: "eletrodomesticos",
    featured: false
  },
  {
    title: "Use computador no modo economia",
    description: "Configure modo de economia de energia no PC.",
    icon: "monitor",
    savings: "12% no consumo do computador",
    category: "eletrodomesticos",
    featured: false
  },
  {
    title: "Desligue monitor quando não usar",
    description: "Monitor consome energia mesmo com PC em standby.",
    icon: "monitor",
    savings: "5% no consumo do computador",
    category: "eletrodomesticos",
    featured: false
  },
  {
    title: "Use extensão com interruptor",
    description: "Facilita desligar vários aparelhos de uma vez.",
    icon: "plug",
    savings: "8% no consumo de eletrônicos",
    category: "eletrodomesticos",
    featured: false
  },
  {
    title: "Mantenha aparelhos ventilados",
    description: "Equipamentos superaquecidos consomem mais energia.",
    icon: "wind",
    savings: "5% no consumo geral",
    category: "eletrodomesticos",
    featured: false
  },
  {
    title: "Use cafeteira com timer",
    description: "Programe para preparar café apenas quando necessário.",
    icon: "coffee",
    savings: "15% no consumo da cafeteira",
    category: "eletrodomesticos",
    featured: false
  },
  {
    title: "Evite usar secador de cabelo muito tempo",
    description: "Seque parcialmente com toalha antes de usar secador.",
    icon: "wind",
    savings: "20% no consumo do secador",
    category: "eletrodomesticos",
    featured: false
  },
  {
    title: "Use panela elétrica eficientemente",
    description: "Cozinhe quantidade adequada e use timer.",
    icon: "chef-hat",
    savings: "10% no consumo da panela elétrica",
    category: "eletrodomesticos",
    featured: false
  },
  {
    title: "Substitua aparelhos antigos",
    description: "Aparelhos com selo Procel são mais eficientes.",
    icon: "refresh",
    savings: "25% no consumo geral",
    category: "eletrodomesticos",
    featured: false
  },
  {
    title: "Use ventilador em vez de A/C",
    description: "Quando possível, prefira ventilador ao ar condicionado.",
    icon: "wind",
    savings: "60% comparado ao A/C",
    category: "eletrodomesticos",
    featured: false
  },
  {
    title: "Configure protetor de tela",
    description: "Use protetor de tela escuro ou desligue monitor.",
    icon: "monitor",
    savings: "3% no consumo do computador",
    category: "eletrodomesticos",
    featured: false
  },
  {
    title: "Use impressora eficientemente",
    description: "Imprima frente e verso e desligue quando não usar.",
    icon: "printer",
    savings: "10% no consumo da impressora",
    category: "eletrodomesticos",
    featured: false
  },
  {
    title: "Evite usar forno para aquecer casa",
    description: "Forno não é eficiente para aquecimento de ambiente.",
    icon: "home",
    savings: "50% comparado ao aquecimento",
    category: "eletrodomesticos",
    featured: false
  },
  {
    title: "Use cooktop em vez de forno elétrico",
    description: "Para pequenas quantidades, cooktop é mais eficiente.",
    icon: "flame",
    savings: "15% no consumo para cozinhar",
    category: "eletrodomesticos",
    featured: false
  },
  {
    title: "Mantenha freezer organizado",
    description: "Organização facilita encontrar itens rapidamente.",
    icon: "package",
    savings: "5% no consumo do freezer",
    category: "eletrodomesticos",
    featured: false
  },

  // Geral (20 dicas)
  {
    title: "Monitore seu consumo diariamente",
    description: "Acompanhe gastos para identificar desperdícios rapidamente.",
    icon: "bar-chart",
    savings: "15% no consumo geral",
    category: "geral",
    featured: false
  },
  {
    title: "Eduque a família sobre economia",
    description: "Ensine bons hábitos para todos os moradores.",
    icon: "users",
    savings: "20% no consumo geral",
    category: "geral",
    featured: false
  },
  {
    title: "Faça auditoria energética da casa",
    description: "Identifique os maiores consumidores de energia.",
    icon: "search",
    savings: "18% no consumo geral",
    category: "geral",
    featured: false
  },
  {
    title: "Use medidores inteligentes",
    description: "Monitore consumo em tempo real de cada aparelho.",
    icon: "zap",
    savings: "12% no consumo geral",
    category: "geral",
    featured: false
  },
  {
    title: "Estabeleça metas de economia",
    description: "Defina objetivos mensais de redução de consumo.",
    icon: "target",
    savings: "10% no consumo geral",
    category: "geral",
    featured: false
  },
  {
    title: "Compare tarifas de energia",
    description: "Verifique se há opções mais baratas disponíveis.",
    icon: "dollar-sign",
    savings: "5% na conta de luz",
    category: "geral",
    featured: false
  },
  {
    title: "Use energia solar",
    description: "Instale painéis solares para reduzir dependência da rede.",
    icon: "sun",
    savings: "70% na conta de luz",
    category: "geral",
    featured: false
  },
  {
    title: "Melhore isolamento da casa",
    description: "Invista em isolamento térmico de teto e paredes.",
    icon: "home",
    savings: "25% no consumo total",
    category: "geral",
    featured: false
  },
  {
    title: "Use bandeira tarifária a seu favor",
    description: "Reduza consumo em dias de bandeira vermelha.",
    icon: "flag",
    savings: "8% na conta de luz",
    category: "geral",
    featured: false
  },
  {
    title: "Invista em aparelhos eficientes",
    description: "Escolha eletrodomésticos com selo A do Procel.",
    icon: "award",
    savings: "30% no consumo geral",
    category: "geral",
    featured: false
  },
  {
    title: "Use automação residencial",
    description: "Automatize controle de luzes e aparelhos.",
    icon: "smartphone",
    savings: "15% no consumo geral",
    category: "geral",
    featured: false
  },
  {
    title: "Plante árvores estrategicamente",
    description: "Árvores podem reduzir necessidade de refrigeração.",
    icon: "tree-pine",
    savings: "10% no consumo de A/C",
    category: "geral",
    featured: false
  },
  {
    title: "Use cores claras na fachada",
    description: "Cores claras refletem calor e reduzem aquecimento interno.",
    icon: "palette",
    savings: "5% no consumo de climatização",
    category: "geral",
    featured: false
  },
  {
    title: "Mantenha instalação elétrica em dia",
    description: "Fiação antiga pode causar perdas de energia.",
    icon: "wrench",
    savings: "8% no consumo geral",
    category: "geral",
    featured: false
  },
  {
    title: "Use grupos de WhatsApp da família",
    description: "Comunique sobre economia de energia para todos.",
    icon: "message-circle",
    savings: "12% no consumo geral",
    category: "geral",
    featured: false
  },
  {
    title: "Participe de programas de economia",
    description: "Adira a programas governamentais de eficiência energética.",
    icon: "handshake",
    savings: "15% na conta de luz",
    category: "geral",
    featured: false
  },
  {
    title: "Use aplicativos de monitoramento",
    description: "Apps ajudam a acompanhar e controlar o consumo.",
    icon: "smartphone",
    savings: "10% no consumo geral",
    category: "geral",
    featured: false
  },
  {
    title: "Faça revisões periódicas",
    description: "Revise hábitos de consumo mensalmente.",
    icon: "calendar",
    savings: "8% no consumo geral",
    category: "geral",
    featured: false
  },
  {
    title: "Use horário de ponta consciente",
    description: "Evite usar aparelhos das 18h às 21h.",
    icon: "clock",
    savings: "20% na conta de luz",
    category: "geral",
    featured: false
  },
  {
    title: "Compartilhe experiências",
    description: "Troque dicas com vizinhos e amigos sobre economia.",
    icon: "share",
    savings: "5% no consumo geral",
    category: "geral",
    featured: false
  }
];
