// ======================================================
// FIREBASE IMPORTS
// ======================================================

import { auth, db } from "./firebase-config.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


// ======================================================
// ROLE MODAL
// ======================================================

const roleModal =
    document.getElementById("roleModal");


// Open role modal

function openRoleModal() {

    if (roleModal) {

        roleModal.classList.add("active");

    }

}


// Close role modal

function closeRoleModal() {

    if (roleModal) {

        roleModal.classList.remove("active");

    }

}


// Select role

function selectRole(role) {

    if (role === "student") {

        window.location.href =
            "student-login.html";

    }

    else if (role === "teacher") {

        alert(
            "Teacher Portal coming soon! 👨‍🏫"
        );

    }

}


// Make functions available
// for HTML onclick attributes

window.openRoleModal =
    openRoleModal;

window.closeRoleModal =
    closeRoleModal;

window.selectRole =
    selectRole;


// Close modal when clicking outside

if (roleModal) {

    roleModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                roleModal
            ) {

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


    if (
        passwordInput.type ===
        "password"
    ) {

        passwordInput.type =
            "text";

    }

    else {

        passwordInput.type =
            "password";

    }

}


// Make function available
// for HTML onclick

window.togglePassword =
    togglePassword;


// ======================================================
// STUDENT REGISTRATION
// ======================================================

const registerForm =
    document.getElementById(
        "studentRegisterForm"
    );


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            // Get form values

            const name =
                document
                    .getElementById(
                        "studentName"
                    )
                    .value
                    .trim();


            const rollNumber =
                document
                    .getElementById(
                        "rollNumber"
                    )
                    .value
                    .trim();


            const email =
                document
                    .getElementById(
                        "registerEmail"
                    )
                    .value
                    .trim();


            const course =
                document
                    .getElementById(
                        "course"
                    )
                    .value;


            const password =
                document
                    .getElementById(
                        "registerPassword"
                    )
                    .value;


            const confirmPassword =
                document
                    .getElementById(
                        "confirmPassword"
                    )
                    .value;


            // Check password match

            if (
                password !==
                confirmPassword
            ) {

                alert(
                    "Passwords do not match! ❌"
                );

                return;

            }


            try {

                // ------------------------------------------
                // STEP 1:
                // CREATE FIREBASE AUTHENTICATION USER
                // ------------------------------------------

                const userCredential =
                    await createUserWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );


                const user =
                    userCredential.user;


                // ------------------------------------------
                // STEP 2:
                // SAVE STUDENT DATA IN FIRESTORE
                // ------------------------------------------

                await setDoc(
                    doc(
                        db,
                        "students",
                        user.uid
                    ),
                    {

                        uid:
                            user.uid,

                        name:
                            name,

                        rollNumber:
                            rollNumber,

                        email:
                            email,

                        course:
                            course,

                        createdAt:
                            new Date()

                    }
                );


                // ------------------------------------------
                // REGISTRATION SUCCESS
                // ------------------------------------------

                alert(
                    "Registration successful! 🎉"
                );


                // Redirect to login page

                window.location.href =
                    "student-login.html";


            }

            catch (error) {

                console.error(
                    "Registration Error:",
                    error
                );


                // Firebase error handling

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
    document.getElementById(
        "studentLoginForm"
    );


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            // Get login values

            const email =
                document
                    .getElementById(
                        "loginEmail"
                    )
                    .value
                    .trim();


            const password =
                document
                    .getElementById(
                        "loginPassword"
                    )
                    .value;


            try {

                // ------------------------------------------
                // FIREBASE LOGIN
                // ------------------------------------------

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
                    user.uid
                );


                // Login successful

                alert(
                    "Login successful! 🎉"
                );


                // Redirect to student dashboard

                window.location.href =
                    "student-dashboard.html";


            }

            catch (error) {

                console.error(
                    "Login Error:",
                    error
                );


                // Firebase error handling

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


// ======================================================
// STUDENT DASHBOARD
// ======================================================

const dashboardName =
    document.getElementById(
        "dashboardName"
    );


// This code only runs on
// student-dashboard.html

if (dashboardName) {

    onAuthStateChanged(
        auth,
        async function (user) {

            // ------------------------------------------
            // CHECK LOGIN STATUS
            // ------------------------------------------

            if (!user) {

                alert(
                    "Please login first! 🔐"
                );


                window.location.href =
                    "student-login.html";


                return;

            }


            try {

                // ------------------------------------------
                // GET STUDENT DATA FROM FIRESTORE
                // ------------------------------------------

                const studentDoc =
                    await getDoc(
                        doc(
                            db,
                            "students",
                            user.uid
                        )
                    );


                // ------------------------------------------
                // CHECK DOCUMENT
                // ------------------------------------------

                if (
                    studentDoc.exists()
                ) {

                    const studentData =
                        studentDoc.data();


                    // --------------------------------------
                    // DISPLAY STUDENT NAME
                    // --------------------------------------

                    const studentName =
                        document.getElementById(
                            "studentName"
                        );


                    if (studentName) {

                        studentName.textContent =
                            studentData.name;

                    }


                    // --------------------------------------
                    // DISPLAY FULL NAME
                    // --------------------------------------

                    const dashboardNameElement =
                        document.getElementById(
                            "dashboardName"
                        );


                    if (
                        dashboardNameElement
                    ) {

                        dashboardNameElement.textContent =
                            studentData.name;

                    }


                    // --------------------------------------
                    // DISPLAY ROLL NUMBER
                    // --------------------------------------

                    const dashboardRoll =
                        document.getElementById(
                            "dashboardRoll"
                        );


                    if (dashboardRoll) {

                        dashboardRoll.textContent =
                            studentData.rollNumber;

                    }


                    // --------------------------------------
                    // DISPLAY COURSE
                    // --------------------------------------

                    const dashboardCourse =
                        document.getElementById(
                            "dashboardCourse"
                        );


                    if (dashboardCourse) {

                        dashboardCourse.textContent =
                            studentData.course;

                    }


                    // --------------------------------------
                    // DISPLAY EMAIL
                    // --------------------------------------

                    const dashboardEmail =
                        document.getElementById(
                            "dashboardEmail"
                        );


                    if (dashboardEmail) {

                        dashboardEmail.textContent =
                            studentData.email;

                    }

                }

                else {

                    alert(
                        "Student information not found! ⚠️"
                    );

                }

            }

            catch (error) {

                console.error(
                    "Dashboard Error:",
                    error
                );


                alert(
                    "Unable to load student data. ❌\n" +
                    error.message
                );

            }

        }
    );

}


// ======================================================
// LOGOUT
// ======================================================

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        async function () {

            try {

                // Firebase logout

                await signOut(auth);


                alert(
                    "You have been logged out successfully! 👋"
                );


                // Redirect to login

                window.location.href =
                    "student-login.html";


            }

            catch (error) {

                console.error(
                    "Logout Error:",
                    error
                );


                alert(
                    "Logout failed! ❌"
                );

            }

        }
    );

}
