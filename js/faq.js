/* 
RM575069 - Gabriely Santos Moreira - 1TDSPA
RM575043 - Larissa Avelina Cerqueira - 1TDSPA 
RM575985 - Isabelly Viana Chavier Bustamante Sa - 1TDSPA
RM576189 - Stéfany Maria Santana Freitas - 1TDSPA
RM576071 - Renan Hesz Filho - 1TDSPA 
*/
/* Cultiva | Global Solution Citizen Tech */

/* Animação suave de abertura e fechamento do acordeão do FAQ. */
// Configura a animação dos itens de perguntas frequentes após carregar o HTML.
document.addEventListener('DOMContentLoaded', () => {
    // Identifica os itens do acordeão e respeita a preferência por movimento reduzido.
    const items = document.querySelectorAll('.faq-item');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Cada pergunta controla a abertura e o fechamento da resposta correspondente.
    items.forEach((item) => {
        const summary = item.querySelector('summary');
        const answer = item.querySelector('p');
        if (!summary || !answer) return;

        summary.addEventListener('click', (event) => {
            event.preventDefault();
            if (item.dataset.animating === 'true') return;

            const opening = !item.open;
            item.dataset.animating = 'true';

            if (reduceMotion) {
                item.open = opening;
                delete item.dataset.animating;
                return;
            }

            // Mede a altura inicial/final para animar a resposta sem saltos visuais.
            const startHeight = opening ? 0 : answer.getBoundingClientRect().height;
            if (opening) {
                item.open = true;
                answer.style.height = 'auto';
            }
            const endHeight = opening ? answer.scrollHeight : 0;
            answer.style.height = `${startHeight}px`;
            answer.style.opacity = opening ? '0' : '1';
            answer.getBoundingClientRect();

            const animation = answer.animate(
                [
                    { height: `${startHeight}px`, opacity: opening ? 0 : 1 },
                    { height: `${endHeight}px`, opacity: opening ? 1 : 0 }
                ],
                { duration: 280, easing: 'ease-in-out' }
            );

            animation.onfinish = () => {
                item.open = opening;
                answer.style.height = '';
                answer.style.opacity = '';
                delete item.dataset.animating;
            };
            animation.oncancel = () => {
                answer.style.height = '';
                answer.style.opacity = '';
                delete item.dataset.animating;
            };
        });
    });
});
