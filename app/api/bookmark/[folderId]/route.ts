import { auth, clerkClient } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/prisma";
//POST a new url to a folder by folder id and user id with prisma
export async function POST(req: NextRequest, context: any) {
    const { params } = context;
    const folderId = params.folderId;

    const { userId } = auth();
 
    if (userId) {
        console.log('User Id = ', userId)
      // Query DB for user specific information or display assets only to signed in users 
    }

    const { isSignedIn } = await clerkClient.authenticateRequest({ request: req })
    if ( !isSignedIn ) {
      return NextResponse.json({ status: 401 })
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            externalId: userId as string,
        },
    });

     const currentUserId = currentUser?.id;
     
    const body = await req.json()

     const { url, title, description, imageUrl, icon } = body;

    if (!url || !title || !folderId) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }));
    }

    const newUrl = await prisma.url.create({
        data: {
            userId: currentUserId as string,
            folderId: folderId,
            url: url,
            title: title,
            description: description,
            imageUrl: imageUrl,
            icon: icon,
            tags: []
        },
    });

    return new Response(JSON.stringify({ newUrl }));
 }

 // get a list of urls by folder id
export async function GET(req: NextRequest, context: any) {
    const { params } = context;
    const folderId = params.folderId;

    const urls = await prisma.url.findMany({
        where: {
            folderId: folderId,
        },
    });

    return new Response(JSON.stringify({ urls }));
}

// delete a url by id
export async function DELETE(req: NextRequest, context: any) {
    const { params } = context;
    const urlId = params.urlId;

    const deletedUrl = await prisma.url.delete({
        where: {
            id: urlId,
        },
    });

    return new Response(JSON.stringify({ deletedUrl }));
}



