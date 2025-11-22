function myFunction() {
  Logger.log(Session.getActiveUser().getEmail());
}
// Use this code for Google Docs, Slides, Forms, or Sheets.
function onOpen() {
  FormApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .createMenu('Dialog')
      .addItem('Open', 'openDialog')
      .addToUi();
}

function openDialog() {
  var html = HtmlService.createTemplateFromFile('index')
                        .evaluate()
                        .setWidth(800)
                        .setHeight(730);
  FormApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .showModelessDialog(html, 'Dialog title');
      // .showModalDialog(html, 'Dialog title');
}
function includes(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
    .getContent();
}