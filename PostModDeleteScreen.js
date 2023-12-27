function drawAfterDeleteModifyScreen() {
    backButton.show();
    
    textSize(35);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    fill(white);
    
    text('Registration modified or deleted', width/2, 100);
    
    textSize(20);
    textStyle(NORMAL);
    text('Your registration has been successfully modified or deleted.', width/2, 250);
}
