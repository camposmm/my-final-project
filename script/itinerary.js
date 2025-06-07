// itinerary.js

// Make activity cards draggable
document.addEventListener('DOMContentLoaded', () => {
    const draggables = document.querySelectorAll('.activity-card');

    draggables.forEach(card => {
        card.setAttribute('draggable', true);

        card.addEventListener('dragstart', () => {
            card.classList.add('dragging');
        });

        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
        });
    });

    const dropZones = document.querySelectorAll('.day-schedule');

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', e => {
            e.preventDefault();
        });

        zone.addEventListener('drop', e => {
            e.preventDefault();
            const dragged = document.querySelector('.dragging');
            zone.appendChild(dragged);
        });
    });
});