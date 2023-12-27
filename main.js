// Global variables

let scene;
// 0: Start screen
// 1: Registration screen
// 2: Confirmation screen
// 3: Delete/Modify screen (enter registration code)
// 3.5: Delete/Modify screen (modify or delete info)
// 4: After Delete/Modify screen
// 5: Seating plan generation screen

let registrationInvalid;
// 0: Name is valid
// 1: Name is empty
// 2: Name contains invalid characters
// 3: Grad year and age do not add up to 2039 / 2040 / 2041

let deleteModifyInfoInvalid;
// 0: Deletion is invalid
// 1: Deletion is valid

// Global constants
const jobs = [
    'Accounting',
    'Admin & HR',
    'Banking/Finance',
    'Beauty Care/Health',
    'Design',
    'E-commerce',
    'Education',
    'Engineering',
    'Hospitality/F&B',
    'Information Technology',
    'Insurance',
    'Management',
    'Manufacturing',
    'Marketing/Public Relations',
    'Media & Advertising',
    'Medical Services',
    'Merchandising & Purchasing',
    'Professional Services',
    'Property/Real Estate',
    'Public/Civil',
    'Sales, CS & Business Development',
    'Science, Lab, R&D',
    'Transportation & Logistics',
    'Others'
];

const registrationScreenAlign = 350;
const registrationScreenElementWidth = 350;

// Colors
let white;
let darkBlue;
let blue;
let lightBlue;
let grey;

// Buttons
let registrationButton;
let modifyDeleteButton;
let planButton;
let confirmButton;
let cancelButton;
let backButton;
let genPlanButton;

// Input fields

let nameInput;
let yearSelect;
let ageInput;
let employmentSelect;
let seatSelect;
let codeInput;

let alumnusName = '';

let alumni = [];

let foundAlumnus;
let foundAlumnusIndex;


