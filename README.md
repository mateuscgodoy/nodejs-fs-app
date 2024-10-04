# File System Application

> <br>📌 This small application was originally created by Joseph Heidari, on his most excellent course: [Understanding Node.js](https://www.udemy.com/course/understanding-nodejs-core-concepts/). <br><br>

## Description

On this application, Node.js is set to watch the file "**command.txt**" with can receive commands and execute actions based on those commands. The list of available commands is:

- `create the file <file_path>`
- `update the file <file_path> with content: <content>`
- `rename the file <file_path> to <new_file_path>`
- `delete the file <file_path>`

Each argument between angle brackets must be substituted by the real file name/path from your system.

## Installation & Usage

The installation process involves:
1. Cloning this repository to your local machine.
2. Install the require packages with `npm i`, or any package manager.
3. Run it with `npm start` or `npm run start`.
4. Add a statement to `command.txt` like `create the file diary.txt`.

> <br>⚠️ This solution uses a Debounce strategy described by Leul on the following [post](https://www.udemy.com/course/understanding-nodejs-core-concepts/learn/lecture/40070216#questions/20974692). The debounce delay of `100MS` might not be enough for your system, try adjusting its value at `index.ts` file to higher amounts if you start to notice that **commands are being called twice in a roll**!<br><br>

---

Thank you kindly for checking this repository!
Have a nice day 👋