# FCRA - The Fast React App Formater

FCRA is a command-line tool that allows you to quickly set up a new React project by removing unnecessary React files and creating essential directories for your project. With FCRA, you can customize your setup by specifying which directories and components you want to include in your project.

## Installation

To use FCRA, you must have Node.js and npm (Node Package Manager) installed on your system. You can install FCRA globally using npm or Yarn:

Using npm:

```bash
npm install -g fcra
```

Using Yarn:

```bash
yarn global add fcra
```

## Usage

To format a new React project using FCRA, open your terminal and run the `fcra` command followed by the path to your project directory:

```bash
fcra /path/to/your/project
```

Alternatively, you can run the fcra command without any arguments, and FCRA will set up the project in the current directory:

```bash
fcra
```

## Options

FCRA provides the following options to customize your project setup:

- `-s, --screens`: Create a `screens` directory and include a sample `Home.js` file.
- `-c, --components`: Create a `components` directory and include a sample `Button.js` file.
- `-a, --assets`: Create an `assets` directory.

You can use these options when running the `fcra` command to include the desired directories and components in your project.

## Examples

1. Format a new React project with `screens`, `components`, and `assets` directories:

```bash
fcra /path/to/your/project -sca
```

2. Create a new React project with only the `screens` directory:

   ```bash
   fcra /path/to/your/project -s
   ```

3. Create a new React project with `screens` and `components` directories:

   ```bash
    fcra /path/to/your/project -sc
   ```

4. Create a new React project with only the `screens` directory:

   ```bash
   fcra /path/to/your/project -s
   ```

## What FCRA does

- FCRA will remove unnecessary React files like `App.css`, `App.test.js`, `logo.svg`, etc., from your project directory.
- If you choose to include the `screens` directory, FCRA will create a `Home.js` file inside it. If you also include the `components` directory, FCRA will create a `Button.js` file inside it and import the `Button` component in the `Home.js` file.
- FCRA will update your `App.js` file to include the `Home` component if the `screens` directory is included.

## Notes

- The sample components (`Home.js` and `Button.js`) are provided for demonstration purposes. You can modify or remove them as needed.
- If you encounter any issues or have suggestions for improvement, feel free to submit an issue on our GitHub repository.

## License

This project is licensed under the MIT License. See the LICENSE.md file for details.
