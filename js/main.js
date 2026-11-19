/* 
RM575069 - Gabriely Santos Moreira - 1TDSPA
RM575043 - Larissa Avelina Cerqueira - 1TDSPA 
RM575985 - Isabelly Viana Chavier Bustamante Sa - 1TDSPA
RM576189 - Stéfany Maria Santana Freitas - 1TDSPA
RM576071 - Renan Hesz Filho - 1TDSPA 
*/
/* Cultiva | Global Solution Citizen Tech */

// Aguarda o HTML estar pronto antes de localizar e configurar os elementos do menu.
document.addEventListener('DOMContentLoaded', () => {
    // Referências ao botão de menu e à navegação compartilhada entre as páginas.
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    if (toggle && nav) {
        // Abre/fecha o menu e atualiza os atributos acessíveis e o ícone.
        toggle.addEventListener('click', () => {
            const opened = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(opened));
            toggle.setAttribute('aria-label', opened ? 'Fechar menu' : 'Abrir menu');
            const icon = toggle.querySelector('.material-symbols-rounded');
            if (icon) icon.textContent = opened ? 'close' : 'menu';
        });
        // Fecha o menu mobile depois que uma opção de navegação é escolhida.
        nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
            nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
            const icon = toggle.querySelector('.material-symbols-rounded'); if (icon) icon.textContent = 'menu';
        }));
    }
});
