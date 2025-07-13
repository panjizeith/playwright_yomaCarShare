    function formatDateLabel(date) {
        // e.g., "July 20, 2025"
        return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        });
    }
    
    function addDays(daysFromToday) {
        const today = new Date();
        today.setDate(today.getDate() + daysFromToday);
        return formatDateLabel(today);
    }
    
    module.exports = {
        addDays,
    };