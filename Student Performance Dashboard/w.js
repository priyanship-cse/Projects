// =========================
// STATE
// =========================

const state = {
    students: [],
    filtered: [],
    editingId: null
};


// =========================
// GET ELEMENT
// =========================

const $ = (id) => {
    return document.getElementById(id);
};


// =========================
// INITIAL DATA
// =========================

const defaultStudents = [
    {
        id: 1,
        name: "Priyanshi",
        course: "CSE",
        semester: 2,
        quiz: 18,
        assignment: 17,
        marks: 92,
        attendance: 94
    },

    {
        id: 2,
        name: "Nishu",
        course: "IT",
        semester: 2,
        quiz: 16,
        assignment: 15,
        marks: 84,
        attendance: 89
    },

    {
        id: 3,
        name: "Rahul",
        course: "CSE",
        semester: 2,
        quiz: 19,
        assignment: 18,
        marks: 95,
        attendance: 96
    },

    {
        id: 4,
        name: "Anjali",
        course: "ECE",
        semester: 2,
        quiz: 14,
        assignment: 13,
        marks: 72,
        attendance: 82
    }
];


// =========================
// LOAD FROM LOCAL STORAGE
// =========================

function loadStudents() {

    const savedData =
        localStorage.getItem("students");

    if (savedData) {

        state.students =
            JSON.parse(savedData);

    } else {

        state.students =
            defaultStudents;

        saveStudents();
    }

    updateDashboard();
}


// =========================
// SAVE DATA
// =========================

function saveStudents() {

    localStorage.setItem(
        "students",
        JSON.stringify(state.students)
    );
}


// =========================
// GET STATUS
// =========================

function getStatus(marks) {

    if (marks >= 85) {
        return "Excellent";
    }

    if (marks >= 65) {
        return "Good";
    }

    return "Needs Attention";
}


// =========================
// AVERAGE
// =========================

function average(data, property) {

    if (data.length === 0) {
        return 0;
    }

    const total =
        data.reduce(
            (sum, student) =>
                sum + Number(student[property]),
            0
        );

    return Math.round(
        total / data.length
    );
}


// =========================
// UPDATE DASHBOARD
// =========================

function updateDashboard() {

    const searchText =
        $("search")
            .value
            .trim()
            .toLowerCase();

    const status =
        $("statusFilter").value;

    const sort =
        $("sortBy").value;


    // FILTER

    state.filtered =
        state.students.filter(
            (student) => {

                const matchesName =
                    student.name
                        .toLowerCase()
                        .includes(searchText);

                const studentStatus =
                    getStatus(
                        Number(student.marks)
                    );

                const matchesStatus =
                    status === "All" ||
                    studentStatus === status;

                return (
                    matchesName &&
                    matchesStatus
                );
            }
        );


    // SORT

    state.filtered.sort(
        (a, b) => {

            if (sort === "marks-desc") {
                return b.marks - a.marks;
            }

            if (sort === "marks-asc") {
                return a.marks - b.marks;
            }

            if (sort === "quiz-desc") {
                return b.quiz - a.quiz;
            }

            if (sort === "quiz-asc") {
                return a.quiz - b.quiz;
            }

            if (sort === "assignment-desc") {
                return b.assignment -
                    a.assignment;
            }

            if (sort === "assignment-asc") {
                return a.assignment -
                    b.assignment;
            }

            if (sort === "attendance-desc") {
                return b.attendance -
                    a.attendance;
            }

            if (sort === "name-asc") {
                return a.name.localeCompare(
                    b.name
                );
            }

            return 0;
        }
    );


    // SUMMARY

    $("totalStudents").textContent =
        state.students.length;

    $("avgMarks").textContent =
        average(
            state.students,
            "marks"
        ) + "%";

    $("avgAttendance").textContent =
        average(
            state.students,
            "attendance"
        ) + "%";

    $("excellent").textContent =
        state.students.filter(
            student =>
                getStatus(
                    Number(student.marks)
                ) === "Excellent"
        ).length;

    $("avgQuiz").textContent =
        average(
            state.students,
            "quiz"
        ) + "/20";

    $("avgAssignment").textContent =
        average(
            state.students,
            "assignment"
        ) + "/20";


    // RESULT COUNT

    $("resultCount").textContent =
        `${state.filtered.length} record${
            state.filtered.length === 1
                ? ""
                : "s"
        }`;


    renderTable();

    renderChart(
        state.filtered
    );
}


// =========================
// RENDER TABLE
// =========================

