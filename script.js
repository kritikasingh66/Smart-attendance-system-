// ================= ROLE MODAL =================

const roleModal = document.getElementById("roleModal");


// Open modal
function openRoleModal() {
    roleModal.classList.add("active");
}


// Close modal
function closeRoleModal() {
    roleModal.classList.remove("active");
}


// Select role
function selectRole(role) {

    if (role === "student") {

        window.location.href = "student-login.html";

    }

    else if (role === "teacher") {

        alert("Teacher Portal coming soon! 👨‍🏫");

    }

}


// Close modal when clicking outside
roleModal.addEventListener("click", function (event) {

    if (event.target === roleModal) {

        closeRoleModal();

    }

});
// ================= PASSWORD VISIBILITY =================

function togglePassword(inputId) {

    const passwordInput =
        document.getElementById(inputId);

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

    } else {

        passwordInput.type = "password";

    }

}


// ================= STUDENT REGISTRATION =================

const registerForm =
    document.getElementById("studentRegisterForm");


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const name =
                document.getElementById("studentName").value;

            const rollNumber =
                document.getElementById("rollNumber").value;

            const email =
                document.getElementById("registerEmail").value;

            const password =
                document.getElementById("registerPassword").value;

            const confirmPassword =
                document.getElementById("confirmPassword").value;


            if (password !== confirmPassword) {

                alert("Passwords do not match! ❌");

                return;

            }


            alert(
                `Welcome ${name}! 🎉\nRegistration UI is working.\nFirebase will be connected in the next step.`
            );

        }
    );

}


// ================= STUDENT LOGIN =================

const loginForm =
    document.getElementById("studentLoginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            alert(
                "Login UI is working! 🔐\nFirebase Authentication will be connected next."
            );

        }
    );

}
