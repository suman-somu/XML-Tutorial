const sections = Array.from(document.querySelectorAll(".content-section"));
const sidebarLinks = Array.from(document.querySelectorAll("aside a"));
let currentIndex = 0;

document.addEventListener("DOMContentLoaded", function () {
    // Initialize first view with the first section and highlight
    showContent(sections[currentIndex].id);
    updateNavigationButtons();
});

function showContent(sectionId) {
    // Hide all sections and show the selected section
    sections.forEach(section => section.classList.add('hidden'));
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.remove('hidden');
    }

    // Update the current index based on the visible section
    currentIndex = sections.findIndex(section => section.id === sectionId);

    // Update sidebar link highlighting
    sidebarLinks.forEach(link => link.classList.remove("active"));
    if (sidebarLinks[currentIndex]) {
        sidebarLinks[currentIndex].classList.add("active");
    }

    updateNavigationButtons();
}

function updateNavigationButtons() {
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");

    // Show or hide the "Previous" button
    if (currentIndex > 0) {
        prevButton.classList.remove("hidden-button");
    } else {
        prevButton.classList.add("hidden-button");
    }

    // Show or hide the "Next" button
    if (currentIndex < sections.length - 1) {
        nextButton.classList.remove("hidden-button");
    } else {
        nextButton.classList.add("hidden-button");
    }
}

function navigateSection(direction) {
    if (direction === 'next' && currentIndex < sections.length - 1) {
        currentIndex++;
    } else if (direction === 'prev' && currentIndex > 0) {
        currentIndex--;
    }

    // Get the ID of the new section and display it
    const sectionId = sections[currentIndex].id;
    showContent(sectionId);
}
function toggleSidebar() {
    const sidebar = document.querySelector("aside");
    sidebar.classList.toggle("active");
}

// Adjust navigation logic to close the sidebar on selection (for mobile view)
sidebarLinks.forEach(link => {
    link.addEventListener("click", function () {
        showContent(this.getAttribute("href").substring(1));

        // Close sidebar after selection on smaller screens
        if (window.innerWidth <= 768) {
            document.querySelector("aside").classList.remove("active");
        }
    });
});
