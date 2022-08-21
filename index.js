const robot = require("robotjs");

const VIEW_ENTIRE_DISCUSSION_TEXT = "View Entire Discussion (";
const SORT_BY_TEXT = "Sort By: ";


(async function main() {
  await switchFromVSCodeToBrowser();
  
  await selectViewEntireDiscussion();
  await selectSortComments();
})();

// Switches from VSCode to Browser by alt-tabbing. Useful for when running this program from the CLI to debug
async function switchFromVSCodeToBrowser() {
  keyTap("tab", ["command"]);
  await delay(500);
}

// Reddit only shows the first few comments on page load. By clicking "View Entire Discussion" the page will show more parent comments.
async function selectViewEntireDiscussion() {
  keyTap("f", ["command"]);
  await delay(400);
  robot.typeString(VIEW_ENTIRE_DISCUSSION_TEXT);
  keyTap("enter");
  keyTap("escape");
  await delay(400);
  keyTap("enter");
  await delay(400);
}

// Reddit collapses child comments on page load. By sorting comments by top, child comments are expanded.
async function selectSortComments() {
  // Find "Sort By" textfield on page
  keyTap("f", ["command"]);
  await delay(400);
  robot.typeString(SORT_BY_TEXT);
  await delay(400);
  keyTap("enter");
  keyTap("escape");

  // Expand "Sort By" dropdown, tab to "Top", press enter
  await delay(700);
  keyTap("enter");
  await delay(400);
  keyTap("tab");
  keyTap("tab");
  keyTap("enter");
}

// Wrapper method to fix an error with robot.keyTap() in which modifier keys continue to be held down when they should let up
// Thread: https://github.com/octalmage/robotjs/issues/219
function keyTap(key = '', modifiers = []) {
  robot.keyToggle(key, 'down', modifiers);
  robot.keyToggle(key, 'up', modifiers);    
  modifiers.forEach(mod => robot.keyToggle(mod, 'up'));
}

async function delay(milliseconds) {
  await new Promise(resolve => setTimeout(resolve, milliseconds));
}