var sessions = {
  "111111": {
    "email": "dupe@dupe.com",
    "session": [
      {
        "subject": "ACC",
        "courseNum": "101"
      },
      {
        "subject": "MATH",
        "courseNum": "105"
      },
      {
        "subject": "MATH",
        "courseNum": "109"
      },
      {
        "subject": "MATH",
        "courseNum": "140"
      },
      {
        "subject": "MATH",
        "courseNum": "125"
      },
      {
        "subject": "ACC",
        "courseNum": "221"
      },
      {
        "subject": "ACC",
        "courseNum": "422"
      }
    ]
  }
};

var courses = {
  "ACC": [
    { "courseNum": "101", "desc": "ACCOUNTING I" },
    { "courseNum": "102", "desc": "ACCOUNTING II" },
    { "courseNum": "104", "desc": "FINANCIAL ACCTNG" },
    { "courseNum": "105", "desc": "ACCOUNTING ELECTIVE" },
    { "courseNum": "213", "desc": "ACCOUNTING SYSTEMS" },
    { "courseNum": "220", "desc": "ACCT COURSE" },
    { "courseNum": "221", "desc": "INTERM ACCTING I" },
    { "courseNum": "422", "desc": "INTERM ACCTING II" }
  ],
  "MATH": [
    { "courseNum": "105", "desc": "MATH COURSE" },
    { "courseNum": "109", "desc": "EXCURSIONS IN MATH I" },
    { "courseNum": "115", "desc": "PRE-CALCULUS" },
    { "courseNum": "125", "desc": "CALC:MGMT APPLCTN" },
    { "courseNum": "140", "desc": "DISCRETE MATH I" }
  ]
};

function restore() {
  for (var i = 0; i < userSession["dupe@dupe.com"]["session"].length; i++) {
    var subject = document.getElementById('course' + i + '-subject');
    var course = document.getElementById('course' + i + '-course');

    subject.value = userSession["dupe@dupe.com"]["session"][i]["subject"];
    course.value = userSession["dupe@dupe.com"]["session"][i]["course"];
  }
}