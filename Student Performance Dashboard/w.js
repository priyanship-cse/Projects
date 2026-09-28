

const state = {

    students: [],

    filtered: []

};




const $ = (id) => {

    return document.getElementById(id);

};



async function loadData() {

    try {

        const response = await fetch("data.json");


        if (!response.ok) {

            throw new Error("Data could not be loaded");

        }


        state.students = await response.json();


        updateDashboard();

    }

    catch (error) {

        console.error(error);


        $("tableBody").innerHTML = `

            <tr>

                <td colspan="6">

                    Unable to load data.

                    Please run this project using

                    VS Code Live Server.

                </td>

            </tr>

        `;

    }

}


/* =========================
   UPDATE DASHBOARD
========================= */

function updateDashboard() {

    const searchText =
        $("search").value
            .trim()
            .toLowerCase();


    const status =
        $("statusFilter").value;


    const sort =
        $("sortBy").value;


    /* Filtering */

    state.filtered =
        state.students.filter(student => {

            const matchesName =
                student.name
                    .toLowerCase()
                    .includes(searchText);


            const matchesStatus =
                status === "All" ||
                student.status === status;


            return matchesName &&
                   matchesStatus;

        });


    /* Sorting */

    state.filtered.sort((a, b) => {

        if (sort === "marks-desc") {

            return b.marks - a.marks;

        }


        if (sort === "marks-asc") {

            return a.marks - b.marks;

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

    });


    /* Average function */

    function average(data, property) {

        if (data.length === 0) {

            return 0;

        }


        const total =
            data.reduce(
                (sum, student) =>
                    sum + student[property],
                0
            );


        return Math.round(
            total / data.length
        );

    }


    /* Summary */

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
                student.status ===
                "Excellent"
        ).length;


    /* Result count */

    $("resultCount").textContent =

        `${state.filtered.length}
        record${state.filtered.length === 1
            ? ""
            : "s"}`;


    /* Table */

    renderTable();


    /* Chart */

    renderChart(
        state.filtered
    );

}



function renderTable() {

    if (state.filtered.length === 0) {

        $("tableBody").innerHTML = `

            <tr>

                <td colspan="6">

                    No matching records found.

                </td>

            </tr>

        `;

        return;

    }


    $("tableBody").innerHTML =

        state.filtered.map(student => {

            let badgeClass;


            if (
                student.status ===
                "Excellent"
            ) {

                badgeClass = "excellent";

            }

            else if (
                student.status ===
                "Good"
            ) {

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
                        ${student.marks}%
                    </td>

                    <td>
                        ${student.attendance}%
                    </td>

                    <td>

                        <span
                            class="badge ${badgeClass}">

                            ${student.status}

                        </span>

                    </td>

                </tr>

            `;

        }).join("");

}


function renderChart(records) {

    if (records.length === 0) {

        $("chart").innerHTML =
            "<p>No data available.</p>";

        return;

    }


    const maxMarks = 100;


    $("chart").innerHTML =

        records.slice(0, 8)
            .map(student => {

                const height =

                    Math.max(
                        4,
                        (student.marks /
                        maxMarks) * 180
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
                            style="height:${height}px"
                            aria-label="${student.name} scored ${student.marks} percent">

                        </div>


                        <span class="bar-label">

                            ${student.name}

                        </span>

                    </div>

                `;

            })
            .join("");

}




$("search").addEventListener(
    "input",
    updateDashboard
);


$("statusFilter").addEventListener(
    "change",
    updateDashboard
);


$("sortBy").addEventListener(
    "change",
    updateDashboard
);



loadData();