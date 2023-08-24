const schedule = require("node-schedule");
const nodemailer = require("nodemailer");
const Task = require("../models/taskSchema");
const User = require("../models/userSchema");
const { DateTime } = require("luxon");
const sendEmail = require("./sendEmail");

async function fetchTasks() {
  const currentDate = new Date();
  const tasks = await Task.find({
    dueDate: { $exists: true },
  });

  return tasks;
}

async function rescheduleReminders() {
  const tasks = await fetchTasks();
  console.log(tasks);
  // Clear existing scheduled jobs
  schedule.cancelJob();

  // // Schedule jobs for the updated due dates
  tasks.forEach(async (task) => {
    if (task.dueDate) {
      // get user from db which task is running now
      const user = await User.findOne({ _id: task.userId });

      // luxon required ISO String to convert it to UTC
      const date = new Date(task.dueDate).toISOString();
      const utcDate = DateTime.fromISO(date, { zone: "utc" });

      // now changing UTC to user time Zone
      const userTimeZoneConvertedDate = utcDate.setZone(user?.timeZone);

      // now using toISO() to convert object to string
      schedule.scheduleJob(userTimeZoneConvertedDate.toISO(), function () {
        // sendReminderEmail(task.title);
        sendEmail(user, task);
      });
    }
  });
}

module.exports = rescheduleReminders;
