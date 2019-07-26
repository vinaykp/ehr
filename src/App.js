import React from 'react';
import './App.css';

import awsconfig from './aws-exports';
import Amplify, { Analytics, Storage } from 'aws-amplify';
import { withAuthenticator, S3Album } from 'aws-amplify-react';

Amplify.configure(awsconfig);

class App extends React.Component {


  uploadFile = (evt) => {
    const file = evt.target.files[0];
    const name = file.name;
  
    Storage.put(name, file).then(() => {
      this.setState({ file: name });
    })
  }
  
  componentDidMount() {
    //Analytics.record('Amplify_CLI');
  }
  
  render() {
    return (
      <div className="App">
        <p> Pick a file</p>
        <input type="file" onChange={this.uploadFile} />
        <S3Album level="private" path='' />
      </div>
    );
  }
}


export default withAuthenticator(App, {
  includeGreetings: true, 
  signUpConfig: {
    signUpFields: [
      { label: "Company Name", 
      key: "custom:tenantName", 
      required: true, 
      type: "string" ,       
      displayOrder: 1,
      custom: true
    }
    ]
}});

