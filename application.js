

let send_email = document.getElementById('myBtn1');





send_email.addEventListener('click', SendEmailLoop);



function SendEmailLoop(){
  let to = ["1129963338", "1741783155", "38266541", "1331599280", "788642721"]

  to.forEach(
    function (personId) {
      SendEmail(to = personId)
    }
  )
};



function SendEmail(to, subject = "test", body = "Test Email") {

  console.log("Sending Email to====>", to);
  const startWorkflow = (alias, body) => {
    domo.post(`/domo/workflow/v1/models/${alias}/start`, body)
  }

  startWorkflow("send_email", { to: to, subject: subject, body: body });

}

 
// domo.get(/domo/users/v1?includeDetails=true&limit=1).then(function(data){
//     var personName=[];
//     let currentUser = domo.env.userId;
//     domo.get(/domo/users/v1/${currentUser}?includeDetails=true)
//     .then(function(data){
//         console.log(data);
//         let pic = document.getElementById("pic");
//         let avatar = document.getElementById("avatar");
//         // avatar.innerHTML = data.avatarKey;
//         console.log("avatar" ,avatar);
//         let pTag = document.createElement("p");
//         pTag.innerHTML = Welcome ${data.displayName} !!!; // Assuming 'data' has a 'name' property
//         pic.appendChild(pTag);
//     })
// })



// domo.get(/domo/users/v1/:${currentUser}?includeDetails=true)
    // .then(function(data){
    //     let pic = document.getElementById("pic")
    //     let pTag = document.createElement("p")
    //     pTag.innerHTML = Welcome ${currentUser} !!!;
    //     pic.appendChild(pTag);
    // })
    // console.log(currentUser);
    // data.forEach(element => {
    //     personName.push(element.displayName);
    // });

    