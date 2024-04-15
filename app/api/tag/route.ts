import { auth, clerkClient } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/prisma";
//POST a new url to a folder by folder id and user id with prisma
export async function POST(req: NextRequest) {

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

     const { name } = body;

    if (!name || !currentUserId) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }));
    }

    const newUrl = await prisma.tag.create({
        data: {
            userId: currentUserId as string,
            name: name,
            urlIds: []
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

// delete a tag by id
export async function DELETE(req: NextRequest, context: any) {
    const { params } = context;
    const tagId = params.tagId;

    const deletedTag = await prisma.tag.delete({
        where: {
            id: tagId,
        },
    });

    return new Response(JSON.stringify({ deletedTag }));
}

// update a tag by id
export async function PUT(req: NextRequest, context: any) {
    const { params } = context;
    const tagId = params.tagId;

    try{
        const body = await req.json();

        const updatedTag = await prisma.tag.update({
            where: {
                id: tagId,
            },
            data: {
                ...body,
            },
        });
    
        return new Response(JSON.stringify({ updatedTag }));
    }catch(error: any){
        console.error(`Error: ${error.message}`);
        return {message:error.message}
    }   
}
 




