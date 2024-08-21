import { PrismaClient, Role } from "@prisma/client";
import { saltAndHashPassword } from "@/lib/password";

export async function GET (req: Request) {
    try {
        const prisma = new PrismaClient()
        const data = await req.json()
        const password = await saltAndHashPassword(data.password)
        const users = await prisma.user.findFirst({
            where: {
                password,
                ...data,
                role: Role.ADMIN
            }
        })
        return Response.json(users, { status: 201})
    } catch (error) {
        console.log("ADMIN | GET :", error)
        return new Response("Internal Server error", {status: 500})
    }
}

export async function POST (req: Request) {
    try {
        const prisma = new PrismaClient()
        const data = await req.json()
        const password = await saltAndHashPassword(data.password)
        const user = await prisma.user.create({
            data: {
                password,
                role: Role.ADMIN,
                ...data
            }
        })
        return Response.json(user, { status: 200})
    } catch (error) {
        console.log("ADMIN | POST :", error)
        return new Response("Internal Server error", {status: 500})
    }
}
