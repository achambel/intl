import database from './../database.json';
import Person from './Person.js';
import TerminalController from './TerminalController.js';

const DEFAULT_LANG = 'pt-BR';
const STOP_TERM = ':q';

const terminal = new TerminalController();
terminal.initializeTerminal(database, DEFAULT_LANG);

async function mainLoop() {
  try {
    const answer = await terminal.question();

    if (answer === STOP_TERM) {
      terminal.closeTerminal();
      console.log('process has been finished!!!');
      return;
    }

    const person = Person.generateInstanceFromString(answer);
    terminal.updateTable(person.formatted(DEFAULT_LANG));

    return mainLoop();
  } catch (error) {
    console.error('Error:', error);
    return mainLoop();
  }
}

await mainLoop();
