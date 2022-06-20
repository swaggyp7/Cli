#!/usr/bin/env node
// /usr/bin/env就是告诉系统可以在PATH目录中查找。 所以配置#!/usr/bin/env node, 就是解决了不同的用户node路径不同的问题，可以让系统动态的去查找node来执行你的脚本文件。

const gitRepoMap = {
  1: "direct:https://github.com/swaggyp7/TemplateForVue3Mobile.git",
};

const { program, Command } = require("commander");
const chalk = require("chalk");
const download = require("download-git-repo");
const symbols = require("log-symbols");
const inquirer = require("inquirer");
const ora = require("ora");
const fs = require("fs");
program
  .version(
    require("./package.json").version,
    "-v, --version",
    "output the current version"
  )
  .command("create")
  .description("create a new project")
  .action(() => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          default: "my-project",
          message: "🧐 Pleace input your project name",
        },
        {
          type: "list",
          name: "type",
          message: "🧐 What type of project do you want to create?",
          choices: [
            {
              value: 1,
              name: "👉 Vue 3 + Typescript + Webpack 5 + Vant 3 + TailwindCss)",
            },
          ],
        },
      ])
      .then((answers) => {
        const { name, type } = answers;
        const proce = ora("Downloading template...");
        proce.start();
        download(gitRepoMap[type], name, { clone: true }, (err) => {
          if (err) {
            proce.fail(chalk.red(err));
          } else {
            proce.succeed(
              chalk.greenBright(
                "🌟 Congratulation! Project created successfully!"
              )
            );
            console.log(chalk.blue(chalk.bold("cd ./" + name)));
            console.log(chalk.blue(chalk.bold("yarn install")));
            console.log(chalk.blue(chalk.bold("yarn serve")));
          }
        });
      });
  });
program.parse();
