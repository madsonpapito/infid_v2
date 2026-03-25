// app/api/location/route.ts

import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // First, try Vercel headers (production)
  const vercelCity = request.headers.get('x-vercel-ip-city');
  const vercelCountry = request.headers.get('x-vercel-ip-country');
  const vercelLat = request.headers.get('x-vercel-ip-latitude');
  const vercelLon = request.headers.get('x-vercel-ip-longitude');

  if (vercelCity && vercelCountry && vercelLat && vercelLon) {
    return NextResponse.json({
      status: 'success',
      city: decodeURIComponent(vercelCity),
      country: vercelCountry,
      region: request.headers.get('x-vercel-ip-country-region') || '',
      postalCode: request.headers.get('x-vercel-ip-postal-code') || '',
      lat: parseFloat(vercelLat),
      lon: parseFloat(vercelLon),
    });
  }

  // Fallback: fetch real IP geolocation via external API (works in dev too)
  try {
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : null;

    // Use ipapi.co — free, no key needed
    const geoUrl = ip && ip !== '127.0.0.1' && ip !== '::1'
      ? `https://ipapi.co/${ip}/json/`
      : `https://ipapi.co/json/`;

    const geoRes = await fetch(geoUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      cache: 'no-store',
    });

    if (!geoRes.ok) throw new Error('ipapi.co failed');

    const geo = await geoRes.json();

    if (geo.error) throw new Error(geo.reason || 'ipapi error');

    return NextResponse.json({
      status: 'success',
      city: geo.city || 'Unknown',
      country: geo.country_code || '',
      region: geo.region || '',
      postalCode: geo.postal || '',
      lat: geo.latitude,
      lon: geo.longitude,
    });

  } catch (error: any) {
    console.error("Geolocation error:", error.message);
    return NextResponse.json(
      { error: 'Could not determine location.' },
      { status: 500 }
    );
  }
}
