// Function to calculate years between two dates
function calculateYears(startDate) {
    const currentDate = new Date(); // Get the current date
    const start = new Date(startDate); // Convert the start date string to a Date object

    // Calculate the difference in years
    let yearsDifference = currentDate.getFullYear() - start.getFullYear();

    // Check if the current date is before the anniversary date this year
    const anniversaryThisYear = new Date(currentDate.getFullYear(), start.getMonth(), start.getDate());
    if (currentDate < anniversaryThisYear) {
        yearsDifference -= 1;
    }

    return yearsDifference;
}

// Calculate years from May 16, 2005
const years = calculateYears("2005-05-16");

// Display only the number in the result
document.getElementById("ageHolder").textContent = years;