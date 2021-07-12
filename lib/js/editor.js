// Retrieve Elements
const consoleLogList = document.querySelector('.editor__console-logs');
const executeCodeBtn = document.querySelector('.editor__run');
const resetCodeBtn = document.querySelector('.editor__reset');

// Setup Ace
let codeEditor = ace.edit("editorCode");
let defaultCode = `
var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://maps.vietmap.vn/api/search?api-version=1.1&apikey=383a90729d0590f9e1074083a11791ff64767fb56c1d9c4f&text=Vi%E1%BB%87t%20Map%203%20Tr%E1%BA%A7n%20Nh%C3%A2n%20T%C3%B4n,%20Ph%C6%B0%E1%BB%9Dng%209,%20Qu%E1%BA%ADn%205,%20H%E1%BB%93%20Ch%C3%AD%20Minh&size=1&categories=',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
`;
let consoleMessages = [];

let editorLib = {
 clearConsoleScreen() {
  consoleMessages.length = 0;

  // Remove all elements in the log list
  while (consoleLogList.firstChild) {
   consoleLogList.removeChild(consoleLogList.firstChild);
  }
 },
 printToConsole() {
  consoleMessages.forEach(log => {
   const newLogItem = document.createElement('li');
   const newLogText = document.createElement('pre');

   newLogText.className = log.class;
   newLogText.textContent = `> ${log.message}`;

   newLogItem.appendChild(newLogText);

   consoleLogList.appendChild(newLogItem);
  })
 },
 init() {
  // Configure Ace

  //* Theme
  codeEditor.setTheme("ace/theme/monokai");

  //* Set language
  codeEditor.session.setMode("ace/mode/javascript");

  //* Set Options
  codeEditor.setOptions({
   fontSize: "15px",
   fontFamily: "monospace",
   enableBasicAutocompletion: true,
   displayIndentGuides: true,
   enableLiveAutocompletion: true,
   wrap: true,
   enableSnippets: true,
   enableEmmet: true,
   useElasticTabstops: true,
   showInvisibles: false,
   indentedSoftWrap: false,
   trimTrailingSpace: true,
  });

  // Set Default Code
  codeEditor.setValue(defaultCode);
 }
}

// Events
executeCodeBtn.addEventListener('click', () => {
 // Clear console messages
 editorLib.clearConsoleScreen();

 // Get input from the code editor
 const userCode = codeEditor.getValue();

 // Run the user code
 try {
  new Function(userCode)();
 } catch (err) {
  console.error(err);
 }

 // Print to the console
 editorLib.printToConsole();
});

resetCodeBtn.addEventListener('click', () => {
 // Clear ace editor
 codeEditor.setValue(defaultCode);

 // Clear console messages
 editorLib.clearConsoleScreen();
})

editorLib.init();