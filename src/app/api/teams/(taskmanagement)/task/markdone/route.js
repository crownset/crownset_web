

import { dbConnect } from '@/helpers/db';
import Todo from '@/modelCS/todo'
import TaskList from '@/modelCS/tasklist';
import {  NextResponse } from 'next/server';



export async function PUT(req) {
    dbConnect();

    try {
        const { todo_id } = await req.json();
        console.log(todo_id)
        const todo = await Todo.findByIdAndUpdate({ _id: todo_id }, { $set: { is_completed: true } }, { new: true });
        if (!todo) {
            return NextResponse.json({ message: "Todo not found" }, { status: 404 })
        }


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
            status = now <= taskListDeadline ? 'ontime' : 'delay';


            lastCompletedDate = new Date(Math.max(...todos.map(todo => new Date(todo.updatedAt))));
        }


        await TaskList.findByIdAndUpdate(tasklistId, {
            status,
            lastCompletedDate
        });
    } catch (error) {
        console.error('Error updating task list status:', error);
        return NextResponse.json({ message: "Error in updating task list Status" })
    }
};
