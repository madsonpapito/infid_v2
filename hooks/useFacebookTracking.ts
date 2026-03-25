// hooks/useFacebookTracking.ts
"use client";

import { useCallback, useEffect, useState } from 'react';

export interface LocationData {
    city?: string;
    country?: string;
    region?: string;
    postalCode?: string;
    lat?: number;
    lon?: number;
}

export interface UserTrackingData {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    dateOfBirth?: string;
    externalId?: string;
}

/**
 * Hook para tracking do Facebook via dataLayer do GTM
 * Captura automaticamente cookies fbc/fbp, user agent, e dados de localização
 */
export function useFacebookTracking() {
    const [locationData, setLocationData] = useState<LocationData>({});
    const [isReady, setIsReady] = useState(false);

    // Busca dados de localização da API
    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await fetch('/api/location');
                if (response.ok) {
                    const data = await response.json();
                    setLocationData({
                        city: data.city,
                        country: data.country,
                        region: data.region,
                        postalCode: data.postalCode,
                        lat: data.lat,
                        lon: data.lon,
                    });
                }
            } catch (error) {
                console.error('[FB Tracking] Failed to fetch location:', error);
            }
            setIsReady(true);
        };

        fetchLocation();
    }, []);

    // Captura cookies do Facebook (fbc e fbp)
    const getFacebookCookies = useCallback(() => {
        if (typeof document === 'undefined') return { fbc: undefined, fbp: undefined };

        const cookies = document.cookie.split(';').reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split('=');
            acc[key] = value;
            return acc;
        }, {} as Record<string, string>);

        return {
            fbc: cookies['_fbc'],
            fbp: cookies['_fbp'],
        };
    }, []);

    // Gera ou recupera external_id único
    const getExternalId = useCallback(() => {
        if (typeof localStorage === 'undefined') return undefined;

        let externalId = localStorage.getItem('fb_external_id');
        if (!externalId) {
            externalId = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
            localStorage.setItem('fb_external_id', externalId);
        }
        return externalId;
    }, []);

    /**
     * Envia evento para o dataLayer do GTM com todos os dados disponíveis
     */
    const trackEvent = useCallback(async (
        eventName: string,
        userData: UserTrackingData = {},
        customData: Record<string, any> = {}
    ) => {
        if (typeof window === 'undefined') return;

        // Importa dinamicamente para evitar problemas com SSR
        const { pushToDataLayer } = await import('@/lib/facebook-tracking');

        const { fbc, fbp } = getFacebookCookies();
        const externalId = getExternalId();

        // Combina dados do usuário com dados de localização e cookies
        const fullUserData = {
            ...userData,
            city: locationData.city,
            state: locationData.region,
            zipCode: locationData.postalCode,
            country: locationData.country,
            externalId: externalId,
            clientUserAgent: navigator.userAgent,
            fbc,
            fbp,
        };

        pushToDataLayer(eventName, fullUserData, customData);
    }, [locationData, getFacebookCookies, getExternalId]);

    /**
     * Eventos pré-configurados para facilitar o uso
     */
    const trackPageView = useCallback((customData?: Record<string, any>) => {
        trackEvent('PageView', {}, customData);
    }, [trackEvent]);

    const trackLead = useCallback((userData?: UserTrackingData, customData?: Record<string, any>) => {
        trackEvent('Lead', userData || {}, customData);
    }, [trackEvent]);

    const trackViewContent = useCallback((
        contentName: string,
        contentCategory?: string,
        userData?: UserTrackingData
    ) => {
        trackEvent('ViewContent', userData || {}, {
            content_name: contentName,
            content_category: contentCategory,
        });
    }, [trackEvent]);

    const trackInitiateCheckout = useCallback((
        value: number,
        currency: string = 'BRL',
        userData?: UserTrackingData
    ) => {
        trackEvent('InitiateCheckout', userData || {}, {
            value,
            currency,
        });
    }, [trackEvent]);

    const trackPurchase = useCallback((
        value: number,
        currency: string = 'BRL',
        orderId?: string,
        userData?: UserTrackingData
    ) => {
        trackEvent('Purchase', userData || {}, {
            value,
            currency,
            order_id: orderId,
        });
    }, [trackEvent]);

    return {
        isReady,
        locationData,
        trackEvent,
        trackPageView,
        trackLead,
        trackViewContent,
        trackInitiateCheckout,
        trackPurchase,
    };
}
