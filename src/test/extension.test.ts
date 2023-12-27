import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	test('Break Space', async () => {
		vscode.window.showInformationMessage('Start all tests.');

		// Open a new editor window
		vscode.window.showInformationMessage('Open a new editor window.');
		vscode.commands.executeCommand('workbench.action.files.newUntitledFile');

		// Get the newly opened editor window
		vscode.window.showInformationMessage('Get the newly opened editor window.');
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('No editor is active');
			return; // No open text editor
		}

		const textToInsert = 'Lorum ipsum dolor sit amet.';

		// Insert text
		vscode.window.showInformationMessage('Insert text.');
		await editor.edit(editBuilder => {
			editBuilder.insert(new vscode.Position(0, 0), textToInsert);
		});

		// Select text
		vscode.window.showInformationMessage('Select text.');
		const selection = editor.selection;
		if(selection.isEmpty) {
			vscode.window.showInformationMessage('No text is selected');
			return; // No selection
		}

		assert.equal(editor.document.getText(selection), textToInsert, 'Selected text is not the same as inserted text.');

		// Break space
		vscode.window.showInformationMessage('Break space.');
		const newText = textToInsert.replace(/\s/g, '\n');
		vscode.commands.executeCommand('break-space.helloWorld');
		assert.equal(editor.document.getText(selection), newText, 'Selected text is not the same as broken text.');

		// Close the editor window
		vscode.window.showInformationMessage('Close the editor window.');
		await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
		
	});
});
