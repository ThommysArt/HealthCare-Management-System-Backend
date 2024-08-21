import { saltAndHashPassword } from "@/lib/password";
import { PrismaClient, Role } from "@prisma/client";

export async function GET (req: Request) {
    try {
        const prisma = new PrismaClient()
        const data = await req.json()
        const user = await prisma.user.findFirst({
            where: {
                email: data.email,
                password: await saltAndHashPassword(data.password)
            }
        })
        const patient = await prisma.patient.findFirst({
            where: {
                userId: user?.userId,
                ...data,
            }
        })
        return Response.json(patient, { status: 201})
    } catch (error) {
        console.log("patient | GET :", error)
        return new Response("Internal Server error", {status: 500})
    }
}

export async function POST (req: Request) {
    try {
        const prisma = new PrismaClient()
        const data = await req.json()
        const user = await prisma.user.create({
            data: {
                role: Role.PATIENT,
                password: await saltAndHashPassword(data.password),
               ...data
            }
        })
        const patient = await prisma.patient.create({
            data: {
                userId: user.userId
            }
        })
        return Response.json(patient, { status: 200})
    } catch (error) {
        console.log("patient | POST :", error)
        return new Response("Internal Server error", {status: 500})
    }
}
