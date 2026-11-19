/* 
RM575069 - Gabriely Santos Moreira - 1TDSPA
RM575043 - Larissa Avelina Cerqueira - 1TDSPA 
RM575985 - Isabelly Viana Chavier Bustamante Sa - 1TDSPA
RM576189 - Stéfany Maria Santana Freitas - 1TDSPA
RM576071 - Renan Hesz Filho - 1TDSPA 
*/
/* Cultiva | Global Solution Citizen Tech */

/* Mapa SVG e conteúdo regional do Cultiva */
// Carrega o mapa e ativa os controles depois que a página estiver pronta.
document.addEventListener('DOMContentLoaded', async () => {
    // Elemento que recebe o SVG do Brasil; se não existir, esta página não usa o script.
    const host = document.getElementById('brazil-map'); if (!host) return;
    // Relaciona cada região brasileira ao identificador do grupo correspondente no SVG.
    const regionGroups = {
        'Norte': 'g25912', 'Nordeste': 'g27790', 'Centro-Oeste': 'g27744', 'Sudeste': 'g27734', 'Sul': 'g28356'
    };
    // Define as categorias de informação exibidas no painel lateral.
    const categories = {
        production: { label: 'Principais culturas', key: 'production' },
        climate: { label: 'Características climáticas', key: 'climate' },
        calendar: { label: 'Calendário de referência', key: 'calendar' },
        challenges: { label: 'Principais desafios', key: 'challenges' },
        guidance: { label: 'Orientações', key: 'guidance' }
    };
    let selectedRegion = '', selectedCategory = 'production';
    // Atualiza textos, abas e destaque visual de acordo com a seleção atual.
    function render() {
        const data = window.DADOS_AGROMAPA?.[selectedRegion]; if (!data) return;
        document.getElementById('selected-region').textContent = selectedRegion;
        document.getElementById('region-intro').textContent = `${data.states.length} unidades federativas na divisão regional considerada.`;
        const category = categories[selectedCategory];
        document.getElementById('region-detail').innerHTML = `<h3>${category.label}</h3><p>${data[category.key]}</p>`;
        document.querySelectorAll('[data-category]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.category === selectedCategory)));
        document.querySelectorAll('[data-region]').forEach(b => b.classList.toggle('active', b.dataset.region === selectedRegion));
        Object.entries(regionGroups).forEach(([region, id]) => {
            const group = host.querySelector(`#${id}`); if (group) group.classList.toggle('region-active', region === selectedRegion);
        });
    }
    // Valida e registra a região escolhida antes de redesenhar o painel.
    function selectRegion(region) { if (!window.DADOS_AGROMAPA?.[region]) return; selectedRegion = region; render(); }
    // Busca o SVG externo, prepara acessibilidade e adiciona interação por mouse/teclado.
    try {
        const response = await fetch('assets/mapa/brasil.svg');
        if (!response.ok) throw new Error('SVG indisponível');
        host.innerHTML = await response.text();
        const svg = host.querySelector('svg');
        if (svg) { svg.removeAttribute('width'); svg.removeAttribute('height'); svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', 'Mapa do Brasil agrupado nas cinco Grandes Regiões'); }
        Object.entries(regionGroups).forEach(([region, id]) => {
            const group = host.querySelector(`#${id}`);
            if (group) {
                group.classList.add('region-shape'); group.setAttribute('tabindex', '0'); group.setAttribute('role', 'button'); group.setAttribute('aria-label', `Selecionar Região ${region}`);
                group.addEventListener('click', () => { selectRegion(region); group.blur(); });
                group.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectRegion(region); } });
            }
        });
    } catch (error) { host.innerHTML = '<p class="map-loading">Não foi possível carregar o SVG. Abra o projeto por um servidor local, como Live Server do VS Code.</p>'; }
    document.querySelectorAll('[data-region]').forEach(b => b.addEventListener('click', () => selectRegion(b.dataset.region)));
    document.querySelectorAll('[data-category]').forEach(b => b.addEventListener('click', () => {
        selectedCategory = b.dataset.category;
        if (selectedRegion) render();
        else document.querySelectorAll('[data-category]').forEach(tab => tab.setAttribute('aria-selected', String(tab === b)));
    }));
});