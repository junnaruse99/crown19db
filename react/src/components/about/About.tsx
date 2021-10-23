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

  constructor(email: string, username: string) {
    this.email = email;
    this.username = username;
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
  <div>
    <li>
      <a href={props.link}>{props.name}</a> - {props.description}
    </li>
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
      'Create the about page (this page)',],
    gitInfo: new GitInfo('lilbroadam@gmail.com', 'adamsamuelson'),
  };

  var alejandroStats: ContributorInfo = {
    name: 'Alejandro Balderas',
    photo: alejandroPFP,
    bio: 'Alejandro is a senior majoring in CS. This is his last year \
          before graduating and starting a full time position at Expedia.\
          He loves pugs and exercising',
    responsibilities: [
      'City instances and model',
      'Splash page'],
    gitInfo: new GitInfo('alejandro_balderas@utexas.edu', 'alejandrobk'),
  };

  var nicholasStats: ContributorInfo = {
    name: 'Nicholas Huang',
    photo: nicholasPFP,
    bio: 'Nicholas fell in love with programming since high school and has been coding \
          ever since. Now, he is very proud to work as a developer for CovidDB, working \
          long hours to ensure that users get all the COVID-19 information that they need',
    responsibilities: [
      'Hosting (AWS/Namecheap)',
      'Technical Report'],
    gitInfo: new GitInfo('nhua5610@gmail.com', 'OddJerbb'),
  };

  var junStats: ContributorInfo = {
    name: 'Jun Naruse',
    photo: junPFP,
    bio: 'Jun is an exchange student from Peru. He is in his last semester \
          majoring in Mechatronics Engineering. In his free time he likes watching \
          anime and reading manga.',
    responsibilities: [
      'Country and covid model',
      'Country and covid instances'],
    gitInfo: new GitInfo('jun.naruse@gmail.com', 'jun.naruse'),
  };

  var markStats: ContributorInfo = {
    name: 'Mark Grubbs',
    photo: markPFP,
    bio: 'Mark is in his last semester as a CS major with a certificate \
          in Japanese. He is really into video games.',
    responsibilities: [
      'User Stories',
      'Postman'],
    gitInfo: new GitInfo('siegbalicula@gmail.com', 'mgrubbs'),
  };

  var totalStats: ContributorInfo = {
    name: 'total',
    photo: '',
    bio: '',
    responsibilities: [],
    gitInfo: new GitInfo('total', 'total'),
  };

  var contributors: Array<ContributorInfo> = [
    alejandroStats,
    markStats,
    nicholasStats,
    junStats,
    adamStats,
    totalStats,
  ];

  // Populate gitStats for each contributor
  const gitlabContributorsPath: string = 'https://gitlab.com/api/v4/projects/29917081/repository/contributors';
  const gitlabIssuesPath: string = 'https://gitlab.com/api/v4/projects/29917081/issues';

  // Get number of commits for each contributor
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
  
  // TODO calc number of unit tests

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
      </div><br />

      {/* Links to APIs and additional data sources, and how each was scraped */}
      <h2>Our sources</h2>
      <p>
        <ul>
          <SourceExhibit 
            name={'GitLab contributors API'}
            description={'an API endpoint that returns information \
              about the project in terms of the contributors that have worked \
              on it and how many commits they have made.'}
            link={'https://gitlab.com/api/v4/projects/29917081/repository/contributors'}
          />
          <SourceExhibit 
            name={'GitLab issues API'}
            description={'an API endpoint that returns information \
              about the project in terms of the issues that have been \
              submitted to the repo on GitLab.'}
            link={'https://gitlab.com/api/v4/projects/29917081/issues'}
          />
          <SourceExhibit 
            name={'COVID-19 cases data'}
            description={'Our data about COVID-19 cases is supplied by this \
              API endpoint. The data was compiled by John Hopkins University.'}
            link={'https://data.humdata.org/dataset/novel-coronavirus-2019-ncov-cases'}
          />
          <SourceExhibit 
            name={'Country flags'}
            description={'The below website is used to supply the images of \
              of country flags that we display.'}
            link={'https://www.countryflags.io/'}
          />
          <SourceExhibit 
            name={'General city data'}
            description={'The below website was used to determine general \
              information about a city such as it\'s population, timezone, \
              and coordinates.'}
            link={'https://public.opendatasoft.com/explore/dataset/geonames-all-cities-with-a-population-1000/table/?disjunctive.cou_name_en&sort=name'}
          />
          <SourceExhibit 
            name={'City and country maps'}
            description={'Interactive maps were provided by Google Maps.'}
            link={'https://www.google.com/maps'}
          />
        </ul>
      </p>

      {/* Tools used and a description of how they were used */}
      <h2>How we did it</h2>
      <p>
        <ul>
          <li>
            <a href="https://www.w3schools.com/html/">HTML</a> -
            a mark-up language that tells your browser how to display 
            our website.
          </li>
          <li>
            <a href="https://getbootstrap.com/">Bootstrap</a> -
            a framework for CSS that makes it easier to write CSS
            for our website so our website is appealing to the 
            human eye.
          </li>
          <li>
            <a href="https://www.typescriptlang.org/">TypeScript</a> -
            used to implement any dynamic part of the website
            (such as dynamic git statistics). Used as an 
            alternative to JavaScript so type mismatching can be 
            caught at compile time rather than runtime.
          </li>
          <li>
            <a href="https://reactjs.org/">React</a> -
            used to create the frontend in a component-based way with 
            convenientpackages to easily implement things like page 
            routing. Mainly serves as an easier way to write HTML and
            interweave it with TypeScript.
          </li>
          <li>
            <a href="https://git-scm.com/">Git</a> -
            used for version control of source code; helps developers 
            work on the same codebase while working on their own systems 
            by automatically merging their work into a signle
            codebase.
          </li>
          <li>
            <a href="https://about.gitlab.com/company/">Gitlab</a> -
            a remote repository that serves as a third party hosting
            our codebase in a centralized spot.
          </li>
          <li>
            <a href="https://aws.amazon.com/">Amazon Web Serivces</a> -
            a cloud-based server-hosting platform that hosts our website.
          </li>
          <li>
            <a href="https://www.postman.com/">Postman</a> -
            a tool to conveniently and concisely document the API for
            our website.
          </li>
        </ul>
      </p>

      <h2>CovidDB documentation</h2>
      <p>
        <a href="https://documenter.getpostman.com/view/17756516/UUy4cRDr">
          https://documenter.getpostman.com/view/17756516/UUy4cRDr
        </a>
      </p>

      <h2>CovidDB is open-sourced!</h2>
      <p>
        You can find our open-source repo on <a href="https://gitlab.com/mgrubbs/coviddb">GitLab</a>
      </p>
      
    </div>
  );
}
