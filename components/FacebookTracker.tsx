// components/FacebookTracker.tsx
"use client";

import { useEffect } from 'react';
import { useFacebookTracking } from '@/hooks/useFacebookTracking';

interface FacebookTrackerProps {
    eventName?: string;
    contentName?: string;
    contentCategory?: string;
    userData?: {
        email?: string;
        phone?: string;
        firstName?: string;
        lastName?: string;
        gender?: string;
        dateOfBirth?: string;
    };
    customData?: Record<string, any>;
}

/**
 * Componente para tracking automático do Facebook via dataLayer/GTM
 * Adicione este componente em qualquer página para enviar eventos automaticamente
 * 
 * @example
 * // PageView simples
 * <FacebookTracker />
 * 
 * // Com evento específico
 * <FacebookTracker eventName="Lead" />
 * 
 * // Com dados do usuário
 * <FacebookTracker eventName="InitiateCheckout" userData={{ phone: "11999999999" }} customData={{ value: 37, currency: "BRL" }} />
 */
export function FacebookTracker({
    eventName = 'PageView',
    contentName,
    contentCategory,
    userData,
    customData,
}: FacebookTrackerProps) {
    const { isReady, trackEvent, trackPageView, trackViewContent } = useFacebookTracking();

    useEffect(() => {
        if (!isReady) return;

        // Se é um ViewContent com contentName
        if (eventName === 'ViewContent' && contentName) {
            trackViewContent(contentName, contentCategory, userData);
            return;
        }

        // Se é um PageView simples
        if (eventName === 'PageView') {
            trackPageView(customData);
            return;
        }

        // Qualquer outro evento
        trackEvent(eventName, userData || {}, customData || {});
    }, [isReady, eventName, contentName, contentCategory, userData, customData, trackEvent, trackPageView, trackViewContent]);

    // Componente invisível - apenas para tracking
    return null;
}


