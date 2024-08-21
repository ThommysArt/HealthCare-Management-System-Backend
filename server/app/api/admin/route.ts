import { PrismaClient, Role } from "@prisma/client";
import { saltAndHashPassword } from "@/lib/password";
import bcrypt from "bcrypt";

export async function PATCH (req: Request) {
    try {
        const prisma = new PrismaClient()
        console.log(req)
        const data = await req.json()
        const user = await prisma.user.findFirst({
            where: {
                email: data.email,
                role: Role.ADMIN
            }
        })
        if (user && bcrypt.compareSync(data.password, user.password)) {
            return Response.json(user, { status: 200})
        } else {
            return new Response("Invalid email or password", { status: 401 })
        }
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
                ...data,
                password,
                role: Role.ADMIN,
                
            }
        })
        return Response.json(user, { status: 200})
    } catch (error) {
        console.log("ADMIN | POST :", error)
        return new Response("Internal Server error", {status: 500})
    }
}
