/* eslint-disable-line */ 
const aws = require('aws-sdk');

exports.handler = async (event, context, callback) => {
  const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({ region: 'us-east-1',apiVersion: '2016-04-18' });
  const groupParams = {
    GroupName: process.env.GROUP,
    UserPoolId: event.userPoolId,
  };

  const addUserParams = {
    GroupName: process.env.GROUP,
    UserPoolId: event.userPoolId,
    Username: event.userName,
  };
  const addTenantDefault = {
    UserAttributes: [
      {
        Name: 'custom:tier',
        Value: 'Free'
      },
      {
        Name: 'custom:tenantId',
        Value: Math.floor(100000 + Math.random() * 900000)
      }
    ],
    UserPoolId: event.userPoolId,
    Username: event.userName
  };
  
  await cognitoidentityserviceprovider.getGroup(groupParams, async (err) => {
    if (err) {
      await cognitoidentityserviceprovider.createGroup(groupParams).promise();
    }
    await cognitoidentityserviceprovider.adminUpdateUserAttributes(addTenantDefault).promise();
  }).promise();


  cognitoidentityserviceprovider.adminAddUserToGroup(addUserParams, (err) => {
    if (err) {
      console.log('Error event:', JSON.stringify(err));
      callback(err);
    }
    console.log('Received event:', JSON.stringify(event));
    callback(null, event);
  });

};