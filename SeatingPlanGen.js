/* TEXT FILE FORMAT:

The following shows a possible seating plan used for the 150th Anniversary Dinner.

There are in total [N] registered participants, and a table size of [tableSize] is chosen here.

The plan is generated based on the currently registered alumni by:
- grouping participants with the same graduation year together;
- grouping participants of a similar age together; and
- grouping family members together.

Note that this plan is merely approximate and may not be perfect.

--------------------------------------------------------------------------------------

Table 1:

Participant #[n] ([alumnusName] | Class of [gradYear] | Aged [age] | [employment])
...

*/


function genPlan() {
    let writer = createWriter('SeatingPlan.txt');
    
    // Get list of all participants
    
    let participants = [];
    for (i = 0; i < alumni.length; i++) {
        alumnus = alumni[i];
        for (j = 0; j < alumnus.seats; j++) {
            append(participants, new Participant(
                alumnus.name,
                alumnus.year,
                alumnus.age,
                alumnus.employment
            ));
        }
    }
    
    let N = participants.length;
    let tableSize = min(ceil(sqrt(N)), 12);
    
    writer.write("The following shows a possible seating plan used for the 150th Anniversary Dinner.\n\n");
    writer.write(`There are in total ${N} registered participants, and a table size of ${tableSize} is chosen here.\n\n`);
    writer.write("The plan is generated based on the currently registered alumni by:\n");
    writer.write("- grouping participants with the same graduation year together;\n");
    writer.write("- grouping participants of a similar age together; and\n");
    writer.write("- grouping family members together.\n\n");
    writer.write("Note that this plan is merely approximate and may not be perfect.\n\n");
    
    
    let tableNum = 0;
    let participantNum = 0;
    
    participants = participants.sort((a, b) => 0.5 - Math.random());
    
    while (participants.length > 0) {
        tableNum++;
        
        let chosen = participants[0];
        
        function compare(a, b) {
            let dist_a = dist(chosen.alumnusAge, chosen.alumnusYear, a.alumnusAge, a.alumnusYear);
            let dist_b = dist(chosen.alumnusAge, chosen.alumnusYear, b.alumnusAge, b.alumnusYear);
            if (dist_a < dist_b) {
                return -1;
            } else if (dist_a > dist_b) {
                return 1;
            }
            return 0;
        }

        participants.sort(compare);
        
        let table = participants.slice(0, tableSize);
        
        writer.write("--------------------------------------------------------------------------------------\n\n");
        
        writer.write(`Table ${tableNum}\n\n`);
        
        for (let i = 0; i < table.length; i++) {
            participantNum++;
            writer.write(`Participant #${participantNum} (${table[i].alumnusName} | Class of ${table[i].alumnusYear} | Aged ${table[i].alumnusAge} | ${table[i].alumnusEmployment})\n`);
            participants.shift();
        }
        
        writer.write('\n');
    }
    
    writer.close();
    
    
    
}
