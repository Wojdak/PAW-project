import { Project } from "../models/Project";

export class ProjectAPI {
    static getProjects(): Project[] {
        const projectsJSON = localStorage.getItem('projects');
        if (projectsJSON) {
            return JSON.parse(projectsJSON);
        } else {
            return [];
        }
    }

    static addProject(project: Project): void {
        const projects = this.getProjects();
        projects.push(project);
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    static updateProject(updatedProject: Project): void {
        const projects = this.getProjects();
        const index = projects.findIndex(p => p.id === updatedProject.id);
        if (index !== -1) {
            projects[index] = updatedProject;
            localStorage.setItem('projects', JSON.stringify(projects));
        }
    }

    static deleteProject(projectId: number): void {
        const projects = this.getProjects().filter(p => p.id !== projectId);
        localStorage.setItem('projects', JSON.stringify(projects));
    }
}