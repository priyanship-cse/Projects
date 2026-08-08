// ===============================
// WebGuard - Frontend JavaScript
// ===============================

// Get HTML elements
let input = document.querySelector("#websiteUrl");
let scanButton = document.querySelector("#scanButton");
let scanMessage = document.querySelector("#scanMessage");

let securityScore = document.querySelector("#securityScore");
let riskLevel = document.querySelector("#riskLevel");

let httpsStatus = document.querySelector("#httpsStatus");
let hstsStatus = document.querySelector("#hstsStatus");
let cspStatus = document.querySelector("#cspStatus");
let frameStatus = document.querySelector("#frameStatus");
let contentTypeStatus = document.querySelector("#contentTypeStatus");
let redirectStatus = document.querySelector("#redirectStatus");

let reportContainer = document.querySelector("#reportContainer");

let aiButton = document.querySelector("#aiButton");


// ===============================
// Scan Button
// ===============================

scanButton.addEventListener("click", function () {

    let url = input.value.trim();

    // Check empty input
    if (url === "") {
        scanMessage.innerText = "Please enter a website URL.";
        scanMessage.style.color = "red";
        return;
    }

    // Check URL format
    try {
        new URL(url);
    } catch (error) {
        scanMessage.innerText = "Please enter a valid URL.";
        scanMessage.style.color = "red";
        return;
    }


    // Start scanning
    scanMessage.innerText = "🔍 Scanning website...";
    scanMessage.style.color = "#00e5ff";

    scanButton.disabled = true;
    scanButton.innerText = "Scanning...";


    // Demo delay
    setTimeout(function () {

        performDemoScan(url);

        scanButton.disabled = false;
        scanButton.innerText = "🔍 Scan Website";

    }, 1500);

});


// ===============================
// Demo Security Scan
// ===============================

function performDemoScan(url) {

    let score = 0;

    let isHTTPS = url.startsWith("https://");

    // HTTPS check
    if (isHTTPS) {
        httpsStatus.innerText = "✓ Enabled";
        httpsStatus.style.color = "#00ff88";

        score += 20;
    } else {
        httpsStatus.innerText = "✗ Not Secure";
        httpsStatus.style.color = "red";
    }


    // Demo security checks
    let hsts = Math.random() > 0.3;
    let csp = Math.random() > 0.4;
    let frame = Math.random() > 0.3;
    let contentType = Math.random() > 0.2;
    let redirect = isHTTPS || Math.random() > 0.5;


    // HSTS
    if (hsts) {

        hstsStatus.innerText = "✓ Present";
        hstsStatus.style.color = "#00ff88";

        score += 15;

    } else {

        hstsStatus.innerText = "✗ Missing";
        hstsStatus.style.color = "red";

    }


    // CSP
    if (csp) {

        cspStatus.innerText = "✓ Present";
        cspStatus.style.color = "#00ff88";

        score += 15;

    } else {

        cspStatus.innerText = "✗ Missing";
        cspStatus.style.color = "red";

    }


    // X-Frame-Options
    if (frame) {

        frameStatus.innerText = "✓ Present";
        frameStatus.style.color = "#00ff88";

        score += 10;

    } else {

        frameStatus.innerText = "✗ Missing";
        frameStatus.style.color = "red";

    }


    // X-Content-Type-Options
    if (contentType) {

        contentTypeStatus.innerText = "✓ Present";
        contentTypeStatus.style.color = "#00ff88";

        score += 10;

    } else {

        contentTypeStatus.innerText = "✗ Missing";
        contentTypeStatus.style.color = "red";

    }


    // HTTPS Redirect
    if (redirect) {

        redirectStatus.innerText = "✓ Enabled";
        redirectStatus.style.color = "#00ff88";

        score += 10;

    } else {

        redirectStatus.innerText = "✗ Not Detected";
        redirectStatus.style.color = "red";

    }


    // Calculate risk
    updateSecurityScore(score);

    // Generate report
    generateReport(
        hsts,
        csp,
        frame,
        contentType,
        redirect
    );


    scanMessage.innerText =
        "✓ Scan completed for " + url;

    scanMessage.style.color = "#00ff88";
}


// ===============================
// Security Score
// ===============================

function updateSecurityScore(score) {

    securityScore.innerText = score;


    if (score >= 80) {

        riskLevel.innerText = "🟢 Low Risk";
        riskLevel.style.color = "#00ff88";

    } else if (score >= 50) {

        riskLevel.innerText = "🟡 Medium Risk";
        riskLevel.style.color = "orange";

    } else {

        riskLevel.innerText = "🔴 High Risk";
        riskLevel.style.color = "red";

    }

}


// ===============================
// Vulnerability Report
// ===============================

function generateReport(
    hsts,
    csp,
    frame,
    contentType,
    redirect
) {

    reportContainer.innerHTML = "";


    let issues = [];


    if (!hsts) {

        issues.push({
            title: "HSTS Header Missing",
            severity: "Medium",
            description:
                "Strict-Transport-Security header was not detected."
        });

    }


    if (!csp) {

        issues.push({
            title: "Content-Security-Policy Missing",
            severity: "Medium",
            description:
                "CSP header was not detected."
        });

    }


    if (!frame) {

        issues.push({
            title: "X-Frame-Options Missing",
            severity: "Low",
            description:
                "X-Frame-Options header was not detected."
        });

    }


    if (!contentType) {

        issues.push({
            title: "X-Content-Type-Options Missing",
            severity: "Low",
            description:
                "X-Content-Type-Options header was not detected."
        });

    }


    if (!redirect) {

        issues.push({
            title: "HTTPS Redirect Not Detected",
            severity: "Medium",
            description:
                "HTTP to HTTPS redirect was not detected."
        });

    }


    // No issues
    if (issues.length === 0) {

        reportContainer.innerHTML = `
            <div class="empty-report">

                <div class="report-icon">
                    🛡️
                </div>

                <h3>
                    No Major Issues Detected
                </h3>

                <p>
                    WebGuard did not detect any of the
                    configured demo checks as failing.
                </p>

            </div>
        `;

        return;
    }


    // Display issues
    issues.forEach(function (issue) {

        let card = document.createElement("div");

        card.className = "report-card";

        card.innerHTML = `

            <div>

                <h3>
                    ${issue.title}
                </h3>

                <p>
                    ${issue.description}
                </p>

            </div>

            <strong>
                ${issue.severity}
            </strong>

        `;

        card.style.padding = "20px";
        card.style.marginBottom = "15px";
        card.style.background = "#0d1c2d";
        card.style.border = "1px solid #263c54";
        card.style.borderRadius = "10px";

        reportContainer.appendChild(card);

    });

}


// ===============================
// AI Security Assistant
// ===============================

aiButton.addEventListener("click", function () {

    let message = document.createElement("div");

    message.style.marginTop = "20px";
    message.style.padding = "20px";
    message.style.background = "#07111f";
    message.style.border = "1px solid #00e5ff";
    message.style.borderRadius = "10px";

    message.innerHTML = `
        <h3>🤖 Security Assistant</h3>

        <p>
            WebGuard can explain detected security
            configuration issues in simple language.
        </p>

        <p>
            <strong>Next Step:</strong>
            Connect this feature to an AI API
            through the backend for dynamic explanations.
        </p>
    `;

    let existingMessage =
        document.querySelector(".ai-message");

    if (existingMessage) {
        existingMessage.remove();
    }

    message.className = "ai-message";

    aiButton.parentElement.appendChild(message);

});