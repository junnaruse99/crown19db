import React, { useState, useEffect } from 'react';
import adamPFP from './pfp/adam-pfp.jpg';
import alejandroPFP from './pfp/alejandro-pfp.jpg';
import nicholasPFP from './pfp/nicholas-pfp.jpg';
import markPFP from './pfp/mark-pfp.jpg';
import junPFP from './pfp/jun-pfp.jpg';
import './About.css';

// A class for holding data related to a contributor's git contributions
class GitInfo {
  numCommits: number = 0;
  numIssues: number = 0;
  numUnitTests: number = 0;
  email: string; // Used to match commits to contributors
  username: string; // Used to match issues to contributors

  constructor(email: string, username: string, tests) {
    this.email = email;
    this.username = username;
    this.numUnitTests = tests;
  }
}

// An interface for holding data about a contributor
interface ContributorInfo {
  name: string;
  photo: any;
  bio: string;
  responsibilities: Array<string>;
  gitInfo: GitInfo;
}

// Given a [ContributorInfo], return the html to display it
function ContributorExhibit(props: any) {
  var contributor: ContributorInfo = props.contributor;

  return (
    <div className="container">
      <div className="about-contributor card">
        <h4 style={{textAlign: "center", marginTop: '15px'}}>{contributor.name}</h4>
        <div className="about-contributor-header">
          <img src={contributor.photo} alt="contributor" className="about-contributor-pfp" />
        </div>

        <div className="about-contributor-child">
          <h6 style={{textAlign: "center", fontSize: '20px'}}>Responsibilities:</h6>
          <div className='contributor-block'>{
            contributor.responsibilities.map(responsibility => (
                <span>{responsibility}<br /></span>
            ))
          }</div>

          <h6 style={{textAlign: "center", fontSize: '20px'}}>Contributions:</h6>
          <div className='contributor-block'>
            <span style={{fontWeight: "bold"}}>{contributor.gitInfo.numCommits + ''} </span>
            <span> Commits, </span>
            <span style={{fontWeight: "bold"}}>{contributor.gitInfo.numIssues + ''} </span>
            <span> Issues, </span>
            <span style={{fontWeight: "bold"}}>{contributor.gitInfo.numUnitTests + ''} </span>
            <span>Unit Tests</span>
          </div>
          
          <p>
            {contributor.bio}
          </p>
        </div>
      </div>
    </div>
  );
}

function SourceExhibit(props: any) {
  return (
    <div className='about-widget card'>
      <h4 style={{textAlign: "center"}}>{props.name}</h4>
      <span style={{textAlign: "justify"}}>{props.description}</span>
      <a href={props.link} className="stretched-link"></a>
    </div>
  );
}

// Return an Array<ContributorInfo> containing information about each contributor.
// The last element of will be a ContributorInfo containg the sum of the stats.
// This function must be called with await so that contributor's GitStats
// can be populated via the GitLab API
async function getContributors() {
  var adamStats: ContributorInfo = {
    name: 'Adam Samuelson',
    photo: adamPFP,
    bio: 'Adam is in his 4th and final year at UT as a CS major with a \
          minor in government. Outside of class he mentors freshmen through \
          a CNS FIG known as TIP. Additionally, he enjoys listening to \
          music, hanging out with friends, working on his own CS projects, \
          and hydrating himself with water.',
    responsibilities: [
      'Back-end development'],
    gitInfo: new GitInfo('lilbroadam@gmail.com', 'adamsamuelson', 0),
  };

  var alejandroStats: ContributorInfo = {
    name: 'Alejandro Balderas',
    photo: alejandroPFP,
    bio: 'Alejandro is a senior majoring in CS. This is his last year \
          before graduating and starting a full time position at Expedia.\
          He loves pugs and exercising',
    responsibilities: [
      'Front-end development'],
    gitInfo: new GitInfo('alejandro_balderas@utexas.edu', 'alejandrobk', 0),
  };

  var nicholasStats: ContributorInfo = {
    name: 'Nicholas Huang',
    photo: nicholasPFP,
    bio: 'Nicholas fell in love with programming since high school and has been coding \
          ever since. Now, he is very proud to work as a developer for CovidDB, working \
          long hours to ensure that users get all the COVID-19 information that they need',
    responsibilities: [
      'Front-end development',
      'Front-end unit testing'],
    gitInfo: new GitInfo('nhua5610@gmail.com', 'OddJerbb', 23),
  };

  var junStats: ContributorInfo = {
    name: 'Jun Naruse',
    photo: junPFP,
    bio: 'Jun is an exchange student from Peru. He is in his last semester \
          majoring in Mechatronics Engineering. In his free time he likes watching \
          anime and reading manga.',
    responsibilities: [
      'Back-end development',
      'Back-end unit testing'],
    gitInfo: new GitInfo('jun.naruse@gmail.com', 'jun.naruse', 32),
  };

  var markStats: ContributorInfo = {
    name: 'Mark Grubbs',
    photo: markPFP,
    bio: 'Mark is in his last semester as a CS major with a certificate \
          in Japanese. He is really into video games.',
    responsibilities: [
      'Front-end Unit Testing'],
    gitInfo: new GitInfo('siegbalicula@gmail.com', 'mgrubbs', 18),
  };

  var totalStats: ContributorInfo = {
    name: 'total',
    photo: '',
    bio: '',
    responsibilities: [],
    gitInfo: new GitInfo('total', 'total', 73),
  };

  var contributors: Array<ContributorInfo> = [
    alejandroStats,
    markStats,
    nicholasStats,
    junStats,
    adamStats,
    totalStats,
  ];

  // Get number of commits for each contributor
  const gitlabContributorsPath: string = 'https://gitlab.com/api/v4/projects/29917081/repository/contributors';
  await fetch(gitlabContributorsPath)
    .then(res => {
      return res.json();
    })
    .then(data => {
      for (var key in data) {
        var rawCommitStat = data[JSON.parse(key)];
        totalStats.gitInfo.numCommits += rawCommitStat.commits;
        contributors.forEach((contributor: ContributorInfo) => {
          if (contributor.gitInfo.email === rawCommitStat.email) {
            contributor.gitInfo.numCommits = rawCommitStat.commits;
          }
        });
      }
    });

  // Get number of issues opened for each contributor
  const gitlabIssuesPath: string = 'https://gitlab.com/api/v4/projects/29917081/issues?per_page=100';
  await fetch(gitlabIssuesPath)
    .then(res => {
      return res.json();
    })
    .then(data => {
      for (var key in data) {
        var rawIssueStat = data[JSON.parse(key)];
        totalStats.gitInfo.numIssues++;
        contributors.forEach((contributor: ContributorInfo) => {
          if (contributor.gitInfo.username === rawIssueStat.author.username) {
            contributor.gitInfo.numIssues++;
          }
        });
      }
    });
  
  
  return contributors;
}

