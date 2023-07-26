import fs from "fs-extra";
import path from "path";
import { program } from "commander";
import chalk from "chalk";
import figlet from "figlet";
import ora from "ora";
import unwantedFiles from "./unwantedFiles.js";

const asciiLogo = figlet.textSync("FCRA", {
  font: "Standard",
  horizontalLayout: "default",
  verticalLayout: "default"
});

const welcomeMessage =
  chalk.bold.magentaBright(asciiLogo) +
  chalk.bold.green(
    "\nWelcome to FCRA - The React App unwanted files remover!\n"
  );

const emoji = {
  progress: "⏳",
  start: "🚀",
  error: "❌",
  success: "✅"
};
function displayMessage(text, type = "info", duration = 0) {
  return new Promise((resolve) => {
    switch (type) {
      case "info":
        console.log(chalk.bold.blue(text));
        break;
      case "start":
        console.log(chalk.bold.green(`${emoji.start} ${text}`));
        break;
      case "error":
        console.log(chalk.bold.red(`${emoji.error} ${text}`));
        break;
      case "success":
        console.log(chalk.bold.green(`${emoji.success} ${text}`));
        break;
      case "progress":
        console.log(chalk.bold.yellow(`${emoji.progress} ${text}`));
        break;
      default:
        console.log(text);
    }

    // Resolve the promise after the specified duration
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

function Timer(message, type, duration) {
  return displayMessage(message, type, duration);
}

program
  .version("1.0.0")
  .arguments("<projectPath>")
  .option("-s, --screens", "Create screens directory")
  .option("-c, --components", "Create components directory")
  .option("-a, --assets", "Create assets directory")
  .action(async (projectPath, options) => {
    let spinner;
    try {
      // Validate if the provided project path exists
      if (!fs.existsSync(projectPath)) {
        displayMessage(
          "Error: The provided project path does not exist.",
          "error"
        );
        return;
      }

      console.log(welcomeMessage);

      // Start setup
      await Timer("Starting project setup...", "start", 1000);

      // Use ora for displaying progress spinner
      spinner = ora("Removing unnecessary files").start();

      // Delete unnecessary react files
      unwantedFiles.forEach((file) => {
        fs.removeSync(path.join(projectPath, file));
      });

      // Create the required directories based on user options
      const directoriesToCreate = [];

      if (options.screens) {
        directoriesToCreate.push("src/screens");
        const screensDir = path.join(projectPath, "src", "screens");
        fs.ensureDirSync(screensDir);

        if (options.components) {
          const componentsDir = path.join(projectPath, "src", "components");
          fs.ensureDirSync(componentsDir);
          fs.writeFileSync(
            path.join(componentsDir, "Button.js"),
            `import React from 'react';\n\nconst Button = () => {\n  return (\n    <button>Click Me</button>\n  );\n};\n\nexport default Button;`
          );
          fs.writeFileSync(
            path.join(screensDir, "Home.js"),
            `import React from 'react';\nimport Button from '../components/Button';\n\nconst Home = () => {\n  return (\n    <div>\n      <h1>Home Screen</h1>\n      <Button />\n    </div>\n  );\n};\n\nexport default Home;`
          );
        } else {
          fs.writeFileSync(
            path.join(screensDir, "Home.js"),
            `import React from 'react';\n\nconst Home = () => {\n  return (\n    <div>\n      <h1>Home Screen</h1>\n    </div>\n  );\n};\n\nexport default Home;`
          );
        }
      }

      if (options.components) {
        directoriesToCreate.push("src/components");
      }

      if (options.assets) directoriesToCreate.push("src/assets");

      directoriesToCreate.forEach((dir) => {
        fs.ensureDirSync(path.join(projectPath, dir));
      });

      // Add Home.js import to App.js if screens directory is created
      if (options.screens) {
        const appFilePath = path.join(projectPath, "src", "App.js");
        const screensDir = path.join(projectPath, "src", "screens");
        fs.ensureDirSync(screensDir); // Ensure 'screens' directory exists

        // Conditional import content for App.js based on the existence of 'screens' folder
        const appFileContent = options.screens
          ? `import React from 'react';\nimport Home from './screens/Home';\nconst App = () => {\n  return (\n    <div>\n      <Home />\n </div>\n  );\n};\n\nexport default App;\n`
          : `import React from 'react';\nconst App = () => {\n  return (\n    <div>Home</div>\n  );\n};\n\nexport default App;\n`;

        fs.writeFileSync(appFilePath, appFileContent);

        await Timer("App.js updated successfully!", "success", 1000);
      }

      // Stop the spinner and display success message
      spinner.succeed(chalk.bold.green("Unnecessary files removed"));

      await Timer(
        "React project setup completed successfully!",
        "success",
        1000
      );
    } catch (err) {
      // Display error message and stop the spinner
      spinner.fail(chalk.bold.red("Error during setup"));
      displayMessage(`Error: ${err.message}`, "error");
    }
  });

program.parse(process.argv);
