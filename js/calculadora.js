/* 
RM575069 - Gabriely Santos Moreira - 1TDSPA
RM575043 - Larissa Avelina Cerqueira - 1TDSPA 
RM575985 - Isabelly Viana Chavier Bustamante Sa - 1TDSPA
RM576189 - Stéfany Maria Santana Freitas - 1TDSPA
RM576071 - Renan Hesz Filho - 1TDSPA 
*/
/* Cultiva | Global Solution Citizen Tech */

/* Fluxo em três etapas, validação e fórmulas da calculadora — Cultiva */
// Inicializa a calculadora somente na página que contém o formulário de irrigação.
document.addEventListener('DOMContentLoaded', () => {
   // Localiza o formulário e os painéis que alternam entre entrada e relatório.
   const form = document.getElementById('irrigation-form'); if (!form) return;
   const shell = document.getElementById('calculator-shell'), report = document.getElementById('report-section');
   let current = 1;
   // Eficiências de referência por método; o usuário pode editar o valor sugerido.
   const efficiencyRefs = {
      sulco: { value: 50, range: '30% a 70%', source: 'Embrapa Hortaliças — Irrigação, valores observados para sulcos.' },
      aspersao: { value: 67.5, range: '60% a 75%', source: 'Embrapa Hortaliças — Irrigação, aspersão convencional.' },
      pivo: { value: 82.5, range: '75% a 90%', source: 'Embrapa Hortaliças — Irrigação, pivô central.' },
      gotejamento: { value: 85, range: '80% a 90%', source: 'Embrapa Hortaliças — Irrigação, gotejamento.' },
      micro: { value: 85, range: '80% a 90%', source: 'Embrapa Hortaliças — Irrigação, microaspersão.' }
   };
   const $ = id => document.getElementById(id);
   // Controla qual etapa do formulário está visível e atualiza o indicador de progresso.
   function setStep(n) {
      current = n;
      document.querySelectorAll('.calc-step').forEach(s => s.classList.toggle('active', Number(s.dataset.step) === n));
      document.querySelectorAll('[data-step-dot]').forEach(s => s.classList.toggle('active', Number(s.dataset.stepDot) === n));
      $('calc-error').textContent = '';
   }
   // Confere campos obrigatórios, limites numéricos e regras específicas da etapa.
   function validateStep(n) {
      const section = document.querySelector(`.calc-step[data-step="${n}"]`); let ok = true;
      section.querySelectorAll('input:not([disabled]),select:not([disabled])').forEach(field => {
         if (field.type === 'radio') return;
         const value = field.value.trim(), num = field.type === 'number' ? Number(value) : null;
         let invalid = !value;
         if (field.type === 'number' && value !== '' && (!Number.isFinite(num) || num < Number(field.min || 0) || (field.max !== '' && num > Number(field.max)))) invalid = true;
         if (field.id === 'water-need' && num <= 0) invalid = true;
         field.classList.toggle('invalid', invalid); if (invalid) ok = false;
      });
      if (n === 2 && $('source').value === 'rede' && Number($('water-tariff').value) <= 0) { $('water-tariff').classList.add('invalid'); ok = false; }
      if (!ok) $('calc-error').textContent = 'Preencha os campos obrigatórios com valores válidos antes de continuar.';
      return ok;
   }
   // Eventos dos botões para avançar ou retornar entre as etapas.
   document.querySelectorAll('[data-next]').forEach(btn => btn.addEventListener('click', () => { if (validateStep(current)) setStep(Number(btn.dataset.next)); }));
   document.querySelectorAll('[data-prev]').forEach(btn => btn.addEventListener('click', () => setStep(Number(btn.dataset.prev))));
   $('method').addEventListener('change', () => {
      const ref = efficiencyRefs[$('method').value]; if (!ref) return;
      $('efficiency').value = ref.value; $('efficiency-help').textContent = `Faixa de referência: ${ref.range}. Valor central carregado, editável. Fonte: Embrapa.`;
   });
   // Habilita os campos de captação de chuva somente quando essa opção é selecionada.
   document.querySelectorAll('input[name="rain"]').forEach(r => r.addEventListener('change', () => {
      const enabled = document.querySelector('input[name="rain"]:checked').value === 'sim';
      $('rain-fields').classList.toggle('is-disabled', !enabled); $('rain-fields').setAttribute('aria-disabled', String(!enabled));
      $('rain-fields').querySelectorAll('input').forEach(i => { i.disabled = !enabled; i.required = enabled; });
   }));
   $('source').addEventListener('change', () => {
      if ($('source').value !== 'rede') $('water-tariff').value = '0';
      else if (Number($('water-tariff').value) === 0) $('water-tariff').value = '';
   });
   const num = id => Number($(id).value);
   const brl = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
   const fmt = v => v.toLocaleString('pt-BR', { maximumFractionDigits: 2 });
   // Calcula demanda hídrica, custos estimados, captação e economia potencial.
   function generate() {
      if (!validateStep(3)) return;
      const area = num('area'), etc = num('water-need'), eff = num('efficiency') / 100, days = num('irrigation-days');
      if (!(eff > 0 && eff <= 1)) { $('calc-error').textContent = 'A eficiência deve ser maior que 0% e menor ou igual a 100%.'; return; }
      const daily = etc * area / eff, monthly = daily * days, m3 = monthly / 1000;
      const waterCost = m3 * num('water-tariff');
      const energyKwh = num('pump-power') * num('pump-hours') * num('pump-days');
      const energyCost = energyKwh * num('energy-tariff');
      const rainEnabled = document.querySelector('input[name="rain"]:checked').value === 'sim';
      let captured = 0, stored = 0, used = 0, saving = 0;
      if (rainEnabled) {
         const coefficient = num('rain-coefficient');
         if (!(coefficient > 0 && coefficient <= 1)) { $('calc-error').textContent = 'O coeficiente de aproveitamento deve estar entre 0 e 1.'; return; }
         captured = num('rainfall') * num('catchment-area') * coefficient;
         stored = Math.min(captured, num('tank-capacity'));
         used = Math.min(stored, monthly);
         saving = (used / 1000) * num('water-tariff');
      }
      $('report-summary').textContent = `${$('crop').value} · ${$('region').value} · ${$('method').selectedOptions[0].text}`;
      $('r-area').textContent = `${fmt(area)} m²`;
      $('r-catchment').textContent = rainEnabled ? `${fmt(num('catchment-area'))} m²` : 'Não considerada';
      $('r-daily').textContent = `${fmt(daily)} L/dia`;
      $('r-monthly').textContent = `${fmt(monthly)} L · ${fmt(m3)} m³`;
      $('r-rain').textContent = rainEnabled ? `${fmt(captured)} L` : 'Não considerada';
      $('r-stored').textContent = rainEnabled ? `${fmt(stored)} L` : 'Não considerada';
      $('r-used').textContent = rainEnabled ? `${fmt(used)} L` : 'Não considerada';
      $('r-water-cost').textContent = brl(waterCost);
      $('r-energy').textContent = `${fmt(energyKwh)} kWh`;
      $('r-energy-cost').textContent = brl(energyCost);
      $('r-saving').textContent = rainEnabled ? brl(saving) : 'Não considerada';
      $('rain-report-note').textContent = rainEnabled ? `A economia potencial considera somente a água da chuva efetivamente utilizada (${fmt(used)} L), limitada pela capacidade do reservatório e pela necessidade mensal. Não inclui instalação ou manutenção.` : 'A captação de água da chuva não foi considerada nesta simulação.';
      shell.hidden = true; report.hidden = false; window.scrollTo({ top: 0, behavior: 'smooth' });
   }
   $('calculate-button').addEventListener('click', generate);
   $('back-calculator').addEventListener('click', e => {
      e.preventDefault(); form.reset(); $('efficiency').value = ''; $('efficiency-help').textContent = 'Escolha o método para carregar uma referência editável.';
      $('rain-fields').classList.add('is-disabled'); $('rain-fields').setAttribute('aria-disabled', 'true');
      $('rain-fields').querySelectorAll('input').forEach(i => { i.disabled = true; i.required = false; });
      report.hidden = true; shell.hidden = false; setStep(1); window.scrollTo({ top: 0, behavior: 'smooth' });
   });
   // Prepara uma versão para impressão do relatório, permitindo salvar como PDF.
   $('download-report').addEventListener('click', () => {
      const button = $('download-report');
      const element = $('report-content');
      const originalText = button.innerHTML;
      // Abre a janela de impressão diretamente no clique para evitar bloqueio de popup.
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
         alert('O navegador bloqueou a janela do relatório. Permita pop-ups para este site e tente novamente.');
         return;
      }
      button.disabled = true;
      button.innerHTML = '<span class="material-symbols-rounded">hourglass_top</span> Preparando relatório...';
      try {
         const stylesheetLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
            .map(link => `<link rel="stylesheet" href="${link.href}">`).join('');
         const reportMarkup = element.innerHTML;
         printWindow.document.open();
         printWindow.document.write(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Relatório Cultiva</title>
${stylesheetLinks}
<style>
 @page{size:A4 portrait;margin:12mm}
 *{box-sizing:border-box}
 html,body{margin:0;padding:0;background:#fff!important;color:#202124!important;font-family:Arial,sans-serif!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}
 .report-content{display:block!important;width:100%!important;max-width:none!important;margin:0!important;padding:0!important;background:#fff!important;color:#202124!important;overflow:visible!important}
 .report-heading{margin:0 0 18px!important}
 .report-heading .eyebrow,.eyebrow{color:#315fc1!important;font-size:10pt!important;letter-spacing:1.5px}
 .report-heading h1{font-size:23pt!important;line-height:1.15!important;color:#202124!important;margin:0 0 6px!important}
 #report-summary{color:#555!important;font-size:12pt!important}
 .report-group{margin:14px 0!important;break-inside:avoid;page-break-inside:avoid}
 .report-group h2{font-size:16pt!important;color:#202124!important;margin:0 0 7px!important}
 .report-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important;width:100%!important}
 .report-card{min-width:0!important;min-height:70px!important;padding:10px!important;border:1px solid #c8c8c8!important;border-radius:6px!important;background:#fff!important;backdrop-filter:none!important;break-inside:avoid;page-break-inside:avoid}
 .report-card small{display:block!important;color:#555!important;font-size:10pt!important}
 .report-card strong{display:block!important;color:#333!important;font-size:17pt!important;overflow-wrap:anywhere}
 .report-card.blue{border-color:#7da5e8!important;background:#f4f8ff!important}
 .report-card.blue strong{color:#2458ad!important}
 .report-card.green{border-color:#75b99d!important;background:#f2faf6!important}
 .report-card.green strong{color:#08764b!important}
 .report-note{font-size:10pt!important;color:#444!important;margin:12px 0!important}
 .report-disclaimer{font-size:9pt!important;color:#555!important;border-top:1px solid #ccc!important;padding-top:9px!important;margin-top:12px!important}
 @media print{body{background:#fff!important}.report-group,.report-card{break-inside:avoid;page-break-inside:avoid}}
</style>
</head>
<body>
<main class="report-content">${reportMarkup}</main>
<script>
 window.addEventListener('load',async()=>{
  try{if(document.fonts&&document.fonts.ready)await document.fonts.ready;}catch(e){}
  setTimeout(()=>window.print(),250);
 });
 window.addEventListener('afterprint',()=>window.close());
</script>
</body>
</html>`);
         printWindow.document.close();
         printWindow.focus();
      } catch (error) {
         console.error('Erro ao preparar relatório para impressão:', error);
         printWindow.close();
         alert('Não foi possível preparar o relatório. Tente novamente.');
      } finally {
         button.disabled = false;
         button.innerHTML = originalText;
      }
   });
});