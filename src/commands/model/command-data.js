export default class Command {
    constructor(name, description, handle, execute, usage) {
        this.name = name;
        this.description = description;
        this.handle = handle;
        this.execute = execute;
        this.usage = usage;
    }

    /**
     * Returns a string representation of the command, including its name, description, and usage.
     * This method is used to generate a command line help documentation.
     *
     * @returns {string} The string representation of the command.
     */
    toString() {
        return `Name: ${this.name}\nDescription: ${this.description}\nUsage: ${this.usage}`;
    }
}

