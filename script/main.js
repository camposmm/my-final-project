// main.js

// Global Variables
const SKYSCANNER_API_KEY = 'YOUR_SKYSCANNER_API_KEY'; // Replace with your actual key
const TRIPADVISOR_API_KEY = 'YOUR_TRIPADVISOR_API_KEY'; // Replace with your actual key
const RAPIDAPI_HOST = 'skyscanner50.p.rapidapi.com';

// Helper: Format date as YYYY-MM-DD
function formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}