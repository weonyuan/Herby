var sessions = {
  "111111": {
    "email": "dupe@dupe.com",
    "session": [
      {
        "subject": "POSC",
        "coursenum": "121"
      },
      {
        "subject": "MATH",
        "coursenum": "125"
      },
      {
        "subject": "MATH",
        "coursenum": "140"
      },
      {
        "subject": "MUS",
        "coursenum": "221"
      },
      {
        "subject": "ART",
        "coursenum": "103"
      },
      {
        "subject": "PHIL",
        "coursenum": "205"
      },
      {
        "subject": "CRJU",
        "coursenum": "250"
      }
    ]
  }
};

function restore() {
  for (var i = 0; i < userSession["dupe@dupe.com"]["session"].length; i++) {
    var subject = document.getElementById('course' + i + '-subject');
    var course = document.getElementById('course' + i + '-course');

    subject.value = userSession["dupe@dupe.com"]["session"][i]["subject"];
    course.value = userSession["dupe@dupe.com"]["session"][i]["course"];
  }
}