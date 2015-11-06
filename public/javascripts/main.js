// main.js
var numCourses = 0;

var CourseSelect = React.createClass({
  render: function() {
    return (
      <div id="course23" class="form-group">
        <label class="col-xs-2 col-sm-2 col-md-2 control-label">1</label>
        <div class="col-xs-5 col-sm-5 col-md-5">
          <select class="form-control">
            <option value="" selected>Subject</option>
            <option value="ACC">ACC</option>
          </select>
        </div>
        <div class="col-xs-5 col-sm-5 col-md-5">
          <select class="form-control">
            <option value="" selected>Course</option>
            <option value="101">101</option>
          </select>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <CourseSelect />,
  document.getElementById('courses')
);