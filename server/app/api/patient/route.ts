import { saltAndHashPassword } from "@/lib/password";
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

export async function PATCH (req: Request) {
    try {
        const prisma = new PrismaClient()
        const data = await req.json()
        const user = await prisma.user.findFirst({
            where: {
                email: data.email,
            }
        })
        
        if (user && bcrypt.compareSync(data.password, user.password)) {
            const patient = await prisma.patient.findFirst({
                where: {
                    userId: user?.userId,
                }
            })
            return Response.json(patient, { status: 200})
        } else {
            return Response.json({ message: "Invalid email or password" }, { status: 401 })
        }
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
                ...data,
                role: Role.PATIENT,
                password: await saltAndHashPassword(data.password),
               
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
