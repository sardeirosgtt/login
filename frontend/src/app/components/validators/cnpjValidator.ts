import { AbstractControl, ValidationErrors } from '@angular/forms';

export function documentoValidator(
    control: AbstractControl
): ValidationErrors | null {
    const documento = control.value;

    if (!documento) {
        return null; // Retorna null se o campo estiver vazio, pois a validação de "required" já trata isso.
    }

    // Remove tudo que não for dígito.
    const cleanedDocumento = documento.replace(/[^\d]+/g, '');

    if (cleanedDocumento.length === 11) {
        return validarCpf(cleanedDocumento);
    } else if (cleanedDocumento.length === 14) {
        return validarCnpj(cleanedDocumento);
    }

    return { documentoInvalid: true }; // Documento precisa ter 11 (CPF) ou 14 (CNPJ) dígitos.
}

function validarCpf(cpf: string): ValidationErrors | null {
    let soma = 0;
    let resto;

    if (cpf === '00000000000') return { cpfInvalid: true }; // CPF não pode ser todos zeros.

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
        resto = 0;
    }

    if (resto !== parseInt(cpf.charAt(9))) {
        return { cpfInvalid: true };
    }

    soma = 0;

    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
        resto = 0;
    }

    if (resto !== parseInt(cpf.charAt(10))) {
        return { cpfInvalid: true };
    }

    return null; // CPF válido.
}

function validarCnpj(cnpj: string): ValidationErrors | null {
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += +numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== +digitos.charAt(0)) {
        return { cnpjInvalid: true };
    }

    tamanho += 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += +numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== +digitos.charAt(1)) {
        return { cnpjInvalid: true };
    }

    return null; // CNPJ válido.
}
