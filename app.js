const express = require("express");
const path = require("path");
const exec = require("child_process").exec;
const app = express();
const port = 3000;

const user = "Serv00登录用户名"; //此处修改为Serv00的用户名
const pName = "s5";

app.use(express.static(path.join(__dirname, 'static')));

function keepWebAlive() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const formattedTime = currentDate.toLocaleTimeString();

  exec(`pgrep -laf ${pName}`, (err, stdout) => {
    const Process = `/home/${user}/.${pName}/${pName} -c /home/${user}/.${pName}/config.json`;

    if (stdout.includes(Process)) {
      console.log(`${formattedDate}, ${formattedTime}: Web Running`);
    } else {
      exec(`nohup ${Process} >/dev/null 2>&1 &`, (err) => {
        if (err) {
          console.log(`${formattedDate}, ${formattedTime}: Keep alive error: ${err}`);
        } else {
          console.log(`${formattedDate}, ${formattedTime}: Keep alive success!`);
        }
      });
    }
  });
}

setInterval(keepWebAlive, 10 * 1000);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
});
