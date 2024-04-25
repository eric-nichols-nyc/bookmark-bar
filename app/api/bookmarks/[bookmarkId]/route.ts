import { NextRequest } from "next/server";
import { prisma } from "@/db/prisma";

// update a url by id

export async function PUT(req: NextRequest, context: any) {
    const { params } = context;
    const urlId = params.urlId;

    try{
        const body = await req.json();

        const updatedUrl = await prisma.url.update({
            where: {
                id: urlId,
            },
            data: {
                ...body,
            },
        });
    
        return new Response(JSON.stringify({ updatedUrl }));
    }catch(error: any){
        console.error(`Error: ${error.message}`);
        return new Response(JSON.stringify({message:error.message}));
    }   
}