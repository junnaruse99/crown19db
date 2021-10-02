import React, { useState, useEffect } from 'react';
import './App.css';

export default function About(props) {
  var contributorsPath = 'https://gitlab.com/api/v4/projects/29917081/repository/contributors';

  /*
  interface UserData {
    username: string;
    password: string;
    prevState: null
  }
  */
  
  const [contributors, setContributors] = useState<Array<string>>([]);

  useEffect(() => {
    fetch(contributorsPath)
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

        setContributors(array);
      })
  }, []);

  return (
    <div>
      <h1>About CovidDB</h1>
      <h2>Purpose</h2>
      <h2>Contributers</h2>

      <h2>Git stats</h2>

      <p>
        {
          contributors.map( name => (
            <p>{name}</p>
          ))
        }
      </p>
      
    </div>
  );
}