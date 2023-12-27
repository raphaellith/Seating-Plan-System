function drawRegistrationScreen() {
    nameInput.show();
    yearSelect.show();
    ageSelect.show();
    employmentSelect.show();
    seatSelect.show();
    confirmButton.show();
    cancelButton.show();
    
    textSize(35);
    textStyle(BOLD);
    textAlign(CENTER);
    fill(white);
    text('Registration', width/2, 100);
    
    textSize(20);
    textStyle(NORMAL);
    text('Please kindly fill in the following information.', width/2, 150);
    
    textAlign(RIGHT, TOP);
    textStyle(BOLD);
    text('Name of alumnus:\n\nYear of graduation:\n\nAge:\n\nEmployment:\n\nNumber of seats:', registrationScreenAlign - 10, 200);
    
    if (registrationInvalid) {
        fill(color('#E85B5B'));
        textStyle(BOLDITALIC);
        textAlign(LEFT, TOP);
        let error;
        if (registrationInvalid == 1) {
            error = 'The name cannot be empty.';
        } else if (registrationInvalid == 2) {
            error = 'The name cannot contain invalid characters.';
        } else if (registrationInvalid == 3) {
            error = 'Either the age or graduation year is invalid.';
        }
        text(error, registrationScreenAlign, 435);
    }
}
