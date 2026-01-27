import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTask = async (req:any,res:any)=>{
  const task = await prisma.task.create({
    data:{
      title: req.body.title,
      userId: req.user.id
    }
  });
  res.json(task);
};

export const getTasks = async (req:any,res:any)=>{
  const tasks = await prisma.task.findMany({
    where:{ userId: req.user.id }
  });
  res.json(tasks);
};

export const updateTask = async (req:any,res:any)=>{
  const id = Number(req.params.id);
  const { title } = req.body;

  const task = await prisma.task.update({
    where:{ id },
    data:{ title }
  });

  res.json(task);
};

export const deleteTask = async (req:any,res:any)=>{
  const id = Number(req.params.id);

  await prisma.task.delete({
    where:{ id }
  });

  res.json({ success: true });
};

export const toggleTask = async (req:any,res:any)=>{
  const id = Number(req.params.id);

  const task = await prisma.task.findUnique({
    where:{ id }
  });

  const updated = await prisma.task.update({
    where:{ id },
    data:{ completed: !task?.completed }
  });

  res.json(updated);
};
