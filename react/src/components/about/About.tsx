import React, { useState, useEffect } from 'react';
import adamPFP from './pfp/adam-pfp.jpg';
import alejandroPFP from './pfp/alejandro-pfp.jpg';
import dustanPFP from './pfp/dustan-pfp.jpg';
import './About.css';

interface ContributorStats {
  name: string;
  photo: any; // TODO adamsamuelson: change to string
  bio: string;
  responsibilities: Array<string>;
  numCommits: any;
  numIssues: any;
  numUnitTests: any;
}

interface ProjectStats {
  numCommits: any;
  numIssues: any;
  numUnitTests: any;
}

function ContributorExhibit(props: any) {
  var contributor: ContributorStats = props.contributor;

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
        <ul>
        {
          contributor.responsibilities.map( responsibility => (
            <li>{responsibility}</li>
          ))
        }
        </ul>

        <h6>Contributions:</h6>
        <ul>
          <li>Number of commits: {contributor.numCommits}</li>
          <li>Number of issues: {contributor.numIssues}</li>
          <li>Number of unit tests: {contributor.numUnitTests}</li>
        </ul>
      </div>
    </div>
  );
}

export default function About(props) {
  const gitlabContributorsPath: string = 'https://gitlab.com/api/v4/projects/29917081/repository/contributors';
  const [contributors2, setContributors2] = useState<Array<string>>([]); // TODO delete
  const [contributorStats, setContributorStats] = useState<Array<ContributorStats>>([]);
  
  /* Set contributorStats */
  useEffect(() => {
    var adamStats: ContributorStats = {
      name: 'Adam Samuelson',
      photo: adamPFP,
      bio: 'Adam is in his 4th and final year at UT as a CS major with a \
            minor in government. Outside of class he mentors freshmen through \
            a CNS FIG known as TIP. Additionally, he enjoys listening to \
            music, hanging out with friends, working on his own CS projects, \
            and hydrating himself with water.',
      responsibilities: [
        'Create the about page (this page)',],
      numCommits: 'TODO',
      numIssues: 'TODO',
      numUnitTests: 'TODO',
    };

    var alejandroStats: ContributorStats = {
      name: 'Alejandro Balderas',
      photo: alejandroPFP,
      bio: 'TODO',
      responsibilities: [
        'responsibility 1',
        'responsibility 2'],
      numCommits: 'TODO',
      numIssues: 'TODO',
      numUnitTests: 'TODO',
    };

    var dustanStats: ContributorStats = {
      name: 'Dustan Helm',
      photo: dustanPFP,
      bio: 'TODO',
      responsibilities: [
        'responsibility 1',
        'responsibility 2'],
      numCommits: 'TODO',
      numIssues: 'TODO',
      numUnitTests: 'TODO',
    };

    var junStats: ContributorStats = {
      name: 'Jun Naruse',
      photo: 'TODO',
      bio: 'TODO',
      responsibilities: [
        'responsibility 1',
        'responsibility 2'],
      numCommits: 'TODO',
      numIssues: 'TODO',
      numUnitTests: 'TODO',
    };

    var markStats: ContributorStats = {
      name: 'Mark Grubbs',
      photo: 'TODO',
      bio: 'TODO',
      responsibilities: [
        'responsibility 1',
        'responsibility 2'],
      numCommits: 'TODO',
      numIssues: 'TODO',
      numUnitTests: 'TODO',
    };

    var contributors: Array<ContributorStats> = [
      alejandroStats,
      markStats,
      dustanStats,
      junStats,
      adamStats,
    ];

    setContributorStats(contributors);
  }, []);

  /* Set contributors2 */
  useEffect(() => {
    fetch(gitlabContributorsPath)
      .then(res => {
        return res.json();
      })
      .then(data => {
        let array: string[] = [];
        for (var d in data) {
          var obj = JSON.parse(d);
          console.log(data[obj].name);
          array.push(data[obj].name);
        }

        setContributors2(array);
      })
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