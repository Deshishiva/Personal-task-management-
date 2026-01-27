import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const register = async (req:any,res:any) => {
  const { email, password } = req.body;

  const hashed = await bcrypt.hash(password,10);

  const user = await prisma.user.create({
    data:{
      email,
      password: hashed
    }
  });

  res.json(user);
};

export const login = async (req:any,res:any) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where:{ email }
  });

  if(!user) return res.status(401).json({message:"Invalid credentials"});

  const match = await bcrypt.compare(password, user.password);

  if(!match) return res.status(401).json({message:"Invalid credentials"});

  // IMPORTANT: include user.id in token
  const token = jwt.sign({ id: user.id }, "secret");

  res.json({ token });
};
