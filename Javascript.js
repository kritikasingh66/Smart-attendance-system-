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

        alert("Student Registration & Login coming soon! 🎓");

    }

    else if (role === "teacher") {

        alert("Teacher Login coming soon! 👨‍🏫");

    }

}


// Close modal when clicking outside
roleModal.addEventListener("click", function (event) {

    if (event.target === roleModal) {

        closeRoleModal();

    }

});
