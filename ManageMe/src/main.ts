import { Project } from "./models/Project";
import { ProjectAPI } from "./utils/api";

// Function to render project list
function renderProjectList(projects: Project[]): void {
    const projectContainer = document.getElementById('project-container');
    if (!projectContainer) return;

    projectContainer.innerHTML = ''; // Clear existing content

    if (projects.length === 0) {
        projectContainer.textContent = 'No projects found.';
        return;
    }

    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    projects.forEach(project => {
        const tr = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = project.name;

        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = project.description;

        const deleteButtonCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteProject(project.id)); // Attach delete event listener
        deleteButtonCell.appendChild(deleteButton);

        tr.appendChild(nameCell);
        tr.appendChild(descriptionCell);
        tr.appendChild(deleteButtonCell);

        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    projectContainer.appendChild(table);
}

// Render initial project list
renderProjectList(ProjectAPI.getProjects());

const projectForm = document.getElementById('project-form');
if (projectForm) {
    projectForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form submission

        // Get input values
        const nameInput = document.getElementById('name') as HTMLInputElement;
        const descriptionInput = document.getElementById('description') as HTMLInputElement;

        // Create a new project object
        const newProject = new Project(
            Date.now(), // Use current timestamp as id (replace with your logic)
            nameInput.value,
            descriptionInput.value
        );

        // Add the new project
        ProjectAPI.addProject(newProject);

        // Re-render project list
        renderProjectList(ProjectAPI.getProjects());

        // Clear form inputs
        nameInput.value = '';
        descriptionInput.value = '';
    });
}

function deleteProject(id: number): void {
    // Delete project from storage using ProjectAPI
    ProjectAPI.deleteProject(id);

    // Re-render project list after deleting the project
    renderProjectList(ProjectAPI.getProjects());
}