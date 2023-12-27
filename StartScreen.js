function drawStartScreen() {
    registrationButton.show();
    modifyDeleteButton.show();
    planButton.show();
    
    textSize(35);
    textStyle(BOLD);
    textAlign(CENTER);
    fill(white);
    
    let greeting;
    
    if (hour() >= 6 && hour() <= 11) {
        greeting = 'Good morning!';
    } else if (hour() >= 12 && hour() <= 17) {
        greeting = 'Good afternoon!';
    } else {
        greeting = 'Good evening!';
    }
    
    text(greeting, width/2, 100);
    
    textSize(20);
    textStyle(NORMAL);
    text('Please select one of the options below:', width/2, 150);
}
