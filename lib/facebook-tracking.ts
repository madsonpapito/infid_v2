// lib/facebook-tracking.ts
// Utilitário para enviar dados enriquecidos para o dataLayer do GTM
// para serem capturados pela Conversions API do Facebook

import { createHash } from 'crypto';

/**
 * Aplica hash SHA256 a um valor (normalizado)
 */
export function hashSHA256(value: string): string {
    if (!value) return '';
    return createHash('sha256').update(value.toLowerCase().trim()).digest('hex');
}

/**
 * Normaliza email para o formato do Facebook
 */
export function normalizeEmail(email: string): string {
    if (!email) return '';
    return email.toLowerCase().trim();
}

/**
 * Normaliza telefone para o formato do Facebook
 * Remove símbolos e garante código do país
 */
export function normalizePhone(phone: string, countryCode: string = '55'): string {
    if (!phone) return '';
    // Remove tudo que não é número
    let cleaned = phone.replace(/\D/g, '');
    // Remove zeros à esquerda
    cleaned = cleaned.replace(/^0+/, '');
    // Adiciona código do país se não existir
    if (!cleaned.startsWith(countryCode)) {
        cleaned = countryCode + cleaned;
    }
    return cleaned;
}

/**
 * Normaliza nome (primeiro nome ou sobrenome)
 */
export function normalizeName(name: string): string {
    if (!name) return '';
    return name.toLowerCase().trim().replace(/[^a-záàâãéèêíïóôõöúüç]/gi, '');
}

/**
 * Normaliza cidade
 */
export function normalizeCity(city: string): string {
    if (!city) return '';
    return city.toLowerCase().trim().replace(/[^a-záàâãéèêíïóôõöúüç]/gi, '');
}

/**
 * Normaliza estado para código de 2 caracteres
 */
export function normalizeState(state: string): string {
    if (!state) return '';
    return state.toLowerCase().trim().substring(0, 2);
}

/**
 * Converte nome do país para código ISO 3166-1 alpha-2
 */
export function normalizeCountry(country: string): string {
    if (!country) return '';

    const countryMap: Record<string, string> = {
        'brazil': 'br',
        'brasil': 'br',
        'united states': 'us',
        'usa': 'us',
        'portugal': 'pt',
        'spain': 'es',
        'espanha': 'es',
        'argentina': 'ar',
        'mexico': 'mx',
        'méxico': 'mx',
        'chile': 'cl',
        'colombia': 'co',
        'colômbia': 'co',
        'peru': 'pe',
        'venezuela': 've',
        'uruguay': 'uy',
        'paraguai': 'py',
        'paraguay': 'py',
    };

    const normalized = country.toLowerCase().trim();
    return countryMap[normalized] || normalized.substring(0, 2).toLowerCase();
}

/**
 * Normaliza CEP
 */
export function normalizeZipCode(zipCode: string): string {
    if (!zipCode) return '';
    // Remove hífen e espaços, pega primeiros 5 dígitos
    return zipCode.replace(/[-\s]/g, '').substring(0, 8).toLowerCase();
}

/**
 * Normaliza gênero para formato do Facebook (m/f)
 */
export function normalizeGender(gender: string): string {
    if (!gender) return '';
    const g = gender.toLowerCase().trim();
    if (g === 'male' || g === 'masculino' || g === 'm' || g === 'homem') return 'm';
    if (g === 'female' || g === 'feminino' || g === 'f' || g === 'mulher') return 'f';
    return '';
}

/**
 * Normaliza data de nascimento para formato YYYYMMDD
 */
export function normalizeDateOfBirth(dob: string | Date): string {
    if (!dob) return '';

    let date: Date;
    if (typeof dob === 'string') {
        date = new Date(dob);
    } else {
        date = dob;
    }

    if (isNaN(date.getTime())) return '';

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}${month}${day}`;
}

export interface UserDataParams {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    dateOfBirth?: string | Date;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    externalId?: string;
    clientIpAddress?: string;
    clientUserAgent?: string;
    fbc?: string;
    fbp?: string;
}

export interface HashedUserData {
    em?: string;
    ph?: string;
    fn?: string;
    ln?: string;
    ge?: string;
    db?: string;
    ct?: string;
    st?: string;
    zp?: string;
    country?: string;
    external_id?: string;
    client_ip_address?: string;
    client_user_agent?: string;
    fbc?: string;
    fbp?: string;
}

/**
 * Constrói objeto user_data com hashing aplicado conforme especificação do Facebook
 */
export function buildHashedUserData(params: UserDataParams): HashedUserData {
    const userData: HashedUserData = {};

    if (params.email) {
        userData.em = hashSHA256(normalizeEmail(params.email));
    }
    if (params.phone) {
        userData.ph = hashSHA256(normalizePhone(params.phone));
    }
    if (params.firstName) {
        userData.fn = hashSHA256(normalizeName(params.firstName));
    }
    if (params.lastName) {
        userData.ln = hashSHA256(normalizeName(params.lastName));
    }
    if (params.gender) {
        const normalizedGender = normalizeGender(params.gender);
        if (normalizedGender) {
            userData.ge = hashSHA256(normalizedGender);
        }
    }
    if (params.dateOfBirth) {
        const normalizedDob = normalizeDateOfBirth(params.dateOfBirth);
        if (normalizedDob) {
            userData.db = hashSHA256(normalizedDob);
        }
    }
    if (params.city) {
        userData.ct = hashSHA256(normalizeCity(params.city));
    }
    if (params.state) {
        userData.st = hashSHA256(normalizeState(params.state));
    }
    if (params.zipCode) {
        userData.zp = hashSHA256(normalizeZipCode(params.zipCode));
    }
    if (params.country) {
        userData.country = hashSHA256(normalizeCountry(params.country));
    }
    if (params.externalId) {
        userData.external_id = hashSHA256(params.externalId);
    }
    // Estes NÃO devem ter hash
    if (params.clientIpAddress) {
        userData.client_ip_address = params.clientIpAddress;
    }
    if (params.clientUserAgent) {
        userData.client_user_agent = params.clientUserAgent;
    }
    if (params.fbc) {
        userData.fbc = params.fbc;
    }
    if (params.fbp) {
        userData.fbp = params.fbp;
    }

    return userData;
}

/**
 * Envia evento para o dataLayer do GTM com dados do usuário para Facebook CAPI
 */
export function pushToDataLayer(
    eventName: string,
    userData: UserDataParams,
    customData?: Record<string, any>
) {
    if (typeof window === 'undefined') return;

    // @ts-ignore - dataLayer é injetado pelo GTM
    window.dataLayer = window.dataLayer || [];

    const hashedUserData = buildHashedUserData(userData);

    // @ts-ignore
    window.dataLayer.push({
        event: eventName,
        user_data: hashedUserData,
        custom_data: customData || {},
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: window.location.href,
        action_source: 'website',
    });

    console.log(`[FB Tracking] Event "${eventName}" pushed to dataLayer`, {
        user_data: hashedUserData,
        custom_data: customData,
    });
}
