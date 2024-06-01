import { clerkClient } from '@clerk/nextjs/server'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from "@/db/prisma";

export async function GET(req: NextRequest, context: any) {
    const { params } = context;
    const id = params.userId;
    const userId = await (await clerkClient.users.getUser(id as string)).id;

    const currentUser = await prisma.user.findUnique({
        where: {
            externalId: userId as string,
        },
    });

    const currentUserId = currentUser?.id;

    const folders = await prisma.folder.findMany({
        where: {
            userId: currentUserId as string,
        },
    });

    // return folders
    return new Response(JSON.stringify({ folders }));
}

export async function POST(req: NextRequest, context: any) {
    const { params } = context;
    const id = params.id;

    const { isSignedIn } = await clerkClient.authenticateRequest(req);

    if (!isSignedIn) {
        return NextResponse.json({ status: 401 });
    }

    const userId = await (await clerkClient.users.getUser(id as string)).id;

    const currentUser = await prisma.user.findUnique({
        where: {
            externalId: userId as string,
        },
    });

    const currentUserId = currentUser?.id;

    const body = await req.json();
    const { name, index } = body;

    if (!name) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }));
    }

    const bookmark = await prisma.folder.create({
        data: {
            name,
            index,
            userId: currentUserId as string,
        },
    });

    return new Response(JSON.stringify({ bookmark }));
}
