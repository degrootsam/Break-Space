// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "break-space" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('break-space.separateBySpace', () => {
		// Get the selected text
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('No editor is active');
			return; // No open text editor
		}

		const selection = editor.selection;

		if(selection.isEmpty) {
			vscode.window.showInformationMessage('No text is selected');
			return; // No selection
		}
		// Replace each whitespace with a new line
		const text = editor.document.getText(selection);
		// Check if the last character is a whitespace
		if(text[text.length - 1] === ' ') {
			// Remove the last character
			text.slice(0, -1);
		}
		const newText = text.replace(/\s/g, '\n');



		editor.edit(editBuilder => {
			editBuilder.replace(selection, newText);
		});

		vscode.window.showInformationMessage('Break Space!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