export default function About(props) {
  const [contributorStats, setContributorStats] = useState<Array<ContributorInfo>>([]);
  const [totalStats, setTotalStats] = useState<ContributorInfo>();
  
  // Set contributorStats
  useEffect(() => {
    async function asyncSetContributorStats() {
      var contributors: Array<ContributorInfo> = await getContributors();
      setTotalStats(contributors.pop());
      setContributorStats(contributors);
    }

    asyncSetContributorStats();
  }, []);

  return (

    /**
     * Requirements for the about page:
     * 
     * Description of site (purpose, intended users)
     * Explanation of the interesting result of integrating disparate data
     * Name, photo, bio, major responsibilities (ex: frontend vs backend team), 
     * # of commits, issues, and unit tests contributed of each team member
     * Total # of commits, issues, and unit tests
     * Links to APIs and additional data sources, and how each was scraped
     * Tools used and a description of how they were used
     */

    <div className='container'>
      <h1 style={{textAlign: "center", fontSize: "50px"}}>About CovidDB</h1><br />

      {/* Description of site (purpose, intended users) */}
      <h2 style={{textAlign: "center"}}>Purpose</h2>
      <p style={{textAlign: "center"}}>
        In the ever-evolving world of COVID-19, CovidDB is here to help you 
        keep track of your changing health environment. We help you get the
        information you need by organizing information about COVID-19 cases
        per country and city over time.
      </p><br />

      {/* Explanation of the interesting result of integrating disparate data */}
      <h2 style={{textAlign: "center"}}>Interesting findings</h2>
      <p style={{textAlign: "center"}}>
        It's hard to find APIs that supply COVID data per city.
      </p><br />

      {/* Name, photo, bio, major responsibilities (ex: frontend vs backend team),  */}
      {/* # of commits, issues, and unit tests contributed of each team member */}
      <h2 style={{textAlign: "center"}}>Contributors and contributor stats </h2><br />
      <div className="contributor-container">
          {
            contributorStats.map( contributor => (
              <p>
                <ContributorExhibit contributor={contributor}/>
              </p>
            ))
          }
      </div><br />
      
      {/* Total # of commits, issues, and unit tests */}
      <h2 style={{textAlign: "center"}}>Overall project stats</h2>
      <div style={{textAlign: "center"}}>
        <span style={{fontWeight: "bold"}}>{totalStats?.gitInfo.numCommits + ''} </span>
        <span>Total Commits, </span>
        <span style={{fontWeight: "bold"}}>{totalStats?.gitInfo.numIssues + ''} </span>
        <span>Total Issues, </span>
        <span style={{fontWeight: "bold"}}>{totalStats?.gitInfo.numUnitTests + ''} </span>
        <span>Total Unit Tests, </span>
      </div><br /><br />

      {/* Links to APIs and additional data sources, and how each was scraped */}
      <h2 style={{textAlign: "center"}}>Our sources</h2><br />
      <div className="sources-container">
          {/* <SourceExhibit 
            name={'GitLab contributors API'}
            description={'An API endpoint that returns information \
              about the project in terms of the contributors that have worked \
              on it and how many commits they have made.'}
            link={'https://gitlab.com/api/v4/projects/29917081/repository/contributors'}
          />
          <SourceExhibit 
            name={'GitLab Issues API'}
            description={'An API endpoint that returns information \
              about the project in terms of the issues that have been \
              submitted to the repo on GitLab.'}
            link={'https://gitlab.com/api/v4/projects/29917081/issues'}
          /> */}
          <SourceExhibit 
            name={'COVID-19 Cases Data'}
            description={'Our data about COVID-19 cases is supplied by this \
              source. The data was compiled by John Hopkins University.'}
            link={'https://data.humdata.org/dataset/novel-coronavirus-2019-ncov-cases'}
          />
           <SourceExhibit 
            name={'General Country Data'}
            description={'The below website was used to determine general \
              information about a country such as it\'s population, timezone, \
              and coordinates.'}
            link={'https://restcountries.com/'}
          />
          <SourceExhibit 
            name={'General City Data'}
            description={'The below website was used to determine general \
              information about a city such as it\'s population, timezone, \
              and coordinates.'}
            link={'https://simplemaps.com/data/world-cities'}
          />
          {/* <SourceExhibit 
            name={'City and country maps'}
            description={'Interactive maps were provided by Google Maps.'}
            link={'https://www.google.com/maps'}
          /> */}
      </div><br /><br />

      {/* Tools used and a description of how they were used */}
      <h2 style={{textAlign: "center"}}>Tools Used</h2><br />
      <div className="tools-container">
        <SourceExhibit 
          name={"HTML"}
          description={"A mark-up language that tells your browser how to display our website."}
          link={"https://www.w3schools.com/html/"}
        />
        <SourceExhibit 
          name={"Bootstrap"}
          description={"A framework for CSS that makes it easier to write CSS for our website so our website is appealing to the human eye."}
          link={"https://getbootstrap.com/"}
        />
        <SourceExhibit 
          name={"TypeScript"}
          description={"Used to implement any dynamic part of the website (such as dynamic git statistics). Used as an alternative to JavaScript so type mismatching can be caught at compile time rather than runtime."}
          link={"https://www.typescriptlang.org/"}
        />
        <SourceExhibit 
          name={"React"}
          description={"Used to create the frontend in a component-based way with convenient packages to easily implement things like page routing. Mainly serves as an easier way to write HTML and interweave it with TypeScript."}
          link={"https://reactjs.org/"}
        />
        <SourceExhibit 
          name={"Git"}
          description={"Used for version control of source code; helps developers work on the same codebase while working on their own systems by automatically merging their work into a single codebase."}
          link={"https://git-scm.com/"}
        />
        <SourceExhibit 
          name={"GitLab"}
          description={"A remote repository that serves as a third party hosting our codebase in a centralized spot."}
          link={"https://about.gitlab.com/company/"}
        />
        <SourceExhibit 
          name={"Amazon Web Services"}
          description={"A cloud-based platform that is used to host our website."}
          link={"https://aws.amazon.com/"}
        />
        <SourceExhibit 
          name={"Postman"}
          description={"A tool to conveniently and concisely document the API for our website."}
          link={"https://www.postman.com/"}
        />
        <SourceExhibit 
          name={"Jest"}
          description={"Jest is a unit testing framework for Javascript. The main feature used from the framework was the snapshot testing tools for our objects."}
          link={"https://jestjs.io/ "}
        />
        <SourceExhibit 
          name={"Selenium"}
          description={"Selenium is an open-source automated testing framework used to validate web applications across different browsers and platforms. It was used to test our website’s GUI."}
          link={"https://www.selenium.dev/"}
        />
        <SourceExhibit 
          name={"Python’s unittest library"}
          description={"Python’s built in unit testing framework helped us test the backend functions for our website."}
          link={"https://docs.python.org/3/library/unittest.html"}
        />
        <SourceExhibit 
          name={"COVID-19 Dashboard"}
          description={"Interactive graph embedded in our covid timeline instances. The graph displays the specific countries trends in “confirmed”, “deaths”, and “recovered”.."}
          link={"https://trekhleb.dev/covid-19/"}
        />
      </div><br /><br />
        
      <h2 style={{textAlign: "center"}}>Learn More</h2><br />
      <div className="covidDB-container">
        <SourceExhibit 
          name={"Our GitLab Repository"}
          description={"CovidDB is open-sourced! You can find our online repository by clicking here!"}
          link={"https://gitlab.com/mgrubbs/coviddb"}
        />
        <SourceExhibit
          name={"Our API Documenation:"}
          description={"Curious about how we handle our data? Check out our documentation for CovidDB's API!"}
          link={"https://documenter.getpostman.com/view/17756516/UUy4cRDr"}
        />
      </div><br />
    </div>
  );
}
