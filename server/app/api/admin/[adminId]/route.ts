import { PrismaClient, Role } from "@prisma/client";

export async function GET (req: Request, params: { adminId: number}) {
    try {
        const prisma = new PrismaClient()
        const user = await prisma.user.findFirst({
            where: {
                userId: params.adminId,
                role: Role.ADMIN,
            }
        })
        return Response.json(user, { status: 200})
    } catch (error) {
        console.log("ADMIN | GET :", error)
        return new Response("Internal Server error", {status: 500})
    }
}

export async function PATCH (req: Request, params: { adminId: number}) {
    try {
        const prisma = new PrismaClient()
        const data = await req.json()
        const user = await prisma.user.update({
            where: {
                userId: params.adminId,
            },
            data: {
                ...data
            }
        })
        return Response.json(user, { status: 200})
    } catch (error) {
        console.log("ADMIN | PATCH :", error)
        return new Response("Internal Server error", {status: 500})
    }  
}

export async function DELETE (req: Request, params: { adminId: number}) {
    try {
        const prisma = new PrismaClient()
        const data = await req.json()
        const user = await prisma.user.delete({
            where: {
                userId: params.adminId,
                ...data
            },
        })
        return Response.json(user, { status: 200})
    } catch (error) {
        console.log("ADMIN | DELETE :", error)
        return new Response("Internal Server error", {status: 500})
    }  
}