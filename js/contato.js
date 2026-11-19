/* 
RM575069 - Gabriely Santos Moreira - 1TDSPA
RM575043 - Larissa Avelina Cerqueira - 1TDSPA 
RM575985 - Isabelly Viana Chavier Bustamante Sa - 1TDSPA
RM576189 - Stéfany Maria Santana Freitas - 1TDSPA
RM576071 - Renan Hesz Filho - 1TDSPA 
*/
/* Cultiva | Global Solution Citizen Tech */

/* Validação do formulário de contato — Cultiva */
// Inicializa a validação somente quando o documento já pode ser manipulado.
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form'); if (!form) return;
    const feedback = document.getElementById('contact-feedback');
    // Intercepta o envio para validar os campos e exibir retorno ao usuário.
    form.addEventListener('submit', event => {
        event.preventDefault(); let valid = true;
        // Verifica preenchimento obrigatório e formato do e-mail em cada campo.
        [...form.querySelectorAll('input,textarea')].forEach(field => {
            const error = field.nextElementSibling; let message = '';
            if (!field.value.trim()) message = 'Este campo é obrigatório.';
            else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) message = 'Informe um e-mail válido.';
            field.classList.toggle('invalid', Boolean(message));
            if (error && error.classList.contains('field-error')) error.textContent = message;
            if (message) valid = false;
        });
        if (!valid) { feedback.textContent = 'Revise os campos destacados.'; feedback.className = 'form-feedback error'; return; }
        feedback.textContent = 'Mensagem validada! Este formulário demonstrativo não realiza envio para um servidor.'; feedback.className = 'form-feedback success'; form.reset();
    });
});