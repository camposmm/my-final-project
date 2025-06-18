document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'auth.html';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'auth.html';
        return;
    }
    
    // Initialize drag and drop
    initDragAndDrop();
    
    function initDragAndDrop() {
        const draggables = document.querySelectorAll('.activity-card');
        const dropZones = document.querySelectorAll('.drop-zone');
        
        draggables.forEach(draggable => {
            draggable.addEventListener('dragstart', () => {
                draggable.classList.add('dragging');
            });
            
            draggable.addEventListener('dragend', () => {
                draggable.classList.remove('dragging');
            });
        });
        
        dropZones.forEach(zone => {
            zone.addEventListener('dragover', e => {
                e.preventDefault();
                zone.classList.add('drag-over');
            });
            
            zone.addEventListener('dragleave', () => {
                zone.classList.remove('drag-over');
            });
            
            zone.addEventListener('drop', e => {
                e.preventDefault();
                zone.classList.remove('drag-over');
                
                const draggable = document.querySelector('.dragging');
                if (draggable) {
                    const clone = draggable.cloneNode(true);
                    clone.classList.remove('dragging');
                    clone.setAttribute('draggable', true);
                    
                    // Add delete button
                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = '×';
                    deleteBtn.className = 'delete-activity';
                    deleteBtn.addEventListener('click', () => {
                        clone.remove();
                    });
                    
                    clone.appendChild(deleteBtn);
                    zone.appendChild(clone);
                    
                    // Add drag events to the clone
                    clone.addEventListener('dragstart', () => {
                        clone.classList.add('dragging');
                    });
                    
                    clone.addEventListener('dragend', () => {
                        clone.classList.remove('dragging');
                    });
                }
            });
        });
    }
    
    // Save itinerary button
    document.getElementById('save-itinerary')?.addEventListener('click', () => {
        const itinerary = [];
        document.querySelectorAll('.day-schedule').forEach((day, index) => {
            const activities = [];
            day.querySelectorAll('.activity-card').forEach(activity => {
                activities.push(activity.querySelector('h4').textContent);
            });
            
            itinerary.push({
                day: index + 1,
                activities
            });
        });
        
        // Save to localStorage
        const user = JSON.parse(localStorage.getItem('currentUser'));
        user.itinerary = itinerary;
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        showAlert('Itinerary saved successfully!');
    });
});