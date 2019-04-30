@page bit-academy Bitovi Academy
@hidesidebar
@hidetitle
@hidedescription
@hidecontentnav
@description Welcome to Bitovi Academy. Learn front-end development, design,
and management in these free courses!

@body
<style>
.main-content {
  width: 100%;
  padding-right: 0;
}
.container {
  padding: 0;
}
.container .academy-section{
  border-bottom: 1px solid #e7e8e6;
  padding: 60px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
}
.container .academy-section--grey{
  background-color: #f5f6f6;
}
.container .academy-section--dark{
  color: white;
  background-color: #404548;
  border: 1px solid #404548;
}
.container .academy-section h3{
  font-size: 31px;
  font-weight: 300;
  margin: 0 0 30px 0;
}
.container .academy-section--dark h3{
  margin: 0;
}
.academy-section .courses-container{
  border: 2px solid red;
}
.container .academy-section .courses{
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  margin-bottom: 60px;
}
.container .academy-section .courses:last-of-type{
  margin-bottom: 0;
}
.container .academy-section .courses .course{
  background-color: white;
  border: 1px solid #e7e8e6;
  padding: 30px;
  margin-right: 60px;
  flex: 1;
  text-align: left;
  min-width: 0;
  display: flex;
}
.course h4{
  text-align: center;
}
.academy-section .courses .course:hover{
  border: 1px solid #c6c6c6;
  cursor: pointer;
}
.academy-section .courses .course a{
  text-decoration: none;
  color: #333;
}
.container .academy-section .courses .course:last-of-type{
  margin-right: 0;
}
.content {
  margin: 0;
}
.content .main{
  padding: 0;
}
.academy-card{
  border: 1px solid #e7e8e6;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-right: 60px;
  align-items: center;
  justify-content: flex-start;
  padding: 30px;
  text-align: center;
  background-color: white;
}
.academy-card h4{
  font-size: 20px;
  margin: 0;
}
.academy-cards-container .academy-card:last-of-type{
  margin-right: 0;
}
.container .academy-logos{
  background-color: #f5f6f6;
  flex-direction: row;
  justify-content: space-between;
  padding: 30px 60px;
}
.academy-card--red{
  background-color: #ca313c;
  border-color: #ca313c;
  color: white;
  text-align: left;
  align-items: flex-end;
}
.academy-card--blue{
  background-color: #4270b7;
  border-color: #4270b7;
  color: white;
  text-align: left;
  align-items: flex-end;
}
.academy-card--orange{
  background-color: #e47c3c;
  border-color: #e47c3c;
  color: white;
  text-align: left;
  align-items: flex-end;
}
.hero-banner {
  margin-left: -30px;
  margin-right: -30px;
  background: url('./static/img/academy-banner.png') no-repeat top center;
  background-size: cover;
  background-color: #428ac9;
  text-align: center;
}
.container .hero-banner h2{
  max-width: none;
  margin-bottom: 30px !important;
}
.event-title{
  margin-top: 0;
}
.course .detail {
 padding: 0;
 margin: 0;
}
.details-container{
  border: 1px solid #eee;
  padding: 15px;
  margin: 0px;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.button{
 padding: 5px 15px;
 background-color: #356FD1;
 border: 1px solid #356FD1;
 color: white;
 border-radius: 3px;
 text-decoration: none;
 display: inline-flex;
 align-items: center;
 justify-content: center;
}
.button:hover{
  background-color: #2F507F;
  border-color: #2F507F;
  cursor: pointer;
}
.button-large{
  padding: 10px 35px;
  font-size: 20px;
}
.button-red{
  background-color: #cb2036;
  border-color: #cb2036;
}
.button-red:hover{
  background-color: #961a2f;
  border-color: #961a2f;
}
.button-grey{
  background-color: #e5eaea;
  border-color: #e5eaea;
  color: #333;
}
.button-grey:hover{
  background-color: #b4b5b5;
  border-color: #b4b5b5;
}
.button img{
  margin-right: 7.5px;
}
.slack-button{
  margin-top: 15px;
}
.academy-cards-container{
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  flex-direction: row;
}
.academy-intro{
  padding: 60px;
}
.academy-cards-container .academy-card h4{
 margin: 0;
}
.academy-cards-container .academy-card p{
  margin: 0;
}
.academy-cards-container .academy-card:last-of-type{
  margin-right: 0px;
}
.content .main{
  padding: 0;
}
a.link{
  font-weight: 600;
  text-decoration: none;
}
.academy-card .card-image{
  margin-bottom: 30px;
}
.course-logo{
  height: 70px;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  justify-content: center;
}
p.quote-author{
  opacity: .6;
  font-size: 14px;
}
.live-events .courses{
  display: flex;
  width: 100%;
  margin-top: 30px;
}
.live-events .courses .academy-card{
  padding: 0;
}
.events-container{
  display: flex;
  flex: 1;
}
.academy-card .detail .event-location a{
  word-break: break-word;
  color: #356FD1;
  font-weight: 600;
}
.academy-card h4.event-title{
  margin-bottom: 17.6px;
}
</style>

<div class="container">
  <div class="hero-banner">
    <h1>Level up your front-end skills</h1>
    <h2>Whether you're a beginner or a seasoned senior dev, Academy courses have something that will help you improve your JavaScript skills.</h2>
    <a class="button button-large button-red">Browse our courses</a>
  </div>

  <div class="academy-section academy-section--grey">
    <div class="academy-cards-container">
      <div class="academy-card">
        <img class="card-image" src="./static/img/academy-1.png" width="100">
        <h4>Learn by doing</h4>
        <p><a class="link" href="https://www.gse.harvard.edu/news/14/11/benefit-interactive-learning">Hands-on exercises</a> to teach you Angular, JavaScript, the DOM, TypeScript, RxJS, Angular and more.</p>
      </div>
      <div class="academy-card">
       <img class="card-image" src="./static/img/academy-2.png" width="100">
       <h4>Get help when you need it</h4>
       <p>Our team of expert front-end developers is only a slack message away.</p>
       <a class="button slack-button" href="https://join.slack.com/t/bitovi-community/shared_invite/enQtNTIzMTE5NzYxMjA3LWMwMzE4MjFkMTI5ZmZjNzllYjc2MzcxOWNmOTg3YjI4NjE0MGFkZGNkOTNlZjlkNDBhNTlmYTcwMzJlZDZjY2Y"><img src="./static/img/slack-logo.svg" height="20">Join our slack community</a>
      </div>
      <div class="academy-card">
        <img class="card-image" src="./static/img/academy-3.png" width="100">
        <h4>Leverage battle-tested trainings</h4>
        <p>The same trainings materials have been sharpened over the past decade and delivered to enterprise frontend teams at Sony, Lowes, Walmart, and more. Free and <a class="link" href="https://github.com/bitovi/academy">open source</a>.</p>
      </div>
    </div>
  </div>

  <div class="academy-section academy-logos" style="display: none;">
    <img src="./static/img/javascript.png" height="50">
    <img src="./static/img/angular.png" height="50">
    <img src="./static/img/jquery.png" height="40">
    <img src="./static/img/rxjs.png" height="50">
    <img src="./static/img/typescript.png" height="40">
  </div>

  <div class="academy-section">
    <h3>What people are saying about us</h3>
    <div class="academy-cards-container">
      <div class="academy-card academy-card--red">
        <p>“Really enjoyed this class! The instructor, Justin, was phenomenal, and the content was both challenging and engaging. Even though framework usage is ubiquitous these days, it's rewarding to understand exactly how libraries interact with the DOM on a granular level. I am looking forward to more Bitovi events in the future.”</p>
        <p class="quote-author">- DoneJS Meetup attendee</p>
      </div>
      <div class="academy-card academy-card--blue">
        <p>“Really enjoyed this class! The instructor, Justin, was phenomenal, and the content was both challenging and engaging. Even though framework usage is ubiquitous these days, it's rewarding to understand exactly how libraries interact with the DOM on a granular level. I am looking forward to more Bitovi events in the future.”</p>
        <p class="quote-author">- DoneJS Meetup attendee</p>
      </div>
      <div class="academy-card academy-card--orange">
        <p>“Really enjoyed this class! The instructor, Justin, was phenomenal, and the content was both challenging and engaging. Even though framework usage is ubiquitous these days, it's rewarding to understand exactly how libraries interact with the DOM on a granular level. I am looking forward to more Bitovi events in the future.”</p>
        <p class="quote-author">- DoneJS Meetup attendee</p>
      </div>
    </div>
  </div>

  <div class="academy-section academy-section--grey">
    <h3>Courses</h3>
    <div class="courses">
      <div class="academy-card course">
        <a href="./learn-advanced-javascript.html">
          <div class="course-logo">
            <img src="./static/img/javascript.png" height="70">
          </div>
          <h4>Advanced JavaScript</h4>
          <p>Learn all the hard but important stuff you should know when programming JavaScript.</p>
          <p class='detail'><strong>Audience:</strong> Intermediate JS developers</p>
          <p class='detail'><strong>Goal:</strong> Understand what's going on "under the hood".</p>
          <p class='detail'><strong>Time:</strong> 6 hours</p>
        </a>
      </div>
      <div class="academy-card course">
        <a href="./learn-dom-jquery.html">
          <div class="course-logo">
            <img src="./static/img/jquery.png" width="150">
          </div>
          <h4>DOM and jQuery</h4>
          <p>Build your own version of jQuery and use it to make a basic tabs widget. Enjoy the
  meta programming too!</p>
          <p class='detail'><strong>Audience:</strong> Intermediate JS developers</p>
          <p class='detail'><strong>Goal:</strong> Understand the DOM enough to build widgets frameworks can't.</p>
          <p class='detail'><strong>Time:</strong> 10 hours</p>
        </a>
      </div>
      <div class="academy-card course">
        <a href="./learn-to-debug-javascript.html">
          <div class="course-logo">
            <img src="./static/img/javascript.png" height="70">
          </div>
          <h4>Debug JavaScript</h4>
          <p>Learn breakpoints and how to debug the scope, stack, prototypes, and
  property changes.</p>
          <p class='detail'><strong>Audience:</strong> Beginner JS developers</p>
          <p class='detail'><strong>Goal:</strong> Debug most problems with chrome developer tools.</p>
          <p class='detail'><strong>Time:</strong> 1 hour</p>
        </a>
      </div>
    </div>
    <div class="courses">
      <div class="academy-card course">
        <a href="./learn-typescript.html">
          <div class="course-logo">
            <img src="./static/img/typescript.png" width="140">
          </div>
          <h4>TypeScript</h4>
          <p>Learn the essentials of TypeScript: types, functions, classes, interfaces and generics.</p>
          <p class='detail'><strong>Audience:</strong> Beginner JS developer</p>
          <p class='detail'><strong>Goal:</strong> Be ready to develop a TypeScript project.</p>
          <p class='detail'><strong>Time:</strong> 3 hours</p>
        </a>
      </div>
      <div class="academy-card course">
        <a href="./learn-rxjs.html">
          <div class="course-logo">
            <img src="./static/img/rxjs.png" height="68">
          </div>
          <h4>RxJS</h4>
          <p>Build a validating credit card form with RxJS and a bit of Angular. Learn
          the hard but fundamental operators.</p>
          <p class='detail'><strong>Audience:</strong> Intermediate JS developers</p>
          <p class='detail'><strong>Goal:</strong> Build complex state mechanics with observables.</p>
          <p class='detail'><strong>Time:</strong> 6 hours</p>
        </a>
      </div>
      <div class="academy-card course">
        <a href="./learn-angular.html">
          <div class="course-logo">
            <img src="./static/img/angular.png" height="70">
          </div>
          <h4>Angular</h4>
          <p>Build a multipage, realtime ordering app with Angular. Learn
          FormBuilder and FormGroup. Write tests
          too!</p>
          <p class='detail'><strong>Audience:</strong> Intermediate JS developers</p>
          <p class='detail'><strong>Goal:</strong> Build data driven applications with Angular.</p>
          <p class='detail'><strong>Time:</strong> 10 hours</p>
        </a>
      </div>
    </div>
  </div>
  <div class="academy-section live-events">
    <h3>Live events</h3>
    <p>Every two weeks, Bitovi hosts a live training. Subscribe to Bitovi's community calendar to be part of the next one!</p>
    <a class="button" href="https://calendar.google.com/calendar/embed?src=jupiterjs.com_g27vck36nifbnqrgkctkoanqb4%40group.calendar.google.com"><img src="./static/img/calendar.svg" height="20"> Subscribe to our calandar</a>
  <calendar-events api-key="AIzaSyBsNpdGbkTsqn1BCSPQrjO9OaMySjK5Sns" calendar-id="jupiterjs.com_g27vck36nifbnqrgkctkoanqb4@group.calendar.google.com" event-count="3" class="courses">
    <template>
          <div class="academy-card course">
            <a class='event-url'>
              <h4 class='event-title'></h4>
              <div class="details-container">
                <p class='detail'><strong>Date:</strong>
                  <span class='event-date'></span>
                </p>
                <p class='detail'><strong>Location:</strong>
                  <span class='event-location'></span>
                </p>
                <p class='detail'><strong>Group:</strong>
                  <span class='event-group'></span>
                </p>
              </div>
              <p class='event-body'></p>
            </a>
          </div>
        </template>
      </calendar-events>
  </div>
  <div class="academy-section academy-section--grey">
    <h3>Coming soon</h3>
    <div class="courses">
      <div class="academy-card">
        <div class="course-logo">
          <img src="./static/img/react.png" width="70">
        </div>
        <h4>React</h4>
        <p>Build a multipage, realtime ordering app with React.</p>
      </div>
      <div class="academy-card">
        <div class="course-logo">
          <img src="./static/img/javascript.png" width="60">
        </div>
        <h4>Your Course Here</h4>
        <p>Got an idea for a course? Let us know by <a class="link" href="https://github.com/bitovi/academy/issues/new">submitting an issue</a>.</p>
      </div>
      <div class="academy-card">
        <div class="course-logo">
          <img src="./static/img/slack.png" width="150">
        </div>
        <h4>Need Help?</h4>
        <p>Reach out to our team via <a class="link" href="https://join.slack.com/t/bitovi-community/shared_invite/enQtNTIzMTE5NzYxMjA3LWMwMzE4MjFkMTI5ZmZjNzllYjc2MzcxOWNmOTg3YjI4NjE0MGFkZGNkOTNlZjlkNDBhNTlmYTcwMzJlZDZjY2Y">Slack</a>. We can help answer any questions you have about our courses.</p>
      </div>
    </div>
  </div>
  <div class="academy-section academy-section--dark">
    <h3>Become a part of our community</h3>
    <p>Get updates about new training courses, live events, and product launches!</p>
    <a class="button button-grey">Join our mailing list</a>
  </div>
</div>
