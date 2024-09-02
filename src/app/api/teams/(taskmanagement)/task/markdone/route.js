

import { dbConnect } from '@/helpers/db';
import Todo from '@/modelCS/todo'
import TaskList from '@/modelCS/tasklist';
import {  NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'



export async function PUT(req) {
    await dbConnect();

    try {


        const {todo_id} = await req.json();
        // console.log("todo_id",todo_id);
        const token = req.cookies.get("authToken:")?.value || '';

        if (!token) {
            return NextResponse.json({ message: "Please Login First" }, { status: 401 })
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY)
        if (!decode) {
            return NextResponse.json({ message: "You are not authorized" }, { status: 401 })
        }

        
        const todo = await Todo.findById({ _id: todo_id });
        if (!todo) {
            return NextResponse.json({ message: "Todo not found" }, { status: 404 })
        }
        
        if(todo.is_completed){
            return NextResponse.json({message:"Already Done"},{status:200})
        }
        

        const newtodo = await Todo.findByIdAndUpdate({ _id: todo_id }, { $set: { is_completed: true } }, { new: true });
       
        const taskListId = todo.tasklist_id;
        const taskList = await TaskList.findById(taskListId);
        if (!taskList) {
            return NextResponse.json({ message: 'TaskList not found' }, { status: 404 })
        }

        await updateTaskListStatus(taskListId);

        return NextResponse.json({ message: "Todo Updated", data: todo }, { status: 200 })

    } catch (error) {
        console.error('Error updating todo and task list:', error);
        return NextResponse.json({ message: "Error updating todo and task list" }, { status: 500 })

    }

}


const updateTaskListStatus = async (tasklistId) => {
    try {
        const taskList = await TaskList.findById(tasklistId);
        if (!taskList) {
            return NextResponse.json({ message: "TaskList is not found" })
        }

        const todos = await Todo.find({ tasklist_id: tasklistId });

        const allTodosCompleted = todos.every(todo => todo.is_completed);
        const now = new Date();

        let status = 'incomplete';
        let lastCompletedDate = null;

        if (allTodosCompleted) {

            const taskListDeadline = new Date(taskList.deadline);
            status = now.toISOString().split('T')[0] <= taskListDeadline.toISOString().split('T')[0] ? 'ontime' : 'delay';
            lastCompletedDate = now;
            await TaskList.findByIdAndUpdate(tasklistId, {
                status,
                lastCompletedDate,
                is_complete:true
            });
        }
  
        return NextResponse.json({message:"Todos are Remaining"});

       
    } catch (error) {
        console.error('Error updating task list status:', error);
        return NextResponse.json({ message: "Error in updating task list Status" })
    }
};
