import { PrismaClient, Role } from "@prisma/client";
import { saltAndHashPassword } from "@/lib/password";

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
        const doctors = await prisma.doctor.findFirst({
            where: {
                ...data,
            }
        })
        return Response.json(doctors, { status: 201})
    } catch (error) {
        console.log("DOCTOR | GET :", error)
        return new Response("Internal Server error", {status: 500})
    }
}

export async function POST (req: Request) {
    try {
        const prisma = new PrismaClient()
        const data = await req.json()
        const user = await prisma.user.create({
            data: {
                role: Role.DOCTOR,
                password: await saltAndHashPassword(data.password),
               ...data
            }
        })
        const doctor = await prisma.doctor.create({
            data: {
                userId: user.userId
            }
        })
        return Response.json(doctor, { status: 200})
    } catch (error) {
        console.log("DOCTOR | POST :", error)
        return new Response("Internal Server error", {status: 500})
    }
}
