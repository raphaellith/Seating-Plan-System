function drawPlanScreen() {
    backButton.show();
    genPlanButton.show();
    
    textSize(35);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    fill(white);
    
    text('Seating plan', width/2, 100);
    
    textSize(20);
    textStyle(NORMAL);
    text('Here is a seating plan generated\nbased on the currently registrated alumni.', width/2, 150);
}
