function drawConfirmationScreen() {
    backButton.show();
    
    textSize(35);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    fill(white);
    
    text('Registration confirmed', width/2, 100);
    
    textSize(20);
    textStyle(NORMAL);
    text('Thank you for registering!\n\nYour registration has been confirmed and recorded.\n\nHere is your registration code:', width/2, 150);
    
    textSize(30);
    textStyle(BOLD);
    text(alumni.slice(-1)[0].code, width/2, 300);
    
    textSize(20);
    textStyle(NORMAL);
    text('You are advised to write down your registration code\nas it will be important if you wish to\nmodify or cancel your registration later.', width/2, 375);
}
