const { createTransport } = require("nodemailer");

const transport = createTransport({
  host: process.env.HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.user,
    pass: process.env.PASS,
  },
});

function sendEmail(user, task) {
  // set mail options

  const mainOptions = {
    from: "nidhisharma639593@gmail.com",
    to: user.email,
    subject: "Task Remainder",
    html: `<div style="text-align: center">
      <h1>Task Reminder</h1>
      <p>Hello There,</p>
      <p>
        This is a friendly reminder that the task <strong>${task.name}</strong>
        is currently pending.
      </p>
      <ul>
        <li>
          <strong>Task Name:</strong> ${task.name}
        </li>
        <li>
          <strong>Due Date:</strong> ${task.dueDate}
        </li>
      </ul>
      <p>Please make sure to complete this task as soon as possible.</p>
      <img
        src="https://i.postimg.cc/fRqbwjSC/undraw-Work-chat-re-qes4.png"
        alt="image"
        style="display: block; margin: 0 auto"
      />
    </div>
    `,
  };

  transport.sendMail(mainOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("email sent");
    }
  });
}

module.exports = sendEmail;
