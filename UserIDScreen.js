function drawDeleteModifyEnterInfoScreen() {
    cancelButton.show();
    
    
    textSize(35);
    textStyle(BOLD);
    textAlign(CENTER);
    fill(white);
    text('Modification or deletion of registration', width/2, 100);
    
    confirmButton.show();
    nameInput.show();
    codeInput.show();
    textSize(20);
    textStyle(NORMAL);
    text('Please kindly fill in the following information.', width/2, 150);
    
    textAlign(RIGHT, TOP);
    textStyle(BOLD);
    text('Name of alumnus:\n\nRegistration code:', registrationScreenAlign - 10, 200);
    
    if (deleteModifyInfoInvalid) {
        fill(color('#E85B5B'));
        textStyle(BOLDITALIC);
        textAlign(LEFT, TOP);
        text("The name and/or the code is invalid.", registrationScreenAlign, 300);
    }
}
