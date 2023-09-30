const schedule = require('node-schedule');
const nodemailer = require('nodemailer');
const Task = require('../models/taskSchema');
const User = require('../models/userSchema');
const { DateTime } = require('luxon');
const sendEmail = require('./sendEmail');

async function fetchTasks() {
  const currentDate = new Date(); // Get the current date
  const tasks = await Task.find({
    $and: [
      { dueDate: { $exists: true, $gte: currentDate } }, // dueDate exists and is greater than or equal to the current date
      { status: { $ne: 'Done' } }, // status is not 'Done'
    ],
  });

  return tasks;
}

// const tasks = [
//   {
//     _id: '651657efa740f9282ea16b35',
//     isNotified: false,
//     userId: '651657a5a740f9282ea16afe',
//     status: 'Todo',
//     task: 'hello one',
//     projectName: 'daily task',
//     index: 0,
//     color: '#4F738C',
//     subTasks: [],
//     createdAt: '2023-09-29T04:51:59.386Z',
//     __v: 0,
//     description: '',
//     dueDate: '2023-09-29T05:10:00.000Z',
//     label: 'enhancement',
//     labelColor: '#e33529',
//   },
// ];
async function rescheduleReminders() {
  const tasks = await fetchTasks();
  // console.log(tasks, 'task');
  // // Clear existing scheduled jobs
  // schedule.cancelJob();

  // console.log(tasks);
  // // Schedule jobs for the updated due dates
  tasks.forEach(async (task) => {
    // get user from db which task is running now
    const user = await User.findOne({ _id: task.userId });

    // luxon required ISO String to convert it to UTC
    const date = new Date(task.dueDate).toISOString();
    console.log(date, '::date');
    const utcDate = DateTime.fromISO(date, { zone: 'utc' });

    // const utcDateEX = DateTime.fromISO("2023-08-25T03:53:00.000Z", {
    //   zone: "utc",
    // }); // Parse UTC due date

    // now changing UTC to user time Zone
    const userTimeZoneConvertedDate = utcDate.setZone(user?.timeZone);
    // const indianDateEX = utcDateEX.setZone(user?.timeZone);

    // now using toISO() to convert object to string
    schedule.scheduleJob(userTimeZoneConvertedDate.toISO(), function () {
      console.log('email sent');
      sendEmail(user, task);
    });
  });
}

module.exports = rescheduleReminders;
