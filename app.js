

domo.get(`/domo/users/v1?includeDetails=true&limit=1`).then(function(data){

    let currentUser = domo.env.userId;
    domo.get(`/domo/users/v1/${currentUser}?includeDetails=true`)
    .then(function(data){
        console.log(data);
        // let pic = document.getElementById("pic");
        // let avatar = document.getElementById("avatar");
        // // avatar.innerHTML = data.avatarKey;
        // cosnsole.log("avatar" ,avatarKey);
        let pTag = document.getElementById("name");
        pTag.textContent = `Welcome ${data.displayName}!`; 
        one = data.avatarKey;
        document.getElementById('avatar').setAttribute('src',`${one}`)
    })
})



  document.addEventListener('DOMContentLoaded', function() {
    const selectElement = document.getElementById('userList');
    const emailToNameMap = {};
    

    // Fetch up to 200 users
    domo.get('/domo/users/v1?includeDetails=true&limit=140')
        .then(function(usersData) {
            console.log('Users data:', usersData);
            console.log(domo.env);
            usersData.forEach(function(user) {
                let option = document.createElement('option');
                // option.value = JSON.stringify({ email: user.detail.email, displayName: user.displayName }); // Store as JSON string
                option.value = user.detail.email; // Assuming user.detail.email is correct
                option.textContent = user.displayName; // Display user's name
                
                // console.log(option);
                selectElement.appendChild(option);
                emailToNameMap[user.detail.email] = user.displayName;
            });
        })
        .catch(function(error) {
            console.error('Error fetching users:', error);
        });



    window.send = function() {
        const selectedOptions = Array.from(selectElement.selectedOptions).map(option => option.value);
        console.log("Selected emails:", selectedOptions);
        const selectedNames = selectedOptions.map(email => emailToNameMap[email]);

        

        selectedOptions.forEach(email => {
            const displayName = emailToNameMap[email];
            if (displayName) {
                SendEmail(email, displayName);
            } else {
                console.error(`No display name found for email: ${email}`);
            }
        });
        displayMessage(selectedOptions, selectedNames);

        // Clear the selected options
      Array.from(selectElement.options).forEach(option => {
        option.selected = false;
    });


    }
        


    function SendEmail(email, displayName, subject = "Just for Testing", body = "It's test mail. Pls Ignore!!!") {
        console.log("Sending Email to:", email);
        const startWorkflow = (alias, body) => {
            console.log("Starting workflow with alias:", alias, "and body:", body);
            domo.post(`/domo/workflow/v1/models/${alias}/start`, body)
                .then(response => {
                    console.log("Workflow started successfully:", response);
                    // displayMessage(email, displayName);
                    console.log("Name",displayName);
                })
                .catch(error => {
                    console.error("Error starting workflow:", error);
                });
        }

        startWorkflow("send_email", { to: email, subject: subject, body: body });
    }

   
    function displayMessage(email, displayName) {
        var messageDiv = document.getElementById('message');
        if (messageDiv) {
            // const namesList = displayName.join(', ');
            // messageDiv.textContent = 'Sent email to: ' + namesList + ' (' + email + ')';
            const namesList = displayName.join(', ');
            const emailsList = email.join(', ');
            messageDiv.textContent = 'Sent email to: ' + namesList + ' (' + emailsList + ')';
            messageDiv.classList.remove('hidden');
            console.log("Display message called");
            setTimeout(function() {
                messageDiv.classList.add('hidden');
            }, 10000);
        } else {
            console.log("Element with ID 'message' not found");
        }
    }

});




  