import React, { useState, useEffect } from 'react';
import adamPFP from './pfp/adam-pfp.jpg';
import alejandroPFP from './pfp/alejandro-pfp.jpg';
import dustanPFP from './pfp/dustan-pfp.jpg';
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
    <div className="about-contributor">
      <div className="about-contributor-child">
        <h4>{contributor.name}</h4>
        <img src={contributor.photo} className="about-contributor-pfp" />
      </div>

      <div className="about-contributor-child">
        <p>
          <h6>Bio:</h6>
          <ul>
            <li>{contributor.bio}</li>
          </ul>
        </p>

        <h6>Responsibilities:</h6>
        <ul>{
          contributor.responsibilities.map( responsibility => (
            <li>{responsibility}</li>
          ))
        }</ul>

        <h6>Contributions:</h6>
        <ul>
          <li>Number of commits: {contributor.gitInfo.numCommits + ''}</li>
          <li>Number of issues: {contributor.gitInfo.numIssues + ''}</li>
          <li>Number of unit tests: {contributor.gitInfo.numUnitTests + ''}</li>
        </ul>
      </div>
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

  var dustanStats: ContributorInfo = {
    name: 'Dustan Helm',
    photo: dustanPFP,
    bio: 'Dustan is a 4th year computer science student and likes to play guitar, volleyball, and video games',
    responsibilities: [T
      'Hosting (AWS/Namecheap)',
      'Technical Report'],
    gitInfo: new GitInfo('dustan.helm@yahoo.com', 'dustan.helm'),
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
    dustanStats,
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
          if (contributor.gitInfo.email == rawCommitStat.email) {
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
          if (contributor.gitInfo.username == rawIssueStat.author.username) {
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
      <h1>About CovidDB</h1>

      <p></p>

      {/* Description of site (purpose, intended users) */}
      <h2>Purpose</h2>
      <p>
        In the ever-evolving world of COVID-19, CovidDB is here to help you 
        keep track of your changing health environment. We help you get the
        information you need by organizing information about COVID-19 cases
        per country and city over time.
      </p>

      {/* Explanation of the interesting result of integrating disparate data */}
      <h2>Interesting findings</h2>
      <p>
        TODO
      </p>

      {/* Name, photo, bio, major responsibilities (ex: frontend vs backend team),  */}
      {/* # of commits, issues, and unit tests contributed of each team member */}
      <h2>Contributor and contributor stats </h2>
      <p>
        {
          contributorStats.map( contributor => (
            <p>
              <ContributorExhibit contributor={contributor}/>
            </p>
          ))
        }
      </p>

      {/* Total # of commits, issues, and unit tests */}
      <h2>Overall project stats</h2>
      <p>
        <ul>
          <li>Total number of commits: {totalStats?.gitInfo.numCommits + ''}</li>
          <li>Total number of issues: {totalStats?.gitInfo.numIssues + ''}</li>
          <li>Total number of unit tests: {totalStats?.gitInfo.numUnitTests + ''}</li>
        </ul>
      </p>

      {/* Links to APIs and additional data sources, and how each was scraped */}
      <h2>Our sources</h2>
      <p>
        <ul>
          <li>
            Source 1 - TODO
          </li>
        </ul>
      </p>

      {/* Tools used and a description of how they were used */}
      <h2>How we did it</h2>
      <p>
        <ul>
          <li>
            React - TODO
          </li>
          <li>
            TypeScript - TODO
          </li>
        </ul>
      </p>
      
    </div>
  );
}