function setup() {
    createCanvas(900, 600);
    
    white = color('#e7ecef');
    darkBlue = color('#274c77');
    blue = color('#6096BA');
    lightBlue = color('#A3CEF1');
    grey = color('#8B8C89');
    
    scene = 0;
    
    let unitButtonWidth = 400;
    let unitButtonHeight = 80;
    let spacing = 10;
    let baselineTop = 200;
    
    registrationButton = createButton('Make a registration');
    registrationButton.position(width/2 - unitButtonWidth/2, baselineTop);
    registrationButton.size(unitButtonWidth, unitButtonHeight);
    registrationButton.style('font-size', '20px');
    registrationButton.style('border-color', lightBlue);
    registrationButton.style('border-width', 5);
    registrationButton.style('background-color', lightBlue);
    function toRegistrationScreen() {
        scene = 1;
        registrationInvalid = 0;
    }
    registrationButton.mouseReleased(toRegistrationScreen);
    
    modifyDeleteButton = createButton('Modify or delete an existing registration');
    modifyDeleteButton.position(width/2 - unitButtonWidth/2, baselineTop + unitButtonHeight + spacing);
    modifyDeleteButton.size(unitButtonWidth, unitButtonHeight);
    modifyDeleteButton.style('font-size', '20px');
    modifyDeleteButton.style('border-color', lightBlue);
    modifyDeleteButton.style('border-width', 5);
    modifyDeleteButton.style('background-color', white);
    function toModifyDeleteScreen() {
        scene = 3;
        nameInput.value('');
        codeInput.value('');
        deleteModifyInfoInvalid = 0;
    }
    modifyDeleteButton.mouseReleased(toModifyDeleteScreen);
    
    planButton = createButton('Generate a seating plan');
    planButton.position(width/2 - unitButtonWidth/2, baselineTop + unitButtonHeight*2 + spacing*2);
    planButton.size(unitButtonWidth, unitButtonHeight);
    planButton.style('font-size', '20px');
    planButton.style('border-color', lightBlue);
    planButton.style('border-width', 5);
    planButton.style('background-color', white);
    function toPlanScreen() {
        scene = 5;
    }
    planButton.mouseReleased(toPlanScreen);
    
    genPlanButton = createButton('Download seating plan');
    genPlanButton.position(width/2 - unitButtonWidth*0.7/2, baselineTop + 100);
    genPlanButton.size(unitButtonWidth*0.7, unitButtonHeight);
    genPlanButton.style('font-size', '20px');
    genPlanButton.style('border-color', lightBlue);
    genPlanButton.style('border-width', 5);
    genPlanButton.style('background-color', white);
    genPlanButton.mouseReleased(genPlan);
    
    confirmButton = createButton('Confirm');
    confirmButton.position(registrationScreenAlign + registrationScreenElementWidth - unitButtonWidth * 0.6 - spacing, 500);
    confirmButton.size(unitButtonWidth*0.3, unitButtonHeight*0.6);
    confirmButton.style('font-size', '20px');
    confirmButton.style('border-color', lightBlue);
    confirmButton.style('border-width', 5);
    confirmButton.style('background-color', lightBlue);
    function confirm() {
        if (scene == 1) {
            if (alumnusName.length == 0) {
                registrationInvalid = 1;
            } else if (match(alumnusName, '[^a-z A-Z]') != null) {  // Regex returns null when every char is either letter or space 
                registrationInvalid = 2;
            } else if (parseInt(yearSelect.value()) + parseInt(ageSelect.value()) < 2039 || parseInt(yearSelect.value()) + parseInt(ageSelect.value()) > 2041) {
                registrationInvalid = 3;
            } else {
                registrationInvalid = 0;
                append(alumni, new Alumnus(
                    alumnusName,
                    parseInt(yearSelect.value()),
                    parseInt(ageSelect.value()),
                    employmentSelect.value(),
                    parseInt(seatSelect.value()),
                    hex(round(Date.now() / 1000)).slice(-7)
                    // Code generated by taking the last 8 digits of the
                    // number of seconds since the epoch, in hexadecimal.
                    // Almost guaranteed to be unique as the last 8 digits
                    // only repeat every 16^7 seconds, which is about
                    // 8.5 years.
                ));
                scene = 2;
                nameInput.value('');
                yearSelect.value('1970');
                ageSelect.value('18');
                employmentSelect.value(jobs[0]);
                seatSelect.value('1');
            }
        } else if (scene == 3) {
            let code = trim(codeInput.value()).toUpperCase();
            let found = false;
            let i;
            for (i = 0; i < alumni.length; i++) {
                alumnus = alumni[i];
                if (alumnus.name == alumnusName && alumnus.code == code) {
                    found = true;
                    foundAlumnus = alumnus;
                    foundAlumnusIndex = i;
                }
            }
            if (found) {
                deleteModifyInfoInvalid = 0;
                scene = 3.5;
                registrationInvalid = 0;
                
                nameInput.value(foundAlumnus.name);
                yearSelect.value(foundAlumnus.year);
                ageSelect.value(foundAlumnus.age);
                employmentSelect.value(foundAlumnus.employment);
                seatSelect.value(str(foundAlumnus.seats));
            } else {
                deleteModifyInfoInvalid = 1;
            }
        }
    }
    confirmButton.mouseReleased(confirm);
    
    cancelButton = createButton('Cancel');
    cancelButton.position(registrationScreenAlign + registrationScreenElementWidth - unitButtonWidth * 0.3, 500);
    cancelButton.size(unitButtonWidth*0.3, unitButtonHeight*0.6);
    cancelButton.style('font-size', '20px');
    cancelButton.style('border-color', lightBlue);
    cancelButton.style('border-width', 5);
    cancelButton.style('background-color', white);
    function backToMain() {
        scene = 0;
    }
    cancelButton.mouseReleased(backToMain);
    
    backButton = createButton('Back');
    backButton.position(registrationScreenAlign + registrationScreenElementWidth - unitButtonWidth * 0.3, 500);
    backButton.size(unitButtonWidth*0.3, unitButtonHeight*0.6);
    backButton.style('font-size', '20px');
    backButton.style('border-color', lightBlue);
    backButton.style('border-width', 5);
    backButton.style('background-color', lightBlue);
    backButton.mouseReleased(backToMain);
    
    saveButton = createButton('Save');
    saveButton.position(registrationScreenAlign - spacing * 3, 500);
    saveButton.size(unitButtonWidth*0.3, unitButtonHeight*0.6);
    saveButton.style('font-size', '20px');
    saveButton.style('border-color', lightBlue);
    saveButton.style('border-width', 5);
    saveButton.style('background-color', lightBlue);
    function saveChanges() {
        if (scene == 3.5) {
            alumni.splice(foundAlumnusIndex, 1);
            
            if (alumnusName.length == 0) {
                registrationInvalid = 1;
            } else if (match(alumnusName, '[^a-z A-Z]') != null) {  // Regex returns null when every char is either letter or space 
                registrationInvalid = 2;
            } else if (parseInt(yearSelect.value()) + parseInt(ageSelect.value()) < 2039 || parseInt(yearSelect.value()) + parseInt(ageSelect.value()) > 2041) {
                registrationInvalid = 3;
            } else {
                registrationInvalid = 0;
                append(alumni, new Alumnus(
                    alumnusName,
                    parseInt(yearSelect.value()),
                    parseInt(ageSelect.value()),
                    employmentSelect.value(),
                    parseInt(seatSelect.value()),
                    foundAlumnus.code
                ));
                scene = 4;
                nameInput.value('');
                yearSelect.value('1970');
                ageSelect.value('18');
                employmentSelect.value(jobs[0]);
                seatSelect.value('1');
            }
        } 
    }
    saveButton.mouseReleased(saveChanges);
    
    deleteButton = createButton('Delete');
    deleteButton.position(registrationScreenAlign + registrationScreenElementWidth - unitButtonWidth * 0.6 - spacing, 500);
    deleteButton.size(unitButtonWidth*0.3, unitButtonHeight*0.6);
    deleteButton.style('font-size', '20px');
    deleteButton.style('border-color', lightBlue);
    deleteButton.style('border-width', 5);
    deleteButton.style('background-color', lightBlue);
    function deleteRegistration() {
        if (scene == 3.5) {
            alumni.splice(foundAlumnusIndex, 1);
            scene = 4;
            
            nameInput.value('');
            yearSelect.value('1970');
            ageSelect.value('18');
            employmentSelect.value(jobs[0]);
            seatSelect.value('1');
        } 
    }
    deleteButton.mouseReleased(deleteRegistration);
    
    nameInput = createInput('');
    nameInput.position(registrationScreenAlign, 200);
    nameInput.size(registrationScreenElementWidth);
    nameInput.style('font-size', '18px');
    nameInput.hide();
    
    function updateName() {
        // When the inputted text changes or is edited,
        // the 'proper' version of the text is updated to alumnusName
        alumnusName = trim(this.value());
        let words = split(alumnusName, ' ');
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].toLowerCase().slice(1);
        }
        alumnusName = words.join(' ');
    }
    
    nameInput.input(updateName);
    
    
    codeInput = createInput('');
    codeInput.position(registrationScreenAlign, 250);
    codeInput.size(registrationScreenElementWidth);
    codeInput.style('font-size', '18px');
    codeInput.hide();
    
    yearSelect = createSelect();
    yearSelect.position(registrationScreenAlign, 250);
    yearSelect.style('font-size', '18px');
    yearSelect.size(registrationScreenElementWidth);
    let instruction = 'Select your year of graduation:';
    yearSelect.option(instruction);
    yearSelect.disable(instruction);
    for (let year = 1970; year <= 2023; year++) {
        yearSelect.option(str(year));
    }
    
    ageSelect = createSelect();
    ageSelect.position(registrationScreenAlign, 300);
    ageSelect.size(registrationScreenElementWidth);
    ageSelect.style('font-size', '18px');
    instruction = 'Select your age:';
    ageSelect.option(instruction);
    ageSelect.disable(instruction);
    for (let age = 17; age <= 70; age++) {
        ageSelect.option(str(age));
    }
    
    employmentSelect = createSelect();
    employmentSelect.position(registrationScreenAlign, 350);
    employmentSelect.style('font-size', '18px');
    employmentSelect.size(registrationScreenElementWidth);
    instruction = 'Select your employment:';
    employmentSelect.option(instruction);
    employmentSelect.disable(instruction);
    for (let i = 0; i < jobs.length; i++) {
        employmentSelect.option(jobs[i]);
    }
    
    seatSelect = createSelect();
    seatSelect.position(registrationScreenAlign, 400);
    seatSelect.style('font-size', '18px');
    seatSelect.size(registrationScreenElementWidth);
    instruction = 'Select the number of seats:';
    seatSelect.option(instruction);
    seatSelect.disable(instruction);
    for (let n = 1; n <= 6; n++) {
        seatSelect.option(str(n));
    }
}


function draw() {
    background(darkBlue);
    drawHeading();
    registrationButton.hide();
    modifyDeleteButton.hide();
    planButton.hide();
    confirmButton.hide();
    nameInput.hide();
    codeInput.hide();
    yearSelect.hide();
    ageSelect.hide();
    employmentSelect.hide();
    seatSelect.hide();
    cancelButton.hide();
    backButton.hide();
    genPlanButton.hide();
    saveButton.hide();
    deleteButton.hide();
    
    switch (scene) {
        case 0:
            drawStartScreen();
            break;
        case 1:
            drawRegistrationScreen();
            break;
        case 2:
            drawConfirmationScreen();
            break;
        case 3:
            drawDeleteModifyEnterInfoScreen();
            break;
        case 3.5:
            drawDeleteModifyScreen();
            break;
        case 4:
            drawAfterDeleteModifyScreen();
            break;
        case 5:
            drawPlanScreen();
            break;
    }
}
