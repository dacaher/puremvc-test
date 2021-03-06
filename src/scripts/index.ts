/**
 * App bundle entry point.
 */
import {SampleMvcApp} from "app/sample-mvc-app";
import "howler"; // TODO where to insert this import!?
import {pixiAppWrapperEvent as WrapperEvent} from "pixi-app-wrapper";
import "styles/style.css";

/*
 * YOUR CODE HERE
 */
const sampleApp = new SampleMvcApp(900, 1440);
sampleApp.on(WrapperEvent.RESIZE_START, () => window.console.log("RESIZE STARTED!"));
sampleApp.on(WrapperEvent.RESIZE_END, args => window.console.log("RESIZE ENDED!", args));
