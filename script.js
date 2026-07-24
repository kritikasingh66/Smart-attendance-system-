// ======================================================
// FIREBASE IMPORTS
// ======================================================

import { auth, db } from "./firebase-config.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


// ======================================================
// ROLE MODAL
// ======================================================

const roleModal = document.getElementById("roleModal");


// Open modal

function openRoleModal() {

    if (roleModal) {

        roleModal.classList.add("active");

    }

}


// Close modal

function closeRoleModal() {

    if (roleModal) {

        roleModal.classList.remove("active");

    }

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


// Make functions available to HTML onclick

window.openRoleModal = openRoleModal;

window.closeRoleModal = closeRoleModal;

window.selectRole = selectRole;


// Close modal outside click

if (roleModal) {

    roleModal.addEventListener(
        "click",
        function (event) {

            if (event.target === roleModal) {

                closeRoleModal();

            }

        }
    );

}


// ======================================================
// PASSWORD VISIBILITY
// ======================================================

function togglePassword(inputId) {


    const passwordInput =
        document.getElementById(inputId);


    if (!passwordInput) {

        return;

    }


    if (passwordInput.type === "password") {

        passwordInput.type = "text";

    }

    else {

        passwordInput.type = "password";

    }

}


// Make function available to HTML onclick

window.togglePassword = togglePassword;


// ======================================================
// STUDENT REGISTRATION
// ======================================================

const registerForm =
    document.getElementById("studentRegisterForm");


if (registerForm) {


    registerForm.addEventListener(
        "submit",
        async function (event) {


            event.preventDefault();


            // Get form values

            const name =
                document.getElementById("studentName")
                .value
                .trim();


            const rollNumber =
                document.getElementById("rollNumber")
                .value
                .trim();


            const email =
                document.getElementById("registerEmail")
                .value
                .trim();


            const course =
                document.getElementById("course")
                .value;


            const password =
                document.getElementById("registerPassword")
                .value;


            const confirmPassword =
                document.getElementById("confirmPassword")
                .value;


            // Check password

            if (password !== confirmPassword) {

                alert(
                    "Passwords do not match! ❌"
                );

                return;

            }


            try {


                // -----------------------------------------
                // STEP 1: CREATE FIREBASE AUTH USER
                // -----------------------------------------

                const userCredential =
                    await createUserWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );


                const user =
                    userCredential.user;


                // -----------------------------------------
                // STEP 2: SAVE STUDENT DATA IN FIRESTORE
                // -----------------------------------------

                await setDoc(
                    doc(db, "students", user.uid),
                    {

                        uid: user.uid,

                        name: name,

                        rollNumber: rollNumber,

                        email: email,

                        course: course,

                        createdAt:
                            new Date()

                    }
                );


                // -----------------------------------------
                // SUCCESS
                // -----------------------------------------

                alert(
                    "Registration successful! 🎉"
                );


                // Redirect to login

                window.location.href =
                    "student-login.html";


            }


            catch (error) {


                console.error(
                    "Registration Error:",
                    error
                );


                // Firebase error messages

                if (
                    error.code ===
                    "auth/email-already-in-use"
                ) {

                    alert(
                        "This email is already registered. Please login. ⚠️"
                    );

                }


                else if (
                    error.code ===
                    "auth/weak-password"
                ) {

                    alert(
                        "Password should be at least 6 characters. ⚠️"
                    );

                }


                else if (
                    error.code ===
                    "auth/invalid-email"
                ) {

                    alert(
                        "Please enter a valid email address. ⚠️"
                    );

                }


                else {

                    alert(
                        "Registration failed: " +
                        error.message
                    );

                }

            }

        }
    );

}


// ======================================================
// STUDENT LOGIN
// ======================================================

const loginForm =
    document.getElementById("studentLoginForm");


if (loginForm) {


    loginForm.addEventListener(
        "submit",
        async function (event) {


            event.preventDefault();


            // Get login values

            const email =
                document.getElementById("loginEmail")
                .value
                .trim();


            const password =
                document.getElementById("loginPassword")
                .value;


            try {


                // Firebase Login

                const userCredential =
                    await signInWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );


                const user =
                    userCredential.user;


                console.log(
                    "Logged in user:",
                    user
                );


                alert(
                    "Login successful! 🎉"
                );


                // Temporary redirect

                // Later you can create
                // student-dashboard.html

                window.location.href =
                    "index.html";


            }


            catch (error) {


                console.error(
                    "Login Error:",
                    error
                );


                if (
                    error.code ===
                    "auth/invalid-credential"
                ) {

                    alert(
                        "Invalid email or password. ❌"
                    );

                }


                else if (
                    error.code ===
                    "auth/user-not-found"
                ) {

                    alert(
                        "No account found with this email. ❌"
                    );

                }


                else if (
                    error.code ===
                    "auth/wrong-password"
                ) {

                    alert(
                        "Incorrect password. ❌"
                    );

                }


                else {

                    alert(
                        "Login failed: " +
                        error.message
                    );

                }

            }

        }
    );

}
