import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();
    const { username } = body;

    // Mock response for now
    // In a real scenario, this would call Instagram's API
    return NextResponse.json({
        profilePicUrl: `https://ui-avatars.com/api/?name=${username}&background=random&size=200`,
        username: username,
        isPrivate: false
    });
}
