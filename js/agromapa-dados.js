/* 
RM575069 - Gabriely Santos Moreira - 1TDSPA
RM575043 - Larissa Avelina Cerqueira - 1TDSPA 
RM575985 - Isabelly Viana Chavier Bustamante Sa - 1TDSPA
RM576189 - Stéfany Maria Santana Freitas - 1TDSPA
RM576071 - Renan Hesz Filho - 1TDSPA 
*/
/* Cultiva | Global Solution Citizen Tech */
// Base de conteúdo textual usada pelo AgroMapa para preencher os painéis regionais.
// Cada região reúne estados, produção, clima, calendário, desafios e orientações.
window.DADOS_AGROMAPA = {
  "Norte": {
    "states": [
      "ac",
      "ap",
      "am",
      "pa",
      "ro",
      "rr",
      "to"
    ],
    "production": "Soja, cacau, açaí, mandioca e milho aparecem entre os produtos de destaque no valor da produção agrícola regional (PAM 2024). A região combina lavouras comerciais e produção relevante para economias locais e agricultura familiar.",
    "climate": "Predominam condições quentes e, em grandes áreas amazônicas, úmidas. O regime de chuvas é abundante em muitos locais, mas há diferenças sazonais e territoriais importantes.",
    "calendar": "Não existe um calendário único para toda a Região Norte. É necessário consultar o ZARC e as recomendações estaduais considerando município, cultura e safra. A época de plantio varia com o regime de chuvas local.",
    "challenges": "A grande disponibilidade hídrica em bacias como a Amazônica não significa acesso uniforme em propriedades e municípios. Também devem ser considerados períodos menos chuvosos, logística, conservação do solo e pressões sobre ecossistemas.",
    "guidance": "Planejar a irrigação conforme chuva efetiva e necessidade da cultura; conservar cobertura do solo; monitorar umidade; avaliar captação de chuva onde houver viabilidade e proteger nascentes e cursos d'água."
  },
  "Nordeste": {
    "states": [
      "al",
      "ba",
      "ce",
      "ma",
      "pb",
      "pe",
      "pi",
      "rn",
      "se"
    ],
    "production": "Soja, cana-de-açúcar, milho, algodão herbáceo e cacau estão entre os produtos de destaque no valor da produção agrícola regional (PAM 2024). Há também polos de fruticultura irrigada.",
    "climate": "A região reúne condições muito diversas. O interior semiárido tem chuvas escassas e irregulares, enquanto áreas litorâneas apresentam condições tropicais úmidas.",
    "calendar": "O calendário depende fortemente da localização. No Semiárido, a janela de plantio acompanha o início efetivo das chuvas; em polos irrigados, o planejamento pode seguir ciclos próprios. Consultar ZARC por município e cultura.",
    "challenges": "A irregularidade das chuvas e as estiagens elevam a importância do armazenamento e do uso eficiente da água. Polos irrigados também precisam observar disponibilidade hídrica, salinidade e manejo do solo.",
    "guidance": "Priorizar irrigação localizada quando tecnicamente adequada, monitorar umidade do solo, reduzir perdas por evaporação com cobertura, planejar armazenamento e usar dados pluviométricos locais."
  },
  "Centro-Oeste": {
    "states": [
      "df",
      "go",
      "mt",
      "ms"
    ],
    "production": "Soja, milho, algodão herbáceo, cana-de-açúcar e feijão aparecem entre os produtos de destaque no valor da produção regional (PAM 2024). A região tem forte presença de sistemas agrícolas mecanizados.",
    "climate": "No Cerrado, é comum a alternância entre estação chuvosa e estação seca. A duração e a intensidade desses períodos variam entre estados e localidades.",
    "calendar": "A janela de plantio de culturas de sequeiro costuma acompanhar o retorno das chuvas, mas não deve ser generalizada para todos os estados. Consultar ZARC por município, cultura e safra.",
    "challenges": "A estação seca pode aumentar a demanda por irrigação e a pressão sobre mananciais. Também são relevantes conservação do solo, manejo de água e prevenção de erosão.",
    "guidance": "Conciliar calendário agrícola com previsões e histórico de chuva; adotar plantio direto e cobertura do solo quando apropriado; dimensionar irrigação e armazenamento com avaliação local."
  },
  "Sudeste": {
    "states": [
      "es",
      "mg",
      "rj",
      "sp"
    ],
    "production": "Cana-de-açúcar, café, laranja, soja e milho estão entre os produtos de destaque no valor da produção agrícola regional (PAM 2024). A produção é diversificada e inclui lavouras permanentes e temporárias.",
    "climate": "Há diversidade de condições tropicais, tropicais de altitude e áreas de temperaturas mais amenas. Em muitas localidades, o verão é mais chuvoso e o inverno mais seco.",
    "calendar": "O calendário varia conforme altitude, estado, cultura e sistema produtivo. Café, citros, cana e grãos têm ciclos distintos; consultar ZARC e recomendações técnicas locais antes de definir datas.",
    "challenges": "A sazonalidade das chuvas pode elevar a demanda de irrigação no período seco. Relevo, competição pelo uso da água e eventos extremos também exigem planejamento por bacia e propriedade.",
    "guidance": "Monitorar umidade e previsão do tempo, ajustar lâminas e horários de irrigação, proteger o solo em áreas declivosas e avaliar reservação de chuva sem comprometer usos prioritários."
  },
  "Sul": {
    "states": [
      "pr",
      "rs",
      "sc"
    ],
    "production": "Soja, milho, arroz, fumo e trigo aparecem entre os produtos de destaque no valor da produção agrícola regional (PAM 2024). A região tem tradição em grãos e arroz irrigado.",
    "climate": "Predominam condições subtropicais, com maior ocorrência de frentes frias e temperaturas mais baixas que em grande parte do país. Geadas podem ocorrer e afetar o calendário agrícola.",
    "calendar": "As épocas de semeadura variam por cultura, estado e zoneamento de risco climático. Para arroz irrigado, trigo, soja e milho, consultar ZARC e calendários estaduais da safra vigente.",
    "challenges": "Geadas, excesso de chuva em alguns períodos, estiagens em outros e eventos extremos podem afetar produção e disponibilidade de água. O arroz irrigado demanda atenção ao manejo hídrico.",
    "guidance": "Planejar o plantio conforme ZARC, monitorar previsões de geada e chuva, manter drenagem adequada, adotar práticas conservacionistas e controlar a água em sistemas irrigados."
  }
};