function renderTable() {

    if (state.filtered.length === 0) {

        $("tableBody").innerHTML = `
            <tr>
                <td colspan="9">
                    No matching records found.
                </td>
            </tr>
        `;

        return;
    }


    $("tableBody").innerHTML =
        state.filtered.map(
            (student) => {

                const status =
                    getStatus(
                        Number(student.marks)
                    );


                let badgeClass;


                if (status === "Excellent") {
                    badgeClass = "excellent";
                }
                else if (status === "Good") {
                    badgeClass = "good";
                }
                else {
                    badgeClass = "needs";
                }


                return `

                    <tr>

                        <td>
                            ${student.name}
                        </td>

                        <td>
                            ${student.course}
                        </td>

                        <td>
                            ${student.semester}
                        </td>

                        <td>
                            ${student.quiz}/20
                        </td>

                        <td>
                            ${student.assignment}/20
                        </td>

                        <td>
                            ${student.marks}%
                        </td>

                        <td>
                            ${student.attendance}%
                        </td>

                        <td>

                            <span
                                class="badge ${badgeClass}">
                                ${status}
                            </span>

                        </td>

                        <td>

                            <button
                                class="edit-btn"
                                onclick="editStudent(${student.id})">
                                Edit
                            </button>

                            <button
                                class="delete-btn"
                                onclick="deleteStudent(${student.id})">
                                Delete
                            </button>

                        </td>

                    </tr>

                `;
            }
        ).join("");
}


// =========================
// ADD / EDIT STUDENT
// =========================

$("studentForm")
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const studentData = {

                name:
                    $("studentName")
                        .value
                        .trim(),

                course:
                    $("course")
                        .value
                        .trim(),

                semester:
                    Number(
                        $("semester").value
                    ),

                quiz:
                    Number(
                        $("quiz").value
                    ),

                assignment:
                    Number(
                        $("assignment").value
                    ),

                marks:
                    Number(
                        $("marks").value
                    ),

                attendance:
                    Number(
                        $("attendance").value
                    )
            };


            // EDIT

            if (state.editingId !== null) {

                const index =
                    state.students.findIndex(
                        student =>
                            student.id ===
                            state.editingId
                    );


                if (index !== -1) {

                    state.students[index] = {
                        id: state.editingId,
                        ...studentData
                    };

                }

                state.editingId = null;

                $("submitBtn")
                    .textContent =
                    "Add Student";

                $("cancelBtn")
                    .style.display =
                    "none";

            }

            // ADD

            else {

                const newStudent = {

                    id:
                        Date.now(),

                    ...studentData
                };

                state.students.push(
                    newStudent
                );
            }


            saveStudents();

            $("studentForm").reset();

            updateDashboard();

        }
    );


// =========================
// EDIT STUDENT
// =========================

function editStudent(id) {

    const student =
        state.students.find(
            student =>
                student.id === id
        );


    if (!student) {
        return;
    }


    $("studentName").value =
        student.name;

    $("course").value =
        student.course;

    $("semester").value =
        student.semester;

    $("quiz").value =
        student.quiz;

    $("assignment").value =
        student.assignment;

    $("marks").value =
        student.marks;

    $("attendance").value =
        student.attendance;


    state.editingId = id;


    $("submitBtn")
        .textContent =
        "Update Student";


    $("cancelBtn")
        .style.display =
        "inline-block";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// =========================
// CANCEL EDIT
// =========================

$("cancelBtn")
    .addEventListener(
        "click",
        function () {

            state.editingId = null;

            $("studentForm").reset();

            $("submitBtn")
                .textContent =
                "Add Student";

            $("cancelBtn")
                .style.display =
                "none";
        }
    );


// =========================
// DELETE STUDENT
// =========================

function deleteStudent(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this student?"
        );


    if (!confirmDelete) {
        return;
    }


    state.students =
        state.students.filter(
            student =>
                student.id !== id
        );


    saveStudents();

    updateDashboard();
}


// =========================
// SEARCH
// =========================

$("search")
    .addEventListener(
        "input",
        updateDashboard
    );


// =========================
// FILTER
// =========================

$("statusFilter")
    .addEventListener(
        "change",
        updateDashboard
    );


// =========================
// SORT
// =========================

$("sortBy")
    .addEventListener(
        "change",
        updateDashboard
    );


// =========================
// CHART
// =========================

function renderChart(records) {

    if (records.length === 0) {

        $("chart").innerHTML =
            "<p>No data available.</p>";

        return;
    }


    $("chart").innerHTML =
        records
            .slice(0, 8)
            .map(
                student => {

                    const height =
                        Math.max(
                            4,
                            (student.marks / 100) *
                            180
                        );


                    return `

                        <div
                            class="bar-item"
                            title="${student.name}: ${student.marks}%">

                            <span class="bar-value">
                                ${student.marks}%
                            </span>

                            <div
                                class="bar"
                                style="height:${height}px">
                            </div>

                            <span class="bar-label">
                                ${student.name}
                            </span>

                        </div>

                    `;
                }
            )
            .join("");
}


// =========================
// START
// =========================

loadStudents();