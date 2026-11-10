
const projectList = document.getElementById("projectList");
const projectCount = document.getElementById("projectCount");

let projects = [];

function renderProjects() {
    projectCount.textContent = projects.length;

    if (projects.length === 0) {
        projectList.className = "empty-state";
        projectList.innerHTML = `
            <div class="empty-icon">⌘</div>
            <h3>No projects yet</h3>
            <p>Create your first project to get started.</p>
            <button class="secondary-btn" id="emptyCreateBtn">
                Create a project
            </button>
        `;

        document.getElementById("emptyCreateBtn")
            .addEventListener("click", createProject);

        return;
    }

    projectList.className = "project-list";

    projectList.innerHTML = projects.map((project, index) => `
        <div class="project-row">
            <div class="project-name">
                <div class="file-icon">LUA</div>
                <div>
                    <strong>${escapeHTML(project.name)}</strong>
                    <span>${escapeHTML(project.filename)}</span>
                </div>
            </div>

            <div>
                <span class="project-status">Draft</span>
            </div>

            <div class="updated-date">
                ${project.date}
            </div>

            <div class="project-actions">
                <button onclick="deleteProject(${index})">Delete</button>
            </div>
        </div>
    `).join("");
}

function createProject() {
    const name = prompt("Enter a name for your project:");

    if (!name || !name.trim()) return;

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".lua,.txt";

    fileInput.onchange = () => {
        const file = fileInput.files[0];
        if (!file) return;

        projects.push({
            name: name.trim(),
            filename: file.name,
            date: new Date().toLocaleDateString()
        });

        renderProjects();
    };

    fileInput.click();
}

function deleteProject(index) {
    if (!confirm("Are you sure you want to delete this project?")) {
        return;
    }

    projects.splice(index, 1);
    renderProjects();
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

document.getElementById("newProjectBtn")
    .addEventListener("click", createProject);

document.getElementById("emptyCreateBtn")
    .addEventListener("click", createProject);

renderProjects();
