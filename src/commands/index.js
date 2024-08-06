/*
    This file will be used to import all the commands from the commands directory and export them as a single object.
*/

import Command from '../model/command-data.js';
import { displayOutput, handleResponse } from './model/util.js';

import { add } from './impl/add.js';
import { open } from './impl/open.js';
import { remove } from './impl/remove.js';
import { list } from './impl/list.js';

const commands = {
    [add.name] : add,
    [open.name]: open,
    [remove.name]: remove,
    [list.name]: list
};


// Attach help command after commands is defined to properly reference the commands object contents

/**
 * Handles the 'help' command. Displays a list of available commands in the console output.
 */


function helpCommand() {
    const commands = Object.values(commands);
    const commandList = commands.map(command => command.toString()).join('\n');
    displayOutput(`Available commands:\n${commandList}`);
}

commands.help = new Command(
    'help', 
    'Display available commands', 
    () =>{
        chrome.runtime.sendMessage({ action: 'help' }, handleResponse);
    },
    helpCommand, 
    'help'
);

export { displayOutput, handleResponse };
export default commands;

