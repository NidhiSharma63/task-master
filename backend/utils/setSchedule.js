const schedule = require('node-schedule');
const nodemailer = require('nodemailer');
const Task = require('../models/taskSchema');
const User = require('../models/userSchema');
const { DateTime } = require('luxon');
const sendEmail = require('./sendEmail');

async function fetchTasks() {
  const currentDate = new Date();
  currentDate.setMilliseconds(0); // removing milisecond gap
  const tasks = await Task.find({
    dueDate: { $exists: true }, // date must be less then the current date
  });

  return tasks;
}

// const newTask = [
//   {
//     _id: '6523f5c533b1448106d65a52',
//     userId: '6521047289fc34b3f8467ea2',
//     status: 'Todo',
//     task: 'first',
//     projectName: 'new one',
//     index: 0,
//     color: '#10e06a',

//     subTasks: [],
//     description: '',
//     dueDate: '2023-10-10T06:04:00.000+00:00',
//     label: '',
//     labelColor: '#e33529',
//   },
// ];
async function rescheduleReminders() {
  try {
    const tasks = await fetchTasks();
    // Clear existing scheduled jobs
    schedule.cancelJob();
    // // Schedule jobs for the updated due dates
    tasks.forEach(async (task) => {
      if (!task.dueDate || task.status === 'Done') return;
      // get user from db which task is running now
      const user = await User.findOne({ _id: task.userId });

      /**
       * first convert string into date and then convert that date into user timezone
       */
      const userConvertedTimeZoneDate = new Date(task.dueDate).toLocaleString(
        'en-US',
        {
          timeZone: user?.timeZone,
        },
      );

      /**
       * now convert this user time zone converted date into UTC date
       */
      const convertBackToUserTimeZone = new Date(userConvertedTimeZoneDate);

      schedule.scheduleJob(convertBackToUserTimeZone, function () {
        // console.log('email sent');
        sendEmail(user, task);
      });
    });
  } catch (error) {
    console.log('Error occured', error);
  }
}

module.exports = rescheduleReminders;
