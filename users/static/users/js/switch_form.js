function switchForm(form) {
    switch (form) {
        case "user":
            document.getElementById("user-form-container").classList.remove("hidden");
            document.getElementById("user-form-container").classList.add("opened");

            document.getElementById("text-form-container").classList.add("hidden");
            document.getElementById("text-form-container").classList.remove("opened");

            document.getElementById("memo-form-container").classList.add("hidden");
            document.getElementById("memo-form-container").classList.remove("opened");

            document.getElementById("custom-form-container").classList.add("hidden");
            document.getElementById("custom-form-container").classList.remove("opened");
            break;
        
        case "text":
            document.getElementById("text-form-container").classList.remove("hidden");
            document.getElementById("text-form-container").classList.add("opened");

            document.getElementById("user-form-container").classList.add("hidden");
            document.getElementById("user-form-container").classList.remove("opened");

            document.getElementById("memo-form-container").classList.add("hidden");
            document.getElementById("memo-form-container").classList.remove("opened");

            document.getElementById("custom-form-container").classList.add("hidden");
            document.getElementById("custom-form-container").classList.remove("opened");
            break
        case "memo":
            document.getElementById("memo-form-container").classList.remove("hidden");
            document.getElementById("memo-form-container").classList.add("opened");

            document.getElementById("text-form-container").classList.add("hidden");
            document.getElementById("text-form-container").classList.remove("opened");

            document.getElementById("user-form-container").classList.add("hidden");
            document.getElementById("user-form-container").classList.remove("opened");

            document.getElementById("custom-form-container").classList.add("hidden");
            document.getElementById("custom-form-container").classList.remove("opened");
            break
        case "custom":
            document.getElementById("custom-form-container").classList.remove("hidden");
            document.getElementById("custom-form-container").classList.add("opened");

            document.getElementById("text-form-container").classList.add("hidden");
            document.getElementById("text-form-container").classList.remove("opened");

            document.getElementById("memo-form-container").classList.add("hidden");
            document.getElementById("memo-form-container").classList.remove("opened");

            document.getElementById("user-form-container").classList.add("hidden");
            document.getElementById("user-form-container").classList.remove("opened");
            break
        default:
            break;
    }
}