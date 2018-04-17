import {LoadAssetsCommand} from "app/controller/load-assets-command";
import {PrepModelCommand} from "app/controller/prep-model-command";
import {PrepViewCommand} from "app/controller/prep-view-command";
import {MacroCommand} from "puremvc";

export class StartupCommand extends MacroCommand {
    /**
     * @override
     *
     * Add the Subcommands to startup the PureMVC apparatus.
     *
     * Generally, it is best to prep the Model (mostly registering proxies) followed by
     * preparation of the View (mostly registering Mediators).
     */
    public initializeMacroCommand() {
        window.console.log("initializeMacroCommand called!");
        this.addSubCommand(PrepModelCommand);
        this.addSubCommand(PrepViewCommand);
        this.addSubCommand(LoadAssetsCommand);
    }
}
