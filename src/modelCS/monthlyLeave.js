
// import { UserCS } from "@/modelCS/user";
// import cron from 'node-cron';

// export async function monthlyLeave() {

//     cron.schedule('* * * * *', async () => {
//     console.log('Cron job running every minute');

//     const users = await UserCS.find({});

//     users.forEach(async (user) => {
//         const newLeaveBalance = Math.min(user.leaveBalance + 1.25, 15); // Cap at 18
//         user.leaveBalance = newLeaveBalance;
//         await user.save();
//     });
//     });

//     console.log('Leave process completed');
// }